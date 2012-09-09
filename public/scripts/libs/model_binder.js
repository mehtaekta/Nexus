

Nexus.ModelBinder=function(options){
	this.options =  _.extend({},options);
};

Nexus.ModelBinder.defaultDataFormat = "dd/MM/yyyy"; //Date Format
Nexus.ModelBinder.defaultDataTimeFormat = "dd/MM/yyyy hh:mm:ss"; //Date Time format
// Nexus.ModelBinder.emailPattern = ""; //email pattern to validate

// bind method to ModelBinder object
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

	bindData:function(child) {
		data = _this.modelData[child.prop("id")];
		// console.log(_this.modelData);
		// console.log(child.prop('tagName'), child.attr('type'), child.prop("id"));
		switch (child.prop('tagName')) {
			case 'DIV':
				child.html(data);
				break;
			case 'SPAN':
				child.html(data);
				break;
			case 'SELECT':
				dataSource = _this.modelData[child.data("source")];
				child.bind('change', _this.selectOnChange)
				if(_.isObject(dataSource))
					_this.bindSelectOptions(dataSource, data, child, null);
				break;
			case 'INPUT':
				switch (child.attr('type')) {
					case 'checkbox':
					case 'radio':
						child.bind('click', _this.inputCheckBoxRadioOnClick)
						if(_.isBoolean(data)) {
							child.attr('checked', data);
						}
						break;
					case 'date':
						format = child.data("format")	
						child.bind('change', _this.inputTextOnChange)
						if(_.isUndefined(format))
							format = Nexus.ModelBinder.defaultDataFormat; //html5 type=date Only works with ISO date format
						console.log(format);
						data = $.format.date(new Date(data), format);
						child.val(data);
						break;
					default:
						child.bind('change', _this.inputTextOnChange)
						child.val(data);
						break;
				}
				break;
		}
	},

	iterateElement:function(childrens) {
	  if (typeof childrens == "undefined" || childrens.size() === 0) {
	    return;
	  }
	  childrens.each(function(){
	    var child = $(this);
	    if (child.children().size() > 0) {
	      _this.iterateElement(child.children());
	    }
	    _this.bindData(child);
	  });
	},

	bind:function(model, el){
		_this = this;
		_this.model = model;
		_this.el = el;

		if (!_this.model) throw 'model is undefined';
        if (!_this.el) throw 'element is undefined';

        _this.modelData = _this.model.attributes;
        if (!_this.modelData) throw 'payload is undefined';
		
		_this.iterateElement(_this.el.children());

	},

	selectOnChange:function(){
		// console.log($(this).prop('id'), $(this).find(':selected').prop('id'));
		_this.model[$(this).prop('id')] = $(this).find(':selected').prop('id');
	},

	inputTextOnChange:function(){
		// console.log($(this).prop('id'), $(this).val());
		_this.model[$(this).prop('id')] = $(this).val();
	},

	inputCheckBoxRadioOnClick:function(){
		// console.log($(this).prop('id'), $(this).prop('checked') ? true : false);
		_this.model[$(this).prop('id')] = $(this).prop('checked') ? true : false;
	}

});




// for (var key in p) {
//   if (p.hasOwnProperty(key)) {
//     alert(key + " -> " + p[key]);
//   }
// }