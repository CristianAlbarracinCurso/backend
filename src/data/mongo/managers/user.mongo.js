import Users from "../models/users.model.js";
import mongoose from "mongoose";

class UsersMongoManager {
  constructor() {}

  async create(data) {
    try {
      const user = await Users.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async readAll(role) {
    try {
      const query = role ? { role } : {};
      const users = await Users.find(query);
      return users;
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  async getAllUsers() {
    return await Users.find().select("name role isOnline").lean(); 
  }


  async  getUserById(userId) {
    return await Users.findById(userId).select("role").lean();
  }

  async read(uid) {
    try {
      if (!mongoose.Types.ObjectId.isValid(uid)) {
        throw new Error("Invalid User ID");
      }
      const user = await Users.findById(uid).lean();
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  

  async destroy(uid) {
    try {
      const deletedUser = await Users.findByIdAndDelete(uid);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  }

  async findUser(email, password) {
    try {
      const user = await Users.findOne({ email, password });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email) {
    try {
      const users = await this.readAll(); 
      return users.find((user) => user.email === email); 
    } catch (error) {
      throw new Error("Error al buscar el usuario por email");
    }
  }

  async update(userId, updatedData) {
    return await Users.findByIdAndUpdate(userId, updatedData, { new: true });
  }


}
const usersMongoManager = new UsersMongoManager();
export default usersMongoManager;
