import { createAction, props } from "@ngrx/store";
import { IProduct } from "../interfaces/product";

export const addProduct = createAction('[Product] Add Product', props<{ product: IProduct, count: number; }>());
export const decrement = createAction('[Product] Update Product', props<{ product: IProduct; }>());
export const reset = createAction('Reset');
