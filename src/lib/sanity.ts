import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type {
  SanitySiteSettings,
  SanityCar,
  SanityPost,
  SanityTestimonial,
  SanityComment,
  SanityCategory
} from '../types';

export const sanityClient = createClient({
  projectId: 'kg4rbx1y',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-23',
  stega: {
    enabled: false,
    studioUrl: 'https://sewa-mobil-jogjaku.id',
  }
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch site settings
export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      tagline,
      logo,
      whatsapp,
      phone,
      email,
      address,
      googleMapsEmbed,
      socialMedia,
      bankAccounts,
      defaultSeo
    }
  `);
}

// Fetch all cars
export async function getAllCars(): Promise<SanityCar[]> {
  return sanityClient.fetch(`
    *[_type == "car" && available == true] | order(pricePerDay asc) {
      _id,
      name,
      slug,
      category,
      image,
      gallery,
      capacity,
      luggage,
      pricePerDay,
      priceWithDriver,
      features,
      year,
      transmission,
      fuel,
      description,
      includes,
      conditions,
      "seo": seo
    }
  `);
}

// Fetch single car by slug
export async function getCarBySlug(slug: string): Promise<SanityCar | null> {
  return sanityClient.fetch(`
    *[_type == "car" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      category,
      image,
      gallery,
      capacity,
      luggage,
      pricePerDay,
      priceWithDriver,
      features,
      available,
      year,
      transmission,
      fuel,
      description,
      includes,
      conditions,
      "seo": seo
    }
  `, { slug });
}

// Fetch all blog posts
export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      category->{title, slug},
      tags,
      publishedAt,
      readTime,
      "seo": seo
    }
  `);
}

// Fetch single post by slug
export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category->{title, slug},
      tags,
      publishedAt,
      author->{name, avatar},
      readTime,
      "seo": seo
    }
  `, { slug });
}

// Fetch all testimonials
export async function getAllTestimonials(): Promise<SanityTestimonial[]> {
  return sanityClient.fetch(`
    *[_type == "testimonial"] | order(date desc) {
      _id,
      name,
      avatar,
      rating,
      review,
      date,
      source
    }
  `);
}

// Fetch all categories
export async function getAllCategories(): Promise<SanityCategory[]> {
  return sanityClient.fetch(`
    *[_type == "category"] | order(title asc) {
      title,
      slug
    }
  `);
}

// Fetch comments by post slug
export async function getCommentsByPostSlug(postSlug: string): Promise<SanityComment[]> {
  return sanityClient.fetch(`
    *[_type == "comment" && post->slug.current == $postSlug && approved == true] | order(_createdAt desc) {
      _id,
      name,
      comment,
      _createdAt
    }
  `, { postSlug });
}
