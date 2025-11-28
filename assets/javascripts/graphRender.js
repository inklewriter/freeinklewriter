var GraphModel = function(rootStitch) {

    StoryModel.updateGraphModel();

    var self = this;
    self.zoomedIn = true;
    self.zoomLevel = 3;

    // Clamp maximum font size
    var fontHeightForZoom = function(zoom) {
        zoom = Math.min(zoom, self.possibleFontHeights.length-1);
        return self.possibleFontHeights[zoom];
    };
    
    // The following stats define the default view. Zooming alters these values.
    // They are then applied *onto* the CSS
    this.nodeWidth = 200;
    this.nodeHeight = 80;
    this.possibleFontHeights = [4, 6, 7, 8];
    this.fontHeight = fontHeightForZoom(self.zoomLevel);
    this.nodePadding = 12;
    
    // a stat required by both the positioning and drawing algorithm
    this.maxRowWidth = 1;

    // the note which the user has focused in the editor    
    this.jqRootNode = null;
    
    // the main screens. GraphScreen is used throughout for placing content inside of
    this.jqGraphWindow = $("<div id='graphContainer'><div id='title'></div></div>");
    this.jqGraphScreen = $("<div class='graph'></div>");
    this.jqGraphWindow.append(this.jqGraphScreen);
    
    
    // The basic window controls - cross, zoom in and out
    this.jqDel = $("<div class='graphControl del'></div>");
    this.jqGraphWindow.append(this.jqDel);
    this.jqDel.bind("click", function() { 
        self.close();
    });


    this.jqZoomIn = $("<div class='graphControl plus'></div>");
    this.jqGraphWindow.append(this.jqZoomIn);

    this.jqZoomOut = $("<div class='graphControl minus'>-</div>");
    this.jqGraphWindow.append(this.jqZoomOut);

    this.jqZoomOut.bind("click", function() { 
        if (self.zoomLevel > 0) {
            self.zoomLevel--;
            self.nodeWidth = 0.8 * self.nodeWidth;
            self.nodeHeight = 0.8 * self.nodeHeight;
            self.nodePadding = 0.8 * self.nodePadding;
            self.fontHeight = fontHeightForZoom(self.zoomLevel);
            self.drawGraph();  
            self.scrollToFocus(true); 
        }   
    });

    this.jqZoomIn.bind("click", function() { 
        self.zoomLevel++; 
        self.nodeWidth = 1 / 0.8 * self.nodeWidth;
        self.nodeHeight = 1 / 0.8 * self.nodeHeight;
        self.nodePadding = 1 / 0.8 * self.nodePadding;
        self.fontHeight = fontHeightForZoom(self.zoomLevel);
        self.drawGraph();
        self.scrollToFocus(true);    
    });


    $("body").append("<div class='eventAbsorber'></div>");
    $("body").append(this.jqGraphWindow);

    // do the calculations. Build always ends in a Draw.
    self.buildGraph(rootStitch);
}

GraphModel.prototype.close = function() {
    this.jqGraphWindow.remove(); 
    $("body").find('.eventAbsorber').remove();
/*
    if (!EditorMenu.inPlayMode()) {
        Editor.navigateToStitch(this.editorRootStitch, this.rootStitch);
    } else {
        // TODO: allow play mode to play to a stitch as well, if we care
    }
*/
}

//------------------------------------------//

//  The spine of the graphing algorithm

//------------------------------------------//

GraphModel.prototype.buildGraph = function(rootStitch) {
    
    var self = this;

    this.jqGraphWindow.find('#title').text("Map - " + rootStitch.headerStitch().pageLabelText());
    
    // initialise data
    self.jqGraphScreen.empty();
    this.editorRootStitch = rootStitch;
    
    this.rootStitch = rootStitch;
    this.knotNum = rootStitch.pageNumber();

    this.knotStitches = [];
    this.underConstruction = [];
    this.nodes = [];
    this.arrows = [];

    // gather the node data required
    self.loadInNodes();
    
    // first stage - lay the graph nodes out using a "scattering" approach on the x-axis
    // computes correct y positioning at this stage
    // Returns the height of the graph in units
    var levelsDeep = self.roughOutGraph(rootStitch);
    
    // second stage - using relative data only on the x axis, lay out each row, one by one
    // the basic concept is that each node has a "width" and occupies a proportion of its row
    // We break this model again later, mind!
    self.renderGraphByWidthBlocks(levelsDeep);

    // third stage - find nodes which are covering arrows and see if we can shift them out of the way
    // this is [relatively] slow, but should only run on very few elements, with few iterations
    // except for super-messy graphs
    self.adjustOcclusions();

    //  Finally, draw the graph using the information gathered
    self.drawGraph();

    //  scroll the view to focus on the root stitch
    self.scrollToFocus();


}

//------------------------------------------//

//  Create the graph data structure

//------------------------------------------//

