import { Schema, model, Types } from "mongoose";

const collection = "carts";

const cartSchema = new Schema({

  product_id: { type: Types.ObjectId, ref: "products", required: true },
  user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
  quantity: { type: Number, min: 1 },
  state: {
    type: String,
    default: "reserved",
    enum: ["reserved", "paid", "delivered"],
  },
});

const Cart = model(collection, cartSchema);
export default Cart;
