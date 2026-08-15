// NumToWords: standalone constructor used by StoryEngine.printCounters

class NumToWords {
    constructor() {
        this.convert = function (n) {
            var prefix = "";
            if (n < 0) {
                prefix = tr("minus") + " ";
                n = -n;
            }
            if (n == 0) return tr('zero');
            var str = _getIntAsWordsRecursively(n, 0);
            var c = str.lastIndexOf(',');
            var h = str.lastIndexOf('hundred');
            if (h < c) str = str.substring(0, c) + ' and ' + str.substring(c + 2);
            return prefix + str;
        };
    }

    _getIntAsWordsRecursively(n, nThousandsExponent) {
        var str = _getNonZeroNumberLessThanOneThousandAsWords(n % 1000);
        if (str != '' && nThousandsExponent > 0)
            str += ' ' + _words.illions[nThousandsExponent - 1];
        if (n < 1000) return str;
        return _getIntAsWordsRecursively(Math.floor(n / 1000), nThousandsExponent + 1) +
            ((str == '') ? '' : ', ' + str);
    }

    _getNonZeroNumberLessThanOneThousandAsWords(n) {
        if (n == 0) return '';
        if (n < 10) return _words.digits[n - 1];
        if (n < 20) return _words.teens[n - 10];
        if (n < 100) return _words.tens[Math.floor(n / 10) - 1] + ((n % 10 == 0) ? '' : '-' + _words.digits[n % 10 - 1]);
        if (n < 1000) return _words.digits[Math.floor(n / 100) - 1] + ' ' + tr("hundred") +
            ((n % 100 == 0) ? '' : ' ' + tr("and") + ' ' + _getNonZeroNumberLessThanOneThousandAsWords(n % 100));
        return n;
    }

    _words = {
        digits: [tr('one'), tr('two'), tr('three'), tr('four'), tr('five'), tr('six'), tr('seven'), tr('eight'), tr('nine')],
        tens: [tr('ten'), tr('twenty'), tr('thirty'), tr('forty'), tr('fifty'), tr('sixty'), tr('seventy'), tr('eighty'), tr('ninety')],
        teens: [tr('ten'), tr('eleven'), tr('twelve'), tr('thirteen'), tr('fourteen'),
        tr('fifteen'), tr('sixteen'), tr('seventeen'), tr('eighteen'), tr('nineteen')],
        illions: [tr('thousand'), tr('million'), tr('billion'), tr('trillion')]
    };
}


// StoryEngine: pure story traversal and text rendering — zero DOM, zero jQuery.
// Instantiated by Player in playMode.js: var engine = new StoryEngine();

