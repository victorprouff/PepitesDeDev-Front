export class User {
    constructor(
        id?: string,
        email?: string,
        username?: string,
        isAdmin?: boolean,
        token?: string
    ) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.isAdmin = isAdmin;
        this.token = token
    }
    id?: string;
    email?: string;
    username?: string;
    isAdmin?: boolean;
    token?: string;
}