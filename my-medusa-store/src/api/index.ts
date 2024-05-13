import { Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";

export default () => {
  const router = Router();

  const storeCorsOptions = {
    origin: process.env.STORE_CORS || "http://localhost:8000",
    credentials: true,
  };

  const adminCorsOptions = {
    origin:
      process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001",
    credentials: true,
  };

  // Middleware
  router.use(bodyParser.json());

  // Store Routes
  router.get(
    "/store/products/:id/reviews",
    cors(storeCorsOptions),
    async (req, res) => {
      try {
        const productReviewService = req.scope.resolve("productReviewService");
        const product_reviews = await productReviewService.getProductReviews(
          req.params.id
        );
        return res.json({ data: product_reviews });
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  router.post(
    "/store/products/:id/reviews",
    cors(storeCorsOptions),
    async (req, res) => {
      try {
        const productReviewService = req.scope.resolve("productReviewService");
        const product_review = await productReviewService.addProductReview(
          req.params.id,
          req.body.data
        );
        return res.json({ data: product_review });
      } catch (error) {
        console.error("Error adding product review:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  // Admin Routes
  router.get(
    "/admin/products/:id/reviews",
    cors(adminCorsOptions),
    async (req, res) => {
      try {
        const productReviewService = req.scope.resolve("productReviewService");
        const product_reviews = await productReviewService.getProductReviews(
          req.params.id
        );
        return res.json({ data: product_reviews });
      } catch (error) {
        console.error("Error fetching product reviews:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  );

  return router;
};
