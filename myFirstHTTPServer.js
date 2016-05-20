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

// Make sure a filename is given as a commandline parameter
if (process.argv.length < 3) {
	console.log('Usage: node ' + process.argv[1] + ' FILENAME');
	process.exit(1);
}

// Import/require the fs module
var fs = require('fs'), filename = process.argv[2];

// Lets require/import the HTTP module
var http = require('http');

// Lets define a port we want to listen to
const PORT=8080;

// We need a function which handles requests and send response
// Response will now read an input file and print its contents
function handleRequest(request, response) {
	response.end( fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
			console.log('OK: ' + filename);
			console.log(data)
		});
	);
}

// Create a server
var server = http.createServer(handleRequest);

// Lets start our server
server.listen(PORT, function() {
	// Callback triggered when server is successfully listening. Hurray!
	console.log("Server is listening on: http://localhost:%s", PORT);
});
