
const socket = io('http://localhost:8000');

const form =  document.getElementById('send-container');

const messageInp = document.getElementById('messageInp');

const messsageContainer = document.querySelector('.container');

var join_chat_notification = new Audio('join_chat_notification.mp4');

var new_msg_notification = new Audio('new_msg_notification.mp4');

var left_chat_notification = new Audio('left_chat_notification.mp4');

const append = (message , position) => {

    const messageElement = document.createElement('div');
    messageElement.innerText= message ;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messsageContainer.append(messageElement);


}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    if(`${message}`==``){
        window.alert(`no msg! plz type something`)
        return false
    }
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';
})


const cname = prompt("Enter your name to join");



socket.emit('new-user-joined',cname);

socket.on('user-joined',cname =>{
    join_chat_notification.play();
    append(`${cname} joined the chat`,'right')
    


})

socket.on('receive',data =>{
    append(`${data.cname}: ${data.message}`,'left')
    new_msg_notification.play();

})

socket.on('left',cname =>{
    append(`${cname}: left the chat`,'left')
    left_chat_notification.play();

})