# benwiley.org
http://benwiley.org

A personal site I designed and built, pour moi. Complicated view management stuff done with Backbone.js.

Features
--------
* A built-from-scratch persistent audio player footer that supports pausing, skipping and fast, responsive seeking.
* Fast-loading animated GIF previews for all projects, tap-to-play.
* Neat CSS3 transitions and animations.
* Clean and responsive design.

How to build
------------
1. Install Node.js: https://nodejs.org/
2. Install gulp: `npm install -g gulp`
3. Locally install the project's build dependencies. In the root directory, run 'npm install'.
4. Run `gulp` to build the project. Whenever HTML, JavaScript or CSS is updated, the project will re-build as appropriate. The build process currently does not watch for other file type changes, so gulp will need to be quit with Ctrl+C and restarted.

How to run locally
------------------
The built index.html file (and associated files) will be located in the dist/ directory, which should be created on build. The JavaScript doesn't make any external data requests, so it's not necessary to start a local server in order to view the page in a web browser.
