import chai from 'chai';
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai;
chai.use(chaiHttp)

describe('Login', () => {

    it('Once you provided the non-existing email', () => {
        chai.request(app)
          .post('/api/v1/auth/login')
          .set('Accept', 'application/json')
          .send({
            email: 'test@nothis.com',
            password: '12345678'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.have.property('error');
          });
    
      });
      
      it('Passwor incorrect"', () => {
        chai.request(app)
          .post('/api/v2/auth/login')
          .set('Accept', 'application/json')
          .send({
            email: "test@test.comm",
            password: 'ac'
          })
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            expect(res.statusCode).to.equal(400);
          });
    
      });
})