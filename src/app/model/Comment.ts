import {Product} from "./Product";
import {Customer} from "./Customer";

export interface Comment {
  id?: number;
  review?: string;
  time?: Date;
  product?: Product;
  customer?: Customer;
}
