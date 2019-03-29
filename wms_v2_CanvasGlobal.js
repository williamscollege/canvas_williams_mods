$(document).ready(function () {

    /***********************************************
	 ** People: Add Face Book and Learning Mode
	 ***********************************************/

	// Url must match this pattern
	if (window.location.href.match(/\/courses\/\d+\/users/ig)) {
		// Listen for completion of all AJAX calls, then insert the Learning Mode button
		$(document).ajaxComplete(function () {
			if ($("#wms_roster_btn_learning").length === 0) {
                // Insert the Learning Mode button
                $("#content TABLE.roster.ic-Table").before('<div id="wms_roster_controls"><button id="wms_roster_btn_learning" class="btn btn-small" title="(Photos viewable on-campus or via VPN)"><i class="icon-user"></i> Show Face Book</button>&nbsp;&nbsp;<a href="#" id="wms_roster_toggle_names" title=""></a>&nbsp;&nbsp;<span class="hide" id="wms_shuffle_delimiter">|&nbsp;&nbsp;</span><a href="#" id="wms_roster_shuffle" title=""></a><br /><br /></div>');
				// Provide custom instructions for the "Add People" modal dialog (careful: modal is not initially in DOM; it is created on the fly by Canvas)
				$("#addUsers").click(function () {
					$("#create-users-step-1 p").text("Enter Unix names or Williams short email addresses, separated by commas.");
					$("#user_list_textarea").prop("placeholder", "Examples: pleia, ob1@williams.edu");
				});
			}
			else {
				// Avoid creating duplicate buttons
				return false;
			}

			// Toggle: Learning Mode button
			$("#wms_roster_btn_learning").toggle(function () {

				// Turn learning mode: ON
				$("#wms_roster_btn_learning").html("<i class=\"icon-user\"></i> Return to List");

				// Initial state of hyperlink
				$("#wms_roster_toggle_names").text("Turn Learning Mode On").prop("title", "Hide names");

				// Toggle: Names hyperlink
				$("#wms_roster_toggle_names").toggle(function () {
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
				var extractHTMLObjects = $("#content TABLE.roster.ic-Table TBODY TR.rosterUser");
				$.each(extractHTMLObjects, function () {
					// console.log(index + "/" + $(value).html()); // produces: 5/[object HTMLTableCellElement]
					var img = $(this).find('td:nth-child(1)').html();
					var name = $(this).find('td:nth-child(2)').html();
					var unixId = $.trim($(this).find ('td:nth-child(3)').text());
					var role = $(this).find('td:nth-child(6)').text();
                    var linkToWOC = '<br /><small><div class ="wms_wso_link"><a href="https://wso.williams.edu/facebook?subsearch=1&search='+unixId+'&commit=Search" class="external" target="_blank" ><span>More about '+unixId+'</span><span class="ui-icon ui-icon-extlink ui-icon-inline" title="Links to an external site."><span class="screenreader-only">Links to an external site.</span></a></small></div>';


                    // console.log(linkToWOC);

					var user_info = img + "<small class=\"\">" + name + "</small><br /><small class=\"\">" + role + "</small>" + linkToWOC;
					createGrid += "<div class=\"wms_roster_user\">" + user_info + "</div>";
				});
				createGrid = "<div id=\"wms_roster_grid\">" + createGrid + "</div>";

                // Add the shuffle hyperlink
				$("#wms_shuffle_delimiter").removeClass("hide");
                $("#wms_roster_shuffle").text("Shuffle").prop("title", "Reorder the roster");
                $("a#wms_roster_shuffle").click(function() {
                    //shuffle the grid elements
                    $("div#wms_roster_grid").randomize("div.wms_roster_user");
					});


                // Display grid (add it to DOM)
				$("#content TABLE.roster.ic-Table").before(createGrid);
				// Hide Canvas default student table
				$("#content TABLE.roster.ic-Table").addClass("hide");
			}, function () {
				// Turn learning mode: OFF
				$("#wms_roster_btn_learning").html("<i class=\"icon-user\"></i> Show Face Book").prop("title", "(Photos viewable on-campus or via VPN)");
				// Remove Link: Hide Names
				$("#wms_roster_toggle_names").text("").prop("title", "");
				// Remove shuffle delimiter
				$("#wms_shuffle_delimiter").addClass("hide");
				// Remove shuffle link
                $("#wms_roster_shuffle").text("").prop("title", "");
				// Remove grid from DOM
				$("#wms_roster_grid").remove();
				// Restore Canvas default student table
				$("#content TABLE.roster.ic-Table").removeClass("hide");
			});

		}); // END OF: (document).ajaxComplete
	}


	/***********************************************
	 ** Add Presenter View (zoom main div; hide all other columns)
	 ***********************************************/
	/*
	 * START: Scale a page using CSS3
	 * @param minWidth {Number} The width of your wrapper or your page's minimum width.
	 * @return {Void}
	 * author of scalePage fxn: http://binarystash.blogspot.com/2013/04/scaling-entire-page-through-css3.html
	 */

	function scalePage(minWidth) {

		//Check parameters
		if (minWidth === "") {
			console.log("minWidth not defined. Exiting");
			return;
		}

		//Do not scale if a touch device is detected.
		if (isTouchDevice()) {
			return;
		}

		//The 'body' tag should generally be the parent element, but hack works better with Canvas
		var parentElem = "#wrapper-container";

		//Wrap content to prevent long vertical scrollbars
		$(parentElem).wrapInner('<div id="resizer-boundary" />');
		$("#resizer-boundary").wrapInner('<div id="resizer-supercontainer" />');

		var boundary = $("#resizer-boundary");
		var superContainer = $("#resizer-supercontainer");

		//Get current dimensions of content
		var winW = $(window).width();
		var docH = $(parentElem).height();

		scalePageNow();
		$(window).resize(scalePageNow);

		//Nested functions

		function scalePageNow() {
			//Defining the width of 'supercontainer' ensures that content will be
			//centered when the window is wider than the original content.
			superContainer.width(minWidth);

			//Get the width of the window
			winW = $(window).width();

			var newWidth = winW / minWidth; //percentage
			var newHeight = (docH * (newWidth * minWidth)) / minWidth; //pixel
			superContainer.css({
				"transform": "scale(" + newWidth + ")",
				"transform-origin": "0 0",
				"-ms-transform": "scale(" + newWidth + ")",
				"-ms-transform-origin": "0 0",
				"-moz-transform": "scale(" + newWidth + ")",
				"-moz-transform-origin": "0 0",
				"-o-transform": "scale(" + newWidth + ")",
				"-o-transform-origin": "0 0",
				"-webkit-transform": "scale(" + newWidth + ")",
				"-webkit-transform-origin": "0 0"
			});
			boundary.css({
				"position": "relative",
				"overflow": "hidden",
				"height": newHeight + "px"
			});
		}

		function isTouchDevice() {
			return !!('ontouchstart' in window || window.navigator.msMaxTouchPoints);
		}
	}

	// END OF FUNCTION: scalePage()


    // Plugin taken from http://stackoverflow.com/questions/1533910/randomize-a-sequence-of-div-elements-with-jquery, credit http://stackoverflow.com/users/1216718/gruppler
    // Randomize the elements of a responsive grid
	// TODO: Figure out jquery plugins with Canvas
    (function($) {

        $.fn.randomize = function(selector){
            (selector ? this.find(selector) : this).parent().each(function(){
                $(this).children(selector).sort(function(){
                    return Math.random() - 0.5;
                }).detach().appendTo(this);
            });

            return this;
        };


    })(jQuery);
    //End plugin



	// Url must match this pattern (Do not display "Presenter View" link on pages that display LTI iframes)
	if (!window.location.href.match(/\/external_tools/ig)) {
		$("NAV#breadcrumbs").after('<div id="wms_presenter_breadcrumb"><a href="#" class="btn btn-primary" title="Enable Presenter View"><i class="icon-off"></i>&nbsp;Presenter&nbsp;View</a></div>');
		$("#application").prepend('<div id="wms_presenter_exit_btn"><div id="wms_presenter_exit_text" class="wmsPresenterRotate wmsDisplayNone" title="Exit Presenter View3">Exit&nbsp;Presenter&nbsp;View</div></div>');
	}

	// Exit Presenter View: reload page
	$("#wms_presenter_exit_btn").click(function () {
		location.reload();
	});

	// Enable Presenter View
	$("#wms_presenter_breadcrumb").click(function () {
		// hide breadcrumb link and all unnecessary page elements
		$("BODY").removeClass("course-menu-expanded");
		$("#wms_presenter_breadcrumb").addClass("wmsDisplayNone");
		$("HEADER").addClass("wmsDisplayNone");
		$(".ic-app-nav-toggle-and-crumbs").addClass("wmsDisplayNone");
		$("#left-side").addClass("wmsDisplayNone");
		$("#right-side-wrapper").addClass("wmsDisplayNone");
		$("#main").addClass("wmsMarginZero").css("cssText", "padding-left: 25px;max-width: 900px !important;"); // max-width should match value given to scalePage(), below
		$("#wrapper-container").addClass("wmsMarginZero");
		$(".ic-app-main-layout-horizontal").addClass("wmsMarginZero");
		// force all images to zoom correctly and avoid cutting off images; requires removing the default style: IMG{max-width:1050px}
		$("IMG").css("cssText", "max-width: 100% !important;");

		// do scale function
		scalePage(900); // set somewhat arbitrary hardcoded minWidth value

		// show exit button (on extreme left side)
		$("#wms_presenter_exit_btn").addClass("wmsPresenterExit");
		$("#wms_presenter_exit_text").removeClass("wmsDisplayNone");
	});


	/***********************************************
	 ** Customize UI: LOGIN PAGE
	 ***********************************************/
	if (window.location.href.match(/\/login\/ldap/ig) || window.location.href.match(/\/login\/canvas/ig) || window.location.href.match(/\/login/ig)) {
		// change title of page (formerly: Log In to Canvas)
		$(document).attr('title', 'Glow');

		// change labels/text
		$("#login_forgot_password").text("Forgot password?");

		// add tabindex attributes
		/****
		$("#login_form INPUT#pseudonym_session_unique_id").prop('placeholder', 'Username').prop('tabindex', '1');
		$("#login_form INPUT#pseudonym_session_password").prop('placeholder', 'Password').prop('tabindex', '2');
		$("#login_form BUTTON.Button--login").prop('tabindex', '3');
		 ****/

		// center the two input boxes using Canvas specific style
		var controlName = $("#login_form > .ic-Form-control--login");
		for (var i = 0; i < controlName.length; i += 2) {
			controlName.slice(i, i + 2).wrapAll('<div class="ic-Multi-input">');
		}

		// custom footer links (only on login page)
		$("#footer").append(
			'<p id="wms-login-footer">' +
			'<a class="hint-text" style="font-size: 115%;" href="https://dean.williams.edu/policies/classroom-recordings-and-use-of-class-materials/" target="_blank" title="Williams policy on recording and distribution of course materials">Williams policy on recording and distribution of course materials</a><br />' +
			'<a class="hint-text" href="http://oit.williams.edu/itech/glow/" target="_blank" title="Glow Help">Glow Help</a>' +
			'</p>'
		);

		// ***********************************************
		// Customize UI: MOBILE LOGIN PAGE
		// ***********************************************
		// Change labels/text
		$("#login_form.front.face A.forgot-password").text("Forgot password?");
	}


	/***********************************************
	 ** Customize UI: SELF ENROLL (ALTERNATE LOGIN PAGE)
	 ***********************************************/
	if (window.location.href.match(/\/enroll/ig)) {
		$("input[name=initial_action]").prev("p").text("Please enter your Username (without '@williams.edu') and password:");
		$("HEADER.ic-Login-confirmation__header").css("cssText", "background-color: #333333 !important;");
		$("IMG.ic-Login-confirmation__logo").attr("src","https://apps.williams.edu/glow/images/enroll-login.png").prop("alt","Williams College - GLOW");
	}


	/***********************************************
	 ** Customize UI: INTERNAL PAGES
	 ***********************************************/
	/*extend existing partial horizontal rule to boundary edges*/
	$("DIV.ic-app-nav-toggle-and-crumbs").addClass("wmsBreadCrumbsLine");
	$("FOOTER.ic-app-footer").addClass("wmsFooterLine");

	// Navigation: Add 'Signup Sheets' to Account Level
	$("UL#menu li:nth-child(4)").after('<li class="menu-item"><a id="wms_signup_sheets_icon" href="/users/1234567/external_tools/170518" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><img src="https://apps.williams.edu/glow/images/icon-signup-sheets.png" alt="Signup Sheets" title="Signup Sheets" /></div><div class="menu-item__text">Signup Sheets</div></a></li>');

	// Navigation to add 'Williams Resources' to the account level
    // After installing the LTI, correct the tool link based on the user menu
    $("UL#menu li:nth-child(5)").after('<li class="menu-item"><a id="wms_resources_icon" href="/users/1234567/external_tools/481471" class="ic-app-header__menu-list-link"><div class="menu-item-icon-container" aria-hidden="true"><img src="https://apps.williams.edu/glow/images/icon-williams-resources.png" alt="Williams Resources" title="Williams Resources" /></div><div class="menu-item__text">Resources</div></a></li>');


	/***********************************************
	 ** Footer/Branding Link Overrides
	 ***********************************************/
	if (!window.location.href.match(/\/login\/ldap/ig) && !window.location.href.match(/\/enroll/ig) && !window.location.href.match(/\/login\/canvas/ig)) {
		// Internal pages only: add custom footer link
		$("footer").append('<div class="ic-app-footer__links"><a href="https://dean.williams.edu/policies/classroom-recordings-and-use-of-class-materials/" title="Williams policy on recording and distribution of course materials" target="_blank">Williams policy on recording and distribution of course materials</a></div>');
	}


	/***********************************************
	 ** Add Google Analytics
	 ***********************************************/
	 (function (i, s, o, g, r, a, m) {
		 i['GoogleAnalyticsObject'] = r;
		 i[r] = i[r] || function () {
		 (i[r].q = i[r].q || []).push(arguments)
		 }, i[r].l = 1 * new Date();
		 a = s.createElement(o),
		 m = s.getElementsByTagName(o)[0];
		 a.async = 1;
		 a.src = g;
		 m.parentNode.insertBefore(a, m)
	 })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	 ga('create', 'UA-10912569-3', 'auto');
	 ga('send', 'pageview');

    //fixGlobalNavURL();
    //var Get_Name = ENV.current_user;
    //console.log(Get_Name); // For testing purpose

}); // END OF: (document).ready