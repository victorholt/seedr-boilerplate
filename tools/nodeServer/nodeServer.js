/* jshint node:true, laxbreak: true */
'use strict';

/**
 * A simple node server for testing the application. A more roboust
 * application may want to add the server-side code in the /src folder.
 */

var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

app.use('/assets/css', express.static(path.join(__dirname, '../../public/assets/css')));
app.use('/assets/media', express.static(path.join(__dirname, '../../public/assets/media')));
app.use('/assets/scripts', express.static(path.join(__dirname, '../../public/assets/scripts')));
app.use('/assets/vendors', express.static(path.join(__dirname, '../../public/assets/vendors')));

app.get('/', function(req, res) {
    fs.readFile(path.join(__dirname, '../../public/index.html'), function(err, data) {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Length', data.length);

        res.end(data);
    });
});

app.listen(8081, function() {
    console.log('NodeJS Server running on port 8081');
    console.log('Website can be reached at http://localhost:8081');
});
