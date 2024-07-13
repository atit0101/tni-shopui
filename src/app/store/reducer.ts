import { createReducer, on } from "@ngrx/store";
import { decrement, reset, addProduct } from "./actions";
import { IProduct } from "../interfaces/product";
import _ from 'lodash';

export let products: Array<{ product: IProduct, count: number; }> = [];
export let product: IProduct;
export const productReducer = createReducer(
  products,
  on(addProduct, (state, { product, count }) => {
    console.log("product : ", product, "count", count);

    let [f] = state.filter(e => e.product.product_id == product.product_id);
    // console.log(f);

    let data;
    if (f?.count && f?.count != undefined) {

      data = [...state.map((e: any) => {
        if (e?.product?.product_id == f.product.product_id) {
          // console.log(f.count == e.count);
          let tmp = _.cloneDeep(e);
          tmp.count = count + 1;
          console.log(tmp);
          return tmp;
        } else {
          return e;
        }
      })];

    } else {

      data = [...state, { product: product, count: 1 }];
    }
    return products = data;
  }),
  on(decrement, (state, { product }) => {
    let clone: any = _.clone(product);
    state = state.filter(e => e.product.product_id != clone.product.product_id);
    console.log(state, product);

    return state;
  }),
  on(reset, (state) => {
    console.log(4444);
    return state;
  })
);
