var Dialogue = function(parameters) {
    
    var jqWindow = $(window);
    var jqAbsorber = null;
    var jqDialogue = null;
    var jqContent = null;
    var jqFooter = null;
    var jqFields = null;
    var jqButtons = null;
    var publicObject = null;
    var closing = false;
        
    parameters.title = parameters.title || "";
    parameters.message = parameters.message || "";
    parameters.footer = parameters.footer || "";
    
    var keypressEventHandler = function(event) {
        // Cancel all keypresses if closing the window
        if( closing ) {
            event.preventDefault();
            return false
        }
        
        // Return key
        if( event.which === 13 ) {
            
            // Press default button: the rightmost one
            var jqAllButtons = jqButtons.find(".button");
            if( jqAllButtons.length > 0 ) {
                event.preventDefault();
                var jqDefaultButton = jqAllButtons.last();
                jqDefaultButton.click();
                return false;
            }
        }
        
        // Escape key - try to press a cancel button
        else if ( event.which === 27 ) {
            
            var jqAllButtons = jqButtons.find(".button");
            jqAllButtons.each(function() {
                var jqButton = $(this);
                if( jqButton.text().match( /cancel/i ) ) {
                    jqButton.click();
                    event.preventDefault();
                    return false;
                }
            })
        }
        
        return true;
    }
    
    var create = function() {
        
        jqAbsorber = $("<div class='eventAbsorber'></div>");
        $("body").append(jqAbsorber);
        
        jqDialogue = $("<div class='dialogue'><div id='bg'></div> \
                            <div id='content'> \
                                <h1>"+parameters.title+"</h1> \
                                <p>"+parameters.message+"</p> \
                            </div> \
                            <div id='footer'></div> \
                            <div id='buttons'></div> \
                        </div>");
        

        // Add
        $("body").append(jqDialogue);
        jqDialogue.focus();
        
        jqContent = jqDialogue.find("#content");
        jqButtons = jqDialogue.find("#buttons");
        jqFooter = jqDialogue.find("#footer");
        
        if (parameters.footer) {
           jqFooter.append(parameters.footer);
        }
        
                
        // Default button selection
        // Override any previous dialogue that bound itself
        if( Dialogue.keypressBoundFunction ) {
            $("body").unbind("keyup", Dialogue.keypressBoundFunction);
        }
        $("body").bind("keyup", keypressEventHandler);
        Dialogue.keypressBoundFunction = keypressEventHandler
        
        
        sizeToFit();
    }
    
    var close = function(buildingNewDialogue) {
        if( !closing ) {
            $("body").unbind("keyup", keypressEventHandler);
            if( Dialogue.keypressBoundFunction === keypressEventHandler ) {
                Dialogue.keypressBoundFunction = null;
            }
            
            jqAbsorber.remove();
            jqDialogue.css("pointer-events", "none")
                      .animate({
                          "opacity": 0.0
                        }, 
                        { 
                            complete: function() {
                                $(this).remove() 
                            } 
                        });
            closing = true;
        
            // no story loaded? if so, launch a splash
            if (!buildingNewDialogue && StoryModel.stitches.length == 0) {
                if (!EditorAccount.signedIn() )
                    new Splash();
                else
                    EditorMenu.createNew();
            }
            
        }
    }
    
    var sizeToFit = function() {
        if( jqContent ) {
            var containerHeight = jqContent.outerHeight();
            var buttonsHeight = jqButtons.height();
            var footerHeight = jqFooter.height();
            jqDialogue.height(containerHeight+buttonsHeight+footerHeight+10);
        }
        
        // Position in centre of screen
        jqDialogue.css({
            left: 0.5*jqWindow.width() - 0.5*jqDialogue.width(),
            top: 0.5*jqWindow.height() - 0.5*jqDialogue.height()
        });
        
    }
    
    var insertField = function(jqField) {
        
        if( !jqFields ) {
            jqFields = $('<div class="fields"></div>');
            jqContent.append(jqFields);
        }
        
        jqFields.append(jqField);
        
        sizeToFit();
    }
    
    var publicFieldObject = function(jqField) {
        return {
            
            // Function that can be used to set or get a field's value
            value: function(setVal) {
                if( setVal === undefined ) {
                    return jqField.find("input").val();
                } else {
                    jqField.find("input").val(setVal);
                }
            },
            
            $:   jqField,
            focus:  function() { jqField.find("input").focus(); },
            select: function() { jqField.find("input").select(); }
            
        };
    }
    
    // Note: dodgy "span" around the input box appears to need to be there - and have a 
    // class - to avoid IE crashing when the user types. Various other permutations didn't
    // appear to resolve the issue, so edit with caution!
    
    var addField = function(fieldName) {
        var jqField;
        if( fieldName ) {
            jqField = $('<div class="field"><div id="label">'+fieldName+':</div><span class="A"><input type="text" label="'+fieldName+'"/></span></div>');
        }
        else {
            jqField = $('<div class="field"><span class="A"><input type="text"/></span></div>');
        }
        insertField(jqField);
        return publicFieldObject(jqField);
    }
    
    var addSecureField = function(fieldName) {
        var jqField = $('<div class="field"><div id="label">'+fieldName+':</div><span class="A"><input type="password" label="'+fieldName+'"></span></div>');
        insertField(jqField);
        return publicFieldObject(jqField);
    }
    
    var addContent = function(textToAdd) {
        var jqNewParagraph = $("<p></p>");
        jqNewParagraph.append(textToAdd);
        jqContent.append(jqNewParagraph);
        sizeToFit();
        return jqNewParagraph;
    }
    
    var setMessage = function(messageText) {
        // Remove any existing message, and add a new one
        jqContent.find(".message").remove();
        addContent('<div class="message">'+messageText+'</div>');
    }
    
    var addButton = function(buttonName, buttonCallback) {
        
        buttonName = buttonName || "";
        buttonCallback = buttonCallback || close;
        
        var jqButton = $('<div class="button">'+buttonName+'</div>');        
        jqButtons.append(jqButton);
        
        var makeClickable = function(clickable) { 
            
            // Remove any previous binding (avoid creating duplicates)
            jqButton.unbind("click tap");
            
            if( clickable ) {
                jqButton.bind("click tap", function() {
                    buttonCallback.apply(publicButton);
                });
            }
        }
        
        var publicButton = {
            disable: function() {
                jqButton.addClass("disabled");
                makeClickable(false);
            },
            enable: function() {
                jqButton.removeClass("disabled");
                makeClickable(true);
            },
            
            $:   jqButton
        }
        
        makeClickable(true);
        
        return publicButton;
    }
    
    // Create, then return the public object
    create();
    
    publicObject = {
        addField:       addField,
        addSecureField: addSecureField,
        addButton:      addButton,
        addContent:     addContent,
        setMessage:     setMessage,
        sizeToFit:      sizeToFit,
        close:          close,
        $:              jqDialogue
    }
    return publicObject;
}

Dialogue.keypressBoundFunction = null;

// Feature 3: Dialog Centering Fix - Reposition dialogs and splash on window resize
$(window).on("resize", function() {
    $([".splash", ".dialogue"]).each(function(key, element) {
        $(element).css("top", ($(window).innerHeight() - $(element).height()) / 2);
        $(element).css("left", ($(window).innerWidth() - $(element).width()) / 2);
    });
});
