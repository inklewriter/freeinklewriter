var tutorialStory = {
        "name": "A Tutorial Story",
        "story": {
            "stitches": {
                "welcomeToInklewr": {
                    "content": ["Welcome to *-inklewriter-*!",
                    {
                        "option": "Click here to continue",
                        "linkPath": "wellItsAToolForW",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "(I just want to pick a tutorial.)",
                        "linkPath": "noProblemMakeSur",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "(I want to ask a quick question.)",
                        "linkPath": "FAQs"
                    }, {
                        "pageNum": 1
                    }, {
                        "pageLabel": "The beginning"
                    }]
                },
                "FAQs": {
                    "content": ["Here are some *-Frequently Asked Questions-*:",
                    {  
                        "option":   "How do I find text in my story?",
                        "linkPath": "HowToFind"
                    },
                    {
                        "option":   "How do I find a place to start writing?",
                        "linkPath": "FindingLooseEnds"
                    },
                    {  
                        "option": "How can I create a loop?",
                        "linkPath": "HowToLoop"
                    },
                    {
                        "option": "How can I stop my loop repeating the same text?",
                        "linkPath": "varyTextInALoop"                    
                    },
                    {
                        "option": "How do I use counters?",
                        "linkPath": "counterSyntax",
                        "writeModeOnly": true
                        
                    },
                    {
                        "option": "How do I use inline conditions?",
                        "linkPath": "inlineSyntax",
                        "writeModeOnly": true
                    },
                    {
                        "option": "How do I print the value of a counter?",
                        "linkPath": "counterPrint",
                        "writeModeOnly": true
                    },
                    {
                        "option": "How do I make text change randomly?",
                        "linkPath": "randomText",
                        "writeModeOnly": true
                    },
                    {
                        "option": "Can I link to another website?",
                        "linkPath": "hyperlinks",
                        "writeModeOnly": true
                    },
                    {
                        "pageNum": 34
                    }, {
                        "pageLabel": "Frequently Asked Questions"
                    }
                    ]
                },

                "counterSyntax": {
                    "content": ["Define a counter using a marker like the one on the right.",   
                    {   "divert": "counterSyntax2" },
                    {
                        "flagName": "counter = 4"
                    }]
                },                
                "counterSyntax2": {
                    "content": ["Add to it, or subtract by using a marker like these ones. If the marker hasn't been defined before you alter it, it'll start from zero.",   
                    {
                        "flagName": "counter + 2"
                    },
                    {
                        "flagName": "counter - 3"
                    },
                    {
                        "option": "And what tests can I perform?",
                        "linkPath": "counterSyntax3"
                    }, 
                    {
                        "option": "That's all I needed to know.",
                        "linkPath": "FAQs"
                    }]
                },                     
                "counterSyntax3": {
                    "content": ["You can test using equals (=), greater than (>), less than (<), at least (>=) and at most (<=). See the condition bar on this paragraph for examples.",
                    {   "ifCondition": "counter < 4" },                    
                    {   "notIfCondition": "other counter >= 7" },
                    {
                        "option": "Okay, thanks.",
                        "linkPath": "FAQs"
                    },
                    {
                        "option": "How do I write the value of a counter in the story?",
                        "linkPath": "counterPrint"
                    }
                    ]
                },                     
                "hyperlinks": {
                    "content": ["Linking is easy: just put the URL in square brackets, like this: [http://www.inklestudios.com]. You can also provide a nice link, by adding some text after a vertical bar: [http://www.inklestudios.com|inkle's website]. You can even link to other *-inklewriter-* stories! Take a look at this in both *-write-* mode and *-read-* mode!",
                    {
                        "option": "That seems to work!",
                        "linkPath": "FAQs"
                    }
                    ]
                }, 
                "counterPrint": {
                    "content": ["You can write out the value of a counter as a number or as words, using [number:numberToPrint] or [value:numberToPrint]. (Try this in *-write-* mode and in *-read-* mode.)",
                    {
                        "flagName": "numberToPrint + 1"
                    },
                    { 
                         "option": "Let's see that counter go up...",
                        "linkPath": "counterPrint"
                    },
                    { 
                         "option": "I get it!",
                        "linkPath": "FAQs"
                    }
                    ]
                },
                "inlineSyntax": {
                    "content": ["Inline conditionals are written into the text by hand. They start with a curled bracket and a flag to test, then a colon, and then some text. You can add alternative text by adding a vertical stroke character (|). The conditional ends with a closing curled bracket.",
                    {   "divert":   "inlineSyntax2" }
                    ]
                },
                "inlineSyntax2": {
                    "content": [ "For example, { Flag A: this only prints if Flag A is true,}  { Flag A: while this has alternatives | this prints if Flag A isn't true}.",                                 
                    {
                        "option": "Can I do more complex tests?",
                        "linkPath": "inlineSyntax3"
                    },
                    {
                        "option": "Okay, got it.",
                        "linkPath": "FAQs"
                    }]
                },         
                "inlineSyntax3": {
                    "content": [ "You can use the keywords *-not-* and *-and-* in your test. So you could write {first flag and second flag and not third flag:a very specific bit of text | and a more common alternative}.",                                 
                    {
                        "option": "Okay, got it.",
                        "linkPath": "FAQs"
                    }]
                },                        
                "varyTextInALoop": {
                    "content": ["Loops are useful for letting the player explore, but they can cause the same text to repeat over and over. We can fix that using counters.",                    
                    {
                        "option": "Read the full tutorial on counters",
                        "linkPath": "variables"
                    },
                    {
                        "option": "Show me how",
                        "linkPath": "varyText2"
                    }]                
                },
                "varyText2": {
                    "content": ["Let's make the next paragraph the top of a loop. We add a marker to it, which will counts how many times the reader has been here. We'll keep it blank; and then add some alternative paragraphs below it.",                    
                    {
                        "divert": "varyTextLoopTop"
                    }, {
                        "pageNum": 36
                    }, {
                        "pageLabel": "Varying Looped Text"
                    }]
                },
                "varyTextLoopTop": {
                    "content": ["",                                        
                    {
                        "flagName": "example loop counter + 1"
                    },
                    {
                        "divert":  "varyTextLoop1"
                    }]
                },
                "varyTextLoop1": {
                    "content": ["This text we'd see first time into the loop. (Remember, you'll only see the effect in *-read-* mode.)",
                    {
                        "ifCondition": "example loop counter = 1"
                    }  ,                                      
                    {
                        "divert":  "varyTextLoop2"
                    }]
                },                
                "varyTextLoop2": {
                    "content":["And this would be produced on the second time.",
                    {
                        "ifCondition": "example loop counter = 2"
                    } ,                                       
                    {
                        "divert":  "varyTextLoop3"
                    }]
                },
                "varyTextLoop3": {
                    "content": ["And this one every time after that. (Or you could miss out this paragraph, and have no text appear at all, just the options.",
                    {
                        "ifCondition": "example loop counter > 2"
                    }  ,                                      
                    {
                        "option":  "Let's loop around",
                        "linkPath": "varyTextLoopTop"
                    },
                    {
                        "option": "Enough looping!",
                        "linkPath": "randomTextToo",
                        "ifConditions": [{
                            "ifCondition": "example loop counter > 1"
                        }]}]
                }, 
                "randomTextToo": {
                    "content":["You could also use random text, by putting different options into curly braces, and adding a ~ mark at the start to turn on 'shuffle mode'.",
                    {
                        "divert":  "randomTextToo2"
                    }]
                },
                "randomText": {
                    "content":["You can make *-inklewriter-* choose from a list of of alternative things to print using curly braces and a ~ mark. You can even put these inside each other! Here's an example.",
                    {
                        "divert":  "randomTextToo2"
                    }]
                },
                "randomTextToo2": {
                    "content":["{~For example, you might|So you could, maybe|So one thing you could do is} {~change|vary|alter} the text {~a {~little|bit}|lots and lots}!",
                    {   "divert": "randomTextToo3"}
                    ]
                },
                "randomTextToo3": {
                    "content":["(Take a look at this in both *-write-* mode and *-read-* mode to see what it does.)",
                    {
                        "option": "Let's see this a different way...",
                        "linkPath": "randomTextToo2"
                    },
                    {
                        "option": "Enough randomness!",
                        "linkPath": "FAQs"
                    }]
                },
                "FindingLooseEnds": {
                    "content": ["If you've written your story, you may still have extra branches to add. These are called 'loose ends', and if you've written the options for them, they'll appear in red in the *-Contents-* pane. This should make them easy to find.",
                    {
                        "divert": "FindingLooseEnds2"
                    }]
                },
                "FindingLooseEnds2": {
                    "content": ["You can even click on them in the *-Contents-* pane, and this will take you directly to where you need to start writing!",
                    {                   
                        "divert": "FindingLooseEnds3"
                    }]
                },
                "FindingLooseEnds3": {
                    "content": ["So it's a good idea when writing to make all the options as you go; then they're easier to go back and fill in.",                    
                    {
                        "option": "Okay, thanks.",
                        "linkPath": "FAQs"
                    }]
                },
                "HowToLoop": {
                    "content": ["Loops are often useful for creating 'hubs' in the story, that the reader can revisit to review information, or re-read something. To make a loop, you'll need to use the *-Join-* feature.",
                    {
                        "divert": "HowToLoop2"
                    }]
                },
                "HowToLoop2": {
                    "content": ["Write the story as normal until you want to create the loop. Then make a new blank paragraph and click the *-Join-* button below. (This will only appear if there are no options from this paragraph.)",
                    {  
                        "divert": "HowToLoop3"
                    }]
                }, 
                "HowToLoop3": {
                    "content": ["Clicking *-Join-* will bring out the contents window, if it's not already visible. Scroll through and click the paragraph to join to. Try it now - join this paragraph back up to the Frequently Asked Questions paragraph."]
                },
                "HowToFind": {
                    "content": ["As your story gets longer, navigating it can become more difficult. So *-inklewriter-* provides lots of ways of getting around.",
                    {
                        "divert": "HowToFind2"
                    }]
                },  
                "HowToFind2": {
                    "content": ["Firstly, there's the *-Contents-* pane. You can open this using the button in the toolbar. This lists all the paragraphs you've written, and you can click on any to jump straight there.",
                    {
                        "divert": "HowToFind3"
                    }]
                },  
                "HowToFind3": {
                    "content": ["If you can't find the paragraph you want, use the search box at the top of the *-Contents-* pane. Typing here will filter the list to just those containing the text you want.",
                    /*
                    {
                        "divert": "HowToFind4"
                    }]
                },  
                "HowToFind4": {
                    "content": ["Finally, you can use the *-map-*. This brings up a picture of the current story section. Double-clicking on a paragraph will take you there. You can also move to other sections and explore your way through the story.",
                    */
                    {
                        "option": "I've got more questions.",
                        "linkPath": "FAQs"
                    },
                    {   
                        "option": "I want to see a full tutorial.",
                        "linkPath": "noProblemMakeSur"
                    }
                    ]
                },  
                "noProblemMakeSur": {
                    "content": ["No problem. Make sure you're in *-write-* mode, then click the arrow to continue.",
                    {
                        "option": "Choose a tutorial",
                        "linkPath": "ifYouveNeverUsed",
                        "writeModeOnly": true,
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "wellItsAToolForW": {
                    "content": ["*-inklewriter-* is a tool for writing interactive stories. ",
                    {
                        "option": "What's an interactive story?",
                        "linkPath": "youreReadingOne",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "I get it. Let's get started.",
                        "linkPath": "noProblemThisTut",
                        "ifConditions": null,
                        "notIfConditions": null
                    },{
                        "pageNum": 2
                    }, {
                        "pageLabel": "Introduction"
                    }]
                },
                "youreReadingOne": {
                    "content": ["What is an interactive story? Well, you're reading one!",
                    {
                        "divert": "wellThisIsAnUnus"
                    }, {
                        "pageNum": 3
                    }, {
                        "pageLabel": "Interactive what?"
                    }]
                },
                "wellThisIsAnUnus": {
                    "content": ["Except of course, this isn't really a story. This is a tutorial. In most interactive stories, you - the reader - would be telling the story what you want the main character to do, by making choices.",
                    {
                        "divert": "butForNowWereTry"
                    }]
                },
                "butForNowWereTry": {
                    "content": ["But for now, we're trying to learn how it works. So let's get going.",
                    {
                        "option": "Okay",
                        "linkPath": "noProblemThisTut",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "I still don't get it. An example, please?",
                        "linkPath": "ohOkayHereGoesUm",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "The lady. She's not what she seems.",
                        "linkPath": "theLadySometimes",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 4
                    }, {
                        "pageLabel": "Example story"
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "\"I didn't catch your name.\"",
                        "linkPath": "iDidntCatchYourN",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "theLadySometimes": {
                    "content": ["/=The lady. Sometimes intuition is all you have to go on. The Inspector saunters over to her, and places a hand gently on her elbow.=/",
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "\"Tell me about yourself.\"",
                        "linkPath": "tellMeAboutYours",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
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
                    "content": ["/=\"There's not a lot to tell,\" she replies. \"Not a lot that this house doesn't tell you for itself.\" And she simpers a dreadful laugh.=/",
                    {
                        "option": "What happens next?",
                        "linkPath": "iDontKnowItWasOn",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "iDontKnowItWasOn": {
                    "content": ["I don't know -- it was only an example. I guess what happens next is that you write your own! So let's have some tutorials.",
                    {
                        "option": "Fair enough. Less yak, more action.",
                        "linkPath": "noProblemThisTut",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "noProblemThisTut": {
                     "content": ["This tutorial starts off in *-Read-* mode. This is how readers will see your story. But to edit it, you need to be in *-Write-* mode. Switch over now, using the button on the right-hand side of the menu bar.",
                    {
                        "option": "Click the arrow on this tab when ready",
                        "writeModeOnly": true,
                        "linkPath": "youreNowInWriteM",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "youreNowInWriteM": {
                    "content": ["You're now ready to start working through the tutorials. You'll only need to read the first two to get started - later tutorials demonstrate some more powerful features.",
                    {
                        "divert": "ifYouveNeverUsed"
                    }]
                },
                "ifYouveNeverUsed": {
                    "content": ["If you've never used *-inklewriter -*before, start with the top option.",
                    {
                        "option": "Let's begin at the beginning...",
                        "linkPath": "interactiveStori",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Tell me about joining and jumping to...",
                        "linkPath": "inThisTutorialWe",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Tell me about sections and loose ends...",
                        "linkPath": "thisTutorialIsAb",
                        "ifConditions": null,
                        "notIfConditions": null
                    },  
                    {
                        "option": "Tell me about markers...",
                        "linkPath": "nextLetsTalkAbou",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, 
                    {
                        "option": "Tell me about widgets...",
                        "linkPath": "nowItsTimeToTalk",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "How do I change the story flow?",
                        "linkPath": "changingTheStory",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Wait: one last thing. How do I share?",
                        "linkPath": "youCanShareYourS",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "pageLabel": "Sharing stories"
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "nowDontClickTheS": {
                    "content": ["Let's join to the paragraph that begins, 'As if by magic'. It should be almost the top one visible on the screen.",
                    {
                        "divert": "clickThatPlusSym"
                    } 
                    ]
                },
                "clickThatPlusSym": {
                    "content": ["If you point to it with your mouse, you'll see a 'ghost' version of the join you're about to make. And if you click, the join will be made. Do that now, and..."]
                },
                "changingTheStory": {
                    "content": ["Changing the story flow is often important. You might want to add new branches, or extend a part of the story.",
                    {
                        "divert": "theMostImportant"
                    }, {
                        "pageNum": 8
                    }, {
                        "pageLabel": "Changing the flow"
                    }]
                },
                "theMostImportant": {
                    "content": ["The most important thing here is the \"unlink\" button. ",
                    {
                        "divert": "youllHaveSeenThe"
                    }]
                },
                "youllHaveSeenThe": {
                    "content": ["You'll have seen the \"unlink\" button popping up now and again. Unlinking is what you do if you want to change your mind about where a paragraph should be in the story.",
                    {
                        "divert": "ifYouUnlinkAStit"
                    }]
                },
                "ifYouUnlinkAStit": {
                    "content": ["If you unlink a paragraph, it'll be taken out of the story, but it won't get deleted. Instead, it'll be kept in the *-Contents-* so you can attach it somewhere else, and it'll also get a delete button, in case you want to get rid of it completely.",
                    {
                        "option": "If you want to try it...",
                        "linkPath": "thenClickTheUnli",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Otherwise...",
                        "linkPath": "byUnlinkingStitc",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "thenClickTheUnli": {
                    "content": ["... click the unlink button above this paragraph. The story will scroll back to the last paragraph, and the option that took you to this paragraph will now be unattached. Finally, this paragraph will be moved to the top of the *-Contents-* and marked as 'unused'. (You can always put it back again using joins.)"]
                },
                "byUnlinkingStitc": {
                    "content": ["By unlinking paragraphs and using joins, you can move a paragraph from one part of the story to another. And that's how you change the flow!",
                    {
                        "option": "Right. Any more tutorials?",
                        "linkPath": "justOne",
                        "ifConditions": null,
                        "notIfConditions": null
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
                "nextLetsTalkAbou": {
                    "content": ["Next let's talk about the tab on the right of this paper. This is a *-marker-*. Markers are used to keep track of which branches the reader has read, so you can change what happens later in the story based on what happened earlier.",
                    {
                        "option": "Let's see how that works",
                        "linkPath": "letsTryItOutBelo",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "flagName": "A marker!"
                    }, {
                        "pageNum": 10
                    }, {
                        "pageLabel": "Markers"
                    }]
                },
                "letsTryItOutBelo": {
                    "content": ["Let's try it out. Below are two options that lead to two different paragraphs, which then join back together. Each one sets a different marker. Try both options (rewinding back to this section to change your route), and see how the options change when the story joins back together.",
                    {
                        "option": "Here's one route...",
                        "linkPath": "onThisRouteWellS",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Here's the other route...",
                        "linkPath": "thisIsTheOtherRo",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "divert": "lookInReadMode"
                    }, {
                        "pageNum": -1
                    }]
                },
                "thisIsTheOtherRo": {
                    "content": ["This is the other route. I want you to set the marker on this route. Click the \"add marker\" symbol on the right of this paragraph, and enter the marker name \"the second route\".",
                    {
                        "divert": "lookInReadMode"
                    }]
                },
                "lookInReadMode": {
                    "content": ["Now take a look in *-read-* mode. The marker passed appears on the right. This is to help you test your story, but your readers won't be able to see these markers when you share the story.",
                    {
                        "option": "Now go back to write mode and continue",
                        "linkPath": "nowLetsLookAtThe",
                         "writeModeOnly": true
                    }]
                },
                "nowLetsLookAtThe": {
                    "content": ["Now let's look at the options below. They both have conditions on them, which control when the reader will see them.",
                    {
                        "divert": "theConditionsTes"
                    }, {
                        "pageNum": 11
                    }, {
                        "pageLabel": "Conditional options"
                    }]
                },
                "theConditionsTes": {
                    "content": ["The conditions test whether certain markers have been read, or not.",
                    {
                        "option": "This option requires the first marker",
                        "linkPath": "ConditionalsBackUp",
                        "ifConditions": [{
                            "ifCondition": "the first route"
                        }],
                        "notIfConditions": null
                    }, {
                        "option": "This option requires the second marker",
                        "linkPath": "whenYouRewind",
                        "ifConditions": [{
                            "ifCondition": "the second route"
                        }],
                        "notIfConditions": null
                    }]
                },
                "ConditionalsBackUp": {
                    "content": [ "You took the first route. So now I'll loop, so you can take the other route instead. But first we'd better unset that first route marker.",
                    {   "divert": "letsTryItOutBelo"
                    }, {
                        "flagName": "the first route = false"
                    }]
                },
                "whenYouRewind": {
                    "content": ["We can remove a marker again by setting it to 'false'. (Rewinding also removes markers, but remember, your readers won't be able to rewind the story.)",
                    {
                        "option": "So markers track choices?",
                        "linkPath": "youCanHaveAsMany"
                    }, {
                        "flagName": "a marker = false"
                    }
                    ]
                },
                "youCanHaveAsMany": {
                    "content": ["Exactly. You can have as many markers as you like, so they can be used to keep track of what the reader has seen in the story so far, and so control what options they get given.",
                    {
                        "option": "And how do I test for markers?",
                        "linkPath": "youCanDoALotOfLo",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "youCanDoALotOfLo": {
                    "content": ["Use the conditional widget (the /=if=/ button) to add logic to a paragraph or option. Let's try it now. Make a new option and click that widget to add a logic bar.",
                    {
                        "divert": "LogicNextStep"
                    }
                    ]
                },
                "LogicNextStep": {
                    "content": ["Click where it says \"Always show this option\" and it will bring up an interface for adding tests, which have to either be passed - or /=not=/ be passed - for the option to appear. Try it now - and try it in *-read-* mode too!",
                    {
                        "option": "Okay, I get it",
                        "linkPath": "inlineTests",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "inlineTests": {
                    "content": [ "You can also add logic to a paragraph, and that paragraph will only appear if the logic is passed. Try it now: add a condition to this paragraph that isn't true (like passing a marker that is never set) and switch to the *-read-* mode to see it vanish.",
                    {
                        "option": "So logic can alter text and options",
                        "linkPath": "inlineTests2"
                    }] 
                },
                "inlineTests2": {
                    "content": [ "There's one more powerful trick we can pull as well. Remember before, when we passed either the first route or the second route markers? Well, you took {the first route: the first | the second }.",
                    {
                        "divert": "tryThatInReadModeInline"
                    },
                    {   "pageNum": 35               },
                    {   "pageLabel": "Inline Logic" }
                    ]
                },
                "tryThatInReadModeInline": {
                    "content": [ "That thing in curly brackets is an *-inline conditional-*. That lets you alter the text /=inside=/ a paragraph based on logic. Take a look in *-read-* mode now.",
                    {
                        "option": "Only one of the alternatives appears.",
                        "linkPath": "ExactlyInline"
                    }]
                },
                "ExactlyInline" : {
                    "content": [ "Exactly. This is great for \"colour text\", like changing how a character speaks or what pronoun to use for the player.",
                    {
                        "option": "I get it.",
                        "linkPath": "variables"
                    }, {
                        "option": "Example, please?",
                        "linkPath": "inlineExample"
                    }
                    ]
                },
                "inlineExample": {
                    "content": ["Firstly, are you a boy or a girl?",
                    {
                        "option": "Boy!",
                        "linkPath": "IEboy"
                    },
                    {
                        "option": "Girl!",
                        "linkPath": "IEgirl"
                    },
                    {
                        "option": "I prefer not to say...",
                        "linkPath": "IEmystery"
                    },                    
                    {
                        "pageNum": 37
                    }, {
                        "pageLabel": "Inline logic example"
                    }
                    ]
                },
                "IEboy" : {
                    "content": [ "A male of the human species. Noted.",
                    {   "flagName": "boy"
                    }, 
                    {   "divert": "IEnext"
                    }]
                },
                "IEgirl" : {
                    "content": [ "A female of the human species. Noted.",
                    {   "flagName": "girl"
                    }, 
                    {   "divert": "IEnext"
                    }]
                },
                "IEmystery" : {
                    "content": [ "Ah, a figure of mystery. Noted.",
                    {   "flagName": "mystery"
                    }, 
                    {   "divert": "IEnext"
                    }]
                },                                
                "IEnext" : {
                    "content": [ "Secondly, do you eat beans?",
                    {   "option": "Er, yes?",
                        "linkPath": "IEbeans"
                    }, 
                    {   "option": "No. Yuk.",
                        "linkPath": "IEbeansno"
                    }                    
                    ]
                },
                "IEbeans" : {
                    "content": [ "Good thing, old bean. Very good.",
                    {   "flagName": "likes beans"
                    }, 
                    {   "divert": "IEdone"
                    }]
                },                    
                "IEbeansno" : {
                    "content": [ "Not a bean fan. Very good.",
                    {   "divert": "IEdone"
                    }]
                },  
                "IEdone" : {
                    "content": [ "So, you're a {boy:man|{girl:girl|mysterious figure}} who thinks beans are {likes beans:, at least, okay | nasty }. Good to meet you.",
                    {   "divert": "IEdone2"
                    }]
                },   
                "IEdone2" : {
                    "content": [ "(Read this in *-read-* mode!)",
                    {   "option": "I get it. Let's move on.",
                        "linkPath": "variables"
                    }
                    ]
                },                                 
                "variables" : {
                    "content": [ "There's one last type of marker and test, and that's using counters. This keeps track of a number: maybe how many times the reader has seen a certain character, or how many clues they're collected.",
                    {
                        "divert": "variables2"
                    }, {
                        "pageNum": 38
                    }, {
                        "pageLabel": "Counters"
                    }                  
                    ]
                },                
                 "variables2" : {
                    "content": [ "Setting up a counter is easy: just make a marker and give it a value. There's an example on the right of this paragraph.",
                     {
                        "flagName": "my counter = 1"    
                    },{
                        "flagName": "my other counter = 10"    
                    },
                     {
                        "option":   "You can test the value of a counter",
                        "linkPath": "variables3",
                        "ifConditions": [{
                            "ifCondition": "my counter = 1"
                        }]
                    },
                     {
                        "option":   "This option uses a not condition",
                        "linkPath": "variables3",
                        "notIfConditions": [{
                            "notIfCondition": "my other counter = 5"
                        }]
                    }
                    ]
                },                  
                "variables3" : {
                    "content": [ "You can also increase or decrease a counter's value.",
                    {
                        "flagName": "my counter + 1"
                    },
                    {
                        "flagName": "my other counter - 2"
                    },
                    {
                        "option": "And you can test for inequalities",
                        "linkPath": "logicDone",
                        "ifConditions": [{
                            "ifCondition": "my counter >= 2"
                        }]
                    },
                    {
                        "option": "And that's it for conditionals?",
                        "linkPath": "logicDone",
                        "notIfConditions": [{
                            "notIfCondition": "my other counter <= 9"
                        }]                                                
                    }
                    ]
                },                    
                "logicDone": {
                    "content": ["And that's how you use logic!",
                    {
                        "option": "Great. Next!",
                        "linkPath": "nowItsTimeToTalk",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Start writing a story",
                        "linkPath": "toStartWritingJu",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "flagName": "Markers done!"
                    }]
                },
                "interactiveStori": {
                    "content": ["Interactive stories are made up of paragraphs of text, like this one, and options, which let the reader choose what to read next. ",
                    {
                        "option": "This is an option",
                        "linkPath": "inInklewriterPar",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "inInklewriterPar": {
                    "content": ["In *-inklewriter-*, paragraphs of text appear on scraps of paper like this, and you can type into them directly.",
                    {
                        "divert": "tryItNowClickOnT"
                    }]
                },
                "tryItNowClickOnT": {
                    "content": ["Try it now. Click on this box, and edit the text. You can even press Return, and add another paragraph onto the end of this one. ",
                    {
                        "option": "When you're ready, click to continue",
                        "linkPath": "afterEachParagra",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "afterEachParagra": {
                    "content": ["After each paragraph, there are options, to decide where the reader will go next. Sometimes a paragraph will only have one option, but sometimes, there will be several options. Choosing a different option will cause something different to happen in the story.",
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "If you've come back here, click this",
                        "linkPath": "soNowWereWriting",
                        "ifConditions": null,
                        "notIfConditions": null
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
                    "content": ["Scroll up the screen to the previous block of text and click the grey arrow symbol in the top right corner. This will rewind the story to that point, so you can make a different choice."]
                },
                "soNowWereWriting": {
                    "content": ["So now we're writing the other branch of the story. Perhaps the protagonist in your story took a different route, or said a different thing to another character. Branches let you make what happens in the story change depending on what the reader does.",
                    {
                        "option": "Show me an example",
                        "linkPath": "handMeTheMoneySa",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "I get it. What's next?",
                        "linkPath": "takeALookAtTheRi",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "takeALookAtTheRi": {
                    "content": ["Next, let's explore the *-Contents-*. The *-Contents-* is where every bit of text you write is stored away, ready for when you might need it. The *-Contents-* helps you find your way around the story, join up its branches, and keep organised.",
                    {
                        "divert": "theStitchLibrary"
                    }, {
                        "pageNum": 14
                    }, {
                        "pageLabel": "The Contents List"
                    }]
                },
                "theStitchLibrary": {
                    "content": ["By default, the contents pane is hidden, but you can display it by clicking the *-Contents-* button in top right of the menu bar. Click it now.",
                    {
                        "option": "It's a list. I get it. What now?",
                        "linkPath": "theLastThingYouN",
//                        "linkPath": "theMap",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
/*                
                "theMap": {
                    "content": ["The other way to see how your story is laid out is the *-Map-*. This draws a picture of the current section of your story, showing how it all links together. Try it now using the *-Map-* button.",
                    {
                        "option": "That seemed straight-forward.",
                        "linkPath": "mapOptA",
                        "ifConditions": null,
                        "notIfConditions": null
                    },
                    {
                        "option": "That seemed confusing.",
                        "linkPath": "mapOptB",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 15
                    }, {
                        "pageLabel": "The Map"
                    }]
                },    
                "mapOptA": {
                    "content": ["Great! The map can be useful when you've got a lot of branching and rejoining in your story, by letting you see how all the threads tie-up at a glance. But remember, it'll only show you one section at a time.",
                    {
                        "divert": "mapJoinPoint"
                    }]
                },
                "mapOptB": {
                    "content": ["Every paragraph in your story is a box, and the lines show how the paragraphs connect together. In general, you read the map from top-to-bottom as you work your way through the story.",
                    {
                        "divert": "mapOptBPartB"
                    }]
                },
                "mapOptBPartB": {
                    "content": ["Of course, in some stories, the map can get pretty complicated, if there are a lot of branches and joining together. If the map gets too complex it probably means you need to add a new section. There will be more on that later.",
                    {
                        "divert": "mapJoinPoint"
                    }]
                },
                "mapJoinPoint": {
                    "content": ["For now, though, let's move on.",
                    {
                        "option": "Okay, I'm with you.",
                        "linkPath": "theLastThingYouN",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },  
*/                          
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "soNowYouCouldSta": {
                    "content": ["So now you could start writing a story, or read the next tutorial, which is about all the ways that inklewriter will help you bring your story back together after it branches.",
                    {
                        "option": "Read that tutorial",
                        "linkPath": "noProblem",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Start writing!",
                        "linkPath": "toStartWritingJu",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Phone my manager and ask",
                        "linkPath": "illJustCallMyMan",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 16
                    }, {
                        "pageLabel": "Branch example"
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
                    "content": ["... so it looks like your choice has made things worse?",
                    {
                        "option": "Oh, dear",
                        "linkPath": "wellThatsTheFunO",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "exactlyTheReader": {
                    "content": ["Exactly. The reader and writer work together to tell a story.",
                    {
                        "option": "Okay, so, what now?",
                        "linkPath": "takeALookAtTheRi",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "inThisTutorialWe": {
                    "content": ["In this tutorial, we're going to look at how to join different branches of a story back together again, and how to navigate around larger stories.",
                    {
                        "divert": "firstLetsLookAtH"
                    }, {
                        "pageNum": 17
                    }, {
                        "pageLabel": "Join and jump"
                    }]
                },
                "firstLetsLookAtH": {
                    "content": ["First let's look at how we join together two branches of a story. ",
                    {
                        "option": "What does that even mean?",
                        "linkPath": "wellHeresAnExamp",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Okay, show me how",
                        "linkPath": "firstWeNeedAPara",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Ignore this option for now!",
                        "linkPath": "thereYouAre",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "wellHeresAnExamp": {
                    "content": ["Well, here's an example from a story.",
                    {
                        "divert": "jimWasntReallySu"
                    }]
                },
                "jimWasntReallySu": {
                    "content": ["/=Jim wasn't really sure what to do next. He went over to his friend and said, 'Hullo, Michael.' Michael looked up.=/",
                    {
                        "option": "Ask Michael what to do.",
                        "linkPath": "heyMichaelJimAsk",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Ask Michael what he's doing.",
                        "linkPath": "hiMichaelWhatAre",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 18
                    }, {
                        "pageLabel": "Join example"
                    }]
                },
                "heyMichaelJimAsk": {
                    "content": ["/='Hey Michael,' Jim asked. 'What should I do?'=/",
                    {
                        "divert": "michaelShruggedI"
                    }]
                },
                "michaelShruggedI": {
                    "content": ["/=Michael shrugged. 'I don't know, Jim. I think we just have to wait until this war is over, and then we can go back home.'=/",
                    {
                        "divert": "michaelAndJimWer"
                    }]
                },
                "hiMichaelWhatAre": {
                    "content": ["/='Hi, Michael. What are you doing?'=/",
                    {
                        "divert": "imJustHangingAro"
                    }]
                },
                "imJustHangingAro": {
                    "content": ["/='I'm just hanging around here until this war is over, and I can go back home.'=/",
                    {
                        "divert": "michaelAndJimWer"
                    }]
                },
                "michaelAndJimWer": {
                    "content": ["/='Michael and Jim were evacuees, which meant they'd been moved out to London to avoid the devastating bombing raids on the city.'=/",
                    {
                        "option": "Did you see what happened?",
                        "linkPath": "tryRewindingBack",
//                        "linkPath": "well",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
/*            
                "well": {
                    "content": ["Well? (If you want a hint, try clicking the *-map-* option in the menu bar. That'll show you a picture of how the current section of paragraphs are connected together.)",
                    {
                        "option": "Er, no",
                        "linkPath": "tryRewindingBack",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Yes, I did!",
                        "linkPath": "goodForYou",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "goodForYou": {
                    "content": ["Good for you.",
                    {
                        "divert": "letsSeeHowThatWa"
                    }]
                },                
*/                
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
                "firstWeNeedAPara": {
                    "content": ["First, we need a paragraph with two options.",
                    {
                        "option": "Here's one - click this",
                        "linkPath": "thisIsTheFirstPa",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Click this when you've come back",
                        "linkPath": "thisIsTheSecondP",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 20
                    }, {
                        "pageLabel": "How to join"
                    }]
                },
                "thisIsTheFirstPa": {
                    "content": ["This is the first path the story might take. Now you've seen it, rewind back to the section above and choose the other option. ",
                    {
                        "divert": "ignoreTheRestOfT"
                    }]
                },
                "ignoreTheRestOfT": {
                    "content": ["Ignore the rest of this section, okay? Rewind now!",
                    {
                        "divert": "asIfByMagicThisS"
                    }]
                },
                "asIfByMagicThisS": {
                    "content": ["As if by magic, this text should appear..!",
                    {
                        "option": "That worked!",
                        "linkPath": "excellentYouveJu",
                        "ifConditions": null,
                        "notIfConditions": null
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
                    "content": ["First, click the tab below this section that reads \"Join up to an existing paragraph\". Then, look in the *-Contents-* for the paragraph you want.",
                    {
                        "divert": "nowDontClickTheS"
                    }]
                },
                "excellentYouveJu": {
                    "content": ["Excellent. You've just created your first branched story that rejoins.",
                    {
                        "divert": "inklewriterHasLo"
                    }, {
                        "pageNum": -1
                    }]
                },
                "thereYouAre": {
                    "content": ["There you are!",
                    {
                        "option": "Where's the story gone?",
                        "linkPath": "youreNowReadingA",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": 23
                    }, {
                        "pageLabel": "Jumping continued"
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
                    "content": ["But remember, all your paths can be joined back together using the *-Join-* function. You can join any paragraph to any paragraph you like. (You can even make loops, if you want to!)",
                    {
                        "option": "Okay. What's next?",
                        "linkPath": "theNextTutorialW",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "theNextTutorialW": {
                    "content": ["The next tutorial, which is about organising long stories! Or you could start writing.",
                    {
                        "option": "Start writing",
                        "linkPath": "toStartWritingJu",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Read about loose ends and sections",
                        "linkPath": "thisTutorialIsAb",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "flagName": "Join and jumps completed!"
                    }]
                },
                "thisTutorialIsAb": {
                    "content": ["This tutorial is about *-sections-* and *-loose ends-*. It's pretty short!",
                    {
                        "divert": "whenWritingInter"
                    }, {
                        "pageNum": 24
                    }, {
                        "pageLabel": "Loose ends and sections"
                    }]
                },
                "whenWritingInter": {
                    "content": ["When writing interactive stories, it's easy to forget which parts you've written, and which you haven't. *-inklewriter-* tries to help by telling you in the *-Contents-* if you've left any loose ends.",
                    {
                        "option": "Sounds simple enough",
                        "linkPath": "youShouldBeAbleT",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Ignore this for now..!",
                        "linkPath": null,
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "toStartWritingJu": {
                    "content": ["To start writing, just click the *-new -*button in the header. And off you go!",
                    {
                        "divert": "ifYouWantToSeeMo"
                    }, {
                        "pageNum": 25
                    }, {
                        "pageLabel": "Start writing"
                    }]
                },
                "ifYouWantToSeeMo": {
                    "content": ["If you want to see more tutorials, just click the *-tutorial-* button at any time."]
                },
                "nowItsTimeToTalk": {
                    "content": ["Now it's time to talk about the Widget menu. The widgets are those buttons on the bottom left of the screen. There's *-bold-* and /=italic=/, and they work the same way as a word-processor: just select some text, and click the button.",
                    {
                        "divert": "someWebbrowsersW"
                    }, {
                        "pageNum": 26
                    }, {
                        "pageLabel": "Widgets"
                    }]
                },
                "someWebbrowsersW": {
                    "content": ["You can also press Ctrl+B for bold and Ctrl+I for italics!",
                    {
                        "divert": "theNextWidgetIsA"
                    }]
                },
                "theNextWidgetIsA": {
                    "content": ["The next widget is a clever one. The symbol is \"...\". Try putting the cursor into this paragraph and then clicking the \"...\" widget. [...]",
                    {
                        "divert": "toSeeWhatThatsDo"
                    }, {
                        "pageNum": 27
                    }, {
                        "pageLabel": "The ... widget"
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
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "No?",
                        "linkPath": "takeAnotherLookT",
                        "ifConditions": null,
                        "notIfConditions": null
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
                        "ifConditions": null,
                        "notIfConditions": null
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
  
                          "divert": "theresOneLastWid"
                    }]
                },
                "theresOneLastWid": {
                    "content": ["There's one last widget to mention.",
                    {
                        "option": "What does the + widget do?",
                        "linkPath": "thatWidgetStarts",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "pageNum": -1
                    }]
                },
                "thatWidgetStarts": {
                    "content": ["That widget starts a new section wherever you're currently editing. It's there so you can organise your story the way you want to.",
                    {
                        "option": "Great. I'd better write a story.",
                        "linkPath": "toStartWritingJu",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "option": "Show me the next tutorial.",
                        "linkPath": "thisOnesAboutCha",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "flagName": "Widgets learned!"
                    }, {
                        "pageNum": 30
                    }, {
                        "pageLabel": "The + widget"
                    }]
                },
                "thisOnesAboutCha": {
                    "content": ["This one's about changing the story flow.",
                    {
                        "divert": "changingTheStory"
                    }]
                },
                "seeOnTheLeftOfTh": {
                    "content": ["See on the left of this paper where it says \"About Sections\"? Sections are a way of grouping paragraphs together. Sections are added automatically, but you can add your own by clicking the tab on the left when it appears.",
                    {
                        "divert": "ifInklewriterSta"
                    }, {
                        "pageNum": 31
                    }, {
                        "pageLabel": "About Sections"
                    }]
                },
                "ifInklewriterSta": {
                    "content": ["If *-inklewriter-* starts a new section somewhere you don't like, you can just delete it. (If you point your mouse cursor at a section, there's a little cross for doing that.)",
                    {
                        "divert": "youMightNoticeTh"
                    }]
                },
                "youMightNoticeTh": {
                    "content": ["You might notice that when new sections appear they have ugly names like \"Section 1\" or \"Section 53\". You can change these names: just select the text, and type what you want them to be called. Remember, these names won't be visible to your readers; they're just to help you keep your story organised.",
                    {
                        "divert": "youllSeeThatTheS"
                    }]
                },
                "youllSeeThatTheS": {
                    "content": ["You'll see that the *-Contents-* on the right of the screen updates.",
                    {
                        "option": "What else can I do with sections?",
                        "linkPath": "youllProbablyNot",
                        "ifConditions": null,
                        "notIfConditions": null
                    }]
                },
                "youllProbablyNot": {
                    "content": ["You'll probably notice that the *-Contents-* shows the sections you're working on but tidies other ones away. If you click the little grey triangle next to the name of a section, it'll show or hide those paragraphs.",
                    {
                        "divert": "alsoWhenAKnotIsH"
                    }]
                },
                "alsoWhenAKnotIsH": {
                    "content": ["Also, when a section is hidden away, there's an arrow symbol. If you click that, you'll jump to the start of that section.",
                    {
                        "divert": "youCouldUseThatN"
                    }]
                },
                "youCouldUseThatN": {
                    "content": ["You could use that now to jump back to the \"Choose a Tutorial\" section, to read the next section, if you wanted to.",
                    {
                        "option": "Or I could just start writing",
                        "linkPath": "toStartWritingJu",
                        "ifConditions": null,
                        "notIfConditions": null
                    }, {
                        "flagName": "Sections and loose ends done!"
                    }]
                },
                "inklewriterHasLo": {
                    "content": ["*-inklewriter-* has lots of other features to help you write your stories. But the most powerful is the \"jump to\" feature. We'll try that now.",
                    {
                        "divert": "itsReallySimpleA"
                    }, {
                        "pageNum": 33
                    }, {
                        "pageLabel": "Jumping"
                    }]
                },
                "itsReallySimpleA": {
                    "content": ["It's really simple: all it means is, if you click on any paragraph in the *-Contents-*, the editor will take you there! ",
                    {
                        "divert": "toTryItOutLetsOp"
                    }]
                },
                "toTryItOutLetsOp": {
                    "content": ["To try it out, display the *-Contents-* using the option in the menu bar. Now open the \"Jumping continued\" section, by clicking on the black triangle beside the name. It's just below the highlighted paragraph. Finally, select the paragraph called \"There you are!\""]
                }
            },
            "initial": "welcomeToInklewr",
            "editorData":{"playPoint":"welcomeToInklewr","libraryVisible":false,"authorName":"inkle"}
        }
    };