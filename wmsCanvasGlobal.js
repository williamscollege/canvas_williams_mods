$(document).ready(function () {

	/***********************************************
	 ** Williams Feature: People: Add Face Book, Learning Mode
	 ***********************************************/
	// Url must match this pattern
	if (window.location.href.match(/\/courses\/\d+\/users/ig)) {
		// Listen for completion of all AJAX calls, then insert the Learning Mode button
		$(document).ajaxComplete(function () {
			if ($("#wms_roster_btn_learning").length == 0) {
				// Insert the Learning Mode button
				$("DIV#content.container-fluid DIV DIV.v-gutter TABLE.roster").before('<div id="wms_roster_controls"><button id="wms_roster_btn_learning" class="btn btn-small" title="View larger photos, show or hide names"><i class="icon-user"></i> Show Face Book</button>&nbsp;&nbsp;<a href="#" id="wms_roster_toggle_names" title=""></a><br /><br /></div>');
			}
			else {
				// Avoid creating duplicate buttons
				return false;
			}

			// Toggle: Learning Mode button
			$("#wms_roster_btn_learning").toggle(function (event) {

				// Turn learning mode: ON
				$("#wms_roster_btn_learning").html("<i class=\"icon-user\"></i> Show List").prop("title", "Return to list view");

				// Initial state of hyperlink
				$("#wms_roster_toggle_names").text("Turn Learning Mode On").prop("title", "Hide names");

				// Toggle: Names hyperlink
				$("#wms_roster_toggle_names").toggle(function (event) {
					// Hide the name/role
					$("#wms_roster_toggle_names").text("Turn Learning Mode Off").prop("title", "Show names");
					$(".wms_roster_user small").addClass("hide");
					// Display name/role upon image hover
					$("#wms_roster_grid .wms_roster_user").hover(function () {
						$(this).find("small").removeClass("hide");
					}, function () {
						$(this).find("small").addClass("hide");
					});
				}, function () {
					// Show the name/role
					$("#wms_roster_toggle_names").text("Turn Learning Mode On").prop("title", "Hide names");
					$(".wms_roster_user small").removeClass("hide");
					// Display name/role upon image hover
					$("#wms_roster_grid .wms_roster_user").hover(function () {
						$(this).find("small").removeClass("hide");
					}, function () {
						$(this).find("small").removeClass("hide");
					});
				});

				// Create array to copy desired contents
				var createGrid = "";
				var extractHTMLObjects = $("TABLE.roster TBODY TR.rosterUser");
				$.each(extractHTMLObjects, function (index, value) {
					// console.log(index + "/" + $(value).html()); // produces: 5/[object HTMLTableCellElement]
					var img = $(this).find('td:nth-child(1)').html();
					var name = $(this).find('td:nth-child(2)').html();
					var role = $(this).find('td:nth-child(5)').text();

					var user_info = img + "<small class=\"\">" + name + "</small><br /><small class=\"\">" + role + "</small>";
					createGrid += "<div class=\"wms_roster_user\">" + user_info + "</div>";
				});
				createGrid = "<div id=\"wms_roster_grid\">" + createGrid + "</div>";

				// Display grid (add it to DOM)
				$("TABLE.roster.table.table-hover.table-striped.table-condensed.table-vertically-center").before(createGrid);
				// Hide Canvas default student table
				$("TABLE.roster.table.table-hover.table-striped.table-condensed.table-vertically-center").addClass("hide");
			}, function () {
				// Turn learning mode: OFF
				$("#wms_roster_btn_learning").html("<i class=\"icon-user\"></i> Show Face Book").prop("title", "View larger photos, show name by hovering over a picture");
				// Remove Link: Hide Names
				$("#wms_roster_toggle_names").text("").prop("title", "");
				// Remove grid from DOM
				$("#wms_roster_grid").remove();
				// Restore Canvas default student table
				$("TABLE.roster.table.table-hover.table-striped.table-condensed.table-vertically-center").removeClass("hide");
			});

		}); // END OF: (document).ajaxComplete
	}


	/***********************************************
	 ** Williams Feature: Add Presentation Mode (hide top, left and right divs from page)
	 ***********************************************/
	$("NAV#breadcrumbs UL LI").last().after('<li style="float:right; background-image:none;"><a id="wms_presentation_mode" class="btn-mini" href="#"><i class="icon-off"></i> Presentation Mode</a>&nbsp;&nbsp;</li>');

	$( "#wms_presentation_mode" ).toggle(function() {
		$("a#wms_presentation_mode").html('<a id="wms_presentation_mode" class="btn-mini wmsFloatLink" href="#"><i class="icon-end"></i> Exit Presentation Mode</a>');
		$("DIV#header").addClass("wmsDisplayNone");
		$("DIV#left-side").addClass("wmsDisplayNone");
		$("DIV#right-side-wrapper").addClass("wmsDisplayNone");
		$("DIV#main").addClass("wmsMarginZero");
		// float the exit button at fixed top right of window
		$('.wmsFloatLink').fadeIn('fast');
	}, function() {
		$("a#wms_presentation_mode").html('<a id="wms_presentation_mode" class="btn-mini" href="#"><i class="icon-off"></i> Presentation Mode</a>');
		$("DIV#header").removeClass("wmsDisplayNone");
		$("DIV#left-side").removeClass("wmsDisplayNone");
		$("DIV#right-side-wrapper").removeClass("wmsDisplayNone");
		$("DIV#main").removeClass("wmsMarginZero");
	});


	/***********************************************
	 ** Williams Feature: Add Google Analytics
	 ***********************************************/
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-10912569-3']);
	_gaq.push(['_trackPageview']);
	(function () {
		var ga = document.createElement('scr' + 'ipt');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();


	/***********************************************
	 ** Williams UI: LOGIN PAGE
	 ***********************************************/
	if (window.location.href.match(/\/login/ig)) {
		// change title of page (formerly: Log In to Canvas)
		$(document).attr('title', 'Glow');

		// change labels/text
		$("#login_form label[for=pseudonym_session_unique_id]>span").text("Username");
		$("#login_forgot_password").text("Forgot password?");

		// add tabindex attributes
		$("#login_form INPUT#pseudonym_session_unique_id").prop('tabindex', '1');
		$("#login_form INPUT#pseudonym_session_password").prop('tabindex', '2');
		$("#login_form BUTTON.btn-primary").prop('tabindex', '3');

		// custom footer links (only on login page)
		$("#modal-box-inner").append(
			'<p id="wms-login-footer"><a class="not_external hint-text" href="http://oit.williams.edu/help/glow/" target="_blank" title="Help">Help</a>&nbsp;<span class="hint-text">&#124;</span>&nbsp;' +
				'<a class="not_external hint-text" href="http://oit.williams.edu/help/glow/terms-of-service/" target="_blank" title="Terms of service">Terms of service</a></p>'
		);

		// hide standard footer links because login page has custom links (created above)
		$("#footer-links").css("display","none");

		// MOBILE HACKS
		// Add type=text to username input field (so that default styles apply to it same as to password field)
		$("#login_form.front.face INPUT.input-block-level[name='pseudonym_session[unique_id]']").prop('type','text');
		// Change labels/text
		$("#login_form.front.face A.forgot-password").text("Forgot password?");
	}


	/***********************************************
	 ** Williams UI: INTERNAL PAGES
	 ***********************************************/
	// UI Internal pages: Correct gap between buckets and colorbar decorations
	var wmsCoursesLabel = $("#courses_menu_item.menu-item A.menu-item-title").text();
	if (wmsCoursesLabel.match(/Groups/ig)){
		// Courses & Groups
		$("#courses_menu_item").css("cssText", "margin-right: -10px !important;");
	} else {
		// Courses (lacking Groups)
		$("#courses_menu_item").css("cssText", "margin-right: 16px !important;");
	}
	if (! $("#assignments_menu_item.menu-item A.menu-item-title i").hasClass("icon-mini-arrow-down") ){
		// Assignments (lacking arrow)
		$("#assignments_menu_item").css("cssText", "margin-right: 10px !important;");
	};


	/***********************************************
	 ** Williams Overrides: Footer Links
	 ***********************************************/
		// Footer Links: Edit
	$("#footer-links A[href='http://help.instructure.com/']").prop('href', 'http://oit.williams.edu/help/glow/').prop('target','_blank');
	$("#footer-links A[href='http://www.instructure.com/policies/terms-of-use']").prop('href', 'http://oit.williams.edu/help/glow/terms-of-service/').prop('target','_blank');

	// Footer Links: Add
	// $("#footer-links").append("<a href='http://www.williams.edu'>Williams</a>");
	// Set CSS: $("BODY.modal #modal-box").css("cssText", "background: #FFFFFF !important");


}); // END OF: (document).ready
