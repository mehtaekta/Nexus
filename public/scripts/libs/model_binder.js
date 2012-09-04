Nexus.ModelBinder=function(options){
	this.options =  _.extend({},options);
};

// used prototype to add a bind method to ModelBinder object
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
					//Checkbox or RadioButton
					if(($(viewEl).prop('type') == 'checkbox' || $(viewEl).prop('type') == 'radiobutton') && _.isBoolean(value)) {
						$(viewEl).attr('checked', value);
						return;
					}

					if(_.isString(value)) {
						//INPUT - type = date
						if($(viewEl).prop("type") == 'date')
							value = $.format.date(new Date(value), 'yyyy-MM-dd');
						
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