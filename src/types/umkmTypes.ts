export interface CreateUmkmInput {
    name: string;
    description?: string;
    location?: string;
    categoryId: number;
    typeIds: number[];
    images?: string[];
    panoramicImage?: string;
    socialMedias?: { platform: string; url: string }[];
    userId: number;
}