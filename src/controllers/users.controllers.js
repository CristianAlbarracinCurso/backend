import usersManager from "../data/managers/users.fs.js";
async function getAllUsers(req, res, next) {
  try {
    const { role } = req.query;
    const users = await usersManager.readAll(role);
    if (users.length > 0) {
      return res.status(200).json({ statusCode: 200, users });
    } else {
      const error = new Error("users not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function getOneUser(req, res, next) {
  try {
    const { uid } = req.params;
    const response = await usersManager.read(uid);

    if (response) {
      return res.status(200).json({ statusCode: 200, response });
    } else {
      const error = new Error("NOT FOUND PRODUCT");
      error.statusCode = 404;
      throw error;
    }
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
    const userId = await usersManager.create(data);
    return res.status(201).json({
      statusCode: 201,
      response: userId,
      message: "User created successfully",
    });
  } catch (error) {
    return next(error);
  }
}

async function readAll(req, res, next) {
  try {
    const users = await usersManager.readAll();
    res.status(200).json({ statusCode: 200, users });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const { uid } = req.params;
    const newData = req.body;
    const response = await usersManager.update(uid, newData);
    if (!response) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: response });
  } catch (error) {
    return next(error);
  }
}

async function destroyUser(req, res, next) {
  try {
    const { uid } = req.params;
    const responseManager = await usersManager.delete(uid);
    if (!responseManager) {
      const error = new Error(`User with id ${uid} not found`);
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ statusCode: 200, response: responseManager });
  } catch (error) {
    return next(error);
  }
}

export {
  getAllUsers,
  getOneUser,
  readAll,
  createUser,
  updateUser,
  destroyUser,
};
