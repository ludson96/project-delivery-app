const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { User } = require('../database/models');
const { token, validInput } = require('./mock/register.mock');

chai.use(chaiHttp);

const { expect } = chai;
describe('Testando endpoint "/register"', () => {
  describe('Cadastrando um usuário', function() {
    afterEach(sinon.restore);
    
    it('com sucesso', async () => {
      sinon
      .stub(User, "findOne")
      .resolves(token);
      
      const response = await chai
      .request(app).post('/register')
      .send({
        name: "ludson pereira",
        email: "ludson@teste.com",
        password: "dasdsada",
        role: "customer",
      });
      
      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token')
      expect(response.body.token).to.deep.equal(token);
    });
  }) 
})