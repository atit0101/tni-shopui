import { createReducer, on } from "@ngrx/store";
import { decrement, reset, addProduct } from "./actions";
import { IProduct } from "../interfaces/product";

export let product: IProduct = {
  product_id: 0,
  price: 0,
  product_name: "",
  category_id: 0,
  category: "",
  images: [],
  product_data: ""
};
export const productReducer = createReducer(
  product,
  on(addProduct, (state, { product }) => {
    console.log(1231231);

    return state = product;
  }),
  on(decrement, (state) => {
    return state;
  }),
  on(reset, (state) => {
    console.log(4444);

    return state;
  })
);