GraphModel.prototype.loadInNodes = function() {
    var self = this;
    self.underConstruction = [];
    // grab the information we need for the graph algorithm from a StoryModel stitch
    var storeStitch = function(thisStitch, preKnot) {
        
        //if (findStitchIdx(self, thisStitch) > -1) return;
        if (self.underConstruction.contains(thisStitch)) return;
        self.underConstruction.push(thisStitch);


        var linksTo = [];  
        var backLinks = [];

        var inThisKnot = self.inKnot( thisStitch);

        // with loops, sometimes nodes appear to be pre-knot when they aren't. 
        // So we check.
        if (inThisKnot) preKnot = false;
        
        var addLink = function(link, arrayName) {
            if (link) {
                arrayName.push(link);
            }
        }

        // we store links out of this stitch, if it's in our knot
        if (inThisKnot || preKnot) {
            for (var j = 0 ; j < thisStitch.options.length ; j++) {
                var newStitch = thisStitch.options[j].linkStitch();
                if (self.inKnot(newStitch) || self.inKnot(thisStitch)) {
                    addLink(newStitch, linksTo);
                    // if we're linking out the knot, grab this stitch too
                    if (newStitch && !self.inKnot(newStitch)) {
                        storeStitch(newStitch);
                    }
                }
            }
            
            if (thisStitch.divertStitch) {
                if (self.inKnot(thisStitch.divertStitch) || self.inKnot(thisStitch)) {
                    addLink(thisStitch.divertStitch, linksTo);
                    // if we're linking out the knot, grab this stitch too
                    if (!self.inKnot( thisStitch.divertStitch)) {
                        storeStitch(thisStitch.divertStitch);
                    }                        
                }
            }
        }

        if (inThisKnot) {
            for (var j = 0; j < thisStitch._backlinks.length; j++) {
          // if ( self.inKnot( thisStitch._backlinks[j]) || self.rootStitch.headerStitch() == thisStitch)   {
            // store backlinks for all stitches, but only those pointing to knot-interior nodes
               
               addLink(thisStitch._backlinks[j], backLinks);
               storeStitch(thisStitch._backlinks[j], true);
           // }
            }
        }
        
        
        var stitch = {
            "stitch": thisStitch,
            "stitchHTML" : Editor.FormattingToHTML(thisStitch.text()),
            "backLinks": backLinks.slice(0),
            "backLinksRemaining": backLinks, 
            "linksIn": backLinks.length,
            "links": linksTo,
            "totalLinkage": linksTo.length + backLinks.length,
            "x": 0,
            "xCount": 0,
            "y": 0,
            "width": 1,
            "offset": 0,
            "verticalDistance": thisStitch.verticalDistanceFromHeader(),
            "considered": false,
            "inThisKnot": inThisKnot,
            "preKnot": preKnot,
            "traceLinks": inThisKnot || preKnot,
            "label": !inThisKnot || !thisStitch.verticalDistanceFromHeader() ? thisStitch.headerStitch().pageLabelText() : ""
        }
        self.knotStitches.push(stitch);
    }

    // we only process a subset of stitches
    for (var i = 0 ; i < self.rootStitch.headerStitch()._backlinks.length ; i++) {
        storeStitch(self.rootStitch.headerStitch()._backlinks[i], true);
    }

    for (var i = 0; i < self.rootStitch.headerStitch().sectionStitches.length ; i++) {
        storeStitch(self.rootStitch.headerStitch().sectionStitches[i]);
    }
}


//------------------------------------------//

//  Data Structure Utility Functions

//------------------------------------------//

// is this stitch in the knot which the graph is for?
GraphModel.prototype.inKnot = function(stitch) { 
    if (!stitch) return false;
    return (stitch.pageNumber() === this.knotNum);
}

// Given a real stitch, find its index in the knotStitches list
// ie. transform from StoryModel -> graphing data
var findStitchIdx = function(graph, findStitch) {
    for (var k = 0; k < graph.knotStitches.length ; k++ ) {
        if ( graph.knotStitches[k].stitch == findStitch ) {
            return k;
        }
    }
    return -1;
}

GraphModel.prototype.getStitch = function(stitch) {  
    var k = findStitchIdx(this, stitch);
    if (k === -1) {
        return null;
    }
    return this.knotStitches[k];
}


//------------------------------------------//

//  Graph layout functions

//------------------------------------------//

GraphModel.prototype.adjustGraphMargins = function () {
    var self = this;
    var leftMargin = self.maxRowWidth; 
    var rightMargin = 0;
    for (var i = 0 ; i < self.knotStitches.length ; i++ ) {
        var xVal = self.knotStitches[i].x;
        leftMargin = Math.min(xVal - 1/2, leftMargin);
        rightMargin = Math.max(xVal + 1/2, rightMargin);
    }
    
    // Transform x values from (leftMargin, rightMargin) to (0, self.maxRowWidth)
    for (var i = 0 ; i < self.knotStitches.length ; i++ ) {
        self.knotStitches[i].x += (-leftMargin);
    }
    for (var i = 0; i < self.rows.length ; i++ ) {
        self.rows[i].rowLeft  += (-leftMargin);
        self.rows[i].rowRight += (-leftMargin);
    }
    
    self.maxRowWidth = rightMargin + (-leftMargin);
}

GraphModel.prototype.calculateHardLimitsOnNode = function(thisNode, allowPastMargins) {  
    var self = this;
    var hardLeft = allowPastMargins ? -0.5 : 0; 
    var hardRight = allowPastMargins ? self.maxRowWidth + 0.5 : self.maxRowWidth; 

    for (var i = 0; i < self.rows.length ; i++ ) {
        if (self.rows[i].y == thisNode.y) {
            rowNum = i;
            break;
        }
    }

    for (var k = 0; k < self.rows[rowNum].rowNodes.length ; k++ ) {
        var otherStitch = self.rows[rowNum].rowNodes[k];
        if (otherStitch !== thisNode) {
            var myRight = otherStitch.x + 1 / 2;
            var myLeft  = otherStitch.x - 1 / 2;
            if (myRight > hardLeft && myRight <= thisNode.x - 1 / 2) {
                hardLeft = myRight;
            }
            if (myLeft < hardRight && myLeft >= thisNode.x + 1 / 2) {
                hardRight = myLeft;
            }
        }
    }
    
    return { "left": hardLeft, "right": hardRight, "width": hardRight - hardLeft };
}


