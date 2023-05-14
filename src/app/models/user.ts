import { Guid } from "guid-typescript";

export class User {
    constructor(
        id?: Guid,
        email?: string,
        token?: string
    ) {
        this.id = id;
        this.email = email;
        this.token = token
    }
    id?: Guid;
    email?: string;
    token?: string;
}