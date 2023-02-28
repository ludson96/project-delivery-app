const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = '../api/app';
import { User } from '../database/models';

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
      .send(validInput);
      
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token')
    });
  }) 
})