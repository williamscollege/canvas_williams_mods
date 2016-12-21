# Canvas Modifications

#### AUTHOR
* David Keiser-Clark (dwk2@williams.edu), Office for Information Technology, Williams College

## SCREENSHOTS
* [People: Add Face Book and Learning Mode](http://www.screencast.com/t/KFZZo4VF2 "People: Add Face Book and Learning Mode") (screenshot)
* [Add Presenter View](http://www.screencast.com/t/mclVJfL28 "Add Presenter View") (screenshot)

## DESCRIPTION
Custom modifications for our Instructure Canvas learning management system (LMS). These files reflect the current Canvas UI.

#### People: Add Face Book and Learning Mode
* Add Button: Automatically insert a "Face Book" button on Canvas' "People" page
* Larger Images: Creates a grid of larger images for viewing course participants
* Learning Mode: Optionally show/hide all participant names (useful for memorizing names)
* Shuffle: Rearranges the display order of the visible participants (to shuffle the full roster, be sure to load all participants before selecting shuffle)
* Printer: Enabled photos to display in print mode (works for Chrome and Safari, while FF and IE require manual clientside browser selection to "Print background images")
* Printer: Removed hyperlink urls from displaying in print mode (All browsers)
* Requires: Only these two JS/CSS global override files (wmsCanvasGlobal.css, wmsCanvasGlobal.js)
* Future plans: I plan to add an LTI to inject the class year into each student's info box

#### Add Presenter View (zoom main div; hide all other columns)
* Add Link: Automatically insert a "Presenter View" hyperlink on the right-side of the "breadcrumbs" navigation
* Zoom: Increase scale of main (center) region to fill browser, wrapping text as needed
* Rescale: Resize browser to dynamically increase/decrease visible aspect (zoom) ratio of text and images
* Hide: Display only main (center) div (hide: top, left, right)
* Display All: Increase height dynamically to prevent zoomed page from being inappropriately cut off
* Resolution: Set width to 900px to ensure magnification occurs in our wired classrooms
* Exit: Easily return to "normal mode" via "exit" button on left side of screen
* Note: Hidden content remains in the document object model, but is hidden via CSS. This means the page still functions correctly
* Note: The "Presenter View" hyperlink will appear on the right-side of all pages that contain the breadcrumbs navigation item
* Works with: All browsers, including mobile browsers (held in horizontal mode)
* Intended Usage: classroom projector

#### LOGIN PAGE UI
* Mobile: Completely overhauled the default mobile login page
* Browser: Completely overhauled the default browser login page
* Please refrain from reusing our design; you may use the code to create your own distinct override

#### INTERNAL PAGES UI
* Browser: Completely overhauled the default top navigation design of internal pages
* Please refrain from reusing our design; you may use the code to create your own distinct override

#### FOOTER/BRANDING
* Created overrides to point Help and Terms footer links to our own pages, and hide Canvas Twitter/FaceBook links

#### GOOGLE ANALYTICS
* Added code to enable our Google Analytics to track Canvas pages
* Simply swap in your own Google Analytics "setAccount" name

#### DEPENDENCIES
* Canvas Live Server requires: wmsCanvasGlobal.css, wmsCanvasGlobal.js, /images
* Canvas Test Server requires: wmsTESTCanvasGlobal.css, wmsTESTCanvasGlobal.js, /images
* Canvas already provides jQuery

#### LICENSE
* Copyright (c) 2014 David Keiser-Clark
* Dual licensed under the MIT and GPL licenses.
* Free as in Bacon.
