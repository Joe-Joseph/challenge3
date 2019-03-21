import chai from 'chai';
import chaiHttp from 'chai-http'
import app from '../app'

const { expect } = chai;
chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe('Create a user', () => {
  it('It shoud return a successfully message for signup', () => {
    const user = {
      firstname: 'joseph',
      lastname: 'joe',
      email: 'test@test.com',
      password: '123456'
    }
    chai.request(app)
      .post('/api/v2/auth/signup')
      .set('Accept', 'application/json')
      .send(user)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        //expect(res.body.status).to.equal(400);
        //expect(res.body).to.have.property('status');
        console.log (res.body.status);
      });
      
    })

    it('First name length must be at lest 3 characters long', () => {
      const user = {
        firstname: 'jo',
        lastname: 'joe',
        email: 'john@test.com',
        password: '123456'
      }
      chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
        });
      })

    it('Last name length must be at lest 3 characters long', () => {
      const user = {
        firstname: 'joe',
        lastname: 'jo',
        email: 'test@test.comm',
        password: '123456'
      }
      chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          expect(res.body.status).to.equal(400);
          expect(res.body.error).to.be.a('string');
        });
      })

    it('Email must be valid', () => {
      const user = {
        firstname: 'joe',
        lastname: 'joe',
        email: 'test@test.comm',
        password: '123456'
      }
      chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          //expect(res.body.status).to.equal(400);
          //expect(res.body.error).to.be.a('string');
        });
      })

    it('Password must not less than 6 characters long', () => {
      const user = {
        firstname: 'joe',
        lastname: 'joe',
        email: 'test@test.comm',
        password: '1234'
      }
      chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          //expect(res.body.status).to.equal(400);
          //expect(res.body.error).to.be.a('string');
        });
      })
      
      it('Email is already registered', () => {
        const user = {
          firstname: 'joe',
          lastname: 'joe',
          email: 'test@test.comm',
          password: '123456'
        }
        chai.request(app)
          .post('/api/v2/auth/signup')
          .set('Accept', 'application/json')
          .send(user)
          .end((err, res) => {
            expect(res.body).to.be.an('object');
            //expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('error');
            //expect(res.body.status).to.equal(400);
            //expect(res.body.error).to.be.a('string');
          });

        chai.request(app)
        .post('/api/v2/auth/signup')
        .set('Accept', 'application/json')
        .send(user)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          //expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('error');
          //expect(res.body.status).to.equal(400);
          //expect(res.body.error).to.be.a('string');
        });
      })
})