
var EditorMenu = function() {
    
    var NO_SAVE_REQUIRED = 0;
    var UNSAVED = 5;
    var OUT_OF_DATE = 10;
    var PENDING = 20;
    var SENDING_TO_SERVER = 30;
    var SAVED = 40;
    var TUTORIAL = 50;
    var saveState = NO_SAVE_REQUIRED;
    
    var maximumSaveFrequency = 6000;
    var saveInProgress = false;
    var saveData = null;
    
    var playMode = false;
    
    var validateName = function(name) {
        if( name.length > 0 ) {
            return true;
        } else {
            return false;
        }
    }
    
    var validateStoryName = validateName;
    var validateFirstName = validateName;
    var validateLastName = validateName;
    
    // Allow D/M/YYYY (for example) as well
    var datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d\d|19\d\d|20\d\d)$/
    
    var validateDateOfBirth = function(dateString) {
        if( datePattern.test(dateString) ) {
            return true;
        } else {
            return false;
        }
    }
    
    var minAge = 13;
    var maxAge = 21;
    var competitionDeadline = new Date("April 15, 2012"); // Date() // <-- Today
    var ageMessage = "Sorry, you must be aged between "+minAge+" and "+maxAge+" on the competition deadline date to enter!";
    
    var validateCompetitionAge = function(dateString) {
        var dateComponents = dateString.match(datePattern);
        if( dateComponents.length === 4 ) {
            
            // YYYY format
            var birthYear = parseInt(dateComponents[3], 10);
            
            // 20YY format
            if( birthYear < 50 ) {
                birthYear += 2000;
            } 
            
            // 19YY format
            else if ( birthYear < 100 ) {
                birthYear += 1900;
            }
            
            var birthMonth = parseInt(dateComponents[2], 10);
            var birthDay = parseInt(dateComponents[1], 10);
            
            // Calculate the minimum and maximum entry dates given their birthday
            // Seems a bit backwards, but how can you easily calculate someone's age on a particular day?
            var minEntryDate = new Date(birthYear+minAge, birthMonth-1, birthDay);
            var maxEntryDate = new Date(birthYear+maxAge, birthMonth-1, birthDay);
            
            // Is their age within range?
            if( competitionDeadline.getTime() > minEntryDate.getTime() && competitionDeadline.getTime() < maxEntryDate.getTime() ) {
                return true;
            }
        }
        
        return false;
    }
    
    var eraseAndStartNew = function() {
        playMode = false;
        Player.clear();
        Editor.loadDefaultStory();
        setSaveState(NO_SAVE_REQUIRED);
        resetSessionDataAndStoryId();
        
        update();

    }
    
    var resetSessionDataAndStoryId = function() {
        // Begin a new story gracefully
        if( EditorAccount.signedIn() ) {
            EditorAccount.startNewStory();
        } 
        
        // Clear all session data if we're not signed in
        else {
            EditorAccount.clearSession();
        }
    }
    
    var createFileListDialogue = function(parameters) {
        
        var fileDialogue = new Dialogue({
            title: parameters.title,
            message: parameters.message
        });
        
        var mainButtonTitle = parameters.mainButtonTitle || "Open";
        
        var jqFileList = $('<ul id="fileList"></ul>');
        fileDialogue.addContent(jqFileList);
        
        var populateFileList = function() {
            var allStories = [];
             
            if( EditorAccount.signedIn() ) {
                 allStories = EditorAccount.allStories();
            }
        
            // Create files
            var deleteHtml = parameters.hasDelete ? '<div class="delete button">X</div>' : '';
            for(var storyId in allStories) {
                var storyData = allStories[storyId];
                if (storyData)
                {
                    var storyName = storyData.title;
                    var jqStoryEntry = $('<li>'+storyName+deleteHtml+'</li>');
                    jqStoryEntry.data("storyId", storyId);
                    jqFileList.append(jqStoryEntry);
                }
            }
        
             // Selecting file list items
            jqFileList.find("li").bind("click tap", function() {
        
                if( $(this).hasClass("selected") ) {
                    $(this).removeClass("selected");
                    openButton.disable();
                } else {
                    // Deselect others
                    jqFileList.find(".selected").removeClass("selected");
                    $(this).addClass("selected");
                    openButton.enable();
                }
            })
        
            // Directly opening a file
            jqFileList.find("li").bind("dblclick", function() {
                var storyId = $(this).data("storyId");
                if( storyId ) {
                    parameters.choose(storyId);
                    fileDialogue.close();
                }
            })
            
            // Deleting files
            if( parameters.hasDelete ) {
                jqFileList.find(".delete.button").bind("click tap", function() {
                    var jqChosenToDelete = $(this).closest("li");
                    var storyId = jqChosenToDelete.data("storyId");
                    var storyData = EditorAccount.allStories()[storyId];
                    
                    var thisName = "Untitled";
                    if (storyData)
                        thisName = storyData.title;

                    var deleteConfirm = new Dialogue({
                        title: "Delete story",
                        message: "Are you sure you wish to delete the story "+thisName+"?"
                    })
                
                    deleteConfirm.addButton("Cancel");
                    deleteConfirm.addButton("Delete", function() {
                    
                        // Close down this story editing session if we're deleting
                        // the one that we're currently editing.
                        if( EditorAccount.currentStoryId() == storyId ) {
                            eraseAndStartNew();
                        }
                        
                        EditorAccount.deleteStory(storyId);
                    
                        // Refresh file list
                        jqFileList.find("li").remove();
                        populateFileList();
                        openButton.disable();
                    
                        deleteConfirm.close();
                    })
                })
            } // delete functionality
        }; // populateFileList
        populateFileList();
        
        fileDialogue.addButton("Cancel");
        var openButton = fileDialogue.addButton(mainButtonTitle, function() {
            var jqSelected = jqFileList.find(".selected");
            var storyId = jqSelected.data("storyId");
            parameters.choose(storyId);
            fileDialogue.close();
        });
        
        openButton.disable();
        
        return fileDialogue;
    }
    
    
    var open = function() {
        
        // Don't open immediately if there are unsaved files
        var openImmediate = function() {
            
            // Create file list dialogue
            var fileListDialogue = createFileListDialogue({
                title: "Open",
                message: "Choose the story to open",
                hasDelete: true,
                choose: function(storyId) {
                    saveState = SAVED;
                    playMode = false;
                    Player.clear();
                    Editor.load( EditorAccount.loadStoryId(storyId) );
                    update();
                }
            })
        }
        
        if( saveState >= OUT_OF_DATE && saveState < SAVED ) {
            
            var confirm = new Dialogue({
                title: "Unsaved changes",
                message: "Saving is in progress. Are you sure you wish to continue and open a different story anyway?"
            });
            
            confirm.addButton("Cancel");
            confirm.addButton("Continue...", function() { confirm.close(); openImmediate();  } );
            
        } else {
            openImmediate();
        }
    }
    
    var competition = function() {
        
        // Show info dialogue
        var infoDialogue = new Dialogue({
            title: "inkle writing competition",
            message: "inkle is running an interactive fiction writing competition, open between \
                      blah and blah. If you're aged between "+minAge+" and "+maxAge+" you're very welcome to enter! \
                      For more information, go to <a href='http://www.inklestudios.com/competition'>our \
                      main competition page</a>.<br/><br/>If you're ready to submit your entry, click enter!"
        });
        
        infoDialogue.addButton("Cancel");
        infoDialogue.addButton("Enter", function() {
            infoDialogue.close();
            
            // Show file list dialogue
            var fileListDialogue = createFileListDialogue({
                title: "Competition entry",
                message: "Choose the story you'd like to enter in the competition",
                mainButtonTitle: "Submit",
                choose: function(storyId) {
                    
                    var storyData = EditorAccount.allStories()[storyId];
                    
                    // Details form
                    var formDialogue = new Dialogue({
                        title: "Entry form",
                        message: "Your details"
                    });
                    
                    var firstNameField = formDialogue.addField("First name");
                    var lastNameField  = formDialogue.addField("Last name");
                    var dobField       = formDialogue.addField("Date of birth (DD/MM/YYYY)");
                    
                    formDialogue.addButton("Cancel");
                    formDialogue.addButton("Submit", function() {
                        
                        if( !validateFirstName(firstNameField.value()) ) {
                            formDialogue.setMessage("Please enter your first name");
                            return;
                        }
                        
                        else if( !validateLastName(lastNameField.value()) ) {
                            formDialogue.setMessage("Please enter your last name");
                            return;
                        }
                        
                        else if ( !validateDateOfBirth(dobField.value()) ) {
                            formDialogue.setMessage("Please specify the date in the format DD/MM/YYYY");
                            return;
                        }
                        
                        else if ( !validateCompetitionAge(dobField.value()) ) {
                            formDialogue.setMessage(ageMessage);
                            return;
                        }
                        
                        // Show confirmation dialogue
                        var submitConfirmDialogue = new Dialogue({
                            title: "Submit entry",
                            message: "Are you sure you wish to submit \""+storyData.title+"\" into inkle's competition?"
                        });

                        submitConfirmDialogue.addButton("Cancel");
                        submitConfirmDialogue.addButton("Submit", function() {
                            formDialogue.close();
                            submitConfirmDialogue.close();

                            // Show thank you dialogue
                            var thankYouDialogue = new Dialogue({
                                title: "Thank you!",
                                message: "Your story has been successfully entered into the competition. Good luck!"
                            });
                            thankYouDialogue.addButton("Okay");
                        });
                        
                    }) // formDialogue (Submit callback)
                } // fileListDialogue (choose callback)
            }) // fileListDialogue
            
        }) // infoDialogue
    } // competition
    
    
    var confirmSaveThenCall = function(actionAfterFunc) {
        if( saveState == UNSAVED ) {
            var confirm = new Dialogue({
                title: "Save changes?",
                message: "Would you like to log in and save changes to your work in progress before continuing?"
            });

            confirm.addButton("Don't save", function() { confirm.close(); actionAfterFunc();  } );
            confirm.addButton("Cancel");
            confirm.addButton("Save", function() { 
                confirm.close(); 
                
                // Signing in cancels the existing action
                EditorAccount.signIn();
            });
        }
        
        else if( saveState >= PENDING && saveState < SAVED ) {
            
            var confirm = new Dialogue({
                title: "Unsaved changes",
                message: "Saving is in progress. Are you sure you wish to continue anyway?"
            });
            
            confirm.addButton("Continue", function() { confirm.close(); actionAfterFunc();  } );
            confirm.addButton("Cancel");
        }
        
        // No unsaved work - create a new story instantly
        else {
            actionAfterFunc();
        }
    }
    
    var loadTutorial = function() {
        confirmSaveThenCall( function() {
            setSaveState(TUTORIAL);
            resetSessionDataAndStoryId();
            Editor.loadTutorialStory(); 
            enterPlayMode(); 
        });
    }
    
    var toggleLibraryView = function() {
        var libButton = $("#libraryButton");
        if (Editor.toggleLibrary()) {
            libButton.addClass('toggledto');
            libButton.attr("tooltip", "Close the contents list");
            
        } else {
            libButton.removeClass('toggledto');
            libButton.attr("tooltip", "Open the contents list");
        }
        
    }    
    
    var launchMapView = function() {
        Editor.launchGraph();
    }
    
    var createNew = function() {
        confirmSaveThenCall( eraseAndStartNew );
    }
    
    var showShareDialogue = function() {

        var htmlURL = window.location.protocol + "//" + window.location.host + "/stories/" + EditorAccount.currentStoryId();
        var jsonURL = htmlURL + ".json";
        var inkURL = htmlURL + ".ink";

        var content = '<p><a href="' + htmlURL + '" target="_blank">Play the story in a browser</a>.</p>' +
            '<input type="text" onClick="this.select();" class="selectInput" value="' + htmlURL + '" />' +
            '<p><a href="' + jsonURL + '" target="_blank">Get the story in JSON format.</a></p>' +
            '<input type="text" onClick="this.select();" class="selectInput" value="' + jsonURL + '" />' +
            '<p><a href="' + inkURL + '" target="_blank">Get the story in Inklestudio\'s Ink format.</a></p>' +
            '<input type="text" onClick="this.select();" class="selectInput" value="' + inkURL + '" />' +
            '<br><br>';

        var shareDialogue = new Dialogue({
            title: "Share '" + StoryModel.storyName() + "'",
            message: content,
            footer: "Caution, the JSON format exported here is not usable in Ink."
        });

        $("input.selectInput").css({
            borderRadius: 20,
            fontSize: 14,
            textDecoration: "underline",
            padding: 10,
            width: "95%",
            margin: "0px 0px 20px"
        });

        shareDialogue.addButton("Okay");

        // Feature 7: Fixed URL Sharing - Add "Read now" button to open story in new tab
        shareDialogue.addButton("Read now", function() {
            window.open(window.location.protocol + "//" + window.location.host + "/stories/" + EditorAccount.currentStoryId());
        });
    }
    
    var showSettingsDialogue = function() {

        var originalSettings = {   
            scaleSize: Editor.currentSize,
            optionMirroring: StoryModel.optionMirroring,
            allowCheckpoints: StoryModel.allowCheckpoints
        };

        var settingsDialogue = new Dialogue({
            title: "Settings",
            message: "Scale of the editor:"
        });

        // actual system to select this. Um...
        var jqTextSettings = $('<div class="optionSet"></div>');
        settingsDialogue.addContent(jqTextSettings);
        
        var newOption = function(setName, type, label) {
            return $('<div class="dialogueBoxOption"><input type="' + type + '" name="' + setName + '"/><label>' + label+ '</label></div>');
        };

        var populateScalesList = function() {
             
            for(var x = 0; x < Editor.editorSizes.length; x++) {
                var jqEntry = newOption("scale", "radio", Editor.editorSizes[x]);
                jqEntry.find('input').data("sizeID", x);
                if (x === originalSettings.scaleSize) {
                    jqEntry.find('input').attr('checked', true);
                }
                jqTextSettings.append(jqEntry);
            }

             // Select an item in the list
            jqTextSettings.find("input").bind("change", function() {        
                var self = $(this);
                Editor.changeTextSize(self.data("sizeID"));
            });
        };

        populateScalesList();

        settingsDialogue.addContent("<p>Read settings:</p>");
        
        var jqReadOptions = $("<div class='optionSet'></div>");
        settingsDialogue.addContent(jqReadOptions);  
        
        var createReadOption = function(name, label, variable) {
            var jqOptionEntry = newOption(name, "checkbox", label);
            jqReadOptions.append(jqOptionEntry);
            jqOptionEntry.find('input').attr('checked', originalSettings[variable]);
            jqOptionEntry.find('input').bind("change", function() {
                StoryModel[variable] = $(this).is(':checked');
            });
        };

        createReadOption("mirroring", "display option once chosen", "optionMirroring");
        createReadOption("checkpoints", "provide more rewind points", "allowCheckpoints");

        settingsDialogue.addButton("Okay", function() {
            EditorMenu.requireSave();
            settingsDialogue.close();
        });

        settingsDialogue.addButton("Cancel", function() {
            Editor.changeTextSize(originalSettings.scaleSize);
            StoryModel.optionMirroring = originalSettings.optionMirroring;
            EditorMenu.requireSave();
            settingsDialogue.close();
        });

        settingsDialogue.sizeToFit();
        
    };

        
    
    var enterPlayMode = function() {

 /* Entering play mode is rarely slow enough to require a loading box
    var loading = new Dialogue({
            title: "Working",
            message: "Please wait a moment..."
        });
*/

        var startFromStitch = Editor.clear();        
        // Note that the player never loads a story
        Player.setup(startFromStitch);
        playMode = true;       
        
//        loading.close();
        
        update();
    }
    
    var enterEditMode = function() {


// Entering edit mode is slow
        var loading = new Dialogue({
            title: "Working",
            message: "Please wait a moment..."
        });
        
        // Timeout allows the dialogue to appear before we get busy rendering other things
        setTimeout( function() {

            var stitchPlaythrough = Player.clear();        
            Editor.reloadCurrentStory(stitchPlaythrough);
            playMode = false;
            
            loading.close();

            Editor.changeTextSize(Editor.currentSize, true);
            
            update();
            
        }, 2);
    }
    
    var clearMenu = function(jqMenu) {
        jqMenu.empty();
    }
    
    var addMenuOption = function(optionName, jqMenu, callback, tooltip) {
        
        // Add a separator first if this isn't the first option
        var jqChildren = jqMenu.children();
        if( jqChildren.length > 0 && !jqChildren.last().hasClass("separator") ) {
            jqMenu.append('<div class="separator"></div>');
        }
        
        // Append the new menu option
        var jqMenuItemLink = $('<div class="menuOption">'+optionName+'</div>');
        
        if (callback) {
            jqMenuItemLink.bind('click tap', function() { callback(); });
        }
        
        if (tooltip) {
            jqMenuItemLink.attr("tooltip", tooltip);
        }

        jqMenu.append(jqMenuItemLink);
    }
   
    var updateMenuBar = function() {
        
        var jqEditorMenu = $("#account_container #editMenu");
        
        // Remove all login/out elements
        clearMenu(jqEditorMenu);



        if (!playMode)  {    
            if (Editor.settings.graphing)
                addMenuOption("map", jqEditorMenu, EditorMenu.launchMapView, "Open the map");
      
            if (Editor.toggleLibrary(true)) {
                addMenuOption("<span id='libraryButton' class='toggledto'>contents</span>", jqEditorMenu, EditorMenu.toggleLibraryView, "Close contents list");            
            } else {
                addMenuOption("<span id='libraryButton'>contents</span>", jqEditorMenu, EditorMenu.toggleLibraryView, "Open contents list");            
            }
        }
    
        
        if (!playMode) {
            addMenuOption("<span class='toggledto'>write</span>", jqEditorMenu);
            addMenuOption("read", jqEditorMenu, EditorMenu.enterPlayMode, "Read your story"); 
        }
        else {
            addMenuOption("write", jqEditorMenu, EditorMenu.enterEditMode, "Write your story");
            addMenuOption("<span class='toggledto'>read</span>", jqEditorMenu); 
        }

        if (!($.browser.msie && parseInt($.browser.version, 10) <= 8)) {
            addMenuOption("<span style='font-size:24px;'>&#9881;</span>", jqEditorMenu, EditorMenu.showSettingsDialogue, "Settings");
        }
        
        setSaveState(saveState);
    }
    
    var updateAccountInfoBar = function() {
        
        var jqAccountMenu = $("#account_container #fileMenu");
        
        // Remove all login/out elements
        clearMenu(jqAccountMenu);
        

        
        // Logged in
        if( EditorAccount.signedIn() ) {
            
            // We need a username and the sign out link
//            jqAccountMenu.prepend('<div class="menuOption">'+EditorAccount.username()+'</div>');
            addMenuOption("sign out", jqAccountMenu, signOut, "Sign out");
        }
        
        // Logged out
        else {
            // We need a "sign in" element
            addMenuOption("sign in", jqAccountMenu, EditorAccount.signIn, "Sign in to your account");
        }
        
                        
        addMenuOption("new", jqAccountMenu, EditorMenu.createNew, "Start a new story");
        
        if( EditorAccount.signedIn() ) {
            addMenuOption("open", jqAccountMenu, EditorMenu.open, "Open one of your saved stories");
            addMenuOption("import", jqAccountMenu, EditorMenu.importStory, "Import a story from another instance");
//            addMenuOption("competition", jqAccountMenu, EditorMenu.competition);
        }


        if (saveState != TUTORIAL) {
            addMenuOption("tutorial", jqAccountMenu, EditorMenu.loadTutorial, "Load the tutorial");
            
            // we can't share the tutorial        
            if( EditorAccount.signedIn() ) {
                // if not yet saved, hide the button completely
                if (saveState > UNSAVED) {
                    addMenuOption("share", jqAccountMenu, EditorMenu.showShareDialogue, "Share your story");
                }
            } else {
                addMenuOption("share", jqAccountMenu, EditorAccount.signIn, "Sign in to share your story");
            }
        } else {
            addMenuOption("restart tutorial", jqAccountMenu, EditorMenu.loadTutorial, "Restart the tutorial");            
        }
        
        if (saveState != TUTORIAL) {
            addMenuOption("?", jqAccountMenu, function() { window.open("http://www.inklestudios.com/inklewriter/getting-started") }, "Getting Started");
        }
        
        

    }
    
    var setSaveState = function(newState) {
        saveState = newState;
        
        var jqSaveMessage = $("#saveStateMessage");
        
        if( newState === UNSAVED ) {
            jqSaveMessage.text("Sign in to save");
        } else if( newState >= OUT_OF_DATE && newState <= PENDING ) {
            jqSaveMessage.text("Saving soon...");
        } else if( newState === SENDING_TO_SERVER ) {
            jqSaveMessage.text("Saving...");
        } else if( newState === SAVED ) {
            jqSaveMessage.text("Saved.");
        } else if( newState == NO_SAVE_REQUIRED ) {
            jqSaveMessage.text("");
        } else if ( newState == TUTORIAL ) {
            jqSaveMessage.text("Tutorial in progress...");
        } else {
            jqSaveMessage.text("Error. Save state unknown.");
        }
        if (EditorAccount.username())
            jqSaveMessage.prepend( "Logged in as " + EditorAccount.username() + " -- ");
            
        // Is a save message required?
        if( !EditorAccount.signedIn() || newState === TUTORIAL || newState === SAVED || newState === NO_SAVE_REQUIRED ) {
            window.onbeforeunload = null;
        } else {
            window.onbeforeunload = function() {
                var message = 'inklewriter has unsaved changes';
                return message;
            };
        }
    }
    
    var update = function() {
        updateMenuBar();
        updateAccountInfoBar();
    }
    
    var requireSave = function() {
    
        if( saveState == TUTORIAL) {
            return;
        }
    
        if( saveState == NO_SAVE_REQUIRED ) {
            setSaveState(UNSAVED);
        }
        
        if( saveState <= SAVED && saveState > UNSAVED ) {
            setSaveState(OUT_OF_DATE);
        }
        
        // Take latest snapshot of data, even if we don't save it immediately to the cloud
        var newStoryVersion = {
            title: StoryModel.storyName(),
            data: StoryModel.exportStory()
        };
        
        // Account adds url_key, if one is available
        EditorAccount.localSave(newStoryVersion);
        var storySnapshot = jQuery.stringifyJSON( EditorAccount.loadCurrentStory() );
        
        // No more we can do if we aren't signed in
        if( !EditorAccount.signedIn() ) {
            console.log("Not signed in, can't save yet.");
            return;
        }
        
        // Allow save at a maximum of once every X seconds
        if( saveState < PENDING ) {
            
            console.log("Save pending...");
            
            setSaveState(PENDING);
            
            setTimeout(function() {

                // Save to disk/cloud
                if( EditorAccount.signedIn() ) {
                    
                    if( saveState <= PENDING ) {
                        
                        console.log("Sending save data to server...");
                        
                        setSaveState(SENDING_TO_SERVER);
                        
                        // Make a copy so the saveData is changed under our feet when we get into the closure
                        var savedSnapshot = storySnapshot+"";
                        var storyToSaveSnapshot = jQuery.parseJSON(savedSnapshot);
                        EditorAccount.saveStoryData(storyToSaveSnapshot, function() {
                            
                            // Only set as saved if we didn't get a subsequent save requirement
                            if( saveState == SENDING_TO_SERVER ) {
                                setSaveState(SAVED);
                                console.log("Saved: "+storyToSaveSnapshot.title+":"+savedSnapshot);
                                update();
                            } else {
                                console.log("Although save was just completed, it seems another has been requested.");
                            }
                        }, function() {
                        	console.log("Save failed. Retrying...");
                        	setSaveState(OUT_OF_DATE);
                        	requireSave();
                        });
                    } 
                    
                    
                    else {
                        console.log("Skipping save since a save is already in progress (or it's already up to date).");
                    }
                } 
                
                // User signed out / was signed out between us scheduling the save, and it actually happening
                else {
                    setSaveState(UNSAVED);
                }
                
                saveInProgress = false;
            }, maximumSaveFrequency)
        }
        

    }
    
    var unsavedChanges = function() {
        if( saveState >= UNSAVED && saveState <= SENDING_TO_SERVER ) {
            return true;
        } else {
            return false;
        }
    }
    
    var processSignedInTasks = function() {
        
        // Save newly edited file now that we're signed in
        if( saveState > NO_SAVE_REQUIRED && saveState < SAVED ) {
            console.log("Newly edited file requires save since now logged in.")
            
            // Close the story that was saved on the cloud,
            // so that it isn't overwritten by our unsaved local story.
            EditorAccount.closeCurrentStory();
            
            update();
            
            // Save the local story we were editing
            requireSave();
        } 
        
        // No modifications made - assume we want to load the user's latest story
        else if( saveState === NO_SAVE_REQUIRED ) {
            var loadedStoryData = EditorAccount.loadCurrentStory();
            if( loadedStoryData ) {
                saveState = SAVED;
                update();

                Editor.load(loadedStoryData);
                
                console.log("Loaded latest story.");
            }
        }
        
        
    }
    
    var setup = function() {
        update();

        if( !EditorAccount.signedIn() ) {
            if( saveState >= OUT_OF_DATE && saveState < SAVED ) {
                setSaveState(UNSAVED);
            }
        }

        // Feature: Save on Click - Allow users to manually trigger save by clicking on saved status
        $("#saveStateMessage").on("click", function(event) {
            EditorMenu.requireSave();
        });
    }
    
    var signOut = function() {
        
        if( EditorAccount.signedIn() ) {
            confirmSaveThenCall( function() {
                var confirmation = new Dialogue({
                    title: "Sign out",
                    message: "Are you sure you wish to sign out "+EditorAccount.username()+"?"
                });
                
                confirmation.addButton("Cancel");
                confirmation.addButton("Sign out", function() {
                    EditorAccount.signOut();
    //                Editor.clear();
                    Editor.loadDefaultStory();
                    setSaveState(NO_SAVE_REQUIRED);
                    EditorMenu.update();
                    confirmation.close();
                    new Splash();
                });
            });
        }
    }
    
    var loadLocalStory = function() {
        var loadedStoryData = EditorAccount.loadLocalStory();
        if( loadedStoryData ) {
            Editor.load(loadedStoryData);

            // Need to set the save state, so that it saves our session when we log in
            requireSave();
        }
    }

    var importStory = function() {
        var dialogue = new Dialogue({
            title: "Import",
            message: "Paste your story to import in JSON format.",
            footer: "After import, your story will be added to your account. Use the <b>Open</b> button to select it from the list and edit it."
        });

        var form = $('<form><textarea rows=20 cols=45></textarea></form>');

        dialogue.addContent(form);
        dialogue.addButton("Cancel");
        dialogue.addButton("Import story", function() {
            var story = $(".dialogue textarea").val();

            // Validate JSON format
            try {
                JSON.parse(story);
            } catch(e) {
                console.log("Invalid JSON format:", e);
                alert("Oops, your JSON format is invalid!");
                return;
            }

            // POST story to server
            $.ajax({
                type: "POST",
                url: "/stories.json",
                contentType: "application/json",
                processData: true,
                data: story,
                success: function(jqXHR, textStatus, errorThrown) {
                    console.log("Successfully sent data (import).");
                    dialogue.close();
                },
                error: function(t, n, r) {
                    alert("Could not save new story. Try again?");
                }
            }).done(function(e) {
                console.log("Sending (importing) done.");
                EditorAccount.fetchStories();
            });
        });

        return dialogue;
    }

    // Module design pattern: Return public object
    return {
        eraseAndStartNew: eraseAndStartNew,
        createNew: createNew,
        loadTutorial: loadTutorial,
        toggleLibraryView: toggleLibraryView,
        launchMapView: launchMapView,
        open: open,
        competition: competition,
        showShareDialogue: showShareDialogue,
        showSettingsDialogue: showSettingsDialogue,
        enterPlayMode: enterPlayMode,
        enterEditMode: enterEditMode,
        inPlayMode: function() { return playMode; },
        requireSave: requireSave,
        unsavedChanges: unsavedChanges,
        setup: setup,
        update: update,
        processSignedInTasks: processSignedInTasks,
        loadLocalStory: loadLocalStory,
        importStory: importStory
    };
}();