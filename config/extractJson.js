const obj = require('./settings.js')

const stringifed = JSON.stringify(obj)

const fs = require('fs')

fs.writeFile("./bjsettings.json", stringifed)

