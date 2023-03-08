const sinon = require('sinon');
const  chai = require('chai');
const chaiHttp = require('chai-http');
const mocks = require('./mocks/products.mocks');

const app = require( '../api/app');
const { Product } = require('../database/models');


chai.use(chaiHttp);

const { expect } = chai;

describe('Testing endpoint "/products"', () => {
  describe('Checking if it returns all products.', () => {
    beforeEach(sinon.restore);
    it('successfully', async () => {
      sinon.stub(Product,'findAll').resolves(mocks.producs.map(e => ({dataValues: e})))

      const res2 = await chai
      .request(app)
      .get('/products');

      expect(res2.status).to.be.equal(200);
      expect(res2.body).to.be.eql(mocks.producs)
    })

    it('when a product is not found.', async () => {
      sinon.stub(Product,'findAll').resolves([])

      const res2 = await chai
      .request(app)
      .get('/products');

      expect(res2.status).to.be.equal(404);
    })

    it('internal Error', async () => {
      sinon.stub(Product,'findAll').resolves(undefined)

      const res2 = await chai
      .request(app)
      .get('/products');

      expect(res2.status).to.be.equal(500);
      expect(res2.body.message).to.deep.equal('Erro sobre products');
    })
  });
})
