express = require('express')
_ = require 'underscore'
localStorage = require 'localStorage'

data = require('./businesslayer/stubData').data

app = module.exports = express.createServer()
app.configure( ->
	singlePage = require './middleware/nexus_single_page'

	# Register view engine
	app.register('.html', require('ejs'));

	# App Configuration
	app.set 'views', __dirname + "/public/"
	app.set 'view engine', 'ejs'
	app.set 'view options', { layout: false, pretty: true }

	# Middleware
	app.use express.static(__dirname + '/public')
	app.use express.bodyParser()
	app.use(singlePage({indexPage: 'views/index.html'}))
	
)

app.get '/:action/:name?', (req, res) ->
	action = req.params.action
	if req.params.name
		action = req.params.name

	jsonData = _.extend({}, data[action])
	jsonData.templateName = action
	jsonData.pageTitle = action

	if localStorage.getItem('postData') != null
		data =  localStorage.getItem('postData')
		jsonData = _.extend(jsonData, data)

	console.log "api", action, jsonData
	res.json(jsonData)

app.post '/:action/:name?', (req, res)->

	# console.log 'data', req.body
	localStorage.setItem('postData', req.body, {expires:100000})
	res.json({action: req.body.nextAction}, 200)

port = process.env.PORT or 5000
app.listen port
console.log("Express server listening on port %d in %s mode", port, app.settings.env)