demo.form = function(name) {
	/* private variables/methods */
	var moduleName = name || "form" + (new Date().getTime());
	var moduleType = "form";
	function submit() {
		var $m = $("#" + moduleName);
		$.publish("form/post", $("#" + moduleName + "-name").val(), $("#" + moduleName + "-email").val());
	}
	
	return {
		/* public variables/methods */
		init: function() {
			$("#" + moduleName + "-submit").click(function() {
				submit();
			});
		},
		close: function() {
			//unbind any pub/sub and DOM events
			$("#" + moduleName + "-submit").unbind("click");
		},
		getName: function() {
			return moduleName;
		},
		getType: function() {
			return moduleType;
		}
	};
};