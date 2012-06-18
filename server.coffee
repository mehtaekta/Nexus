port = Number(process.env.PORT || 3000)

require("zappa") port, ->
	@register html: require('ejs')
	@set 'view engine': 'html', 'views': __dirname + "/views", 'view options': { layout: false }

	@app.get '/', (req, res) ->
		#res.send 'boring! Lets watch movie' + __dirname + "\\views"
		res.json 'index': { FirstName: 'Ekta', LastName: 'Mehta'}

