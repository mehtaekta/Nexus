$(function() {
	// Instantiate the router
	Nexus.app_router = new Nexus.AppRouter();

	// Start Backbone history a neccesary step for bookmarkable URL's
	if (typeof(window.history.pushState) == 'function') {
		Backbone.history.start({pushState: true});
	} else {
		Backbone.history.start();
	}
});



Nexus.AppView = Backbone.View.extend({
	el: $('#nexus-container'),
	events:{
		'submit form.nexus-post-form': "_postform"
	},

	initialize: function(){
		this.modelBinder = new Backbone.ModelBinder();
		this.model.on('change', this.render, this);
	},

	_setModelContent: function(){
		var _this = this;
		var templateName = Nexus.templateDir + _this.model.get("templateName") + '.html';
		
		$.get(templateName, function(template) {
			_this.model.set({template:template})
		});		
	},

	_postform: function(e) {
		e.preventDefault();
		jsonData = this.model.attributes;
		action = window.document.forms[0].action
		jsonData.nextAction = window.document.forms[0].nextAction.value;

		this.model.set('template', '');
				
		appModel.url = action;
		appModel.save(jsonData, {
			success: function(model, response) {
				 // console.log('response', response);
				 Nexus.app_router.navigate(response.action, {trigger:true, replace:true});
				// appView._setModelContent();
			}
    	});	
	},

	render: function(){
		// console.log(this.model);
		this.$el.html(this.model.get("template"));	
		this.modelBinder.bind(this.model, this.$el);
	}

});

Nexus.AppModel = Backbone.Model.extend({

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

Nexus.AppRouter = Backbone.Router.extend({
	appView:{},
	appModel:{},

	initialize: function() {
		var pathname=window.location.pathname;
		appModel = new Nexus.AppModel();
		appView = new Nexus.AppView({model:appModel});
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

