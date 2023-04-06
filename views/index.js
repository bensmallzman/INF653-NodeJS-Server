// create subdir to store images
// use fs.readFile() to read requested file from public dir
// use fs.existsSync() to check if it exists
// use server.listen() to start server at port
// implement EventLogs function - add call to beginning of callback function
// http://localhost:3000 should serve the image and log all events


// Core Node Modules
const fs = require("fs");
const path = require("path");
const http = require("http");
const fsPromises = require("fs").promises;

// logging
const logEvents = require("./logEvents");
const events = require("events");
const myEvent = new events.EventEmitter();
myEvent.on("log", (msg) => {
  logEvents(msg);
});
setTimeout(() => {
  myEvent.emit("log", "Log Event Emitted");
}, 2000);

// start server on port 3000
http.createServer(function(request, response) {
    readImg(request, response);
    // if i put any parameters in .listen then i get errno -98 'EADDRINUSE'
    }).listen();

console.log("Listening on port 3000");

function readImg(request, response) {
    const imgPath = "images/tux.jpg";
    try {
        if (request.url == "/"){
            if (fs.existsSync(imgPath))
            fs.readFile(imgPath, function (err, data){
                if (err){
                    response.writeHead(403);
                    response.write("Forbidden.");
                }
                else {
                    response.writeHead(200, {'Content-Type': 'text/html'});
                    response.write(data);
                }
                response.end();
            });
        }
        else {
            response.writeHead(404);
            response.write("Image does not exist.");
            response.end();
        }
    } catch (err) {
        response.write("Error reading file");
        response.end();
    }
}