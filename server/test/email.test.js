import chai from 'chai';
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai;
chai.use(chaiHttp)

describe('get received emails', () => {

    it('received emails', (done) => {
        chai.request(app)
        .get('/api/v2/messages')
        .end((err, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
        done()
        })
      });
    })