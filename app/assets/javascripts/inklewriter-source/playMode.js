var Player = function() {

    var chunks = [];
    
    var readOnly = false;
    
    //----------------------
    // Chunk of text
    //----------------------

    var removeDeadOptions = function()  {
        $('.expired').remove();
    }

    
    var PlayChunk = function(fromStitch) {
        var self = this;
        this.jqPlayChunk = $('<div class="chunk"><div class="stitch_block"></div><div class="flags"><ul></ul></div></div>');
        this.stitches = [];
        this.optionBoxes = [];
        this.flagsCollected = [];
        this.wordCount = 0;
        this.hadSectionHeading = false;
        
        this.jqFlags = this.jqPlayChunk.find('.flags');
        this.jqFlags.hide();
        
        this.prevChunk = chunks.last();
        if (this.prevChunk) {
            for (var i = 0; i < this.prevChunk.flagsCollected.length; i++) {
                self.flagsCollected.push(this.prevChunk.flagsCollected[i]);
            }
        }
        
        if (!fromStitch)
        {
            // Normal read mode, when editing
            if( !readOnly ) {
                removeDeadOptions();
                this.jqPlayChunk.html("This page intentionally left blank.<br>(<a href='javascript:EditorMenu.enterEditMode();'>Continue the story from here</a>.)");
            } 
            
            // Read only mode (e.g. from sharing)
            else {
                this.jqPlayChunk.html("<div class='the_end'>End</div>");           
            }
            
            $("#read_area").append(this.jqPlayChunk);
            return;
        }
                
        var appendStitch = fromStitch;
        
        this.jqTextBlock = this.jqPlayChunk.find('.stitch_block');
        
        var renderedText = "";
        var carriedText = "";
        
        while(appendStitch)
        {
            // we store the stitch regardless of conditions
            this.stitches.push(appendStitch);

            if (appendStitch.pageNumberLabel() >= 1) {
                this.hadSectionHeading = true;
            }

            // but only render text / collect flags if it's valid
            if (StoryModel.doesArrayMeetConditions(appendStitch._ifConditions, appendStitch._notIfConditions, this.flagsCollected)) {

                
                if (appendStitch.image()) {
                	
                	renderedText += "\n%|%|%" + appendStitch.image() + "$|$|$\n";
                	
                }
            
                carriedText += appendStitch.text().replace(/\n/g," ") + " ";
                
                if (( !appendStitch.text().match(/\[\.\.\.\]/) && !appendStitch.runOn() ) || !appendStitch.divert())
                {
                    renderedText += renderText(carriedText, this.flagsCollected) + "\n";
                    carriedText = "";
                    
                }
                
                if (appendStitch.numberOfFlags() > 0) {
                    StoryModel.processFlagSetting(appendStitch, this.flagsCollected);
                
                    if( !readOnly ) {
                        var jqList = this.jqFlags.find('ul');
                        for (var i = 0 ; i < appendStitch.numberOfFlags() ; i++) {
                            var flagText = appendStitch.flagByIndex(i);
                            var counterAlterRegex = /^(.*?)\s*(\+|\-)\s*(\b.*\b)\s*$/;
                            if ( matchSet = flagText.match(counterAlterRegex) ) {
                            
                                flagText += " (now " + StoryModel.getValueOfFlag(matchSet[1], this.flagsCollected) + ")";
                            
                            }
                            
                            jqList.append('<li>' + flagText + '</li>');
                        }
                        this.jqFlags.show();
                    }
                }
                
            }
            appendStitch = appendStitch.divert();
        }
        
        this.wordCount += wordCountOf(renderedText);

        this.jqTextBlock.html(renderChunk(renderedText));
        
        this.jqPlayChunk.append(this.jqTextBlock);
        
        $("#read_area").append(this.jqPlayChunk);
       
        this.createOptionBlock();
    
        // create rewind button (hidden by default)
        this.jqRewindButton = $('<div class="rewindButton" tooltip="Rewind to here"></div>');
        this.jqPlayChunk.append(this.jqRewindButton);
        this.jqRewindButton.bind("mousedown tap", function() { 
            self.rewindToHere();
            saveGame();
        });
        this.jqRewindButton.hide();

        if (chunks.length >= 1) {
            scrollTo(this.jqPlayChunk);
            if (readOnly) {
                this.jqRewindButton.addClass("noText");
            }
        } else {
            this.jqRewindButton.addClass("initial");
            if (readOnly) {
        	   this.jqRewindButton.text("Start again");
            }
        }
    
    }
    
    PlayChunk.prototype.remove = function() {
        this.jqPlayChunk.remove();
    }
    
    PlayChunk.prototype.createOptionBlock = function() {

        var dividerLineHtml = "<div class='option-divider'></div>";
        
        this.jqOptBlock = $("<div class='option_block'>"+dividerLineHtml+"</div>");
       
        if (this.stitches.last().options.length == 0)
        {
            // end!
            this.jqTextBlock.append('<div class="the_end">End</div>');
            if( !readOnly ) {
                this.jqTextBlock.append('<br>(<a href="javascript:EditorMenu.enterEditMode();">Go back to Write mode to continue</a>.)</div>');
                
            } else {
                
	            this.jqTextBlock.find('.the_end').append("<div class='back_to_top'></div>");
				this.jqTextBlock.find('.back_to_top').bind('click tap', function() {
					scrollTo(chunks.first().jqPlayChunk);
				});                

                
                $("#read_area").append("<div id='madeby'>Text &copy; the author. <a href='http://www.inklestudios.com/inklewriter'><strong>inklewriter</strong></a> &copy; <a href='http://www.inklestudios.com'><strong>inkle</strong></a></div>");
                
            }
        } 
        else
        {
            var options = this.stitches.last().options;     
    
            for (var i = 0 ; i < options.length ; i++)
            {
                var thisOpt = options[i];
                
                var valid = StoryModel.doesArrayMeetConditions(thisOpt._ifConditions, thisOpt._notIfConditions, this.flagsCollected);
                
                if (valid || !readOnly)
                {         
                    var newOpt = new PlayOption(thisOpt, valid);
                    
                    this.optionBoxes.push(newOpt);
                    this.jqOptBlock.append(newOpt.jqPlayOption);
                    this.jqOptBlock.append(dividerLineHtml);

                }
            }
            
            this.jqPlayChunk.append(this.jqOptBlock);
            
        }
        
        removeDeadOptions();
        
    };
    
    PlayChunk.prototype.rewindToHere = function() {

        // Remove all chunks after this one
        var chunkIdx = chunks.indexOf(this);
        for(var deleteChunkIdx = chunkIdx+1; deleteChunkIdx<chunks.length; deleteChunkIdx++) {
            chunks[deleteChunkIdx].jqPlayChunk.remove();
            chunks[deleteChunkIdx].remove();
        }
        chunks = chunks.slice(0, chunkIdx+1);
        
        // recreate option
        this.createOptionBlock();

        this.jqRewindButton.hide();
        
        $('#madeby').remove();

        updateWordCount();
    };
    
    
    //----------------------
    // Option
    //----------------------

    
    var PlayOption = function(optionLink, valid) {

        this.jqPlayOption = $('<div class="option_button">' + smartQuote(optionLink.text()) + '</div>');

        this.linkTo = optionLink.linkStitch();
        
        var linkTo =  this.linkTo;

        if (!optionLink.writeModeOnly && valid) {
            this.jqPlayOption.bind("click tap", function() {
                            
                // Show the rewind button on the chunk we just visited
                if( !readOnly || (chunks.last().hadSectionHeading && StoryModel.allowCheckpoints)) {
                    chunks.last().jqRewindButton.show();
                } 
                
                // Only first chunk's rewind button should be visible
                else {
                    chunks.first().jqRewindButton.show();
                }
    
    
                var nextStitch = linkTo;
                $(".option_block").addClass('expired');
    
                chunks.push( new PlayChunk(nextStitch) );
                
                saveGame();
               
                updateWordCount();

                
                addOptionText(optionLink);
                
                
    
            });
        } else {
            // Todo --> indicate the WRITE mode button with a popup
            this.jqPlayOption.addClass("disabled");
            if (optionLink.writeModeOnly )
                this.jqPlayOption.attr("tooltip", "Switch to write mode to continue.");
            else 
                this.jqPlayOption.attr("tooltip", "This option has been disallowed by conditions.");
        }
    };

    var addOptionText = function(optionLink) {
    
        if (optionLink.text() != "..." && StoryModel.optionMirroring)
            chunks.last().jqPlayChunk.prepend('<div class="option_chosen">' + smartQuote(optionLink.text()) + '</div>');

    };
    
    //----------------------
    //  Text rendering functions
    //----------------------
    
    // entry point for doing chunk level processing eg. [...]
    var renderChunk = function(textHtml) {
        textHtml = smartQuote(textHtml);

        textHtml = textHtml.replace(/\n+/g, "</div><div class='stitch'>");
        textHtml = processMultipleSpaces(textHtml);
        textHtml = locateLinks(textHtml);
        textHtml = locateImages(textHtml);
        
        return "<div class='stitch'>" + textHtml + "</div>";
    }

    var locateLinks = function(textHtml) {
    	textHtml = textHtml.replace(/\[(.*?)\|(.*?)\]/g, '<a href="$1">$2</a>');
    	return textHtml;
    }
    
    var locateImages = function(textHtml) {
    	textHtml = textHtml.replace(/\%\|\%\|\%(.*?)\$\|\$\|\$/g, '<div id="illustration"><img class="pic" src="$1"/></div>');
    	return textHtml;
    }

    var processMultipleSpaces = function(textHtml) {
        // replace multiple spaces with a single space
        textHtml = textHtml.replace(/(\&nbsp\;|\s)+/g, ' ');
        // remove space before punctuation
        textHtml = textHtml.replace(/(\&nbsp\;|\s)+(\.|\,|\;|\:|\?|\!|\”|\’)/g, '$2');
        // remove spaces after open quotes
        textHtml = textHtml.replace(/(\“|\‘)(\&nbsp\;|\s)+/g, '$1');
        return textHtml;
    }


    // entry point for doing conditional strings, etc.
    var renderText = function(textString, flagsCollected) {

        
        textString = stripEllipsisConjunctive(textString);
        textString = printCounters(textString, flagsCollected);

        var startText = "";
        while (startText !== textString) {
            startText = textString;
            textString = processConditionalBraces(textString, flagsCollected);
            textString = processRandomBraces(textString);
        }
        textString = processFormatting(textString);

        return textString;
    }

    var printCounters = function(textString, flagsCollected) {
        var counterRegex = /\[\s*(number|value)\s*\:\s*(.*?)\s*\]/;
        while(matchSet = textString.match(counterRegex)) {
            var replaceVal = StoryModel.getValueOfFlag(matchSet[2], flagsCollected);
            if (!replaceVal) {
                replaceVal = 0;
            }
            if (matchSet[1] == "value") {
                var numToWords = new NumToWords();
                replaceVal = numToWords.convert(replaceVal);
            }
            textString = textString.replace(counterRegex, replaceVal);
        }
        return textString;
    };

   
    
    var smartQuote = function(textString) {
        // "" quotes
        textString = textString.replace(/\"([^\n]*?)\"/g, "“$1”" );

        // open quotes after spaces/line starts
        // open italic or bold
        textString = textString.replace(/(\s|^|\n|<b>|<i>|\(|\“)\'/g, "$1‘");
        
        // close quotes - everywhere else!!
        textString = textString.replace(/\'/g, "’");
        
        // single open double quote at start of a paragraph - good for multi-paragraph quotes. 
        
        textString = textString.replace(/(^|\n)\"/g, "$1“");
        
        return textString;
    }

    var stripEllipsisConjunctive = function(textHtml) {
        return textHtml.replace(/\[\.\.\.\]/g, ' ');
    }  

    var processFormatting = function(textString) {
    
        textString = textString.replace(/\*\-(.*?)\-\*/g, "<b>$1</b>");
        textString = textString.replace(/\/\=(.*?)\=\//g, "<i>$1</i>");
        
        // remove any extraneous formatting elements
        textString = textString.replace(/(\/\=|\=\/|\*\-|\-\*)/g, "");
        
        return textString;
    }
    
    
    
    
    
    
    var processRandomBraces = function(textString) {
        var randomTextRegex = /\{\~([^\{\}]*?)\}/;
        var randomMatches;
        while (randomMatches =  textString.match(randomTextRegex)) {
            var parts = randomMatches[1].split("|");
            var n = parseInt(Math.random() * parts.length);
            textString = textString.replace(randomTextRegex, parts[n]);
        }
        return textString;
    };

    var processConditionalBraces = function(textString, flagsCollected) {

        var conditionalTextRegex = /\{([^\~\{]*?)\:([^\{]*?)(\|([^\{]*?))?\}/;
        
        var stripEdgeWhitespace = /(^\s*|\s*$)/g;
        var andMatch = /\s*(&&|\band\b)\s*/;
        var notMatch = /\s*(\!|\bnot\b)\s*(.+?)\s*$/;
        var conditionalMatches;
        
        var matchCount = 0;
        
        while (conditionalMatches = textString.match(conditionalTextRegex))
        {
            matchCount++;
            if (matchCount > 1000)
            {
                alert("Error in conditional!");
                break;
            }
            if (conditionalMatches.length > 0)
            {
                var useablePart = "";
                
                var ifs = [];
                var notIfs = [];
                var terms = conditionalMatches[1].split(andMatch);
                for (var idx = 0 ; idx < terms.length ; idx++) {
                    if (terms[idx] != "&&" && terms[idx] != "and")
                    {
                        var notTerms = terms[idx].match(notMatch);
                        
                        if ( notTerms ) {
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

    //----------------------

    var updateWordCount = function() {
        if (readOnly) return false;
        var totWordCount = 0;
        for (i = 0 ; i < chunks.length ; i++ ) {
            totWordCount += chunks[i].wordCount;
        }

        if (totWordCount <= 100)
            totWordCount = totWordCount - (totWordCount % 10) + 10;
        else
            totWordCount = totWordCount - (totWordCount % 100) + 100;

        $('#wordcount').text("About " + commadString(totWordCount) + " words");
    };

    var scrollTo = function(target) {
        var jqTarget = $(target);
        
        if (readOnly) {
            var jqContainer = $("body");
            var destination = jqTarget.offset().top - 20;
        } else {
            var jqContainer = $("#read_area");
            var destination = jqContainer.scrollTop() + jqTarget.position().top - 20;
        }
        
        jqContainer.stop().animate({"scrollTop": destination}, 1000);
    }


    var launchGraph = function() {
        var graph  = new GraphModel(chunks.last().stitches.last());
    }
    
    var createFromModel = function(thisStitchList) {
        var prevStitch = null;
        for (var i = 0; i < thisStitchList.length ; i++) {
            $(".option_block").remove();

            var newChunk =  new PlayChunk(thisStitchList[i]) ;
            chunks.push (newChunk);
            
            if (prevStitch) {
                for ( var j = 0 ; j < prevStitch.options.length ; j++) {
                    if (prevStitch.options[j].linkStitch() === thisStitchList[i]) {
                        addOptionText(prevStitch.options[j]);
                        break;
                    }
                }
            }

            if( !readOnly || (chunks.last().hadSectionHeading && StoryModel.allowCheckpoints)) {
                chunks.last().jqRewindButton.show();
            } 
            
            prevStitch = newChunk.stitches.last();

        }
        
        chunks.last().jqRewindButton.hide();
        chunks.first().jqRewindButton.show();

		saveGame();            
        updateWordCount();
        
    }
    
    var clear = function() {
        
        // we record the stitches read so the editor can mimic it
        var playList = [];

        // Adapted from editor.js
        // Don't know why I need to do it like this, but here goes. 
        
        for(var i=0; i<chunks.length; ++i) {
            var chunk = chunks[i];
            playList.push(chunk.stitches[0])
            chunk.remove();
        }
        chunks = [];

        
        $("#player_container").remove();
        
        return playList;
        
    }
    
    var setup = function(fromStitch) { 

        clear();
    
        var jqPlayer = $('<div id="player_container">\
                              <div id="read_area">\
                              </div>\
                              <div id="wordcount"></div>\
                          </div>');
                
        $("#main_viewport").append(jqPlayer);
        createFromModel(fromStitch);
        
        var jqFirstChunk = $("#read_area .chunk").first();
        jqFirstChunk.prepend('<h1>' + StoryModel.storyName() + '</h1>'
                                              +'<h2>by ' + StoryModel.authorName() + '</h2>'
        );
        
        var jqFirstStitch = jqFirstChunk.find(".stitch").first();
        jqFirstStitch.addClass("openingStitch");
        
        sizeEditorCorrectly();
        

    }
    
    var setReadOnlyMode = function(_readOnly) {
        readOnly = _readOnly;
    }
    
    var saveKey = function() {
    	return "inklewriter_saved_game" + StoryModel.storyName().camelCase().substring(0, 16);
    }
    
    var getSavedGame = function() {
		var defaultSavedGame = [ StoryModel.initialStitch ];
		var savedGame = null;
		var constructedSaveGame = [];
    	if ( hasStorage )  {
			// ensure stitches are named (only need to do this once)
			StoryModel.nameStitches();    	
    		if ( localStorage[saveKey()] ) {
	    		savedGame = JSON.parse(localStorage[saveKey()]);
		
				/*
					validate the save game
				*/
				
				var found = (savedGame.length > 0);
				for (var i = 0 ; i < savedGame.length && found ; i++ ) {	
					found = false;
					for (var j = 0; !found && j < StoryModel.stitches.length ; j++) {
						if (StoryModel.stitches[j].name() == savedGame[i]) {
							 // replace array entry with the appropriate stitch
							constructedSaveGame.push( StoryModel.stitches[j] );
							found = true;
						}
					}
				}
				if (!found) 
					constructedSaveGame = [];		
			}
		} 
		
		if ( constructedSaveGame.length > 0 )
			return constructedSaveGame;
		return defaultSavedGame;
    }
    
    var saveGame = function() {
    	if (!hasStorage || !readOnly) return;

    	var savedStitchList = [];
    	for (var i = 0 ; i < chunks.length ; i++ ) {
    		savedStitchList.push( chunks[i].stitches.first().name() );
    	}
    	localStorage[saveKey()] = JSON.stringify(savedStitchList);
    }
        
    // Module design pattern: Return public object
    return {
        setup: setup,
        clear: clear,
        createFromModel: createFromModel,
        getSavedGame: getSavedGame,
        setReadOnlyMode: setReadOnlyMode,
        launchGraph: launchGraph,
        readOnly: function() { return readOnly; }
    };
    
    
}(); // NOTE: These brackets cause the PlayMode object to be immediately constructed

function NumToWords()
{

   this.convert = function (n)
   {
        var prefix = "";
      if (n < 0 ) {
        prefix = "minus ";
        n = -n;
      }
      if (n == 0)
      {
         return 'zero';
      }

      var str = _getIntAsWordsRecursively(n, 0);
      var c   = str.lastIndexOf(','      );
      var h   = str.lastIndexOf('hundred');

      // If no 'hundred' substring was found after the last comma...
      if (h < c)
      {
         // Replace the last ', ' with ' and '.
         str = str.substring(0, c) + ' and ' + str.substring(c + 2);
      }

      return prefix + str;
   };

   // Private functions. ////////////////////////////////////////////////////////////////////////

   /*
    *
    */
   function _getIntAsWordsRecursively(n, nThousandsExponent)
   {
      var str = _getNonZeroNumberLessThanOneThousandAsWords(n % 1000);

      if (str != '' && nThousandsExponent > 0)
      {
         str += ' ' + _words.illions[nThousandsExponent - 1];
      }

      if (n < 1000)
      {
         return str;
      }

      return _getIntAsWordsRecursively(Math.floor(n / 1000), nThousandsExponent + 1) +
      (
         (str == '')? '': ', ' + str
      );
   }

   /*
    *
    */
   function _getNonZeroNumberLessThanOneThousandAsWords(n)
   {
      if (n == 0)
      {
         return '';
      }

      if (n < 10)
      {
         // n < 10.
         return _words.digits[n - 1];
      }

      if (n < 20)
      {
         // 10 <= n < 20.
         return _words.teens[n - 10];
      }

      if (n < 100)
      {
         // 20 <= n < 100.
         return _words.tens[Math.floor(n / 10) - 1] +
         (
            (n % 10 == 0)? '': '-' + _words.digits[n % 10 - 1]
         );
      }

      if (n < 1000)
      {
         // 100 <= n < 1000.
         return _words.digits[Math.floor(n / 100) - 1] + ' hundred' +
         (
            (n % 100 == 0)? '': ' and ' + _getNonZeroNumberLessThanOneThousandAsWords(n % 100)
         );
      }

      return n;
   }

   // Private variables. ////////////////////////////////////////////////////////////////////////

   var _words =
   {
      digits: ['one', 'two'   , 'three' , 'four' , 'five' , 'six'  , 'seven'  , 'eight' , 'nine'  ],
      tens  : ['ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
      teens :
      [
         'ten'    , 'eleven' , 'twelve'   , 'thirteen', 'fourteen',
         'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
      ],
      illions:
      [
          // See http://en.wikipedia.org/wiki/Names_of_large_numbers.
          'thousand'  , 'million'   , 'billion'  , 'trillion'
      ]
   };
}
