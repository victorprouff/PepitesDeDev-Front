interface Nugget {
    id: string;
    userId: string;
    title: string;
    content: string;
    isEnabled: boolean;
    urlImage: string | null;
    creator: string;
    createdAt: Date;
}

export interface GetAllResponse {
    nbOfNuggets: number;
    nuggets: Nugget[];
}