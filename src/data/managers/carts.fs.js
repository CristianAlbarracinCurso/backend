import fs from "fs";
import crypto from "crypto";

class CartsManager {
  constructor(path) {
    this.path = path;
    this.exists();
  }
  exists() {
    const exist = fs.existsSync(this.path);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      console.log("carts created");
    } else {
      console.log("carts file already exists");
    }
  }

  async readAll() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const parseData = JSON.parse(data);
      return parseData;
    } catch (error) {
      throw error;
    }
  }

  async create(data) {
    try {
      data.id = crypto.randomBytes(12).toString("hex");
      const all = await this.readAll();
      all.push(data);
      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);
      return data.id;
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

  async update(id, newData) {
    try {
      const all = await this.readAll();
      const index = all.findIndex((each) => each.id === id);

      if (index === -1) {
        throw new Error(`Cart with ID ${id} not found`);
      }

      all[index] = { ...all[index], ...newData };

      const stringAll = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, stringAll);

      return all[index];
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartsManager("./src/data/files/carts.json");
export default cartsManager;
