import { BaseService } from "medusa-interfaces";
import { EntityManager } from "typeorm";
import { ProductReviewRepository } from "../repositories/product-review";

class ProductReviewService extends BaseService {
  productReviewRepository: typeof ProductReviewRepository;
  manager: EntityManager;

  constructor({ productReviewRepository, manager }) {
    super();

    this.productReviewRepository = productReviewRepository;
    this.manager = manager;
  }

  async getProductReviews(product_id: any) {
    try {
      const productReviewRepository = this.manager.getCustomRepository(
        ProductReviewRepository
      );

      return await productReviewRepository.find({
        where: { product_id },
      });
    } catch (error) {
      console.error("Error fetching product reviews:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async addProductReview(product_id: any, data: { title: any; user_name: any; content: any; rating: any; }) {
    try {
      if (!data.title || !data.user_name || !data.content || !data.rating) {
        throw new Error(
          "Product review requires title, user_name, content, and rating"
        );
      }

      const productReviewRepository = this.manager.getCustomRepository(
        ProductReviewRepository
      );


      const createdReview = productReviewRepository.create({
        product_id,
        title: data.title,
        user_name: data.user_name,
        content: data.content,
        rating: data.rating,
      });

      const productReview = await productReviewRepository.save(createdReview);
      return productReview;
    } catch (error) {
      console.error("Error adding product review:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

export default ProductReviewService;
