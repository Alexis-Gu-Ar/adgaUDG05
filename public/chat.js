// Make connection from client
let port = 5000;
let url = "localhost:" + port;
let socket = io.connect(url);

// Query DOM;
let message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
    socket.emit('sendMessage', {
        message:  message.value,
        handle: handle.value,
    });
});

message.addEventListener("keypress", function () {
    socket.emit('typing', handle.value);
});

// Listen for events
socket.on('sendMessage', data => {
    let messageContainer = document.createElement('p');

    let handleContainer = document.createElement('strong');
    let handleName = document.createTextNode(data.handle + ": ");
    handleContainer.appendChild(handleName);
    messageContainer.appendChild(handleContainer);

    let messageText = document.createTextNode(data.message);
    messageContainer.appendChild(messageText);

    output.appendChild(messageContainer);
    removeAllChildren(feedback);
});

socket.on('typing', data => {
    removeAllChildren(feedback);
    feedback.appendChild(document.createTextNode(data + ' is typing...'));
});

function  removeAllChildren(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}
