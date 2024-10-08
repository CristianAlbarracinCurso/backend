import fs from "fs";
import crypto from "crypto";


class UsersManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }

  exists() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("users file created");
    } else {
      console.log("users file already exists");
    }
  }

  async readAll(role) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      if (role) {
        const filteredData = parseData.filter((user) => user.role === role);
        return filteredData;
      } else {
        return parseData;
      }
    } catch (error) {
      throw error;
    }
  }

  async read(id) {
    try {
      const all = await this.readAll();
      const one = all.find((each) => each.id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async create(userData) {
    try {
      userData.id = crypto.randomBytes(12).toString("hex");
      const allUsers = await this.readAll();
      allUsers.push(userData);
      const stringData = JSON.stringify(allUsers, null, 2);
      await fs.promises.writeFile(this.path, stringData);
      return userData.id;
    } catch (error) {
      throw error;
    }
  }

  async update(id, newData) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((user) => user.id === id);
      if (index === -1) {
        return null;
      }
      all[index] = { ...all[index], ...newData };
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return all[index];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const all = await this.readAll();
      const userToDelete = all.find((userDelete) => userDelete.id === id);
      if (!userToDelete) {
        return null;
      }
      const filteredUsers = all.filter((user) => user.id !== id);
      if (all.length === filteredUsers.length) {
        return null;
      }
      const stringAll = JSON.stringify(filteredUsers, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return userToDelete;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByEmail(email) {
    const users = await this.readAll(); // Leer todos los usuarios del archivo
    return users.find((user) => user.email === email); // Buscar el usuario por email
  }

  async updateUser(userId, updatedData) {
    try {
      const users = await this.readAll(); // Leer todos los usuarios
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) throw new Error('Usuario no encontrado');
  
      // Actualiza el usuario
      users[userIndex] = { ...users[userIndex], ...updatedData };
      
      // Guardar los cambios de vuelta al archivo o base de datos
      await fs.promises.writeFile(this.path, JSON.stringify(users, null, 2));
    } catch (error) {
      throw error;
    }
  }
  async authenticate(username, password) {
    const users = await this.readAll(); // Lee todos los usuarios
    const user = users.find(user => user.username === username);
  
    // Verifica si el usuario existe y si la contraseña es correcta
    if (user && user.password === password) {
      return user;
    } else {
      throw new Error('Usuario o contraseña incorrectos');
    }
  }

}

const usersManagers = new UsersManager("./src/data/files/users.json");
export default usersManagers;
