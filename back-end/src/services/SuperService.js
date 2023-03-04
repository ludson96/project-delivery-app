class SuperService {
  constructor(model) {
    this.model = model;
  }

  async create(objContent) {
    const result = await this.model.create(objContent);
    return result.dataValues || null;
  }

  async findAll(obj) {
    const result = await this.model.findAll(obj);
    return result.map((item) => item.dataValues || null);
  }

  async findOne(objToSearch) {
    const result = await this.model.findOne({ where: objToSearch });
    return result || null;
  }

  async update(objContent, objWhere) {
    const result = await this.model.update(objContent, objWhere);
    return result;
  }

  async delete(id = 9999999) {
    const result = await this.model.delete({ where: { id } });
    return result;
  }
}

module.exports = {
  SuperService,
};