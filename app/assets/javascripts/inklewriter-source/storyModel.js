

var StoryModel = function() {  
};

StoryModel.loading = false;

// this is for debugging. If you want to turn on ref-count checking, set this to true in the console!
StoryModel.watchRefCounts = false;

StoryModel._defaultStoryName = tr("Untitled Story");
StoryModel._defaultAuthorName = tr("Anonymous");

StoryModel._storyName = StoryModel._defaultStoryName;
StoryModel._authorName = StoryModel._defaultAuthorName;
StoryModel.stitches = [];
StoryModel.flagIndex = [];

StoryModel.initialStitch = null;
StoryModel.maxPage = 0;
StoryModel.maxPreferredPageLength = 8;

// default read mode settings - only one at present
StoryModel.optionMirroring = true;
StoryModel.allowCheckpoints = false;

// count of how many loose ends and ends there are in the story
StoryModel.endCount = 0;
StoryModel.looseEndCount = 0;

StoryModel.storyName = function() { return StoryModel._storyName; };
StoryModel.authorName = function() { return StoryModel._authorName; };

StoryModel.setStoryName = function(name) { StoryModel._storyName = name; };
StoryModel.setAuthorName = function(name) { StoryModel._authorName = name; };

StoryModel.clear = function() {
    StoryModel.stitches = [];
    StoryModel.flagIndex = [];    
    StoryModel.setStoryName(StoryModel._defaultStoryName);
    StoryModel.setAuthorName(StoryModel._defaultAuthorName);
};


//------------------------------------------------------------------------
//
//			Graph-related functionality
//
//------------------------------------------------------------------------

StoryModel.updateGraphModel = function () {
    if (!StoryModel.loading) {
    
        StoryModel.rebuildBacklinks();
        
        StoryModel.computePageNumbers();

        StoryModel.stitches.sort(function(a, b) 
        {  
            // stitch a comes before b if:
            //  page a < page b
            //  vertical distance a < vertical distance b
            if (a.pageNumber() - b.pageNumber() == 0) {
                
                return (a.verticalDistanceFromHeader() - b.verticalDistanceFromHeader()); 
            }
            return a.pageNumber() - b.pageNumber();
        });
        
    }
    
}

StoryModel.rebuildBacklinks = function() {
    StoryModel.endCount = 0;
    
    // clear out backlinks
    for (var i = 0 ; i < StoryModel.stitches.length ; i++ ) {
        StoryModel.stitches[i]._backlinks = [];
    }
    
    // rebuild backlinks
    for (var i = 0 ; i < StoryModel.stitches.length ; i++ ) {
        if (StoryModel.stitches[i].options.length > 0) {
            for (var j = 0; j < StoryModel.stitches[i].options.length ; j++) {
                if (StoryModel.stitches[i].options[j]._linkStitch)
                    StoryModel.stitches[i].options[j]._linkStitch._backlinks.push(StoryModel.stitches[i]);
                else
                    StoryModel.looseEndCount++;
            }
        }
        else if (StoryModel.stitches[i].divertStitch)
            StoryModel.stitches[i].divertStitch._backlinks.push(StoryModel.stitches[i]);
        else 
            StoryModel.endCount++;
    }

    if (StoryModel.watchRefCounts) {
        for (var i = 0 ; i < StoryModel.stitches.length; i++ ) {
            if (StoryModel.stitches[i]._backlinks.length !== StoryModel.stitches[i].refCount) {
                alert("Stitch with text '"+StoryModel.stitches[i].text() +"' has invalid ref-count!");
            }
        }
    }
}

StoryModel.repointStitchToStitch = function(fromStitch, toStitch) {


    // change all references pointing to fromStitch into refs pointing to the toStitch
    // careful to keep ref counts accurate
    if (fromStitch)
    {
        if (StoryModel.watchRefCounts) {
            console.log("Repointing stitch links from " + fromStitch.name());
            if (toStitch) 
                 console.log(" to " + toStitch.name());
            else
                console.log("to null.");
        }

        for (var i = 0 ; i < StoryModel.stitches.length ; i++ ) {
            var stitch = StoryModel.stitches[i];
            if (stitch.divertStitch == fromStitch ) {
                stitch.undivert(true);
                if (toStitch)
                    stitch.divert(toStitch, true);
            }
            for (var j = 0 ; j < stitch.options.length ; j++ ) {
                if (stitch.options[j]._linkStitch == fromStitch) {
                    stitch.options[j].unlink(true);
                    if (toStitch)
                        stitch.options[j].linkStitch(toStitch, true);
                }
            }
        }
    } else {
        alert("Attempting to repoint a null stitch...");
    }

    StoryModel.updateGraphModel();
}


//------------------------------------------------------------------------
//
//			Apply page numbers throughout flow
//
//------------------------------------------------------------------------


StoryModel.headerWithinDistanceOfStitch = function(maxDistance, startStitch) {
    // is there a page label within maxDistance of the stitch stitch? 
    // if there is, we return true
    var searchStitches = [];
    var nextStitches = [];
    searchStitches.push(startStitch);
    
    for (var i = 0 ; i <= maxDistance ; i++) {
        for (var j = 0 ; j < searchStitches.length ; j++ ) {
            var stitch = searchStitches[j];
            if (stitch)
            {
                if (stitch.pageNumberLabel() > 0) {
//                    console.log("Found page label " + stitch.pageNumberLabel() + " after possible new page at distance " + i + ".");
                    return true;
                }
                nextStitches.push(stitch.divertStitch);
                for ( var k = 0; k < stitch.options.length ; k++)
                {
                    nextStitches.push(stitch.options[k]._linkStitch);
                }
            }
        }
        searchStitches = nextStitches;
        nextStitches = [];
    }
    return false;
}

