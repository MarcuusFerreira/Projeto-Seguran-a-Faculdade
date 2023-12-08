module.exports = app => {
    app.route('/users/register')
        .post(app.src.services.userService.insertUser)
    app.route('/users/login')
        .post(app.src.services.userService.login)
    app.route('/message/send')
        .post(app.src.services.messageService.createMessage)
    app.route('/message/new_messages')
        .post(app.src.services.messageService.getNewMessages)
    app.route('/users/contacts')
        .post(app.src.services.contactsService.getContacts)
}