//------------------------------------------//

//  Graph analysis functions 

//------------------------------------------//

    
var doesStitchBlockLink = function(thisStitch, fromStitch, toStitch) {
     var gradFromToThis = (fromStitch.y - thisStitch.y) / (fromStitch.x - thisStitch.x); 
     var gradFromToTo = (fromStitch.y - toStitch.y) / (fromStitch.x - toStitch.x);
     return (gradFromToThis === gradFromToTo);
}

var blockScore = function(thisStitch, fromStitch, toStitch) {
    // how badly, from 0->1, does thisStitch block the link from fromStitch to toStitch?
    // 0 = completely clear; 1 = directly in-line
    var gradJoiningLine = (fromStitch.y - toStitch.y) / (fromStitch.x - toStitch.x);

    var solveLineForX = function( knownY ) {
        return ((knownY - fromStitch.y) / gradJoiningLine) + fromStitch.x;
    }
    
    return occlusionScoreFromCoordinates(thisStitch.x, solveLineForX(thisStitch.y-1/2), solveLineForX(thisStitch.y+1/2));
    

    
}

var occlusionScoreFromCoordinates = function(stitchMidPoint, intersect1, intersect2) {
    // this is horizontally-based *only*
    var leftBoundary = stitchMidPoint - 0.6; // 0.6 to create "padding" around stitches
    var rightBoundary = stitchMidPoint + 0.6;    
    if (intersect1 > intersect2) {
        var passing = intersect2; intersect2 = intersect1; intersect1 = passing;
    }
    
    var differenceInDistanceToBoundaries = Math.abs( Math.max((intersect1 - leftBoundary),0) - Math.max((rightBoundary - intersect2),0) );
    
    var occlusion = Math.max(1 - differenceInDistanceToBoundaries, 0);

    return occlusion;
}

GraphModel.prototype.occlusionOfStitches = function(stitchA, stitchB) {
        var self = this;
        if (stitchA.y > stitchB.y) {
            var passing = stitchA; stitchA = stitchB; stitchB = passing;
        }
        // if on adjacent rows, they can't be blocked
        if (stitchB.y - stitchA.y == 1) 
            return 1;
            
        var worstBlock = 0;
            
        for (var k = 0 ; k < self.rows.length ; k++) {
            //  require blocking stitch to lie in between
            if (self.rows[k].y > stitchA.y && self.rows[k].y < stitchB.y) {
                for (var m = 0;  m < self.rows[k].rowNodes.length ; m++) {
                    var thisBlock = blockScore(self.rows[k].rowNodes[m], stitchA, stitchB);
                    if (thisBlock > worstBlock) {
                        // we found an obfuscator!
                        worstBlock = thisBlock;
                    }
                }
            }
        }
        return worstBlock;
    }
    
GraphModel.prototype.occlusionCausedByStitch = function(thisStitch) {
        // does this stitch x/y block a connection between two other stitches.
        var self = this;
        var occlusionTotal = 0;

        for (var i = 0 ; i < self.knotStitches.length ; i++) {
            if (self.knotStitches[i] != thisStitch) {
                var fromStitch = self.knotStitches[i];
    // we don't protect against up-graph links, since they're rare - no reason, but they are rare
                if (fromStitch.y < thisStitch.y) 
                {
                    for (var j = 0; j < fromStitch.links.length; j++) {
                        var toStitch = self.getStitch(fromStitch.links[j]);
                        if (toStitch.y > thisStitch.y) {
                            occlusionTotal += blockScore(thisStitch, fromStitch, toStitch);
                        }
                    }
                }
            }
        }
        return occlusionTotal;
    }



//------------------------------------------//

//  Pass 1: use the link structure to distribute the graph nodes
//  This is a bit like laying cards out on a table
//  The x-scale is entirely based on averages and provides ordering info only

//------------------------------------------//