StoryModel.insertPageNumber = function(stitch, force) {

    // some requirements for thinking inserting a new page is a good idea:
    //  1) we want to have at least half the preferred page length 
    //      (not the full, as people may not write in a breadth-first fashion)
    //  2) we want to have at least 3 stitches vertical distance from the top of the chapter

    if (!force && (StoryModel.loading || stitch.verticalDistanceFromHeader() < 2 ||
        StoryModel.pageSize(stitch.pageNumber()) < StoryModel.maxPreferredPageLength / 2 ||
           StoryModel.headerWithinDistanceOfStitch(3, stitch)))
                return;

//    console.log("Applying a page label at " + stitch.name());

    if (stitch.pageNumberLabel() !== 0 && !force) 
    {
//        console.log("Already labelled / removed. Dropping out.");
        return;
    }
     
    // new page number is the stitch's *computed* number plus one
    var newPageNumber = stitch.pageNumber() + 1;
//    console.log("Inserting label of " + newPageNumber);
    
    // all higher headings are increased by 1
    for (var i = 0 ; i < StoryModel.stitches.length ; i++)
    {
        var k = StoryModel.stitches[i].pageNumberLabel();
        if (k >= newPageNumber)
        {
//            console.log("Increasing page label on " + StoryModel.stitches[i].name() + " to " + (k + 1) + ".");
            StoryModel.stitches[i].pageNumberLabel(k + 1);
        }
    }
    
    // apply a new page heading at stitch
    // taking the value of stitch's current page + 1
    stitch.pageNumberLabel(newPageNumber);
    
    // recompute page numbers
    StoryModel.computePageNumbers();
}

StoryModel.removePageNumber = function(stitch, dontRecompute) {

 //   console.log("Remove page label from " + stitch.name());
    var removedPageNumber = stitch.pageNumberLabel();
    if (removedPageNumber <= 0) 
    {
//        console.log("No label. Dropping out.");
        return;
    }
    // remove page heading from stitch and record that it's been removed
    stitch.pageNumberLabel(-1);
    
    // all further headings are reduced by 1, if necessary
    for (var i = 0 ; i < StoryModel.stitches.length ; i++)
    {
        
        var k = StoryModel.stitches[i].pageNumberLabel();
        if (k > removedPageNumber)
        {
//            console.log("Reducing page label on " + StoryModel.stitches[i].name() + " to " + (k - 1) + ".");
            StoryModel.stitches[i].pageNumberLabel(k - 1);
        }
    }   
    
    // recompute page numbers
    if (!dontRecompute) {
        StoryModel.computePageNumbers();
    }
}

StoryModel.computePageNumbers = function () {

	var headingStitches = [];
	var maxHeadingLevel = 0;
	var headingLinksToHeadings = {};
	var unlinkedHeadings = {};

    // build a list of stitches which have page number headers
	for ( var i = 0 ; i < StoryModel.stitches.length ; i++)
	{
		var headingLevel = StoryModel.stitches[i].pageNumberLabel();
		if (headingLevel > 0)
		{
			headingStitches.push(StoryModel.stitches[i]);
			if (headingLevel > maxHeadingLevel)
				maxHeadingLevel = headingLevel;
			StoryModel.stitches[i].pageNumber(headingLevel);
			headingLinksToHeadings[headingLevel] = [];
			unlinkedHeadings[headingLevel] = true;
		}
		else
		{
			StoryModel.stitches[i].pageNumber(0);
		}
		StoryModel.stitches[i].sectionStitches = [];
	}
	
	// sort them into descending (9 -> 1) order. This is the order in which they take preference when we apply them
	headingStitches.sort( function(a, b) { return a.pageNumberLabel() - b.pageNumberLabel(); } );
	
	// recurse down from each heading, flooding the tree
	for ( var i = headingStitches.length - 1 ; i >= 0  ; i--)
	{
		// the recursive flood-fill function, in all its glory!
		var setLowerStitchesHeadings = function(fromStitch, ignoreFirst, levelsDeep) {
			if (!fromStitch) 
			    // from an unlinked option / null divert stitch
			    return;
			if (!ignoreFirst && fromStitch.pageNumber() > 0)
			{
			    // fromStitch = stitch we're considering
			    //  - it's got a heading computed already
			    //  - that heading is the one we're looking at now also
			    //  - the last route from header to it was longer
			    // --> so lower the route length but don't change the header
	            if (fromStitch.verticalDistanceFromHeader() > levelsDeep &&
			 	        fromStitch.pageNumber() == headingStitches[i].pageNumber() )
    			 	        fromStitch.verticalDistanceFromHeader( levelsDeep );

    			// record that fromStitch.pageNumber() --> headingStitches[i].pageNumber() 
    			headingLinksToHeadings[headingStitches[i].pageNumber()].push(fromStitch.pageNumber());
    			
				return;
			}
			
			// set page number from current heading
			fromStitch.pageNumber(headingStitches[i].pageNumber());
			fromStitch.headerStitch(headingStitches[i]);
			headingStitches[i].sectionStitches.push(fromStitch);
			fromStitch.verticalDistanceFromHeader( levelsDeep );

			// loop through lower branches
			setLowerStitchesHeadings(fromStitch.divertStitch, false, levelsDeep+0.01);
			for ( var j = 0; j < fromStitch.options.length ; j++)
			{
				setLowerStitchesHeadings(fromStitch.options[j].linkStitch(), false, levelsDeep+1+0.1*j);
			}
		}
		
		// This calls the recursion for this heading
		setLowerStitchesHeadings(headingStitches[i], true, 0);
	}
	
	// work out which headings are not linked from anywhere
	// zero out these page numbers completely so they are considered to be "unused"
    var headingsToConsider = [];
    headingsToConsider.push(StoryModel.initialStitch.pageNumber());
	while ( headingsToConsider.length > 0 ){
        var nextRound = [];
	    for (var i = 0 ; i < headingsToConsider.length ; i++) {
	        if (unlinkedHeadings[headingsToConsider[i]])  {
                unlinkedHeadings[headingsToConsider[i]] = false;
                for (var j = 0 ; j < headingLinksToHeadings[headingsToConsider[i]].length ; j++ ) {
                    nextRound.push(headingLinksToHeadings[headingsToConsider[i]][j]);
                }
	        }
	    }
	    headingsToConsider = nextRound;
	}
    // everything with unlinked = true should be zeroed
    
    for (var i = 0 ; i < StoryModel.stitches.length ; i++) {
        var pageLabel = StoryModel.stitches[i].pageNumber();
        if (pageLabel) {
            if (unlinkedHeadings[pageLabel]) {
                StoryModel.stitches[i].pageNumber(0);  
                StoryModel.stitches[i].sectionStitches = [];
            }
        }
    }

}

