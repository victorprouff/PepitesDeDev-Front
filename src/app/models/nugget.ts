import { Guid } from "guid-typescript";

export class Nugget {
    id: Guid;
    title: string;
    description: string;
    createdAt: Date

    constructor(id: Guid, title: string, description: string, createdAt: Date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
    }
}