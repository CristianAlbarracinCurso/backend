import usersManagers from "../data/managers/users.fs.js";
async function getAllUsers(req, res, next) {
  try {
    const { role } = req.query;
    const users = await usersManagers.readAll(role);
    if (users.length > 0) {
      return res.status(200).json({ users, menssage: "users fetched" });
    } else {
      const error = new Error("users not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await usersManagers.read(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
}
async function createUser(req, res, next) {
  try {
    const data = req.body;
    const { email, password } = data;
    if (!email || !password) {
      const error = new Error("email and password are required");
      error.statusCode = 400;
      throw error;
    }
    const userId = await usersManagers.create(data);
    return res
      .status(201)
      .json({ message: `User created successfully whit id ${userId}` });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const users = await usersManagers.readAll();
    res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
}

export { getAllUsers, getUser, readAll, createUser };