StoryModel.pageSize = function(pageNum) {
    var count = 0;
    for ( var i = 0 ; i < StoryModel.stitches.length ; i++)
    {
        if (StoryModel.stitches[i].pageNumber() == pageNum) count++;
    }
    return count;
}

//------------------------------------------------------------------------
//
//			Vertical Distance from Start heuristic
//
//------------------------------------------------------------------------

StoryModel.computeVerticalHeuristic = function() {
	// we do minimum distance from start, which isn't perfect, but at least it's meaningful
	
	if (!StoryModel.initialStitch) return;
	
	var currentStitches = [];

	var nextStitches = [];
	
//	console.log("Computing vertical heuristic...");
	for ( var i = 0; i < StoryModel.stitches.length ; i++)
	{
		var stitch = StoryModel.stitches[i];
		stitch.verticalDistance(-1); 
	} 

	currentStitches.push(StoryModel.initialStitch);
	StoryModel.initialStitch.verticalDistance(1);
	
	while (currentStitches.length > 0) {
		for(var i = 0; i < currentStitches.length; i++) {
			var stitch = currentStitches[i];
//            console.log("Vert distance for " + stitch.name() + " is " + stitch.verticalDistance() + ".");
			
            if (stitch.divertStitch) {
                var nextStitchDown = stitch.divertStitch;
                if (nextStitchDown.verticalDistance() == -1) {
                    nextStitchDown.verticalDistance(stitch.verticalDistance() + 0.01);
                    nextStitches.push(nextStitchDown);
                }
            }  else  {
                for ( var j = 0 ; j < stitch.options.length ; j++) {
                    if (stitch.options[j].linkStitch()) {
                        var nextStitchDown = stitch.options[j].linkStitch();
                        if (nextStitchDown.verticalDistance() == -1) {
                            nextStitchDown.verticalDistance(stitch.verticalDistance() + 1 + 0.1 * j);
                            nextStitches.push(nextStitchDown);
                        }
                    }
                }
            }
        
		}
		
		currentStitches = nextStitches;
		nextStitches = [];
	}
	
	// finally, we push -1 stitches to the bottom
	for (var i = 0; i < StoryModel.stitches.length ; i++)
	{
		var stitch = StoryModel.stitches[i];
		if (stitch.verticalDistance() == -1)
		{
			stitch.verticalDistance( StoryModel.stitches.length + 1);
//			console.log("Vert distance for " + stitch.name() + " is " + StoryModel.stitches.length + 1 + ".");
		}
	}
	
	
}


// --------------------- Stitch -----------------------------

StoryModel.Stitch = function(initialTextContent) {
    this.refCount = 0;
    this._text = initialTextContent;
    this.wordCount = wordCountOf(initialTextContent);
    this.options = [];
    this._ifConditions = [];
    this._notIfConditions = [];
    this.divertStitch = null;
    this._flags = new Array();
    this._backlinks = new Array();
    this._pageNumberHeader = 0;
    this._pageLabelText = "";
    this.statsObj = {};
    this._runOn = false;
    this._image = false;
    
    // deliberately local - used during calculations on the model, but not stored
    this.forwardLinkStitch = null;
    this.distanceFromTarget = -1;
    this._verticalDistanceFromStart = 0;
    this._computedPageNumber = 0;
    this._verticalDistanceFromPageNumberHeader = 0;
    this._headerStitch = null;

    this.sectionStitches = [];

    //  JI:  Alt to list of stitchBoxes used for looking up if stitches are visible
    // links from stitch to UI elements. This is bad form, but really handy
    this._stitchBox = null;
    

}


// ------------------------------------------------------

StoryModel.Stitch.prototype.verticalDistanceFromHeader = function(pNum) {
    if (pNum != null)   {   this._verticalDistanceFromPageNumberHeader = pNum; }
    return this._verticalDistanceFromPageNumberHeader;
}

StoryModel.Stitch.prototype.pageNumber = function(pNum) {
	if (pNum !== undefined)
	{
		this._computedPageNumber = pNum;
	}
	return this._computedPageNumber;
}

StoryModel.Stitch.prototype.headerStitch = function(stitch) {
    if (stitch !== undefined) { 
        this._headerStitch = stitch;
    }
    return this._headerStitch;
}

StoryModel.Stitch.prototype.pageLabelText = function(labelText) {
	if (labelText !== undefined)
	{
		this._pageLabelText = labelText;
	}
    if (!this._pageLabelText) {
        return "Section " + this.pageNumberLabel();
    }
	return this._pageLabelText;
}

StoryModel.Stitch.prototype.pageNumberLabel = function(pNum) {
	if (pNum)
	{
        // if this is the top page level and we're zeroing/decreasing it, reduce the max
		if (pNum < this._pageNumberHeader && StoryModel.maxPage == this._pageNumberHeader) 
		{
            StoryModel.maxPage--;
		}

		this._pageNumberHeader = pNum;
    		
		// if this is greater than the max, up the max
		if (pNum > StoryModel.maxPage) 
		    StoryModel.maxPage = pNum;
        
//        console.log("Applied page label " + pNum + ". Max is now " + StoryModel.maxPage + ".");

	}
	return this._pageNumberHeader;
}

