/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          //fill me in too!
          assert.equal(res.body[0].issue_title, 'title');
          assert.equal(res.body[0].issue_text, "text");
          assert.equal(res.body[0].created_by, "Functional Test - Every field filled in");
          assert.equal(res.body[0].assigned_to, "Chai and Mocha");
          assert.equal(res.body[0].status_text, "In QA");
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'title',
            issue_text: 'text',
            created_by: 'Required fields filled in'
          })
          .end(function(err, res){
            assert.equal(res.status, 200);
            assert.equal(res.body[0].issue_title, 'title');
            assert.equal(res.body[0].issue_text, "text");
            assert.equal(res.body[0].created_by, "Required fields filled in");
            done();
          })
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'title',
            issue_text: 'text',
          })
          .end(function(err, res){
            assert.equal(res.text, "Required fields cannot be left empty.");
            done();
          })
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'No body Put title',
            issue_text: 'No body Put text',
            created_by: 'No body Put - test function'
          })
          .end(function(err, res){
            var _id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({_id: _id})
              .end(function(err, res){
                assert.equal(res.text, 'no updated field sent');
              })
          })
          done();
      });
      
      test('One field to update', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'One field to update title',
            issue_text: 'One field to update text',
            created_by: 'One field to update - test function'
          })
          .end(function(err, res){
            var _id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({_id: _id, issue_title: 'One field to update - changed!'})
              .end(function(err, res){
                assert.equal(res.text, 'successfully updated');
                done();
              })
          })
      });
      
      test('Multiple fields to update', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Multiple fields to update title',
            issue_text: 'Multiple fields to update text',
            created_by: 'Multiple fields to update - test function'
          })
          .end(function(err, res){
            var _id = res.body[0]._id;
            chai.request(server)
              .put('/api/issues/test')
              .send({_id: _id, issue_title: 'Multiple fields to update - changed!', issue_text: 'Multiple fields to update text - Changed!'})
              .end(function(err, res){
                assert.equal(res.text, 'successfully updated');
                done();
              })
          })
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({assigned_to: 'Chai and Mocha'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/test')
        .query({ created_by: 'Functional Test - Every field filled in', assigned_to: 'Chai and Mocha' })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
          .delete('/api/issues/test')
          .send({_id: ''})
          .end(function(err, res){
            assert.equal(res.text, '_id error');
          })
          done();
      });
      
      test('Valid _id', function(done) {
        chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Valid_id',
            issue_text: 'text',
            created_by: 'Valid_id Test'
          })
          .end(function(err, res){
            var _id = res.body[0]._id;
            chai.request(server)
              .delete('/api/issues/test')
              .send({_id: _id})
              .end(function(err, res){
                assert.equal(res.text, `success: 'deleted' ${_id}`);
              })
          })
          done();
      });
      
    });

});
