import { createClient } from '@sanity/client';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const sanity = createClient({
  projectId: "kg4rbx1y",
  dataset: "production",
  apiVersion: "2024-02-13",
  useCdn: false,
  token: "skUcAkRyvZ1LmlgsuS9n52orbwXq9mQ3eC7wPNRvgdS4ZSykS9g1VLAzx9u5iW3cTjOa0sy7HkEWY4dRcOgGV0UQjwvY24srM3nyZ2y88sXBOd8gYvuFbOVN8OUWHCosUgz7FyF3AI4OMYf4rq4w38Rr4vUskmV17a9KHBF8Z8gzX1dNlY7B"
  // Ensure this env var is set
});
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, comment, postSlug } = data;
    if (!name || !email || !comment || !postSlug) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }
    const post = await sanity.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug: postSlug }
    );
    if (!post) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404
      });
    }
    await sanity.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: post
      },
      approved: true
      // Auto-approve for demo purposes? Or false for moderation. Let's do true for instant gratification as requested.
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
