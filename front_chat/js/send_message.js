const URL_SEND_MESSAGES = 'http://localhost:4001/message/send'
const URL_GET_CONTACTS = 'http://localhost:4001/users/contacts'

const buttonNewMessages = document.getElementById('get-message-button')
const contacts = document.getElementById('contacts')
let message = document.getElementById('message')
const buttonSendMessage = document.getElementById('sendMessage')

const userId = sessionStorage.getItem('userId')
const username = sessionStorage.getItem('name')
const password = sessionStorage.getItem('password')
const publicKey = sessionStorage.getItem('publicKey')
const privateKey = sessionStorage.getItem('privateKey')
const publicKeys = {}

const createElement = (nameElement, classElement) => {
    let element = document.createElement(nameElement)
    for (var classHtml of classElement) {
        element.classList.add(classHtml)
    }
    return element
}

const createAlertContainer = (text) => {
    const overlay = createElement('div', ['overlay']);
    document.body.appendChild(overlay);
    const alertContainer = createElement('div', ['alert-container'])
    const alertMessage = createElement('p', ['alert-message'])
    alertMessage.textContent = text

    const closeButton = createElement('button', ['close-button']);
    closeButton.textContent = 'Fechar';
    closeButton.addEventListener('click', () => {
        document.body.removeChild(alertContainer);
        document.body.removeChild(overlay);
    })

    alertContainer.appendChild(alertMessage)
    alertContainer.appendChild(closeButton)
    document.body.appendChild(alertContainer)
}

const populateSelection = async () => {
    const sendJson = {originId: userId}
    const response = await fetch(URL_GET_CONTACTS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendJson)
    })

    const responseData = await response.json()

    responseData.listUsers.forEach(contact => {
        const option = document.createElement("option")
        option.value = contact.id
        option.text = contact.name
        contacts.appendChild(option)
        publicKeys[contact.id] = contact.publicKey
    });
}

buttonNewMessages.addEventListener('click', () => {
    sessionStorage.setItem('userId', userId)
    sessionStorage.setItem('name', username)
    sessionStorage.setItem('password', password)
    sessionStorage.setItem('publicKey', publicKey)
    sessionStorage.setItem('privateKey', privateKey)
    window.location.href = '../html/recive_messages.html'
})

buttonSendMessage.addEventListener('click', async () => {
    const newMessage = message.value
    if(contacts.options[contacts.selectedIndex].text === 'Selecione...') {
        createAlertContainer('Selecione um contato')
        return
    }
    if (!newMessage) {
        createAlertContainer('Mensagem não pode ser vazia')
    }
    const contactId = contacts.value
    let destinyPublicKey = ''
    let destinyId = ''
    for(const key in publicKeys) {
        if (key === contactId) {
            console.log(key)
            console.log(contactId)
            console.log(publicKeys[key])
            destinyId = key
            destinyPublicKey = publicKeys[key]
        }
    }
    const data = {
        message: newMessage,
        userOriginId: userId,
        userDestinyId: destinyId,
        userDestinyPublicKey: destinyPublicKey
    }
    
    const response = await fetch(URL_SEND_MESSAGES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if(responseData.status === 'created') {
        createAlertContainer(responseData.message)
    } else {
        createAlertContainer(responseData.error)
    }

    message.value = ''
})

populateSelection()