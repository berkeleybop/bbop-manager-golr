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
var golr_url = 'http://localhost:8983/solr/monarch/';

describe('Functional tests for Monarch', function() {

  var gconf = null;
  var engine_to_use = null;
  before(function(done) {
    gconf = new golr_conf.conf(amigo.data.golr);
    engine_to_use = new sync_engine(golr_response);
    done();
  });

  // Dashes should be tokenized
  it('issue Charcot-Marie dash', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');
    manager.set_query("charcot marie");
    manager.add_query_field("label_searchable");

    var r = manager.search();

    var docs = r.documents();
    assert.isAbove(docs.length, 1, 'got a least 1 doc: yes');
    assert.include(docs[0].label[0], 'Charcot-Marie', 'first result must have `Charcot-Marie`');

    done();
  });

  // Words order in search should match
  it('issue Charcot-Marie order', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');
    manager.set_query("marie charcot");
    manager.add_query_field("label_searchable");

    var r = manager.search();
    var docs = r.documents();

    assert.isAbove(docs.length, 1, 'got a least 1 doc: yes');
    assert.include(docs[0].label[0], 'Charcot-Marie', 'first result must have `Charcot-Marie`');

    done();
  });


  // Words order in search should match
  it('issue Charcot-Marie order', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');
    manager.set_query("marie charcot");
    manager.add_query_field("label_searchable");
    manager.add_query_field("definition_searchable");
    manager.include_highlighting(true);

    var r = manager.search();
    var docs = r.highlighted_documents();

    console.log(docs);

    assert.isAbove(docs.length, 1, 'got a least 1 doc: yes');
    assert.include(docs[0].label_searchable[0], 'hilite', 'first result must have `hilite`');

    done();
  });

});
