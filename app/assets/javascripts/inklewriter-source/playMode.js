var Player = function() {

    var chunks = [];
    var readOnly = false;
    var engine = new StoryEngine();

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

        var prevFlags = chunks.last() ? chunks.last().flagsCollected : [];

        if (!fromStitch)
        {
            // Normal read mode, when editing
            if (!readOnly) {
                removeDeadOptions();
                this.jqPlayChunk.html(tr("This page intentionally left blank.") + "<br>(<a href='javascript:EditorMenu.enterEditMode();'>" + tr("Continue the story from here") + "</a>.)");
            }
            // Read only mode (e.g. from sharing)
            else {
                this.jqPlayChunk.html("<div class='the_end'>" + tr("End") + "</div>");
            }
            $("#read_area").append(this.jqPlayChunk);
            return;
        }

        var chunkData = engine.buildChunk(fromStitch, prevFlags);

        this.stitches          = chunkData.stitches;
        this.flagsCollected    = chunkData.flags;
        this.wordCount         = chunkData.wordCount;
        this.hadSectionHeading = chunkData.hadSectionHeading;

        this.jqTextBlock = this.jqPlayChunk.find('.stitch_block');
        this.jqTextBlock.html(chunkData.html);
        this.jqPlayChunk.append(this.jqTextBlock);

        // Show flag side-panel in editor mode
        if (!readOnly && chunkData.newFlags.length > 0) {
            var jqList = this.jqFlags.find('ul');
            for (var i = 0; i < chunkData.newFlags.length; i++) {
                var flagInfo    = chunkData.newFlags[i];
                var displayText = flagInfo.text;
                if (flagInfo.valueAfterSet !== null) {
                    displayText += " (" + tr("now") + " " + flagInfo.valueAfterSet + ")";
                }
                jqList.append('<li>' + displayText + '</li>');
            }
            this.jqFlags.show();
        }

        $("#read_area").append(this.jqPlayChunk);
       
        this.createOptionBlock();

        // create rewind button (hidden by default)
        this.jqRewindButton = $('<div class="rewindButton" tooltip="' + tr("Rewind to here") + '"></div>');
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
        	   this.jqRewindButton.text(tr("Start again"));
            }
        }
    }
    
    PlayChunk.prototype.remove = function() {
        this.jqPlayChunk.remove();
    }
    
    PlayChunk.prototype.createOptionBlock = function() {

        var dividerLineHtml = "<div class='option-divider'></div>";

        this.jqOptBlock = $("<div class='option_block'>" + dividerLineHtml + "</div>");

        var builtOptions = engine.buildOptions(this.stitches, this.flagsCollected);
        var isEnd        = this.stitches.last().options.length === 0;

        if (isEnd) {
            // end!
            this.jqTextBlock.append('<div class="the_end">' + tr("End") + '</div>');
            if (!readOnly) {
                this.jqTextBlock.append('<br>(<a href="javascript:EditorMenu.enterEditMode();">' + tr("Go back to Write mode to continue") + '</a>.)</div>');
            } else {
                this.jqTextBlock.find('.the_end').append("<div class='back_to_top'></div>");
                this.jqTextBlock.find('.back_to_top').bind('click tap', function() {
                    scrollTo(chunks.first().jqPlayChunk);
                });
                $("#read_area").append("<div id='madeby'>" + tr("Text &copy; the author.") + " <a href='http://www.inklestudios.com/inklewriter'><strong>inklewriter</strong></a> © <a href='http://www.inklestudios.com'><strong>inkle</strong></a></div>");
            }
        } else {
            for (var i = 0; i < builtOptions.length; i++) {
                var optInfo = builtOptions[i];
                if (optInfo.valid || !readOnly) {
                    var newOpt = new PlayOption(optInfo.option, optInfo.valid);
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
        for (var deleteChunkIdx = chunkIdx + 1; deleteChunkIdx < chunks.length; deleteChunkIdx++) {
            chunks[deleteChunkIdx].jqPlayChunk.remove();
            chunks[deleteChunkIdx].remove();
        }
        chunks = chunks.slice(0, chunkIdx + 1);

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

        this.jqPlayOption = $('<div class="option_button">' + engine.smartQuote(optionLink.text()) + '</div>');

        this.linkTo = optionLink.linkStitch();

        var linkTo = this.linkTo;

        if (!optionLink.writeModeOnly && valid) {
            this.jqPlayOption.bind("click tap", function() {

                // Show the rewind button on the chunk we just visited
                if (!readOnly || (chunks.last().hadSectionHeading && StoryModel.allowCheckpoints)) {
                    chunks.last().jqRewindButton.show();
                }
                // Only first chunk's rewind button should be visible
                else {
                    chunks.first().jqRewindButton.show();
                }

                var nextStitch = linkTo;
                $(".option_block").addClass('expired');

                chunks.push(new PlayChunk(nextStitch));

                saveGame();

                updateWordCount();

                addOptionText(optionLink);

            });
        } else {
            // Todo --> indicate the WRITE mode button with a popup
            this.jqPlayOption.addClass("disabled");
            if (optionLink.writeModeOnly)
                this.jqPlayOption.attr("tooltip", tr("Switch to writing mode to continue."));
            else
                this.jqPlayOption.attr("tooltip", tr("This option has been disallowed by conditions."));
        }
    };

    var addOptionText = function(optionLink) {
        if (optionLink.text() != "..." && StoryModel.optionMirroring)
            chunks.last().jqPlayChunk.prepend('<div class="option_chosen">' + engine.smartQuote(optionLink.text()) + '</div>');
    };

    //----------------------

    var updateWordCount = function() {
        if (readOnly) return false;
        var totWordCount = 0;
        for (var i = 0; i < chunks.length; i++) {
            totWordCount += chunks[i].wordCount;
        }

        if (totWordCount <= 100)
            totWordCount = totWordCount - (totWordCount % 10) + 10;
        else
            totWordCount = totWordCount - (totWordCount % 100) + 100;

        $('#wordcount').text(tr("About &count words", {count: commadString(totWordCount)}));
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
        var graph = new GraphModel(chunks.last().stitches.last());
    }

    var createFromModel = function(thisStitchList) {
        var prevStitch = null;
        for (var i = 0; i < thisStitchList.length; i++) {
            $(".option_block").remove();

            var newChunk = new PlayChunk(thisStitchList[i]);
            chunks.push(newChunk);

            if (prevStitch) {
                for (var j = 0; j < prevStitch.options.length; j++) {
                    if (prevStitch.options[j].linkStitch() === thisStitchList[i]) {
                        addOptionText(prevStitch.options[j]);
                        break;
                    }
                }
            }

            if (!readOnly || (chunks.last().hadSectionHeading && StoryModel.allowCheckpoints)) {
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

        for (var i = 0; i < chunks.length; ++i) {
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
            + '<h2>by ' + StoryModel.authorName() + '</h2>'
        );

        var jqFirstStitch = jqFirstChunk.find(".stitch").first();
        jqFirstStitch.addClass("openingStitch");

        sizeEditorCorrectly();
    }

    var setReadOnlyMode = function(_readOnly) {
        readOnly = _readOnly;
    }

    var saveGame = function() {
        if (!hasStorage || !readOnly) return;
        var savedStitchList = [];
        for (var i = 0; i < chunks.length; i++) {
            savedStitchList.push(chunks[i].stitches.first().name());
        }
        engine.saveGame(savedStitchList);
    }

    var getSavedGame = function() {
        return engine.getSavedGame();
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
