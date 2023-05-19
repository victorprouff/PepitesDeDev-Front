import { Guid } from "guid-typescript";

export class Nugget {
    id: Guid;
    userId: Guid;
    title: string;
    content: string;
    createdAt: Date

    constructor(id: Guid, userId: Guid, title: string, content: string, createdAt: Date){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}