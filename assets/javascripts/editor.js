



var Editor = function() {

    this.joinButton = null;
    this.newOptionButton = null;
    this.joiningMode = false;

    this.editorSizes = ["normal", "compact", "dense"];
    var currentSize = 0;

    var settings = {
        "conditionals": true,
        "animations": true,
        "graphing": true,
        "images": true,
        "find": true
    };

    var chunks = [];

    
//  JI:  commented list of stitchBoxes used for looking up if stitches are visible
//    var allStitchBoxes = [];
    var options = [];
    
    var currentStitchBox = null;
    
    var selectedOption = null;


// Search
    var stitchRoute = [];
    var performingLayoutWork = false;
    
    var setCurrentStitchBox = function(newStitchBox) {
    
        if (newStitchBox === null && currentStitchBox) {
            currentStitchBox.cursorPos = {};
        }
        
        if( newStitchBox != currentStitchBox ) {
            if( currentStitchBox ) {
                currentStitchBox.setCurrent(false);
            }
            if( newStitchBox ) {
                newStitchBox.setCurrent(true);
            }
            
            currentStitchBox = newStitchBox;
        }
    }
    
    var statsLabelForStitch = function(stitch, discludeNormalLinks) {
        var jqStatsMessage = $("<div class='important'></div>");
        
        if( stitch ) {
            
            // Count options, and which ones are linked
            var stats = stitch.stats();
            if( stats.numOptions > 0 ) {
                
                if (!discludeNormalLinks) {
                    
                    // e.g. "2 options. 1 loose end."
                    var optionPl = stats.numLinked == 1 ? "link" : "links";
                    if( stats.numLinked > 0 ) {
                        jqStatsMessage.append(stats.numLinked + " " + optionPl + ".");
                    }
                }
                var looseEndIdx = 0;
                if( stats.numLooseEnds > 0 ) {
                    var endPl = stats.numLooseEnds > 1 ? "ends " : "end ";
                    jqStatsMessage.append(" " + stats.numLooseEnds + " loose "+endPl+"(");
                    var conjunctive = "";
                    
                    stats.looseEnds.each( function() {
                        
                        var jqLabel = $("<span optIdx = "+looseEndIdx +" class='shortcut' tooltip='Write from here'></span>");
                        if (this.text() !== "") {
                            jqLabel.text(conjunctive + this.text())
                        } else {
                            jqLabel.text(conjunctive + "...");
                        }                        

                        jqLabel.bind('click tap', function() {
                            var optToFollow = stats.looseEnds[$(this).attr('optIdx')];
                            
                            // just check we're not actually already focused on
                            // a blank stitch attached to this loose end...
                            if (chunks.last().sourceOption == optToFollow) return;
                        
                            // if in graph mode...
                            $('#graphContainer').remove();   
                            $('.eventAbsorber').remove();                     
                            
                            navigateToStitch(stitch);
                            followLink(optToFollow);
                        });

                        jqStatsMessage.append(jqLabel);
                        
                        conjunctive = ", ";
                        looseEndIdx++;
                        
                    });
                    jqStatsMessage.append("<span>)</span>");

                }
            }
            
            // No options - the end
            if( stats.deadEnd ) {
                var jqLabel = $("<span class='shortcut' tooltip='Continue from here'>End.</span>");
                jqLabel.bind('click tap', function() {
                    // if in graph mode...
                    $('#graphContainer').remove();                        
                    navigateToStitch(stitch);
                    addNewOption();                    
                });
                jqStatsMessage.append(jqLabel);
            }
        }
        
        return jqStatsMessage;
    }
    
    // --------------------- StitchBox -----------------------------
    // Bound functions:
    //  - focus         (when focus enters the text area)
    //  - stitchAdded   (when a stitch is created for a blank stitch box)
    //  - returnPressed (which user presses return within the StitchBox)
    var StitchBox = function(stitch, ownerChunk) {
        var self = this;
        this.stitch = null;
        this.ownerChunk = ownerChunk;
        this.textChanged = false;
        
        //  JI:  commented list of stitchBoxes used for looking up if stitches are visible
        // allStitchBoxes.push(this);
        
        this.bind = new Bind(this);
        
        this.cursorPos = {};
        
        var stitchText = "";
        if( stitch ) {
            stitchText = FormattingToHTML(stitch.text());
            this.stitch = stitch;

            //  JI:  Alt to list of stitchBoxes used for looking up if stitches are visible
            this.stitch._stitchBox = this;
        }
        
        this.jqStitchBox = $('<div class="stitchBox"> \
                                 <div class="stitchBoxBackground"> \
                                    <div class="paper-top"></div> \
                                    <div class="paper-mid"></div> \
                                    <div class="paper-bottom"></div> \
                                 </div> \
                                 <div class="pageBox" tooltip="Click to edit the section name"> </div> \
                                 <div class="flagBox"> \
                                    <div id="flagBoxBackgroundLeft"> \
                                        <img src="/img/bookmark-left.png"></img> \
                                    </div> \
                                    <div id="flagBoxBackgroundRight"> \
                                        <img src="/img/bookmark-end.png"></img> \
                                    </div> \
                                    <ul id="flags"> \
                                    </ul> \
                                 </div> \
                                 <div class="stitchImage" tooltip="Click to edit this image"><img/></div/> \
                                 <div class="stitchText" contentEditable="true">'+stitchText+'</div>' +
                                 conditionalHtml()  +
                              '</div>');

        this.jqStitchBoxText = this.jqStitchBox.find(".stitchText");
        
		this.jqImageRegion = this.jqStitchBox.find(".stitchImage");
		this.jqImage = this.jqImageRegion.find("img");	
		
		this.jqImage.bind('click tap', function() {
			self.focus();
			Widget.insertImage();
		});
		
        wireConditional(this, this.jqStitchBox, stitch);

        if( !stitch ) {
            this.updateBlankProperty();
        }

        this.jqStitchBoxText.bind("paste", function(event) {
            
            setTimeout(function() {
                // we dissect the contents of the textbox using line breaks to separate
                var contentsHTML = HTMLToFormatting(cleanWordPaste(self.jqStitchBoxText.html()));
                var sectionsOfHTML = contentsHTML.split(/\n/).clean("");
                var leadingEdgeStitch = self;
                
                // insert stitch boxes using the array elements
                for (var i = 0 ; i < sectionsOfHTML.length - 1; i++) {
                    leadingEdgeStitch = leadingEdgeStitch.insertBelow({
                        left: sectionsOfHTML[i],
                        right:  ""
                    });
                }
                // fill in the last stitch
                leadingEdgeStitch.jqStitchBoxText.html(FormattingToHTML(sectionsOfHTML.last()));
            
            }, 4);
        });

        this.jqStitchBoxText.bind("keydown", function(event) {

            var modifierKey = (event.altKey || event.ctrlKey || event.shiftKey || event.metaKey);

            // ctrl+B
            if ( event.which == 66 && modifierKey && !event.shiftKey) {
                 document.execCommand('bold',false,null);
                 event.preventDefault();
            }
            
            // ctrl+I
            if ( event.which == 73 && modifierKey && !event.shiftKey) {
                 document.execCommand('italic',false,null);
                 event.preventDefault();
            }


            // Return - creates a new stitch
            if( event.which === 13 ) {
                event.preventDefault();
                
                // if used held Shift, Ctrl or Alt, then we actually move focus to first option,
                // creating if necessary
                if (modifierKey)
                {

                    if (self.ownerChunk != chunks.last())
                        rewindToChunk(self.ownerChunk);
                    addNewOption();
                    return;
                }
                
                // if stitch is blank, do nothing
                if (!self.hasContent() && !self.numberOfFlags())
                    return;
                
                if( !self.stitch ) {
                    self.createStitch();
                    StitchList.update();
                }
                
                updateJoinButton();
                    
                self.bind.handle("returnPressed");
                event.preventDefault();
            }

            else if ( event.which == 37 && modifierKey) {

                if (self.ownerChunk != chunks.last()) {
                    rewindToChunk(self.ownerChunk);
                    self.jqStitchBoxText.focus();
                    event.preventDefault();
                    return false;
                }
            }

            // Up key - if at far left            
            else if ( event.which == 38 && self.cursorPos.farLeft && self != chunks[0].stitchBoxes[0]) {
                // move focus to previous stitch box
                self.bind.handle("upKeyPressed");
                event.preventDefault();
                return false;
            }
 
            // Down key - if at far right            
            else if ( event.which == 40 && self.cursorPos.farRight) {
                // move focus to previous stitch box
                self.bind.handle("downKeyPressed");
                event.preventDefault();
                return false;
            } 
 
            // Backspace 
            else if( event.which == 8 ) {

				if (self.stitch) {
					if (self.stitch.image() && (!self.hasContent() || (self.cursorPos.farLeft && self.cursorPos.collapsed))) {
						addOrRemoveImage(self.stitch, null);
						event.preventDefault();
						return false;
					}
				}

                if( !self.hasContent() ) {
                    self.bind.handle("finalBackspace");
                    event.preventDefault();
                    return false;
                    
                }
                if (self.cursorPos.farLeft && self.cursorPos.collapsed && self != self.ownerChunk.stitchBoxes[0]) { 
                    var stitchContent = self.jqStitchBoxText.html();
                    self.bind.handle("finalBackspace");
                    if (currentStitchBox)
                    {
                        currentStitchBox.jqStitchBoxText.append(stitchContent);
                        currentStitchBox.reflectToModel();
                    }
                    self.reflectToModel();
                    event.preventDefault();
                    return false;
                }
            }
        });
        this.jqStitchBoxText.bind("keyup", function(event) { 
            self.captureCursor();
            if( event.which != 13 ) {
                self.reflectToModel(); 
            }
            if (!( event.which >= 37 && event.which <= 40 )) // not an arrow key
                self.textChanged = true;
            self.updateBlankProperty();
            
        });
        
        this.jqStitchBoxText.bind("focus", function() {
            if (currentStitchBox) {
                removeStrayBlanks(self, currentStitchBox.ownerChunk);
            }
            setCurrentStitchBox(self);            
            self.updateBlankProperty();
            selectedOption = null;
            StitchList.update();
            moveCaretToEndOf(this);
            scrollTo(this);
            self.bind.handle("focus");
//            removeStrayBlanks(self);
            self.jqStitchBox.addClass("selected");
            updateJoinButton();
            updateRewindButtons();
            self.captureCursor();
            if (self.stitch) {
	            updateImageWidgetButton(self.stitch.image());
	        } else {
				updateImageWidgetButton(false);
			}
        });


        this.jqStitchBoxText.bind("focusout", function(eventObj) { 
            updateImageWidgetButton(false);
            self.jqStitchBox.removeClass("selected");
            if (self.stitch)
            {
                self.jqStitchBoxText.html(RefreshHTML($(this).html()));
                var jqRewindButton = self.ownerChunk.jqChunk.find(".rewindButton");
                jqRewindButton.addClass("noText");
                jqRewindButton.empty();
            }
            
            self.updateBlankProperty();
            // We don't reflect here, because we don't need to, and this is called on clicking
            // the stitch list. Reflecting rebuilds the stitch list and removes click binding, 
            // resulting a double click being required for stitch selection. 
            if (!performingLayoutWork && self.textChanged) {
                self.textChanged = false;
                EditorMenu.requireSave();
            }
            
            
        });
        
        this.jqStitchBoxText.bind("mousedown", function() {
            $(document).bind("mouseup", function() {
                self.captureCursor();
                $(document).unbind("mouseup");
            });
        });

        if( stitch ) {
            this.jqStitchBox.data("stitch", stitch);
        }
        
        this.jqStitchBox.data("stitchBox", this);
        
        self.setUpFlagBox();
        
        if ( stitch )
        {
            self.setUpPageButton();
            if (stitch._backlinks.length > 1) {
                this.jqStitchBox.prepend("<div class='backlinks'>" + stitch._backlinks.length + " links in</div>");
            }
            
            
            if (stitch.runOn() )
            	self.displayEllipsisSymbol(true);
            
			self.displayImage(stitch.image());
                        
        } else {
            this.jqStitchBox.find(".pageBox").hide();
            self.jqImageRegion.hide();
        }
        

        
    }
    

    
    StitchBox.prototype.createStitch = function(initialText) {
        this.stitch = StoryModel.createStitch(initialText);
        //  JI:  Alt to list of stitchBoxes used for looking up if stitches are visible
        this.stitch._stitchBox = this;
        wireConditional(this, this.jqStitchBox, this.stitch);
        this.bind.handle("stitchAdded");

        // Now the stitch is wired into the graph safely, we update the UI
        this.updateBlankProperty();        
        this.setLeadingEdge();

        // finally, we kick off a save and return
        EditorMenu.requireSave();
        return this.stitch;
    };
    
    StitchBox.prototype.reflectToModel = function() {
        
        var newStitchText = HTMLToFormatting(this.jqStitchBoxText.html());
        
        // Does this stitch box have its own stitch yet?
        // If not, create a new stitch for it
        if( !this.stitch ) {
            if( $.trim(newStitchText).length > 0 ) {
                this.createStitch(newStitchText);
                StitchList.update();
                this.setUpPageButton();
            }
        } else {
            this.stitch.text(newStitchText);
        }
        
        // find the text for this stitch in the list and rewrite
        
        if (StitchList.expanded) {         
            StitchList.jqActiveStitchRowText.html( this.jqStitchBoxText.html() );
        }

    }
    
    StitchBox.prototype.setStitch = function(targetStitch) {
        this.stitch = targetStitch;
        this.jqStitchBoxText.text( this.stitch.text() );
        this.updateBlankProperty();
    }
    
    StitchBox.prototype.focus = function() {
        this.jqStitchBoxText.focus();
    }
    
    StitchBox.prototype.displayEllipsisSymbol = function(show) {
    	if (show) {
    		this.jqStitchBoxText.after('<div id="ellipsis">[...]</div>');
    	} else {
    		this.jqStitchBox.find('#ellipsis').remove();
    	}
    }
    
    StitchBox.prototype.displayImage = function(imageLink) {
		if (!imageLink) {
			this.jqImageRegion.hide();
		} else {
			// display the image supplied
			this.jqImage.attr("src", imageLink);
			this.jqImageRegion.show();
		}			    	
    }
    
    StitchBox.prototype.remove = function() {
        //  allStitchBoxes.remove(this);
        //  JI:  Alt to list of stitchBoxes used for looking up if stitches are visible
        var self = this;
        if (self.stitch) {

            // this stitch is no longer visible
            self.stitch._stitchBox = null;

            // ...except if it is, because of a loop
            // if so, repoint the stitchBox property to this latest remaining stitchBox
            for (var i = chunks.length; i >= 0 && ! this.stitch._stitchBox; i--) {
                if (chunks[i]) {
                    chunks[i].stitchBoxes.each( function() {
                        if (this.stitch === self.stitch && this !== self) {
                            this.stitch._stitchBox = this;
                        }
                    });
                }
            }

        }
        if (settings.animations)
            this.jqStitchBox.slideUp("slow", function() { $(this).remove(); });
        else
            this.jqStitchBox.remove();
    }
    
    StitchBox.prototype.allowDetach = function(allow) {
        var stitchBox = this;
        var jqExistingUnjoinButton = this.jqStitchBox.find(".unjoinButton");
        
        // Add new detach button
        if( allow && jqExistingUnjoinButton.length == 0 ) {
            var jqUnjoinButton = $('<div class="unjoinButton" tooltip="Unlink these two paragraphs">Unlink</div>');
            
            var stitchBoxBeforeStitchBox = this.ownerChunk.stitchBoxes.prev(stitchBox);
            
            if ( this != this.ownerChunk.stitchBoxes.first() ) {
                jqUnjoinButton.addClass('directlinked');
            } else {
                jqUnjoinButton.addClass('optionlinked');  
                stitchBoxBeforeStitchBox = chunks.prev(this.ownerChunk).stitchBoxes.last();
            }
            
            this.jqStitchBox.append(jqUnjoinButton);
            
            jqUnjoinButton.bind('click tap', function() {
                // find first stitchbox for this stitch->stitch connection
                // rewind to the chunk of the (lower) stitch
                // detach it
                
                if (!confirm("Unlink these two paragraphs? This will create a new loose end here. Unattached paragraphs will still appear in the contents list.")) 
                    return false;
                
                var detachBox = null;
                var rewindChunk = null;
                chunks.each( function() { this.stitchBoxes.each( function() {
                        if (!rewindChunk && this.stitch == stitchBoxBeforeStitchBox.stitch) {
                            // find the box that follows this stitchbox
                            detachBox = this.ownerChunk.stitchBoxes.next(this);
                            if (!detachBox) {
                                detachBox = chunks.next(this.ownerChunk).stitchBoxes.first();
                            }
                            
                            // if the following box contains the stitch we're unlinking, proceed
                            if (detachBox.stitch == stitchBox.stitch) {
								// rewind to the chunk owned by this stitch-box
                                rewindChunk = this.ownerChunk;
                            }
                        }
                    });
                });

                detachBox.ownerChunk.detachStitchBoxAndChildren(detachBox);
                
                rewindToChunk(rewindChunk);
                
                rewindChunk.stitchBoxes.last().setLeadingEdge();

                StoryModel.updateGraphModel();
                StitchList.update();
            })
        }
        
        else if( !allow && jqExistingUnjoinButton.length > 0 ) {
            jqExistingUnjoinButton.remove();
        }
    }
    

    
    StitchBox.prototype.trimmedText = function() {
        return this.stitch ? $.trim(this.stitch.text()) : "";
    }
    
    StitchBox.prototype.hasContent = function() {
        return this.trimmedText().length > 0;
    }
	

    StitchBox.prototype.insertBelow = function(HTMLfragments) {
        // delete unwanted content from original stitchbox and save
        var stitchBox = this;
        var self = stitchBox.ownerChunk;
        stitchBox.jqStitchBoxText.empty();
        stitchBox.jqStitchBoxText.append(HTMLfragments.left);
        stitchBox.reflectToModel();
        
        // Create new box at the end
        if( stitchBox == self.stitchBoxes.last() ) {
            // Create another stitch box
            var newStitchBox = self.addNewBlankStitchBox();
        
            // if it has initial content, then give it a stitch
            if (HTMLfragments.right.length > 0) {
                newStitchBox.createStitch(HTMLfragments.right);
                newStitchBox.jqStitchBoxText.append(HTMLfragments.right);
            }
            
        }
        
        // Insert a new stitch in the middle of the chunk
        else {
            // The three stitch - split, new, and after
            
            var splitStitch = stitchBox.stitch;

            // 1) create a new blank stitch linked to stitchBox, that links to laterStitch
            var newStitch = StoryModel.createStitch(HTMLfragments.right);

            var laterStitch = self.stitchBoxes.next(stitchBox).stitch;

            // 2) unlink laterStitch from stitchBox, then link stitch -> new -> later
            stitchBox.stitch.undivert();
            stitchBox.stitch.divert(newStitch);
            newStitch.divert(laterStitch);

            // 3) slide the stitchbox in mid-flow
            newStitchBox = new StitchBox(newStitch, self);  
            self.addStitchBox(newStitchBox, stitchBox);  
            
            // don't need to reflect the new stitch to the model, because we built it directly
            // in the model, and then cooked up the jquery front end
        }

        StoryModel.updateGraphModel();
        StitchList.update();

        // focus on the blank box, or the lower stitch
        if (stitchBox.hasContent() || stitchBox.numberOfFlags())
        {
            newStitchBox.focus();
            moveCaretToStartOf(newStitchBox.jqStitchBoxText[0]);
        } else {
            stitchBox.focus();
        }

        return newStitchBox;
    }; 

	StitchBox.prototype.updateBlankProperty = function() {
            if ( this == chunks.first().stitchBoxes[0])
                return;
			if ( this.hasContent() )
			{
				this.jqStitchBox.removeClass("blank");
				if (this.jqStitchBoxText)
				{
					this.jqStitchBoxText.removeClass("blank");
				}
				
			} else
			{
				this.jqStitchBox.addClass("blank");
				if (this.jqStitchBoxText)
				{
					this.jqStitchBoxText.addClass("blank");
				}
			}
			updateJoinButton();
	}
	
	StitchBox.prototype.numberOfFlags = function() {
	    if (!this.stitch) return 0;
	    return this.stitch.numberOfFlags();
	}
	StitchBox.prototype.flagByIndex = function(idx) {
		if (!this.stitch) return "";
	    return this.stitch.flagByIndex(idx);
	}
	StitchBox.prototype.editFlag = function(flagName, setFlag) {
		if (!this.stitch) {
		    this.createStitch();
		}
	    return this.stitch.editFlag(flagName, setFlag);
	}
	StitchBox.prototype.flagIsUsed = function(flagName, strictMode) {
	    if (!this.stitch) return false;
	    return this.stitch.flagIsUsed(flagName, strictMode);
	}
   
	StitchBox.prototype.setUpFlagBox = function () {
	    
	    var thisStitchBox = this;

	    //  now populate this one
	    var jqFlagBox = this.jqStitchBox.find(".flagBox");
	    
	    // fix: in IE7/8, hover doesn't work, so markers don't extend out from stitches
	    // this tells the CSS not to apply the nice, hidden, state of markers
	    if (navigator.appName == 'Microsoft Internet Explorer') {
	    	jqFlagBox.addClass('usingIE');
	    }
	
	    var createPopup = function(jqTextBox, currentText) {
            jqFlagBox.removeClass('unused'); 
            toggleConditionEditor();            
            new FlagPopup(jqTextBox, currentText, thisStitchBox.stitch, 
            function(owner, flag) {
                return !owner.flagIsUsed(flag);
            }, 
            function(newFlagName, previousFlag) {
                if (newFlagName != "" && newFlagName && !thisStitchBox.flagIsUsed(newFlagName, true)) {
                    if (!previousFlag) {
                        var jqNewFlag = createFlagNameDiv(newFlagName);
                        jqNewFlag.insertBefore(jqTextBox);
                    } else if (previousFlag != newFlagName) {
                        jqTextBox.text(newFlagName);
                        thisStitchBox.editFlag(previousFlag, false);
                    }
                    thisStitchBox.editFlag(newFlagName, true);
                    EditorMenu.requireSave();
                    updateOptionLogicForLastStitch();
                    StitchList.update();                        
                } else if ( thisStitchBox.numberOfFlags()==0 ) {
                    jqFlagBox.addClass('unused');                 
                }                        
            });
          }
	

        // "Add" option at bottom
        var flagDiv = function() { 
            return "<div class='icon'></div><span class='entertext add'>Add marker</span>";
        }

        // Create individual flag
        var createFlagNameDiv = function(flagName) {
            
            var jqFlag = $("<li class='flag'><div class='remove icon'></div><span class='entertext'>"+flagName+"</span></li>")
            
            jqFlag.bind('click tap', function() {
                setCurrentStitchBox(thisStitchBox);
                var jqTextBox = $(this);
                createPopup(jqTextBox, jqTextBox.text());
            });

            // call-back to let you remove the flag again
            jqFlag.find(".remove").bind('click tap', function() {
                thisStitchBox.editFlag(flagName, false);
                jqFlag.remove();
                if (thisStitchBox.numberOfFlags() == 0) {
                    jqFlagBox.addClass('unused'); 
                }
                EditorMenu.requireSave();
                updateOptionLogicForLastStitch();
                StitchList.update();
                return false;
            });
            
            return jqFlag;
        }

 	    if (!settings.conditionals) {
	       jqFlagBox.remove();
	       return;
	    }

        if (this.ownerChunk == chunks.first()) {
            jqFlagBox.remove();
        } else {
	    
            var jqFlagBoxFlags = jqFlagBox.find("#flags");
            jqFlagBoxFlags.empty();
            
            // Make the stitch box the current one when clicking the flag box
            jqFlagBox.click(function() {
                setCurrentStitchBox(thisStitchBox);
            })
        
           // find existing rules
            var numFlags = this.numberOfFlags();
            if (numFlags > 0) {
                for (var i = 0; i < numFlags; i++)
                {
                    var jqFlag = createFlagNameDiv(thisStitchBox.flagByIndex(i));
                    jqFlagBoxFlags.append(jqFlag);
                }
            } else {
              jqFlagBox.addClass('unused');  
            }
            
            var jqAddFlag = $('<li class="addFlag">' + flagDiv() + '</li>');
            jqFlagBoxFlags.append(jqAddFlag);
            
            // "Add" click callback
            jqAddFlag.bind('click tap', function() {
                if (!thisStitchBox.stitch)
                    thisStitchBox.createStitch("");
                createPopup(jqAddFlag, "");
            });
            
            // Default when setting up flags for first time            
            thisStitchBox.enableFlagEditing(false);
            
        }

	}
	
	StitchBox.prototype.enableFlagEditing = function(enable) {
	    var jqFlagBox = this.jqStitchBox.find(".flagBox");
	    var jqAdd = jqFlagBox.find(".addFlag");
	    var jqRemoveButtons = jqFlagBox.find(".remove.icon");
	    
	    // Enable flag editing
	    if( enable ) {
	        // Show flag box
	        jqFlagBox.show();
	        
	        // Show controls
	        jqAdd.show();
	        jqRemoveButtons.show();
	        
	    } 
	    
	    // Disable flag editing
	    else {
	        
	        var hasFlags = jqFlagBox.find(".flag").length > 0;
	        if( hasFlags ) {
	            // hide controls
	            jqAdd.hide();
    	        jqRemoveButtons.hide();
	        } else {
	            // hide entire thing
	            jqFlagBox.hide();
	        }
	    }
	}

    var relabelVisiblePageBoxes = function() {
       for (var i = 0 ; i < chunks.length ; i++) {
            for (var j = 0 ; j < chunks[i].stitchBoxes.length; j++) {
                var pNum = chunks[i].stitchBoxes[j].stitch.pageNumberLabel();
                if (pNum > 0) {
                    chunks[i].stitchBoxes[j].jqStitchBox.find('.page_label').text(chunks[i].stitchBoxes[j].stitch.pageLabelText());
                }
            }
       }
    }
	
	StitchBox.prototype.setUpPageButton = function() {
        //  find other page boxes and delete them
        $('.pageBox').each( function () {
            if (!$(this).hasClass("labelled"))
            {
                $(this).empty();
                $(this).hide();
            }
        });
        
	    var stitchBox = this;    
	
        var jqPageBox = stitchBox.jqStitchBox.find(".pageBox");
        jqPageBox.empty();
        
	    if (stitchBox.stitch.pageNumberLabel() > 0)
	    {
            var textChanged = false;
	        var pageLabelText = stitchBox.stitch.pageLabelText();
	    
	        var jqPageLabel = $("<div><div class='page_button minus' tooltip='Remove this label'></div><div class='page_label' contenteditable='true'> " + pageLabelText + "</div></div>");
	        
	        var jqLabelText = jqPageLabel.find(".page_label");
	        jqLabelText.bind("keydown", function(event) {
	            if (event.which == 13)
	                event.preventDefault();
	        });
	        jqLabelText.bind("keyup", function() {
                var labelText = $(this).text();
                if (labelText.match(/^\s*Section\s+\d+\s*$/))
                    labelText = "";
	            stitchBox.stitch.pageLabelText(labelText);
                if (!( event.which >= 37 && event.which <= 40 )) // not an arrow key
                    textChanged = true;
	        });
	        jqLabelText.bind("focusout", function() {
                var jqThis = $(this);

                jqThis.text(stitchBox.stitch.pageLabelText());
                if (textChanged) {
                    EditorMenu.requireSave();
                    textChanged = false;
                }
	        });
	        	            
            jqPageLabel.bind("dblclick", function() {
                if (currentStitchBox) {
                    if (stitchBox.ownerChunk == currentStitchBox.ownerChunk) {
                        // if we're already in this chunk, do nothing, and allow bubbling
                        return true;
                    } 
                }
                rewindToChunk(stitchBox.ownerChunk);
                stitchBox.focus();
            });
            
            jqPageLabel.bind('click tap', function() {
                selectElement(jqLabelText[0]);
            });
	        
	        var jqMinusButton = jqPageLabel.find('.minus');
	        
	        if (stitchBox.stitch.pageNumberLabel() == 1) {
	            jqMinusButton.remove();

	        } else {

                jqMinusButton.hide();	

	            jqPageBox.bind("mouseenter", function() {
                    jqMinusButton.show();
                    jqPageBox.css("min-width", jqPageBox.width() + 10);
	            });
	            jqPageBox.bind("mouseleave", function() {
                    jqMinusButton.hide();	          
                    jqPageBox.css("min-width", "");                       
	            });	        

	            
                jqMinusButton.bind('click tap', function() {
                   StoryModel.removePageNumber(stitchBox.stitch);
                   
                   StoryModel.updateGraphModel();
                   StitchList.update(); 
                   
                   jqPageBox.hide();
    
                   relabelVisiblePageBoxes();

                   EditorMenu.requireSave();
                   
                   return false;
                });
                
	        }
	        
	        jqPageBox.addClass("labelled");
	    }
	    else
	    {
	        if (StoryModel.pageSize(stitchBox.stitch.pageNumber()) <= StoryModel.maxPreferredPageLength / 2
	            || stitchBox.stitch.verticalDistanceFromHeader() < 2)
	        {
                return;
	        } else {
                var jqPageLabel = $("<div><div class='page_button plus'> + </div><div class='page_label'>New Section?</div></div>");
                jqPageBox.removeClass("labelled");
                jqPageLabel.bind('click tap', function() {
                    stitchBox.createPageNumber();
                    return false;
                });
            }	        
	        
	    }
        
        jqPageBox.append(jqPageLabel); 
        jqPageBox.show();
		

	}
	
	StitchBox.prototype.createPageNumber = function() {
        StoryModel.insertPageNumber(this.stitch, true);
        this.setUpPageButton();
        StoryModel.updateGraphModel();
        StitchList.update();
	    
	}
	
	StitchBox.prototype.setCurrent = function(current) {
	    this.enableFlagEditing(current);
	}
	
	StitchBox.prototype.setLeadingEdge = function() {
        // Remove existing leading edge
        $(".stitchBox.leading-edge").removeClass("leading-edge");
        
        // Set self as leading edge
        this.jqStitchBox.addClass("leading-edge");
    }
	
    var updateOptionLogicForLastStitch = function() {
        
        for(var i=0; i<options.length; ++i) {
            updateConditionalState(options[i].jqOption, options[i].storyOption);
        }
    }                

    var removeStrayBlanks = function(currentObject, fromChunk) {
        // Called when the focus is put to a stitch box or option, this
        // is an entry point for getting rid of blank, empty stitch boxes cluttering
        // up the flow.
        
        // Also used to remove conditional tests which contain no logic
        
        // Logic goes like this: if the last chunk contains a blank stitch which
        // is not the element currently in focus, remove it and relink
        
        // blankness has two definitions (!) 
        //  1) an absence of a stitch
        //  2) an absence of text
        
        if (!fromChunk) {
            fromChunk = chunks.last();
        }

        // only appropriate if we're tidying a chunk, not removing one completely!
        if (fromChunk.stitchBoxes.length > 1)
        {
        
            fromChunk.stitchBoxes.each( function() {
                var blankDetected = false;
                
                if (this.stitch)
                {
                    blankDetected =  this.stitch != StoryModel.initialStitch && !this.hasContent() && !this.stitch.image() && !hasAnyConditionals(this.stitch) && (this.stitch.numberOfFlags() == 0);
                } 
                else 
                {
                    blankDetected = true;
                }
                
                if (blankDetected && this != currentObject)
                {
                    this.bind.handle("finalBackspace");
                }
    
            });
        
        }
      
        // remove empty conditionals from stitchboxes
        chunks.each( function() {
            this.stitchBoxes.each( function() {
                if ( this != currentObject) {
                    if (!hasAnyConditionals(this.stitch)) {
                            this.jqCondElement.hide();   
                            this.jqStitchBox.removeClass('conditionalised');                 
                    }
                }
            });
        });
        
        options.each( function() {
            if ( this != currentObject) {
                if (this.storyOption.text() === "" && this.linkStitch() === null) {
                    this.deleteOption();
                } else {
                    // remove empty conditionals from options
                    if (!hasAnyConditionals(this.storyOption)) {
                        this.jqCondElement.hide();
                        this.jqOption.removeClass('conditionalised');
                    }
                }
            }
        });
        
        
        
    }


    StitchBox.prototype.captureCursor = function() {
    
        var selection = rangy.getSelection();
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
        
            this.cursorPos.start = range.startOffset; // 0-indexed first selected char
            this.cursorPos.startContainer = range.startContainer;
            this.cursorPos.end = range.endOffset; // 0-indexed first unselected char
            this.cursorPos.endContainer = range.endContainer;
            // pos == end pos indicates caret and not selection!
            // positions are relative to whatever html blob we happen to be in       
            
            this.cursorPos.collapsed = range.collapsed;
    
            this.cursorPos.farLeft = doesSelectionStartAtEdgeOfJqItem(this.jqStitchBoxText, range, true);
            this.cursorPos.farRight = doesSelectionStartAtEdgeOfJqItem(this.jqStitchBoxText, range, false);

        }
        
    }

    
    // --------------------- Chunk -----------------------------
    
    var Chunk = function() {
        
        this.stitchBoxes = [];
        
        this.jqRewindButton = null;
         
        // Create the content
        this.jqChunk = $('<div class="chunk"> \
                            <div class="chunkStatsLabel">End.</div> \
                          </div>');
        this.jqChunk.data("Chunk", this);
        
        // Add new chunk before the options block
        $(".options").before(this.jqChunk);
        
        this.jqStatsLabel = this.jqChunk.find(".chunkStatsLabel");
        
        var chunk = this;
        

    }
    
    Chunk.prototype.addRewindButton = function() {
        var chunk = this;
        this.jqRewindButton = $('<div class="rewindButton noText" tooltip="Rewind to here"></div>');
        this.stitchBoxes.first().jqStitchBox.append(this.jqRewindButton);
        
        this.jqRewindButton.bind("mousedown", function() { 
            rewindToChunk(chunk);
        });
        this.jqRewindButton.hide();

    }
    
    Chunk.prototype.addStitchBox = function(stitchBox, afterStitchBox) {
        var self = this;
        if (afterStitchBox === undefined)
        {             
             this.stitchBoxes.push(stitchBox);
             this.jqChunk.append(stitchBox.jqStitchBox);
        }
        else
        {
            afterStitchBox.jqStitchBox.after(stitchBox.jqStitchBox);
            self.stitchBoxes.splice(self.stitchBoxes.indexOf(afterStitchBox) + 1, 0, stitchBox);
        }
        
        if (stitchBox.stitch) 
            stitchBox.setUpPageButton();
            
        // When this stitch box is clicked, tell editor to
        // rewind back to this chunk
        stitchBox.bind("focus", function() {
            toggleConditionEditor();
            var jqRewindButton = self.jqChunk.find(".rewindButton");
            jqRewindButton.removeClass("noText");
            jqRewindButton.text("shift-left");
            
            $(".unjoinButton").remove();
            
            if( (self != chunks.first() || stitchBox != self.stitchBoxes.first() ) 
                && ( self == chunks.last() ) ) {
                stitchBox.allowDetach(true);
                updateJoinButton();
            }
            
        });
        
        // When return key pressed within this stitch box, we
        // want to create a new stitch box instead of putting a
        // return character in
        stitchBox.bind("returnPressed", function() {
            
            // return key on far left of first stitch doesn't do anything
            if (stitchBox.cursorPos.farLeft && stitchBox == chunks.first().stitchBoxes.first())
                return;
            
            var HTMLfragments = getContentFromCursor(stitchBox);

            stitchBox.insertBelow(HTMLfragments);
                
            
            
        });
        
        // when up is pressed, move focus up
        stitchBox.bind("upKeyPressed", function() {
            var prevStitchBox = self.stitchBoxes.prev(this);
            if (prevStitchBox == null && self == chunks.first()) {
                return;
            }
            if (prevStitchBox) {
                prevStitchBox.focus();
            } else {
                chunks.prev(self).stitchBoxes.last().focus();
            }
        });
        
        // when down is pressed, move focus down
        stitchBox.bind("downKeyPressed", function() {
            var nextStitchBox = self.stitchBoxes.next(this);
            if (nextStitchBox) {
                nextStitchBox.focus();
                moveCaretToStartOf(nextStitchBox.jqStitchBoxText[0]);
            } else if (chunks.next(self)) {
                var nextStitchBox = chunks.next(self).stitchBoxes[0];
                nextStitchBox.focus();
                moveCaretToStartOf(nextStitchBox.jqStitchBoxText[0]);
            } else {
                if (options.length == 0)
                {
                    addNewOption();
                } else {
                    options.first().focus();
                }
            }
        });
        
        // When backspace is pressed, delete the stitch box if it
        // isn't the final one in the chunk, and relink everything
        stitchBox.bind("finalBackspace", function() {
        
            var prevStitchBox = self.stitchBoxes.prev(this);
            
            if( prevStitchBox == null && self == chunks.first() ) {
                // can't backspace from opening stitch
                return;
            }
            
            // Remove this one
            self.removeStitchBoxAndRelink(this, true);
            
            // Focus on the previous one
            if( prevStitchBox ) {
                prevStitchBox.focus();
                prevStitchBox.setLeadingEdge();
            } else if ( self.stitchBoxes.length == 0 ) {
                // else we've moved up the chain, so focus on the last     option
                options.last().focus();
            } else {
                self.stitchBoxes.first().focus();
            }
            
            updateJoinButton();
        });
        
        
        
        updateJoinButton();
    }
    
    Chunk.prototype.addNewBlankStitchBox = function(text) {
        
        var chunk = this;
        var blankStitchBox = new StitchBox(undefined, chunk);
                
        this.addStitchBox(blankStitchBox);
        
        // Add callback for after a new story stitch has been created for 
        // this blank stitch box
        // "this" is the stitchBox
        blankStitchBox.bind("stitchAdded", function() {
            
            var stitchBox = this;
            
            // Is the first stitch box? Link to the source option that created us
            if( chunk.stitchBoxes.length == 1 ) {
                chunk.sourceOption.linkStitch(stitchBox.stitch);
                
                // Update stats labels
                var prevChunk = chunks.prev(chunk);
                if( prevChunk ) {
                    prevChunk.updateStatsLabel();
                }
                chunk.updateStatsLabel();
            }
            
            // Link to stitch box above
            else if ( chunk.stitchBoxes.length > 1 ){
                var prevStitchBoxIdx = chunk.stitchBoxes.length-2;
                var prevStitchBox = chunk.stitchBoxes[prevStitchBoxIdx];
                var prevStitch = prevStitchBox.stitch;
                
                // Transfer ownership of the options to the new stitch, and
                // divert to this stitch
                var newStitch = stitchBox.stitch;
                transferOptions(prevStitch, newStitch);
                prevStitch.divert(stitchBox.stitch);
            }
            
            updateJoinButton();
            updateRewindButtons();
        });
        
        blankStitchBox.setLeadingEdge();
        
        return blankStitchBox;
    }
    
    Chunk.prototype.removeStitchBoxAndRelink = function(stitchBox, removeFromModel) {
        var chunk = this;
        if( chunk.stitchBoxes.length > 0 ) {
            
            var prevStitchBox = this.stitchBoxes.prev(stitchBox);
            var nextStitchBox = this.stitchBoxes.next(stitchBox);
            if( nextStitchBox && !nextStitchBox.stitch ) {
                nextStitchBox.createStitch("");
            }
            
            // First one - need to re-link source option
            if( stitchBox == this.stitchBoxes.first() ) {
                if( stitchBox.stitch ) {
                    stitchBox.stitch.undivert();
                }
                
                if( chunk.sourceOption ) {
                    if( nextStitchBox ) {
                        chunk.sourceOption.linkStitch(nextStitchBox.stitch);
                    } else {
                        chunk.sourceOption.unlink();
                    }
                }
            }
            
            // Last one - need to append options
            // note, if the stitch being removed is blank and at the bottom of the list, it
            // would appear it isn't part of the stitchboxes list...
            else 
            {
                if( stitchBox == this.stitchBoxes.last() ) {
                    if( stitchBox.stitch ) {
                        prevStitchBox.stitch.undivert();
                        transferOptions(stitchBox.stitch, prevStitchBox.stitch);
                    }
                }
                
                // Mid one
                else {
                    if (stitchBox.stitch)
                        stitchBox.stitch.undivert();
                    prevStitchBox.stitch.divert(nextStitchBox.stitch);
                }

                if (stitchBox.stitch) {
                    // stitches pointing to the stitchbox should now point to the prev
                    StoryModel.repointStitchToStitch(stitchBox.stitch, prevStitchBox.stitch);
                }
                
            }

            if (removeFromModel && stitchBox.stitch)
            {
                // remove from the StoryModel stitch list
                StoryModel.removeStitch(stitchBox.stitch);                
            }
            
            chunk.stitchBoxes.remove(stitchBox);
            stitchBox.remove();

            
            // Remove chunk altogether if there are no stitches left
            if( chunk.stitchBoxes.length == 0 ) {
                rewindToChunk( chunks.prev(chunk) );
            }
            StoryModel.updateGraphModel();

            StitchList.update();
            updateJoinButton();
            updateRewindButtons();
            EditorMenu.requireSave();
        }
    }
    
    Chunk.prototype.detachStitchBoxAndChildren = function(stitchBox) {
        var chunk = this;
        var stitchBoxIdx = chunk.stitchBoxes.indexOf(stitchBox);
        if( stitchBoxIdx >= 0 ) {
            
            // First in chunk? unlink from source option
            if( stitchBox == this.stitchBoxes.first() ) {
                if( chunk.sourceOption ) {    
                    chunk.sourceOption.unlink();
                }
            } 
            
            // Unlink from previous stitch
            else {
                var prevStitchBox = this.stitchBoxes.prev(stitchBox);
                prevStitchBox.stitch.undivert();
            }
            
            var numStitchBoxesToRemove = chunk.stitchBoxes.length - stitchBoxIdx;
            var removedStitchBoxes = chunk.stitchBoxes.splice(stitchBoxIdx, numStitchBoxesToRemove);
            removedStitchBoxes.each(function() {
                this.remove();
            });
            
            // removed last stitchbox?
            if( chunk.stitchBoxes.length == 0 ) {
                rewindToChunk( chunks.prev(chunk) );
            } else {
                removeOptions();
            }
            
            StitchList.update();
            updateJoinButton();
            EditorMenu.requireSave();
        }
    }
    
    Chunk.prototype.joinStitchBoxToStitch = function(stitchBox, targetStitch) {
        var chunk = this;
        
        if (!stitchBox.stitch) {
            stitchBox.createStitch();
        }

        stitchBox.stitch.divert(targetStitch);

        this.fillFromStitch(targetStitch);
        
        var firstNewStitchBox;

        firstNewStitchBox = chunk.stitchBoxes.next(stitchBox);

        chunk.updateStatsLabel();

        return firstNewStitchBox;
    }
    
    Chunk.prototype.remove = function() {
    if (settings.animations)
        this.jqChunk.slideUp("slow", function() { $(this).remove(); });
    else
        this.jqChunk.remove();
    }
    
    Chunk.prototype.fillFromStitch = function(stitch) {
        var timesThrough = 0;
        var stitchHistory = [];
    
        // Create the linked list of stitches through their diverts
        var nextStitchToCreate = stitch;
        while(nextStitchToCreate) {
            timesThrough++;
            
            if (timesThrough > 15) {
                if (stitchHistory.contains(nextStitchToCreate)) {
                    alert("infinite loop detected, starting from '" + stitch.text() + "'' (fillFromStitch).");
                return;
            }
            }

            stitchHistory.push(nextStitchToCreate);
            this.addStitchBox(new StitchBox(nextStitchToCreate, this));
            nextStitchToCreate = nextStitchToCreate.divert();
        }
        setCurrentStitchBox(chunks.last().stitchBoxes.last());
        chunks.last().stitchBoxes.last().setLeadingEdge();
    }
    
    Chunk.prototype.fillFromOption = function(option) {
        this.sourceOption = option;
        var linkStitch = option.linkStitch();
        
        var labelText = option.text();
        if (labelText == "")
            labelText = "unlabelled option";
        
//        this.jqLabel = $('<div class="chunkLabel">'+labelText+'</div>');

//        this.jqChunk.find(".rewindButton").before(this.jqLabel);


        
        // Create stitches that it's already linked up from
        if( linkStitch ) {
            this.fillFromStitch(linkStitch);
        } 
        
        // Create new blank starting point
        else {
            var newStitchBox = this.addNewBlankStitchBox();
        }
    }
    
    Chunk.prototype.lastStitchBox = function() {
        return this.stitchBoxes.last();
    }
    
    Chunk.prototype.lastStitch = function() {
        var lastBox = this.lastStitchBox();
        if( lastBox ) {
            if( lastBox.stitch ) {
                return lastBox.stitch;
            } 
            
            // If the last stitch box is actually an empty one
            // waiting to be filled out, then return the stitch
            // from the second last stitch box, assuming there is one
            else {
                var secondLastBox = this.stitchBoxes.prev(lastBox);
                if( secondLastBox && secondLastBox.stitch ) {
                    return secondLastBox.stitch;
                }
            }
        }
            
        else
            return null;
    }
    
    Chunk.prototype.createOptions = function() {
        var stitch = this.lastStitch();
        if( stitch ) {
            for(var i=0; i<stitch.options.length; ++i) {
                var opt = stitch.options[i];
                options.push(new Option(opt, stitch));
            }
        }
        
        this.updateStatsLabel();
        
        // Because this chunk has the options, it should have the leading-edge class
        this.setLeadingEdge();
    }
    
    Chunk.prototype.updateStatsLabel = function() {
        this.jqStatsLabel.empty();
        this.jqStatsLabel.append( statsLabelForStitch(this.lastStitch()) );
    }
    
    Chunk.prototype.setLeadingEdge = function() {
        // Remove existing leading edge
        $(".chunk.leading-edge").removeClass("leading-edge");
        
        // Set self as leading edge
        this.jqChunk.addClass("leading-edge");
    }
    
    // --------------------- Option -----------------------------


    var Option = function(storyOption, stitch) {
        
        var self = this;
        this.storyOption = storyOption;
        this.ownerStitch = stitch;
        self.textChanged = false;
        this.jqOption = $('<div class="option">'
                            +'<div contentEditable="true" class="optionText">'+storyOption.text()+'</div>'
                            +'<div class="linkDeleteButton" tooltip="Delete this option"></div>'
                            +'<div class="followLinkButton disabled" tooltip="Follow this option"></div>' + conditionalHtml() +'</div>');
        this.jqOption.data("option", this);      
        $(".options").append(this.jqOption);
        
        // Callbacks etc for updating text
        this.jqOptionText = this.jqOption.find(".optionText");
        
        // Keypress callback - respond immediately to return key
        this.jqOptionText.bind("keydown", function(event) {

            var escapeKeyPressed = false;
            // Escape key - if blank, treat as an "up" key press
            if ( event.which == 27 && self.text().length == 0) {
               escapeKeyPressed = true; 
            }

            // Return key - follow the option
            if( event.which == 13 ) {
            
                event.preventDefault();
                updateOptionFunctionality(self);
                
                if (event.altKey || event.ctrlKey || event.shiftKey)
                {
                    if (self == options.last())
                        addNewOption();
                    else
                        options.next(self).jqOptionText.focus();
                    return;
                }
                
                if (self.jqOptionText.text())
                    followLink(self);
                    
                event.preventDefault();
                
            } else if (event.which == 8 && self.text().length == 0) {
                // final backspace key - delete this option, focus above
                var prevOptIdx = options.indexOf(self) - 1;
                self.deleteOption();
                if (prevOptIdx >= 0)
                    options[prevOptIdx].jqOptionText.focus();                
                else
                    chunks.last().lastStitchBox().focus();
                event.preventDefault();
                return false;
                
            } else if (event.which == 38 || escapeKeyPressed) {
                // up key - focus on previous stitch / previous option
               if (options.prev(self)) {
                    options.prev(self).jqOptionText.focus();
                } else {
                    chunks.last().lastStitchBox().focus();
                }
                                
                event.preventDefault();
                return false;
                
            } else if (event.which == 40) {
                // down key - new option / next option
                if (options.next(self)) {
                    options.next(self).jqOptionText.focus();
                } else {
                    addNewOption();
                }
                event.preventDefault();
                return false;
                
            }
        });
        
        // React to key-up rather than key down so that we are
        // sure that we have the most recent text (including that
        // which was just entered).
        this.jqOptionText.bind("keyup", function(event) {
            if( event.which != 13 ) {
                updateOptionFunctionality(self);
                self.reflectToModel(); 
                chunks.last().updateStatsLabel();
                if (!( event.which >= 37 && event.which <= 40 )) // not an arrow key
                    self.textChanged = true;
            }
        });
        
        this.jqOptionText.bind("focus", function() { 
            toggleConditionEditor();
            selectedOption = self; 
            self.showOptionUIElements(true);
            removeStrayBlanks(self);
            moveCaretToEndOf(this); 
            scrollTo(this); 
            updateJoinButton();
            setCurrentStitchBox(null);
        });
        // we don't remove the selected option tag here, in case you're clicking the stitch list
        // instead, we null the selected option ifF you click a paragraph
        this.jqOptionText.bind("focusout", function() {    
            self.showOptionUIElements(false);   
           // self.reflectToModel(); 
           // StitchList.update();
            if (self.textChanged) {
                EditorMenu.requireSave() ;
                self.textChanged = false;
            }
        })
        
        // Callback for following option
        this.jqFollowLinkButton = this.jqOption.find(".followLinkButton");

/*
        this.jqFollowLinkButton.bind('click tap', function() { 
            if (!self.jqFollowLinkButton.hasClass("disabled")) {
                followLink(self); 
            }
        })
*/
        
        this.jqFollowLinkButton.updateLink = function() {
            if( storyOption.linkStitch() ) {
                self.jqFollowLinkButton.removeClass("unlinked");
            } else {
                self.jqFollowLinkButton.addClass("unlinked");
            }
        }
        this.jqFollowLinkButton.updateLink();
        updateOptionFunctionality(this);
        
        // Set up delete button
        this.jqDeleteButton = this.jqOption.find(".linkDeleteButton");
        this.jqDeleteButton.bind("mousedown", function() { self.deleteOption(); });
        
        wireConditional(this, this.jqOption, this.storyOption);

        // Hide/show mouseover buttons
        this.jqOption.bind("mouseover", function() {
                self.showOptionUIElements(true);
        });
        this.jqOption.bind("mouseout", function() {
            if (!containsCursor(self.jqOptionText))
                self.showOptionUIElements(false);
        });
        
        // When an option is created, we can't join anymore
        updateJoinButton();
        
        updateConditionalState(this.jqOption, this.storyOption);
        
    }

    var updateOptionFunctionality = function(option) {
        if (option.jqOptionText.text())
        {
            if (option.jqFollowLinkButton.hasClass("disabled"))
            {
                option.jqFollowLinkButton.removeClass("disabled");
                option.jqFollowLinkButton.bind('click tap', function() {
                    followLink(option); 
                });
            }
        }
        else
        {
            option.jqFollowLinkButton.addClass("disabled");
            option.jqFollowLinkButton.unbind('click tap');
        }
    }

    Option.prototype.showOptionUIElements = function(show) {
        if (show) {
            this.jqDeleteButton.css("display", "block");
        } else {
            this.jqDeleteButton.css("display", "none");
        }
    }
       

    Option.prototype.deleteOption = function() {
        StoryModel.removeOption(this.ownerStitch, this.storyOption);
        selectedOption = null;
        options.remove(this);
        this.remove();
        StoryModel.updateGraphModel();
        StitchList.update();
        updateJoinButton();
        EditorMenu.requireSave();
    }
    
    Option.prototype.remove = function() {
        this.jqOption.remove();
        if( chunks.length > 0 ) { 
            chunks.last().updateStatsLabel();
        }
        StitchList.update();
    }
    
    Option.prototype.reflectToModel = function() {
        this.storyOption.text( this.jqOptionText.text() , true );
//        StitchList.update();
    }
    
    Option.prototype.focus = function() {
        this.jqOptionText.focus();
    }
    
    Option.prototype.text = function() {
        return this.storyOption.text();
    }
    
    Option.prototype.linkStitch = function(target) {
        var linkResult = this.storyOption.linkStitch(target);
        this.jqFollowLinkButton.updateLink();
        return linkResult;
    }
    
    Option.prototype.unlink = function() {
        this.storyOption.unlink();
        this.jqFollowLinkButton.updateLink();
    }
    
       // --------------------- Stitchbox Text Markup  ----------------------------- 
   
     var RefreshHTML = function(HTMLstring) {
        return FormattingToHTML(HTMLToFormatting(HTMLstring));
    }
    
    var HTMLToFormatting = function(textString) {
    
    // convert safari/chrome bold/italic type
        textString = textString.replace(/(<B>|<STRONG>)/gi,'*-');
        textString = textString.replace(/(<\/B>|<\/STRONG>)/gi,'-*');
        textString = textString.replace(/(<I>|<EM>)/gi,'/=');
        textString = textString.replace(/(<\/I>|<\/EM>)/gi,'=/');

        // move run-on to end of paragraph
        textString = textString.replace(/\[\.\.\.\](.+)$/, '$1[...]');
       
        textString = textString.replace(/\<\/?span(.*?)\>|/g, '');       
       
        return $('<div>' + textString + '</div>').text();
    }
    
    var FormattingToHTML = function(textString) {
        textString = textString.replace(/\-\*/g, '</b>');
        textString = textString.replace(/\=\//g, '</i>');

        textString = textString.replace(/\*\-/g, '<b>');
        textString = textString.replace(/\/\=/g, '<i>');

        textString = textString.replace(/\[(.*?)\|(.*?)\]/g, "<span id='logic'>[</span><span id='embeddedlink'>$1</span><span id='midlink'>|</span>$2<span id='logic'>]</span>");

        textString = textString.replace(/\[\s*(number|value)\s*\:\s*(.*?)\s*\]/g, "<span id='logic'>[</span><span id='sayfunction'>$1</span><span id='midlink'>:</span>$2<span id='logic'>]</span>");
        
        textString = textString.replace(/\[\.\.\.\]\s*$/, '<span id="ellipsis" contenteditable="false" class="markup">[...]</span>');
        
        var stowed = [];
        
        var stash = function(textString, callback) {
            if (callback) {
            	stowed.push(callback(textString));
        } else {
                stowed.push(textString);
        }
        	return "%" + (stowed.length-1) + "%";
        }

		var noNestedCondsRegex = /\{([^\:\~]*?)\:([^\{\}\|]*)(\|([^\{\}]*))?\}/;
        var randomTextRegex = /\{\~(([^\{\}]*?)(\|)([^\{\}]*?))(\|[^\{\}]*?)?\}/;
		var randomBraceOnly = /\{\~([^\{\}]*?)\}/;

		// stow away conditionals starting from the inner-most, in marked-up form
		var matchSet; 
        while(noNestedCondsRegex.test(textString) || randomTextRegex.test(textString) || randomBraceOnly.test(textString)) {
            if (matchSet = textString.match(noNestedCondsRegex)) {
            	textString = textString.replace(noNestedCondsRegex, stash(matchSet[0], matchSet[3] ? 
                    function(ts) {
                        return ts.replace(/\{(.*?)\:(.*?)\|(.*?)\}/g, '<span id="logic">{$1:</span>$2<span id="midlink">|</span>$3<span id="logic">}</span>');
                    } : function(ts) {
                        return ts.replace(/\{([^\|]*?)\:([^\|]*?)\}/g, '<span id="logic">{$1:</span>$2<span id="logic">}</span>');
                    }));
            } else if (matchSet = textString.match(randomTextRegex)) {
                var append = "}";
                if (matchSet[5]) append = matchSet[5] + append;

                textString = textString.replace(randomTextRegex, "{~" + stash(matchSet[1], function(ts){
                        return ts.replace(/(.*?)(\|)(.*)/, '$1<span id="midlink">|</span>$3');
                    }) + append);

            } else if (matchSet = textString.match(randomBraceOnly)) {
                textString = textString.replace(randomBraceOnly, stash('<span id="logic">{~</span>' + matchSet[1] + '<span id="logic">}</span>'));
            }
        }

        
        
        // unstow, in the order you find them
        while ( matchSet = textString.match(/\%(\d+)\%/) ) {
        	textString = textString.replace(/\%(\d+)\%/, stowed[matchSet[1]]); 
        }
        
        return textString;
    }
    
    
    
    // --------------------- Widgets  ----------------------------- 
    
    var widgets = {};

    var setupWidgets = function() {
    
        widgets.boldWidget = new Widget("bold", "boldType", "Bold");
        widgets.italicWidget = new Widget("italic", "italicType", "Italic");
        widgets.runOnWidget = new Widget("runOn", "appendEllipsis", "Run paragraphs together");
        widgets.pageNumberWidget = new Widget("newSection", "pageNumber", "Insert new section");    

        if (settings.conditionals)
            widgets.addConditionalToWhatever = new Widget("addCondition", "conditionalElement", "Insert a condition to test");

        if (settings.images)
            widgets.imageWidget = new Widget("insertImage", "insertImage", "Insert an image");
    }
    
    var Widget = function(id, func, ttip) {
        jqWidgetElement = $('<div class="widget" id='+id+' tooltip="' + ttip + '"></div>');        
        jqWidgetElement.bind("mousedown tap", function() {
            Widget[func]();
        });
        $('#widgets').append(jqWidgetElement);
    }

    Widget.boldType = function() {
        document.execCommand('bold',false,null);
        currentStitchBox.reflectToModel();
    }

    Widget.italicType = function() {
        document.execCommand('italic',false,null);
        currentStitchBox.reflectToModel();
    }


    Widget.pageNumber = function() {
        if (currentStitchBox)
            if (!currentStitchBox.stitch) {
                currentStitchBox.createStitch();
            }
            if (currentStitchBox.stitch.pageNumberLabel() <= 0) {
                currentStitchBox.createPageNumber();
                relabelVisiblePageBoxes();
                EditorMenu.requireSave();
            }
    }
    
    Widget.appendEllipsis = function() {
        //currentStitchBox = currently focused stitch
       if (currentStitchBox) {
       		if (currentStitchBox.stitch.runOn()) {
       			currentStitchBox.stitch.runOn(false);
       		} else {
       			currentStitchBox.stitch.runOn(true);
       		}
			currentStitchBox.displayEllipsisSymbol(currentStitchBox.stitch.runOn());
            currentStitchBox.reflectToModel();
            EditorMenu.requireSave();
        }
    }
    
    var updateImageWidgetButton = function(image) {
    	if (!image) {
    		$('#insertImage.widget').removeClass('enabled');
    	} else {
    		$('#insertImage.widget').addClass('enabled');
    	}
    }
    
	var addOrRemoveImage = function(stitch, imageURL) {
		stitch.image(imageURL);	
		var reflected = false;		

		chunks.each( function() {
			this.stitchBoxes.each( function() {
				if (this.stitch === stitch) {
					this.displayImage(imageURL);
					if (!reflected) {
						reflected = true;
						this.reflectToModel();
					}
				}
			});
		});
		
		updateImageWidgetButton(imageURL);
		EditorMenu.requireSave();
	}

	Widget.insertImage = function() {
        //currentStitchBox = currently focused stitch
       if (currentStitchBox) {
       
			if (!currentStitchBox.stitch) {
				currentStitchBox.createStitch();			
			}
       
       		var startingImage = currentStitchBox.stitch.image();

			var imageDialogue = new Dialogue({
				title: "Choose Image",
				message: "Please enter the web address of your image."
			});
			
			imageDialogue.$.append("<img id='imagepreview'/>");
			var jqImagePreview = imageDialogue.$.find('img');
		
			var imageURL = imageDialogue.addField("Image");

			
			if (startingImage) 
				imageURL.value(startingImage);

			var acceptImage = function(URL) {
				jqImagePreview.show();
                imageURL.value(URL);
				jqImagePreview.attr("src", URL);
				useButton.enable();
			}

			var useButton = imageDialogue.addButton("Use", function() {
				if (imageURL.value() === "") {
					return;
				}
				

				
				addOrRemoveImage(currentStitchBox.stitch, imageURL.value());
				imageDialogue.close();
			});
			
			if (imageURL.value() === "") {
				useButton.disable();
				jqImagePreview.hide();
			} else {
				acceptImage(imageURL.value());
				imageDialogue.addButton("Remove", function() {
				
					addOrRemoveImage(currentStitchBox.stitch, null);
					
					imageDialogue.close();					
				});
			}
							
			imageURL.$.bind('keyup paste', function() {
                setTimeout(function () {
        
    				var URL = imageURL.value();

                    //is the URL a Google link? If so, find the imgurl="..." part and extract it

                    if (URL.match(/^http\:\/\/www\.google\.com/)) {
                        URL = URL.replace(/^.*imgurl\=(.*?)\&.*$/, "$1");
                    }



    				var matchImageURLRegex = /^\S+\.(png|jpg|jpeg|gif)$/i;
    				
    				// does it look like a link?
    				if (URL.match(matchImageURLRegex)) {
    					acceptImage(URL);
    				} else if (URL.match(/^data\:image/)) {
                        // it's a URI, so we can accept it!
                        acceptImage(URL);
                    } else {
    					jqImagePreview.hide();
    					useButton.disable();
    					return;            			
    				}
				}, 0);
			});
			
			imageDialogue.addButton("Cancel");
			

        }
    }

    Widget.conditionalElement = function() {
        // either add a conditional element to the current stitch or the current option
        if (selectedOption) {
            selectedOption.jqCondElement.show();
            selectedOption.jqOption.addClass('conditionalised');
        } else if (currentStitchBox) {
            if (!currentStitchBox.stitch) {
                chunks.last().stitchBoxes.last().createStitch();
            }
            currentStitchBox.jqCondElement.show();
            currentStitchBox.jqStitchBox.addClass('conditionalised');
        }
    }
       
    var launchGraph = function() {
        cancelJoinCreation();
        var rootStitch = lastStitchInFlow();
        if (currentStitchBox) 
            rootStitch = currentStitchBox.stitch;
        if (!rootStitch) {
            rootStitch = chunks.last().stitchBoxes.last().createStitch();
        }
        var graph  = new GraphModel(rootStitch);
    }
    
    // --------------------- Stitch list -----------------------------
    
    var StitchListRow = function(stitch) {
        
        var self = this;
        
        this.stitch = stitch;
    
        // Create content line
        var stitchContent = "";
        
        this.unused = (!stitch.pageNumber());
        
        // More important than stats - show if stitch is orphaned
        if( this.unused ) {
            // Add button to delete the unused element
            stitchContent += '<div class="deleteButton stitchButton" tooltip="Delete this paragraph"></div>';
        }
         
        // button for searching
        stitchContent += '<div class="rewindStitchListButton stitchButton" tooltip="Rewind to here"></div>';

        // button for linking
//        stitchContent += '<div class="linkButton stitchButton" tooltip="Join up with this paragraph"></div>';
        
        stitchContent += "<span id='content'>" + FormattingToHTML(stitch.text()) + "</span>";
        

        // Add flags
        var flagsHtml = "";
        for(var flagIdx=0; flagIdx<stitch.numberOfFlags(); ++flagIdx) {
            flagsHtml += "<span class='flag'>" + stitch.flagByIndex(flagIdx) + "</span>";
        }
        if( stitch.numberOfFlags() > 0 ) {
            stitchContent += "<div id='flags'>" + flagsHtml + "</div>";
        }
        
        if ( !this.unused ) {
            stitchContent += '<div class="stats"></div>';
        }
        
        // Unused (delete button added higher up)
        if( this.unused ) {                    
            stitchContent += '<div class="stats"><strong class="important">Unused</strong></div> ';
        }
        

        this.jqStitchRow = $('<tr><td>'+stitchContent+'</td></tr>');
        
        this.jqContent = this.jqStitchRow.find("span#content");
        
        StitchList.jqStitchList.append(this.jqStitchRow);

        this.jqSearchButton = this.jqStitchRow.find(".rewindStitchListButton");
        
        // Delete button binding
        this.jqStitchRow.find(".deleteButton").bind('click tap', function() {
            StoryModel.removeStitch(stitch);
            StoryModel.updateGraphModel();
            StitchList.update();
            EditorMenu.requireSave();
            
            return false;
        })
        
          
        // Create stats prefix
        if( !this.unused ) {
            
            var jqStatsLabel = statsLabelForStitch(stitch);
            if( jqStatsLabel ) {
                this.jqStitchRow.find('.stats').append( jqStatsLabel );
            }
        }
        
        var chunkOfStitch = visibleChunkContainingStitch(stitch);
        

        if (currentStitchBox) {
            if (this.stitch == currentStitchBox.stitch) {
                this.jqStitchRow.addClass("selected");
                StitchList.jqActiveStitchRow = this.jqStitchRow;
                StitchList.jqActiveStitchRowText = this.jqContent;
            }
        } else if (selectedOption && this.stitch == chunks.last().stitchBoxes.last().stitch)
        {
            this.jqStitchRow.addClass("selected");
        }
        
        
        if (chunkOfStitch) {       
            this.jqStitchRow.addClass("visible");
        }
        
        if (Editor.joiningMode) {
        
            // Make invisible rather than hiding, so that the html
            // doesn't re-flow
            this.jqSearchButton.css("opacity", 0);
            
            var baseStitch = lastStitchInFlow(true);

            var dropStitch = this.stitch;
            var validLink = true;
            while (dropStitch && validLink) {
                if (dropStitch === baseStitch) {
                     validLink = false;
                }
                dropStitch = dropStitch.divertStitch;
            }
            if (validLink) {
                this.enableJoin();
            } else {
                this.jqStitchRow.addClass("disabled");
            }
           
        
        } else {
            if (!this.unused) {
                if (chunkOfStitch) {       
                    this.jqStitchRow.attr("tooltip", "Edit this paragraph");
                    this.jqStitchRow.bind('click tap', function(event) {
                        var toStitchBox = stitchBoxContainingStitch(self.stitch);
                        if (toStitchBox) {
                            toStitchBox.jqStitchBoxText.focus();
                        }
                        StitchList.update();
                        return false;
                    });
                } else {
                    this.jqStitchRow.attr("tooltip", "Jump to this paragraph");
                    this.jqStitchRow.bind('click tap', function(event) {
                            return searchForStitch(stitch);
                    });
                }
            }    
            // Search button is now the "rewind" button
            // only used for stitches that are visible, but not in the current chunk
            
            if (!this.unused && chunkOfStitch && chunkOfStitch != chunks.last()) {
                this.jqSearchButton.removeClass("disabled");
                // Search button binding
                this.jqSearchButton.bind('click tap', function() {
                    rewindToChunk(chunkOfStitch);
                    toStitchBox = stitchBoxContainingStitch(self.stitch);
                    if (toStitchBox) {
                        toStitchBox.jqStitchBoxText.focus();
                    }                
                });
            } else {
                this.jqSearchButton.addClass("disabled");            
            }
            
        }
    }
    
    StitchListRow.prototype.enableJoin = function() {
        var jqRow = this.jqStitchRow;
        var stitch = this.stitch;
        
        var jqGhostBox = null;

        var scrollToBottom = function(pingNotScroll) {

            var jqReadArea = $('#read_area');
            var maxScrollHeight = $(window).height() * 0.3; // seems rather small, but this is what works...!
            if (!pingNotScroll)
                jqReadArea.animate( { scrollTop: jqReadArea.scrollTop() + maxScrollHeight } , "slow" );
            else
                jqReadArea.scrollTop(jqReadArea.scrollTop() + maxScrollHeight );
        }
        

        jqRow.bind("mouseenter.join", function() {
        
            var ghostStitch = stitch;
            var lastGhostStitch = null;
            var jqGhostBoxOptions = "";
            jqGhostBox = "";
            
            while (ghostStitch) {
        
                var stitchText = FormattingToHTML(ghostStitch.text());
                jqGhostBox += '<div class="stitchBox ghost"> \
                                 <div class="stitchBoxBackground"> \
                                    <div class="paper-top"></div> \
                                    <div class="paper-mid"></div> \
                                    <div class="paper-bottom"></div> \
                                 </div> \
                                 <div class="stitchText" contentEditable="false">'+stitchText+'</div> \
                              </div>';
                for (var i = 0 ; i < ghostStitch.options.length ; i++) {
                    
                        jqGhostBoxOptions += '<div class="option ghost">'
                            +'<div contentEditable="true" class="optionText">'+ghostStitch.options[i].text()+'</div>'
                            +'<div class="followLinkButton disabled" tooltip="Follow this option"></div>'
                        +'</div>';
                }
                lastGhostStitch = ghostStitch;
                ghostStitch = ghostStitch.divertStitch;
            }

            // note: we can use "current" because if we're not in it and it's blank, it vanishes
            if (currentStitchBox && currentStitchBox.jqStitchBox.hasClass("blank")) {
                currentStitchBox.jqStitchBox.hide();
                if (chunks.last().stitchBoxes.length == 1) {
                    // single blank stitch; in which case we edit its CSS
                    currentStitchBox.jqStitchBox.addClass("hiddenStitchBox");
                    currentStitchBox.jqStitchBox.removeClass("stitchBox");
                }
                

                
            }
            chunks.last().jqChunk.append(jqGhostBox);
            chunks.last().jqChunk.after(jqGhostBoxOptions);
            
            scrollToBottom();
            chunks.last().jqStatsLabel.empty();
            chunks.last().jqStatsLabel.append( statsLabelForStitch( lastGhostStitch ) );

            Editor.joinButton.hide();
            
        });
        
        var removeGhost = function() {
            if (currentStitchBox) {
                currentStitchBox.jqStitchBox.show();  
                currentStitchBox.jqStitchBox.removeClass("hiddenStitchBox");
                currentStitchBox.jqStitchBox.addClass("stitchBox");
            }
            $('.ghost').remove();  
            chunks.last().updateStatsLabel();
            Editor.joinButton.show();
        }

        jqRow.bind("mouseleave.join", function() {
            removeGhost();
        });

        
        jqRow.bind("tap.join mousedown.join", function() {
                       
            if (visibleChunkContainingStitch(stitch)) {
            // a-ha. Note this isn't actually robust as loop detect:-
            // Consider A, B -> C
            // I have A -> C in the flow
            // I join C to B, thereby creating a loop BCBCB... which I'm not warned about..!
                if (!confirm("Linking to this paragraph will form a loop. Are you sure you want to do this?")) {
                    return false;
                }
            }

            removeGhost();
            
            var thisStitchBox = chunks.last().lastStitchBox();
            
            joinToStitch(thisStitchBox, stitch);                            
            
            scrollToBottom(true);
            cancelJoinCreation();
            return false;
             
        });


    }
    
    StitchListPageHeader = function(stitch, pNumLabel, collapseDistant, activePage) {
    
        var self = this;
        this.stitch = stitch;
        this.pNumLabel = pNumLabel;
        
        if (collapseDistant && pNumLabel != activePage && activePage > 0) {
            StitchList.closedPages.add(pNumLabel);                    
        }

        var pageHeader = stitch.pageLabelText();



        if (!StitchList.closedPages.contains(pNumLabel))
        {
            // open
            this.jqStitchRow = $('<tr class="page"><td><div class="collapser"><div class="tri_button">&#9660;</div> ' + pageHeader + '<div class="important inline"></div></div></td></tr>');

            this.jqStitchRow.bind('click tap', function() {
                StitchList.closedPages.add((self.pNumLabel));
                StitchList.update(false, true);
            });
        }
        else
        {
           
            // closed
            this.jqStitchRow = $('<tr class="page"><td><div class="collapser"><div class="tri_button">' + trisymbol + '</div> ' + pageHeader + '<div class="important inline"></div></div><div class="searchButton stitchButton" tooltip="Jump to this section"></div></td></tr>');
            
            this.jqStitchRow.bind('click tap', function() {
                StitchList.closedPages.remove(self.pNumLabel);
                StitchList.update(false, true);
            });
            

            

            
            if (Editor.joiningMode) {
                this.jqStitchRow.find(".searchButton").hide();
            } else {
                this.jqStitchRow.find(".searchButton").bind('click tap', function() {
                    return searchForStitch(self.stitch);
    
                }); 
            }



        }

        var looseEndsCount = 0;
        var hardEndsCount = 0;
        for (var k = 0; k < self.stitch.sectionStitches.length ; k++ ) {
            var examineStitchStats = self.stitch.sectionStitches[k].stats();
            looseEndsCount += examineStitchStats.numLooseEnds;
            if (examineStitchStats.deadEnd)
                hardEndsCount++;
        }
        if (looseEndsCount + hardEndsCount > 0) {
            var infoText = "";
            if (looseEndsCount > 0) {
                infoText += looseEndsCount + " loose ";
                infoText += looseEndsCount == 1 ? "end" : "ends";
                if (hardEndsCount > 0) {
                    infoText += ", "
                }
             }
             if (hardEndsCount > 0) {
                infoText += hardEndsCount + " ";
                infoText += hardEndsCount == 1 ? "end": "ends";
             }
            this.jqStitchRow.find(".important").text(infoText);
        }

        StitchList.jqStitchList.append(this.jqStitchRow);	
            
  }          

    searchForStitch = function(stitch) {
        var loading = new Dialogue({
             title: "Searching",
            message: "Please wait a moment..."
        });
        
        // stupid Timeout to ensure the dialogue gets onto screen before we start work
        setTimeout( function () {
            navigateToStitch(stitch);
        }, 2);
        loading.close();
        return false;
    }
    
    var StitchList = function() {
    }
    
    StitchList.closedPages = [];
    StitchList.rows = [];
    StitchList.headers = [];
    
    StitchList.jqStitchList = null;

    StitchList.expanded = false;
    StitchList.broughtInAutomatically = false;
    
    StitchList.setup = function() {
        StitchList.jqStitchList = $("#stitch_list");
        StitchList.expanded = false;
        StitchList.searching = null;
        StitchList.jqHeader =  $('.header');
         
        if (settings.find) {
            var jqFindText = $('<div id="find_box" tooltip="search the story"><span class="icon search"></span><div contenteditable="true" id="searchTerm"/></div>');        
            StitchList.jqHeader.prepend(jqFindText);
            jqFindText.hide();
            
            var jqIcon = jqFindText.find(".icon");
            
            var runSearch = function(searchString) {            
                if (searchString.length == 0) {
                    jqIcon.addClass("search");
                    jqIcon.removeClass("clear");
                    StitchList.searching = null;
                    StitchList.update();
                } else {
                    jqIcon.removeClass("search");
                    jqIcon.addClass("clear");
                    StitchList.searching = searchString.toLowerCase();        
                    StitchList.update();
                }
            }   
            
            jqIcon.bind('click tap', function() {
                if ($(this).hasClass("search")) {
                    jqFindText.find('#searchTerm').focus();
                } else {
                    jqFindText.find('#searchTerm').text("");  
                    runSearch("");
                }
            });
            
            jqFindText.bind('click tap', function() {
                jqFindText.find('#searchTerm').focus();
            });
            
            jqFindText.bind("keydown", function(event) {  
               if (event.which == 13) { // return key
                event.preventDefault();
               }
            });
            
            jqFindText.bind("keyup", function(event) {  
                if (event.which == 27) { // escape key 
                    $(this).find('#searchTerm').text("");  
                } 
                runSearch($(this).find('#searchTerm').text());
            });
       
            StitchList.jqHeader.find('.text').attr("tooltip", "Click to collapse all sections.");
            StitchList.jqHeader.find('.text').bind('click tap', function() {
                StitchList.closedPages = [];
                for (var i = 0 ; i < StoryModel.stitches.length ; i++ ) {
                    var pLabel = StoryModel.stitches[i].pageNumberLabel();
                    if (pLabel)
                        StitchList.closedPages.push(pLabel);
                }
                StitchList.update(false, true);
            });

        }
     

    }
    
    
    StitchList.expand = function() {
        StitchList.expanded = true;
        $("#read_area").addClass("split-screen");
        $("#stitch_list_area").removeClass("collapsed");
        $("#read_area").removeClass("full-screen");
        $("#stitch_list_area").addClass("expanded");
        $("#find_box").show();
        StitchList.update();
    }
    
    StitchList.collapse = function() {
        StitchList.expanded = false;
        StitchList.broughtInAutomatically = false;
        $("#read_area").removeClass("split-screen");
        $("#stitch_list_area").addClass("collapsed");
        $("#read_area").addClass("full-screen");
        $("#stitch_list_area").removeClass("expanded");
        $("#find_box").hide();
    }    
    
    StitchList.update = function(collapseDistant, disableScroll) {


        // Remove all stiches that are empty with a zero refcount
        StoryModel.purge();
        
        var wordCount = 0;
        for(var i=0; i<StoryModel.stitches.length; ++i) {
            wordCount += StoryModel.stitches[i].wordCount;
        }
        $('.wc').text(commadString(wordCount) + " words");
        
        if (!StitchList.expanded) return;
        
        // Remove all existing rows
        $("#stitch_list tr").not(".header").addClass("to_be_removed");
        $("#stitch_list #tooltip").remove();

        this.jqActiveStitchRow = null;

        
        // delete all the row objects
        StitchList.rows = [];
        StitchList.headers = [];
        
        var activePage = 0;
        if (currentStitchBox)
            if (currentStitchBox.stitch)
                activePage = currentStitchBox.stitch.pageNumber();
        if (!disableScroll)
            StitchList.closedPages.remove(activePage);

        // Add new ones back
        for(var i=0; i<StoryModel.stitches.length; ++i) {
            var stitch = StoryModel.stitches[i];
        
            if (StitchList.searching !== null) {
                if (stitch.text().toLowerCase().indexOf(StitchList.searching) > -1) {
                    StitchList.rows.push(new StitchListRow(stitch));
                } else if (StitchList.searching == "end".substring(0, StitchList.searching.length)  && stitch.statsObj.deadEnd) {
                    StitchList.rows.push(new StitchListRow(stitch));                    
                } else if (StitchList.searching == "loose end".substring(0, StitchList.searching.length) && stitch.statsObj.numLooseEnds) {
                    StitchList.rows.push(new StitchListRow(stitch));                    
                } else {
                    // if we haven't already listed this one, search flags and conditionals
                    var pushed = false;

                    if (stitch.numberOfFlags() > 0) {
                        for (var k = 0 ; k < stitch.numberOfFlags() && !pushed; k ++) {
                            if (stitch.flagByIndex(k).toLowerCase().indexOf(StitchList.searching) > -1) {
                                StitchList.rows.push(new StitchListRow(stitch));  
                                pushed = true;
                            }
                        }
                    } 

                    var checkConditionals = function(obj, val) {

                        if (StoryModel.numberOfConditionals(obj, val) > 0) {
                            for (var k = 0 ; k < StoryModel.numberOfConditionals(obj, val) && !pushed; k ++) {
                                if (StoryModel.conditionalByIndex(obj, val, k).toLowerCase().indexOf(StitchList.searching) > -1) {
                                    // push this stitch, NOT the object itself...!
                                    StitchList.rows.push(new StitchListRow(stitch));  
                                    pushed = true;
                                }
                            }
                        }
                    }

                    checkConditionals(stitch, true);
                    checkConditionals(stitch, false);
                    for (var p = 0 ; p < stitch.options.length; p++) {
                        checkConditionals(stitch.options[p], true);
                        checkConditionals(stitch.options[p], false);
                    }


                }

            } else {
                // Create page number rows for heading stitches which are in the flow
                var pNumLabel = stitch.pageNumberLabel();
                if (pNumLabel > 0 && stitch.pageNumber() > 0)
                {
                    StitchList.headers.push(new StitchListPageHeader(stitch, pNumLabel, collapseDistant, activePage) );	
                }
                
                // Normal stitch - we do nothing if it's "shut"
                if (!StitchList.closedPages.contains(stitch.pageNumber()))
                {
                    StitchList.rows.push(new StitchListRow(stitch));
                } 
            }
        }
        
        $(".to_be_removed").remove();
    
        if (this.jqActiveStitchRow && !disableScroll)
            scrollTo(this.jqActiveStitchRow, $("#stitch_list_area"));

    }
    
    var updateEndCount = function() {
        // update the main header with loose ends
        var threadText = "";
        if (StoryModel.looseEndCount > 0) {
            threadText += StoryModel.looseEndCount + " loose end";
            if ( StoryModel.looseEndCount > 1) threadText += "s";
            if (StoryModel.endCount > 0) threadText += " and "
        }
        if (StoryModel.endCount > 0) {
            threadText += StoryModel.endCount + " end";
            if ( StoryModel.endCount > 1) threadText += "s";
        }
        // where?
        $('.header .important').text(threadText);
        

    }
    
    
    // --------------------------------------------------
    // Editor functions
    // --------------------------------------------------
    
    var restoreSelection = function() {
        if (currentStitchBox) {
            selectText(currentStitchBox.cursorPos);
        }
    }
    
    var transferOptions = function(fromStitch, toStitch) {
    // don't need to worry about backlinks as they're rebuilt from the model
        toStitch.options = fromStitch.options;
        toStitch.options.each(function(){
            var option = this;
            option.ownerStitch = toStitch;
            option._parentStitch = toStitch;
        });
        fromStitch.options = [];
    }
    
    var removeOptions = function() {
        options.each( function() { this.remove(); } );
        options = [];
    }
    
    var recreateOptions = function() {
        removeOptions();
        chunks.last().createOptions();
    }
    
    var FakeOption = function(option, preChunk, postChunk) {

        // fake option in between
        this.jqFakeOption = $('<div class="fake_option"><div class="optionText" contenteditable="true">' + option.text() + '</div><div class="followLinkButton disabled"></div></div>');

        // little code to make the fake option text editable. Can't do any funky stuff here, though
        this.jqFakeOption.bind("keydown", function (event) {
            if (event.which == 13) 
                event.preventDefault();
            if (event.which == 40) { // down
                postChunk.stitchBoxes[0].jqStitchBoxText.focus();
                event.preventDefault();
            } 
            if (event.which == 38) { // up
                if (preChunk) {
                    preChunk.stitchBoxes[0].jqStitchBoxText.focus();
                }
                event.preventDefault();
            }
        });

        this.jqFakeOption.bind("keyup", function () {
            if (event.which != 13) {
                // don't need to update labels, as this can't be a loose end
                // only need to save new text
                option.storyOption.text( $(this).text() , true );
                EditorMenu.requireSave();
            }
        });
 
    }
    
    var followLink = function(option) {

        // Add new chunk
        var newChunk = new Chunk();

        var fakeOption = new FakeOption(option, chunks.last(), newChunk);
        
        chunks.push(newChunk);

        chunks.last().jqChunk.prepend(fakeOption.jqFakeOption);

        // Create stitch boxes for the linked stitches,
        // and connect to the previous option
        newChunk.fillFromOption(option);
        
        newChunk.addRewindButton();
        
        recreateOptions();
        
        
               
        if (settings.animations && !performingLayoutWork) {

            newChunk.jqChunk.css("left", "-800px");
            $('.options').css("left", "-800px");
            $('.button').css("left", "-800px");
            fakeOption.jqFakeOption.css("left", "+800px");
            
            newChunk.jqChunk.animate( { left : "0px" } , 1000);
            $('.options').animate( { left: "0px" } , 1000);
            $('.button').animate( { left: "0px" } , 1000);
            fakeOption.jqFakeOption.animate( { left : "0px" } , 1000);

        } 
 
        
        // Set the focus on the newest stitch box, *after* rebuilding options (important - prevents the
        // blank option remover from removing the option we just followed, if it was unlabelled.)
        if (!performingLayoutWork) {
            chunks.last().stitchBoxes.first().jqStitchBoxText.focus();
        }
        
    }
    
    var rewindToChunk = function(chunk) {
        
        // don't rewind if we're here already
       // if (chunk == chunks.last()) return;
        
        // Remove all chunks after this one
        var chunkIdx = chunks.indexOf(chunk);
        for(var deleteChunkIdx = chunkIdx+1; deleteChunkIdx<chunks.length; deleteChunkIdx++) {
            if (chunks[deleteChunkIdx].jqFakeOption)
                chunks[deleteChunkIdx].jqFakeOption.slideUp("slow", function() { $(this).remove(); });
            for (var i = chunks[deleteChunkIdx].stitchBoxes.length - 1; i >= 0  ; i--) {
                var stitchBox = chunks[deleteChunkIdx].stitchBoxes[i];
                if (stitchBox)
                    stitchBox.remove();
            }
            chunks[deleteChunkIdx].remove();
            chunks[deleteChunkIdx] = null;
        }
        chunks = chunks.slice(0, chunkIdx+1);
        
        // Re-create the options for the last stitch on this chunk
        recreateOptions();
        updateRewindButtons();
        updateJoinButton();
        
        if (!performingLayoutWork)
            chunk.stitchBoxes[0].jqStitchBoxText.focus();
    
        chunks.last().stitchBoxes.last().setLeadingEdge();
    
        StitchList.update(true);

    }
    
    var lastStitchInFlow = function(enforceLastChunk) {
        var stitch = chunks.last().lastStitchBox().stitch;
        if (!stitch)
        {
            if ( chunks.last().stitchBoxes.length > 1)
            // eg. length = 2 => 0, 1 => we use element 0
                stitch = chunks.last().stitchBoxes[chunks.last().stitchBoxes.length-2].stitch;
            else if (!enforceLastChunk) {
            // eg. length = 2 => 0, 1 => we use element 0
                stitch = chunks[chunks.length-2].lastStitchBox().stitch;
            }
        }
        return stitch;
    }
    
    var navigateToStitch = function(stitchToBeginFrom, stitchToApproach) {
        
        if (!stitchToApproach) {
            stitchToApproach = stitchToBeginFrom;
            stitchToBeginFrom = lastStitchInFlow();
        }

        if (getRouteFromTo(stitchToBeginFrom, stitchToApproach) > -1)
        {

            removeStrayBlanks();

            // resulting route is stored in stitchRoute
            // starting from the from Stitch (but soon to be starting from some point in the flow)
            // console.log("Success!");
            
            performingLayoutWork = true;
            
            // so now we (a) rewind to stitchRoute[0]
            
            rewindToChunk(visibleChunkContainingStitch(stitchRoute[0]));
            
            // and (b) play through the array in sequence from this point
            // bearing in mind that every time we play a chunk, we'll get a bunch of
            // stitches for free. We use visibleChunkHeadedByStitch to find the 
            // first stitch that hasn't been displayed.
            
            for (var i = 0 ; i < stitchRoute.length ; i++)
            {
                // find the first stitch that's not visible now
                if (!visibleChunkContainingStitch(stitchRoute[i]))
                {
                    followLinkTo(stitchRoute[i]);
                }
                
            }

            performingLayoutWork = false;
            
            stitchBoxContainingStitch(stitchToApproach).focus();         
            
            StitchList.update(true);
        }

    }
    
    var followLinkTo = function(toStitch)
    {
        // then follow the appropriate link
        for (var j = 0 ; j < options.length; j++)
        {
            if (options[j].linkStitch() == toStitch)
            {
                followLink(options[j]);
                return true;
            }
        }
        return false;
    }
    
    var updateRewindButtons = function() {
        chunks.each(function() {
            this.jqRewindButton.show();
        });
        chunks.last().jqRewindButton.hide();
    }
    
    var beginJoinCreation = function() {

        Editor.joiningMode = true;

        StitchList.broughtInAutomatically = !StitchList.expanded;
        StitchList.expand();       
        
        Editor.joinButton.text("Choose the paragraph you want next by clicking it in the contents.");
        Editor.joinButton.addClass("larger");
        
        Editor.joinButton.unbind('click tap');
        Editor.joinButton.bind('click tap', function() { 
            // focusing calls cancel join as part of the update join button call
            chunks.last().stitchBoxes.last().focus();
            return false;
        }); 
        
        delButton = $('<div class="linkDeleteButton"></div>');
        Editor.joinButton.prepend(delButton);
        delButton.show();

        Editor.newOptionButton.hide();

        var popup = $("<div class='instructionArrow'></div>");
        Editor.joinButton.after(popup);      

        // we make a little popup dialogue box and point it at the paragraph library
        
        popup.css("top", Editor.joinButton.position().top + $('#read_area').scrollTop() - 40);
        popup.css("left", $('#read_area').width() / 2 + Editor.joinButton.width() / 2 + 20);


        StitchList.update();
     
        
    }

    var cancelJoinCreation = function() {
        if ( Editor.joiningMode ) {
            Editor.joiningMode = false;
            Editor.joinButton.text("Join to an existing paragraph");
            Editor.joinButton.unbind('click tap');
            $('#read_area').find(".instructionArrow").remove();
            
            Editor.joinButton.bind('click tap', beginJoinCreation);
            
            StitchList.rows.each( function() {
                this.jqStitchRow.unbind(".join");
                this.jqStitchRow.removeClass("disabled");
            });
            
            Editor.joinButton.removeClass("larger");
            Editor.newOptionButton.show();
            StitchList.rows.each( function() {
                this.jqSearchButton.css("opacity", 1);
            });        
    
            updateJoinButton();
            if (StitchList.broughtInAutomatically)
                StitchList.collapse();
            else {
                StitchList.broughtInAutomatically = false;
                StitchList.update();
            }
        }
        
        return false;
    }    

    var updateJoinButton = function() {
        cancelJoinCreation();
        
        if ( options.length == 0 && StoryModel.stitches.length > Math.max(2, chunks[0].stitchBoxes.length)) { 
            Editor.joinButton.show();
        } else {
            Editor.joinButton.hide();
        }
    }
    
    var joinToStitch = function(stitchBox, targetStitch) {
        
        // Assume the join is for the most recent chunk
        var chunk = chunks.last();
        var newStitchBox = chunk.joinStitchBoxToStitch(stitchBox, targetStitch);
        
        targetStitch._stitchBox.jqStitchBox.find('.backlinks').remove();
        
        if (targetStitch._backlinks.length > 1)
	        targetStitch._stitchBox.jqStitchBox.prepend("<div class='backlinks'>" + targetStitch._backlinks.length + " links in</div>");
        
        // joining might justify a new page button
        if (newStitchBox.stitch) {
            newStitchBox.setUpPageButton();
        }

        removeStrayBlanks();
        EditorMenu.requireSave();

        // Re-create options
        recreateOptions();
        updateJoinButton();
        StitchList.update();

    }

    
//---------------------------------------------------------------
//
//          Conditional Blocks
//
//---------------------------------------------------------------    
    
     	
    var conditionalHtml = function() {
        return "<div class='conditionalText' tooltip='Edit logic'><div class='collapser'></div><div class='message'></div></div>";
    }

    
    var wireConditional = function(owner, jqOwner, storyModelElement) {
        // Hide/show conditionals button
        owner.jqCondElement = jqOwner.find(".conditionalText");

        if (storyModelElement) {
            // Set up the conditionals button
            setConditionalUIState(owner, jqOwner, storyModelElement, hasAnyConditionals(storyModelElement));
            
            owner.jqCondElement.find('.message,.collapser').bind('click tap', function() {
                toggleConditionEditor(owner, jqOwner, storyModelElement); 
            });
        }
    }
    
    var setConditionalUIState = function(owner, jqOwner, storyModelElement, active) {
    
        if (settings.conditionals) {

            if (active)
            {
                jqOwner.addClass('conditionalised');
                owner.jqCondElement.addClass("active");
                owner.jqCondElement.find(".message").html(" " + conditionsDescribed(owner, storyModelElement) + " ");
            } 
            else 
            {
                jqOwner.removeClass('conditionalised');            
                owner.jqCondElement.removeClass("active");
                owner.jqCondElement.find(".message").text(" Add conditions ");
            }
        } else {
            owner.jqCondElement.hide();
            jqOwner.removeClass('conditionalised');
        }
    }	
    

            
    
    var conditionsDescribed = function(owner, storyModelElement) {
    			
        var conjuctive = "";
        var string = " only show if ";
        
        for (var i = 0 ; i < numberOfConditionals(storyModelElement, true) ; i++)
        {
            string += conjuctive + "<span class='logic'>" + conditionalByIndex(storyModelElement, true, i) + "</span>";
            conjuctive = " and ";
        }
        conjuctive += "not ";
        for ( var i = 0 ; i < numberOfConditionals(storyModelElement, false) ; i++)
        {
            string += conjuctive + "<span class='logic'>" + conditionalByIndex(storyModelElement, false, i)  + "</span>";
            conjuctive = " and not ";
        }
        
		return string;	
    }
      
    
   var toggleConditionEditor = function(owner, jqOwner, storyModelElement) {
		// create the little sub-form for adding conditionals
		// create the user-flow for clicking stitches
            if (jqOwner) {
                var jqCondElement = jqOwner.find(".conditionalText");
    			var jqCondBlock = jqCondElement.find(".conditionsBlock");
            } 
            
            var jqAllConditionalText = $('.conditionalText');
            $(".conditionsBlock").remove(); 
            jqAllConditionalText.css( { 'bottom': '', 'top': '', 'height': '' } );
            jqAllConditionalText.removeClass("expanded");
            $(".unjoinButton").show();

            var setHeightOfConditionalText = function() {
                var leftBlock = jqOwner.find('.left .newFlag');
                var rightBlock = jqOwner.find('.right .newFlag');
                var newHeight = Math.max(leftBlock.position().top + leftBlock.height(), rightBlock.position().top + rightBlock.height());

                var footerHeight = 12;
                var bottomMargin = 10;
                jqCondElement.css("height", newHeight + jqCondElement.find('.message').height() + footerHeight);
                jqCondElement.find('.flagListBlock').css("height", newHeight + (footerHeight-bottomMargin));
            }  

			
			if (jqOwner) {
                if (jqCondBlock.length == 0)
                {
                

                    var topPoint = jqCondElement.position().top;
                    
                    // Create the must-have-read // must-not-have-read sub menu
                    var jqCondBlock = $('<div class="conditionsBlock"></div>');
                    
                    jqCondBlock.find('.collapser').bind('click tap', function() {   
                        toggleConditionEditor(owner, jqOwner, storyModelElement);                        
                    });
                    
                    jqCondBlock.append(createConditionalList(owner, jqOwner, storyModelElement, "Passed these markers", true, "left", setHeightOfConditionalText));

                    jqCondBlock.append(createConditionalList(owner, jqOwner, storyModelElement, "Not passed these markers", false, "right", setHeightOfConditionalText));
    
                    jqCondElement.append(jqCondBlock);
                    jqCondElement.addClass("expanded");

                    $(".unjoinButton").hide();

                    
                    jqCondBlock.show();

                    // compute new position info
                    jqCondElement.css("top", topPoint);
                    setHeightOfConditionalText();
                    
                    ensureVisibilityOfPopup(jqCondElement, $('#read_area'));
                    

                        
                } 
        }
    }



	var createConditionalList = function(owner, jqOwner, storyModelElement, textLabel, requiredType, placementClass, callback) 
	{


        var createPopup = function(jqTextBox, jqPositionBefore, currentText) {
        
            new FlagPopup(jqTextBox, currentText, storyModelElement, 
            function(ownerObject, flag) {
                return !conditionedOnThis(ownerObject, flag, -1);
            }, 
            function(newFlagName, previousFlag) {
                if (newFlagName) {
                    if (!previousFlag) {
                        var newJqFlagLine = createFlagNameDiv(newFlagName);
                        newJqFlagLine.insertBefore(jqPositionBefore);
                        
                    } else if (previousFlag != newFlagName) {
                        jqTextBox.text(newFlagName); 
                        writeConditionals(storyModelElement, previousFlag, requiredType, false);
                    }
                    callback();
                    writeConditionals(storyModelElement, newFlagName, requiredType, true);
                    
                    jqTextBox.removeClass('unused'); 
                    EditorMenu.requireSave();
                    setConditionalUIState(owner, jqOwner, storyModelElement, hasAnyConditionals(storyModelElement));
    
                    updateConditionalState(jqOwner, storyModelElement);
                }
            });
        }
			
        var jqConditionalList = $("<div class='flagListBlock'></div>");
        jqConditionalList.addClass(placementClass);
        jqConditionalList.append($('<div class="title"> ' + textLabel + ":</div>"));

        var createFlagNameDiv = function(flagName) {
            jqFlagLine = $("<div class='flag_name'><div class='entertext'><div class='flag_button minus'></div><span id='actualFlag'>" + flagName + "</span></div></div>");

            jqFlagLine.find('.entertext').bind('click tap', function() {
                var jqTextBox = $(this).find('#actualFlag');
                createPopup(jqTextBox, null, jqTextBox.text());
            });
            
            jqFlagLine.find(".minus").bind('click tap', function() {
                writeConditionals(storyModelElement, flagName, requiredType, false);
                $(this.parentNode.parentNode).remove();
                callback();
                EditorMenu.requireSave();
                setConditionalUIState(owner, jqOwner, storyModelElement, hasAnyConditionals(storyModelElement));
                updateConditionalState(jqOwner, storyModelElement);
            });
            
            return jqFlagLine;
        };

        
        for(var idx = 0; idx < numberOfConditionals(storyModelElement, requiredType); idx++)   
        {
            jqConditionalList.append(createFlagNameDiv(conditionalByIndex(storyModelElement, requiredType, idx)));
        }
        
        var jqPlusButton = $("<div class='flag_name newFlag'><div class='add entertext'><div class='flag_button plus'></div><span id='actualFlag'>Add marker</span></div></div>");
        
        jqConditionalList.append(jqPlusButton);
        
        jqPlusButton.bind('click tap', function() {
            createPopup(jqPlusButton.find('#actualFlag'), jqPlusButton, "");
        });
		
		return jqConditionalList;

    }

    var updateConditionalState = function(jqElement, storyModelElement) {
        if (conditionsMetByCurrentPlaythrough(storyModelElement))
        {
            jqElement.removeClass("disabled");
        }
        else
        {
            jqElement.addClass("disabled");
        }
    }

    var writeConditionals = function(storyModelElement, flagName, testValue, writeValue) {
        if ( writeValue && conditionedOnThis(storyModelElement, flagName, testValue) 
            || !writeValue && !conditionedOnThis(storyModelElement, flagName, testValue))
                return;
    	return StoryModel.writeConditionals(storyModelElement, flagName, testValue);
    } 

    var numberOfConditionals = function(storyModelElement, ifTest) {
    	return StoryModel.numberOfConditionals(storyModelElement, ifTest);
    } 

    var hasAnyConditionals = function(storyModelElement) {
        if (storyModelElement) {
            return (StoryModel.numberOfConditionals(storyModelElement, true) > 0) ||
                    (StoryModel.numberOfConditionals(storyModelElement, false) > 0);
    	}
    	return false;
    } 
    
    var conditionedOnThis = function(storyModelElement, flagName, ifTest) {
        if (ifTest == -1) {
            return StoryModel.conditionedOnThis(storyModelElement, flagName, true) || StoryModel.conditionedOnThis(storyModelElement, flagName, false);
        }
        return StoryModel.conditionedOnThis(storyModelElement, flagName, ifTest);
    }
    
    var conditionalByIndex = function(storyModelElement, ifTest, idx) {
        return StoryModel.conditionalByIndex(storyModelElement, ifTest, idx);
    }
    
    var conditionsMetByCurrentPlaythrough = function(storyModelElement) {

	    
	    // gather up a flagsCollected array
	    // then pass to StoryModel(option, flagsCollected)
	    // which returns true or false
	    
	    var flagsCollected = [];
	    
	    for (var chunkIdx = 0 ; chunkIdx < chunks.length ; chunkIdx++)
	    {
	        for (var stitchIdx = 0 ; stitchIdx < chunks[chunkIdx].stitchBoxes.length; stitchIdx++ )
	        {
                StoryModel.processFlagSetting(chunks[chunkIdx].stitchBoxes[stitchIdx], flagsCollected);
            }
        }
        
        return (StoryModel.doesArrayMeetConditions(storyModelElement._ifConditions, storyModelElement._notIfConditions, flagsCollected));

        
	}
	
//--------------------------- The flag/conditional popup ---------------------------------

    var FlagPopup = function(jqParent, flagText, owner, validFlagTestFunction, callbackForWhenEntered) {
        
        var self = this;
        self.originalText = flagText;

        $("#read_area").append("<div class='eventAbsorber'></div>");          
        var jqAbsorber = $("#read_area").find('.eventAbsorber');
                
        var title = (flagText == "") ? "Add marker" : "Edit marker";
        
        this.jqPopup = $('<div id="flagEntryPopup"><div class="title">' + title + '</div><div class="entry" contentEditable="true"></div><div class="suggestions"></div><div class="nubbin"></div></div>');

        $('#read_area').append(this.jqPopup);
        
        this.jqSuggestions = this.jqPopup.find('.suggestions');
        
        this.jqPopup.css("top", jqParent.offset().top + $('#read_area').scrollTop() - topBannerHeight() + jqParent.height()/2 - this.jqPopup.height()/2 + 4 );
        
        var leftPos = jqParent.offset().left;
        
        if ($('#read_area').width() - ( leftPos + jqParent.width() + 25 ) > this.jqPopup.width() + 10)
            this.jqPopup.css("left", leftPos + jqParent.width() + 25);
        else {
            this.jqPopup.addClass("leftHanded");
            this.jqPopup.css("left", leftPos - 205);
        }
        
        ensureVisibilityOfPopup(this.jqPopup, $('#read_area'));
        
        this.jqPopupEntry = this.jqPopup.find('.entry');
        this.jqPopupEntry.text(flagText);
        moveCaretToEndOf(this.jqPopupEntry[0]);

        var removePopup = function() {
            callbackForWhenEntered(self.jqPopupEntry.text().toLowerCase(), self.originalText);
            self.jqPopup.remove();  
            jqAbsorber.remove(); 
        }
        
        jqAbsorber.bind('click tap', function() { removePopup(); });
        
        
        this.suggestionSet = [];
        for (var i = 0; i < StoryModel.flagIndex.length ; i++) {
            if (validFlagTestFunction(owner, StoryModel.flagIndex[i])) {
                var suggest = {
                    "text": StoryModel.flagIndex[i].toLowerCase(),
                    "match": -1,
                    "lineObject": null
                };
                self.suggestionSet.push(suggest);
            }
        }
 
 /*
self.navigateSuggestions = {
    lineObject: null,
    idx: -1
};
*/

        var blankHighlight = function() {
            self.navigateSuggestions = {
                lineObject: null,
                idx: -1
            };
        }

        var shiftHighlight = function(newIndex) {
            if (self.navigateSuggestions.lineObject)
                self.navigateSuggestions.lineObject.jqLine.removeClass("highlight");
            if (newIndex == -1) {
                var newLineObject = null;
            } else {
                newLineObject = self.suggestionSet[newIndex].lineObject;
                newLineObject.jqLine.addClass("highlight");
            }
            self.navigateSuggestions.lineObject = newLineObject;
            ensureVisibilityOfPopup(newLineObject.jqLine, self.jqSuggestions);
        }
        
        var populateSuggestions = function(suggestionText) {
            self.jqSuggestions.empty();
            blankHighlight();

            if (self.suggestionSet.length > 0) {

                for ( var i = 0 ; i < self.suggestionSet.length ; i++) {
                    self.suggestionSet[i].match = -1;
                }
                
                var scoreMatch = function(checkText, typedText) {
                    var score = checkText.indexOf(typedText);
                    if (score == -1) score = 1000;
                    return score;
                }
                
                
                if (suggestionText != "") {
                    self.suggestionSet.sort( function(a,b) {
                        // -ve => a comes before b
                        if (a.match == -1) 
                            a.match = scoreMatch(a.text, suggestionText);
                        if (b.match == -1) 
                            b.match = scoreMatch(b.text, suggestionText);
                        return (a.match - b.match);
                    });
                }            
                for ( var i = 0 ; i < self.suggestionSet.length ; i++) {
                    self.suggestionSet[i].lineObject = new SuggestionLine( self.suggestionSet[i].text, i, 
                        function(text, closePopup) {
                            self.jqPopupEntry.text(text);
                            moveCaretToEndOf(self.jqPopupEntry[0]);
                            if (closePopup) {
                                removePopup();
                            }
                        },
                        // Hover callback
                        function(lineObject) {
                            shiftHighlight(lineObject.idx);
                            self.navigateSuggestions.idx = lineObject.idx;
                        }
                    );
                    self.jqSuggestions.append(self.suggestionSet[i].lineObject.jqLine);   
                }
            } else {
               self.jqSuggestions.append('<div class="hint"><p>Enter a name for a new marker.</p><p>You will then be able to test for this marker later on in the story.</p></div>'); 
            }
        }




        
        // when clicked away from, call callback with newFlagName, previousFlag
        this.jqPopupEntry.bind("keydown", function(event) {
            if (event.which == 27) { // escape
                self.jqPopupEntry.text("");
                removePopup();
            }
            if ((event.which == 9 || event.which == 13) 
            // tab/enter
                && self.navigateSuggestions.lineObject) {
                    // we're using the arrow keys
                    self.jqPopupEntry.text(self.navigateSuggestions.lineObject.text);
                    moveCaretToEndOf(self.jqPopupEntry[0]);
                    // re-sort the list, blanking the arrow-nav in the process
                    populateSuggestions(self.navigateSuggestions.lineObject.text);
                    event.preventDefault();
                    return false;
             }
            
            if (event.which == 13) { // enter
                
                removePopup();
                event.preventDefault();
                return false;             
            }
            if (event.which == 40) {   // up
                if (self.navigateSuggestions.idx == self.suggestionSet.length - 1) {
                    // bottom of the list
                    event.preventDefault();
                    return false;             
                }
                shiftHighlight(++self.navigateSuggestions.idx);                            
            }
            if (event.which == 38) {   // down 
                if (self.navigateSuggestions.idx == -1) {
                    event.preventDefault();
                    return false; 
                }
                shiftHighlight(--self.navigateSuggestions.idx);
            }
            
        });
        this.jqPopupEntry.bind("keyup", function(event) {
            if (event.which != 38 && event.which != 40) {
                populateSuggestions(self.jqPopupEntry.text().toLowerCase());
            }
        });
        
        populateSuggestions("");
        
    }

    var SuggestionLine = function(text, idx, callback, hoverCallback) {
        this.text = text;
        var self = this;
        this.idx = idx;
        this.jqLine = $("<div class='suggestion'><div class='flag_button plus'></div>" + text + "</div>");
        this.jqLine.find('.plus').bind('click tap', function() {
            callback(text, true);
        });
        this.jqLine.bind('click tap', function() {
            callback(text);
            hoverCallback(self);
        });
        this.jqLine.bind('dblclick', function() {
            callback(text, true);
        });
        this.jqLine.bind('mouseenter', function() {
            hoverCallback(self);
        });
    }


//--------------------------- Searching the Stitch Tree ---------------------------------

// TODO: prefer routes that come from lower down the current flow; so changes of tack are less "jumpy"
// this gets really important when we're trying to let the user create a particular branch

// TODO: Allow the search algorithm to test conditionals. This isn't obvious
// since we're using backlinks, and conditionals work forwards. So we have to
// store the conditions of any given route and check it before we exit the loop.

// Again, rewinding is always safe.


//---------------------------------------------------------------------------------------


// call fromstitch, tostitch

    var getRouteFromTo = function(fromStitch, targetStitch)
    {

        // clear the search path
        stitchRoute = [];
        
 //       console.log("We're looking for a route back from " + targetStitch.name() + " to " + fromStitch.name());
        
        // reset all distances to -1
        for (var i = 0 ; i < StoryModel.stitches.length ; i++)
            StoryModel.stitches[i].distanceToTarget = -1;
    
        // we start by iterating over just the target stitch
        var currentIterationList = [targetStitch];
        var nextIterationList = [];
        
        // Distance starts at -1. First time through the loop it goes up to zero, ready to mark 
        // a zero-distance on the target stitch
    
        var currentDistance = 0;
        var startingPointFound = null;
        var startingChunk = null;
        
        // are we navigating to a stitch already in the flow? In that case, we purely need to rewind
        if (visibleChunkHeadedByStitch(targetStitch))
        {
            startingPointFound = targetStitch;
            
        } else {
        
            while (currentIterationList.length > 0 && chunks.indexOf(startingChunk) != chunks.length - 1) 
            {
                currentDistance++;
                
      //          console.log("Now considering a distance of " + currentDistance);
     //           console.log("We have " + currentIterationList.length + " stitches at this level.");
                // look through all the stitches at the given distance from the target
                for (var j = 0; j < currentIterationList.length  ; j++)
                {
                    
                    var stitchToLookBackFrom = currentIterationList[j];
      //              console.log("Now we're considering the backlinks of " + stitchToLookBackFrom.name());
                    
                    // Store the backlinks of this stitch to consider in the next round
                    var backLinkSet = stitchToLookBackFrom.getBacklinks();
                    
      //              console.log("It has " + backLinkSet.length + " backlinks.");
                    for (var k = 0 ; k < backLinkSet.length ; k++)
                    {
                        var stitchBehindThisOne = backLinkSet[k];
                    
                        // only store backlink stitches if we haven't seen them before, and they're in our list
                        if (stitchBehindThisOne.distanceToTarget == -1)
                        {
                            
                            var myChunk = visibleChunkContainingStitch(stitchBehindThisOne);
                            // is this stitch one we wanted to reach? in which, case save it if it's the best
                            if (myChunk) 
                            {
                                if (chunks.indexOf(myChunk) > chunks.indexOf(startingChunk)) {
                                    startingPointFound = stitchBehindThisOne;
                                    startingChunk = myChunk;
                                    // useful branch, so we set the forward link
                                    stitchBehindThisOne.forwardLinkStitch = stitchToLookBackFrom;
                                }
                                // note, if we discard this option as not better, we don't set the forward link
                                
                                if (chunks.indexOf(startingChunk) == chunks.length - 1)
                                    break;

                            } else {
                        
                                // Promising branch, so we set the forward link
                                stitchBehindThisOne.forwardLinkStitch = stitchToLookBackFrom;

                                // otherwise we step back
                                stitchBehindThisOne.distanceToTarget = currentDistance;
                                nextIterationList.push(stitchBehindThisOne);
                            }
                        }
                    }		
                }
                
                // we've now build up the next iteration list (or its empty) so copy it in
                currentIterationList = [];
                currentIterationList = nextIterationList;
                nextIterationList = [];
                
            }
        
        }
        
        // we didn't exit because of a success, so return -1
        if (!startingPointFound)
        {
  //          console.log("We failed to find a route :(");

            return -1;
        }
        
        // so we have a successful route, we just need to compute it
        var routeIdx = 0;
        var stepStitch = startingPointFound;
    
   //     console.log("We found a route. Here it is:");
        
        while(stepStitch != targetStitch)
        {
   //         console.log("then to '" + stepStitch.name() + "'...");
            stitchRoute[routeIdx] = stepStitch;
            routeIdx++;
            stepStitch = stepStitch.forwardLinkStitch;
        }
        
        stitchRoute[routeIdx] = targetStitch;
            
        // return the number of steps in the route we've constructed
        return routeIdx + 1;
        
    }
   
/*--------------------------------------------------------   

    Reverse UI lookup - from StoryModel back to the UI element

--------------------------------------------------------*/
 
    var stitchGoesToStitch = function(fromStitch, toStitch) {
        var fromFound = false;
        var connectFound = false;
        chunks.each( function() {
            if (!connectFound) {
                var thisChunk = this;
                thisChunk.stitchBoxes.each( function() {
                    if (!connectFound) {
                        var thisStitchBox = this;
                        if (!fromFound ) {
                            if (thisStitchBox.stitch == fromStitch) {
                                fromFound = true;
                            }
                        } else {
                            if (thisStitchBox.stitch == toStitch) {
                                connectFound = true;
                            }
                            fromFound = false;
                        }
                    }
                });
            }
        });
        return connectFound;
    };

   var stitchBoxContainingStitch = function(stitch) {
    //  JI : Original method 
/*       for (var i = 0 ; i < allStitchBoxes.length ; i++) {
            if (allStitchBoxes[i].stitch == stitch) {  
                return allStitchBoxes[i];
            }
        }  
*/
        // JI : alt method
        if (stitch._stitchBox)
            return stitch._stitchBox;
        return false;
   }
   
   var visibleChunkContainingStitch = function(stitch) {
        var stitchBox = stitchBoxContainingStitch(stitch);
        if (stitchBox)
            return stitchBox.ownerChunk;
        return false;
   }
   
   var visibleChunkHeadedByStitch = function(stitch) {
        var stitchChunk = visibleChunkContainingStitch(stitch);
        if (stitchChunk) {
            return (stitchChunk.stitchBoxes[0].stitch == stitch);
        }
        return false;
    }
    
    var scrollTo = function(target, jqContainer) {
        if (!jqContainer)
            jqContainer = $("#read_area");
            
        var jqTarget = $(target);
        
        var destination = jqContainer.scrollTop() + jqTarget.offset().top 
                    - 0.5*jqContainer.innerHeight() + 0.5*jqTarget.outerHeight();
        
        jqContainer.stop().animate({"scrollTop": destination});
    }
    
    var createFromModel = function() {
    
        // Build the editable story UI model
        
    
    
        // Create the initial chunk
        var newChunk = new Chunk();
        chunks.push(newChunk);
        newChunk.fillFromStitch(StoryModel.initialStitch);
        setCurrentStitchBox(chunks[0].stitchBoxes[0]);
        newChunk.addRewindButton();
        
        // Set up options
        jqOptions = $(".options");
        
        recreateOptions();
        updateJoinButton();
        updateRewindButtons();
        
        StitchList.update(true);
    }
    
    var clear = function() {
    
        var thisStitchList = [];        
        if (chunks.length > 0) {
            chunks.each( function() { 
                thisStitchList.push(this.stitchBoxes.first().stitch);
            }); 
         
        }
        
        removeOptions();
        
        for(var i=0; i<chunks.length; ++i) {
            var chunk = chunks[i];
            chunk.stitchBoxes.each( function() {
                if (this.stitch) {
                    this.stitch._stitchBox = null;
                }
            });
            chunk.remove();
        }
        chunks = [];
        //  JI:  Commented list of stitchBoxes used for looking up if stitches are visible
        // allStitchBoxes = [];
        // Replaced with annihilation of _stitchBox attribute above
        

        $("#editor_container").remove();  
        
        return thisStitchList;
        
    }
    
    var setup = function() {
    
        clear();
        
        var jqStoryNameField = '<div contentEditable=true tooltip="Your story title goes here" id="storyNameField" class="titleField">'+StoryModel.storyName()+'</div>';
        
        var jqAuthorNameField = '<div contentEditable=true tooltip="Your name goes here" id="authorNameField" class="titleField">'+StoryModel.authorName()+'</div>';
        
        
        $("#storyNameField")
        .live("blur", function() {
            var newName = $(this).text().replace(/\n/g,"");
            if (newName !== StoryModel.storyName() ) {
                StoryModel.setStoryName( newName );
                EditorMenu.requireSave();
            }
        })
        // Pressing return or escape in story name field
        .live("keydown", function(event) {
            // Return key or escape key
            if( event.which === 13 || event.which === 27 ) { 
                event.preventDefault();
                
                // Revert to original name when escape key pressed
                if( event.which === 27 ) {
                    $(this).text( StoryModel.storyName() );
                } else {
                    $(this).blur();
                }
                
                return false;
            }
            
            return true;
        })
    
        $("#authorNameField")
        .live("blur", function() {
            var newName = $(this).text();
            if (newName !== StoryModel.authorName() ) {
                StoryModel.setAuthorName( newName );
                EditorMenu.requireSave();
            }

        })
        // Pressing return or escape in story name field
        .live("keydown", function(event) {
            // Return key or escape key
            if( event.which === 13 || event.which === 27 ) { 
                event.preventDefault();
                
                // Revert to original name when escape key pressed
                if( event.which === 27 ) {
                    $(this).text( StoryModel.authorName() );
                } else {
                    $(this).blur();
                }
                
                return false;
            }
            
            return true;
        })
        
        
        //jqEditorMenu.append('<em id="saveStateMessage"></em>');
 
        var jqEditorContainer = $('<div id="editor_container">\
                                        <div id="widgets"></div>\
                                        <div id="read_area"  class="full-screen">'
                                            +jqStoryNameField + "<br>" 
                                            +jqAuthorNameField+
                                            '<div class="options"></div>\
                                                 <div class="button stitchLinkButton newJoinButton" tooltip="Join this paragraph to another">\
                                                initial text goes unseen\
                                            </div>\
                                            <div class="button stitchLinkButton newOptionButton" tooltip="Add a new option to this paragraph (shift-return)">\
                                                Add option\
                                            </div>\
                                            <div id="paddingDiv"></div>\
                                        </div>\
                                        <div id="stitch_list_area"  class="collapsed">\
                                            <div class="header"><span class="text">Contents</span>\
                                            <div class="wc"></div>\
                                            </div>\
                                            <div id="stitch_list_scrolling">\
                                            <table id="stitch_list">\
                                            </div>\
                                            </table>\
                                        </div>\
                                    </div>');
    
       $("#main_viewport").append(jqEditorContainer);
       
       setupWidgets();
        
        StitchList.setup();
        
        Editor.newOptionButton = $(".newOptionButton");
        
        $(".newOptionButton:not(.disabled)").unbind('click tap');

        // New option button
        $(".newOptionButton:not(.disabled)").bind('click tap', function() { 
            addNewOption();
            setCurrentStitchBox(null);
        });
        
        Editor.joinButton = $(".newJoinButton");
        Editor.joiningMode = true; // this forces a rebuild of the all the join functionality

        sizeEditorCorrectly();
        
		styleWithoutCss();

    }
    
     var addNewOption = function() {
        var bottomStitch = chunks.last().lastStitch();
        if (!bottomStitch)
        {
            bottomStitch = chunks.last().stitchBoxes.last().createStitch();
        }
        var newStoryOption = StoryModel.createOption(bottomStitch);
        
        var newOption = new Option(newStoryOption, bottomStitch);
        newOption.focus();
        options.push(newOption); 
        
        chunks.last().updateStatsLabel();
        updateJoinButton();
        updateRewindButtons();
        
    }
    
    var loadDefaultStory = function() {

        StoryModel.clear();
        StoryModel.setStoryName("Untitled Story");
        StoryModel.initialStitch = StoryModel.createStitch("Once upon a time...");
        StoryModel.initialStitch.pageNumberLabel(1);
        StoryModel.updateGraphModel();

        clear();
        setup();
        
        createFromModel();
    }
    
    var loadTutorialStory = function() {
        clear();
        StoryModel.importStory(tutorialStory.name, tutorialStory.story);
        setup();
        createFromModel();
        
    }
    
    var reloadCurrentStory = function(stitchPlaythrough) {
        performingLayoutWork = true;
        clear();

        setup();
        
        createFromModel();
        
        if (stitchPlaythrough.length > 0)
        {
            for(var i = 1 ; i < stitchPlaythrough.length ; i++)
            {
                followLinkTo(stitchPlaythrough[i]);
            }
        }
        performingLayoutWork = false;
        
        chunks.last().stitchBoxes.first().jqStitchBoxText.focus();

    }
    
    var load = function(storyData) {
        performingLayoutWork = true;
        clear();
        
        //fix for non-loading of story name
        var editorData = StoryModel.importStory(storyData.title, storyData.data);

        setup();

        createFromModel();
        
        if (editorData) {
            if (editorData.playPoint) {
                navigateToStitch(StoryModel.initialStitch, editorData.playPoint);
            }       
            if (editorData.libraryVisible) {
                StitchList.expand();
            }
            
            changeTextSize(editorData.textSize);
            
        }
        performingLayoutWork = false;
    }
    
    toggleLibrary = function(checkOnly) {
        if (StitchList.expanded) {
            if (!checkOnly) {
                StitchList.collapse(); 
            }
        } else {
            if (!checkOnly) {
                StitchList.expand();
            }
        }
        return StitchList.expanded;
    }


    changeTextSize = function(sizeNum, force) {
        if (sizeNum !== Editor.currentSize || force) {
            if (!EditorMenu.inPlayMode()) {
                var jqReadArea = $('#read_area');
                for (var x = 0; x < editorSizes.length; x++) {
                    if (sizeNum === x) {
                        jqReadArea.addClass(editorSizes[x]);
                    } else {
                        jqReadArea.removeClass(editorSizes[x]);
                    }
                }
            }
            Editor.currentSize = sizeNum;
        }
    }

    editorData = function() {
        var editorData = {};
        if (chunks.length > 0)
            editorData.playPoint = lastStitchInFlow().name();
        editorData.libraryVisible = StitchList.expanded;
        editorData.authorName = StoryModel.authorName();
        editorData.textSize = Editor.currentSize;
        return editorData;
    }
    
     $(document).bind('keyup', function(event) {
        if (event.which == 70  && event.ctrlKey) {
            StitchList.expand();
            $("#searchTerm").focus();
        }
    });   
    
    // Module design pattern: Return public object
    return {
        setup: setup,
        toggleLibrary: toggleLibrary,
        editorSizes: editorSizes,
        clear: clear,
        loadDefaultStory: loadDefaultStory,
        loadTutorialStory: loadTutorialStory,
        reloadCurrentStory: reloadCurrentStory,
        createFromModel: createFromModel,
        load: load,
        FormattingToHTML: FormattingToHTML,
        navigateToStitch: navigateToStitch,
        stitchBoxContainingStitch: stitchBoxContainingStitch,
        launchGraph: launchGraph,
        settings: settings,
        currentSize: currentSize,
        changeTextSize: changeTextSize,
        editorData: editorData,
        statsLabelForStitch: statsLabelForStitch,
        stitchGoesToStitch: stitchGoesToStitch
    };



}();

