const socket = io()

let naam;

let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.messagearea')

do {
    naam = prompt('Please Enter Your Name:')
} while (!naam)

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let msg = {
        user: naam,
        message: message.trim()
    }

    //append the massege

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollTobottom()

    //send to server via websocket
    socket.emit('message', msg)
}


function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messagearea.appendChild(mainDiv)
}

//recive message

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollTobottom()
});

function scrollTobottom() {
    messagearea.scrollTop = messagearea.scrollHeight
}