import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import PostService from "../../../../services/post";

// retrieve a post by its ID
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const postService: PostService = req.scope.resolve("postService");

  const post = await postService.retrieve(req.params.id);

  res.json({
    post,
  });
};

// update a post by its ID
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const postService: PostService = req.scope.resolve("postService");  

  // basic validation of request body
  if (req.body.id) {
    throw new Error("Can't update post ID");
  }

  const post = await postService.update(req.params.id, req.body);

  res.json({
    post,
  });
};

// delete a post by its ID
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const postService: PostService = req.scope.resolve("postService");

  await postService.delete(req.params.id);

  res.status(200).end();
};
