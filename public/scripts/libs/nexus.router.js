var AppRouter = Backbone.Router.extend({

	initialize: function() {
		var pathname=window.location.pathname;
		console.log('backbone action ', pathname)
	}, 

	routes: {
		"*action": "defaultRoute"
	},

	defaultRoute: function(action){
		alert(action);
	}

});

$(function() {
	alert("in jquery");
	// Instantiate the router
	var app_router = new AppRouter();
 
	// Start Backbone history a neccesary step for bookmarkable URL's
	Backbone.history.start();
	
});