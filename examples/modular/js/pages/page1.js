demo.page1 = function() {
	/* private variables/methods */
	function search(topic) {
		$("#blue").html("<p>You searched for: " + topic + "</p>");
	}
	
	return {
		/* public variables/methods */
		init: function() {
			$.subscribe("search/topic", search);
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