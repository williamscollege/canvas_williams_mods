Name: canvas_williams_mods
Summary: A collection of code for customizing the Instructure Canvas LMS. Separate files exist for independently testing on production and test servers.
Author: Developed by David Keiser-Clark (dwk2@williams.edu) for the Office for Information Technology at Williams College
Follow: If you have collaborative ideas or want to be notified of changes, please email me.


***********************************************
FILES
***********************************************
Production Server:
 - /images
 - wmsCanvasGlobal.css
 - wmsCanvasGlobal.js

Test Server: 
 - /images
 - wmsTESTCanvasGlobal.css
 - wmsTESTCanvasGlobal.js


***********************************************
FEATURES
***********************************************

-----------------------------------------------
Williams Feature: People: Add Face Book, Learning Mode
-----------------------------------------------

This feature inserts a "Face Book" button on the People section, which enables larger images of course participants.
This feature also includes a useful "Learning Mode" hyperlink which will hide all participant names, enabling you to view their name only by hovering over their image.
Future plans: I plan to also add the class year to each student's info box.


-----------------------------------------------
Williams Feature: Add Presentation Mode (hide top, left and right divs from page)
-----------------------------------------------

This feature simply hides the left, right and top sections of the page to maximize use of the main area for full screen presentation (i.e. via digital projector).
All content remains in the document object model, but is hidden via CSS. This means the page still functions correctly. 
A floating link at top right of page enables easy ability to return to "normal mode".
Note that the "Presentation Mode" hyperlink will appear on the right-side of all pages that contain the breadcrumbs navigation item.


-----------------------------------------------
Williams Feature: Add Google Analytics
-----------------------------------------------
Added code to enable our Google Analytics to track Canvas pages. 
Simply swap in your own Google Analytics "setAccount" name.


-----------------------------------------------
Williams UI: LOGIN PAGE
-----------------------------------------------
We completely overhauled our login page. Please refrain from reusing our design; you may use the code to create your own distinct override.


-----------------------------------------------
Williams UI: INTERNAL PAGES
-----------------------------------------------
We also created a top navigation design for our internal pages. Please refrain from reusing our design; you may use the code to create your own distinct override.


-----------------------------------------------
Williams Overrides: Footer Links
-----------------------------------------------
Overrides to point Help and Terms footer links to our own pages
NOTE: The CSS file also contains additional overrides to hide Canvas links for their Twitter, FaceBook, etc.