StoryModel.Stitch.prototype.verticalDistance = function(vDist) {
	if (vDist)
	{
		this._verticalDistanceFromStart = vDist;
	}
	return this._verticalDistanceFromStart;
}

StoryModel.Stitch.prototype.getBacklinks = function() {
	return this._backlinks;
}

StoryModel.Stitch.prototype.decRefCount = function() {
    this.refCount--;
}

StoryModel.Stitch.prototype.incRefCount = function() {
    this.refCount++;
}

StoryModel.Stitch.prototype.text = function(newText) {
    if( newText != null ) {
        this._text = newText;
        this.wordCount = wordCountOf(newText);
    }
    if (this._text === undefined) {
        this.wordCount = 0;
        return "";
    }
    return this._text;
}

// Only used in import/export process to identify stitches
StoryModel.Stitch.prototype.name = function(newName) {
    if( newName != null ) {
        this._name = newName;
    }
    return this._name;
}

StoryModel.Stitch.prototype.createShortName = function() {
	if (!this.text())
	{
		return "blankStitch";
	}
	var shortName = this.text().camelCase().substring(0, 16);
	if (shortName === "") return "punctuatedStitch";
    return shortName;
}

StoryModel.Stitch.prototype.divert = function(stitch, skipModelUpdate) {        
    if( stitch != null ) {
        
        if (stitch == this) {
            alert("Trying to divert a stitch back to itself! Infinite loopyness!");
            return;
        }
        
        if ( this.divertStitch != stitch) {
        
            if( this.divertStitch ) {
                this.divertStitch.decRefCount();
            }
            
            this.divertStitch = stitch;
            
            this.divertStitch.incRefCount();
           
            if (!skipModelUpdate) {
                StoryModel.updateGraphModel(); 
            }
            
        }
    }
    return this.divertStitch;
}

StoryModel.Stitch.prototype.undivert = function(skipModelUpdate) {
    if( this.divertStitch ) {
        if (StoryModel.watchRefCounts) {
            console.log("Undiverting " + this.name());
        }

        this.divertStitch.decRefCount();
    }
    this.divertStitch = null;
    if (!skipModelUpdate) {
        StoryModel.updateGraphModel();
    }
}

StoryModel.Stitch.prototype.addOption = function() {
    var option = new StoryModel.Option(this);
    this.options.push(option);
    return option;
}

StoryModel.Stitch.prototype.removeOption = function(option) {
    option.unlink();
    this.options.remove(option);
}

StoryModel.Stitch.prototype.dead = function() {
    var empty = ($.trim(this.text()).length == 0) && (this.numberOfFlags() === 0);
    if( empty && this.refCount == 0 && this !== StoryModel.initialStitch ) {
        return true;
    } else {
        return false;
    }
}

StoryModel.Stitch.prototype.runOn = function(value) {
	if (value === false || value === true) {
		this._runOn = value;
	}
	return this._runOn;
}

StoryModel.Stitch.prototype.image = function(value) {
	if (value !== undefined) {
		this._image = value;
	}
	return this._image;
}

StoryModel.Stitch.prototype.stats = function() {
    var statsObj = {};
    statsObj.deadEnd = false;
    statsObj.numOptions = this.options.length;
    
    statsObj.looseEnds = [];
    statsObj.numLooseEnds = 0;
    
    if( this.options.length > 0 ) {
        statsObj.numLinked = 0;
        for(var i=0; i<statsObj.numOptions; ++i) {
            var opt = this.options[i];
            if( opt.linkStitch() ) {
                statsObj.numLinked++;
            } else {
            	statsObj.looseEnds.push(opt);
            }
        }
        
        statsObj.numLooseEnds = statsObj.numOptions - statsObj.numLinked;
    } else if (!this.divertStitch) {
        statsObj.deadEnd = true;
    }
    
    this.statsObj = statsObj;
    
    return statsObj;
    
}

StoryModel.Stitch.prototype.numberOfFlags = function() {
	return this._flags.length;
}

StoryModel.Stitch.prototype.flagIsUsed = function(flagName, strictMode) {
// in strict mode, we don't count "jim + 1" and "jim + 2" as being the same
// despite referring to the same flags
    if (!strictMode) {
        flagName = StoryModel.extractFlagNameFromExpression(flagName);
    }
    for (var i = 0 ; i < this._flags.length ; i++) {
        var testFlag = this._flags[i];
        if (!strictMode) {
            testFlag = StoryModel.extractFlagNameFromExpression(testFlag);
        }
        if (testFlag == flagName) {
            return true;
        }
    }
	return false;
}

StoryModel.Stitch.prototype.flagByIndex = function(idx) {
	if (idx < 0 || idx >= this.numberOfFlags()) 
		return "";
	return this._flags[idx];
}

StoryModel.Stitch.prototype.editFlag = function(flagName, setFlag) {
	if ( flagName )
	{
		var idx = this._flags.indexOf(flagName);
		if (setFlag && idx == -1)
		{
			this._flags.push(flagName);
			StoryModel.addFlagToIndex(flagName);
		} 
		else
		{
			this._flags.splice(idx, 1);
			StoryModel.collateFlags();
		}
	}
}



// --------------------- Option -----------------------------

StoryModel.Option = function(parentStitch) {
    this._text = "";
    this._linkStitch = null;				// where does this option go?
    this._parentStitch = parentStitch;		// which stitch is this option from? (note: unique!)
	this._ifConditions = new Array();
    this._notIfConditions = new Array();
}

StoryModel.Option.prototype.text = function(text, forceTextEntry) {
    if( text || forceTextEntry ) {
        this._text = text;
    }
    return this._text;
}

StoryModel.Option.prototype.linkStitch = function(stitch, skipModelUpdate) {
    if( stitch ) {

        // do we need to do any work?        
        if (this._linkStitch != stitch)
        {

            if( this._linkStitch ) {
                this._linkStitch.decRefCount();
            }

            this._linkStitch = stitch;

            this._linkStitch.incRefCount();

            if (!skipModelUpdate) {
                StoryModel.updateGraphModel();
            }
            
        }
        
    }
    return this._linkStitch;
}

