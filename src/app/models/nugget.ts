
export class Nugget {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;

    constructor(id: string, userId: string, title: string, content: string, createdAt: Date){
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}