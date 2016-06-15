// Created 2016-05-20 by Jonathan Perry
// This program will setup a simple http server using code from a begginer's blg
// for NodeJS
// URL: http://blog.modulus.io/build-your-first-http-server-in-nodejs

// Changelog:
// 2015-05-20-15:42
// Original program called for displaying a fixed string
// Going to rewrite the program to display text from a read file instead

// 2015-05-20-15:48
// Add a second URL that can be used to gracefully terminate the server
// rather than hitting ctrl+c at the command prompt


// Lets require/import the HTTP module
var http = require('http');

// Require the fs module
var fs = require('fs');

var url = require('url');

// Lets define a port we want to listen to
const PORT=8080;

// We need a function which handles requests and send response
function handleRequest(request, response) {
	fs.readFile("HelloWorld.txt", "utf8", function (error, data) {
		var url_parts = url.parse(request.url, true);
		var query = JSON.stringify(url_parts.query);
		response.setHeader('content-type', 'text/html');
		console.log("Query: " + query);
		response.write(data);
		response.end();	
	});
}

// Create a server
var server = http.createServer(handleRequest);

// Lets start our server
server.listen(PORT, function() {
	// Callback triggered when server is successfully listening. Hurray!
	console.log("Server is listening on: http://localhost:%s", PORT);
});
