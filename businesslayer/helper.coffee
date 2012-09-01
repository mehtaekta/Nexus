fs = require('fs')
Mustache = require('hogan.js')
#templates will store all the templates. If we can't find it, we read it in from a file.
Templates = {}
	
exports.GetSqlTemplate = (templateName, callback) ->
	Templates[templateName]?= Mustache.compile(fs.readFileSync('sql/' + templateName + '.sql','utf8'))
	callback(null, Templates[templateName])