StoryModel.Option.prototype.unlink = function(skipModelUpdate) {
    if( this._linkStitch ) {
        this._linkStitch.decRefCount();
    }
    if (StoryModel.watchRefCounts) {
        console.log("Unlinking " + this.text() + " - option on " + this._parentStitch.name());
    }
    this._linkStitch = null;
    if (!skipModelUpdate) {
        StoryModel.updateGraphModel();
    }
}

//----------------------------------------------------------------------------
//          Functions for acting on Conditionals
//----------------------------------------------------------------------------


StoryModel.numberOfConditionals = function(obj, testValue) {
	if (testValue)
		return obj._ifConditions.length;
	return obj._notIfConditions.length;
}

StoryModel.conditionedOnThis = function(obj, flagName, testValue) {
	if (testValue) return (obj._ifConditions.indexOf(flagName) > -1);
	return (obj._notIfConditions.indexOf(flagName) > -1);
}

StoryModel.conditionalByIndex = function(obj, testValue, idx) {
	if (idx < 0 || idx >= StoryModel.numberOfConditionals(obj, testValue)) 
		return "";
	if (testValue)
		return obj._ifConditions[idx];
	return obj._notIfConditions[idx];
}

StoryModel.writeConditionals = function(obj, flagName, testValue) {
	if ( flagName )
	{
		if (testValue)
		{
		    // would be better to use conditioned on this, from above.
			var idx = obj._ifConditions.indexOf(flagName);
			if (idx == -1)
			{
				obj._ifConditions.push(flagName);
				StoryModel.addFlagToIndex(flagName);
			} else
			{
				obj._ifConditions.splice(idx, 1);
				StoryModel.collateFlags();				
			}
		} 
		else
		{	
			var idx = obj._notIfConditions.indexOf(flagName);
			if (idx == -1)
			{
				obj._notIfConditions.push(flagName);
				StoryModel.addFlagToIndex(flagName);
			} else 
			{
				obj._notIfConditions.splice(idx, 1);
				StoryModel.collateFlags();
			}
			
		}
	}
}

//----------------------------------------------------------------------------
//          Collect up all the flags used by the game for reference
//----------------------------------------------------------------------------

StoryModel.extractFlagNameFromExpression = function(flagText) {
    var grabFlagNameRegex = /^(.*?)\s*(\=|\+|\-|\>|\<|\!\=|$)/;
    return flagText.match(grabFlagNameRegex)[1];   
}

StoryModel.addFlagToIndex = function(flagText) {
    // Todo extract the flag from the flag text
    console.log("Adding flag string " + flagText);
    flagText = StoryModel.extractFlagNameFromExpression(flagText);
    
    if (!StoryModel.flagIndex.contains(flagText)) {
        console.log("-> " + flagText);
        StoryModel.flagIndex.push(flagText);
    }

}

StoryModel.collateFlags = function() {
    // clear list
    StoryModel.flagIndex = [];
    
    for ( var i = 0 ; i < StoryModel.stitches.length ; i++ ) {
        var stitch = StoryModel.stitches[i];
        for ( var j = 0; j < stitch._flags.length ; j++) {
            StoryModel.addFlagToIndex(stitch._flags[j]);
        }
        for (var k = 0; k < stitch.options.length ; k++) {
            for ( var j = 0; j < stitch.options[k]._ifConditions.length ; j++) {
                StoryModel.addFlagToIndex(stitch.options[k]._ifConditions[j]);
            }
            for ( var j = 0; j < stitch.options[k]._notIfConditions.length ; j++) {
                StoryModel.addFlagToIndex(stitch.options[k]._notIfConditions[j]);
            }
        }
        for ( var j = 0; j < stitch._ifConditions.length ; j++) {
            StoryModel.addFlagToIndex(stitch._ifConditions[j]);
        }
        for ( var j = 0; j < stitch._notIfConditions.length ; j++) {
            StoryModel.addFlagToIndex(stitch._notIfConditions[j]);
        }
    }
}

//----------------------------------------------------------------------------
//          Test Conditionals against the current active flag list
//----------------------------------------------------------------------------
 
 StoryModel.getIdxOfFlag = function(flagName, flagArray) {
    for (var i = 0 ; i < flagArray.length ; i++) {
        if (flagArray[i].flagName == flagName)
            return i;
    }
    // default
    return -1;
 }
  
 StoryModel.getValueOfFlag = function(flagName, flagArray) {
    var idx =  StoryModel.getIdxOfFlag(flagName, flagArray);
    if ( idx >= 0 ) return flagArray[idx].value;
    
    // default
    return false;
 }
 
 StoryModel.processFlagSetting = function (stitch, flagArray) {
    if (stitch) {
        for (var i = 0; i < stitch.numberOfFlags() ; i++)
        {
            var marker = stitch.flagByIndex(i);
            var val = true; // default
            var assignmentMatches;
            
            console.log("Flag directive: " + marker); 
            
            var matchAssignmentRegex = /^(.*?)\s*(\=|\+|\-)\s*(\b.*\b)\s*$/;
            
            // Is the marker an assignment / increment?
            if ( assignmentMatches = marker.match(matchAssignmentRegex)) {
                // ie marker name = val, marker name + / - val
                marker = assignmentMatches[1];

                var idx = StoryModel.getIdxOfFlag(marker, flagArray);                

                if (!assignmentMatches[3].match(/\d+/)) {
                    if ( assignmentMatches[2] == "=") {
                        val = convertStringToBooleanIfAppropriate(assignmentMatches[3]);
                    } else {
                        console.log("Can't add/subtract a boolean.");
                    }
                } else {
                    if ( assignmentMatches[2] == "=") {
                        val = parseInt(assignmentMatches[3]);                     
                    } else {
                        
                        if (idx < 0) {
                            // if currently a boolean // undefined, default to zero
                            val = 0; 
                        } else {
                            val = flagArray[idx].value;
                        }
                        if ( assignmentMatches[2] == "+") {   
                            val += parseInt(assignmentMatches[3]);
                        } else {
                            val -= parseInt(assignmentMatches[3]);
                        }
                    }                
                }                
                
            } else {
                var idx = StoryModel.getIdxOfFlag(marker, flagArray);                

            }
            
            console.log("Assigning value: " + val);
            
            // remove previous version of this variable
            if (idx >= 0) {
                flagArray.splice(idx, 1);
            } 
            
            var newFlag = {
                flagName: marker,
                value:    val
            };
            
            flagArray.push(newFlag);
        }
    }
    return flagArray;
}

