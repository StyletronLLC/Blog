//declare namespace
var demo = {};
demo.modules = [];

//page_load
$(document).ready(function() {
	if (location.hash) {
		getPage(location.hash);
	}
});

//monitor the onhashchange event
window.onhashchange = hashChange;

//handler for the onhashchange event
function hashChange() {
	//close all modules loaded for this page
	for (i=0; i<demo.modules.length; i++) {
		demo.modules[i].close();
		delete demo.modules[i];
	}
	demo.modules = [];
	getPage(location.hash);
}

function getPage(hash) {
	/* get html content */
	//remove hash symbol
	hash = hash.replace("#", "");
	
	//load html content for this page
	$.when(
		$('#content').load("pages/"+hash+".html")
	).done(function() {
		//after html content has been retrieved look for any view tags
		loadViews();
		
		//init the page javascript file after page.html and views have been loaded.
		demo[hash].init();
	});		
}

function loadViews() {
	//search for view tags.  eg: {form}
	var html = $("#content").html();
	var filter = /\{(\w+)\}/;
	
	while (tag = filter.exec(html)) {
		//if view tags are found handle them
		$.ajax({
			url: "modules/"+tag[1]+"/"+tag[1]+".html",
			async: false,
			success: function(data) {
				//create a new instance of tag[1] js object
				var module = new demo[tag[1]](),
					moduleName = module.getName();
				
				//assign new element id's using moduleName
				data = data.replace(/id\s*=\s*"(\w+)\"/g, function(){return 'id="' + moduleName + '-' + arguments[1] + '"';});
				
				var $div = $("<div></div>");  //create new div
				$div.attr("id", moduleName);  //assign generated id to new div
				$div.html(data);  //add module html to div
				html = html.replace(new RegExp(tag[0]), $div[0].outerHTML);  //replace {tag} with new div
				
				//add module to the collection of modules
				demo.modules.push(module);
			}			
		});
	}
	$("#content").html(html);
	
	$.each(demo.modules, function(i, val) {
		val.init();
	});
}