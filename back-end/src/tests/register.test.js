const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { User } = require('../database/models');
const { token, validInput, validataValues, invalidEmail, invalidPwd, validInputOutRole } = require('./mocks/register.mock');

chai.use(chaiHttp);

const { expect } = chai;
describe('Testing endpoint "/register"', () => {
  describe('Registering a user', function() {
    afterEach(sinon.restore);
    
    it('successfully', async () => {
      sinon
        .stub(User, "findOne")
        .resolves();

      sinon
        .stub(User, 'create')
        .resolves(validataValues);
      
      const response = await chai
        .request(app)
        .post('/register')
        .send(validInput);
    
      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token')
    });

    it('with standard role', async () => {
      sinon
        .stub(User, "findOne")
        .resolves();

      sinon
        .stub(User, 'create')
        .resolves(validataValues);
      
      const response = await chai
        .request(app)
        .post('/register')
        .send(validInputOutRole);
    
      expect(response.status).to.be.equal(201);
      expect(response.body).to.have.property('token')
    });

    it('if the email already exists', async () => {
      sinon
        .stub(User, "findOne")
        .resolves(token);

      const response = await chai
        .request(app)
        .post('/register')
        .send(validInput);

      expect(response.status).to.be.equal(409);
      expect(response.body.message).to.deep.equal('User already registered')
    });

    it('email in an invalid format', async () => {
      const response = await chai
        .request(app)
        .post('/register')
        .send(invalidEmail);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.deep.equal('"email" must be a valid email')
    });

    it('password less than 6 characters', async () => {
      const response = await chai
        .request(app)
        .post('/register')
        .send(invalidPwd);

      expect(response.status).to.be.equal(400);
      expect(response.body.message).to.deep.equal('"password" length must be at least 6 characters long')
    });

    it('internal Error', async () => {
      sinon
        .stub(User, 'findOne')
        .throws(Error('db query failed'))
  

      const response = await chai
        .request(app)
        .post('/register')
        .send(validInput);;

      expect(response.status).to.be.equal(500);
      expect(response.body.message).to.deep.equal('Erro ao criar usuário no banco');
      expect(response.body.error).to.deep.equal('db query failed');
    });
    
  }) 
})