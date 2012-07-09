exports = module.exports = function single_page(options){
	var _indexPage = options.indexPage;

	return function single_page(req, res, next) {
		//console.log(req.headers);
		if ((req.headers['content-type'] && req.headers['content-type'].indexOf('application/json') > -1) ||
			(req.headers['accept'] && req.headers['accept'].indexOf('application/json') > -1)) {
				//handle json request
				next();
			}
			else{
				//handle regular browser get requests (for example bookmark to a url etc):
				res.render (_indexPage);
			}
		}
};