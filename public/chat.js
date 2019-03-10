// Make connection from client
let url = "http://localhost:4000";
let socket = io.connect(url);

// Query DOM;
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function () {
    socket.emit('sendMessage', {
        message:  message.value,
        handle: handle.value,

    });
});
