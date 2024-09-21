import usersManagers from "../data/managers/users.fs.js";

class userControllers {
  constructor() {}
  async readUsers(req, res) {
    try {
      const {role} = req.query;
      const users = await usersManagers.readAll(role);
      if (users.length > 0) {
        return res.status(200).json({ users, menssage: "users fetched" });
      } else {
        const error = new Error("users not found");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      console.log(error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "API ERROR" });
    }
  }

  async createUser(req, res) {
    try {
      const data = req.body
      const { email, password } = data;
      if (!email || !password) {
        const error = new Error("email and password are required");
        error.statusCode = 400;
        throw error;
      }
      const userId = await usersManagers.createUser(data);
      return res
        .status(201)
        .json({ message: `User created successfully whit id ${userId}` });
    } catch (error) {
      console.log(error);
      return res
        .status(error.statusCode || 500)
        .json({ error: error.message || "API ERROR" });
    }
  }

  async readAll(req, res) {
    try {
      const users = await usersManagers.readAll();
      res.status(200).json({ users });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async readOne(req, res) {
    try {
      const user = await usersManagers.readOne(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
const userController = new userControllers();
export default userController;
