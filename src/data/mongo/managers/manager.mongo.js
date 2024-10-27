//Preparando la base del manager para ser usado para escalar a futuro
class Manager {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  readAll = async () => {
    try {
      const response = await this.model.find().lean();
      return response;
    } catch (error) {
      throw error;
    }
  };

  read = async (id) => {
    try {
      const response = await this.model.findById(id).lean();
      return response;
    } catch (error) {
      throw error;
    }
  };

  update = async (id, data) => {
    try {
      const response = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroy = async (userId, productId) => {
    try {
      console.log(
        `Eliminando producto: user_id=${userId}, product_id=${productId}`
      );
      const response = await this.model.findOneAndDelete({
        user_id: userId,
        product_id: productId,
      });
      console.log("Respuesta de eliminación:", response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  destroyAll = async (userId) => {
    try {
      const response = await this.model.deleteMany({ user_id: userId });
      return response;
    } catch (error) {
      throw error;
    }
  };
}

export default Manager;
