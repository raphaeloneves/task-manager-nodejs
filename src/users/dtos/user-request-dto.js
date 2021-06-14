class UserRequestDto {
    constructor(name = '', email = '', age = '', password = '') {
        this.name = name
        this.email = email
        this.age = age
        this.password = password
    }
}

module.exports = UserRequestDto