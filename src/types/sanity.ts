export interface SanityImage {
    asset: {
        _ref: string;
        _type: string;
    };
    alt?: string;
    caption?: string;
}

export interface Slug {
    current: string;
    _type: "slug";
}

export interface Category {
    title: string;
    slug: Slug;
}

export interface Author {
    name: string;
    avatar?: SanityImage;
}

export interface Post {
    _id: string;
    title: string;
    slug: Slug;
    excerpt: string;
    featuredImage?: SanityImage;
    category?: Category;
    publishedAt: string;
    author?: Author;
    readTime?: number;
    content: any[]; // PortableText content
    tags?: string[];
    seo?: {
        title?: string;
        description?: string;
        keywords?: string[];
    };
}

export interface Car {
    _id: string;
    name: string;
    slug: Slug;
    brand: string;
    type: string;
    year?: number;
    transmission: "Manual" | "Automatic";
    fuel: "Bensin" | "Solar" | "Listrik";
    seats: number;
    price: number;
    images?: SanityImage[];
    features?: string[];
    isAvailable: boolean;
    description?: string;
}

export interface Testimonial {
    _id: string;
    name: string;
    role?: string;
    avatar?: SanityImage;
    content: string;
    rating: number;
}

export interface Comment {
    _id: string;
    name: string;
    email: string;
    comment: string;
    post: {
        _type: "reference";
        _ref: string;
    };
    approved: boolean;
    _createdAt?: string;
}
