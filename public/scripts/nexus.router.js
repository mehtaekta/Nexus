var appRouter = Backbone.Router.extend({
	routes: {
		"*api": "defaultRoute"
	},

	defaultRoute: function(api){
		alert(api);
	}

});

$(function() {
	alert("in jquery");
	// Instantiate the router
	var app_router = new AppRouter;
 
	// Start Backbone history a neccesary step for bookmarkable URL's
	Backbone.history.start();
	
});