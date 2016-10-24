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
var golr_url = 'http://localhost:8983/solr/amigo/';

describe('Functional tests for Amigo', function() {

  var gconf = null;
  var engine_to_use = null;
  before(function(done) {
    gconf = new golr_conf.conf(golr_input_conf);
    engine_to_use = new sync_engine(golr_response);
    done();
  });

  it('issue p53', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');
    manager.set_personality("general");
    manager.set_query("p53");

    var r = manager.search();
    var docs = r.documents();

    assert.isAbove(docs.length, 1, 'got a least 1 doc: yes');
    assert.equal(docs[0].entity_label, 'p53', 'first result must be `p53`');

    done();
  });

  it('issue neurogenesis', function(done) {

    //engine_to_use.debug(true);
    engine_to_use.method('GET');
    var manager = new golr_manager(golr_url, gconf, engine_to_use, 'sync');
    manager.set_query("neurogenesis");
    manager.add_query_field("entity_label_searchable");

    var r = manager.search();
    var docs = r.documents();

    assert.isAbove(docs.length, 1, 'got a least 1 doc: yes');
    assert.equal(docs[0].entity_label, 'neurogenesis', 'first result must be `neurogenesis`');

    done();
  });

});


var golr_input_conf = {
   "bioentity_for_browser" : {
      "result_weights" : "taxon_subset_closure_label^8.0 type^6.0",
      "display_name" : "Genes and gene products (BROWSER)",
      "schema_generating" : "false",
      "boost_weights" : "taxon_subset_closure_label^1.0 type^1.0",
      "fields_hash" : {
         "taxon_subset_closure" : {
            "transform" : [],
            "property" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         "source" : {
            "type" : "string",
            "id" : "source",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Database source.",
            "display_name" : "Source",
            "cardinality" : "single",
            "required" : "false"
         },
         "taxon_label" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_label",
            "description" : "Taxonomic group",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         "taxon_closure" : {
            "display_name" : "Taxon",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group and ancestral groups."
         },
         "taxon" : {
            "description" : "Taxonomic group",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Taxon"
         },
         "taxon_closure_label" : {
            "property" : [],
            "transform" : [],
            "id" : "taxon_closure_label",
            "type" : "string",
            "description" : "Taxonomic group and ancestral groups.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "required" : "false"
         },
         "type" : {
            "display_name" : "Type",
            "cardinality" : "single",
            "required" : "false",
            "id" : "type",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Type class."
         },
         "taxon_subset_closure_label" : {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_subset_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset."
         }
      },
      "fields" : [
         {
            "display_name" : "Type",
            "cardinality" : "single",
            "required" : "false",
            "id" : "type",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Type class."
         },
         {
            "description" : "Taxonomic group",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Taxon"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_label",
            "description" : "Taxonomic group",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         {
            "display_name" : "Taxon",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group and ancestral groups."
         },
         {
            "property" : [],
            "transform" : [],
            "id" : "taxon_closure_label",
            "type" : "string",
            "description" : "Taxonomic group and ancestral groups.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_subset_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset."
         },
         {
            "type" : "string",
            "id" : "source",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Database source.",
            "display_name" : "Source",
            "cardinality" : "single",
            "required" : "false"
         }
      ],
      "id" : "bioentity_for_browser",
      "_strict" : 0,
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/bio-config.browse.yaml",
      "document_category" : "bioentity",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/bio-config.browse.yaml",
      "filter_weights" : "taxon_subset_closure_label^8.0 type^6.0",
      "searchable_extension" : "_searchable",
      "description" : "Special schema for certain ontology browser widget\\'s filters.",
      "weight" : "-130"
   },
   "bioentity" : {
      "searchable_extension" : "_searchable",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/bio-config.yaml",
      "document_category" : "bioentity",
      "filter_weights" : "source^7.0 taxon_subset_closure_label^6.0 type^5.0 panther_family_label^4.0 annotation_class_list_label^3.0 regulates_closure_label^2.0",
      "weight" : "30",
      "description" : "Genes and gene products associated with GO terms.",
      "id" : "bioentity",
      "fields" : [
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene of gene product ID.",
            "id" : "id",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Gene or gene product ID.",
            "type" : "string",
            "id" : "bioentity",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         {
            "cardinality" : "single",
            "display_name" : "Label",
            "required" : "false",
            "property" : [],
            "transform" : [],
            "id" : "bioentity_label",
            "type" : "string",
            "description" : "Symbol or name.",
            "searchable" : "true",
            "indexed" : "true"
         },
         {
            "required" : "false",
            "display_name" : "Name",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "The full name of the gene product.",
            "type" : "string",
            "id" : "bioentity_name",
            "property" : [],
            "transform" : []
         },
         {
            "cardinality" : "single",
            "display_name" : "This should not be displayed",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "bioentity_internal_id",
            "description" : "The bioentity ID used at the database of origin.",
            "searchable" : "false",
            "indexed" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Type",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Type class.",
            "id" : "type",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group",
            "type" : "string",
            "id" : "taxon",
            "property" : [],
            "transform" : []
         },
         {
            "display_name" : "Organism",
            "cardinality" : "single",
            "required" : "false",
            "id" : "taxon_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Taxonomic group"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "type" : "string",
            "id" : "taxon_closure",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "description" : "Taxonomic group and ancestral groups.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_subset_closure",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota)."
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset.",
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi"
         },
         {
            "required" : "false",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Closure of ids/accs over isa and partof.",
            "id" : "isa_partof_closure",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Closure of labels over isa and partof.",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Inferred annotation",
            "description" : "Bioentities associated with this term or its children (over regulates).",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "regulates_closure"
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "regulates_closure_label",
            "type" : "string",
            "description" : "Bioentities associated with this term or its children (over regulates).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Inferred annotation",
            "required" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Source",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Database source.",
            "id" : "source",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_class_list",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Direct annotation",
            "required" : "false"
         },
         {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "annotation_class_list_label",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Direct annotation",
            "required" : "false"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Synonyms",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "synonym",
            "description" : "Gene product synonyms.",
            "searchable" : "false",
            "indexed" : "true"
         },
         {
            "description" : "PANTHER families that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "panther_family",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "PANTHER family"
         },
         {
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity.",
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "description" : "JSON blob form of the phylogenic tree.",
            "searchable" : "false",
            "indexed" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "phylo_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "This should not be displayed"
         },
         {
            "cardinality" : "multi",
            "display_name" : "DB xref",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "database_xref",
            "description" : "Database cross-reference.",
            "searchable" : "false",
            "indexed" : "true"
         }
      ],
      "fields_hash" : {
         "bioentity_internal_id" : {
            "cardinality" : "single",
            "display_name" : "This should not be displayed",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "bioentity_internal_id",
            "description" : "The bioentity ID used at the database of origin.",
            "searchable" : "false",
            "indexed" : "false"
         },
         "source" : {
            "required" : "false",
            "display_name" : "Source",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Database source.",
            "id" : "source",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "panther_family_label" : {
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity.",
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false"
         },
         "phylo_graph_json" : {
            "description" : "JSON blob form of the phylogenic tree.",
            "searchable" : "false",
            "indexed" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "phylo_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "This should not be displayed"
         },
         "bioentity_label" : {
            "cardinality" : "single",
            "display_name" : "Label",
            "required" : "false",
            "property" : [],
            "transform" : [],
            "id" : "bioentity_label",
            "type" : "string",
            "description" : "Symbol or name.",
            "searchable" : "true",
            "indexed" : "true"
         },
         "taxon_subset_closure" : {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_subset_closure",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota)."
         },
         "regulates_closure_label" : {
            "transform" : [],
            "property" : [],
            "id" : "regulates_closure_label",
            "type" : "string",
            "description" : "Bioentities associated with this term or its children (over regulates).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Inferred annotation",
            "required" : "false"
         },
         "id" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene of gene product ID.",
            "id" : "id",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         "isa_partof_closure_label" : {
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Closure of labels over isa and partof.",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "required" : "false"
         },
         "taxon_subset_closure_label" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset.",
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi"
         },
         "taxon_label" : {
            "display_name" : "Organism",
            "cardinality" : "single",
            "required" : "false",
            "id" : "taxon_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Taxonomic group"
         },
         "bioentity" : {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Gene or gene product ID.",
            "type" : "string",
            "id" : "bioentity",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         "annotation_class_list_label" : {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "annotation_class_list_label",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Direct annotation",
            "required" : "false"
         },
         "isa_partof_closure" : {
            "required" : "false",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Closure of ids/accs over isa and partof.",
            "id" : "isa_partof_closure",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "synonym" : {
            "cardinality" : "multi",
            "display_name" : "Synonyms",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "synonym",
            "description" : "Gene product synonyms.",
            "searchable" : "false",
            "indexed" : "true"
         },
         "taxon" : {
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group",
            "type" : "string",
            "id" : "taxon",
            "property" : [],
            "transform" : []
         },
         "annotation_class_list" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_class_list",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Direct annotation",
            "required" : "false"
         },
         "taxon_closure" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "type" : "string",
            "id" : "taxon_closure",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi"
         },
         "taxon_closure_label" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "description" : "Taxonomic group and ancestral groups.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         "regulates_closure" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Inferred annotation",
            "description" : "Bioentities associated with this term or its children (over regulates).",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "regulates_closure"
         },
         "type" : {
            "required" : "false",
            "display_name" : "Type",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Type class.",
            "id" : "type",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "database_xref" : {
            "cardinality" : "multi",
            "display_name" : "DB xref",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "database_xref",
            "description" : "Database cross-reference.",
            "searchable" : "false",
            "indexed" : "true"
         },
         "bioentity_name" : {
            "required" : "false",
            "display_name" : "Name",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "The full name of the gene product.",
            "type" : "string",
            "id" : "bioentity_name",
            "property" : [],
            "transform" : []
         },
         "panther_family" : {
            "description" : "PANTHER families that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "panther_family",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "PANTHER family"
         }
      },
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/bio-config.yaml",
      "_strict" : 0,
      "schema_generating" : "true",
      "boost_weights" : "bioentity^2.0 bioentity_label^2.0 bioentity_name^1.0 bioentity_internal_id^1.0 synonym^1.0 isa_partof_closure_label^1.0 regulates_closure^1.0 regulates_closure_label^1.0 panther_family^1.0 panther_family_label^1.0 taxon_label^1.0",
      "display_name" : "Genes and gene products",
      "result_weights" : "bioentity^8.0 bioentity_name^7.0 taxon^6.0 panther_family^5.0 type^4.0 source^3.0 synonym^1.0"
   },
   "ontology" : {
      "_strict" : 0,
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/ont-config.yaml",
      "id" : "ontology",
      "fields" : [
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Term identifier.",
            "type" : "string",
            "id" : "id",
            "property" : [
               "getIdentifier"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Term identifier.",
            "id" : "annotation_class",
            "type" : "string",
            "property" : [
               "getIdentifier"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Term",
            "cardinality" : "single"
         },
         {
            "description" : "Identifier.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [
               "getLabel"
            ],
            "id" : "annotation_class_label",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Term"
         },
         {
            "cardinality" : "single",
            "display_name" : "Definition",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDef"
            ],
            "id" : "description",
            "type" : "string",
            "description" : "Term definition.",
            "searchable" : "true",
            "indexed" : "true"
         },
         {
            "cardinality" : "single",
            "display_name" : "Ontology source",
            "required" : "false",
            "property" : [
               "getNamespace"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "source",
            "description" : "Term namespace.",
            "indexed" : "true",
            "searchable" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Ontology ID space",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Term ID space.",
            "type" : "string",
            "id" : "idspace",
            "transform" : [],
            "property" : [
               "getIdSpace"
            ]
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Obsoletion",
            "description" : "Is the term obsolete?",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [
               "getIsObsoleteBinaryString"
            ],
            "type" : "boolean",
            "id" : "is_obsolete"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Comments",
            "description" : "Term comments.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [
               "getComments"
            ],
            "transform" : [],
            "id" : "comment",
            "type" : "string"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Synonyms",
            "required" : "false",
            "property" : [
               "getOBOSynonymStrings"
            ],
            "transform" : [],
            "id" : "synonym",
            "type" : "string",
            "description" : "Term synonyms.",
            "indexed" : "true",
            "searchable" : "true"
         },
         {
            "description" : "Alternate term identifier.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [
               "getAnnotationPropertyValues",
               "alt_id"
            ],
            "transform" : [],
            "id" : "alternate_id",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Alt ID"
         },
         {
            "transform" : [],
            "property" : [
               "getAnnotationPropertyValues",
               "replaced_by"
            ],
            "id" : "replaced_by",
            "type" : "string",
            "description" : "Term that replaces this term.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Replaced By",
            "required" : "false"
         },
         {
            "display_name" : "Consider",
            "cardinality" : "multi",
            "required" : "false",
            "type" : "string",
            "id" : "consider",
            "transform" : [],
            "property" : [
               "getAnnotationPropertyValues",
               "consider"
            ],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Others terms you might want to look at."
         },
         {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Special use collections of terms.",
            "type" : "string",
            "id" : "subset",
            "transform" : [],
            "property" : [
               "getSubsets"
            ],
            "required" : "false",
            "display_name" : "Subset",
            "cardinality" : "multi"
         },
         {
            "required" : "false",
            "display_name" : "Def xref",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Definition cross-reference.",
            "id" : "definition_xref",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDefXref"
            ]
         },
         {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Database cross-reference.",
            "id" : "database_xref",
            "type" : "string",
            "property" : [
               "getXref"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "DB xref",
            "cardinality" : "multi"
         },
         {
            "id" : "isa_partof_closure",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getRelationIDClosure",
               "BFO:0000050"
            ],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Ancestral terms (is_a/part_of).",
            "display_name" : "Is-a/part-of",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [
               "getRelationLabelClosure",
               "BFO:0000050"
            ],
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "description" : "Ancestral terms (is_a/part_of).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Is-a/part-of",
            "required" : "false"
         },
         {
            "property" : [
               "getRelationIDClosure",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "id" : "regulates_closure",
            "type" : "string",
            "description" : "Ancestral terms (regulates, occurs in, capable_of).",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Ancestor",
            "required" : "false"
         },
         {
            "type" : "string",
            "id" : "regulates_closure_label",
            "property" : [
               "getRelationLabelClosure",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Ancestral terms (regulates, occurs in, capable_of).",
            "display_name" : "Ancestor",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "display_name" : "Topology graph (JSON)",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "topology_graph_json",
            "transform" : [],
            "property" : [
               "getSegmentShuntGraphJSON",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "indexed" : "false",
            "searchable" : "false",
            "description" : "JSON blob form of the local stepwise topology graph. Uses various relations (including regulates, occurs in, capable_of)."
         },
         {
            "description" : "JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).",
            "indexed" : "false",
            "searchable" : "false",
            "property" : [
               "getLineageShuntGraphJSON",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "regulates_transitivity_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Regulates transitivity graph (JSON)"
         },
         {
            "description" : "JSON blob form of all immediate neighbors of the term.",
            "searchable" : "false",
            "indexed" : "false",
            "transform" : [],
            "property" : [
               "getNeighborsJSON"
            ],
            "type" : "string",
            "id" : "neighborhood_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Term neighborhood graph (JSON)"
         },
         {
            "searchable" : "false",
            "indexed" : "false",
            "description" : "JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.",
            "id" : "neighborhood_limited_graph_json",
            "type" : "string",
            "property" : [
               "getNeighborsLimitedJSON"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Term neighborhood limited graph (JSON)",
            "cardinality" : "single"
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Only in taxon",
            "description" : "Only in taxon.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "id" : "only_in_taxon",
            "type" : "string"
         },
         {
            "display_name" : "Only in taxon",
            "cardinality" : "single",
            "required" : "false",
            "id" : "only_in_taxon_label",
            "type" : "string",
            "property" : [
               "getDummyString"
            ],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Only in taxon label."
         },
         {
            "property" : [
               "getDummyStrings"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "only_in_taxon_closure",
            "description" : "Only in taxon closure.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Only in taxon (IDs)",
            "required" : "false"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Only in taxon",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDummyStrings"
            ],
            "id" : "only_in_taxon_closure_label",
            "type" : "string",
            "description" : "Only in taxon label closure.",
            "indexed" : "true",
            "searchable" : "true"
         },
         {
            "description" : "A non-lossy representation of conjunctions and disjunctions in c16 (JSON).",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "type" : "string",
            "id" : "annotation_extension_owl_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Annotation extension"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "This is equivalent to the relation field in GPAD.",
            "id" : "annotation_relation",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "required" : "false",
            "display_name" : "Annotation relation",
            "cardinality" : "single"
         },
         {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "This is equivalent to the relation field in GPAD.",
            "id" : "annotation_relation_label",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "required" : "false",
            "display_name" : "Annotation relation",
            "cardinality" : "single"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "For any class document C, this will contain json(CE) for all axioms of form EquivalentClasses(C ... CE ....).",
            "type" : "string",
            "id" : "equivalent_class_expressions_json",
            "property" : [
               "getDummyString"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Eq class expressions",
            "cardinality" : "single"
         },
         {
            "id" : "disjoint_class_list",
            "type" : "string",
            "property" : [
               "getDummyStrings"
            ],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Disjoint classes.",
            "display_name" : "Disjoint classes",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Disjoint classes",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDummyStrings"
            ],
            "type" : "string",
            "id" : "disjoint_class_list_label",
            "description" : "Disjoint classes.",
            "indexed" : "true",
            "searchable" : "true"
         }
      ],
      "fields_hash" : {
         "database_xref" : {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Database cross-reference.",
            "id" : "database_xref",
            "type" : "string",
            "property" : [
               "getXref"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "DB xref",
            "cardinality" : "multi"
         },
         "annotation_class" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Term identifier.",
            "id" : "annotation_class",
            "type" : "string",
            "property" : [
               "getIdentifier"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Term",
            "cardinality" : "single"
         },
         "equivalent_class_expressions_json" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "For any class document C, this will contain json(CE) for all axioms of form EquivalentClasses(C ... CE ....).",
            "type" : "string",
            "id" : "equivalent_class_expressions_json",
            "property" : [
               "getDummyString"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Eq class expressions",
            "cardinality" : "single"
         },
         "only_in_taxon_closure" : {
            "property" : [
               "getDummyStrings"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "only_in_taxon_closure",
            "description" : "Only in taxon closure.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Only in taxon (IDs)",
            "required" : "false"
         },
         "disjoint_class_list" : {
            "id" : "disjoint_class_list",
            "type" : "string",
            "property" : [
               "getDummyStrings"
            ],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Disjoint classes.",
            "display_name" : "Disjoint classes",
            "cardinality" : "multi",
            "required" : "false"
         },
         "isa_partof_closure" : {
            "id" : "isa_partof_closure",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getRelationIDClosure",
               "BFO:0000050"
            ],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Ancestral terms (is_a/part_of).",
            "display_name" : "Is-a/part-of",
            "cardinality" : "multi",
            "required" : "false"
         },
         "annotation_relation" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "This is equivalent to the relation field in GPAD.",
            "id" : "annotation_relation",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "required" : "false",
            "display_name" : "Annotation relation",
            "cardinality" : "single"
         },
         "synonym" : {
            "cardinality" : "multi",
            "display_name" : "Synonyms",
            "required" : "false",
            "property" : [
               "getOBOSynonymStrings"
            ],
            "transform" : [],
            "id" : "synonym",
            "type" : "string",
            "description" : "Term synonyms.",
            "indexed" : "true",
            "searchable" : "true"
         },
         "comment" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Comments",
            "description" : "Term comments.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [
               "getComments"
            ],
            "transform" : [],
            "id" : "comment",
            "type" : "string"
         },
         "definition_xref" : {
            "required" : "false",
            "display_name" : "Def xref",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Definition cross-reference.",
            "id" : "definition_xref",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDefXref"
            ]
         },
         "neighborhood_graph_json" : {
            "description" : "JSON blob form of all immediate neighbors of the term.",
            "searchable" : "false",
            "indexed" : "false",
            "transform" : [],
            "property" : [
               "getNeighborsJSON"
            ],
            "type" : "string",
            "id" : "neighborhood_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Term neighborhood graph (JSON)"
         },
         "annotation_extension_owl_json" : {
            "description" : "A non-lossy representation of conjunctions and disjunctions in c16 (JSON).",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "type" : "string",
            "id" : "annotation_extension_owl_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Annotation extension"
         },
         "regulates_closure_label" : {
            "type" : "string",
            "id" : "regulates_closure_label",
            "property" : [
               "getRelationLabelClosure",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Ancestral terms (regulates, occurs in, capable_of).",
            "display_name" : "Ancestor",
            "cardinality" : "multi",
            "required" : "false"
         },
         "id" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Term identifier.",
            "type" : "string",
            "id" : "id",
            "property" : [
               "getIdentifier"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Acc",
            "cardinality" : "single"
         },
         "is_obsolete" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Obsoletion",
            "description" : "Is the term obsolete?",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [
               "getIsObsoleteBinaryString"
            ],
            "type" : "boolean",
            "id" : "is_obsolete"
         },
         "idspace" : {
            "required" : "false",
            "display_name" : "Ontology ID space",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Term ID space.",
            "type" : "string",
            "id" : "idspace",
            "transform" : [],
            "property" : [
               "getIdSpace"
            ]
         },
         "replaced_by" : {
            "transform" : [],
            "property" : [
               "getAnnotationPropertyValues",
               "replaced_by"
            ],
            "id" : "replaced_by",
            "type" : "string",
            "description" : "Term that replaces this term.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Replaced By",
            "required" : "false"
         },
         "source" : {
            "cardinality" : "single",
            "display_name" : "Ontology source",
            "required" : "false",
            "property" : [
               "getNamespace"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "source",
            "description" : "Term namespace.",
            "indexed" : "true",
            "searchable" : "false"
         },
         "annotation_relation_label" : {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "This is equivalent to the relation field in GPAD.",
            "id" : "annotation_relation_label",
            "type" : "string",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "required" : "false",
            "display_name" : "Annotation relation",
            "cardinality" : "single"
         },
         "neighborhood_limited_graph_json" : {
            "searchable" : "false",
            "indexed" : "false",
            "description" : "JSON blob form of all immediate neighbors of the term; in the case that there are too many neighbors to transport, the number will be artificially reduced.",
            "id" : "neighborhood_limited_graph_json",
            "type" : "string",
            "property" : [
               "getNeighborsLimitedJSON"
            ],
            "transform" : [],
            "required" : "false",
            "display_name" : "Term neighborhood limited graph (JSON)",
            "cardinality" : "single"
         },
         "regulates_closure" : {
            "property" : [
               "getRelationIDClosure",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "id" : "regulates_closure",
            "type" : "string",
            "description" : "Ancestral terms (regulates, occurs in, capable_of).",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Ancestor",
            "required" : "false"
         },
         "description" : {
            "cardinality" : "single",
            "display_name" : "Definition",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDef"
            ],
            "id" : "description",
            "type" : "string",
            "description" : "Term definition.",
            "searchable" : "true",
            "indexed" : "true"
         },
         "only_in_taxon_label" : {
            "display_name" : "Only in taxon",
            "cardinality" : "single",
            "required" : "false",
            "id" : "only_in_taxon_label",
            "type" : "string",
            "property" : [
               "getDummyString"
            ],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Only in taxon label."
         },
         "alternate_id" : {
            "description" : "Alternate term identifier.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [
               "getAnnotationPropertyValues",
               "alt_id"
            ],
            "transform" : [],
            "id" : "alternate_id",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Alt ID"
         },
         "regulates_transitivity_graph_json" : {
            "description" : "JSON blob form of the local relation transitivity graph. Uses various relations (including regulates, occurs in, capable_of).",
            "indexed" : "false",
            "searchable" : "false",
            "property" : [
               "getLineageShuntGraphJSON",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "transform" : [],
            "type" : "string",
            "id" : "regulates_transitivity_graph_json",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Regulates transitivity graph (JSON)"
         },
         "annotation_class_label" : {
            "description" : "Identifier.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [
               "getLabel"
            ],
            "id" : "annotation_class_label",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Term"
         },
         "isa_partof_closure_label" : {
            "transform" : [],
            "property" : [
               "getRelationLabelClosure",
               "BFO:0000050"
            ],
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "description" : "Ancestral terms (is_a/part_of).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Is-a/part-of",
            "required" : "false"
         },
         "only_in_taxon_closure_label" : {
            "cardinality" : "multi",
            "display_name" : "Only in taxon",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDummyStrings"
            ],
            "id" : "only_in_taxon_closure_label",
            "type" : "string",
            "description" : "Only in taxon label closure.",
            "indexed" : "true",
            "searchable" : "true"
         },
         "topology_graph_json" : {
            "display_name" : "Topology graph (JSON)",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "topology_graph_json",
            "transform" : [],
            "property" : [
               "getSegmentShuntGraphJSON",
               "BFO:0000050",
               "BFO:0000066",
               "RO:0002211",
               "RO:0002212",
               "RO:0002213",
               "RO:0002215",
               "RO:0002216"
            ],
            "indexed" : "false",
            "searchable" : "false",
            "description" : "JSON blob form of the local stepwise topology graph. Uses various relations (including regulates, occurs in, capable_of)."
         },
         "only_in_taxon" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Only in taxon",
            "description" : "Only in taxon.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [
               "getDummyString"
            ],
            "id" : "only_in_taxon",
            "type" : "string"
         },
         "consider" : {
            "display_name" : "Consider",
            "cardinality" : "multi",
            "required" : "false",
            "type" : "string",
            "id" : "consider",
            "transform" : [],
            "property" : [
               "getAnnotationPropertyValues",
               "consider"
            ],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Others terms you might want to look at."
         },
         "subset" : {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Special use collections of terms.",
            "type" : "string",
            "id" : "subset",
            "transform" : [],
            "property" : [
               "getSubsets"
            ],
            "required" : "false",
            "display_name" : "Subset",
            "cardinality" : "multi"
         },
         "disjoint_class_list_label" : {
            "cardinality" : "multi",
            "display_name" : "Disjoint classes",
            "required" : "false",
            "transform" : [],
            "property" : [
               "getDummyStrings"
            ],
            "type" : "string",
            "id" : "disjoint_class_list_label",
            "description" : "Disjoint classes.",
            "indexed" : "true",
            "searchable" : "true"
         }
      },
      "weight" : "40",
      "description" : "Gene Ontology Term, Synonym, or Definition.",
      "document_category" : "ontology_class",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/ont-config.yaml",
      "searchable_extension" : "_searchable",
      "filter_weights" : "source^4.0 idspace^3.5 subset^3.0 is_obsolete^0.0",
      "display_name" : "Ontology",
      "result_weights" : "annotation_class^8.0 description^6.0 source^4.0 idspace^3.5 synonym^3.0 alternate_id^2.0",
      "boost_weights" : "annotation_class^3.0 annotation_class_label^5.5 description^1.0 synonym^1.0 alternate_id^1.0",
      "schema_generating" : "true"
   },
   "model_annotation" : {
      "boost_weights" : "model_label^1.0 annotation_unit_label^1.0 enabled_by^1.0 enabled_by_label^1.0 location_list_closure^1.0 location_list_closure_label^1.0 process_class_closure_label^1.0 function_class_closure_label^1.0 comment^0.5",
      "schema_generating" : "true",
      "result_weights" : "function_class^9.0 enabled_by^8.0 location_list^7.0 process_class^6.0 model^5.0 taxon^4.5 contributor^4.0 model_date^3.0 reference^2.0",
      "display_name" : "GO models (ALPHA)",
      "description" : "An individual unit within LEGO. This is <strong>ALPHA</strong> software.",
      "weight" : "40",
      "document_category" : "model_annotation",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/model-ann-config.yaml",
      "searchable_extension" : "_searchable",
      "filter_weights" : "model_label^5.0 enabled_by_label^4.5 reference^4.3 location_list_closure_label^4.0 process_class_closure_label^3.0 function_class_closure_label^2.0 contributor^1.0 evidence_type^0.5",
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/model-ann-config.yaml",
      "_strict" : 0,
      "fields_hash" : {
         "model_label" : {
            "display_name" : "Model title",
            "cardinality" : "single",
            "required" : "false",
            "id" : "model_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???."
         },
         "topology_graph_json" : {
            "required" : "false",
            "display_name" : "Topology graph (JSON)",
            "cardinality" : "single",
            "indexed" : "false",
            "searchable" : "false",
            "description" : "JSON blob form of the local stepwise topology graph.",
            "type" : "string",
            "id" : "topology_graph_json",
            "property" : [],
            "transform" : []
         },
         "taxon_label" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_label",
            "description" : "Taxon derived from GAF column 13 and ncbi_taxonomy.obo.",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         "model" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Model title",
            "description" : "???.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "model"
         },
         "evidence_with" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "evidence_with",
            "description" : "Evidence with/from.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "multi",
            "display_name" : "Evidence with",
            "required" : "false"
         },
         "annotation_unit_label" : {
            "type" : "string",
            "id" : "annotation_unit_label",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???.",
            "display_name" : "Annotation unit",
            "cardinality" : "single",
            "required" : "false"
         },
         "evidence_type" : {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Evidence type.",
            "type" : "string",
            "id" : "evidence_type",
            "transform" : [],
            "property" : []
         },
         "model_date" : {
            "cardinality" : "single",
            "display_name" : "Modified",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "model_date",
            "description" : "Last modified",
            "indexed" : "true",
            "searchable" : "true"
         },
         "location_list_closure" : {
            "display_name" : "Location",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "location_list_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : ""
         },
         "process_class_closure" : {
            "required" : "false",
            "display_name" : "Process",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???",
            "type" : "string",
            "id" : "process_class_closure",
            "transform" : [],
            "property" : []
         },
         "model_url" : {
            "display_name" : "Model URL",
            "cardinality" : "single",
            "required" : "false",
            "id" : "model_url",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???."
         },
         "evidence_type_closure" : {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "evidence_type_closure",
            "description" : "All evidence (evidence closure) for this annotation",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Evidence type",
            "required" : "false"
         },
         "enabled_by_label" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???",
            "id" : "enabled_by_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Enabled by",
            "cardinality" : "single"
         },
         "annotation_value" : {
            "required" : "false",
            "display_name" : "Text",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "set of all literal values of all annotation assertions in model",
            "type" : "string",
            "id" : "annotation_value",
            "transform" : [],
            "property" : []
         },
         "function_class" : {
            "description" : "Function acc/ID.",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "function_class",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Function"
         },
         "process_class_closure_label" : {
            "id" : "process_class_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???",
            "display_name" : "Process",
            "cardinality" : "multi",
            "required" : "false"
         },
         "taxon" : {
            "description" : "GAF column 13 (taxon).",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Taxon"
         },
         "reference" : {
            "description" : "Database reference.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "reference",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Reference"
         },
         "model_state" : {
            "required" : "false",
            "display_name" : "State",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???.",
            "type" : "string",
            "id" : "model_state",
            "transform" : [],
            "property" : []
         },
         "function_class_label" : {
            "display_name" : "Function",
            "cardinality" : "single",
            "required" : "false",
            "id" : "function_class_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Common function name."
         },
         "process_class_label" : {
            "required" : "false",
            "display_name" : "Process",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Common process name.",
            "id" : "process_class_label",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "location_list_closure_label" : {
            "required" : "false",
            "display_name" : "Location",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "",
            "type" : "string",
            "id" : "location_list_closure_label",
            "property" : [],
            "transform" : []
         },
         "location_list" : {
            "display_name" : "Location",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "location_list",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : ""
         },
         "id" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "ID",
            "description" : "A unique (and internal) thing.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "id",
            "type" : "string"
         },
         "panther_family_label" : {
            "cardinality" : "single",
            "display_name" : "PANTHER family",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "panther_family_label",
            "type" : "string",
            "description" : "PANTHER families that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true"
         },
         "evidence_type_label" : {
            "display_name" : "Evidence",
            "cardinality" : "single",
            "required" : "false",
            "id" : "evidence_type_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Evidence type."
         },
         "function_class_closure" : {
            "description" : "???",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "function_class_closure",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Function"
         },
         "annotation_unit" : {
            "description" : "???.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "annotation_unit",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Annotation unit"
         },
         "evidence_type_closure_label" : {
            "required" : "false",
            "display_name" : "Evidence type",
            "cardinality" : "multi",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "All evidence (evidence closure) for this annotation",
            "type" : "string",
            "id" : "evidence_type_closure_label",
            "property" : [],
            "transform" : []
         },
         "process_class" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "process_class",
            "description" : "Process acc/ID.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "single",
            "display_name" : "Process",
            "required" : "false"
         },
         "location_list_label" : {
            "required" : "false",
            "display_name" : "Location",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "",
            "type" : "string",
            "id" : "location_list_label",
            "property" : [],
            "transform" : []
         },
         "panther_family" : {
            "cardinality" : "single",
            "display_name" : "PANTHER family",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "panther_family",
            "type" : "string",
            "description" : "PANTHER family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true"
         },
         "taxon_closure_label" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "description" : "Taxon label closure derived from GAF column 13 and ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         "taxon_closure" : {
            "required" : "false",
            "display_name" : "Taxon (IDs)",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxon IDs derived from GAF column 13 and ncbi_taxonomy.obo.",
            "type" : "string",
            "id" : "taxon_closure",
            "property" : [],
            "transform" : []
         },
         "comment" : {
            "description" : "Comments",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "comment",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Comments"
         },
         "owl_blob_json" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "???",
            "description" : "???",
            "searchable" : "false",
            "indexed" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "owl_blob_json"
         },
         "contributor" : {
            "description" : "???.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "contributor",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Contributor"
         },
         "function_class_closure_label" : {
            "id" : "function_class_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???",
            "display_name" : "Function",
            "cardinality" : "multi",
            "required" : "false"
         },
         "enabled_by" : {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???",
            "id" : "enabled_by",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Enabled by",
            "cardinality" : "single"
         }
      },
      "fields" : [
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "ID",
            "description" : "A unique (and internal) thing.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "id",
            "type" : "string"
         },
         {
            "description" : "???.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "annotation_unit",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Annotation unit"
         },
         {
            "type" : "string",
            "id" : "annotation_unit_label",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???.",
            "display_name" : "Annotation unit",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Model title",
            "description" : "???.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "model"
         },
         {
            "display_name" : "Model title",
            "cardinality" : "single",
            "required" : "false",
            "id" : "model_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???."
         },
         {
            "display_name" : "Model URL",
            "cardinality" : "single",
            "required" : "false",
            "id" : "model_url",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???."
         },
         {
            "required" : "false",
            "display_name" : "State",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???.",
            "type" : "string",
            "id" : "model_state",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "display_name" : "Text",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "set of all literal values of all annotation assertions in model",
            "type" : "string",
            "id" : "annotation_value",
            "transform" : [],
            "property" : []
         },
         {
            "description" : "???.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "contributor",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Contributor"
         },
         {
            "cardinality" : "single",
            "display_name" : "Modified",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "model_date",
            "description" : "Last modified",
            "indexed" : "true",
            "searchable" : "true"
         },
         {
            "description" : "Comments",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "comment",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Comments"
         },
         {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???",
            "id" : "enabled_by",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Enabled by",
            "cardinality" : "single"
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???",
            "id" : "enabled_by_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Enabled by",
            "cardinality" : "single"
         },
         {
            "cardinality" : "single",
            "display_name" : "PANTHER family",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "panther_family",
            "type" : "string",
            "description" : "PANTHER family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true"
         },
         {
            "cardinality" : "single",
            "display_name" : "PANTHER family",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "panther_family_label",
            "type" : "string",
            "description" : "PANTHER families that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true"
         },
         {
            "description" : "GAF column 13 (taxon).",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Taxon"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_label",
            "description" : "Taxon derived from GAF column 13 and ncbi_taxonomy.obo.",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Taxon (IDs)",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxon IDs derived from GAF column 13 and ncbi_taxonomy.obo.",
            "type" : "string",
            "id" : "taxon_closure",
            "property" : [],
            "transform" : []
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "description" : "Taxon label closure derived from GAF column 13 and ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         {
            "description" : "Function acc/ID.",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "function_class",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Function"
         },
         {
            "display_name" : "Function",
            "cardinality" : "single",
            "required" : "false",
            "id" : "function_class_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Common function name."
         },
         {
            "description" : "???",
            "searchable" : "false",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "function_class_closure",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Function"
         },
         {
            "id" : "function_class_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "???",
            "display_name" : "Function",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "process_class",
            "description" : "Process acc/ID.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "single",
            "display_name" : "Process",
            "required" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Process",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Common process name.",
            "id" : "process_class_label",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "display_name" : "Process",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "???",
            "type" : "string",
            "id" : "process_class_closure",
            "transform" : [],
            "property" : []
         },
         {
            "id" : "process_class_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "???",
            "display_name" : "Process",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "display_name" : "Location",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "location_list",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : ""
         },
         {
            "required" : "false",
            "display_name" : "Location",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "",
            "type" : "string",
            "id" : "location_list_label",
            "property" : [],
            "transform" : []
         },
         {
            "display_name" : "Location",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "location_list_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : ""
         },
         {
            "required" : "false",
            "display_name" : "Location",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "",
            "type" : "string",
            "id" : "location_list_closure_label",
            "property" : [],
            "transform" : []
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "???",
            "description" : "???",
            "searchable" : "false",
            "indexed" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "owl_blob_json"
         },
         {
            "required" : "false",
            "display_name" : "Topology graph (JSON)",
            "cardinality" : "single",
            "indexed" : "false",
            "searchable" : "false",
            "description" : "JSON blob form of the local stepwise topology graph.",
            "type" : "string",
            "id" : "topology_graph_json",
            "property" : [],
            "transform" : []
         },
         {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Evidence type.",
            "type" : "string",
            "id" : "evidence_type",
            "transform" : [],
            "property" : []
         },
         {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "evidence_type_closure",
            "description" : "All evidence (evidence closure) for this annotation",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Evidence type",
            "required" : "false"
         },
         {
            "display_name" : "Evidence",
            "cardinality" : "single",
            "required" : "false",
            "id" : "evidence_type_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Evidence type."
         },
         {
            "required" : "false",
            "display_name" : "Evidence type",
            "cardinality" : "multi",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "All evidence (evidence closure) for this annotation",
            "type" : "string",
            "id" : "evidence_type_closure_label",
            "property" : [],
            "transform" : []
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "evidence_with",
            "description" : "Evidence with/from.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "multi",
            "display_name" : "Evidence with",
            "required" : "false"
         },
         {
            "description" : "Database reference.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "reference",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Reference"
         }
      ],
      "id" : "model_annotation"
   },
   "noctua_model_meta" : {
      "_strict" : 0,
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/noctua-model-meta-config.yaml",
      "fields_hash" : {
         "annotation_unit" : {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "The title(s) associated with the model.",
            "type" : "string",
            "id" : "annotation_unit",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Model identifier",
            "cardinality" : "single"
         },
         "annotation_unit_label" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Model identifier",
            "description" : "The title(s) associated with the model.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_unit_label"
         },
         "model_state" : {
            "description" : "The editorial state of the model.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "model_state",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "State"
         },
         "id" : {
            "required" : "false",
            "display_name" : "Internal ID",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The mangled internal ID for this entity.",
            "type" : "string",
            "id" : "id",
            "transform" : [],
            "property" : []
         },
         "comment" : {
            "id" : "comment",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "The comments associated with a model.",
            "display_name" : "Comment",
            "cardinality" : "single",
            "required" : "false"
         },
         "owl_blob_json" : {
            "cardinality" : "single",
            "display_name" : "???",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "owl_blob_json",
            "description" : "???",
            "searchable" : "false",
            "indexed" : "false"
         },
         "model_date" : {
            "display_name" : "Last modified",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "model_date",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Model last modification dates."
         },
         "contributor" : {
            "description" : "Contributor identity.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "contributor",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Contributor"
         }
      },
      "fields" : [
         {
            "required" : "false",
            "display_name" : "Internal ID",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The mangled internal ID for this entity.",
            "type" : "string",
            "id" : "id",
            "transform" : [],
            "property" : []
         },
         {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "The title(s) associated with the model.",
            "type" : "string",
            "id" : "annotation_unit",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Model identifier",
            "cardinality" : "single"
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Model identifier",
            "description" : "The title(s) associated with the model.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_unit_label"
         },
         {
            "description" : "Contributor identity.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "contributor",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Contributor"
         },
         {
            "display_name" : "Last modified",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "model_date",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Model last modification dates."
         },
         {
            "description" : "The editorial state of the model.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "model_state",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "State"
         },
         {
            "id" : "comment",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "The comments associated with a model.",
            "display_name" : "Comment",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "cardinality" : "single",
            "display_name" : "???",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "owl_blob_json",
            "description" : "???",
            "searchable" : "false",
            "indexed" : "false"
         }
      ],
      "id" : "noctua_model_meta",
      "description" : "A generic capture of light Noctua metadata in realtime.",
      "weight" : "0",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/noctua-model-meta-config.yaml",
      "document_category" : "noctua_model_meta",
      "filter_weights" : "contributor^3.0 model_state^2.0 model_date^1.0",
      "searchable_extension" : "_searchable",
      "result_weights" : "annotation_unit^3.0 contributor^2.0 model_state^1.0 model_date^1.0 comment^1.0",
      "display_name" : "Noctua meta",
      "boost_weights" : "annotation_unit_label^3.0 contributor^2.0 model_date^1.0 comment^1.0",
      "schema_generating" : "true"
   },
   "bbop_ann_ev_agg" : {
      "display_name" : "Advanced",
      "result_weights" : "bioentity^4.0 annotation_class^3.0 taxon^2.0",
      "schema_generating" : "true",
      "boost_weights" : "annotation_class^2.0 annotation_class_label^1.0 bioentity^2.0 bioentity_label^1.0 panther_family^1.0 panther_family_label^1.0 taxon_closure_label^1.0",
      "id" : "bbop_ann_ev_agg",
      "fields" : [
         {
            "id" : "id",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene/product ID.",
            "display_name" : "Acc",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 1 + columns 2.",
            "type" : "string",
            "id" : "bioentity",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Gene/product ID",
            "cardinality" : "single"
         },
         {
            "required" : "false",
            "display_name" : "Gene/product label",
            "cardinality" : "single",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Column 3.",
            "type" : "string",
            "id" : "bioentity_label",
            "property" : [],
            "transform" : []
         },
         {
            "required" : "false",
            "display_name" : "Annotation class",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 5.",
            "id" : "annotation_class",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "annotation_class_label",
            "description" : "Column 5 + ontology.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Annotation class label",
            "required" : "false"
         },
         {
            "description" : "All evidence for this term/gene product pair",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "evidence_type_closure",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Evidence type"
         },
         {
            "display_name" : "Evidence with",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "evidence_with",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All column 8s for this term/gene product pair"
         },
         {
            "id" : "taxon",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 13: taxon.",
            "display_name" : "Taxon",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "taxon_label",
            "type" : "string",
            "description" : "Derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_closure",
            "description" : "IDs derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon (IDs)",
            "required" : "false"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "description" : "Labels derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Protein family",
            "description" : "Family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "panther_family",
            "type" : "string"
         },
         {
            "display_name" : "Family",
            "cardinality" : "single",
            "required" : "false",
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Families that are associated with this entity."
         }
      ],
      "fields_hash" : {
         "annotation_class" : {
            "required" : "false",
            "display_name" : "Annotation class",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 5.",
            "id" : "annotation_class",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "panther_family" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Protein family",
            "description" : "Family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "panther_family",
            "type" : "string"
         },
         "taxon_label" : {
            "transform" : [],
            "property" : [],
            "id" : "taxon_label",
            "type" : "string",
            "description" : "Derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Taxon",
            "required" : "false"
         },
         "bioentity" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 1 + columns 2.",
            "type" : "string",
            "id" : "bioentity",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Gene/product ID",
            "cardinality" : "single"
         },
         "taxon" : {
            "id" : "taxon",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Column 13: taxon.",
            "display_name" : "Taxon",
            "cardinality" : "single",
            "required" : "false"
         },
         "taxon_closure" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_closure",
            "description" : "IDs derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon (IDs)",
            "required" : "false"
         },
         "taxon_closure_label" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Taxon",
            "description" : "Labels derived from C13 + ncbi_taxonomy.obo.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "id" : "taxon_closure_label",
            "type" : "string"
         },
         "evidence_with" : {
            "display_name" : "Evidence with",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "evidence_with",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All column 8s for this term/gene product pair"
         },
         "id" : {
            "id" : "id",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene/product ID.",
            "display_name" : "Acc",
            "cardinality" : "single",
            "required" : "false"
         },
         "panther_family_label" : {
            "display_name" : "Family",
            "cardinality" : "single",
            "required" : "false",
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Families that are associated with this entity."
         },
         "bioentity_label" : {
            "required" : "false",
            "display_name" : "Gene/product label",
            "cardinality" : "single",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Column 3.",
            "type" : "string",
            "id" : "bioentity_label",
            "property" : [],
            "transform" : []
         },
         "evidence_type_closure" : {
            "description" : "All evidence for this term/gene product pair",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "evidence_type_closure",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Evidence type"
         },
         "annotation_class_label" : {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "annotation_class_label",
            "description" : "Column 5 + ontology.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "Annotation class label",
            "required" : "false"
         }
      },
      "_strict" : 0,
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann_ev_agg-config.yaml",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann_ev_agg-config.yaml",
      "document_category" : "annotation_evidence_aggregate",
      "filter_weights" : "evidence_type_closure^4.0 evidence_with^3.0 taxon_closure_label^2.0",
      "searchable_extension" : "_searchable",
      "weight" : "-10",
      "description" : "A description of annotation evidence aggregate for GOlr and AmiGO."
   },
   "family" : {
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/protein-family-config.yaml",
      "filter_weights" : "bioentity_list_label^1.0",
      "document_category" : "family",
      "searchable_extension" : "_searchable",
      "weight" : "5",
      "description" : "Information about protein (PANTHER) families.",
      "id" : "family",
      "fields" : [
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "id",
            "description" : "Family ID.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Acc",
            "required" : "false"
         },
         {
            "description" : "PANTHER family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "panther_family",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "PANTHER family"
         },
         {
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false",
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity."
         },
         {
            "type" : "string",
            "id" : "phylo_graph_json",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "false",
            "description" : "JSON blob form of the phylogenic tree.",
            "display_name" : "This should not be displayed",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "required" : "false",
            "display_name" : "Gene/products",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Gene/products annotated with this protein family.",
            "type" : "string",
            "id" : "bioentity_list",
            "transform" : [],
            "property" : []
         },
         {
            "cardinality" : "multi",
            "display_name" : "Gene/products",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "bioentity_list_label",
            "type" : "string",
            "description" : "Gene/products annotated with this protein family.",
            "indexed" : "true",
            "searchable" : "false"
         }
      ],
      "fields_hash" : {
         "panther_family_label" : {
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false",
            "id" : "panther_family_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity."
         },
         "bioentity_list_label" : {
            "cardinality" : "multi",
            "display_name" : "Gene/products",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "bioentity_list_label",
            "type" : "string",
            "description" : "Gene/products annotated with this protein family.",
            "indexed" : "true",
            "searchable" : "false"
         },
         "phylo_graph_json" : {
            "type" : "string",
            "id" : "phylo_graph_json",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "false",
            "description" : "JSON blob form of the phylogenic tree.",
            "display_name" : "This should not be displayed",
            "cardinality" : "single",
            "required" : "false"
         },
         "panther_family" : {
            "description" : "PANTHER family IDs that are associated with this entity.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "id" : "panther_family",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "PANTHER family"
         },
         "id" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "id",
            "description" : "Family ID.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Acc",
            "required" : "false"
         },
         "bioentity_list" : {
            "required" : "false",
            "display_name" : "Gene/products",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Gene/products annotated with this protein family.",
            "type" : "string",
            "id" : "bioentity_list",
            "transform" : [],
            "property" : []
         }
      },
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/protein-family-config.yaml",
      "_strict" : 0,
      "schema_generating" : "true",
      "boost_weights" : "panther_family^2.0 panther_family_label^2.0 bioentity_list^1.0 bioentity_list_label^1.0",
      "display_name" : "Protein families",
      "result_weights" : "panther_family^5.0 bioentity_list^4.0"
   },
   "annotation" : {
      "weight" : "20",
      "description" : "Associations between GO terms and genes or gene products.",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann-config.yaml",
      "filter_weights" : "aspect^10.0 taxon_subset_closure_label^9.0 evidence_subset_closure_label^8.0 regulates_closure_label^7.0 annotation_class_label^6.0 qualifier^5.0 annotation_extension_class_closure_label^4.0 assigned_by^3.0 panther_family_label^2.0",
      "document_category" : "annotation",
      "searchable_extension" : "_searchable",
      "_strict" : 0,
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann-config.yaml",
      "id" : "annotation",
      "fields" : [
         {
            "description" : "A unique (and internal) combination of bioentity and ontology class.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "id",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Acc"
         },
         {
            "id" : "source",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Database source.",
            "display_name" : "Source",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "display_name" : "Type class id",
            "cardinality" : "single",
            "required" : "false",
            "id" : "type",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Type class."
         },
         {
            "id" : "date",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Date of assignment.",
            "display_name" : "Date",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Contributor",
            "description" : "Annotations assigned by group.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "assigned_by",
            "type" : "string"
         },
         {
            "display_name" : "Redundant for",
            "cardinality" : "single",
            "required" : "false",
            "id" : "is_redundant_for",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Rational for redundancy of annotation."
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "taxon",
            "type" : "string",
            "description" : "Taxonomic group.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "single",
            "display_name" : "Organism",
            "required" : "false"
         },
         {
            "type" : "string",
            "id" : "taxon_label",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "display_name" : "Organism",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "description" : "Taxonomic group and ancestral groups.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon_closure",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         },
         {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups."
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         {
            "description" : "Secondary taxon.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "secondary_taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Secondary taxon"
         },
         {
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Secondary taxon.",
            "type" : "string",
            "id" : "secondary_taxon_label",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Secondary taxon closure.",
            "id" : "secondary_taxon_closure",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Secondary taxon closure.",
            "id" : "secondary_taxon_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "multi"
         },
         {
            "type" : "string",
            "id" : "isa_partof_closure",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Annotations for this term or its children (over is_a/part_of).",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Annotations for this term or its children (over is_a/part_of).",
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Involved in",
            "cardinality" : "multi"
         },
         {
            "type" : "string",
            "id" : "regulates_closure",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Annotations for this term or its children (over regulates).",
            "display_name" : "GO class",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "cardinality" : "multi",
            "display_name" : "GO class",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "regulates_closure_label",
            "description" : "Annotations for this term or its children (over regulates).",
            "indexed" : "true",
            "searchable" : "true"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Closure of ids/accs over has_participant.",
            "type" : "string",
            "id" : "has_participant_closure",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Has participant (IDs)",
            "cardinality" : "multi"
         },
         {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "has_participant_closure_label",
            "description" : "Closure of labels over has_participant.",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Has participant",
            "required" : "false"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Synonym",
            "description" : "Gene or gene product synonyms.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "synonym"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene or gene product identifiers.",
            "type" : "string",
            "id" : "bioentity",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Gene/product",
            "cardinality" : "single"
         },
         {
            "required" : "false",
            "display_name" : "Gene/product",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Gene or gene product identifiers.",
            "id" : "bioentity_label",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "cardinality" : "single",
            "display_name" : "Gene/product name",
            "required" : "false",
            "property" : [],
            "transform" : [],
            "id" : "bioentity_name",
            "type" : "string",
            "description" : "The full name of the gene or gene product.",
            "indexed" : "true",
            "searchable" : "true"
         },
         {
            "id" : "bioentity_internal_id",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "false",
            "description" : "The bioentity ID used at the database of origin.",
            "display_name" : "This should not be displayed",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Annotation qualifier.",
            "type" : "string",
            "id" : "qualifier",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Annotation qualifier",
            "cardinality" : "multi"
         },
         {
            "type" : "string",
            "id" : "annotation_class",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Direct annotations.",
            "display_name" : "GO class (direct)",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_class_label",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "GO class (direct)",
            "required" : "false"
         },
         {
            "property" : [],
            "transform" : [],
            "id" : "aspect",
            "type" : "string",
            "description" : "Ontology aspect.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Ontology (aspect)",
            "required" : "false"
         },
         {
            "cardinality" : "single",
            "display_name" : "Isoform",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "bioentity_isoform",
            "description" : "Biological isoform.",
            "indexed" : "true",
            "searchable" : "false"
         },
         {
            "transform" : [],
            "property" : [],
            "id" : "evidence_type",
            "type" : "string",
            "description" : "Evidence type. (legacy)",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Evidence",
            "required" : "false"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence (evidence closure) for this annotation. (legacy)",
            "id" : "evidence_type_closure",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Evidence type",
            "cardinality" : "multi"
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Evidence with/from.",
            "id" : "evidence_with",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Evidence with",
            "cardinality" : "multi"
         },
         {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Evidence.",
            "id" : "evidence",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Evidence",
            "description" : "Evidence.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "evidence_label"
         },
         {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence for this annotation.",
            "id" : "evidence_closure",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "All evidence for this annotation.",
            "id" : "evidence_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "evidence_subset_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence for this annotation reduced to a usable subset."
         },
         {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "All evidence for this annotation reduced to a usable subset.",
            "type" : "string",
            "id" : "evidence_subset_closure_label",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi"
         },
         {
            "type" : "string",
            "id" : "reference",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Database reference.",
            "display_name" : "Reference",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "id" : "annotation_extension_class",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Annotation extension",
            "cardinality" : "multi"
         },
         {
            "required" : "false",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "type" : "string",
            "id" : "annotation_extension_class_label",
            "property" : [],
            "transform" : []
         },
         {
            "type" : "string",
            "id" : "annotation_extension_class_closure",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Extension class for the annotation.",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "type" : "string",
            "id" : "annotation_extension_class_closure_label",
            "property" : [],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "required" : "false"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Annotation extension",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "annotation_extension_json",
            "type" : "string",
            "description" : "Extension class for the annotation (JSON).",
            "indexed" : "true",
            "searchable" : "false"
         },
         {
            "type" : "string",
            "id" : "panther_family",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity.",
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false"
         },
         {
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "panther_family_label",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "PANTHER families that are associated with this entity."
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "X",
            "description" : "Experimental numeric type (X).",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "geospatial_x",
            "type" : "integer"
         },
         {
            "cardinality" : "multi",
            "display_name" : "Y",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "integer",
            "id" : "geospatial_y",
            "description" : "Experimental numeric type (Y).",
            "searchable" : "false",
            "indexed" : "true"
         },
         {
            "type" : "integer",
            "id" : "geospatial_z",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Experimental numeric type (Z).",
            "display_name" : "Z",
            "cardinality" : "multi",
            "required" : "false"
         }
      ],
      "fields_hash" : {
         "annotation_extension_class_label" : {
            "required" : "false",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "type" : "string",
            "id" : "annotation_extension_class_label",
            "property" : [],
            "transform" : []
         },
         "geospatial_z" : {
            "type" : "integer",
            "id" : "geospatial_z",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Experimental numeric type (Z).",
            "display_name" : "Z",
            "cardinality" : "multi",
            "required" : "false"
         },
         "annotation_extension_json" : {
            "cardinality" : "multi",
            "display_name" : "Annotation extension",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "id" : "annotation_extension_json",
            "type" : "string",
            "description" : "Extension class for the annotation (JSON).",
            "indexed" : "true",
            "searchable" : "false"
         },
         "evidence_closure_label" : {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "All evidence for this annotation.",
            "id" : "evidence_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "evidence" : {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Evidence.",
            "id" : "evidence",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "geospatial_x" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "X",
            "description" : "Experimental numeric type (X).",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "id" : "geospatial_x",
            "type" : "integer"
         },
         "source" : {
            "id" : "source",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Database source.",
            "display_name" : "Source",
            "cardinality" : "single",
            "required" : "false"
         },
         "panther_family_label" : {
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false",
            "type" : "string",
            "id" : "panther_family_label",
            "transform" : [],
            "property" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "PANTHER families that are associated with this entity."
         },
         "bioentity_label" : {
            "required" : "false",
            "display_name" : "Gene/product",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Gene or gene product identifiers.",
            "id" : "bioentity_label",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "taxon_subset_closure" : {
            "transform" : [],
            "property" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         "regulates_closure_label" : {
            "cardinality" : "multi",
            "display_name" : "GO class",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "regulates_closure_label",
            "description" : "Annotations for this term or its children (over regulates).",
            "indexed" : "true",
            "searchable" : "true"
         },
         "evidence_subset_closure" : {
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "evidence_subset_closure",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence for this annotation reduced to a usable subset."
         },
         "id" : {
            "description" : "A unique (and internal) combination of bioentity and ontology class.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "id",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Acc"
         },
         "bioentity_isoform" : {
            "cardinality" : "single",
            "display_name" : "Isoform",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "bioentity_isoform",
            "description" : "Biological isoform.",
            "indexed" : "true",
            "searchable" : "false"
         },
         "geospatial_y" : {
            "cardinality" : "multi",
            "display_name" : "Y",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "integer",
            "id" : "geospatial_y",
            "description" : "Experimental numeric type (Y).",
            "searchable" : "false",
            "indexed" : "true"
         },
         "bioentity" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Gene or gene product identifiers.",
            "type" : "string",
            "id" : "bioentity",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Gene/product",
            "cardinality" : "single"
         },
         "has_participant_closure_label" : {
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "has_participant_closure_label",
            "description" : "Closure of labels over has_participant.",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Has participant",
            "required" : "false"
         },
         "isa_partof_closure" : {
            "type" : "string",
            "id" : "isa_partof_closure",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Annotations for this term or its children (over is_a/part_of).",
            "display_name" : "Involved in",
            "cardinality" : "multi",
            "required" : "false"
         },
         "synonym" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Synonym",
            "description" : "Gene or gene product synonyms.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "synonym"
         },
         "taxon_closure" : {
            "description" : "Taxonomic group and ancestral groups.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "taxon_closure",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         },
         "taxon_closure_label" : {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "id" : "taxon_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups."
         },
         "evidence_label" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Evidence",
            "description" : "Evidence.",
            "indexed" : "true",
            "searchable" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "evidence_label"
         },
         "type" : {
            "display_name" : "Type class id",
            "cardinality" : "single",
            "required" : "false",
            "id" : "type",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Type class."
         },
         "annotation_class" : {
            "type" : "string",
            "id" : "annotation_class",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Direct annotations.",
            "display_name" : "GO class (direct)",
            "cardinality" : "single",
            "required" : "false"
         },
         "secondary_taxon_closure" : {
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Secondary taxon closure.",
            "id" : "secondary_taxon_closure",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "date" : {
            "id" : "date",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Date of assignment.",
            "display_name" : "Date",
            "cardinality" : "single",
            "required" : "false"
         },
         "panther_family" : {
            "type" : "string",
            "id" : "panther_family",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "PANTHER families that are associated with this entity.",
            "display_name" : "PANTHER family",
            "cardinality" : "single",
            "required" : "false"
         },
         "bioentity_internal_id" : {
            "id" : "bioentity_internal_id",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "searchable" : "false",
            "indexed" : "false",
            "description" : "The bioentity ID used at the database of origin.",
            "display_name" : "This should not be displayed",
            "cardinality" : "single",
            "required" : "false"
         },
         "annotation_extension_class_closure" : {
            "type" : "string",
            "id" : "annotation_extension_class_closure",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Extension class for the annotation.",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "required" : "false"
         },
         "evidence_type_closure" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence (evidence closure) for this annotation. (legacy)",
            "id" : "evidence_type_closure",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Evidence type",
            "cardinality" : "multi"
         },
         "evidence_closure" : {
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "All evidence for this annotation.",
            "id" : "evidence_closure",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "assigned_by" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Contributor",
            "description" : "Annotations assigned by group.",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "assigned_by",
            "type" : "string"
         },
         "evidence_subset_closure_label" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "All evidence for this annotation reduced to a usable subset.",
            "type" : "string",
            "id" : "evidence_subset_closure_label",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Evidence",
            "cardinality" : "multi"
         },
         "secondary_taxon_closure_label" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Secondary taxon closure.",
            "id" : "secondary_taxon_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "multi"
         },
         "evidence_type" : {
            "transform" : [],
            "property" : [],
            "id" : "evidence_type",
            "type" : "string",
            "description" : "Evidence type. (legacy)",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Evidence",
            "required" : "false"
         },
         "evidence_with" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Evidence with/from.",
            "id" : "evidence_with",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Evidence with",
            "cardinality" : "multi"
         },
         "isa_partof_closure_label" : {
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Annotations for this term or its children (over is_a/part_of).",
            "id" : "isa_partof_closure_label",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Involved in",
            "cardinality" : "multi"
         },
         "taxon_subset_closure_label" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "true",
            "indexed" : "true",
            "cardinality" : "multi",
            "display_name" : "Organism",
            "required" : "false"
         },
         "has_participant_closure" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Closure of ids/accs over has_participant.",
            "type" : "string",
            "id" : "has_participant_closure",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Has participant (IDs)",
            "cardinality" : "multi"
         },
         "taxon_label" : {
            "type" : "string",
            "id" : "taxon_label",
            "property" : [],
            "transform" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "display_name" : "Organism",
            "cardinality" : "single",
            "required" : "false"
         },
         "secondary_taxon_label" : {
            "required" : "false",
            "display_name" : "Secondary taxon",
            "cardinality" : "single",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Secondary taxon.",
            "type" : "string",
            "id" : "secondary_taxon_label",
            "transform" : [],
            "property" : []
         },
         "annotation_extension_class" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "id" : "annotation_extension_class",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Annotation extension",
            "cardinality" : "multi"
         },
         "is_redundant_for" : {
            "display_name" : "Redundant for",
            "cardinality" : "single",
            "required" : "false",
            "id" : "is_redundant_for",
            "type" : "string",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Rational for redundancy of annotation."
         },
         "annotation_class_label" : {
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "annotation_class_label",
            "description" : "Direct annotations.",
            "indexed" : "true",
            "searchable" : "true",
            "cardinality" : "single",
            "display_name" : "GO class (direct)",
            "required" : "false"
         },
         "aspect" : {
            "property" : [],
            "transform" : [],
            "id" : "aspect",
            "type" : "string",
            "description" : "Ontology aspect.",
            "searchable" : "false",
            "indexed" : "true",
            "cardinality" : "single",
            "display_name" : "Ontology (aspect)",
            "required" : "false"
         },
         "taxon" : {
            "transform" : [],
            "property" : [],
            "id" : "taxon",
            "type" : "string",
            "description" : "Taxonomic group.",
            "indexed" : "true",
            "searchable" : "false",
            "cardinality" : "single",
            "display_name" : "Organism",
            "required" : "false"
         },
         "reference" : {
            "type" : "string",
            "id" : "reference",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Database reference.",
            "display_name" : "Reference",
            "cardinality" : "multi",
            "required" : "false"
         },
         "annotation_extension_class_closure_label" : {
            "type" : "string",
            "id" : "annotation_extension_class_closure_label",
            "property" : [],
            "transform" : [],
            "searchable" : "true",
            "indexed" : "true",
            "description" : "Extension class for the annotation.",
            "display_name" : "Annotation extension",
            "cardinality" : "multi",
            "required" : "false"
         },
         "qualifier" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Annotation qualifier.",
            "type" : "string",
            "id" : "qualifier",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Annotation qualifier",
            "cardinality" : "multi"
         },
         "regulates_closure" : {
            "type" : "string",
            "id" : "regulates_closure",
            "transform" : [],
            "property" : [],
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Annotations for this term or its children (over regulates).",
            "display_name" : "GO class",
            "cardinality" : "multi",
            "required" : "false"
         },
         "secondary_taxon" : {
            "description" : "Secondary taxon.",
            "indexed" : "true",
            "searchable" : "false",
            "property" : [],
            "transform" : [],
            "type" : "string",
            "id" : "secondary_taxon",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Secondary taxon"
         },
         "bioentity_name" : {
            "cardinality" : "single",
            "display_name" : "Gene/product name",
            "required" : "false",
            "property" : [],
            "transform" : [],
            "id" : "bioentity_name",
            "type" : "string",
            "description" : "The full name of the gene or gene product.",
            "indexed" : "true",
            "searchable" : "true"
         }
      },
      "boost_weights" : "annotation_class^2.0 annotation_class_label^1.0 bioentity^2.0 bioentity_label^2.0 bioentity_name^1.0 annotation_extension_class^2.0 annotation_extension_class_label^1.0 reference^1.0 panther_family^1.0 panther_family_label^1.0 bioentity_isoform^1.0 regulates_closure^1.0 regulates_closure_label^1.0",
      "schema_generating" : "true",
      "display_name" : "Annotations",
      "result_weights" : "bioentity^7.0 bioentity_name^6.0 qualifier^5.0 annotation_class^4.7 annotation_extension_json^4.5 assigned_by^4.0 taxon^3.0 evidence_type^2.5 evidence_with^2.0 panther_family^1.5 bioentity_isoform^0.5 reference^0.25 date^0.10"
   },
   "annotation_for_browser" : {
      "schema_generating" : "false",
      "boost_weights" : "taxon_subset_closure_label^1.0 evidence_type_closure^1.0",
      "result_weights" : "taxon_subset_closure_label^9.0 evidence_type_closure^8.0",
      "display_name" : "Annotations (BROWSER)",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann-config.browse.yaml",
      "searchable_extension" : "_searchable",
      "filter_weights" : "taxon_subset_closure_label^9.0 evidence_type_closure^8.0",
      "document_category" : "annotation",
      "description" : "Special schema for certain ontology browser widget\\'s filters.",
      "weight" : "-120",
      "fields" : [
         {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group.",
            "type" : "string",
            "id" : "taxon",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single"
         },
         {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "id" : "taxon_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single"
         },
         {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "type" : "string",
            "id" : "taxon_closure",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxonomic group and ancestral groups."
         },
         {
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "id" : "taxon_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         {
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         },
         {
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         },
         {
            "description" : "Evidence type.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "evidence_type",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Evidence"
         },
         {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Evidence type",
            "description" : "All evidence (evidence closure) for this annotation",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "evidence_type_closure",
            "type" : "string"
         }
      ],
      "fields_hash" : {
         "taxon_closure_label" : {
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "multi",
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "id" : "taxon_closure_label",
            "type" : "string",
            "property" : [],
            "transform" : []
         },
         "evidence_type" : {
            "description" : "Evidence type.",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "evidence_type",
            "type" : "string",
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Evidence"
         },
         "taxon_closure" : {
            "display_name" : "Organism",
            "cardinality" : "multi",
            "required" : "false",
            "type" : "string",
            "id" : "taxon_closure",
            "transform" : [],
            "property" : [],
            "searchable" : "false",
            "indexed" : "true",
            "description" : "Taxonomic group and ancestral groups."
         },
         "taxon" : {
            "indexed" : "true",
            "searchable" : "false",
            "description" : "Taxonomic group.",
            "type" : "string",
            "id" : "taxon",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single"
         },
         "taxon_subset_closure_label" : {
            "description" : "Labels for taxonomic group (direct) and ancestral groups that are within the specified subset.",
            "searchable" : "true",
            "indexed" : "true",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "taxon_subset_closure_label",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         },
         "taxon_label" : {
            "indexed" : "true",
            "searchable" : "true",
            "description" : "Taxonomic group and ancestral groups.",
            "id" : "taxon_label",
            "type" : "string",
            "property" : [],
            "transform" : [],
            "required" : "false",
            "display_name" : "Organism",
            "cardinality" : "single"
         },
         "evidence_type_closure" : {
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Evidence type",
            "description" : "All evidence (evidence closure) for this annotation",
            "indexed" : "true",
            "searchable" : "false",
            "transform" : [],
            "property" : [],
            "id" : "evidence_type_closure",
            "type" : "string"
         },
         "taxon_subset_closure" : {
            "description" : "Taxonomic group (direct) and ancestral groups that are within the specified subset (e.g mammalia, eukaryota).",
            "searchable" : "false",
            "indexed" : "true",
            "property" : [],
            "transform" : [],
            "id" : "taxon_subset_closure",
            "type" : "string",
            "required" : "false",
            "cardinality" : "multi",
            "display_name" : "Organism"
         }
      },
      "id" : "annotation_for_browser",
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/ann-config.browse.yaml",
      "_strict" : 0
   },
   "general" : {
      "result_weights" : "entity^3.0 category^1.0",
      "display_name" : "General",
      "boost_weights" : "entity^3.0 entity_label^3.0 general_blob^3.0",
      "schema_generating" : "true",
      "_infile" : "/home/jnguyenxuan/workspace/amigo/metadata/general-config.yaml",
      "_strict" : 0,
      "fields_hash" : {
         "id" : {
            "required" : "false",
            "display_name" : "Internal ID",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The mangled internal ID for this entity.",
            "type" : "string",
            "id" : "id",
            "property" : [],
            "transform" : []
         },
         "general_blob" : {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Generic blob",
            "description" : "A hidden searchable blob document to access this item. It should contain all the goodies that we want to search for, like species(?), synonyms, etc.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "general_blob",
            "type" : "string"
         },
         "entity" : {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The ID/label for this entity.",
            "type" : "string",
            "id" : "entity",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Entity",
            "cardinality" : "single"
         },
         "category" : {
            "required" : "false",
            "display_name" : "Document category",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The document category that this enitity belongs to.",
            "id" : "category",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         "entity_label" : {
            "cardinality" : "single",
            "display_name" : "Enity label",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "entity_label",
            "description" : "The label for this entity.",
            "searchable" : "true",
            "indexed" : "true"
         }
      },
      "fields" : [
         {
            "required" : "false",
            "display_name" : "Internal ID",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The mangled internal ID for this entity.",
            "type" : "string",
            "id" : "id",
            "property" : [],
            "transform" : []
         },
         {
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The ID/label for this entity.",
            "type" : "string",
            "id" : "entity",
            "transform" : [],
            "property" : [],
            "required" : "false",
            "display_name" : "Entity",
            "cardinality" : "single"
         },
         {
            "cardinality" : "single",
            "display_name" : "Enity label",
            "required" : "false",
            "transform" : [],
            "property" : [],
            "type" : "string",
            "id" : "entity_label",
            "description" : "The label for this entity.",
            "searchable" : "true",
            "indexed" : "true"
         },
         {
            "required" : "false",
            "display_name" : "Document category",
            "cardinality" : "single",
            "searchable" : "false",
            "indexed" : "true",
            "description" : "The document category that this enitity belongs to.",
            "id" : "category",
            "type" : "string",
            "transform" : [],
            "property" : []
         },
         {
            "required" : "false",
            "cardinality" : "single",
            "display_name" : "Generic blob",
            "description" : "A hidden searchable blob document to access this item. It should contain all the goodies that we want to search for, like species(?), synonyms, etc.",
            "indexed" : "true",
            "searchable" : "true",
            "property" : [],
            "transform" : [],
            "id" : "general_blob",
            "type" : "string"
         }
      ],
      "id" : "general",
      "description" : "A generic search document to get a general overview of everything.",
      "weight" : "0",
      "_outfile" : "/home/jnguyenxuan/workspace/amigo/metadata/general-config.yaml",
      "filter_weights" : "category^4.0",
      "document_category" : "general",
      "searchable_extension" : "_searchable"
   }
};
