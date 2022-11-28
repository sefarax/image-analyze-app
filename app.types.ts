export interface ImageDescription {
    captions: Caption[];
    tags: string[];
}

export interface Caption {
    confidence: number;
    text: string;
}

export type ReturnState = (prevState: any) => any