export class Nugget {
    constructor(id: string, userId: string, title: string, content: string, isEnabled: boolean, urlImage: string | null, creator: string, createdAt: Date) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.isEnabled = isEnabled;
        this.urlImage = urlImage;
        this.creator = creator;
        this.createdAt = createdAt;
    }

    id: string;
    userId: string;
    title: string;
    content: string;
    isEnabled: boolean;
    urlImage: string | null;
    creator: string
    createdAt: Date;
}