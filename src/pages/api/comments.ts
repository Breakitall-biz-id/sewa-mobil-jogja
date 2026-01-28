export const prerender = false;

import { createClient } from "@sanity/client";
import type { APIRoute } from "astro";

const sanity = createClient({
    projectId: "kg4rbx1y",
    dataset: "production",
    apiVersion: "2024-02-13",
    useCdn: false,
    token: import.meta.env.SANITY_API_TOKEN, // Ensure this env var is set
});

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, comment, postSlug } = data;

        if (!name || !email || !comment || !postSlug) {
            return new Response(
                JSON.stringify({ message: "All fields are required" }),
                { status: 400 }
            );
        }

        // Find post ID by slug
        const post = await sanity.fetch(
            `*[_type == "post" && slug.current == $slug][0]._id`,
            { slug: postSlug }
        );

        if (!post) {
            return new Response(JSON.stringify({ message: "Post not found" }), {
                status: 404,
            });
        }

        // Create comment in Sanity
        await sanity.create({
            _type: "comment",
            name,
            email,
            comment,
            post: {
                _type: "reference",
                _ref: post,
            },
            approved: true, // Auto-approve for demo purposes? Or false for moderation. Let's do true for instant gratification as requested.
        });

        return new Response(
            JSON.stringify({ message: "Comment submitted successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
};
