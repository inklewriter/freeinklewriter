
activeTooltip = null;

var ToolTip = function( tipText, tipRootItem, event ) {

    var self = this;
    
    if (activeTooltip) activeTooltip.removeTip();
    
    activeTooltip = self;
    
    var viewport = $("#main_viewport");
    var vHeight = viewport.height();
    var vWidth = viewport.width();
    
    self.jqToolTip = $("<div id='tooltip'>" + tipText + "</div>");
    var offset = tipRootItem.offset(); 
    
    tipRootItem.after(self.jqToolTip);    
    
    self.jqToolTip.hide();
  
    var tipHeight = self.jqToolTip.height();
    var tipWidth = self.jqToolTip.width();
    
    // get coords for tip
    var vertPos =  offset.top + tipRootItem.height() + 3;
    var leftPos = event.pageX - ( tipWidth / 2 );

    // does the tip go off-screen vertically
    if (vertPos + tipHeight > vHeight - 10) {
        vertPos = vHeight - 10 - tipHeight;
        if (leftPos < vWidth / 2) {
            // shift right
            leftPos += 2*tipWidth/3;
        } else {
            // shift left
            leftPos -= 2*tipWidth/3;
        }
            
    }
    
    // does the tip go offscreen left/right?
    if (leftPos < 5) leftPos = 10;
    if (leftPos + tipWidth > vWidth - 10)
        leftPos =  vWidth - 10 - tipWidth;

    // position the tip
    self.jqToolTip.css("top",  vertPos);
    self.jqToolTip.css("left", leftPos); 
    
    this.stillRequired = true;
    
    setTimeout( function() {
        if (self.stillRequired)
            self.jqToolTip.fadeIn("slow");
    }, 500);
    
    tipRootItem.bind('mouseleave', function() { self.removeTip(); });
    tipRootItem.bind('click', function() { self.removeTip(); });
}


ToolTip.prototype.removeTip = function() {
    this.jqToolTip.fadeOut("slow").remove();
    this.stillRequired = false;
    activeTooltip = null;
    return true;
}


$('[tooltip]').live("mouseenter", function(event) {
    
    var self = $(this);
    if (self.attr("id") != "tooltip")
        var tip = new ToolTip( self.attr("tooltip"), self, event );

});
