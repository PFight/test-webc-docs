"use strict";

(function() { 
	let labelTags = document.getElementsByTagName("dt");
	// Hide review tags
	for(let tag of labelTags) { 
		if (tag.textContent == "review") 
			tag.style.display = "none"; 
	}
	// Update internal tag text
	for(let tag of labelTags) { 
		if (tag.textContent == "internal")  { 
			tag.textContent = 'Это внутренний нестабильный API, который может измениться в следующих версиях Web-client.'; 
			tag.style.color = "red"; 
			tag.style.float = "none"; 
			tag.style.marginBottom = "10px"; 
			tag.style.display = "block";
		} 
	}

    // Show inherited toggle
	var WebClientDocsShowInherited = "WebClientDocsShowInherited";
	function toggleInherited(show) {
		if (show) {
			$(".tsd-is-inherited").show();
		} else {
			$(".tsd-is-inherited").hide();
		}
		toggleProtected($("#tsd-filter-protected")[0].checked);
	}
	$("#tsd-filter-inherited").on("change", function(ev) {
		toggleInherited(ev.target.checked);
		localStorage.setItem(WebClientDocsShowInherited, ev.target.checked);
	});
	if (localStorage.getItem(WebClientDocsShowInherited)) {
		var checked = JSON.parse(localStorage.getItem(WebClientDocsShowInherited));
		$("#tsd-filter-inherited")[0].checked = checked;
		toggleInherited(checked);
	}

	// Show protected toggle
	var WebClientDocsShowProtected = "WebClientDocsShowProtected";
	function toggleProtected(show) {
		if (show) {
			$(".tsd-is-protected").show();
		} else {
			$(".tsd-is-protected").hide();
		}
	}
	$("#tsd-filter-protected").on("change", function(ev) {
		toggleProtected(ev.target.checked);
		localStorage.setItem(WebClientDocsShowProtected, ev.target.checked);
	});
	if (localStorage.getItem(WebClientDocsShowProtected)) {
		var checked = JSON.parse(localStorage.getItem(WebClientDocsShowProtected));
		$("#tsd-filter-protected")[0].checked = checked;
		toggleProtected(checked);
	} else {
		toggleProtected(false);
	}

	// If not index.html show right menu (on index it is hiden, because is invalid)
	if (!$(".tsd-panel.tsd-typography")[0]) {
		$(".tsd-navigation.secondary").show();
	}
	
	// Hide constructor for controls (it should not be used directly)
	if ($(".tsd-sources a[href='webclient.basecontrol.html']")[0] || $(".tsd-sources a[href='webclient.basecontrolparams.html']")[0]) {
		$(".tsd-kind-constructor").hide();
		[].forEach.call($(".tsd-kind-constructor"), function(elem) {
			var parent = elem.parentNode;
			if (parent.classList.contains("tsd-panel-group")) {
				$(parent).hide();
			}
			var grandParent = parent.parentNode;
			if (grandParent.classList.contains("tsd-index-section")) {
				$(grandParent).hide();
			}
		});
	}
	
	// Expand current nav
	document.addEventListener("DOMContentLoaded", function() {
		// Expand root 
		var rootUl = document.querySelector("#tree_root>li>ul");
		rootUl.classList.add("jsl-open");
		var rootToggler = document.querySelector("#tree_root>li>div.jsl-collapsed-arrow");
		rootToggler.classList.add("jsl-open-arrow");
		
		if (location.pathname.indexOf("classes") >= 0 || location.pathname.indexOf("interfaces") >= 0 || location.pathname.indexOf("enums") >= 0) {		
			var path = location.pathname.split('/');
			var match = path[path.length-2] + "/" + path[path.length-1];
			var link = [].find.call(document.querySelectorAll("a.doc-link"), (a) => a.href.indexOf(match) >= 0);
			if (link) {
				link.style.fontWeight = "bold"
				var parent = link.parentElement;
				while (parent != null) {
					if (parent.tagName == "UL") {
						parent.classList.add("jsl-open");
						var toggler = parent.parentElement.querySelector("li>.jsl-collapsed-arrow");
						if (toggler) {
							toggler.classList.add("jsl-open-arrow");
						}
					}
					parent = parent.parentElement;
				}
			}
		}
	});
})();

