const URL_GET_NEW_MESSAGES = 'http://localhost:4001/message/new_messages'

const sendMessagesButton = document.getElementById('send-messages-button')

const userId = sessionStorage.getItem('userId')
const username = sessionStorage.getItem('name')
const password = sessionStorage.getItem('password')
const publicKey = sessionStorage.getItem('publicKey')
const privateKey = sessionStorage.getItem('privateKey')

const createElement = (nameElement, classElement) => {
    let element = document.createElement(nameElement)
    for (var classHtml of classElement) {
        element.classList.add(classHtml)
    }
    return element
}

const createMessage = (text, name) => {
    const divMessage = createElement('div', ['message-container'])
    const message = createElement('p', ['text-message'])
    message.textContent = name + ': ' + text
    divMessage.appendChild(message)
    return divMessage
}

const getNewMessages = async () => {
    const data = {
        userId: userId,
        privateKey: privateKey
    }
    const response = await fetch(URL_GET_NEW_MESSAGES, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const responseData = await response.json()

    console.log(responseData)
    
    const nameArray = responseData.messages.map(message => message.name)
    const messagesArray = responseData.messages.map(message => message.message)

    const containerMessages = document.querySelector('.container-messages');

    messagesArray.forEach((text, index) => {
        const messageContainer = createMessage(text, nameArray[index]);
        containerMessages.appendChild(messageContainer);
    });
}

sendMessagesButton.addEventListener('click', () => {
    sessionStorage.setItem('userId', userId)
    sessionStorage.setItem('name', username)
    sessionStorage.setItem('password', password)
    sessionStorage.setItem('publicKey', publicKey)
    sessionStorage.setItem('privateKey', privateKey)
    window.location.href = '../html/send_message.html'
})

getNewMessages()