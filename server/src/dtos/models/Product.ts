import { ObjectType, Field, ID, Int, Float } from "type-graphql";
import { IsNotEmpty, IsInt, Min, Max, IsUrl } from "class-validator";

@ObjectType()
export class Review {
  @Field()
  @IsNotEmpty()
  user: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field()
  @IsNotEmpty()
  date: string;
}

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  @IsUrl()
  imageUrl: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Field(() => Float)
  @IsNotEmpty()
  price: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field()
  @IsNotEmpty()
  category: string;

  @Field()
  @IsNotEmpty()
  created_at: string;

  @Field(() => [Review])
  reviews: Review[];
}
