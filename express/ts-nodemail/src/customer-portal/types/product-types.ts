import User from "../models/user-model";

export interface Review {
  name: string;
  rating: string;
  comment: string;
  user: User;
}

export interface IProduct {
  user: User;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: Review;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}
