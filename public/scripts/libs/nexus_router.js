$(function() {
	// Instantiate the router
	var app_router = new AppRouter();

	// Start Backbone history a neccesary step for bookmarkable URL's
	if (typeof(window.history.pushState) == 'function') {
		Backbone.history.start({pushState: true});
	} else {
		Backbone.history.start();
	}
});

var Nexus = {};
Nexus.templateDir = '/views/templates/';	

var AppView = Backbone.View.extend({
	el: $('#nexus-container'),

	initialize: function(){
		this.model.on('change', this.render, this);
	},

	_mustacheRender: function(template, payload){
		var output = Mustache.render(template, payload);
		this.model.set({content: output, timestamp : new Date()});
	},

	_setModelContent: function(){
		var _this = this;
		var mustacheTemplateName = Nexus.templateDir + _this.model.get("mustacheTemplateName") + '.html';
		
		var payload = _this.model.get("payload");
		console.log('mustacheTemplateName =	', mustacheTemplateName);
		console.log('payload =	', payload);
		$.get(mustacheTemplateName, function(template) {
			_this._mustacheRender(template, payload);	
		});		
	},

	render: function(){
		// console.log(this.model.get("content"));
		this._setModelContent();
		this.$el.html(this.model.get("content"));		
	}

});

var AppModel = Backbone.Model.extend({

	defaults: {
		mustacheTemplateName: "login",
		payload: {},
		pageTitle: "Nexus",
		content: ""
	},        
	initialize: function() {

	}
});

var AppRouter = Backbone.Router.extend({
	appView:{},
	appModel:{},

	initialize: function() {
		var pathname=window.location.pathname;
		appModel = new AppModel();
		appView = new AppView({model:appModel});
	}, 

	routes: {
		"*api": "fetchContent"
	},

	fetchContent: function(action){
		if(action === "" || action === "/")
			appModel.url = "/logon";
		else
		{
			appModel.url="/"+ action;
		}
		appModel.fetch();		
	}

});