GraphModel.prototype.roughOutGraph = function(rootStitch) {

    var self = this;
    
    //  The sorting algorithm is key; we must hunt through the list in a sensible fashion to
    //  get the vertical order correct
    
    var resortStitches = function() {
        self.knotStitches.sort(function(a,b) {
            // return -ve <=> a < b

            // if this isn't a stitch we're going to map the links of, push to the back
            if (!a.traceLinks || !b.traceLinks)
            {
                // push a to the back
                if (!a.traceLinks)
                   return 1;
                // push b to the back
                return -1;
            }

            // if this is a stitch we've already mapped, push to the back
            if (a.considered !== b.considered) {
                if (a.considered) return 1;
                return -1;
            }

            // if this is pre the top stitch in this knot, pull forward
            if (a.preKnot)
            // pull a forward
                return -1;
            if (b.preKnot)
            // pull b forward
                return 1;

            // if this is the top stitch in this knot, pull forward
            if (a.verticalDistance == 0 && a.inThisKnot)
            // pull a forward
                return -1;
            if (b.verticalDistance == 0 && b.inThisKnot)
            // pull b forward
                return 1;                

// backlinks of zero wins
// if both zero, lowest vd wins


            if (a.backLinksRemaining.length == 0 || b.backLinksRemaining.length == 0) {
                if (a.backLinksRemaining.length == 0 && b.backLinksRemaining.length == 0)
                    return a.verticalDistance - b.verticalDistance;
                if (a.backLinksRemaining.length == 0)
                    return -1;
                return 1;
            }

// if backlinks > 0, then lowest vd is used but relative backlinkyness is *not* important
// (counter-intuitive, but this would lead to us putting hubs below their spokes.)
// Potentially could then use stitches with fewest reverse-direction backlinks

            return a.verticalDistance - b.verticalDistance;
        });
    }
    
    
    var maxY = -1;
    
    resortStitches();
    
    var stitchIdx = 0;
    
    // The main loop: sort, process, resort, process, until everything has been processed.
    
    while (stitchIdx < this.knotStitches.length && !this.knotStitches[stitchIdx].considered) {
        // resort the stack if we're out of used up stitches
        if (this.knotStitches[stitchIdx].backLinksRemaining.length > 0) {
            resortStitches();
            stitchIdx = 0;
        }
        var thisStitchUnit = this.knotStitches[stitchIdx];
        
        thisStitchUnit.considered = true;
        
        if ( thisStitchUnit.traceLinks ) {

            for(var j =0; j < thisStitchUnit.links.length ; j++) {
                // locate the linked-to stitch in the pile
                var toStitch = self.getStitch(thisStitchUnit.links[j]);
                
                if (!toStitch.considered) {
                
                    toStitch.y = Math.max(toStitch.y, thisStitchUnit.y + 1);
                    
                    if (toStitch.y > maxY) 
                        maxY = toStitch.y;
                    
                    toStitch.x += thisStitchUnit.x;
                    var sf = 1 / (thisStitchUnit.y + 1);
                    var nudgeStep = 1 / (thisStitchUnit.links.length);
                    var nudgeCount = j - ((thisStitchUnit.links.length - 1) / 2); 
                        // eg 0/1 -> 0, 0/2 -> -0.5, 1/2 -> +0.5
                    var nudge = sf * nudgeStep * nudgeCount;
                    toStitch.x += nudge;
                    
                    toStitch.backLinksRemaining.remove(thisStitchUnit.stitch);
                }
            }
        }
    
        stitchIdx++;
    }
    
    // finally, compute the average value for the x coordinate, as so far we've just collected up scores
    
    for (var i = 0 ; i < this.knotStitches.length ; i++ ) {
        if ( this.knotStitches[i].linksIn > 0 )
            this.knotStitches[i].x = this.knotStitches[i].x / this.knotStitches[i].linksIn;
    }        

    // return the height of the graph
    return maxY;
}



//------------------------------------------//

//  Pass 2: lay out the nodes neatly on the x-axis

//------------------------------------------//

