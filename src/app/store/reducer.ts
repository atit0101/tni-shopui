import { createReducer, on } from "@ngrx/store";
import { decrement, reset, addProduct } from "./actions";
import { IProduct } from "../interfaces/product";

// export let products: Array<IProduct> = [];
export let products: Array<{ product: IProduct, count: number; }> = [];
export let product: IProduct;
export const productReducer = createReducer(
  products,
  on(addProduct, (state, { product }) => {
    let [f] = state.filter(e => e.product.product_id == product.product_id);
    let data;
    if (f?.count && f?.count != undefined) {

      data = state.map(e => {
        e.count += 1;
        return e;
      });
    } else {
      data = [...state, { product: product, count: 1 }];
    }
    console.log(data);

    return products = data;
  }),
  on(decrement, (state) => {
    return state;
  }),
  on(reset, (state) => {
    console.log(4444);
    return state;
  })
);
