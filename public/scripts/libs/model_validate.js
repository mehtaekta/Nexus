//List of all validations
Nexus.validations = [
	{
		cssClass: 'required',
		msg: "is required.",
		validator: function(element) {
			// debugger;
			val = Nexus.getElementValue(element);
			initialVal = element.data("initialValue"); //for select
			if (initialVal != null)
				initialVal = initialVal.toString()
			return val==="" || val === initialVal;
		}
	},
	{
		cssClass: 'email',
		msg:"is not valid.",
		validator: function(element) {
			val = getElementValue(element);
			return !(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val))
		}
	},
	{
		cssClass: 'passwordComplexity',
		msg: "must be at least 6 characters long, use at least one uppercase letter and one number. Spaces and special characters are not allowed.",
		validator: function(element) {
			val = getElementValue(element);
			for(var i = 0, l = Nexus.passwordComplexityRules.length; i < l; i++) {
				if (!Nexus.passwordComplexityRules[i](val)) {
					return true;
				}
			}
			return false; 
		}
	},
	{
		cssClass: 'match',
		msg: ' fields must match.',
		validator: function(element){
			val = getElementValue(element);
			var matchedField = $('#'+$(element).data('match-pair'));
			return val !== matchedField.val();
		}
	},
	{
		cssClass: 'phone', 
		msg:"is not valid.",
		validator: function(element){
			val = getElementValue(element);
			return !(val==="") && !(/^(\s*)(\+?)([\/\\\.\(\)\s\-0-9]{10,30})([x|X](\s*)[0-9]{1,20})?(\s)*$/.test(val))
	}
	},
];

// Nexus.validate=function(){
// 	$(".errorMsg > label").remove();
// 	$(".validate-form input").parent('.error').removeClass('error');
// 	var errors=0; 
// 	for(var i=0,l=Nexus.validations.length;i<l;i++){
// 		errors+=Nexus.validateFields(Nexus.validations[i]);
// 	}
// 	if (errors > 0) {
// 		$(".errorMsg").focus();
// 	}

// 	return errors;


// };

// Nexus.validateAttribute=function(attribute){
// 	return 'error occured'
// 	// $(".errorMsg > label").remove();
// 	// el_Id = '#'+key;
// 	// viewEl = $(el).find(el_Id);
// 	// $(".validate-form input").parent('.error').removeClass('error');
// 	// var errors=0; 

// 	// for(var i=0,l=Nexus.validations.length;i<l;i++){
// 	// 	errors+=Nexus.validateField(Nexus.validations[i]);
// 	// }
// 	// if (errors > 0) {
// 	// 	$(".errorMsg").focus();
// 	// }

// 	// return errors;


// };

// Nexus.validateField = function(element){
// 	if (element).is(":visible")){
// 		return Nexus.validateFields().handler.call(element);
// 	}
// };

// Nexus.validateFields = function(data) {
// 	var handler=function(){
// 		var label = $(".errorMsg > label." + data.cssClass + "[name='" + $(this).attr("id") + "']");
// 		if(data.validator($(this))) {
// 			if(label.length===0 && !$(this).parent().hasClass("error")){ //only append error message if field does not have an error already (ie. required and not formatted)
// 				$(this).parent().addClass("error");
// 				$(".errorMsg").append("<label class='errorLbl " + data.cssClass + "' name='"+$(this).attr("id") + "'>" + $(this).data("displayname") + " " + data.msg + "</label>");
// 			}
// 			else{
// 				label.show(); 
// 			}
// 			return 1;
// 		}
// 		else{
// 			label.remove();
// 			if($("label.errorLbl[name='" + $(this).attr("id")+"']").length===0) {
// 				$(this).parent().removeClass("error");
// 			}
// 			$(".errorMsg > label.errorLbl").first().show();
// 			return 0;
// 		}
// 	};
// 	var selector=".validate-form ." + data.cssClass;

// 	var el = $(selector);
// 	var errCnt = 0;
// 	for (var i=0, l=el.length; i<l;i++) {
// 		if ($(el[i]).is(":visible")){
// 			errCnt += handler.call(el[i]);
// 		}
// 	};
// 	return errCnt;
// };



Nexus.getElementValue = function(element) {
	if (element.get(0).tagName === "INPUT")
		return element.val();
	else if (element.get(0).tagName === "SELECT")
		return element.find(":selected").attr("id");
	else 
		return "";
}