port = Number(process.env.PORT || 5000)
data = require('./businesslayer/stubData').data
_=require('underscore')
localStorage = require('localStorage')

require("zappajs") port, ->
	single_page = require('./middleware/nexus_single_page');

	@register html: require('ejs') 
	@set 'view engine': 'html', 'views': __dirname + "/public/views", 'view options': { layout: false }

	@use static: __dirname + '/public',
		'bodyParser',
		single_page({ indexPage: 'views/index.html'}),

	@get '/:action/:name?':->
		res = @response
		req = @request

		action = req.params.action
		if req.params.name
			action = req.params.name

		jsonData = _.extend({}, data[action])
		jsonData.templateName = action
		jsonData.pageTitle = action

		# console.log "api", action, jsonData
		res.json(jsonData)

	@post '/:action/:name?' :->
		res = @response
		req = @request

		# console.log 'data', req.body
		localStorage.setItem('postData', JSON.stringify(req.body))
		console.log localStorage.getItem('postData')
		res.json({action: req.body.nextAction}, 200)	
		
		