StoryModel.test = function(ifCondition, flagsCollected) {
    var comparisonMatches;    
    var compareValuesRegex = /^(.*?)\s*(\<|\>|\<\=|\>\=|\=|\!\=|\=\=)\s*(\b.*\b)\s*$/;
    var pass = false;
    
    if (ifCondition) {
        if (comparisonMatches = ifCondition.match(compareValuesRegex)) {
            var val = StoryModel.getValueOfFlag(comparisonMatches[1], flagsCollected);
            
            console.log("Testing " + val + " " + comparisonMatches[2] + " " + comparisonMatches[3]);
    
            if (comparisonMatches[2] == "==" || comparisonMatches[2] == "=") {
                pass = (val == comparisonMatches[3]);             
            } else if (comparisonMatches[2] == "!=" || comparisonMatches[2] == "<>") {                                                
                pass = (val !== comparisonMatches[3]); 
            } else {
    
                if (!comparisonMatches[3].match(/\d+/)) {
                    console.log("Error - Can't perform an order-test on a boolean.");
                }
                if (comparisonMatches[2] == "<") {
                    pass = (val < comparisonMatches[3]); 
                } else if (comparisonMatches[2] == "<=") {
                    pass = (val <= comparisonMatches[3]); 
                } else if (comparisonMatches[2] == ">") {
                    pass = (val > comparisonMatches[3]); 
                } else if (comparisonMatches[2] == ">=") {
                    pass = (val >= comparisonMatches[3]);             
                } 
            } 
            if (pass) console.log("Result is a SUCCESS"); 
            else console.log("Result is a FAIL");
        } else {
            pass = StoryModel.getValueOfFlag(ifCondition, flagsCollected);
            
            // if pass isn't a Boolean, we're a bit stuck
            pass = convertStringToBooleanIfAppropriate(pass);
            if (pass === 0 || pass === -1) pass = false;
            if (pass !== true && pass !== false) pass = true;
        }
    }
    return pass;
}
        
StoryModel.doesArrayMeetConditions = function(ifConditions, notIfConditions, flagsCollected) {
    var prerequisitesRequired = new Array();
    var failed = false;


    for (var i = 0 ; i < ifConditions.length && !failed; i++) {
        // val = true => failed = false, val = false => failed = true
        failed = !StoryModel.test(ifConditions[i], flagsCollected);
    }
    
    for (var i = 0 ; i < notIfConditions.length && !failed; i++) {
        // val = true => failed = true etc.
        failed = StoryModel.test(notIfConditions[i], flagsCollected);
    }

    return !failed;

}


//-------------------------------------------

StoryModel.createStitch = function(initialTextContent) {
    var newStitch = new StoryModel.Stitch(initialTextContent);
    this.stitches.push(newStitch);
    return newStitch;
}

StoryModel.removeStitch = function(stitch) {

     if (StoryModel.watchRefCounts) {
        console.log("Removing " + stitch.name() + " entirely.");
    }
    
    if( stitch.refCount != 0 ) {
        // this is possible, if the unused stitches are part of a loop disconnected from the main graph
        // in which case, we need to unpoint stitches linking into here
        StoryModel.repointStitchToStitch(stitch, null);
//        alert("WARNING: Couldn't delete stitch because another stitch still had a reference to it. (Not sure how this happened, sorry!)\n\n"+stitch.text());
        console.log("Deleting stitch with references, so first unpointing stitches from this stitch.");
        if( stitch.refCount != 0)
        {
            alert("Fixing ref-count on stitch removal failed.");
            return;
        }
    }
    
    // remove divert
    stitch.undivert();
    
    // remove options, going backwards...!
    for(var i = stitch.options.length-1; i >= 0; i--){
        stitch.removeOption(stitch.options[i]);
    }
    
    StoryModel.removePageNumber(stitch, true);

    // Remove the stitch from the array
    for(var i=0; i<this.stitches.length; ++i) {
        if( this.stitches[i] === stitch ) {
            this.stitches.splice(i, 1);
            //  the graph model will rebuild all the lists
            StoryModel.updateGraphModel();
            return;
        }
    }
   
}
    
StoryModel.createOption = function(stitch) {
    var newOption = stitch.addOption();
    return newOption;
}
    
StoryModel.removeOption = function(stitch, option) {
    stitch.removeOption(option);
}

StoryModel.purge = function() {
    
    // Sometimes the StoryModel might be in a completely blank/uninitialised state
    if( StoryModel.stitches.length == 0 ) { 
        return;
    }
    
    // Always keep the first stitch
    var stitchesToKill = [];
    
    // Check the rest to see whether they're still alive
    for(var i=0; i<StoryModel.stitches.length; ++i) {
        var stitch = StoryModel.stitches[i];
        if( stitch.dead() ) {
            stitchesToKill.push(stitch);
        }
    }
    
    for (var i = 0 ; i < stitchesToKill.length ; i++) {
        StoryModel.removeStitch(stitchesToKill[i]);
    }

}