GraphModel.prototype.renderGraphByWidthBlocks = function(maxY) {
    var self = this;
    self.rows = [];    
    self.maxRowWidth = -1;

// Some useful functions for the various layout algorithms

    

    // return the limits either side of this node which cannot be gone past    


// 1) Sort by y (lowest to highest - down) then number of links (from highest to lowest)
    this.knotStitches.sort( function(a,b) {     // -ve favours a
        if (a.y != b.y) return (a.y - b.y);
        return -(a.totalLinkage - b.totalLinkage);
    });
    
// 2) Fill up the rows array
    for (var i = 0 ; i < this.knotStitches.length ; i++ ) {
        var thisStitch = this.knotStitches[i];
        var lastRow = self.rows.last();
        if (!lastRow || lastRow.y != thisStitch.y) {
            self.rows.push({});
            lastRow = self.rows.last();
            lastRow.y = thisStitch.y;
            lastRow.rowNodes = [];
            lastRow.rowScore = 0;
        }
        lastRow.rowNodes.push(thisStitch);
        if (lastRow.rowNodes.length > self.maxRowWidth) 
            self.maxRowWidth = lastRow.rowNodes.length;
            
    }
    
// 3) Calculate points available on each row : Max Row Width - This Row Width
    for (var i = 0; i < self.rows.length ; i++ ) {
        var thisRow = self.rows[i];
// 4) Allocate points. Each node gets max(min(linkage - 2, row points remaining), 0). Row points reduced by this val
            
        var totalRowLinkyness = 0;    
        // start with mental values, the wrong way around
        thisRow.rowLeft = self.maxRowWidth;
        thisRow.rowRight = 0;
        for (var j = 0 ; j < thisRow.rowNodes.length; j++ ) {
            var thisNode = thisRow.rowNodes[j];

            totalRowLinkyness += thisNode.totalLinkage;
            
            // find the min and max width of backlinked items of this node
            for (var k = 0; k < thisNode.backLinks.length ; k++) {
                var backLinkedNode = this.getStitch(thisNode.backLinks[k]);
                if (backLinkedNode.x - backLinkedNode.width / 2 < thisRow.rowLeft)
                    thisRow.rowLeft = backLinkedNode.x - backLinkedNode.width / 2;
                if (backLinkedNode.x + backLinkedNode.width / 2 > thisRow.rowRight)
                    thisRow.rowRight = backLinkedNode.x + backLinkedNode.width / 2;
            }       
        }
        
        if (thisRow.rowRight < thisRow.rowLeft) {
            thisRow.rowLeft = self.maxRowWidth / 2 - 1/2;
            thisRow.rowRight = self.maxRowWidth / 2 + 1/2;
        }
   

        if (thisRow.rowRight - thisRow.rowLeft < thisRow.rowNodes.length) {
            // if we're expanding on the previous row, all nodes get width 1 (the default)
            // and we simply center this section.

            // find the new row boundaries
            thisRow.rowLeft -= (thisRow.rowNodes.length - (thisRow.rowRight - thisRow.rowLeft))/2;
            thisRow.rowRight += (thisRow.rowNodes.length + (thisRow.rowRight - thisRow.rowLeft))/2;
            //    xxxx111xxx
            //    11111
            // -> xxx11111xx
        } else {
        
            // the row score is how much width we have left to allocate. All nodes get 1 automatically
            thisRow.rowScore = thisRow.rowRight - thisRow.rowLeft - thisRow.rowNodes.length; 
            
            for (var j = 0 ; j < thisRow.rowNodes.length; j++ ) {
                var thisNode = thisRow.rowNodes[j];
                    
                var pointAllocated = 0;

                // allocate points based on the percentage of the row's linkyness this node represents
                if (totalRowLinkyness > 0)
                    pointAllocated = Math.max(thisRow.rowScore * thisNode.totalLinkage / totalRowLinkyness, 0);

                thisNode.width += pointAllocated;
                thisRow.rowScore -= pointAllocated;
            }
        }
        
// 5) Resort increasing y / increasing x    
// 6) on each row xVal = 0. node.x = width/2 + xVal; xVal += width . x has become the center value

        thisRow.rowNodes.sort( function(a,b) {
            return (a.x - b.x);
        });
        
        var xVal = thisRow.rowLeft;     
        
        for (var j = 0; j < thisRow.rowNodes.length ; j++ ) {
             var thisNode = thisRow.rowNodes[j];
             thisNode.x = thisNode.width / 2 + xVal;  
             xVal +=  thisNode.width;
        }
        
    }

    // fix any overflow
    self.adjustGraphMargins();

//  For testing, we sometimes want to draw the results at this stage.  
//    self.drawGraph();

/*

    STAGE 2: Bulk out the tree by going back upwards, and trying to square elements up with the things *below* them in the graph.
    
    This is a visual-based pass. From here on we forget the width stat entirely, and work with blocks of 1 unit wide, as they appear.
    

*/

    self.rows.sort( function(a,b) {  // - ve favours a
        // order descending-y, from highest to lowst
        return -(a.y - b.y);
    });

    for (var i = 0 ; i < self.rows.length ; i++ ) {
    
        // sort by distance from the spine (descending)
        self.rows[i].rowNodes.sort( function(a,b) {
            return -(Math.abs(a.x -  (self.maxRowWidth / 2)) - Math.abs(b.x - (self.maxRowWidth / 2)));
        });

        for (var j = 0 ; j < self.rows[i].rowNodes.length; j++ ) {
            var thisNode = self.rows[i].rowNodes[j];
    
            var minPrevious = self.maxRowWidth;
            var maxPrevious = 0;
            
            // find the min and max width of linked items of ONLY this node
            for (var k = 0; k < thisNode.links.length ; k++) {
                var linkedNode = this.getStitch(thisNode.links[k]);
                if (linkedNode.x - 1 / 2 < minPrevious)
                    minPrevious = linkedNode.x - 1 / 2;
                if (linkedNode.x + 1 / 2 > maxPrevious)
                    maxPrevious = linkedNode.x + 1 / 2;
            }       
        
            if (maxPrevious < minPrevious) {
                maxPrevious = self.rows[i].rowRight;
                minPrevious = self.rows[i].rowLeft;
            }

// we found some links (so we're not on the bottom row)
// 1) bring in sides which clash with previously set elements
//      note, whether we're editing max or min depends on the side of the middle we are
//      we treat center as left (shouldn't matter)
                
            hardLimits = self.calculateHardLimitsOnNode(thisNode);

                
// Can we bring in rows[i].rowLeft and rows[i].rowRight? 
// These are the left/rights of *everything* on this row
// Only apply if they're "interesting" - ie, on the wrong sides of the graph

                if (self.rows[i].rowLeft >= self.maxRowWidth / 2) // on the right hand side of the graph
                    // is the row boundary more interesting than the hard? Does it cause no overlap on the right?
                    if (self.rows[i].rowLeft > hardLimits.left && self.rows[i].rowLeft + 1 <= hardLimits.right) 
                        hardLimits.left = self.rows[i].rowLeft;
                
                if (self.rows[i].rowRight <= self.maxRowWidth / 2)  // on the left hand side of the graph
                    // is the row boundary more interesting than the hard? Does it cause no overlap on the left?
                    if (self.rows[i].rowRight < hardLimits.right && self.rows[i].rowRight - 1 >= hardLimits.left) 
                        hardLimits.right = self.rows[i].rowRight;

// Only three cases, but it's useful to lay out the possibilites to see what's going on.

// HL minP maxP HR ==> NP + XP / 2

// minP HL maxP HR ==> HL + 1 / 2
// minP maxP HL HR ==> HL + 1 / 2

// HL HR minP maxP ==> HR - 1 / 2
// HL minP HR maxP ==> HR - 1 / 2


                if (minPrevious < hardLimits.left) {
                    thisNode.x = hardLimits.left + 1/2; 
                } else if (maxPrevious > hardLimits.right) {
                    thisNode.x = hardLimits.right - 1/2;
                } else {
                    thisNode.x = (minPrevious + maxPrevious) / 2;
                }
                
            }  
  
//Testing draw point  
//        self.drawGraph();
    }
    
    self.adjustGraphMargins();

    self.adjustOcclusions();

}


/*------------------------------------------------------------------

    Pass 3 - find occlusions, and gently peel them apart.
    
    Ideally, this step should be able to "insert" columns in the graph, which it can't.

    Also, it could watch for crossing-over arrows, which at the moment it ignores.

------------------------------------------------------------------*/