class StoryEngine {
    constructor() { }
    // ---- Chunk traversal ----
    // Walk the divert chain from fromStitch, evaluate conditions, collect text/flags/images.
    // Returns a plain state object; no DOM is touched.
    buildChunk(fromStitch, prevFlags) {
        var flagsCollected = prevFlags ? prevFlags.slice() : [];

        if (!fromStitch) {
            return {
                stitches: [], flags: flagsCollected, newFlags: [],
                html: '', options: [], isEnd: true,
                hadSectionHeading: false, wordCount: 0
            };
        }

        var stitches = [];
        var renderedText = "";
        var carriedText = "";
        var hadSectionHeading = false;
        var newFlags = []; // [{text, valueAfterSet}] for editor flag display
        var appendStitch = fromStitch;

        while (appendStitch) {
            stitches.push(appendStitch);

            if (appendStitch.pageNumberLabel() >= 1) hadSectionHeading = true;

            if (StoryModel.doesArrayMeetConditions(appendStitch._ifConditions, appendStitch._notIfConditions, flagsCollected)) {

                if (appendStitch.image())
                    renderedText += "\n%|%|%" + appendStitch.image() + "$|$|$\n";

                carriedText += appendStitch.text().replace(/\n/g, " ") + " ";

                if ((!appendStitch.text().match(/\[\.\.\.\]/) && !appendStitch.runOn()) || !appendStitch.divert()) {
                    renderedText += this.renderText(carriedText, flagsCollected) + "\n";
                    carriedText = "";
                }

                if (appendStitch.numberOfFlags() > 0) {
                    StoryModel.processFlagSetting(appendStitch, flagsCollected);
                    // Capture display text + current value for editor flag list
                    var counterAlterRegex = /^(.*?)\s*(\+|\-)\s*(\b.*\b)\s*$/;
                    for (var i = 0; i < appendStitch.numberOfFlags(); i++) {
                        var flagText = appendStitch.flagByIndex(i);
                        var matchSet = flagText.match(counterAlterRegex);
                        newFlags.push({
                            text: flagText,
                            valueAfterSet: matchSet ? StoryModel.getValueOfFlag(matchSet[1], flagsCollected) : null
                        });
                    }
                }
            }

            appendStitch = appendStitch.divert();
        }

        return {
            stitches: stitches,
            flags: flagsCollected,
            newFlags: newFlags,
            html: this.renderChunk(renderedText),
            options: this.buildOptions(stitches, flagsCollected),
            isEnd: stitches[stitches.length - 1].options.length === 0,
            hadSectionHeading: hadSectionHeading,
            wordCount: wordCountOf(renderedText)
        };
    }
    // Evaluate option conditions against flagsCollected; return array of option descriptors.
    buildOptions(stitches, flagsCollected) {
        var lastStitch = stitches[stitches.length - 1];
        if (!lastStitch || lastStitch.options.length === 0) return [];

        var result = [];
        for (var i = 0; i < lastStitch.options.length; i++) {
            var opt = lastStitch.options[i];
            result.push({
                option: opt,
                valid: StoryModel.doesArrayMeetConditions(opt._ifConditions, opt._notIfConditions, flagsCollected),
                writeModeOnly: opt.writeModeOnly
            });
        }
        return result;
    }
    // ---- Text rendering (all pure) ----
    renderChunk(textHtml) {
        textHtml = this.smartQuote(textHtml);
        textHtml = textHtml.replace(/\n+/g, "</div><div class='stitch'>");
        textHtml = this.processMultipleSpaces(textHtml);
        textHtml = this.locateLinks(textHtml);
        textHtml = this.locateImages(textHtml);
        return "<div class='stitch'>" + textHtml + "</div>";
    }
    locateLinks(textHtml) {
        return textHtml.replace(/\[(.*?)\|(.*?)\]/g, '<a href="$1">$2</a>');
    }
    locateImages(textHtml) {
        return textHtml.replace(/\%\|\%\|\%(.*?)\$\|\$\|\$/g, '<div id="illustration"><img class="pic" src="$1"/></div>');
    }
    processMultipleSpaces(textHtml) {
        textHtml = textHtml.replace(/(\&nbsp\;|\s)+/g, ' ');
        textHtml = textHtml.replace(/(\&nbsp\;|\s)+(\.|\,|\;|\:|\?|\!|\"|\')/g, '$2');
        textHtml = textHtml.replace(/(\"|\')(\&nbsp\;|\s)+/g, '$1');
        return textHtml;
    }
    renderText(textString, flagsCollected) {
        textString = this.stripEllipsisConjunctive(textString);
        textString = this.printCounters(textString, flagsCollected);
        var startText = "";
        while (startText !== textString) {
            startText = textString;
            textString = this.processConditionalBraces(textString, flagsCollected);
            textString = this.processRandomBraces(textString);
        }
        textString = this.processFormatting(textString);
        return textString;
    }
    printCounters(textString, flagsCollected) {
        var counterRegex = /\[\s*(number|value)\s*\:\s*(.*?)\s*\]/;
        var matchSet;
        while (matchSet = textString.match(counterRegex)) {
            var replaceVal = StoryModel.getValueOfFlag(matchSet[2], flagsCollected);
            if (!replaceVal) replaceVal = 0;
            if (matchSet[1] == "value") {
                var numToWords = new NumToWords();
                replaceVal = numToWords.convert(replaceVal);
            }
            textString = textString.replace(counterRegex, replaceVal);
        }
        return textString;
    }
    smartQuote(textString) {
        textString = textString.replace(/\"([^\n]*?)\"/g, "“$1”");
        textString = textString.replace(/(\s|^|\n|<b>|<i>|\(|\")\'/g, "$1‘");
        textString = textString.replace(/\'/g, "’");
        textString = textString.replace(/(^|\n)\"/g, "$1“");
        return textString;
    }
    stripEllipsisConjunctive(textHtml) {
        return textHtml.replace(/\[\.\.\.\]/g, ' ');
    }
    processFormatting(textString) {
        textString = textString.replace(/\*\-(.*?)\-\*/g, "<b>$1</b>");
        textString = textString.replace(/\/\=(.*?)\=\//g, "<i>$1</i>");
        textString = textString.replace(/(\/\=|\=\/|\*\-|\-\*)/g, "");
        return textString;
    }
    processRandomBraces(textString) {
        var randomTextRegex = /\{\~([^\{\}]*?)\}/;
        var randomMatches;
        while (randomMatches = textString.match(randomTextRegex)) {
            var parts = randomMatches[1].split("|");
            var n = parseInt(Math.random() * parts.length);
            textString = textString.replace(randomTextRegex, parts[n]);
        }
        return textString;
    }
    processConditionalBraces(textString, flagsCollected) {
        var conditionalTextRegex = /\{([^\~\{]*?)\:([^\{]*?)(\|([^\{]*?))?\}/;
        var stripEdgeWhitespace = /(^\s*|\s*$)/g;
        var andMatch = /\s*(&&|\band\b)\s*/;
        var notMatch = /\s*(\!|\bnot\b)\s*(.+?)\s*$/;
        var conditionalMatches;
        var matchCount = 0;

        while (conditionalMatches = textString.match(conditionalTextRegex)) {
            matchCount++;
            if (matchCount > 1000) {
                alert(tr("Error in conditional!"));
                break;
            }
            if (conditionalMatches.length > 0) {
                var useablePart = "";
                var ifs = [];
                var notIfs = [];
                var terms = conditionalMatches[1].split(andMatch);
                for (var idx = 0; idx < terms.length; idx++) {
                    if (terms[idx] != "&&" && terms[idx] != "and") {
                        var notTerms = terms[idx].match(notMatch);
                        if (notTerms) {
                            notIfs.push(notTerms[2].replace(stripEdgeWhitespace, ''));
                        } else {
                            ifs.push(terms[idx].replace(stripEdgeWhitespace, ''));
                        }
                    }
                }
                if (StoryModel.doesArrayMeetConditions(ifs, notIfs, flagsCollected))
                    useablePart = conditionalMatches[2];
                else if (conditionalMatches[4] !== undefined)
                    useablePart = conditionalMatches[4];
                textString = textString.replace(conditionalTextRegex, ' ' + useablePart + ' ');
            }
        }
        return textString;
    }
    // ---- Save / restore (localStorage, no DOM) ----
    saveKey() {
        return "inklewriter_saved_game" + StoryModel.storyName().camelCase().substring(0, 16);
    }
    getSavedGame() {
        var defaultSavedGame = [StoryModel.initialStitch];
        var constructedSaveGame = [];

        if (hasStorage) {
            StoryModel.nameStitches();
            if (localStorage[this.saveKey()]) {
                var savedGame = JSON.parse(localStorage[this.saveKey()]);
                var found = (savedGame.length > 0);
                for (var i = 0; i < savedGame.length && found; i++) {
                    found = false;
                    for (var j = 0; !found && j < StoryModel.stitches.length; j++) {
                        if (StoryModel.stitches[j].name() == savedGame[i]) {
                            constructedSaveGame.push(StoryModel.stitches[j]);
                            found = true;
                        }
                    }
                }
                if (!found) constructedSaveGame = [];
            }
        }

        return constructedSaveGame.length > 0 ? constructedSaveGame : defaultSavedGame;
    }
    // stitchNameList: array of stitch name strings (not stitch objects)
    saveGame(stitchNameList) {
        if (!hasStorage) return;
        localStorage[this.saveKey()] = JSON.stringify(stitchNameList);
    }
}
