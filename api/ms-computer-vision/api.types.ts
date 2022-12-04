import { ImageDescription } from "../../app.types";

export interface DescribeResponse extends ApiResponse {
    description: ImageDescription;
}

export interface ApiResponse {
    requestId: string;
    metadata: {
        height: number;
        width: number;
        format: 'png' | 'jpg' | 'jpeg';
    }
}