"use strict";
// --------------------------------------
// Types for the data directly coming from JSON
// --------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
// --------------------------------------
// Classes for parsed / loaded story data
// --------------------------------------
class Condition {
    constructor(condition, isNot) {
        this.condition = condition;
        this.isNot = isNot;
    }
}
class Choice {
    constructor(data) {
        this.text = data.option;
        this.linkPath = data.linkPath;
        this.conditions = [];
        if (data.ifConditions) {
            for (let ifC of data.ifConditions) {
                this.conditions.push(new Condition(ifC.ifCondition, false));
            }
        }
        if (data.notIfConditions) {
            for (let notIfC of data.notIfConditions) {
                this.conditions.push(new Condition(notIfC.notIfCondition, true));
            }
        }
    }
}
class Flag {
    constructor(flagText) {
        var assignPos = flagText.indexOf("=");
        var mathOpPos = flagText.search(/(\+|-|\*|\/)/);
        // Explicit assignment
        // e.g. "myFlag = 5"
        if (assignPos !== -1) {
            this.flagName = flagText.substr(0, assignPos).trim();
            this.assignedExpression = flagText.substr(assignPos + 1).trim();
            if (this.assignedExpression === "true" || this.assignedExpression === "false")
                this.defaultValue = false;
            else
                this.defaultValue = 0;
        }
        // Mathematical expression. Assume flag name comes first.
        // e.g. "myFlag + 1"
        else if (mathOpPos !== -1) {
            this.flagName = flagText.substr(0, mathOpPos).trim();
            this.assignedExpression = flagText.trim();
            this.defaultValue = 0;
        }
        // Simple flag set to true expression
        // e.g. "myFlag"
        else {
            this.flagName = flagText.trim();
            this.assignedExpression = "true";
            this.defaultValue = false;
        }
    }
}
class Stitch {
    constructor(name, data, owner) {
        this.name = name;
        this.textContent = [];
        this.choices = [];
        this.conditions = [];
        this.divert = null;
        this.runOn = false;
        this.flags = [];
        this.image = null;
        this.pageNum = -1;
        this.originalPageNum = -1;
        this.pageLabel = null;
        this.distanceFromHeader = -1;
        this.header = null;
        this.divertBackLinks = [];
        this.choiceBackLinks = [];
        this.owner = owner;
        for (var c of data.content) {
            // Text content
            if (typeof (c) == "string") {
                this.textContent.push(c);
            }
            // Choice
            else if (c.option !== undefined) {
                this.choices.push(new Choice(c));
            }
            // Page num
            else if (c.pageNum !== undefined) {
                this.pageNum = this.originalPageNum = c.pageNum;
            }
            // Page label
            else if (c.pageLabel !== undefined) {
                this.pageLabel = c.pageLabel;
            }
            // ifCondition
            else if (c.ifCondition !== undefined) {
                this.conditions.push(new Condition(c.ifCondition, false));
            }
            // notIfCondition
            else if (c.notIfCondition !== undefined) {
                this.conditions.push(new Condition(c.notIfCondition, true));
            }
            // divert
            else if (c.divert !== undefined) {
                this.divert = c.divert;
            }
            // runOn
            else if (c.runOn !== undefined) {
                this.runOn = true;
            }
            // flag
            else if (c.flagName !== undefined) {
                this.flags.push(new Flag(c.flagName));
            }
            // image
            else if (c.image !== undefined) {
                this.image = c.image;
            }
        }
    }
    eachLinkedStitch(func) {
        if (this.divert !== null) {
            let divertTarget = this.owner.stitchesByName[this.divert];
            func(divertTarget);
        }
        for (let c of this.choices) {
            if (c.linkPath === null)
                continue;
            var choiceTarget = this.owner.stitchesByName[c.linkPath];
            func(choiceTarget);
        }
    }
    get isHeader() {
        return this.distanceFromHeader === 0;
    }
    get divertTarget() {
        if (this.divert)
            return this.owner.stitchesByName[this.divert];
        else
            return null;
    }
}
class Story {
    constructor(json) {
        let data = json.data;
        this.title = json.title;
        this.author = data.editorData.authorName;
        this.optionMirroring = data.optionMirroring;
        this.initialStitchName = data.initial;
        this.stitchesByName = {};
        this.orderedStitches = [];
        for (let stitchName in data.stitches) {
            let stitchData = data.stitches[stitchName];
            let stitch = new Stitch(stitchName, stitchData, this);
            this.stitchesByName[stitchName] = stitch;
            this.orderedStitches.push(stitch);
        }
        this.calculateSectionsAndOrdering();
    }
    get firstStitch() {
        return this.stitchesByName[this.initialStitchName];
    }
    // We use the section labelling in inklewriter to construct
    // ink-style knots. So the first thing is to find a sensible
    // ordering. inklewriter itself does something very similar
    // in order to order the index sidebar.
    calculateSectionsAndOrdering() {
        let originalHeaders = [];
        function searchLinksForSortIndices(stitch, originalHeader, currentDepth) {
            // Explicitly numbered headers get treated specially in the main loop
            if (stitch.originalPageNum >= 0)
                return;
            // Labelled pages are also headers, but we don't know their overall ordering ahead of time
            else if (stitch.pageLabel != null) {
                currentDepth = 0;
            }
            if (stitch.distanceFromHeader === -1 || currentDepth < stitch.distanceFromHeader) {
                stitch.distanceFromHeader = currentDepth;
                // If this is a stitch with a valid pageLabel then strictly speaking it
                // shouldn't have the same page number as the originalHeader, but 
                stitch.pageNum = originalHeader.originalPageNum;
                // Recurse
                stitch.eachLinkedStitch(subStitch => searchLinksForSortIndices(subStitch, originalHeader, currentDepth + 1));
            }
        }
        // First stitch is implicitly a header stitch
        let first = this.firstStitch;
        originalHeaders = this.orderedStitches.filter(s => s.originalPageNum >= 0 || s === first);
        for (let originalHeader of originalHeaders) {
            originalHeader.distanceFromHeader = 0;
            originalHeader.eachLinkedStitch(subStitch => searchLinksForSortIndices(subStitch, originalHeader, 1));
        }
        let unreachedStitches = [];
        // Drop unreached stitches down to the bottom
        for (let stitch of this.orderedStitches) {
            if (stitch.pageNum === -1) {
                stitch.pageNum = 1000000;
                unreachedStitches.push(stitch);
            }
        }
        if (unreachedStitches.length > 0 && !unreachedStitches[0].pageLabel) {
            unreachedStitches[0].pageLabel = "##Unused##";
        }
        // Find the overall linear ordering of the stitches
        this.orderedStitches.sort((s1, s2) => {
            if (s1.pageNum != s2.pageNum)
                return s1.pageNum - s2.pageNum;
            else
                return s1.distanceFromHeader - s2.distanceFromHeader;
        });
        // Extract final ordered sections, and renumber
        let header = null;
        let pageNum = 0;
        for (let stitch of this.orderedStitches) {
            // Either it's an original header or it's a labelled header
            // that needs its own page number now.
            // Or it's the unused page we may have created above
            if (stitch.distanceFromHeader === 0 || stitch.pageLabel === "##Unused##") {
                header = stitch;
                pageNum++;
            }
            stitch.header = header;
            stitch.pageNum = pageNum;
        }
        // Set up backlinks so that we can look both backwards
        // and forwards to see whether stitches are directly
        // linked together and therefore and simply be laid
        // out consecutively in ink.
        for (let stitch of this.orderedStitches) {
            var target = stitch.divertTarget;
            if (target)
                target.divertBackLinks.push(stitch);
            for (let choice of stitch.choices) {
                if (choice.linkPath === null)
                    continue;
                let choiceTarget = this.stitchesByName[choice.linkPath];
                if (choiceTarget)
                    choiceTarget.choiceBackLinks.push(stitch);
            }
        }
    }
}
// Create an ink-compatible name for a stitch/knot/variable name (identifier) from
// an inklewriter stitch / section / flag name, taking in a dictionary of the names
// that have already been taken so that we can prevent collisions using numbering.
function createIdentifierFromString(str, collisionDictionary) {
    let id = "";
    for (let c of str) {
        // Allow a-z etc
        if (c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '_') {
            id += c;
        }
        // Convert whitespace to single '_'
        else if (c == ' ' || c == '\t') {
            if (id.length > 0 && id[id.length - 1] != "_")
                id += "_";
        }
        // skip everything else
    }
    if (id.length > 0 && id[id.length - 1] == "_") {
        id = id.substr(0, id.length - 1);
    }
    // Avoid naming collisions
    let originalId = id;
    let count = 2;
    while (collisionDictionary[id]) {
        id = `${originalId}_${count}`;
        count++;
    }
    return id;
}
// Main conversion function.
function convert(sourceJSON, terminateAllLooseEnds) {
    // Parse Story from the JSON
    var story = new Story(sourceJSON);
    // Final output
    let inkLines = [];
    // Create ink-specific stitch/knot name mappings out of the inklewriter content
    let inklewriterStitchToInkNames = {};
    let inkNamesUsage = {};
    for (let stitch of story.orderedStitches) {
        let inkName = stitch.name;
        if (stitch.isHeader && stitch.pageLabel)
            inkName = createIdentifierFromString(stitch.pageLabel, inkNamesUsage);
        inkNamesUsage[inkName] = true;
        inklewriterStitchToInkNames[stitch.name] = inkName;
    }
    let initialKnotName = inklewriterStitchToInkNames[story.initialStitchName];
    inkLines.push(`// ---- ${sourceJSON.title} ----`);
    inkLines.push(`// Converted from original inklewriter URL:`);
    inkLines.push(`// http://writer.inklestudios.com/stories/${sourceJSON.url_key}`);
    inkLines.push(`# title: ${story.title}`);
    inkLines.push(`# author: ${story.author}`);
    inkLines.push(`// -----------------------------`);
    inkLines.push(``);
    // Convert flag names to VAR names:
    // Flag names can have spaces, so we need to cover them all to proper identifiers
    let flagNamesToVarNames = {};
    let varNamesToFlagNames = {};
    let orderedVarNames = [];
    let defaultValuesByVarName = {};
    for (let s of story.orderedStitches) {
        for (let flag of s.flags) {
            let varName = flagNamesToVarNames[flag.flagName];
            if (!varName) {
                varName = createIdentifierFromString(flag.flagName, varNamesToFlagNames);
                flagNamesToVarNames[flag.flagName] = varName;
                varNamesToFlagNames[varName] = flag.flagName;
                orderedVarNames.push(varName);
            }
            // Infer the data types of the variables
            if (defaultValuesByVarName[varName] === undefined)
                defaultValuesByVarName[varName] = flag.defaultValue;
        }
    }
    // VAR declarations
    for (let varName of orderedVarNames) {
        let assumedDefault = defaultValuesByVarName[varName];
        if (assumedDefault === undefined)
            assumedDefault = false;
        inkLines.push(`VAR ${varName} = ${assumedDefault}`);
    }
    // Anywhere we have logic (e.g. conditionals, inline logic in main text)
    // Do some fixing up to make it valid ink logic.
    function replaceFlagNamesAndUpdateLogic(logicStr) {
        if (logicStr != null && logicStr.length > 0) {
            // Replace flag names with VAR names
            for (let flagName in flagNamesToVarNames) {
                let varName = flagNamesToVarNames[flagName];
                logicStr = logicStr.split(flagName).join(varName);
            }
            // Replace single "=" with double "=="
            // (but not >= or <=!)
            logicStr = logicStr.replace(/([^><])(=)/g, "$1==");
        }
        return logicStr;
    }
    // Divert into first knot
    inkLines.push(``);
    inkLines.push(`-> ${initialKnotName}`);
    inkLines.push(``);
    // We mostly process stitches consecutively, but when there are
    // directly linked stitches we allow them to be "inlined" so that
    // you don't need to use explicit stitch names for them all. Keep
    // track of which ones have already been processed here.
    let processedStitchNames = {};
    // Main conversion function for a single Stitch.
    function processStitch(stitch, stitchIdx) {
        // Has this stitch already been processed?
        if (processedStitchNames[stitch.name])
            return;
        processedStitchNames[stitch.name] = true;
        // Header is always explicitly named as a knot
        // (Header is a stitch that begins a new inklewriter section)
        if (stitch.isHeader) {
            var knotName = inklewriterStitchToInkNames[stitch.name];
            inkLines.push(`\n==== ${knotName} ====`);
        }
        // Do we need to label this stitch?
        else {
            // Directly following on to this stitch?
            if (stitch.divertBackLinks.length === 1 && stitch.divertBackLinks[0].header === stitch.header && stitch.choiceBackLinks.length === 0 && !stitch.isHeader) {
                // no need to print stitch title
            }
            // Otherwise, name this stitch for full linking
            else {
                inkLines.push(`\n= ${inklewriterStitchToInkNames[stitch.name]}`);
            }
        }
        // Content is conditional?
        let isConditional = stitch.conditions.length > 0;
        if (isConditional) {
            let conditionsTexts = stitch.conditions.map(cond => {
                let condTxt = cond.condition;
                condTxt = replaceFlagNamesAndUpdateLogic(condTxt);
                if (cond.isNot)
                    condTxt = "not " + condTxt;
                return condTxt;
            });
            let conditionsStr = conditionsTexts.join(" and ");
            inkLines.push(`{ ${conditionsStr}:`);
        }
        // Image
        if (stitch.image) {
            // New-inky-specific template tag, but could be usable in other environments
            inkLines.push(`# IMAGE: ${stitch.image}`);
        }
        // Main text content for stitch
        // Think there's actually only ever one line...?
        for (let lineIdx = 0; lineIdx < stitch.textContent.length; lineIdx++) {
            let line = stitch.textContent[lineIdx];
            // Update any inline logic
            //  - Flag names to VAR names
            //  - logic tweaks - e.g. "=" to "=="
            let nextSearchPos = 0;
            do {
                let logicPos = line.indexOf("{", nextSearchPos);
                if (logicPos > -1) {
                    let logicEndPos = line.indexOf(":", logicPos);
                    // Might be a sequence rather than normal conditional logic
                    if (logicEndPos === -1)
                        logicEndPos = line.indexOf("}", logicPos);
                    let logicTxt = line.substr(logicPos, logicEndPos - logicPos);
                    // Replace flag names with VAR names
                    let updatedLogicTxt = replaceFlagNamesAndUpdateLogic(logicTxt);
                    let txtBefore = line.substr(0, logicPos);
                    let txtAfter = line.substr(logicEndPos);
                    line = txtBefore + updatedLogicTxt + txtAfter;
                    nextSearchPos = txtBefore.length + updatedLogicTxt.length;
                    // Was that the end of the line?
                    if (txtAfter.length <= 0)
                        nextSearchPos = -1;
                }
                // No logic left
                else {
                    nextSearchPos = -1;
                }
            } while (nextSearchPos !== -1);
            // Italics
            line = line.split("/=").join("<em>");
            line = line.split("=/").join("</em>");
            // Bold
            line = line.split("*-").join("<strong>");
            line = line.split("-*").join("</strong>");
            // Inline value evaluation
            // In inklewriter it looks like this:
            //  [value:varName]
            // In ink it looks like this:
            //  {varName}
            line = line.replace(/\[value:([^\]]+)\]/g, "{$1}");
            // runOn (inklewriter elipsis) == ink-style glue
            let isLastLine = lineIdx === stitch.textContent.length - 1;
            if (isLastLine && stitch.runOn)
                line += " <>";
            // old style runOn that has't be upgraded
            line = line.split("[...]").join("<>");
            if (isConditional)
                line = "    " + line;
            inkLines.push(line);
        }
        // Flags
        // (Evaluation of flags comes AFTER the main content.)
        for (let flag of stitch.flags) {
            let exprWithVars = replaceFlagNamesAndUpdateLogic(flag.assignedExpression);
            let conditionalIndent = isConditional ? "    " : " ";
            inkLines.push(`${conditionalIndent} ~ ${flagNamesToVarNames[flag.flagName]} = ${exprWithVars}`);
        }
        if (isConditional)
            inkLines.push("}");
        // Find the ink-specific target path given the original inklewriter stitch name.
        // Resolve so it's either a simple name or a dot.separated name depending on whether
        // we need to jump between ink knots (inklewriter sections).
        function resolveDivertTargetStr(stitchName, relativeStitch) {
            let targetStitch = story.stitchesByName[stitchName];
            let targetName = inklewriterStitchToInkNames[targetStitch.name];
            if (!targetStitch.isHeader && targetStitch.header !== relativeStitch.header) {
                let targetHeaderName = inklewriterStitchToInkNames[targetStitch.header.name];
                targetName = `${targetHeaderName}.${targetName}`;
            }
            return targetName;
        }
        if (stitch.choices.length > 0 && stitch.divert)
            throw new Error("Got both choices AND a divert? Shouldn't be possible?");
        // Link up choices
        for (let choice of stitch.choices) {
            let conditionsTexts = choice.conditions.map(cond => {
                let condTxt = cond.condition;
                condTxt = replaceFlagNamesAndUpdateLogic(condTxt);
                if (cond.isNot)
                    condTxt = "not " + condTxt;
                return `{${condTxt}} `;
            });
            let conditionsStr = conditionsTexts.join("");
            let targetName = null;
            if (choice.linkPath) {
                targetName = resolveDivertTargetStr(choice.linkPath, stitch);
            }
            let choiceLine = "";
            if (story.optionMirroring)
                choiceLine = `  + ${conditionsStr}${choice.text}`;
            else
                choiceLine = `  + ${conditionsStr}[${choice.text}]`;
            if (targetName) {
                // When options are mirrored it has to be a bit uglier to enforce the newline after the mirrored text
                // When options aren't mirrored we can include the divert on the same line.
                if (story.optionMirroring)
                    choiceLine += `\n       `;
                choiceLine += ` -> ${targetName} `;
            }
            else {
                choiceLine += `\n      TODO: This choice is a loose end.`;
            }
            inkLines.push(choiceLine);
        }
        // Divert (mutually exclusive v.s. choices)
        let nextStitch = null;
        let divertTargetFollowsOnDirectly = false;
        if (stitch.divert) {
            nextStitch = stitch.divertTarget; // stitchIdx < story.orderedStitches.length-1 ? story.orderedStitches[stitchIdx+1] : null;
            divertTargetFollowsOnDirectly = (nextStitch !== null && nextStitch.divertBackLinks.length === 1 && nextStitch.choiceBackLinks.length == 0 && !nextStitch.isHeader && nextStitch.header === stitch.header) ? true : false;
            if (!divertTargetFollowsOnDirectly) {
                let targetName = resolveDivertTargetStr(stitch.divert, stitch);
                inkLines.push(`    -> ${targetName}`);
            }
        }
        // Immediately recurse if we're following straight on to more content 
        // within this current ink stitch/knot
        if (divertTargetFollowsOnDirectly && nextStitch !== null) {
            let nextStitchIdx = story.orderedStitches.indexOf(nextStitch);
            processStitch(nextStitch, nextStitchIdx);
        }
        // Assume all loose ends are complete, or not?
        if (!stitch.divert && stitch.choices.length === 0 && terminateAllLooseEnds) {
            inkLines.push(`    -> END`);
        }
    }
    // Convert all stitches to ink
    for (let stitchIdx = 0; stitchIdx < story.orderedStitches.length; stitchIdx++) {
        let stitch = story.orderedStitches[stitchIdx];
        processStitch(stitch, stitchIdx);
    }
    // Final ink
    return inkLines.join("\n");
}
exports.convert = convert;
//# sourceMappingURL=inklewriter-convert.js.map