StoryModel.importStory = function(storyName, dataToImport) {
    
    StoryModel.loading = true;
    StoryModel.clear();
    StoryModel.setStoryName(storyName);
    
    var editorData = {};
    
    // Initial pass: construct all the stitches
    // When we start linking them together, we need them to all exist,
    // so we create them all in one go first, and put them in preLinkStitch
    // containers (which in turn reference the final StoryStitch). These are
    // all added to a preLinkStitches object, so we can find them by name
    var preLinkStitches = {};
    for(var stitchName in dataToImport.stitches) {
        var stitchData = dataToImport.stitches[stitchName];
        
        // Construct content
        var textContent = "";
        var divertStitchName = null;
        var pageNumHeader = null;
        var pageLabel = "";
        var options = [];
        var flags = [];
        var ifs = [];
        var notIfs = [];
        var runOn = false;
        var image = null;
        for(var contentIdx=0; contentIdx<stitchData.content.length; ++contentIdx) {
            var contentData = stitchData.content[contentIdx];
            
            
            if( contentData.divert !== undefined ) {
                divertStitchName = contentData.divert;
            }
            
            else if( contentData.option !== undefined ) {
                options.push(contentData);
            }
            
            else if ( contentData.pageNum !== undefined ) {
                pageNumHeader = contentData.pageNum;
            }
            else if ( contentData.pageLabel !== undefined ) {
                pageLabel = contentData.pageLabel;
            }            
            else if ( contentData.flagName !== undefined ) {
                flags.push(contentData.flagName);
            }
            else if ( contentData.ifCondition !== undefined ) {
                ifs.push(contentData.ifCondition);
            }
            else if ( contentData.notIfCondition !== undefined ) {
                notIfs.push(contentData.notIfCondition);
            }            
           else if ( contentData.runOn ) {
                runOn = true;
            }            
           else if ( contentData.image ) {
                image = contentData.image;
            }            
   
            // Assume to be text content
            // TODO: Verify this
            else {
            
				// locate old-style ellipsis characters and repair them
				if (contentData.indexOf("[...]") > -1) {
					contentData = contentData.replace(/\[\.\.\.\]/, "");
					runOn = true;
				}
                        
                textContent += contentData;
            }
        }
        
        preLinkStitches[stitchName] = {
            storyStitch: StoryModel.createStitch(textContent),
            divert: divertStitchName,
            options: options,
            flags: flags,
            ifs: ifs,
            notIfs: notIfs,
            runOn: runOn,
            pageNumHeader: pageNumHeader,
            pageLabel: pageLabel,
            image:image
        }
    }
    
    
    // The stitches now all exist in their un-linked form, so we can link
    // them all together, based on diverts/options etc.
    for(var stitchName in preLinkStitches) {
        var preLinkStitch = preLinkStitches[stitchName];
        
        // Add divert
        if( preLinkStitch.divert ) {
            var divertStoryStitch = preLinkStitches[preLinkStitch.divert].storyStitch;
            preLinkStitch.storyStitch.divert(divertStoryStitch)
        }
        
        // page number
        if ( preLinkStitch.pageNumHeader) {
            preLinkStitch.storyStitch.pageNumberLabel( preLinkStitch.pageNumHeader  );
        }
        // page label
        if ( preLinkStitch.pageLabel) {
            preLinkStitch.storyStitch.pageLabelText( preLinkStitch.pageLabel  );
        }
        
        // image
        if ( preLinkStitch.image) {
            preLinkStitch.storyStitch.image( preLinkStitch.image  );
        }        
                
        // Add flags
        for (var flagIdx = 0; flagIdx < preLinkStitch.flags.length ; ++ flagIdx) {
            preLinkStitch.storyStitch._flags.push(preLinkStitch.flags[flagIdx]);
        }

		// run on
		if ( preLinkStitch.runOn ) {
			preLinkStitch.storyStitch.runOn( true );
		}
		
        // Add ifs
        for (var ifIdx = 0; ifIdx < preLinkStitch.ifs.length ; ++ ifIdx) {
            preLinkStitch.storyStitch._ifConditions.push(preLinkStitch.ifs[ifIdx]);
        }
        
        // Add not ifs
        for (var ifIdx = 0; ifIdx < preLinkStitch.notIfs.length ; ++ ifIdx) {
            preLinkStitch.storyStitch._notIfConditions.push(preLinkStitch.notIfs[ifIdx]);
        }        
 
        // Add options for this stitch
        for(var optIdx = 0; optIdx < preLinkStitch.options.length; ++optIdx) {
            var optionData = preLinkStitch.options[optIdx];
            var newOption = StoryModel.createOption( preLinkStitch.storyStitch );
            

            newOption.text(optionData.option);
            
            newOption.writeModeOnly = optionData.writeModeOnly;
            
            if( optionData.linkPath ) {
                newOption.linkStitch(preLinkStitches[optionData.linkPath].storyStitch);
            }
            //if( optionData.parentStitch ) {
            newOption._parentStitch = preLinkStitch.storyStitch;
            //}       
            if ( optionData.ifConditions ) {
                for (var ifIdx = 0 ; ifIdx < optionData.ifConditions.length ; ++ifIdx)
                {
                    newOption._ifConditions.push(optionData.ifConditions[ifIdx].ifCondition);
                }
            }
            if ( optionData.notIfConditions ) {
                for (var notIfIdx = 0 ; notIfIdx < optionData.notIfConditions.length ; ++notIfIdx)
                {
                    newOption._notIfConditions.push(optionData.notIfConditions[notIfIdx].notIfCondition);
                }
            }
            
        }
    }
    
    if (preLinkStitches[dataToImport.initial]) {
	    // Finally, set the initial stitch
   	 	StoryModel.initialStitch = preLinkStitches[dataToImport.initial].storyStitch;
	} else {
		// there's no valid inital stitch, so we take the first in the Story Model.
		StoryModel.initialStitch = StoryModel.stitches[0];

		// now, the bad part -- we repair the data by adding in page 1 at this initial stitch
		// since the old page 1 was deleted, we need to bump up *every other page label*
		
		for (var i = 0 ; i < StoryModel.stitches.length ; i++) {
			var pageX = StoryModel.stitches[i].pageNumberLabel();
			if (pageX > 0) {
				StoryModel.stitches[i].pageNumberLabel(pageX + 1);
			}
		}
		StoryModel.initialStitch.pageNumberLabel(1);

	}

    
    StoryModel.optionMirroring = (dataToImport.optionMirroring !== undefined) ? dataToImport.optionMirroring : true;
    StoryModel.allowCheckpoints = (dataToImport.allowCheckpoints !== undefined) ? dataToImport.allowCheckpoints : false;
    

    if (dataToImport.editorData) {
        if (dataToImport.editorData.playPoint && preLinkStitches[dataToImport.editorData.playPoint])
            editorData.playPoint = preLinkStitches[dataToImport.editorData.playPoint].storyStitch;
        else
        		editorData.playPoint = StoryModel.initialStitch;
        editorData.libraryVisible = dataToImport.editorData.libraryVisible;
        if (dataToImport.editorData.textSize !== undefined) {
            editorData.textSize = dataToImport.editorData.textSize;
        } else {
            editorData.textSize = 0;
        }
        if (dataToImport.editorData.authorName)
            StoryModel.setAuthorName(dataToImport.editorData.authorName);
    }
    
    StoryModel.loading = false;
    
    // and update our heuristics
    StoryModel.updateGraphModel();
    StoryModel.collateFlags();
    
    return editorData; 
}

