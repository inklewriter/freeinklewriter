function cleanWordPaste( in_word_text ) {
 var tmp = document.createElement("DIV");
 tmp.innerHTML = in_word_text;
 var newString = tmp.textContent||tmp.innerText;
 // this next piece converts line breaks into break tags
 // and removes the seemingly endless crap code
 newString  = newString.replace(/\n{2,}/g, "<br />").replace(/.*<!--.*-->/g,"").replace(/\n/g, " ");
 // this next piece removes any break tags (up to 10) at beginning
 for ( i=0; i<10; i++ ) {
  if ( newString.substr(0,6)=="<br />" ) { 
   newString = newString.replace("<br />", ""); 
  }
 }
 // fix for multiple spaces being generated..?
 newString = newString.replace(/\s{2,}/, " ");
 return newString.replace(/<br \/>\s*/g, "\n");
 
}

function getURLParameterByName(name) {
    // get parameter from the URL string
    var match = RegExp('[?&]' + name + '=([^&]*)')
                    .exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function wordCountOf(x) {
    if (x) {
        var words = x.match(/\S+/g);
        if (words) return words.length;
    }
    return 0;
}

function commadString(x) {
    // convert to a string, with commas on every thousand words
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function rotate(object, radians) {
    object.css({
  '-webkit-transform' : 'rotate('+radians+'rad)',
     '-moz-transform' : 'rotate('+radians+'rad)',  
      '-ms-transform' : 'rotate('+radians+'rad)',  
       '-o-transform' : 'rotate('+radians+'rad)',  
          'transform' : 'rotate('+radians+'rad)',  
               'zoom' : 1

    });
}

function toObject(data) {
	if (Object.prototype.toString.call(data) ==  '[object String]')
	   data = jQuery.parseJSON(data);
	return data;
}

function convertStringToBooleanIfAppropriate(pass) {
    if (pass === "true") return true;
    if (pass === "false") return false;
    return pass;
}

function createTriSymbol() {
	if (navigator.appName == 'Microsoft Internet Explorer')
		trisymbol = ">";
}

// if browser doesn't supply indexOf, we supply it instead
// from the MDN site
if (!Array.prototype.indexOf) {  
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {  
        "use strict";  
        if (this == null) {  
            throw new TypeError();  
        }  
        var t = Object(this);  
        var len = t.length >>> 0;  
        if (len === 0) {  
            return -1;  
        }  
        var n = 0;  
        if (arguments.length > 0) {  
            n = Number(arguments[1]);  
            if (n != n) { // shortcut for verifying if it's NaN  
                n = 0;  
            } else if (n != 0 && n != Infinity && n != -Infinity) {  
                n = (n > 0 || -1) * Math.floor(Math.abs(n));  
            }  
        }  
        if (n >= len) {  
            return -1;  
        }  
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);  
        for (; k < len; k++) {  
            if (k in t && t[k] === searchElement) {  
                return k;  
            }  
        }  
        return -1;  
    }  
}  


// turn off CSS-styling
function styleWithoutCss() {
	// when editing rich text box formatting, we don't
	// want to use css, we want easy-to-parse html
	// code snippet from http://stackoverflow.com/questions/536132/stylewithcss-for-ie
	try {
		document.execCommand("styleWithCSS", 0, false);
	} catch (e) {
		try {
			document.execCommand("useCSS", 0, true);
		} catch (e) {
			try {
				document.execCommand('styleWithCSS', false, false);
			}
			catch (e) {
			}
		}
	}
}

// Feature test
var hasStorage = (function() {
      try {
        localStorage.setItem("inklewriter_storage_feature_detect", "feature_test");
        localStorage.removeItem("inklewriter_storage_feature_detect");
        return true;
      } catch(e) {
        return false;
      }
}());

function topBannerHeight() {
	return $("#account_container").height() + $("#branding").height();
}

// Resizing behaviour
function sizeEditorCorrectly() { 
	$("#editor_container").height( $(window).height() - topBannerHeight() );
	$("#player_container").height( $(window).height() - topBannerHeight() );
	$("#stitch_list_scrolling").height( $("#editor_container").height() - $("#stitch_list_area .header").height() - 10 );
	
	if (Player.readOnly)
	{ 
        if ($(window).width() < 900) { 
            $('#sidebar-ads').hide();
            if ($(window).width() < 600) {
                $("#player_container").addClass("narrow");
            } else {
                $("#player_container").removeClass("narrow");
            }
        } else {
            $('#sidebar-ads').show();
            $("#player_container").removeClass("narrow");
        }
    }
	
}

var ensureVisibilityOfPopup = function(jqItem, jqParent) {

    // scroll up to show the block, if necessary (what about scrolling down similarly?)
    var hiddenPx = jqParent.scrollTop();
    var itemTop = jqItem.offset().top - jqParent.offset().top;
    var bottomPx = hiddenPx + itemTop + jqItem.height();
    var bottomWindowPx = jqParent.height() + hiddenPx;
    
    if (bottomPx > bottomWindowPx ) {
        jqParent.scrollTop( bottomPx - bottomWindowPx + hiddenPx + 20 );
    }
    
    if (itemTop < 0) {
        jqParent.scrollTop( hiddenPx + itemTop );
    }
}

Array.prototype.contains = function(element) {
    var elementIdx = this.indexOf(element);
    if( elementIdx >= 0 )
        return true;
    else
        return false;
}

Array.prototype.first = function() {
    if( this.length > 0 )
        return this[0];
    else
        return null;
}

Array.prototype.last = function() {
    if( this.length > 0 )
        return this[this.length-1];
    else
        return null;
}

Array.prototype.prev = function(element) {
    var elementIdx = this.indexOf(element);
    if( elementIdx > 0 )
        return this[elementIdx-1];
    else
        return null;
}

Array.prototype.next = function(element) {
    var elementIdx = this.indexOf(element);
    if( elementIdx < this.length-1 && elementIdx >= 0 )
        return this[elementIdx+1];
    else
        return null;
}

Array.prototype.add = function(element) {
	if (!this.contains(element))
		this.push(element);
}

Array.prototype.remove = function(element) {
    var elementIdx = this.indexOf(element);
    if( elementIdx >= 0 ) {
        this.splice(elementIdx, 1);
    }
}

Array.prototype.each = function(func) {
    // Make a copy of the array in case the function
    // that's passed does some deleting
    var arrayCopy = this.slice(0);
    for(var i=0; i<arrayCopy.length; ++i) {
        func.call(arrayCopy[i]);
    }
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

String.prototype.camelCase = function() {
    return this.replace(/[^A-Za-z\s]/g, '').replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
}

// Easy way to bind delegate functions to objects
//  - Add a bind function to your object using:
//       this.bind = new Bind(this)
//  - Then, bind functions to it outside of its
//    scope using:
//       myCar.bind("accelerate", function() { alert("Revving"); } )
//  - Provide your hook like so:
//       Car.prototype.accel = function() {
//          this.bind.handle("accelerate");
//          doStuff();       
//       }
var Bind = function(boundObj) {
	
	var handles = {};
	
	var bindFunc = function(handleName, targetFunc) {
		
		// Bind
		if( targetFunc ) {
			handles[handleName] = targetFunc;
		}
		
		// Unbind
		else {
			if( handles[handleName] ) {
				delete handles[handleName];
			}
		}

	}
	
	bindFunc.handle = function(handleName) {
		if( handles[handleName] ) {
			handles[handleName].call(boundObj);
		}
	}
	
	return bindFunc;
}


function selectElement(contentEditableElement) {
	var selection = rangy.getSelection();
	var range = rangy.createRange();
	range.selectNodeContents(contentEditableElement);
	selection.setSingleRange(range);

}

function moveCaretToStartOf(contentEditableElement) {
	var selection = rangy.getSelection();
	var range = rangy.createRange();
	range.selectNodeContents(contentEditableElement);
	range.collapse(true);

	selection.setSingleRange(range);


}

function moveCaretToEndOf(contentEditableElement) {
	var selection = rangy.getSelection();
	var range = rangy.createRange();
	range.selectNodeContents(contentEditableElement);
	range.collapse(false);

	selection.setSingleRange(range);

}


var getContentFromCursor = function(stitchBox) {
    
    var fragments = {};
    
	// split the text at the point where the cursor was, and put the second half of it into the new stitch box.
	var sel = rangy.getSelection();
	var rangeLeft = sel.getRangeAt(0);
	var rangeRight = rangeLeft.cloneRange();

	// Save the end points of the selection

	var eo = rangeLeft.endOffset; 
	var ec = rangeLeft.endContainer;
	var so = rangeLeft.startOffset; 
	var sc = rangeLeft.startContainer;

	// Select the whole stitch 
	rangeLeft.selectNodeContents(stitchBox.jqStitchBoxText[0]);
	rangeRight.selectNodeContents(stitchBox.jqStitchBoxText[0]);

	// Move the start point to end of selection
	rangeRight.setStart(ec, eo);
	
	// Move the end point to start of selection
    rangeLeft.setEnd(sc, so);
	
	// Grab HTML off the end of the stitch, removing rogue <br> tags
	fragments["left"] = (rangeLeft.toHtml()).replace('<br>', "");
	fragments["right"] = (rangeRight.toHtml()).replace('<br>', "");

	return fragments; 

}

function containsCursor(jqItem) {
	var sel = rangy.getSelection();
	if (sel.rangeCount == 0)
	{
		return false;
	}
	var range = sel.getRangeAt(0);
	var retVal = false;
	if (range.compareNode(jqItem[0]) == range.NODE_BEFORE_AND_AFTER)
		retVal = true;
	return retVal;
}

    var doesSelectionStartAtEdgeOfJqItem = function(jqItem, textRange, goLeft) {
    
        var testRange = rangy.createRange();

        testRange.selectNodeContents(jqItem[0]);
        
        // move the left-side of the test range to the cursor position left start
        if (goLeft)
            testRange.setStart(textRange.startContainer, textRange.startOffset);
            
        // or move the right-side of the test range to the cursor position right start
        else
            testRange.setEnd(textRange.endContainer, textRange.endOffset);

        // - if we still cover the full range text, far left must be true
        var retVal = (testRange.toString() == jqItem.text());
        
        return retVal;

    }


function resurrectRange(rangeInfo, startOnly) {

	var range = rangy.createRange();
	range.setStart(  rangeInfo.startContainer , rangeInfo.start);
	range.setEnd(  rangeInfo.endContainer, rangeInfo.end);	
	return range;
}

function selectText(rangeInfo) {

	var range = resurrectRange(rangeInfo);
	var sel = rangy.getSelection();
	sel.setSingleRange(range);
	
}

