export interface Author {
    username: string;
    pictureUrl: string;
    name: string;
}

export interface Article {
    id: string;
    url: string;
    title: string;
    content?: string;
    description: string;
    date: Date;
    flair: string;

    author: Author;
}
