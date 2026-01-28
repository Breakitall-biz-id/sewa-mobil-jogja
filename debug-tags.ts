
import { getAllPosts } from "./src/lib/sanity";

async function run() {
    console.log("Fetching posts...");
    const posts = await getAllPosts();
    console.log(`Found ${posts.length} posts.`);
    posts.forEach((p: any) => {
        console.log(`Post: ${p.title}, Tags: ${JSON.stringify(p.tags)}`);
    });
}

run();
