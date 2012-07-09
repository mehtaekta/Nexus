$(function() {
	//alert("in jquery");
	// Instantiate the router
	var app_router = new AppRouter();

	//Start Backbone history a neccesary step for bookmarkable URL's
	if (typeof(window.history.pushState) == 'function') {
		Backbone.history.start({pushState: true});
	} else {
		Backbone.history.start();
	}
	
});

var AppView = Backbone.View.extend({
	el: $("div#nexus-content"),

	// initialize: function(){
	// 	this.model.on("change", this.render, this),
	// },

	render: function(){
		alert($el);
		this.$el.html("<h1>Hello Testing 123</h1>");
	}

});

var AppModel = Backbone.Model.extend({

	// defaults: function() {
	// 	content = {}
	// },
});

var AppRouter = Backbone.Router.extend({
	appView:{},
	appModel:{},

	initialize: function() {
		var pathname=window.location.pathname;
		console.log('backbone action ', pathname)
		appModel = new AppModel();
		appView = new AppView({model:appModel});
	}, 

	routes: {
		"*api": "fetchContent"
	},

	fetchContent: function(action){
		alert(action);
		appModel.set({url:"./"+ action});
		appModel.fetch();
		//appView.render();
	}

});