////
//// Functional Amigo flavored testing for package bbop-manager-golr.
////

var us = require('underscore');

// Test stuff
var chai = require('chai');
chai.config.includeStack = true;
var assert = chai.assert;

// Correct environment, ready testing.
var bbop = require('bbop-core');
var amigo = require('amigo2');
var golr_manager = require('..');
var golr_conf = require('golr-conf');
var golr_response = require('bbop-response-golr');

// The likely main scripting engine.
var sync_engine = require('bbop-rest-manager').sync_request;
// The likely main browser engine.
var jquery_engine = require('bbop-rest-manager').jquery;
// Everybody else engine.
var node_engine = require('bbop-rest-manager').node;

///
/// Helpers.
///

var each = us.each;
var golr_url = 'http://localhost:8983/solr/amigo';

describe('Hola amigo', function() {

  var gconf = null;
  var engine_to_use = null;
  before(function(done) {
    gconf = new golr_conf.conf(amigo.data.golr);
    engine_to_use = new sync_engine(golr_response);
    done();
  });

  it('issue #xxx', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');

    var r = manager.search();
    console.log('r', r);

    //assert.isTrue(r.paging_p(), 'paging off defult query: yes');
    //assert.isAbove(r.total_documents(), 10, 'got ten docs: yes');

    done();
  });

});
