const sinon=  require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../api/app');
const { Sale } = require('../database/models');
const { validOutput, validInput } = require('./mocks/sales.mock');

chai.use(chaiHttp);

const { expect } = chai;
describe('Testando endpoint "/sales"', () => {
  describe('Cadastra uma venda', function() {
    afterEach(sinon.restore);
    
    it('com sucesso', async () => {
      sinon
        .stub(Sale, "create")
        .resolves(validOutput);

      const response = await chai
        .request(app)
        .post('/sales')
        .send(validInput);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.deep.equal(validOutput)
    });

    it('internal Error', async () => {
      sinon
        .stub(Sale, 'create')
        .throws(Error('db query failed'))
  

        const response = await chai
        .request(app)
        .post('/sales')
        .send(validInput);;

      expect(response.status).to.be.equal(500);
      expect(response.body.message).to.deep.equal('Erro ao criar venda no banco');
      expect(response.body.error).to.deep.equal('db query failed');
    });
  }) 
})