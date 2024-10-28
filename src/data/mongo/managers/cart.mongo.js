import Carts from "../models/carts.model.js";

import { Types } from "mongoose";

class CartsMongoManager {
  async create(data) {
    try {
      const cart = await Carts.create(data);
      return cart;
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async readAll(filter) {
    try {
      return await Carts.find(filter)
        .populate("user_id", "name email")
        .lean();
    } catch (error) {
      throw new Error(`Error reading all carts: ${error.message}`);
    }
  }

  async read(id) {
    try {
      return await Carts.findById(id).lean();
    } catch (error) {
      throw new Error(`Error reading cart by ID: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      return await Carts.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  async destroy(id) {
    try {
      return await Carts.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error deleting all carts for user: ${error.message}`);
    }
  }

  async destroyAll(userId) {
    try {
      return await Carts.deleteMany({ user_id: userId });
    } catch (error) {
      throw new Error(`Error deleting all carts for user: ${error.message}`);
    }
  }

  async destroyProduct(userId, productId) {
    try {
      console.log(
        `Deleting product: user_id=${userId}, product_id=${productId}`
      );
      const response = await Carts.findOneAndDelete({
        user_id: userId,
        product_id: productId,
      });
      return response;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }

  async totalCartsByUser(userId) {
    if (!userId) {
      throw new Error("userId is required");
    }

    try {
      const allCarts = await this.readAll(); 

      const userCarts = allCarts.filter((cart) => {

        return cart.user_id._id.toString() === userId;
      });

      const totalItems = userCarts.reduce((acc, cart) => {
        return acc + cart.quantity; 
      }, 0);


      return {
        totalItems,
      };
    } catch (error) {
      console.error("Error retrieving carts:", error); 
      throw error; 
    }
  }

  /*9async readCartsByUserId(userId) {
    try {
      const response = await Carts.find({ user_id: userId }).lean();
      if (!response.length) {
        console.log("No carts found for this user");
      }
      return response;
    } catch (error) {
      throw new Error(`Error finding carts by user ID: ${error.message}`);
    }
  }*/

  async calculatePrice(userId) {
    try {
      const total = await Carts.aggregate([
        { $match: { user_id: new Types.ObjectId(userId) } }, 
        {
          $unwind: "$products", 
        },
        {
          $lookup: {
            from: "products", 
            localField: "products.product_id", 
            foreignField: "_id", 
            as: "productDetails", 
          },
        },
        {
          $unwind: {
            path: "$productDetails",
            preserveNullAndEmptyArrays: true, 
          },
        },
        {
          $addFields: {
            subtotal: {
              $multiply: ["$productDetails.price", "$products.quantity"], 
            },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$subtotal" }, 
          },
        },
      ]);

      return total.length ? total[0].total : 0; 
    } catch (error) {
      throw new Error(`Error calculating total: ${error.message}`);
    }
  }

  async updateItemQuantity(productId, quantity) {
    try {
      await Carts.updateOne(
        { product_id: new Types.ObjectId(productId) },
        { $set: { quantity } }
      );
    } catch (error) {
      throw new Error(`Error updating item quantity: ${error.message}`);
    }
  }
}
const cartsMongoManager = new CartsMongoManager();
export default cartsMongoManager;
