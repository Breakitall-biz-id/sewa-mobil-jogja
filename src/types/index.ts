export interface SanitySlug {
    current: string;
}

export interface SanityImage {
    asset: {
        _ref: string;
        _type: 'reference';
    };
    alt?: string;
}

export interface SanitySEO {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: SanityImage;
}

export interface SanitySocialMedia {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
}

export interface SanitySiteSettings {
    siteName?: string;
    tagline?: string;
    logo?: SanityImage;
    whatsapp?: string;
    phone?: string;
    email?: string;
    address?: string;
    googleMapsEmbed?: string;
    socialMedia?: SanitySocialMedia;
    bankAccounts?: string;
    defaultSeo?: SanitySEO;
}

export interface SanityCategory {
    title: string;
    slug: SanitySlug;
}

export interface SanityCar {
    _id: string;
    name: string;
    slug: SanitySlug;
    category: string;
    image?: SanityImage;
    gallery?: SanityImage[];
    capacity: number;
    luggage: string | number;
    pricePerDay: number;
    priceWithDriver?: number;
    features?: string[];
    year?: number;
    transmission?: string;
    fuel?: string;
    description?: any[]; // Block content
    includes?: string[];
    conditions?: string[];
    seo?: SanitySEO;
    available?: boolean;
}

export interface SanityAuthor {
    name: string;
    avatar?: SanityImage;
}

export interface SanityPost {
    _id: string;
    title: string;
    slug: SanitySlug;
    excerpt?: string;
    featuredImage?: SanityImage;
    category?: SanityCategory;
    tags?: string[];
    publishedAt?: string;
    author?: SanityAuthor;
    content?: any;
    readTime?: number;
    seo?: SanitySEO;
}

export interface SanityTestimonial {
    _id: string;
    name: string;
    avatar?: SanityImage;
    rating: number;
    review: string;
    date?: string;
    source?: string;
}

export interface SanityComment {
    _id: string;
    name: string;
    comment: string;
    _createdAt: string;
}

export interface SanityLandingPage {
    _id: string;
    title: string;
    slug: SanitySlug;
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
        openGraphImage?: SanityImage;
    };
    featuredImage?: SanityImage;
    content?: any[];
}
