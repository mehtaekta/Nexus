
// var Nexus = function(){exists:true};
var Nexus = {};
// Nexus = function(){exists:true};
Nexus.templateDir = '/views/templates/';	

Nexus.AjaxCall = function(action, data, dataType, type, callback){
	// console.log(action);
	$.ajax({
		url:action,
		data:data,
		cache: false,
		dataType:dataType,
		type: type,
		async:false,
		success: callback
	});
};

Nexus.processPartials = function(template){
	var start = template.indexOf('{{>');
	if(start!==-1){
		var partialDone = false;
		var end =  template.indexOf('}}', start);
		var partialName = template.substring(start+3, end).trim();
		$.ajax({
			url:'/templates/partials/' + partialName + '.html',
			async: false,
			success: function(partial) {
				template = template.replaceAll(template.substring(start, end+2), partial);
				template =  Nexus.processPartials(template);
			}
		});
	}
	return template;
} 

Nexus.renderPartials = function(action, partial, callback) {
	AjaxCall('/cmp/' + action, {}, 'json', 'GET', function(json) {
		// console.log(json);
	 	Nexus.renderPartial(json.payload, partial, function(output){
	 		callback(output);
	 	});
    });
};

Nexus.renderPartial = function(jsonData, partial, callback) {
	$.get('/views/templates/partials/' + partial, function(template) {
		template = Nexus.processPartials(template);
		var output = Mustache.render(template, jsonData);		
		callback(output);
	});
};

Nexus.ModelBinder=function(options){
	this.options =  _.extend({},options);
};

// use prototype to add a bind method to ModelBinder object
_.extend(Nexus.ModelBinder.prototype, {
	bindSelectOptions:function(dataSource, selectedValue, selectEl, callback){
		optionsData =  _.extend({}, dataSource);
		console.log(selectedValue);
		var resultSet = [];
		resultSet.push({key:0, value:"Please Select"})
		 _.each(optionsData, function(value, key){
		 	resultSet.push({key: key, value: value});		
		});

		if (_.isUndefined(selectedValue)==false){
			selectedOption = $.grep(resultSet, function (option) { return option.key == selectedValue; });
			if (selectedOption.length > 0){
				console.log('selectedOption', selectedOption);
				selectedOption[0]['selected'] =true
			}
		}
		Nexus.renderPartial({options:resultSet}, 'select_options.html', function(htmlTemplate) {
			selectEl.html(htmlTemplate);
			selectEl.trigger('change');
			if(callback!==null) {
				callback();
			}
		});
	},

	bind:function(model, el){
		_this = this;
		_this.model = model;
		_this.el = el;

		if (!_this.model) throw 'model is undefined';
        if (!_this.el) throw 'element is undefined';

        _this.modelData = _this.model.attributes.payload;
        if (!_this.modelData) throw 'payload is undefined';

		_.each(_this.modelData, function(value, key){
			el_Id = '#'+key;
			viewEl = $(el).find(el_Id);
			// console.log(viewEl);

			if(!_.isUndefined(viewEl))
			{

				if($(viewEl).prop("type") == 'date')
					value = $.format.date(new Date(value), 'yyyy-MM-dd');

				// console.log($(viewEl).prop('tagName'));
				
				if($(viewEl).prop('tagName') == 'SELECT') {
					_this.dataSource = _this.modelData[$(viewEl).data("source")];
					_this.bindSelectOptions(_this.dataSource, value, viewEl, null);
				}

				viewEl.val(value);
			}
		});

	}

	
});




// for (var key in p) {
//   if (p.hasOwnProperty(key)) {
//     alert(key + " -> " + p[key]);
//   }
// }