StoryModel.nameStitches = function() {
    var stitchesSoFar = {};

    
    // Uniquely name all the stitches
    for(var i=0; i<StoryModel.stitches.length; ++i) {
        var stitch = StoryModel.stitches[i];
        var shortName = stitch.createShortName();
        
        // Make it more unique by appending a number on if necessary
        var shortNameVariant = shortName;
        for(var nameIdx=1; stitchesSoFar[shortNameVariant] != null; nameIdx++) {
            shortNameVariant = shortName + nameIdx;
        }
        shortName = shortNameVariant;
        stitchesSoFar[shortName] = true;
        stitch.name(shortName);
        
    }	
}

StoryModel.exportStory = function() {
    
    var storyData = {
        stitches: {}
    };
    
	StoryModel.nameStitches();
    
    // Insert the each stitch with its content
    for(var i=0; i<StoryModel.stitches.length; ++i) {

        
        var stitch = StoryModel.stitches[i];
        var stitchData = { content: [] };

        // Text content
        stitchData.content.push( stitch.text() );
        
        // runOn flag
        
        if (stitch.runOn()) {
        	stitchData.content.push({ runOn: true });
        }
        
        // image 
        if (stitch.image()) {
        	stitchData.content.push({ image: stitch.image() });
        }   
             
        // Divert content
        if( stitch.divert() != null ) {
            var divertData = { 
                divert: stitch.divert().name() 
            };
            stitchData.content.push( divertData );
        } 
        
        // Options content
        else if( stitch.options.length > 0 ) {
            for(var opt=0; opt<stitch.options.length; ++opt) {
                
                var linkStitch = stitch.options[opt].linkStitch();
                var stitchedFrom = stitch.options[opt]._parentStitch;
                var ifConditions = [];
                var notIfConditions = [];
                
                for (var ifIdx = 0 ; ifIdx < stitch.options[opt]._ifConditions.length ; ++ifIdx) {
                    var newIfFlag = {
                        ifCondition: stitch.options[opt]._ifConditions[ifIdx]
                    };
                    
                    ifConditions.push(newIfFlag);
                }
                
                for (var ifIdx = 0 ; ifIdx < stitch.options[opt]._notIfConditions.length ; ++ifIdx) {
                    var newIfFlag = {
                        notIfCondition: stitch.options[opt]._notIfConditions[ifIdx]
                    };
                    notIfConditions.push(newIfFlag);
                }
                
                var optionData = {
                    option: stitch.options[opt].text(),
                    linkPath: linkStitch ? linkStitch.name() : null,
                    //parentStitch: stitchedFrom ? stitchedFrom.name() : null,
                    ifConditions: ifConditions.length > 0 ? ifConditions : null, 
                    notIfConditions: notIfConditions.length > 0 ? notIfConditions : null
                }
                stitchData.content.push(optionData);
            }
        }
        
        // flags        
        if (stitch._flags.length > 0) {
            for(var j=0; j < stitch._flags.length; ++j) {
                
                var flagData = {
                    flagName: stitch._flags[j]
                }
                stitchData.content.push(flagData);
            }        
        }

        // ifConditions        
        if (stitch._ifConditions.length > 0) {
            for(var j=0; j < stitch._ifConditions.length; ++j) {
                
                var conditionData = {
                    ifCondition: stitch._ifConditions[j]
                }
                stitchData.content.push(conditionData);
            }        
        }
        
        // notIfConditions       
        if (stitch._notIfConditions.length > 0) {
            for(var j=0; j < stitch._notIfConditions.length; ++j) {
                
                var conditionData = {
                    notIfCondition: stitch._notIfConditions[j]
                }
                stitchData.content.push(conditionData);
            }        
        }

        // Page number
        if( stitch._pageNumberHeader != 0 ) {
            var pageNumberData = { 
                pageNum: stitch._pageNumberHeader
            };
            stitchData.content.push( pageNumberData );
        } 
       // Page label
        if( stitch._pageLabelText != 0 ) {
            var pageLabelData = { 
                pageLabel: stitch._pageLabelText
            };
            stitchData.content.push( pageLabelData );
        }         
        
        // Add this stitch to the storyData
        storyData.stitches[stitch.name()] = stitchData;
    }
    
    if (StoryModel.initialStitch)
        // Finally, tell it what the initial stitch is
        storyData.initial = StoryModel.initialStitch.name();

    
    storyData.optionMirroring = StoryModel.optionMirroring;
    storyData.allowCheckpoints = StoryModel.allowCheckpoints;
    
    storyData.editorData = Editor.editorData();
    
    return storyData;
}
