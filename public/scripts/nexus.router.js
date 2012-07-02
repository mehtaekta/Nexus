var AppView = Backbone.View.extend({

	defaults: {
		templateDir: "/views"
	}

	this.model.on('change', this.render, this);

	_mustacheRender: function(template, payload){
		var output = Mustache.render(template, payload);
		this.model.set({htmlToRender:output,timestamp:new Date()});
		// CMP.validate(false);
	},

	render: function(){
		var templateName = this.model.get("mustacheTemplateName");
		var payload = this.model.get("payload");
		$.get(templateName, function(template) {
			this._mustacheRender(template, payload);
		});

		$(this.el).html("<b> " + this.model.get("htmlToRender") +"</b>");

	}
});

var AppModel = Backbone.Model.extend({

	urlRoot = "http://localhost:5000/";

	defaults: function(){
		mustacheTemplateName: 'login',
		payload: {}	,
		htmlToRender = '',
		timestamp: new Date(),
		pageTitle: 'Nexus'
	}

});

var AppRouter = Backbone.Router.extend({

	initialize: function() {
		var pathName=window.location.pathname;
		console.log('backbone action ', pathName)
		debugger;
		var appModel = new AppModel({url: pathName});
		var appView = new AppView({model: appModel});
	}, 

	routes: {
		"*api": "fetchContent"
	},

	fetchContent: function(api){
		debugger;

		appModel.fetch();
		alert(appModel.mustacheTemplateName);
		appView.render();
		$('p#p-content').html(appView.el);

		// var data = {email:'mehta.ekta@gmail.com', password:'Infinity05'}
		// appModel.set({template: action, payload: data, title: 'Login'})

		// var _this = this;
		
		// if (action === '' || action === '/') {
		// 	action = HOME_PAGE;
		// } else {
		// 	action = '/' + action;
		// }

		// AjaxCall(action, null, 'json', 'GET', function(json) {
		// 	console.log('fetch context action complete', action);
		// 	_this._pageViewSetModel(json);
		// });

	// _pageViewSetModel: function(json) { //Todo: blanking on better name for now...\
	// 	if (json) { //use new payload:
	// 		appModel.pageTitle = json.pageTitle;
	// 		appModel.payload = json.payload;
	// 		appModel.payload.errorMsg = CMP.last_logon_error.errorMsg
	// 		appModel.errorFields = json.errorFields || [];
	// 		appModel.templateName = CMP.templateDir + json.mustacheTemplateName;
	// 	}
	// 	//NOTE: Always leave this outside of the if in order to support the reload button.
	// 	this.routerPageView.setModel(this.templateName, this.payload,this.pageTitle, this.errorFields,!json);
	// }
	}

});

$(function() {
	alert("in jquery");
	//Instantiate the router
	var app_router = new AppRouter(); 

	// Start Backbone history a neccesary step for bookmarkable URL's
	if (typeof(window.history.pushState) == 'function') {
		Backbone.history.start({pushState: true});
	} else {
		Backbone.history.start();
	}
	
});