//------------------------------------------------------------------------------//
//  Handle occlusion by moving occluding nodes out of the way
//------------------------------------------------------------------------------//

GraphModel.prototype.adjustOcclusions = function() {

    var self = this;
    // Does a stitch occlude a link? If so, shift it around

/*

    STAGE 3: Many graphs are now done to satisfaction, however, some may have connections that
    are hidden by overlapping connections. eg. A->B, C; B->C produces a vertical column of width 1
    in which the A->C connection is invisible.
    
    At stage 3, we loop over all nodes, looking to see if they occlude things. If so, we try to move them by the minimum amount to improve occlusion. 
    
    This is a "do no harm" algorithm, as it should never cause cross connections or large topological changes. It may be a little slow as it searches for collisions by considering all the nodes, so it's O(n^2).
    
    Finally, we iterate this step up to 7 times if necessary, in case widening the margins on step 1 provides somewhere for a node to go in step 2. This is way overkill and will very, very rarely be useful.
    
*/
    var changedSomething = true;
    var MaxIterationsAllowed = 4;
    var iterationCount = 0;
    
    while(changedSomething && iterationCount < MaxIterationsAllowed) {
        changedSomething = false;
        iterationCount++;
        
        for (var i = 0 ; i < this.knotStitches.length ; i++ ) {
            var thisStitch = this.knotStitches[i];
            var occlusion = self.occlusionCausedByStitch(thisStitch);
            
            if (occlusion > 0) {

                 var displacement = 0;
                 
                 var hardLimits = self.calculateHardLimitsOnNode(thisStitch, true);
                 
                 var ghostStitch = { 
                    "y": this.knotStitches[i].y, 
                    "bestX": null
                };
                
                 for (ghostStitch.x = hardLimits.left + 0.5; ghostStitch.x <= hardLimits.right - 0.5 ; ghostStitch.x += 0.25) {                     
                    var ghostOcclusion = self.occlusionCausedByStitch(ghostStitch);
                    var ghostDisplacement = Math.abs(ghostStitch.x - thisStitch.x);
                    
                    if ( ghostOcclusion < occlusion || 
                         (ghostOcclusion == occlusion && ghostDisplacement < displacement) )  {
                        ghostStitch.bestX = ghostStitch.x;
                        occlusion = ghostOcclusion;
                        displacement = ghostDisplacement;
                    }
                                
                 }
                 if (ghostStitch.bestX !== null) {                                                 
                    thisStitch.x = ghostStitch.bestX;
                    changedSomething = true;                         
                 }
    // Testing draw command
                        if (changedSomething) {
                            self.drawGraph();
                        }
                        

            }
        }

        // fix any over-writing into the margins before we iterate again
        self.adjustGraphMargins();  
    
    }
        


}

//------------------------------------------------------------------------------//
//  Deprecated method - handle occlusion by moving linked stitches out of the way
//------------------------------------------------------------------------------//

GraphModel.prototype.adjustOcclusionsViaLinks = function() {

    var self = this;
    // Can stitchA see stitchB without another stitch getting in the way?
    // done via a comparison of line segment gradients. Not brilliant, but will do for now.
   

/*

    STAGE 3: Many graphs are now done to satisfaction, however, some may have connections that
    are hidden by overlapping connections. eg. A->B, C; B->C produces a vertical column of width 1
    in which the A->C connection is invisible.
    
    At stage 3, we loop over all connections looking for invisibility between nodes.
    If found, we compute limits within which each node can be adjusted, including allowing them to 
    go over the margins of the graph. We then slide them left and right until we find a position from which they can see their linked node, but without obscuring another node's view. This is kinda slow, but infrequent.
    
    We choose a destination using a scoring system. 
        A position's score = 
                              ( displacement of first node  ) ^ 2 
                            + ( displacement of second node ) ^ 2  
                            + ( distance between nodes * 2  ) ^ 2
    
    with the lowest score being best. (Note, we emphasise distance between to create verticals, if poss.)
    
    If no viable position exists, we simply move on.
    
    This is a "do no harm" algorithm, as it should never cause cross connections or large topological changes. It may be a little slow as it searches for collisions by considering all the nodes, so it's O(n^2).
    
    Finally, we iterate this step up to 7 times if necessary, in case widening the margins on step 1 provides somewhere for a node to go in step 2. This is way overkill and will very, very rarely be useful.
    
*/
    var changedSomething = true;
    var iterationCount = 0;
    
    while(changedSomething && iterationCount < 8) {
        changedSomething = false;
        iterationCount++;
        
        for (var i = 0 ; i < this.knotStitches.length ; i++ ) {
            if ( this.knotStitches[i].links.length > 1 ) {
                
                for (var j = 0 ; j < this.knotStitches[i].links.length ; j++ ) {
                    var toStitch = this.getStitch(this.knotStitches[i].links[j]);
                    var occlusion = self.occlusionOfStitches(this.knotStitches[i], toStitch);
                    
                    if (occlusion == 1 ) {

                         var posFound = false;
                         
                         var topHardLimits = self.calculateHardLimitsOnNode(this.knotStitches[i], true);
                         var bottomHardLimits = self.calculateHardLimitsOnNode(toStitch, true);
                         
                         var ghostTopStitch = { 
                            "y": this.knotStitches[i].y, 
                            "bestX": null
                        };
                         var ghostBottomStitch = { 
                            "y": toStitch.y, 
                            "bestX": null
                        };

                        var bestScore = 10000; 

                         
                         // find somewhere they can both be
                         for (ghostTopStitch.x = topHardLimits.right - 0.5; ghostTopStitch.x >= topHardLimits.left + 0.5 ; ghostTopStitch.x-=0.5) {                     
                            for (ghostBottomStitch.x = bottomHardLimits.right - 0.5 ; ghostBottomStitch.x >=  bottomHardLimits.left + 0.5  ; ghostBottomStitch.x-=0.5) {   
                            
                                if (self.occlusionOfStitches(ghostTopStitch, ghostBottomStitch) == 0
                                 && self.occlusionCausedByStitch(ghostTopStitch) == 0
                                 && self.occlusionCausedByStitch(ghostBottomStitch) == 0
                                ) {
                                
                                    // compute score, calc if new best
                                    var thisScore = Math.pow(toStitch.x - ghostBottomStitch.x, 2) + 
                                                    Math.pow(this.knotStitches[i].x - ghostTopStitch.x, 2) +
                                                    Math.pow(2*(ghostTopStitch.x - ghostBottomStitch.x), 2);

                                    
                                    if (thisScore < bestScore) {
                                        ghostTopStitch.bestX = ghostTopStitch.x;
                                        ghostBottomStitch.bestX = ghostBottomStitch.x;
                                        bestScore = thisScore;
                                    }
                                }
                                
                                
                            }
                         }
                         if (ghostTopStitch.bestX !== null) {                                                 
                            this.knotStitches[i].x = ghostTopStitch.bestX;
                            toStitch.x = ghostBottomStitch.bestX;
                            posFound = true;
                            changedSomething = true;                         
                         }
    // Testing draw command
 /*                       if (changedSomething) {
                            self.drawGraph();
                        }
*/                        
                    }
                }
                
            }
        }

    // fix any over-writing into the margins
        self.adjustGraphMargins();  
    
    }
        


}



