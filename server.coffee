port = Number(process.env.PORT || 3000)

require("zappa") port, ->
	@register html: require('ejs')
	@set 'view engine': 'html', 'views': __dirname + "/views", 'view options': { layout: false }

	@use static: __dirname + '/public',


	@get '/logon': ->
		@response.json({mustacheTemplateName: 'login.html', payload: {}, pageTitle: 'Login'})
	

	@app.get '/api', (req, res) ->
		console.log "api"
		res.json({data: {email:'mehta.ekta@gmail.com', password: 'ekta123'}})
		#res.send 'boring! Lets watch movie' + __dirname + "\\views"
		#res.render 'index.html' #: { FirstName: 'Ekta', LastName: 'Mehta'}

