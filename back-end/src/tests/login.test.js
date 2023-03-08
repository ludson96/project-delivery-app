const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { User } = require('../database/models');
const { validInput, validataValues, token } = require('./mocks/login.mock');

chai.use(chaiHttp);

const { expect } = chai;
describe('Testing endpoint "/login"', () => {
  describe('Log in', function() {
    afterEach(sinon.restore);
    
    it('successfully', async () => {
      sinon
        .stub(User, "findOne")
        .resolves(validataValues);

      const response = await chai
        .request(app)
        .post('/login')
        .send(validInput);
    
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property('token')
    });

    it('non-existent user', async () => {
      sinon
        .stub(User, "findOne")
        .resolves();

      const response = await chai
        .request(app)
        .post('/login')
        .send(validInput);
    
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ hasToken: false })
    });

    it('invalid token', async () => {
      sinon
        .stub(User, "findOne")
        .resolves();

      const response = await chai
        .request(app)
        .post('/login')
        .set('Authorization', token)
        .send(validInput);
    
      expect(response.status).to.be.equal(404);
      expect(response.body).to.deep.equal({ hasToken: false })
    });
    
    it('internal Error', async () => {
      sinon
        .stub(User, 'findOne')
        .throws(Error('db query failed'))
  

        const response = await chai
        .request(app)
        .post('/login')
        .send(validInput);;

      expect(response.status).to.be.equal(500);
      expect(response.body.message).to.deep.equal('Erro ao entrar no site.');
      expect(response.body.error).to.deep.equal('db query failed');
    });
  }) 
})