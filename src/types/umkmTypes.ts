export interface CreateUmkmInput {
    categoryId: string;
    name: string;
    description?: string;
    contact: string;
    location?: {
        name: string;
        latitude: number;
        longitude: number;
    };
    socialMedias?: { platform: string; url: string }[];
    images?: Express.Multer.File[];
    panoramicImage?: Express.Multer.File;
    profileImage?: Express.Multer.File;
    typeIds: string[];
    userId: string;
}