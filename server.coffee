port = Number(process.env.PORT || 3000)

require("zappajs") port, ->
	single_page = require('./middleware/nexus_single_page');

	@register html: require('ejs') 
	@set 'view engine': 'html', 'views': __dirname + "/public/views", 'view options': { layout: false }

	@use static: __dirname + '/public',
		single_page({ indexPage: 'views/index.html'}),

	@get '/logon': ->
		console.log "logon"
		@response.json({mustacheTemplateName: 'login', payload: {FirstName: 'Ekta', LastName: 'Mehta'}, pageTitle: 'Login'})
	
	@get '/api/:name':->
		res = @response
		console.log "api"
		res.json({mustacheTemplateName: 'profile', payload: { FirstName: 'Ekta', LastName: 'Mehta'}, pageTitle: 'Login'})
		#res.json({data: {email:'mehta.ekta@gmail.com', password: 'ekta123'}})
		#res.send 'boring! Lets watch movie' + __dirname + "\\views"
		#res.render 'index.html' #: { FirstName: 'Ekta', LastName: 'Mehta'}

