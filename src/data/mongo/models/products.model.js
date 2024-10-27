import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";
const productsSchema = new Schema({
  title: { type: String, required: true, index: true },
  photo: { type: String, default: "none.jpg" },
  category: { type: String, default: "CRUISER", index: true },
  price: { type: Number, default: 1, min: 0 },
  stock: { type: Number, default: 1, min: 0 },
});

productsSchema.plugin(mongoosePaginate);

const Products = model(collection, productsSchema);
export default Products;
