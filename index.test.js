const test = require("./package/create-extension-directory.js")

// run function with all needed options
test({
    name: "Test1",
    version: "0.0.1",
    id: "extension@example.com",
    permissionUrls: "example.com, example.org",
    contentUrls: "example.com"
})

// return
return console.log("Run, exit this CLI.")