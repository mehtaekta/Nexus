port = Number(process.env.PORT || 3000)
data = require('./businesslayer/stubData').data

require("zappajs") port, ->
	single_page = require('./middleware/nexus_single_page');

	@register html: require('ejs') 
	@set 'view engine': 'html', 'views': __dirname + "/public/views", 'view options': { layout: false }

	@use static: __dirname + '/public',
		single_page({ indexPage: 'views/index.html'}),

	# @get '/logon': ->
	# 	res = @response
	# 	console.log "logon in ", data.logon
	# 	res.json({mustacheTemplateName: 'login', payload: data['logon'], pageTitle: 'Login'})
	
	@get '/:action/:name?':->
		res = @response
		req = @request

		action = req.params.action
		if req.params.name
			action = req.params.name

		console.log "api", action, data[action]
		res.json({mustacheTemplateName: action, payload: data[action], pageTitle: action})
		#res.json({data: {email:'mehta.ekta@gmail.com', password: 'ekta123'}})
		#res.send 'boring! Lets watch movie' + __dirname + "\\views"
		#res.render 'index.html' #: { FirstName: 'Ekta', LastName: 'Mehta'}

