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
		// console.log('mustacheTemplateName =	', mustacheTemplateName);
		// console.log('payload =	', payload);
		$.get(mustacheTemplateName, function(template) {
			_this.model.set({template:template})
			// _this._mustacheRender(template, payload);	
		});		
	},

	render: function(){
		this.$el.html(this.model.get("template"));	
		modelBinder = new Nexus.ModelBinder();
		console.log(modelBinder);
		// debugger;
		modelBinder.bind(this.model, this.$el);
			
	}

});

var AppModel = Backbone.Model.extend({

	defaults: {
		mustacheTemplateName: "login",
		payload: {},
		pageTitle: "Nexus",
		content: "",
		template: ""
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
		console.log('Router action', action);
		if(action === "" || action === "/")
			appModel.url = "/logon";
		else
		{
			appModel.url="/"+ action;
		}
		appModel.fetch({
			success: function(model, response) {
				// console.log('response', model, response);
				appView._setModelContent();
			}
    	});	
		
	}

});

