// Created 2016-05-20 by Jonathan Perry
// This program will setup a simple http server using code from a begginer's blog
// for NodeJS
// URL: http://blog.modulus.io/build-your-first-http-server-in-nodejs

// Changelog:
// 2015-05-20-15:42
// Original program called for displaying a fixed string
// Going to rewrite the program to display text from a read file instead

// 2015-05-20-15:48
// Add a second URL that can be used to gracefully terminate the server
// rather than hitting ctrl+c at the command prompt

// 2015-06-15
// Successfully made program read a text file!
// Made program display text based on url code
// Cannot do this more than once without the program crashing. Need to fix this!


// Lets require/import the HTTP module
var http = require('http');

// Require the fs module
var fs = require('fs');

var url = require('url');

// Lets define a port we want to listen to
const PORT=8080;

// We need a function which handles requests and send response
function handleRequest(request, response) {
	fs.readFile("serverMessage.txt", "utf8", function (error, data) {
		var url_parts = url.parse(request.url, true);
		var query = url_parts.query;
		response.setHeader('content-type', 'text/html');
		console.log("Query: " + query.toString());
		response.write(data);
		response.write(query.q);
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
