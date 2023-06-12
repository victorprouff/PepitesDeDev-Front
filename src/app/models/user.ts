export class User {
    constructor(
        id?: string,
        email?: string,
        username?: string,
        token?: string
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.token = token
    }
    id?: string;
    email?: string;
    username?: string;
    token?: string;
}