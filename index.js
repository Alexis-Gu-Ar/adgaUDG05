let express = require('express');
let socket = require('socket.io');

// App setup
// express is a function
let app = express();

let port = 4000;
//create server
let server = app.listen(port, function () {
    console.log('Listening to request on port: ' + port);
});

// static files
// we are saying to express to look for a static file in the public directory
// it redirects you to index.html
app.use(express.static('public'));

// Socket setup
let io = socket(server);

io.on('connection', function (socket) { // a particular socket between a client and server
    console.log("Made socket connection: " + socket.id);
    // this variable socket refers to the parameter of the function, not the
    // global variable

    socket.on('sendMessage', function (data) {
        io.sockets.emmit('sendMessage', data);
    });
});