//------------------------------------------------------------------------------//
//
//  DRAW THE GRAPH 
//
//------------------------------------------------------------------------------//

//------------------------------------------------------------------------------//
//  Convert unit-space coordinates to the screen space
//  Create graph nodes 
//------------------------------------------------------------------------------//


var stitchLink = function(fromStitch, toStitch) {
    return Editor.stitchGoesToStitch(fromStitch.stitch, toStitch.stitch);
};

var stitchInFlow = function(stitch) {
    return Editor.stitchBoxContainingStitch(stitch);
};

GraphModel.prototype.drawGraph = function() {
    var self = this;
    self.jqGraphScreen.empty();

// (x,y) is now a coordinate in unit space (0 -> self.maxRowWidth, 0 -> maxY) 
// each box has a width / height of 1
// we think of (x,y) as mid/top of each node

    var halfWidth = ( self.nodeWidth + 2 * self.nodePadding ) / 2; // of a node; 
    var halfHeight = ( self.nodeHeight + 2 * self.nodePadding ) / 2; // of a node; 
        
    // these values we can choose as we like.        
    var xScale = 1.1;
    var yScale = 1.15;

    // y margin is constant because we always top-align the graph
    var marginY = 120;
    
    // x margin is variable as either we center the graph, or we use 20 
    var midX = self.jqGraphScreen.width() / 2;
    var marginX = midX - (self.maxRowWidth / 2 + 0.5) * xScale * 2 * halfWidth + halfWidth;
    if (marginX < 20) marginX = 20;
    
    // draw nodes
    for (var i = 0 ; i < this.knotStitches.length ; i++ ) {

        // compute actual coordinates
        this.knotStitches[i].plotY = this.knotStitches[i].y * yScale * 2 * halfHeight + marginY + halfHeight;
        this.knotStitches[i].plotX = this.knotStitches[i].x * xScale * 2 * halfWidth + marginX;
        
        // create a node at these coordinates
        this.nodes.push(new GraphNode(this, i, halfHeight, halfWidth) );        
        this.jqGraphScreen.append(this.nodes.last().jqStitchNode);
    }        
    
    // Draw the arrows
    // an arrow is a div of class "arrow"
    // rotated by rotate(jqArrow, angle) (about center of div?)

    // There are extra classes for arrows "going outside the knot", "going up" or "joining not choices"
    // but mostly this info isn't used at present.

    this.arrows = [];

    for (var i = 0; i < this.knotStitches.length ; i++ ) {        
        var fromStitch = this.knotStitches[i];
        var diverting = fromStitch.stitch.divertStitch;

        var x1 = fromStitch.plotX; 
        var y1 = fromStitch.plotY;

        for (var j = 0 ; j < this.knotStitches[i].links.length ; j++ ) {
            var toStitch = this.getStitch(fromStitch.links[j]);
            
            var x2 = toStitch.plotX;
            var y2 = toStitch.plotY;
            
            jqArrow = $('<div class="arrow"></div>');
            if ( !toStitch.inThisKnot )
                jqArrow.addClass("externalType");
            else if (diverting) 
                jqArrow.addClass("divertType");

            if (stitchLink(fromStitch, toStitch)) {
                jqArrow.addClass("travelled");
            }

            if ( y2 < y1 ) {
                if (x2 > self.jqGraphScreen.width()/2) {
                    x1 += halfWidth/2;
                    x2 += halfWidth/2;
                } else {
                    x1 -= halfWidth/2;
                    x2 -= halfWidth/2;
                }
                jqArrow.addClass("goingUp");
            }

            if (!diverting) {
                // find the option text and insert as a tooltip
                for (var k = 0 ; k < fromStitch.stitch.options.length ; k++ ) {
                    if (fromStitch.stitch.options[k].linkStitch() == toStitch.stitch) {
                        jqArrow.attr("tooltip", fromStitch.stitch.options[k].text());
                        break;
                    }
                }
                
            }
    
            var arrowLength = Math.sqrt( Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) );
            jqArrow.css("width", arrowLength);
            jqArrow.css("top", ( (y1 + y2) / 2 - jqArrow.height()/2 ));
            jqArrow.css("left", ( (x1 + x2) / 2 - arrowLength/2 ) );
            rotate(jqArrow, Math.atan2((y1 - y2), (x1 - x2)));
            this.jqGraphScreen.append(jqArrow);        
            
            this.arrows.push({
                fromStitch: fromStitch,
                toStitch: toStitch,
                jqArrow: jqArrow
            });

        }
    }
    
}


