var tutorialStory = {
    "name": "inkle's Tutorial Story",
    "story": {
        "stitches": {
            "welcomeToInklewr": {
                "content": ["Welcome to *-inklewriter-*!",
                {
                    "divert": "toGetStartedClic"
                }, {
                    "pageNum": 1
                }, {
                    "pageLabel": "The beginning"
                }]
            },
            "toGetStartedClic": {
                "content": ["To get started, click the grey \"forward\" arrow below. This'll take you to the next paragraph.",
                {
                    "option": "This arrow on the right here?",
                    "linkPath": "thatsTheOneWellD",
                    "parentStitch": "toGetStartedClic",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "(I just want to pick a tutorial.)",
                    "linkPath": "okaySoPickATutor",
                    "parentStitch": "toGetStartedClic",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "thatsTheOneWellD": {
                "content": ["That's the one. Well done! So, what's *-inklewriter-*?*--*",
                {
                    "divert": "wellItsAToolForW"
                }, {
                    "pageNum": 2
                }, {
                    "pageLabel": " Introduction"
                }]
            },
            "wellItsAToolForW": {
                "content": ["Well, it's a tool, for writing interactive stories. ",
                {
                    "option": "What's an interactive story?",
                    "linkPath": "youreReadingOne",
                    "parentStitch": "wellItsAToolForW",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "I get it. Let's get started.",
                    "linkPath": "noProblemThenYou",
                    "parentStitch": "wellItsAToolForW",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "noProblemThenYou": {
                "content": ["No problem, then. You just need to pick a tutorial to read.",
                {
                    "divert": "ifYouveNeverUsed"
                }]
            },
            "youreReadingOne": {
                "content": ["You're reading one!",
                {
                    "divert": "wellThisIsAnUnus"
                }, {
                    "pageNum": 3
                }, {
                    "pageLabel": "Interactive what?"
                }]
            },
            "wellThisIsAnUnus": {
                "content": ["Well, this is an /=unusual=/ one. In most interactive stories, you - the reader - would be telling the story what you want the main character to do, by making choices.",
                {
                    "divert": "butForNowWereTry"
                }]
            },
            "butForNowWereTry": {
                "content": ["But for now, we're trying to learn how it works. So let's get going.",
                {
                    "option": "Okay",
                    "linkPath": "theseShortTutori",
                    "parentStitch": "butForNowWereTry",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "I still don't get it. An example, please?",
                    "linkPath": "ohOkayHereGoesUm",
                    "parentStitch": "butForNowWereTry",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "theseShortTutori": {
                "content": ["These short tutorials will get you started, and show you how to write your first story. Later tutorials will demonstrate some of *-inklewriter-*'s more powerful features.",
                {
                    "divert": "soWhichTutorialW"
                }]
            },
            "soWhichTutorialW": {
                "content": ["So which tutorial would you like to read through first?",
                {
                    "divert": "ifYouveNeverUsed"
                }]
            },
            "ohOkayHereGoesUm": {
                "content": ["Oh, okay. Here goes. Um...",
                {
                    "divert": "theInspectorLook"
                }]
            },
            "theInspectorLook": {
                "content": ["/=The Inspector looks around the room with a cold eye. He's quite sure one of them is hiding something. But which one?=/",
                {
                    "option": "The young man with the limp",
                    "linkPath": "theYoungManWithT",
                    "parentStitch": "theInspectorLook",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "The lady. She's not what she seems.",
                    "linkPath": "theLadySometimes",
                    "parentStitch": "theInspectorLook",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 4
                }, {
                    "pageLabel": " Example story"
                }]
            },
            "theYoungManWithT": {
                "content": ["/=The young man with the limp. He says he has a war wound but he's far too young. More likely, he fell from a high window or a balcony doing something he shouldn't.=/",
                {
                    "divert": "somethingLikeMur"
                }]
            },
            "somethingLikeMur": {
                "content": ["/=Something like murder, perhaps?=/",
                {
                    "option": "\"How's the leg?\"",
                    "linkPath": "howsTheLegTheIns",
                    "parentStitch": "somethingLikeMur",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "\"I didn't catch your name.\"",
                    "linkPath": "iDidntCatchYourN",
                    "parentStitch": "somethingLikeMur",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "theLadySometimes": {
                "content": ["/=The lady. Sometimes intuition is all you have to go on. The Inspector saunter over to her, and place a hand gently on her elbow.=/",
                {
                    "divert": "mrsDeWinterIfIMa"
                }]
            },
            "mrsDeWinterIfIMa": {
                "content": ["/=\"Mrs DeWinter. If I may call you that.\"=/",
                {
                    "divert": "ofCourseYouMaySh"
                }]
            },
            "ofCourseYouMaySh": {
                "content": ["/=\"Of course you may,\" she replies, with gentle surprise.=/",
                {
                    "option": "\"I ask, because it isn't your name.\"",
                    "linkPath": "noPointBeatingAr",
                    "parentStitch": "ofCourseYouMaySh",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "\"Tell me about yourself.\"",
                    "linkPath": "tellMeAboutYours",
                    "parentStitch": "ofCourseYouMaySh",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "howsTheLegTheIns": {
                "content": ["/=\"How's the leg?\" the Inspector asks, casually.=/",
                {
                    "divert": "howDyouThinkTheB"
                }]
            },
            "howDyouThinkTheB": {
                "content": ["/=\"How d'you think?\" the boy replies, with a sullen smile. =/",
                {
                    "divert": "theInspectorIsnt"
                }]
            },
            "theInspectorIsnt": {
                "content": ["/=The Inspector isn't fooled for a second.=/",
                {
                    "option": "So what happens next?",
                    "linkPath": "iDontKnowItWasOn",
                    "parentStitch": "sheSmilesWeaklyI",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "iDidntCatchYourN": {
                "content": ["/=\"I didn't catch your name,\" the Inspector begins.=/",
                {
                    "divert": "cosIDidntGiveItT"
                }]
            },
            "cosIDidntGiveItT": {
                "content": ["/=\"'Cos I didn't give it,\" the boy answers, sullenly. \"Why should I?\"=/",
                {
                    "divert": "theInspectorIsnt"
                }]
            },
            "noPointBeatingAr": {
                "content": ["/=No point beating around the bush. \"I ask,\" he replies, \"simply because it isn't your name.\"=/",
                {
                    "divert": "sheSmilesWeaklyI"
                }]
            },
            "sheSmilesWeaklyI": {
                "content": ["/=She smiles weakly. \"Inspector? Don't be ridiculous.\"=/",
                {
                    "divert": "theInspectorIsnt"
                }]
            },
            "tellMeAboutYours": {
                "content": ["/=\"Tell me about yourself,\" he begins, choosing his words carefully.=/",
                {
                    "divert": "theresNotALotToT"
                }]
            },
            "theresNotALotToT": {
                "content": ["/=\"There's not a lot to tell,\" she replies. \"Not a lot that this house doesn't tell you for itself.\" And she simpers a dreadful laugh.=/"]
            },
            "iDontKnowItWasOn": {
                "content": ["I don't know -- it was only an example. I guess what happens next is that you write your own! So let's have some tutorials.",
                {
                    "option": "Fair enough. Less yak, more action.",
                    "linkPath": "okaySoPickATutor",
                    "parentStitch": "iDontKnowItWasOn",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "okaySoPickATutor": {
                "content": ["Okay. So, pick a tutorial to read.",
                {
                    "divert": "ifYouveNeverUsed"
                }, {
                    "pageNum": -1
                }, {
                    "pageLabel": " Choose a tutorial"
                }]
            },
            "ifYouveNeverUsed": {
                "content": ["If you've never used *-inklewriter -*before, start with the top option.",
                {
                    "option": "Let's begin at the beginning...",
                    "linkPath": "interactiveStori",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Tell me about joining and jumping to...",
                    "linkPath": "inThisTutorialWe",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Tell me about knots and loose ends...",
                    "linkPath": "thisTutorialIsAb",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Tell me about markers...",
                    "linkPath": "nextLetsTalkAbou",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Tell me about widgets...",
                    "linkPath": "nowItsTimeToTalk",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "How do I change the story flow?",
                    "linkPath": "changingTheStory",
                    "parentStitch": "thatsTheOneWellD",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Wait: one last thing. How do I share?",
                    "linkPath": "youCanShareYourS",
                    "parentStitch": "okaySoPickATutor",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 5
                }, {
                    "pageLabel": "Choose a tutorial"
                }]
            },
            "youCanShareYourS": {
                "content": ["You can share your stories with anyone you like. Just click *-share-* and copy the web-address *-inklewriter-* will show to you.",
                {
                    "divert": "thisAddressIsUni"
                }, {
                    "pageNum": 6
                }, {
                    "pageLabel": " Sharing Stories"
                }]
            },
            "thisAddressIsUni": {
                "content": ["This address is unique to you. People using it will be able to read your story, but they won't be able to edit it.",
                {
                    "divert": "inTheFutureWeHop"
                }]
            },
            "inTheFutureWeHop": {
                "content": ["In the future, we hope they'll be able to give you feedback too! But for now, you'll just have to talk about it over *-Twitter-* or something instead.",
                {
                    "option": "Right. Time to write, then",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "inTheFutureWeHop",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "nowDontClickTheS": {
                "content": ["Now, don't click the stitch -- but notice the plus symbol (+). This button will attach that stitch to the current story. ",
                {
                    "divert": "clickThatPlusSym"
                }, {
                    "pageNum": 7
                }, {
                    "pageLabel": "Attach a stitch"
                }]
            },
            "clickThatPlusSym": {
                "content": ["Click that plus symbol now."]
            },
            "changingTheStory": {
                "content": ["Changing the story flow is often important. You might want to add new branches, or extend a part of the story.",
                {
                    "divert": "theMostImportant"
                }, {
                    "pageNum": 8
                }, {
                    "pageLabel": " Changing the Flow"
                }]
            },
            "theMostImportant": {
                "content": ["The most important thing here is the \"unlink\" button. ",
                {
                    "divert": "youllHaveSeenThe"
                }]
            },
            "youllHaveSeenThe": {
                "content": ["You'll have seen the \"unlink\" button popping up now and again. Unlinking is what you do if you want to change your mind about where a stitch should be in the story.",
                {
                    "divert": "ifYouUnlinkAStit"
                }]
            },
            "ifYouUnlinkAStit": {
                "content": ["If you unlink a stitch, it'll be taken out of the story, but it won't get deleted. Instead, it'll be kept in the Stitch Library so you can attach it somewhere else, and it'll also get a delete button, in case you want to get rid of it completely.",
                {
                    "option": "If you want to try it...",
                    "linkPath": "thenClickTheUnli",
                    "parentStitch": "ifYouUnlinkAStit",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Otherwise...",
                    "linkPath": "byUnlinkingStitc",
                    "parentStitch": "ifYouUnlinkAStit",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "thenClickTheUnli": {
                "content": ["...then click the unlink button above this stitch and see what happens."]
            },
            "byUnlinkingStitc": {
                "content": ["By unlinking stitches and using the plus symbol, you can move a stitch from one part of the story to another. And that's how you change the flow!",
                {
                    "option": "Right. Any more tutorials?",
                    "linkPath": "justOne",
                    "parentStitch": "byUnlinkingStitc",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "unlinking!"
                }]
            },
            "justOne": {
                "content": ["Just one. ",
                {
                    "divert": "youCanShareYourS"
                }]
            },
            "absolutelyYoureA": {
                "content": ["Absolutely. You're an expert now, so you'd better write a story!",
                {
                    "divert": "toStartWritingJu"
                }, {
                    "pageNum": 9
                }, {
                    "pageLabel": "Last tutorial"
                }]
            },
            "nextLetsTalkAbou": {
                "content": ["Next let's talk about the tab on the right of this paper. This is a marker. Markers are used to keep track of which branch the reader has read, so you can change what happens later in the story based on what happened earlier.",
                {
                    "option": "Let's see how that works",
                    "linkPath": "letsTryItOutBelo",
                    "parentStitch": "nextLetsTalkAbou",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "This is a marker!"
                }, {
                    "pageNum": 10
                }, {
                    "pageLabel": " Markers"
                }]
            },
            "letsTryItOutBelo": {
                "content": ["Let's try it out. Below are two options that lead to two different stitches, which then join back together. Each one sets a different marker. Try both options (rewinding back to this section to change your route), and see how the options change when the story joins back together.",
                {
                    "option": "Here's one route...",
                    "linkPath": "onThisRouteWellS",
                    "parentStitch": "letsTryItOutBelo",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Here's the other route...",
                    "linkPath": "thisIsTheOtherRo",
                    "parentStitch": "letsTryItOutBelo",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "onThisRouteWellS": {
                "content": ["On this route, we'll set the marker called \"the first route\".",
                {
                    "divert": "thenWellJoinBack"
                }, {
                    "flagName": "the first route"
                }]
            },
            "thenWellJoinBack": {
                "content": ["Then we'll join back together. (You'll need to rewind to the previous section, and try the other route, to complete this tutorial correctly.)",
                {
                    "divert": "nowLetsLookAtThe"
                }, {
                    "pageNum": -1
                }]
            },
            "thisIsTheOtherRo": {
                "content": ["This is the other route. I want you to set the marker on this route. Click the \"add marker\" symbol on the right of this stitch, and enter the marker name \"the second route\".",
                {
                    "divert": "nowLetsLookAtThe"
                }]
            },
            "nowLetsLookAtThe": {
                "content": ["Now let's look at the options below. They both have conditions on them, which control when the reader will see them.",
                {
                    "divert": "theConditionsTes"
                }, {
                    "pageNum": 11
                }, {
                    "pageLabel": " Conditional Options"
                }]
            },
            "theConditionsTes": {
                "content": ["The conditions test whether certain markers have been read, or not.",
                {
                    "option": "This option requires the first marker",
                    "linkPath": "youCanHaveAsMany",
                    "parentStitch": "thenWellJoinBack",
                    "ifFlags": [{
                        "flag": "the first route"
                    }],
                    "notIfFlags": null
                }, {
                    "option": "This option requires the second marker",
                    "linkPath": "youCanHaveAsMany",
                    "parentStitch": "theConditionsTes",
                    "ifFlags": [{
                        "flag": "the second route"
                    }],
                    "notIfFlags": null
                }]
            },
            "youCanHaveAsMany": {
                "content": ["You can have as many markers as you like, so they can be used to keep track of what the reader has seen in the story so far, and so control what options they get given.",
                {
                    "option": "What else is there?",
                    "linkPath": "youCanDoALotOfLo",
                    "parentStitch": "youCanHaveAsMany",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "youCanDoALotOfLo": {
                "content": ["You can do a lot of logic on options. Make a new option and click where it says \"Always show this option\" - it will bring up an interface for adding markers, which have to either be true - or /=not=/ be true - for that option to appear.",
                {
                    "option": "Okay, I get it",
                    "linkPath": "good",
                    "parentStitch": "youCanDoALotOfLo",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "good": {
                "content": ["Good!",
                {
                    "option": "Great. Next!",
                    "linkPath": "nowItsTimeToTalk",
                    "parentStitch": "youCanDoALotOfLo",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Start writing a story",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "youCanDoALotOfLo",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "Markers done!"
                }]
            },
            "interactiveStori": {
                "content": ["Interactive stories are made up of paragraphs of text, like this one, and options, which let the reader choose what to read next. ",
                {
                    "divert": "inInklewriterPar"
                }, {
                    "pageNum": 12
                }, {
                    "pageLabel": "Paragraphs"
                }]
            },
            "inInklewriterPar": {
                "content": ["In *-inklewriter-*, paragrahs of text appear on scraps of paper like this, and you can type into them directly.",
                {
                    "divert": "tryItNowClickOnT"
                }]
            },
            "tryItNowClickOnT": {
                "content": ["Try it now. Click on this box, and edit the text. You can even press Return, and add another paragraph onto the end of this one. ",
                {
                    "option": "When you're ready, click to continue",
                    "linkPath": "afterEachParagra",
                    "parentStitch": "tryItNowClickOnT",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "afterEachParagra": {
                "content": ["After each paragraph, there are options, to decide where the player will go next. Sometimes a paragraph will only have one option, but sometimes, there will be several options. Choosing a different option will cause something different to happen in the story.",
                {
                    "divert": "forInstanceThisP"
                }, {
                    "pageNum": 13
                }, {
                    "pageLabel": "Options"
                }]
            },
            "forInstanceThisP": {
                "content": ["For instance, this paragraph has two options. Let's click the first one for now - and leave the second one for later.",
                {
                    "option": "So first, let's take this option.",
                    "linkPath": "thisParagraphIsC",
                    "parentStitch": "forInstanceThisP",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "If you've come back here, click this",
                    "linkPath": "soNowWereWriting",
                    "parentStitch": "forInstanceThisP",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "thisParagraphIsC": {
                "content": ["This paragraph is connected to the previous one by the option you chose, and if you look back at the previous paragraph, you can see it says it has \"2 links\". That's to help you keep track of where the story branches.",
                {
                    "divert": "whenYoureWriting"
                }]
            },
            "whenYoureWriting": {
                "content": ["When you're writing a branching story, you'll have to write what happens in each branch. Some readers will choose one option, and other readers will choose the other!",
                {
                    "divert": "soWeNeedToBeAble"
                }]
            },
            "soWeNeedToBeAble": {
                "content": ["So we need to be able to move between the different paths that the story can take. The way we do this is by \"rewinding\".",
                {
                    "divert": "scrollUpTheScree"
                }]
            },
            "scrollUpTheScree": {
                "content": ["Scroll up the screen to the previous block of text and click the grey arrow symbol in the top right corner. This will rewind the game to that point, so you can make a different choice."]
            },
            "soNowWereWriting": {
                "content": ["So now we're writing the other branch of the story. Perhaps the protagonist in your story took a different route, or said a different thing to another character. Branches let you make what happens in the story change depending on what the player does.",
                {
                    "option": "Show me an example",
                    "linkPath": "handMeTheMoneySa",
                    "parentStitch": "soNowWereWriting",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "I get it. What's next?",
                    "linkPath": "takeALookAtTheRi",
                    "parentStitch": "soNowWereWriting",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "takeALookAtTheRi": {
                "content": ["Take a look at the right hand side of the screen. That's the Stitch Library, and it lists everything you've written.",
                {
                    "divert": "weCallTheseParag"
                }, {
                    "pageNum": 14
                }, {
                    "pageLabel": "The Stitch Library"
                }]
            },
            "weCallTheseParag": {
                "content": ["(We call these paragraphs of text \"stitches\" because we're \"weaving\" a story, with lots of threads that split apart and tie together.)",
                {
                    "divert": "theStitchLibrary"
                }]
            },
            "theStitchLibrary": {
                "content": ["The Stitch Library lets you keep track of your story, organise it, link it together, and also helps you jump around in it. We'll learn how to do all that in later tutorials but for now, just take a moment to get used to it.",
                {
                    "option": "It's a list. I get it. What now?",
                    "linkPath": "theLastThingYouN",
                    "parentStitch": "weCallTheseParag",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "theLastThingYouN": {
                "content": ["The last thing you need to know to get started is how to make options and new paragraphs yourself. This is really easy.",
                {
                    "divert": "seeBelowWhereItS"
                }]
            },
            "seeBelowWhereItS": {
                "content": ["See below, where it says \"Add option\"? Just click that and it'll make a new blank option for you. Type in the option's text, and then press the arrow to start a new paragraph.",
                {
                    "divert": "tryItBelowAndWhe"
                }]
            },
            "tryItBelowAndWhe": {
                "content": ["Try it below, and when you're done, rewind back to here and choose the Continue option.",
                {
                    "option": "Continue",
                    "linkPath": "soNowYouCouldSta",
                    "parentStitch": "tryItBelowAndWhe",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "soNowYouCouldSta": {
                "content": ["So now you could start writing a story, or read the next tutorial, which is about all the ways that inklewriter will help you bring your story back together after it branches.",
                {
                    "option": "Read that tutorial",
                    "linkPath": "noProblem",
                    "parentStitch": "soNowYouCouldSta",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Start writing!",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "soNowYouCouldSta",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "first tutorial completed!"
                }]
            },
            "noProblem": {
                "content": ["No problem.",
                {
                    "divert": "inThisTutorialWe"
                }]
            },
            "handMeTheMoneySa": {
                "content": ["/='Hand me the money,' says the man in the mask. This is my first day as a bank-clerk. I don't even know where the money is kept! What should I do?=/",
                {
                    "option": "Tell the robber I can't",
                    "linkPath": "imSorryYouReplyI",
                    "parentStitch": "handMeTheMoneySa",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Phone my manager and ask",
                    "linkPath": "illJustCallMyMan",
                    "parentStitch": "handMeTheMoneySa",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 16
                }, {
                    "pageLabel": " Branch example"
                }]
            },
            "imSorryYouReplyI": {
                "content": ["/=\"'I'm sorry,' you reply. 'I can't give you the money because I don't know where it is.'\"=/",
                {
                    "divert": "theRobberLooksFu"
                }]
            },
            "theRobberLooksFu": {
                "content": ["/=The robber looks furious. 'You don't know? Do you know how much trouble I've gone to, in order to stage this robbery? If you don't know, then we'll just have to find someone who does!'=/",
                {
                    "divert": "thisDoesntSoundG"
                }]
            },
            "thisDoesntSoundG": {
                "content": ["/=This doesn't sound good...=/",
                {
                    "divert": "SoLooksLikeYourC"
                }]
            },
            "SoLooksLikeYourC": {
                "content": ["... so looks like your choice has made things worse?",
                {
                    "option": "Oh, dear",
                    "linkPath": "wellThatsTheFunO",
                    "parentStitch": "SoLooksLikeYourC",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": -1
                }]
            },
            "illJustCallMyMan": {
                "content": ["/='I'll just call my manager and ask where the money is,' I say, lifting the phone.=/",
                {
                    "divert": "itSeemsToMakeThe"
                }]
            },
            "itSeemsToMakeThe": {
                "content": ["/=It seems to make the robber very angry, though. His face boils. 'Don't touch that phone!' he shouts.=/",
                {
                    "divert": "SoLooksLikeYourC"
                }]
            },
            "wellThatsTheFunO": {
                "content": ["Well, that's the fun of interactive stories. Everything that happens is down to the reader. So in the example, you might have chosen the other option - and maybe that would have turned out better... or maybe not.",
                {
                    "option": "It's up to the writer, too.",
                    "linkPath": "exactlyTheReader",
                    "parentStitch": "wellThatsTheFunO",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "exactlyTheReader": {
                "content": ["Exactly. The reader and writer work together to tell a story.",
                {
                    "option": "Okay, so, what now?",
                    "linkPath": "takeALookAtTheRi",
                    "parentStitch": "exactlyTheReader",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "inThisTutorialWe": {
                "content": ["In this tutorial, we're going to look at how to join different branches of a story back together again, and how to navigate around larger stories.",
                {
                    "divert": "firstLetsLookAtH"
                }, {
                    "pageNum": 17
                }, {
                    "pageLabel": " Join and Jump"
                }]
            },
            "firstLetsLookAtH": {
                "content": ["First let's look at how we join together two branches of a story. ",
                {
                    "option": "What does that even mean?",
                    "linkPath": "wellHeresAnExamp",
                    "parentStitch": "firstLetsLookAtH",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Okay, show me how",
                    "linkPath": "firstWeNeedAPara",
                    "parentStitch": "firstLetsLookAtH",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Ignore this option for now!",
                    "linkPath": "thereYouAre",
                    "parentStitch": "firstLetsLookAtH",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "wellHeresAnExamp": {
                "content": ["Well, here's an example from a story.",
                {
                    "divert": "jimWasntReallySu"
                }]
            },
            "jimWasntReallySu": {
                "content": ["\"Jim wasn't really sure what to do next. He went over to his friend and said, 'Hullo, Michael.' Michael looked up.\"",
                {
                    "option": "\"Ask Michael what to do.\"",
                    "linkPath": "heyMichaelJimAsk",
                    "parentStitch": "jimWasntReallySu",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "\"Ask Michael what he's doing.\"",
                    "linkPath": "hiMichaelWhatAre",
                    "parentStitch": "jimWasntReallySu",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 18
                }, {
                    "pageLabel": " Join Example"
                }]
            },
            "heyMichaelJimAsk": {
                "content": ["\"'Hey Michael,' Jim asked. 'What should I do?'\"",
                {
                    "divert": "michaelShruggedI"
                }]
            },
            "michaelShruggedI": {
                "content": ["\"Michael shrugged. 'I don't know, Jim. I think we just have to wait until this war is over, and then we can go back home.'",
                {
                    "divert": "michaelAndJimWer"
                }]
            },
            "hiMichaelWhatAre": {
                "content": ["'Hi, Michael. What are you doing?'",
                {
                    "divert": "imJustHangingAro"
                }]
            },
            "imJustHangingAro": {
                "content": ["'I'm just hanging around here until this war is over, and I can go back home.'",
                {
                    "divert": "michaelAndJimWer"
                }]
            },
            "michaelAndJimWer": {
                "content": ["'Michael and Jim were evacuees, which meant they'd been moved out to London to avoid the devastating bombing raids on the city.'",
                {
                    "option": "Did you see what happened?",
                    "linkPath": "well",
                    "parentStitch": "michaelAndJimWer",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 19
                }, {
                    "pageLabel": "It joins here!"
                }]
            },
            "well": {
                "content": ["Well?",
                {
                    "option": "Er, no",
                    "linkPath": "tryRewindingBack",
                    "parentStitch": "well",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Yes, I did!",
                    "linkPath": "goodForYou",
                    "parentStitch": "well",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "tryRewindingBack": {
                "content": ["Try rewinding back through the story and taking the other path. You should see that whatever you chose, the paths branched, and then joined back together.",
                {
                    "divert": "letsSeeHowThatWa"
                }]
            },
            "letsSeeHowThatWa": {
                "content": ["Let's see how that was done.",
                {
                    "divert": "firstWeNeedAPara"
                }, {
                    "pageNum": -1
                }]
            },
            "goodForYou": {
                "content": ["Good for you.",
                {
                    "divert": "letsSeeHowThatWa"
                }]
            },
            "firstWeNeedAPara": {
                "content": ["First, we need a paragraph with two options.",
                {
                    "option": "Here's one - click this",
                    "linkPath": "thisIsTheFirstPa",
                    "parentStitch": "firstWeNeedAPara",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Click this when you've come back",
                    "linkPath": "thisIsTheSecondP",
                    "parentStitch": "firstWeNeedAPara",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 20
                }, {
                    "pageLabel": " How to Join"
                }]
            },
            "thisIsTheFirstPa": {
                "content": ["This is the first path the story might take. Now you've seen it, rewind back to the section above and choose the other option. ",
                {
                    "divert": "ignoreTheRestOfT"
                }]
            },
            "ignoreTheRestOfT": {
                "content": ["Ignore the rest of this paragraph, okay? Rewind now!",
                {
                    "divert": "asIfByMagicThisS"
                }]
            },
            "asIfByMagicThisS": {
                "content": ["As if by magic, this stitch should appear..!",
                {
                    "option": "That worked!",
                    "linkPath": "excellentYouveJu",
                    "parentStitch": "asIfByMagicThisS",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": -1
                }]
            },
            "thisIsTheSecondP": {
                "content": ["This is the second path for the story. Now we want to join it up with the first path.",
                {
                    "divert": "letsBringTheTwoB"
                }]
            },
            "letsBringTheTwoB": {
                "content": ["Let's bring the two branches back together at the stitch that began 'As if by magic...'. Find it in the Stitch List: it should be almost the top one visible on the screen.",
                {
                    "divert": "nowDontClickTheS"
                }]
            },
            "excellentYouveJu": {
                "content": ["Excellent. You've just created your first branched story that rejoins.",
                {
                    "divert": "thePlusButtonCan"
                }, {
                    "pageNum": -1
                }]
            },
            "thePlusButtonCan": {
                "content": ["The plus button can also attach an existing stitch to an option. Try it now if you want to: make a new option, and then click the plus symbol on a stitch in the Stitch List.",
                {
                    "option": "Then rewind here and continue!",
                    "linkPath": "inklewriterHasLo",
                    "parentStitch": "thePlusButtonCan",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 21
                }, {
                    "pageLabel": " Joining Options"
                }]
            },
            "thereYouAre": {
                "content": ["There you are!",
                {
                    "option": "Where's the story gone?",
                    "linkPath": "youreNowReadingA",
                    "parentStitch": "thereYouAre",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 23
                }, {
                    "pageLabel": " Jumping continued"
                }]
            },
            "youreNowReadingA": {
                "content": ["You're now reading a completely different branch of the story. So the old story has been put away, and a new story has been laid out automatically.",
                {
                    "divert": "youCanUseTheJump"
                }]
            },
            "youCanUseTheJump": {
                "content": ["You can use the *-jump-* feature to flick rapidly between different story-paths. This can be really useful for editing all the different paths your story can take.",
                {
                    "divert": "butRememberAllYo"
                }]
            },
            "butRememberAllYo": {
                "content": ["But remember, all your paths can be joined back together using the (+) button in the stitch library. You can attach any stitch to any stitch you like. (You can even make loops, if you want to!)",
                {
                    "option": "Okay. What's next?",
                    "linkPath": "theNextTutorialW",
                    "parentStitch": "butRememberAllYo",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "theNextTutorialW": {
                "content": ["The next tutorial, which is about organising long stories! Or you could start writing.",
                {
                    "option": "Start writing",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "theNextTutorialW",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Read about loose ends and knots",
                    "linkPath": "thisTutorialIsAb",
                    "parentStitch": "theNextTutorialW",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "Join and jumps completed!"
                }]
            },
            "thisTutorialIsAb": {
                "content": ["This tutorial is about *-knots-* and *-loose ends-*. It's pretty short!",
                {
                    "divert": "whenWritingInter"
                }, {
                    "pageNum": 24
                }, {
                    "pageLabel": "Loose ends and knots"
                }]
            },
            "whenWritingInter": {
                "content": ["When writing interactive stories, it's easy to forget which parts you've written, and which you haven't. *-inklewriter-* tries to help by telling you in the stitch library if you've left any loose ends.",
                {
                    "option": "Sounds simple enough",
                    "linkPath": "youShouldBeAbleT",
                    "parentStitch": "whenWritingInter",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Ignore this for now..!",
                    "linkPath": null,
                    "parentStitch": "whenWritingInter",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "youShouldBeAbleT": {
                "content": ["You should be able to see that the section above has \"1 loose end\". You can even see the name of the option (\"ignore this for now..!\")",
                {
                    "divert": "theseLooseEndsAr"
                }, {
                    "pageNum": -1
                }]
            },
            "theseLooseEndsAr": {
                "content": ["These loose ends are actually links - if you hover the mouse over them and click, it'll take you to that option, so you can write it. Try it now, and when you're done, use the \"jump to\" system to find your way back here so you can continue.",
                {
                    "divert": "soJumpBackHereOk"
                }]
            },
            "soJumpBackHereOk": {
                "content": ["So jump back here, okay?",
                {
                    "option": "Okay. What's next?",
                    "linkPath": "seeOnTheLeftOfTh",
                    "parentStitch": "theseLooseEndsAr",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "toStartWritingJu": {
                "content": ["To start writing, just click the *-new -*button in the header. And off you go!",
                {
                    "divert": "ifYouWantToSeeMo"
                }, {
                    "pageNum": 25
                }, {
                    "pageLabel": "Start Writing"
                }]
            },
            "ifYouWantToSeeMo": {
                "content": ["If you want to see more tutorials, just click the *-tutorial-* button at any time."]
            },
            "nowItsTimeToTalk": {
                "content": ["Now it's time to talk about the Widget menu. The widgets are those buttons on the top left of the screen. There's *-bold-* and /=italic=/, and they work the same way as a word-processor: just select some text, and click the button.",
                {
                    "divert": "someWebbrowsersW"
                }, {
                    "pageNum": 26
                }, {
                    "pageLabel": " Widgets"
                }]
            },
            "someWebbrowsersW": {
                "content": ["Some web-browsers will even let you type Ctrl+B for bold and Ctrl+I for italics!",
                {
                    "divert": "theNextWidgetIsA"
                }]
            },
            "theNextWidgetIsA": {
                "content": ["The next widget is a clever one. The symbol is \"...\". Try putting the cursor into this stitch and then clicking the \"...\" widget. [...]",
                {
                    "divert": "toSeeWhatThatsDo"
                }, {
                    "pageNum": 27
                }, {
                    "pageLabel": " The ... widget"
                }]
            },
            "toSeeWhatThatsDo": {
                "content": ["To see what that's done, you'll have to read the story. You can do that at any time by clicking the \"read\" button in the top bar. Try it now, and when you're done, click the \"write\" button again.",
                {
                    "divert": "didYouSeeWhatThe"
                }]
            },
            "didYouSeeWhatThe": {
                "content": ["Did you see what the \"...\" widget did?",
                {
                    "option": "Yes!",
                    "linkPath": "goodWellDoneItCa",
                    "parentStitch": "didYouSeeWhatThe",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "No?",
                    "linkPath": "takeAnotherLookT",
                    "parentStitch": "didYouSeeWhatThe",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "goodWellDoneItCa": {
                "content": ["Good. Well done! It causes the paragraphs of text to \"stick together\". [...]",
                {
                    "divert": "ThisMightNotSeem"
                }]
            },
            "ThisMightNotSeem": {
                "content": [" This might not seem very useful at first, but remember - if we're joining together different branches of a story, this widget lets us stick text together in a continuous way, so it's impossible to tell there was a join.",
                {
                    "option": "So the join is invisible: crafty",
                    "linkPath": "exactlyThatMeans",
                    "parentStitch": "ThisMightNotSeem",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": -1
                }]
            },
            "takeAnotherLookT": {
                "content": ["Take another look. The \"...\" widget sticks the text of one paragraph together with the paragraph that comes next. [...]",
                {
                    "divert": "ThisMightNotSeem"
                }]
            },
            "exactlyThatMeans": {
                "content": ["Exactly! That means your story will feel more \"branchy\" than it is. ",
                {
                    "divert": "iveGotOneMoreTri"
                }]
            },
            "iveGotOneMoreTri": {
                "content": ["I've got one more trick up my sleeve and then I think you should start writing your own story.",
                {
                    "divert": "thisLastTrickIsT"
                }]
            },
            "thisLastTrickIsT": {
                "content": ["This last trick is the most complicated, and the most powerful. It's to do with markers, so first, let's have a choice so we can set some markers.",
                {
                    "divert": "soWhatsYourFavou"
                }]
            },
            "soWhatsYourFavou": {
                "content": ["So: what's your favourite thing to eat of these two?",
                {
                    "option": "Chocolate!",
                    "linkPath": "soYouLikeChocola",
                    "parentStitch": "soWhatsYourFavou",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Strawberries!",
                    "linkPath": "soYouLikeStrawbe",
                    "parentStitch": "soWhatsYourFavou",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": 28
                }, {
                    "pageLabel": " Eating example"
                }]
            },
            "soYouLikeChocola": {
                "content": ["So you like chocolate, huh?",
                {
                    "divert": "thenOnceYouveWri"
                }, {
                    "flagName": "likes chocolate"
                }]
            },
            "soYouLikeStrawbe": {
                "content": ["So you like strawberries, do you?",
                {
                    "divert": "thenOnceYouveWri"
                }, {
                    "flagName": "likes strawberries"
                }]
            },
            "thenOnceYouveWri": {
                "content": ["Then once you've written your first story, your reward should be { likes chocolate :some chocolate|some nice fruit}!",
                {
                    "divert": "thatWeirdThingOn"
                }, {
                    "pageNum": 29
                }, {
                    "pageLabel": " Conditional Text"
                }]
            },
            "thatWeirdThingOn": {
                "content": ["That weird thing on the previous stitch is a \"conditional\". Try it in read mode!",
                {
                    "divert": "dependingOnWheth"
                }]
            },
            "dependingOnWheth": {
                "content": ["Depending on whether that marker has been set, or not been set, it'll write something different into your story. That means you can vary the text of the story depending on what the player has read!",
                {
                    "divert": "theresOneLastWid"
                }]
            },
            "theresOneLastWid": {
                "content": ["There's one last widget to mention.",
                {
                    "option": "What does the &#167; widget do?",
                    "linkPath": "thatWidgetStarts",
                    "parentStitch": "theresOneLastWid",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "pageNum": -1
                }]
            },
            "thatWidgetStarts": {
                "content": ["That widget starts a new knot on whichever stitch you're currently editing. It's there so you can organise your story the way you want to.",
                {
                    "option": "Great. I'd better write a story.",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "thatWidgetStarts",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "option": "Show me the next tutorial.",
                    "linkPath": "thisOnesAboutCha",
                    "parentStitch": "thatWidgetStarts",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "Widgets learned!"
                }, {
                    "pageNum": 30
                }, {
                    "pageLabel": "The &#167; widget"
                }]
            },
            "thisOnesAboutCha": {
                "content": ["This one's about changing the story flow.",
                {
                    "divert": "changingTheStory"
                }]
            },
            "seeOnTheLeftOfTh": {
                "content": ["See on the left of this paper where it says \"About Knots\"? Knots are a way of grouping stitches together. Knots are added automatically, but you can add your own by clicking the tab on the left when it appears.",
                {
                    "divert": "ifInklewriterSta"
                }, {
                    "pageNum": 31
                }, {
                    "pageLabel": "About Knots"
                }]
            },
            "ifInklewriterSta": {
                "content": ["If *-inklewriter-* starts a new knot somewhere you don't like, you can just delete it. (If you point your mouse cursor at a knot, there's a little minus sign for doing that.)",
                {
                    "divert": "youMightNoticeTh"
                }]
            },
            "youMightNoticeTh": {
                "content": ["You might notice that when new knots appear they have ugly names like \"Knot 1\" or \"Knot 53\". You can change these names: just select the text, and type what you want them to be called.",
                {
                    "divert": "youllSeeThatTheS"
                }]
            },
            "youllSeeThatTheS": {
                "content": ["You'll see that the Stitch Library on the right of the screen updates.",
                {
                    "option": "What else can I do with knots?",
                    "linkPath": "wellKnotMuch",
                    "parentStitch": "youllSeeThatTheS",
                    "ifFlags": null,
                    "notIfFlags": null
                }]
            },
            "wellKnotMuch": {
                "content": ["Well, knot much.",
                {
                    "divert": "haHa"
                }, {
                    "pageNum": 32
                }, {
                    "pageLabel": " Terrible Joke"
                }]
            },
            "haHa": {
                "content": ["(Ha ha).",
                {
                    "divert": "youllProbablyNot"
                }]
            },
            "youllProbablyNot": {
                "content": ["You'll probably notice that the Stitch Library shows the knots you're working on but tidies other ones away. If you click the little grey triangle next to the name of a knot, it'll show or hide those stitches.",
                {
                    "divert": "alsoWhenAKnotIsH"
                }]
            },
            "alsoWhenAKnotIsH": {
                "content": ["Also, when a knot is hidden away, there's an arrow symbol. If you click that, you'll jump to the start of that knot.",
                {
                    "divert": "youCouldUseThatN"
                }]
            },
            "youCouldUseThatN": {
                "content": ["You could use that now to jump back to the \"Choose a Tutorial\" knot, to read the next section, if you wanted to.",
                {
                    "option": "Or I could just start writing",
                    "linkPath": "toStartWritingJu",
                    "parentStitch": "youCouldUseThatN",
                    "ifFlags": null,
                    "notIfFlags": null
                }, {
                    "flagName": "Knots and loose ends done!"
                }]
            },
            "inklewriterHasLo": {
                "content": ["*-inklewriter-* has lots of other features to help you write your stories. But the most powerful is the \"jump to\" feature. We'll try that now.",
                {
                    "divert": "itsReallySimpleA"
                }, {
                    "pageNum": 33
                }, {
                    "pageLabel": " Jumping"
                }]
            },
            "itsReallySimpleA": {
                "content": ["It's really simple: all it means is, if you click on any stitch in the library on the right, the editor will take you there! ",
                {
                    "divert": "toTryItOutLetsOp"
                }]
            },
            "toTryItOutLetsOp": {
                "content": ["To try it out, let's open up \"Jumping continued\" in the stitch library (at the top of the screen) and click the stitch called \"There you are!\""]
            }
        },
        "initial": "welcomeToInklewr"
    }
};