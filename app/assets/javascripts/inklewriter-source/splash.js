var Splash = function() {
    
    var jqWindow = $(window);
    var jqAbsorber = null;
    var jqSplash = null;
    //var jqContent = null;
    var publicObject = null;
    var closing = false;
        
    
    var keypressEventHandler = function(event) {
        // Cancel all keypresses if closing the window
        if( closing ) {
            event.preventDefault();
            return false
        }
        
        // Return key
        if( event.which === 13 ) {
            
            // TODO: DO DEFAULT ACTION
        }
        
        // Escape key - try to press a cancel button
        else if ( event.which === 27 ) {
            
            // TODO: CLOSE SPLASH
        }
        
        return true;
    }
    
    var create = function() {
        
        jqAbsorber = $("<div class='eventAbsorber'></div>");
        $("body").append(jqAbsorber);
        
        jqSplash = $("<div class='splash'><div id='bg'></div> \
                            <div id='content'> \
                                <div id='header'>\
                                    <p id='welcome-message'>"+tr("Welcome to")+"</p>\
                                    <img draggable=false id='splash-logo' src='/img/splash-logo-beta.png'></img>\
                                </div> \
                                <div id='menu'>\
                                    <p style='padding-top: 10px; color: red; font-weight: bold;'>"+tr("WARNING: inklewriter is shutting down soon!")+" <a style='color: red;' href='https://www.inklestudios.com/inklewriter/shutdown'>"+tr("Read more about how and when")+"</a>.</p>\
                                    <ul>\
                                        <li><div class='button' id='tutorial'>"+tr("get started")+"</div>\
                                        <li><div class='button' id='new'>"+tr("new")+"</div></li>\
                                        <li><div class='button' id='sign-in'>"+tr("sign in")+"</div></li>\
                                    </ul>\
                                    <img draggable=false id='splash-splats' src='/img/splash-splats.png'></img>\
                                </div> \
                            </div> \
                        </div>");
        
        // Add
        $("body").append(jqSplash);
        jqSplash.focus();
        
        jqContent = jqSplash.find("#content");
        

        //jqAbsorber.click(close);
        jqSplash.find("#new").click( function() { close(); EditorMenu.createNew(); } );
        jqSplash.find("#sign-in").click(function() { close(); EditorAccount.signIn(); });
        jqSplash.find(".button#tutorial").click(function() { close(); EditorMenu.loadTutorial(); });
                
        sizeToFit();
    }
    
    var close = function() {
        if( !closing ) {
            
            jqAbsorber.remove();
            jqSplash.css("pointer-events", "none")
                      .animate({
                          "opacity": 0.0
                        }, 
                        { 
                            complete: function() {
                                $(this).remove() 
                            } 
                        });
            closing = true;
        }
    }
    
    var sizeToFit = function() {
        // if( jqContent ) {
        //     var containerHeight = jqContent.outerHeight();
        //     var buttonsHeight = jqButtons.height();
        //     jqSplash.height(containerHeight+buttonsHeight);
        // }
        // 
        // Position in centre of screen
        jqSplash.css({
            left: 0.5*jqWindow.width() - 0.5*jqSplash.width(),
            top: 0.5*jqWindow.height() - 0.5*jqSplash.height()
        });
        // 
    }
    

    
    // Create, then return the public object
    create();
    
    publicObject = {
        close:          close
    }
    return publicObject;
}
