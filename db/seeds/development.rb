user=User.new(
  email: "john@the.ripper.com",
  password: "john@the.ripper.com"
)
user.save!

story = user.stories.new(
  data: '{"title":"Untitled Story","data":{"stitches":{"onceUponATime":{"content":["Once upon a time...",{"divert":"thereWasAGiantIn"},{"pageNum":1}]},"thereWasAGiantIn":{"content":["There was a giant in the woods."]}},"initial":"onceUponATime","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"thereWasAGiantIn","libraryVisible":false,"authorName":"Anonymous","textSize":0}}}',
  title: "My first story",
  url_key: 1
)
story.save!