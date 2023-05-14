import { Guid } from "guid-typescript";

export class Nugget {
    id: Guid;
    title: string;
    description: string;

    constructor(id: Guid, title: string, description: string){
        this.id = id;
        this.title = title;
        this.description = description;
    }
}