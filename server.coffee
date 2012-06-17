console.log process.env.PORT
port = Number(process.env.PORT || 3000)

require("zappa") port, ->
	@app.get '/', (req, res) ->
		res.send 'boring! test!!! ektaAdd some excitement'

