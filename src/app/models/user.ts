export class User {
    constructor(
        id?: string,
        email?: string,
        token?: string
    ) {
        this.id = id;
        this.email = email;
        this.token = token
    }
    id?: string;
    email?: string;
    token?: string;
}