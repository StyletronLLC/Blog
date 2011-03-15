demo.page2 = function() {
	/* private variables/methods */
	function search(topic) {
		$("#red").html("<p>You searched for: " + topic + "</p>");
	}
	
	function submitForm(values) {
		$("#red").html("<p>You submitted: " + values + "</p>");
	}
	
	return {
		/* public variables/methods */
		init: function() {
			$.subscribe("search/topic", search);
			$.subscribe("form/submit", submitForm);
		},
		close: function() {
			//unbind any pub/sub and DOM events
			$("#" + moduleName + " input[name=button]").unbind("click");
		},
		getName: function() {
			return moduleName;
		},
		getType: function() {
			return moduleType;
		}
	};
}();