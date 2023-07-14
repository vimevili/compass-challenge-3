import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { plainToClass } from "class-transformer";
import { validateOrReject } from "class-validator";

import { Product } from "../dtos/models/Product";
import { ProductInput } from "../dtos/inputs/ProductInput";

const products: Product[] = [];

@Resolver()
export class ProductResolver {
  @Query(() => Product)
  getProduct(@Arg("id") id: string): Product {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  }

  @Query(() => [Product])
  getAllProducts(): Product[] {
    return products;
  }

  @Mutation(() => Product)
  async createProduct(@Arg("input") input: ProductInput): Promise<Product> {
    const createdAt = new Date().toISOString();
    const product = plainToClass(Product, {
      ...input,
      id: uuidv4(),
      created_at: createdAt,
    });

    await validateOrReject(product);

    products.push(product);
    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id") id: string,
    @Arg("input") input: ProductInput
  ): Promise<Product> {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }

    const existingProduct = products[index];
    const updatedProduct = plainToClass(Product, {
      ...existingProduct,
      ...input,
      id,
    });

    await validateOrReject(updatedProduct);

    products[index] = updatedProduct;
    return updatedProduct;
  }

  @Mutation(() => String)
  deleteProduct(@Arg("id") id: string): string {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    const deletedProductId = products[index].id;
    products.splice(index, 1);
    return deletedProductId;
  }
}
