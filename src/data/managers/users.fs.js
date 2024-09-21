import fs from "fs";
import crypto from "crypto";

class usersManager {
  constructor() {
    this.path = "./src/data/files/users.json";
    this.init();
  }
  init() {
    const fileExists = fs.existsSync(this.path);
    if (fileExists) {
      console.log("users file exists");
    } else {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("users file created");
    }
  }
  async readAll(role) {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parcedData = JSON.parse(data);
      if (role) {
        const filteredData = parcedData.filter((user) => user.role === role);
        return filteredData
      }else{
        return parcedData;
      }
      
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData) {
    try {
      userData.id = crypto.randomBytes(12).toString("hex");
      const allUsers = await this.readAll();
      allUsers.push(userData);
      const stringData = JSON.stringify(allUsers,null,2);
      await fs.promises.writeFile(this.path, stringData);
      return userData.id;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const users = await this.readAll();
      const user = users.find((user) => user.id === id);
      return user; // returns undefined if not found
    } catch (error) {
      throw error;
    }
  }
}

const usersManagers = new usersManager();
export default usersManagers;
