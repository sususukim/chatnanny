const chatBox = document.getElementById('chatBox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

function initGreeting() {
    displayMessage('ChatNanny', '안녕하세요! 어떻게 도와드릴까요?');
}

let mydate = ''

//처음에는 block으로 안보이다가, 메세지 입력시 loader보이는 함수
function spinner() {
    document.getElementById("loader").style.display = 'block';
}

function start() {
    const date = document.getElementById('date').value;
    if (date ===''){    
        alert("생년월일을 입력해주세요.");
        return;
    }
    mydate = date;
    console.log(mydate);
    //userMessage.push(date);
    document.getElementById("intro").style.display = "none";
    document.getElementById("chat").style.display = "block";
    
    //document.querySelector('.chat-container').style.display = 'block';

}
function sendMessage() {
    const message = messageInput.value;
    let userMessage
    
    
    if (!message) return; // Prevent sending empty messages

    // Display the user's message in the chat
    displayMessage('You', message);

    // Send the user's message to the server
    getNanny(message);

    // Clear the input field
    messageInput.value = '';
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
}

async function getNanny(userMessage) {
    try {
        const response = await fetch("https://qjihzhbmiz5lrpbbtzr5wbmm540retxw.lambda-url.ap-northeast-2.on.aws/IAMYOURNANNY", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                message: userMessage,
                mydate: mydate,
             }),
        });

        if (response.ok) {
            const result = await response.json();
            document.getElementById("loader").style.display = 'none'; 
            // Display the assistant's response in the chat
            displayMessage('ChatNanny', result.assistant);
        } else {
            console.error("실패:", response.status);
        }
    } catch (error) {
        console.error("실패:", error);
    }
}

// Initialize with a greeting message
initGreeting();

// Set up a click event handler for the send button
sendButton.addEventListener('click', sendMessage);
