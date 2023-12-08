const URL_LOGIN = 'http://localhost:4001/users/login'

const buttonRegister = document.getElementById('register-button')

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


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const username = document.getElementById('user').value;
        const password = document.getElementById('password').value;
        if (!username.trim() || !password.trim()) {
            console.log('campos em branco')
            createAlertContainer('Campos não podem ser vazios');
            return null
        }

      const data = {name: username, password: password}  

      try {
        const response = await fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            createAlertContainer('Não foi possivel realizar o login!')
        }
        
        const responseData = await response.json()
        if (responseData.status === 'ok') {
            createAlertContainer(responseData.message)
            sessionStorage.setItem('userId', responseData.user.id)
            sessionStorage.setItem('name', responseData.user.name)
            sessionStorage.setItem('password', responseData.user.password)
            sessionStorage.setItem('publicKey', responseData.user.publicKey)
            sessionStorage.setItem('privateKey', responseData.user.privateKey)
            window.location.href = '../html/send_message.html'
        }else {
            createAlertContainer('Ocorreu um erro ao realizar o login');
        }

      }catch(error) {
        createAlertContainer('Houve um erro por parte do servidor')
      }
    })
})


buttonRegister.addEventListener('click', () => {
    window.location.href = '../html/cadastro.html'
})