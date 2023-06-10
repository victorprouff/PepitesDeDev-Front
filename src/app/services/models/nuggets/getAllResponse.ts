interface Nugget {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: Date;
}

export interface GetAllResponse {
    nbOfNuggets: number;
    nuggets: Nugget[];
}