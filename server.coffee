port = Number(process.env.PORT || 5000)
data = require('./businesslayer/stubData').data

require("zappajs") port, ->
	single_page = require('./middleware/nexus_single_page');

	@register html: require('ejs') 
	@set 'view engine': 'html', 'views': __dirname + "/public/views", 'view options': { layout: false }

	@use static: __dirname + '/public',
		single_page({ indexPage: 'views/index.html'}),

	@get '/:action/:name?':->
		res = @response
		req = @request

		action = req.params.action
		if req.params.name
			action = req.params.name

		# console.log "api", action, data[action]
		res.json({mustacheTemplateName: action, payload: data[action], pageTitle: action})

	@post '/:action/:name?' :->
		res = @response
		req = @request
		
