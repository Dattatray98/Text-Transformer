const vscode = acquireVsCodeApi();

function sendMessage() {
    const input = document.getElementById('message');
    const text = input.value;
    const chat = document.getElementById('chat');

    const userMsg = document.createElement('p');
    userMsg.textContent = input.value;
    userMsg.style.textAlign = 'right';

    chat.appendChild(userMsg);

    vscode.postMessage({
        command: "chat",
        text: text
    });

    input.value = "";
}

window.addEventListener("message", event => {

    const message = event.data;

    if (message.command === "response") {

        const chat = document.getElementById('chat');

        const aiMsg = document.createElement('p');
        aiMsg.textContent = message.text;
        aiMsg.style.textAlign = "left";

        chat.appendChild(aiMsg);

    }

});