# legendary-chainsaw
A simple browser extension directory generator as a node.js CLI.

### Generated manifest example:
```json
{
    "name": "Test",
    "version": "1.0.0",
    "manifest_version": 2,
    "description": "Testing",
    "icons": {},
    "browser_specific_settings": { "gecko": { "id": "extension@example.com" } },
    "permissions": ["*://*.example.com/*", "*://*.example.net/*"],
    "content_scripts": [{
        "matches": ["*://*.example.com/*"],
        "run_at": "document_end",
        "css": ["src/styles.css"],
        "js": ["src/plugin.js"]
    }]
}
```

### Options:

- name (**string**)
- version (**number**)
- description (**string**)
- firefox_id (**string**)
- permission urls (**array**, seperated by ", ")
- content script urls (**array**, seperated by ", ")