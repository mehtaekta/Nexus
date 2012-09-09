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
	events:{
		'submit .nexus-post-form': "_postform"
	},

	initialize: function(){
		this.modelBinder = new Nexus.ModelBinder();
		this.model.on('change', this.render, this);
	},

	_setModelContent: function(){
		var _this = this;
		var templateName = Nexus.templateDir + _this.model.get("templateName") + '.html';
		
		$.get(templateName, function(template) {
			_this.model.set({template:template})
		});		
	},

	_postform: function() {
		console.log(this.model);
	},

	render: function(){
		console.log(this.model);
		this.$el.html(this.model.get("template"));	
		this.modelBinder.bind(this.model, this.$el);
	}

});

var AppModel = Backbone.Model.extend({

	defaults: {
		templateName: "login",
		pageTitle: "Nexus"
	},        
	initialize: function() {

	},

	// validate: function(attrs) {
	// 	console.log('attrs', attrs);
	//  //    return Nexus.validateAttributes(attrs);
	// }

	
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

