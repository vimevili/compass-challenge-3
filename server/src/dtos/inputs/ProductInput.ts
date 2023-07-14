import { Field, InputType, Int, Float } from "type-graphql";
import { IsNotEmpty, IsInt, Min, Max, IsUrl } from "class-validator";

@InputType()
export class ReviewInput {
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

@InputType()
export class ProductInput {
  @Field({ nullable: true })
  @IsUrl()
  imageUrl?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @Field(() => Float, { nullable: true })
  @IsNotEmpty()
  price?: number;

  @Field({ nullable: true })
  @IsNotEmpty()
  name?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  description?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  category?: string;

  @Field(() => [ReviewInput], { nullable: true })
  reviews?: ReviewInput[];
}
