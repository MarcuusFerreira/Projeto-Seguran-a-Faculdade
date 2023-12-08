const URL_REGISTER_NEW_USER = 'http://localhost:4001/users/register'

const register = document.getElementById('register')
const login = document.getElementById('login')

const createElement = (nameElement, classElement) => {
    let element = document.createElement(nameElement)
    for(var classHtml of classElement) {
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

register.addEventListener('click', async () => {

    const username = document.getElementById('name').value
    const password = document.getElementById('password').value

    if (!username.trim(), !password.trim()) {
        console.log(username)
        console.log(password)
        createAlertContainer('Todos os campos são Obrigatorios')
    }

    const data = {name: username, password: password}

    const response = await fetch(URL_REGISTER_NEW_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    console.log(response)

    if(response.statusText ==='Created'){
        createAlertContainer('Usuario cadastrado!')
        window.location.href = '../html/login.html'
    }

})

login.addEventListener('click', () => {
    window.location.href = '../html/login.html'
})