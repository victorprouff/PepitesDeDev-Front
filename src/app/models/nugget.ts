import { Guid } from "guid-typescript";

export class Nugget {
    id: Guid;
    title: string;
    content: string;
    createdAt: Date

    constructor(id: Guid, title: string, content: string, createdAt: Date){
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}