

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
			// console.log('Element type and tagName' , $(viewEl).prop('type'), $(viewEl).prop('tagName'));

			//TODO refactor to switch case???
			if(!_.isUndefined(viewEl))
			{
				//SELECT
				if($(viewEl).prop('tagName') == 'SELECT') {
					_this.dataSource = _this.modelData[$(viewEl).data("source")];
					if(_.isObject(_this.dataSource))
						_this.bindSelectOptions(_this.dataSource, value, viewEl, null);
						return;
				}

				//DIV or SPAN
				if($(viewEl).prop('tagName') == 'DIV' || $(viewEl).prop('tagName') == 'SPAN') {
					$(viewEl).html(value);
					return;
				}

				//INPUT
				if($(viewEl).prop('tagName') == 'INPUT') {
					//if INPUT type = Checkbox or RadioButton
					if(($(viewEl).prop('type') == 'checkbox' || $(viewEl).prop('type') == 'radiobutton') && _.isBoolean(value)) {
						$(viewEl).attr('checked', value);
						return;
					}

					if(_.isString(value)) {
						//if INPUT type = date
						if($(viewEl).prop("type") == 'date')
						{
							format = $(viewEl).data("format")	
							if(_.isUndefined(format))
								format = Nexus.ModelBinder.defaultDataFormat; //html5 type=date Only works with ISO date format
							console.log(format);
							value = $.format.date(new Date(value), format);
						}
						
						viewEl.val(value);
					}
				}

			}
		});

	}
});




// for (var key in p) {
//   if (p.hasOwnProperty(key)) {
//     alert(key + " -> " + p[key]);
//   }
// }