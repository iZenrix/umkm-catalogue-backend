export interface CreateUmkmInput {
    name: string;
    description?: string;
    location?: string;
    typeIds: number[];
    images?: Express.Multer.File[];
    panoramicImage?: Express.Multer.File;
    socialMedias?: { platform: string; url: string }[];
    userId: number;
    categoryId: number;
    contact: string;
}