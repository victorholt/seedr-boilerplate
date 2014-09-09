Seedr Boilerplate
=================
Seedr is a web application boilerplate for a new web project.

##Requirements
- RequireJS
- jQuery
- NodeJS
- GulpJS
- Bower

##Installation

- Copy `build-config-dist.js` to `build-config.js`
- Run `npm install` in root directory
- Run `bower install` in root directory
- Run `gulp build` in the root directory

Ensure your NodeJS and Bower installation is current.

##Running Demo
There are a number of ways to run the demo, although the following steps below
get the demo application up and running the quickest.

###Startup the NodeJS Server
```
> node tools/nodeServer/nodeServer.js
```
Once the NodeJS server has been started you can get to your web application
by going to `http://localhost:8081` (assuming that port is open).

##Demo
The demo code can be found in the **demoView.js** file located at
`/src/assets/scripts/components/demo/demoView.js`.

The **app.js** file bootstraps the **DemoView** component class. This is very
bare bones and can be implemented to use **ReactJS**, **BackboneJS**, or
**AngularJS**.

##Compiling and Running Notes
All files, once compiled, are generated in the `/public/` folder. Files should
not be modified in the `/public/` directory and the server should point to the
`/public/` directory as the starting point.

###Helpful Build Commands
- `gulp build`
    + Performs a development build
- `gulp -b production build`
    + Performs a production build
- `gulp watch`
    + Watches for file changes
- `gulp clean`
    + Removes all generated files and directives
- `gulp clean-dest`
    + Removes the generated destination directory
- `gulp clean-tmp`
    + Removes the generated temporary directory
