
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