//------------------------------------------------------------------------------//
//  Scroll to a given node
//------------------------------------------------------------------------------//

GraphModel.prototype.scrollToFocus = function(jumpCut) {
    var lookAt = $(".focusStitch");
    if (lookAt.length == 0) {
        lookAt = $(".selected");
    }
    if (lookAt.length > 0) {
        var leftPos = lookAt.position().left + this.nodeWidth / 2 + this.jqGraphScreen.scrollLeft() - this.jqGraphScreen.width()/2;
        var topPos = lookAt.position().top + this.nodeHeight / 2 + this.jqGraphScreen.scrollTop() - this.jqGraphScreen.height()/2;
        var time = 1000;
        if (jumpCut) time = 0;
        this.jqGraphScreen.animate( { 
            "scrollLeft": leftPos ,
            "scrollTop": topPos 
        }, time);
    }
}

//------------------------------------------------------------------------------//
//  The Graph Node object
//------------------------------------------------------------------------------//
        
var GraphNode = function(parentGraph, knotIdx, halfHeight, halfWidth) {
    var self = this;
    var stitch = parentGraph.knotStitches[knotIdx];
    
    this.stitch = stitch;
    
    this.jqStitchNode = $('<div class="node">' + stitch.stitchHTML + '</div>');

    // apply style data based on the zoom level
    this.jqStitchNode.css("width", parentGraph.nodeWidth);
    this.jqStitchNode.css("height", parentGraph.nodeHeight);
    this.jqStitchNode.css("top", stitch.plotY - halfHeight);
    this.jqStitchNode.css("left", stitch.plotX - halfWidth);
    this.jqStitchNode.css("padding", parentGraph.nodePadding);
    this.jqStitchNode.css("font-size", Math.round(parentGraph.fontHeight) + "pt");

    // add the stats label
    var statsLabel = Editor.statsLabelForStitch(stitch.stitch, true);
    if (statsLabel.text()) {
        
        this.jqStitchNode.append('<div class="stats"><span class="important"></span></div>');
        this.jqStitchNode.find('.important').append(statsLabel);
    }  
    
    statsLabel.css("font-size", Math.round(parentGraph.fontHeight)-1 + "pt");
    
    // apply additional css if the knot is not in the currect section
    if ( !stitch.inThisKnot ) {
        if (stitch.preKnot)
            this.jqStitchNode.addClass("prenode");
        else
            this.jqStitchNode.addClass("postnode");
        this.jqStitchNode.attr("tooltip", "Proceed to this section");
    }

    if (stitch.label) {
        this.jqStitchNode.prepend('<div class="nodeLabel">' + stitch.label + '</div>');
    }
        
    var selectStatus = function(node) {
        if (stitchInFlow(node.stitch.stitch)) {
            node.jqStitchNode.addClass("selected");
        } else {
            node.jqStitchNode.removeClass("selected");
        }
    }
  
    selectStatus(self);
        
    if (parentGraph.rootStitch == stitch.stitch && stitchInFlow(stitch.stitch)) {
        this.jqStitchNode.addClass("focusStitch");
        parentGraph.jqRootNode = this.jqStitchNode;
        
    } 

    // if you click a node, navigate here, and recolour the path
    
    var focusOn = function(node, withinKnot, stitch) {
        if (parentGraph.rootStitch == stitch && stitchInFlow(stitch))
            return;
       
        if (!withinKnot) {
            parentGraph.buildGraph(stitch);
        } else {
            Editor.navigateToStitch(stitch);
            for (var i = 0; i< parentGraph.nodes.length ; i++ ) {
                selectStatus(parentGraph.nodes[i]);  
                parentGraph.nodes[i].jqStitchNode.removeClass("focusStitch");
            }                      

            for (var k = 0; k < parentGraph.arrows.length; k++) {
                if (stitchLink(parentGraph.arrows[k].fromStitch, parentGraph.arrows[k].toStitch))
                    parentGraph.arrows[k].jqArrow.addClass("travelled");
                else
                    parentGraph.arrows[k].jqArrow.removeClass("travelled");
            }

            parentGraph.jqRootNode = node.jqStitchNode;
            node.jqStitchNode.addClass("focusStitch");
            parentGraph.rootStitch = stitch;
            parentGraph.scrollToFocus();
        }
    };
    
    // double-click to return to editor
    this.jqStitchNode.bind("dblclick", function() {
        focusOn(self, stitch.inThisKnot, stitch.stitch);
        parentGraph.close();
    });

    this.jqStitchNode.bind("click", function() {
        focusOn(self, stitch.inThisKnot, stitch.stitch);
        return false;
    });
    



}


