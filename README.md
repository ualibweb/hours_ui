hours_ui
========

> Directives and UI for the University Libraries hours web app

## Getting Started

# Building the oneSearch UI

## First Steps

You need [Node.js](http://nodejs.org/) to use the tools that build this app. Download the proper Node.js package from their [download page](http://nodejs.org/download/).

After Node.js is installed, then you need to install [Grunt.js](http://gruntjs.com/getting-started) and [Bower](http://bower.io/) via the Node Package Manager (npm).
To do so, run the following commands:

> If you already have the Grunt Command Line Interface and Bower installed globally, skip this step.

```bash
npm install -g grunt-cli
npm install -g bower
```

## Install Grunt dependencies
If you haven't used [grunt](http://gruntjs.com) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

From the same directory as the repository's [Gruntfile.js](http://gruntjs.com/getting-started#the-gruntfile) and [package.json](http://gruntjs.com/getting-started#package.json), run the following command:

```bash
npm install
```

## Install Bower dependencies

```bash
bower install
```

## Edit and test locally before committing

This repo's default Grunt task will `watch` the source files for changes and `livereload` your browser. 
This will open a demo page of the app in your browser, re-build if any changes are made to the source, and `livereload` (refresh) your browser automatically.

> The dev/live builds and the app's demo/test page will be built to the `/dist` folder.

1. Run this command before making changes - the app's local demo page to open automatically in your browser.

    ```bash
    grunt
    ```
    
2. Edit the source and either press `Ctrl` + `S` or wait a couple seconds; the changes will re-build and your browser refreshed automatically.