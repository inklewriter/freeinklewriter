
var EditorAccount = function() {
    
    var failedServerConnections = 0;
        
    var localStorageTag = "inklewriter_story";
    
    // Introduced 07/06/12 to cope with above tag changing.  ------
    // TODO: Remove this!
    var legacyLocalStorageTag = "inklewriter_session";
    // -------------------------------------------------------------
    
    var rootServerUrl = "";//"https://writer.inklestudios.com/api/1"
    
    var session = {};
    var currentDialogue = null;
    
    var saveStoryInLocalStorage = function()
    {
        if (hasStorage && session.stories["local"] ) {
        	session.stories["local"].updated_at = new Date().toDateString();
            localStorage.setItem(localStorageTag, jQuery.stringifyJSON(session.stories["local"]));
        }
    }
    
    var resetSession = function() {
        session = {
            userId: null,
            username: null,
            currentStoryId: "local",
            stories: {}
        };
    }
    resetSession();
    
    var setUserSession = function(userSession) {
        session.userId = userSession.id;
        session.username = userSession.email;
    }
    
    
    var deleteCookie = function(name) {
        document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    }
    
    var deleteLocalStorageStory = function() {
      localStorage.removeItem(localStorageTag);
    }
    
    var clearSession = function() {
        resetSession();
        if (hasStorage)
            localStorage.removeItem(localStorageTag);
        deleteCookie("_inklewriter_session");
        deleteLocalStorageStory();
    }
    
    var localStorageSession = false;
    if (hasStorage) {
        // See if there's any session login info in localStorage
        var localStoryJson = localStorage.getItem(localStorageTag);
        if( localStoryJson ) {
            session.stories["local"] = jQuery.parseJSON(localStoryJson); 
        }
        
        // TEMPORARY: Remove soon! -----------------
        // Recover data from old legacy localStorage
        else {
            var legacyLocalSessionData = localStorage.getItem(legacyLocalStorageTag);
            if( legacyLocalSessionData ) {
                
                // Remove so it isn't recovered in future
                localStorage.removeItem(legacyLocalStorageTag);
                
                // Recover in new format
                legacyLocalSessionData = jQuery.parseJSON(legacyLocalSessionData); 
                if( legacyLocalSessionData.currentStoryId ) {
                    session.stories["local"] = legacyLocalSessionData.stories[legacyLocalSessionData.currentStoryId];
                }
            }
        }
        // ----------------------------------------

    }
    
    var validateEmail = function(emailAddress) {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        var atInklewriterPattern = /^[a-zA-Z0-9._-]+@inklewriter$/;
        return emailPattern.test(emailAddress) || atInklewriterPattern.test(emailAddress);
    }
    
    var validatePassword = function(password) {
        if( password.length >= 6 ) {
            return true;
        } else {
            return false;
        }
    }
    
    var fetchStories = function(parameters) {
        $.ajax({
           type: "GET",
           url: rootServerUrl+"/users/" + session.userId + "/stories.json",
           contentType: "application/json",
           success: function(storyArray, textStatus, jqXHR) {

               for(var i=0; i<storyArray.length; ++i) {
                    var storyEntry = storyArray[i];
                    session.stories[storyEntry.url_key] = storyEntry;
                    console.log("loaded story, modified " + new Date(storyEntry.updated_at))
               }
                
               console.log("Successfully fetched "+storyArray.length+" stories.")


                loadLatestModifiedOrRequestedStory();
                
               if( parameters && parameters.success ) {
                    parameters.success();
               }
           },
           error: function(jqXHR, textStatus, errorThrown) {
                if( parameters && parameters.failure ) {
                    if( jqXHR.responseText ) {
                        var errorObject = jQuery.parseJSON(jqXHR.responseText);
                        var errorMessage = "could not fetch story data";
                        if (errorObject)
                            errorMessage += ": "+errorObject.error;
                        parameters.failure(errorMessage);
                    } else {
                        parameters.failure("could fetch story data.")
                    }
                }
           }
         });
    }
    
    var latestModifiedStoryId = function() {
        var latestStoryId = null;
        for(var storyId in session.stories) {
            var story = session.stories[storyId];
            
            if( !story.update_at_date ) {
                story.update_at_date = new Date(story.updated_at);
            }
            
            if( !latestStoryId || story.update_at_date > session.stories[latestStoryId].update_at_date ) {
                latestStoryId = storyId;
            }
        }
        
        return latestStoryId;
    }
    
    var loadLatestModifiedOrRequestedStory = function() {

        var requestedID = getURLParameterByName("storyID");
        if (requestedID && session.stories[requestedID]) {
                return loadStoryId(requestedID);
        }
        return loadStoryId( latestModifiedStoryId() );
    }
    
    var signInWithUsernameAndPassword = function(username, password, parameters) {

        var signInData = {
            user: {
                "email": username,
                "password": password
            }
        };
        
        $.ajax({
           type: "POST",
           url: rootServerUrl+"/users/sign_in.json",
           contentType: "application/json",
           processData: true,
           data: jQuery.stringifyJSON(signInData),
           success: function(data, textStatus, jqXHR) {
               data = toObject(data);

               setUserSession(data);
               
               if( !parameters ) {
                   parameters = {};
               }
               
               if( parameters.progress ) {
                   parameters.progress("Signed in. Retrieving stories...");
               }
               
               // Fetch story data for this user
               fetchStories(parameters);
           },
           error: function(jqXHR, textStatus, errorThrown) {
                 if( parameters && parameters.failure ) {
                     if( jqXHR.responseText ) {
                         var errorObject = jQuery.parseJSON(jqXHR.responseText);
                         if (errorObject) {
                             var errorMessage = errorObject.error || "could not sign in";
                         } else {
                            var errorMessage = "could not sign in";
                         }
                         parameters.failure(errorMessage);
                     } else {
                         parameters.failure("could not sign in.")
                     }
                 }
            }
         });
    }
    
    var registerWithUsernameAndPassword = function(username, password, parameters) {
        
        console.log("Creating new user...");
        
        var registrationData = {
            user: {
                "email": username,
                "password": password
            }
        };
        
        $.ajax({
           type: "POST",
           url: rootServerUrl+"/users.json",
           contentType: "application/json",
           processData: true,
           data: jQuery.stringifyJSON(registrationData),
           error: function(jqXHR, textStatus, errorThrown) {
               
               // Have we been passed a failure callback?
               if( parameters && parameters.failure ) {
                   if( jqXHR.responseText ) {
                       var errorObject = jQuery.parseJSON(jqXHR.responseText);
                       if (errorObject) {
                           var errorMessage = errorObject.error || "could not register";
                       
                           // Particular recognised error?
                           if( errorObject.errors.email ) {
                               errorMessage = "email "+errorObject.errors.email[0];
                           } 
                                                     
                        } else {
                            var errorMessage = "could not register";
                        }
                       
                       parameters.failure(errorMessage);

                   } else {
                       parameters.failure("could not reach inklewriter server.")
                   }

               }
           },
           success: function(data, textStatus, jqXHR){
               data = toObject(data);
                console.log("Successfully registered")

                setUserSession(data);
                
                if( parameters && parameters.success ) {
                    parameters.success();
                }
            }
         });        
    }
    

    
    var openRegisterDialogue = function() {
        if( currentDialogue ) {
            currentDialogue.close(true);
        }
        
        var registerDialogue = new Dialogue({
            title: "Create new account",
            message: "Please enter your email address, and your desired password.",
            footer: "<a href='javascript:EditorAccount.popupLoginHelp()'>Don't have an email address?</a>"
        });
        currentDialogue = registerDialogue;
        
        var emailField    = registerDialogue.addField("Email");
        var passwordField = registerDialogue.addSecureField("Password");

        emailField.focus();
        
        var cancelButton = registerDialogue.addButton("Cancel");
        registerDialogue.addButton("Register", function() {
            
            var registerButton = this;
            
            // Validate email
            if( !validateEmail(emailField.value()) ) {
                registerDialogue.setMessage("Please enter a valid email address!");
            }
            
            // Validate password
            else if( !validatePassword(passwordField.value()) ) {
                registerDialogue.setMessage("Please enter a valid password - must be at least 6 characters long!");
            }
            
            // Try and register...
            else {
                
                // Start creating account...
                registerDialogue.setMessage("Creating account...");
                registerButton.disable();
                
                registerWithUsernameAndPassword(
                    emailField.value(), 
                    passwordField.value(),
                    {
                        success: function() {
                            EditorMenu.update();
                            registerDialogue.close();
                            var thankYouDialogue = new Dialogue({
                                title: "Thank you",
                                message: "We hope you enjoy writing in inklewriter!"
                            });
                            thankYouDialogue.addButton("Okay");
                            
                            EditorMenu.processSignedInTasks();
                        },
                        failure: function(message) {
                            registerDialogue.setMessage("Sorry, "+message.replace("username", "email") + " (<a href='http://writer.inklestudios.com/users/password/new'>Reset?<\a>)");
                            registerButton.enable();
                        }
                    });

            }
        });
    }
    
    var openSignInDialogue = function(signInSuccessfulCallback) {
        
        if( currentDialogue ) {
            currentDialogue.close(true);
        }
        
        if (!navigator.cookieEnabled) {
            var cantSignInDialogue = new Dialogue({
                title: "Cookies Are Disabled!",
                message: "We've detected that cookies are disabled for your browser. To sign in, you will need to enable cookies, either in general, or for this site specifically."
            });
            var cancelButton = cantSignInDialogue.addButton("Okay");
            return;
            
        } else {
            
            var signInDialogue = new Dialogue({
                title: "Sign in",
                message: "Welcome! Please enter your sign in details."
            });
            currentDialogue = signInDialogue;
            
            signInDialogue.addContent("(or <a href='javascript:EditorAccount.openRegisterDialogue()'>Create New Account</a>)");
            
            var emailField    = signInDialogue.addField("Email");
            var passwordField = signInDialogue.addSecureField("Password");
            
            emailField.focus();
            
            var cancelButton = signInDialogue.addButton("Cancel");
            signInDialogue.addButton("Sign in", function() {
                
                var signInButton = this;
                
                if( !validateEmail(emailField.value()) ) {
                    signInDialogue.setMessage("Please enter a valid email address!")
                }
                
                else if( !validatePassword(passwordField.value()) ) { 
                    signInDialogue.setMessage("Please check that you've entered your password correctly!")
                }
                
                else {
                    signInDialogue.setMessage("Signing in...");
                    
                    signInButton.disable();
                    
                    signInWithUsernameAndPassword(
                        emailField.value(), 
                        passwordField.value(),
                        {
                            success: function() {
                                signInDialogue.setMessage("Success!");
                                
                                EditorMenu.processSignedInTasks();
                                
                                signInDialogue.close();
                                
                                if( signInSuccessfulCallback ) {
                                    signInSuccessfulCallback();
                                }
                            },
                            progress: function(message) {
                                signInDialogue.setMessage(message);
                            },
                            failure: function(message) {
                                
                                signInButton.enable();
                                
                                if( message === "invalid login parameters" ) {
                                    signInDialogue.setMessage("Could not sign you in. Please check your email and password...");
                                } else {
                                    signInDialogue.setMessage("Sorry, "+message);
                                }
                            }
                        });
                }
    
            });
        }
    }
    
    var popupLoginHelp = function() {
        
        var popupHelpDialogue = new Dialogue({
            title: "No Email?",
            message: "Don't worry! You can still sign up for <b>inklewriter</b>: just choose a username and enter <b>username@inklewriter</b> in the email box.</p><p>You'll still be able to share your stories, but don't forget your password, as we won't be able to send a reminder."
        });

        currentDialogue = popupHelpDialogue;
        
        var okayButton = popupHelpDialogue.addButton("Okay", function() {
            popupHelpDialogue.close(true);
        });       
    }
    
    var signOut = function() {
        
         // Sign out remotely
         $.ajax({
            type: "DELETE",
            url: rootServerUrl+"/users/sign_out.json",
            contentType: "application/json",
            processData: true,
            error: function(jqXHR, textStatus, errorThrown) {
        
                console.log(textStatus);
            },
            success: function(data, textStatus, jqXHR){
                console.log(textStatus);
                
                // Reload page
                window.location = rootServerUrl;
            }
        });
        
        // Delete session including cookie and localstorage
        clearSession();
    }
    
    var signedIn = function() {
        if( session.username ) {
            return true;
        }
        return false;
    }
    
    var localSave = function(storyData) {
        
        // Never saved before
        if( !session.currentStoryId || session.currentStoryId === "local" ) {
            session.currentStoryId = "local";
            session.stories["local"] = storyData;
        } 
        
        // It has a name, whether it's "local" or a real url_key
        else {
            session.stories[session.currentStoryId] = storyData;
            if( session.currentStoryId != "local" ) {
                storyData.url_key = session.currentStoryId;
            }
        }
        
        // Save to disk
        saveStoryInLocalStorage();
    }
    
    var hasLocalStoryData = function() {
        return session.stories["local"] ? true : false;
    }
    
    var closeCurrentStory = function() {
        session.currentStoryId = null;
    }
    
    var recoverSignOut = function() {
        
        // Any unsaved changes?
        if( signedIn() ) {

            // Sign out, but preserving current story data in localStorage
            if( EditorMenu.unsavedChanges() ) {
                
                var signedOutMessage = navigator.cookieEnabled ? "<p>You have been disconnected from inklewriter, perhaps because of an extended period of inactivity.</p> <p>Please sign in again to save your unsaved changes.</p>" : "<p>You have been disconnected from inklewriter because your browser has cookies disabled. Please enable cookies for this site to sign in</p>";
                
                _gaq.push(['_trackEvent', 'Lost Connection to Server', 'Signed out']);

                var confirmation = new Dialogue({
                    title: "Signed out",
                    message: signedOutMessage
                });

                confirmation.addButton("Sign in", function() {
                    // Make sure absolute latest version is saved in localStorage
                    EditorMenu.requireSave();
                    session.stories["local"] = session.stories[session.currentStoryId]
                    session.currentStoryId = "local";

                    saveStoryInLocalStorage();

                    setUserSession({ id:null, email:null });

                    EditorMenu.setup();
                    
                    confirmation.close();
                    
                    // Start sign-in process
                    openSignInDialogue();
                });
            }

            // Full sign out
            else {
                
                var confirmation = new Dialogue({
                    title: "Disconnected",
                    message: "You have been disconnected from inklewriter, perhaps because of an extended period of inactivity."
                });
                
                confirmation.addButton("Okay", function() {
                    clearSession();
                    window.location = rootServerUrl;
                });
            }
        }
    }
    
    var saveStoryData = function(story, successCallback, onErrorCallback) {
        
        var storyIsNew = false;
        
        // Save new?
        if( !session.currentStoryId || session.currentStoryId === "local" ) {
          
            // Previously server-saved story
            if( story.url_key && story.url_key != "local" ) {
                session.currentStoryId = story.url_key;
            } 
            
            // Really is a new story
            else {
                storyIsNew = true;
                session.currentStoryId = "local";
            }
        }

        var storyDataAsText = jQuery.stringifyJSON(story);

        if (storyIsNew) {
            _gaq.push(['_trackEvent', 'Server Interaction', 'Saving', 'New story', storyDataAsText.length/1000]);
        } else {
            _gaq.push(['_trackEvent', 'Server Interaction', 'Saving', 'Resave of existing story', storyDataAsText.length/1000]);
        }

        
        // New story
        if( storyIsNew ) {

            $.ajax({
              type: "POST",
              url: rootServerUrl+"/stories.json",
              contentType: "application/json",
              processData: true,
              data: storyDataAsText,
              success: function(){
                console.log("Successfully sent data (update).")
				failedServerConnections = 0;
                successCallback();
              },
              error: function(jqXHR, textStatus, errorThrown) {
                console.log("Could not save new story. Recovering...");
                
                failedServerConnections++;
                
                if (failedServerConnections > 20) {
	                recoverSignOut();
	            } else {
	            	// I failed callback
	            	if (onErrorCallback)
	            		onErrorCallback();
	            }
	            
              }
            }).done(function( objectUpdatedMsg ) {
                console.log("Sending (updating) done.");
                
                // Keep track of its unique ID
                session.currentStoryId = objectUpdatedMsg.url_key;
                
                // Create new story entry in local array now we have its ID
                session.stories[session.currentStoryId] = story;
                
                // Don't need local storage for an unsaved story now
                delete session.stories["local"];
                deleteLocalStorageStory();
                
            });
            
            

        }
        
        // Updating story
        else {
            
            var dataUrl = rootServerUrl+"/stories/" + session.currentStoryId + ".json";
            
            $.ajax({
              type: "PUT",
              url: dataUrl,
              contentType: "application/json",
              dataType: "text",
              processData: true,
              data: storyDataAsText,
              success: function(data, textStatus, jqXHR){
	            failedServerConnections = 0;
                successCallback();
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.log("Could not save update to story. Recovering...");
                                  
					failedServerConnections++;
					
					if (failedServerConnections > 10) {
						recoverSignOut();
					} else {
						// I failed callback
						if (onErrorCallback)
							onErrorCallback();
					}
                  
              }
            }).done(function( objectUpdatedMsg ) {
	            deleteLocalStorageStory();
                console.log("Sending (updating) done.");
            });
        }
    }
    
    var loadStoryId = function(storyId) {
        session.currentStoryId = storyId;
        saveStoryInLocalStorage();
        return session.stories[storyId];
    }
    
    var loadExternalStoryId = function(storyId, successCallback) {
        $.ajax({
            type: "GET",
            url: rootServerUrl+"/stories/"+storyId+".json",
            contentType: "application/json",
            processData: true,
            success: function(data, textStatus, jqXHR) {
               //data = toObject(data);
               successCallback(data);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // TODO: Do something?
            }
        });
    }
    
    var loadCurrentStory = function() {
        if( session.currentStoryId ) { 
            return session.stories[session.currentStoryId];
        }
    }
    
    var loadLocalStory = function() {
      return session.stories["local"];
    }
    
    var deleteStory = function(storyId) {
        delete session.stories[storyId]
        
        var dataUrl = rootServerUrl + "/stories/" + storyId + ".json";
        
        $.ajax({
          type: "DELETE",
          url: dataUrl,
          contentType: "application/json",
          success: function(){
            console.log("Deleted story id "+storyId);
          }
        });
        
        // Close this story if it's open right now
        if( session.currentStoryId === storyId ) {
            closeCurrentStory();
            deleteLocalStorageStory();
        }
    }
    
    // Prepare authorisation token
    $(document).ajaxSend(function(event, request, settings) {
      if (typeof(AUTH_TOKEN) == "undefined") return;
      
      // settings.data is a serialized string like "foo=bar&baz=boink", json, or null
      settings.data = settings.data || "";
      
      // Add json
      if( settings.contentType == "application/json" ) {
          var jsonData;
          
          if( settings.data.length > 0 ) { 
             jsonData = jQuery.parseJSON(settings.data);
          } else {
             jsonData = {};
          }
          
          jsonData["authenticity_token"] = AUTH_TOKEN;
          settings.data = jQuery.stringifyJSON(jsonData);
      } 
      
      // String parameters
      else {
          settings.data += (settings.data ? "&" : "") + "authenticity_token=" + encodeURIComponent(AUTH_TOKEN);
      }
    });
    
    // Module design pattern: Return public object
    return {
        signIn: openSignInDialogue,
        signOut: signOut,
        signedIn: signedIn,
        openRegisterDialogue: openRegisterDialogue,
        saveStoryData: saveStoryData,
        localSave: localSave,
        hasLocalStoryData: hasLocalStoryData,
        clearSession: clearSession,
        setUserSession: setUserSession,
        closeCurrentStory: closeCurrentStory,
        loadCurrentStory: loadCurrentStory,
        loadLocalStory: loadLocalStory,
        loadStoryId: loadStoryId,
        loadExternalStoryId: loadExternalStoryId,
        startNewStory: function() { session.currentStoryId = "local"; },
        deleteStory: deleteStory,
        username: function() { return session.username; },
        allStories: function() { return session.stories; },
        currentStoryId: function() { return session.currentStoryId; },
        popupLoginHelp: popupLoginHelp,
        fetchStories: fetchStories
    };
}();