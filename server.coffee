require("zappa") process.argv[2], ->
	@app.get '/', (req, res) ->
    	res.send 'boring! test!!! ektaAdd some excitement'