import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PostService from "../../../services/post";

// list posts
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const postService: PostService = req.scope.resolve("postService");

    const posts = await postService.list();
    console.log('Fetched posts:', posts); // Add this line for debugging

    res.json({
      posts,
    });
  } catch (error) {
    console.error("Error listing posts:", error);
    res.status(500).json({ error: "Failed to list posts" });
  }
};


// create a post
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const postService: PostService = req.scope.resolve("postService");

    // basic validation of request body
    if (!req.body || !req.body.title || !req.body.author_id) {
      throw new Error("`title` and `author_id` are required.");
    }

    const post = await postService.create(req.body);

    res.status(201).json({
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ error: error.message || "Failed to create post" });
  }
};

