
export class Nugget {
    constructor(id: string, userId: string, title: string, content: string, creator: string, createdAt: Date){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.creator = creator;
        this.createdAt = createdAt;
    }

    id: string;
    userId: string;
    title: string;
    content: string;
    creator: string
    createdAt: Date;
}