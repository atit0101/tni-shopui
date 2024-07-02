export interface IProduct {
  product_id: Number,
  product_name: string,
  price: Number,
  category_id: Number,
  product_data: string,
  category: string,
  images: IImage[];
}

interface IImage {
  image_id: Number,
  image_url: string,
  product_id: Number,
  pruduct: string;
}
