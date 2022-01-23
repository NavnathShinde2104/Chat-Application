
const socket = io('http://localhost:8000');

const form =  document.getElementById('send-container');

const messageInp = document.getElementById('messageInp');

const messsageContainer = document.querySelector('.container');

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
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';
})


const cname = prompt("Enter your name to join");

socket.emit('new-user-joined',cname);

socket.on('user-joined',cname =>{
    append(`${cname} joined the chat`,'right')

})

socket.on('receive',data =>{
    append(`${data.cname}: ${data.message}`,'left')

})