# Williams College: Canvas Mods

**Summary:** Various modifications and customizations for our Instructure Canvas learning management system (LMS). Separate files make it easier to test independently on live and test servers.

**Author:** Developed by David Keiser-Clark (dwk2@williams.edu) for the Office for Information Technology at Williams College

**Follow:** If you have collaborative ideas or want to be notified of changes, please email me.

**GitHub:** [Williams College: canvas_williams_mods](https://github.com/williamscollege/canvas_williams_mods)

## SCREENSHOTS

 - [People: Add Face Book and Learning Mode](http://www.screencast.com/t/KFZZo4VF2 "People: Add Face Book and Learning Mode") (screenshot)
 - [Add Presenter View](http://www.screencast.com/t/mclVJfL28 "Add Presenter View") (screenshot)

## FEATURES

#### People: Add Face Book and Learning Mode

 - Add Button: Automatically insert a "Face Book" button on Canvas' "People" page
 - Larger Images: Creates a grid of larger images for viewing course participants
 - Learning Mode: Optionally show/hide all participant names (useful for memorizing names)
 - Printer: Enabled photos to display in print mode (works for Chrome and Safari, while FF and IE require manual clientside browser selection to "Print background images")
 - Printer: Removed hyperlink urls from displaying in print mode (All browsers)
 - Requires: Only these two JS/CSS global override files (wmsCanvasGlobal.css, wmsCanvasGlobal.js)
 - Future plans: I plan to add an LTI to inject the class year into each student's info box

#### Add Presenter View (zoom content area; hide all other columns)

 - Add Link: Automatically insert a "Presenter View" hyperlink on the right-side of the "breadcrumbs" navigation
 - Zoom: Increase zoom by 50% (transform scale is customizable)
 - Hide: Display only center column (hide: top, left, right, footer)
 - Display All: Increase height dynamically to prevent zoomed page from being inappropriately cut off
 - Resolution: Limit width to the default resolution of our wired classrooms (1024px)
 - Exit: Easily return to "normal mode" via "exit" button on left side of screen
 - Note: Hidden content remains in the document object model, but is hidden via CSS. This means the page still functions correctly
 - Note: The "Presenter View" hyperlink will appear on the right-side of all pages that contain the breadcrumbs navigation item
 - Intended Usage: classroom projector

#### Customize UI: LOGIN PAGE

 - Mobile: Completely overhauled the default mobile login page
 - Browser: Completely overhauled the default browser login page
 - Please refrain from reusing our design; you may use the code to create your own distinct override

#### Customize UI: INTERNAL PAGES

 - Browser: Completely overhauled the default top navigation design of internal pages
 - Please refrain from reusing our design; you may use the code to create your own distinct override

#### Footer/Branding Link Overrides

 - Created overrides to point Help and Terms footer links to our own pages, and hide Canvas Twitter/FaceBook links

#### Add Google Analytics

 - Added code to enable our Google Analytics to track Canvas pages
 - Simply swap in your own Google Analytics "setAccount" name

#### DEPENDENCIES

 - Canvas Live Server requires: wmsCanvasGlobal.css, wmsCanvasGlobal.js, /images
 - Canvas Test Server requires: wmsTESTCanvasGlobal.css, wmsTESTCanvasGlobal.js, /images
 - Canvas already provides jQuery

#### LICENSE

Copyright (c) 2014 David Keiser-Clark

Dual licensed under the MIT and GPL licenses.

Free as in Bacon.
