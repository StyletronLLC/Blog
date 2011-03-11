demo.search = function(name) {
	/* private variables/methods */
	var moduleName = name || "search" + (new Date().getTime());
	var moduleType = "search";
	function submit() {
		$.publish("search/topic", $("#" + moduleName + "-search").val());
	}
	
	return {
		/* public variables/methods */
		init: function() {
			$("#" + moduleName + "-button").click(function() {
				submit();
			});

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
};