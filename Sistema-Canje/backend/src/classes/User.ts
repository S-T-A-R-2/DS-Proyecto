export class UserClass {
    constructor(
        public username: string,
        public name: string,
        public phone: string,
        public email: string,
        public password: string,
        public rol: string
    ) {
        this.username = username;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
}
