const casual = require('casual');
const chai = require('chai'), chaiHttp = require('chai-http');
const request = require('superagent')
const expect  = require("chai").expect;
const app = 'http://localhost:5000';
let user;
let authRequest;

// chai.use(chaiHttp());

casual.define('user', function() {
    return {
        email: casual.email,
        password: casual.password
    };
});

describe('Register', () => {
    user = casual.user;

    it('should register a new user', (done) => {
        request.post(app + '/register').send({
            email: user.email,
            password: user.password
        }).end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });
});



describe('Authentication Upload/Share/Delete', () => {
    let token;
    let fileId;

    before((done) => {
        request.post(app + '/login').send({
            email: user.email,
            password: user.password
        }).end((err, res) => {
            expect(res.status).to.equal(200);
            token = res.body.token;
            done();
        });
    });

    it('should upload the file', (done) => {
        console.log('token', token);
        request.post(app + '/user/upload')
            .set('content-type', 'multipart/form-data')
            .set('auth-token', token)
            .attach('file', __dirname + '/assets/test.txt')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                fileId = res.body.saveFile._id;
                done();
            });
    });

    it('should share the file with test@gmail.com', (done) => {
        console.log(fileId);
        request.patch(app + '/user/share/' + fileId)
            .set('auth-token', token)
            .send(['5da2eab007c79d001704a172'])
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

    it('should delete the file', (done) => {
        console.log(fileId);
        request.delete(app + '/user/delete/' + fileId)
            .set('auth-token', token)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
    });

});