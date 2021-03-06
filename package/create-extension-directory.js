const inquirer = require('inquirer');
const fs = require("fs")
const path = require("path")

// Helper functions

const makedir = function(dir, name) {
    // Create dir
    fs.mkdir(path.join(dir, name), { recursive: true }, (err) => {
        if (err) {
            return console.error(err)
        }
    })
}

const editfile = function(path, name, data) {
    // Edit/Create file
    fs.writeFile(`${path}/${name}`, data, 'utf-8', (err) => {
        if (err) {
            return console.error(err)
        }
    })
}

const getUrlList = function(list) {
    // Create list of urls from "example.com, example.org" to ["example.com", "example.org"]
    let list1 = []

    if (list[1].length > 1) {
        for (let url of list) {
            if (url.length > 1) {
                list1.push(`*://*.${url}/*`)
            }
        }
    } else { // list isn't an array, make it into one and return
        list1 = []
        list1.push(`*://*.${list}/*`)
    }

    return list1
}

const handleAnswers = function(answers) {
    if (answers.permissionUrls.includes(", ")) { answers.permissionUrls = answers.permissionUrls.split(", ") }
    if (answers.contentUrls.includes(", ")) { answers.contentUrls = answers.contentUrls.split(", ") }

    let urls = getUrlList(answers.permissionUrls)
    let urls1 = getUrlList(answers.contentUrls)

    makedir(process.cwd(), "extension")
    makedir(process.cwd(), "extension/src")

    const extensionPath = `${process.cwd()}/extension`
    const srcPath = `${extensionPath}/src`

    editfile(extensionPath, "manifest.json", JSON.stringify({
        "name": answers.name,
        "version": answers.version,
        "manifest_version": 2,
        "description": answers.description,
        "icons": {},
        "browser_specific_settings": {
            "gecko": {
                "id": answers.id
            }
        },
        "permissions": urls,
        "content_scripts": [{
            "matches": urls1,
            "run_at": "document_end",
            "css": ["src/styles.css"],
            "js": ["src/plugin.js"]
        }]
    }))
    editfile(srcPath, "styles.css", `/* Extension stlyesheet */`)
    editfile(srcPath, "plugin.js", `console.log("[${answers.name}@${answers.version}]: Loaded!")`)
}

// Create prompt

inquirer
    .prompt([{
            name: 'name',
            message: 'Extension Name:'
        },
        {
            name: 'description',
            message: 'Extension Description:'
        },
        {
            name: 'version',
            message: 'Extension Version:',
            default: '1.0.0'
        },
        {
            name: 'id',
            message: 'Extension Id:',
            default: 'extension@example.com'
        },
        {
            name: 'permissionUrls',
            message: 'Access Urls:'
        },
        {
            name: 'contentUrls',
            message: 'Run Content Scripts on Urls:'
        },
    ])
    .then(answers => {
        handleAnswers(answers)
    })

module.exports = (answers) => {
    handleAnswers(answers)
}