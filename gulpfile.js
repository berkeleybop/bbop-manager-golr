////
//// Usage: ./node_modules/.bin/gulp build, clean, test, etc.
////

var gulp = require('gulp');
//var jsdoc = require('gulp-jsdoc');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var git = require('gulp-git');
var bump = require('gulp-bump');
var del = require('del');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');

var paths = {
  'readme': ['./README.md'],
  'tests': ['tests/*.test.js', 'tests/*.tests.js'],
  'docable': ['lib/*.js', './README.md'],
  'transients': ['./doc/*', '!./doc/README.md'],
  // Heavier testing framework variables.
  'tests-functional-data': ['tests-functional/*.test.js'],
  'tests-functional': ['tests-functional/*.test.js'],
  'ontologies-go': [
    '_data/ontologies/go-gaf.owl',
    '_data/ontologies/eco.owl',
    '_data/ontologies/go-taxon-subsets.owl',
    '_data/ontologies/neurogenesis.obo'
  ],
  'gafs-go': [
    // '_data/gafs/gene_association.fb.gz',
    // '_data/gafs/goa_human.gaf.gz'
    '_data/gafs/test_001_p53.gaf'
  ],
  'metadata-go': '_data/metadata/ont-config.yaml'
};

// Browser runtime environment construction.
gulp.task('build', ['patch-bump', 'doc']);

gulp.task('patch-bump', function(cb) {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'patch'
    }))
    .pipe(gulp.dest('./'));
  cb(null);
});

gulp.task('minor-bump', function(cb) {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'minor'
    }))
    .pipe(gulp.dest('./'));
  cb(null);
});

gulp.task('major-bump', function(cb) {
  gulp.src('./package.json')
    .pipe(bump({
      type: 'major'
    }))
    .pipe(gulp.dest('./'));
  cb(null);
});

// Build docs directory with JSDoc.
//gulp.task('doc', ['md-to-org', 'jsdoc']);
gulp.task('doc', ['jsdoc']);

// Build docs directory with JSDoc.
// Completely dependent on clean before running doc.
// gulp.task('jsdoc', ['clean'], function(cb) {
//     gulp.src(paths.docable, paths.readme)
//         .pipe(jsdoc('./doc'));
//     cb(null);
// });
// TODO: Ugh--do this manually until gulp-jsdoc gets its act together.
gulp.task('jsdoc', ['clean'], function(cb) {
  gulp.src('')
    .pipe(shell([
      './node_modules/.bin/jsdoc --verbose --template ./node_modules/jsdoc-baseline --readme ./README.md --destination ./doc/ ./lib/*.js'
    ]));
  cb(null);
});

// Get rid of anything that is transient.
gulp.task('clean', function(cb) {
  del(paths.transients);
  cb(null);
});

// Testing with mocha/chai.
gulp.task('test', function() {
  return gulp.src(paths.tests, {
    read: false
  }).pipe(mocha({
    reporter: 'spec',
    globals: {
      // Use a different should.
      should: require('chai').should()
    }
  }));
});

//gulp.task('release', ['build', 'publish-npm', 'git-commit', 'git-tag']);
gulp.task('release', ['build', 'publish-npm']);

// Needs to have ""
gulp.task('publish-npm', function() {
  var npm = require("npm");
  npm.load(function(er, npm) {
    // NPM
    npm.commands.publish();
  });
});

gulp.task('git-commit', function() {
  console.log('TODO: WORK IN PROGRESS');
  // Make a note in the git repo.
  var pkg = require('./package.json');
  var pver = pkg.version;
  gulp.src('./*')
    .pipe(git.commit('Package/version tracking for go-exp/widget: ' + pver));
});

gulp.task('git-tag', function() {
  console.log('TODO: WORK IN PROGRESS');
  // Make a note in the git repo.
  var pkg = require('./package.json');
  var pver = pkg.version;
  git.tag('go-exp-widget-' + pver, 'version message', function(err) {
    if (err) {
      throw err;
    }
  });
});

// Rerun doc build when a file changes.
gulp.task('watch-doc', function() {
  gulp.watch(paths.docable, ['doc']);
  gulp.watch(paths.readme, ['doc']);
});

// Rerun doc build when a file changes.
gulp.task('watch-test', function() {
  gulp.watch(paths.docable, ['test']);
  gulp.watch(paths.tests, ['test']);
});

// The default task (called when you run `gulp` from cli)
//gulp.task('default', ['watch', 'scripts', 'images']);
gulp.task('default', function() {
  console.log("'allo 'allo!");
});

///
/// Experimental results-based testing.
///

// Local Solr settings.
var golr_url = 'http://localhost:8983/solr/amigo';
var golr_load_logfile = '/tmp/golr-load.log';

var owltools_max_memory = '4G';
var owltools_runner = 'java -Xms1024M -DentityExpansionLimit=4086000 -Djava.awt.headless=true -Xmx' + owltools_max_memory + ' -jar ./java/lib/owltools-runner-all.jar';

// The OWLTools options are a little harder, and variable with the
// load we're attempting.
// AmiGO's OWLTOOLS_USE_MERGE_IMPORT/
var otu_mrg_imp_p = false;
// AmiGO's OWLTOOLS_USE_REMOVE_DISJOINTS.
var otu_rm_dis_p = false;
var all_owltools_ops_flags_list = [
  '--merge-support-ontologies',
  (otu_mrg_imp_p ? '--merge-import http://purl.obolibrary.org/obo/go/extensions/go-plus.owl' : ''),
  '--remove-subset-entities upperlevel',
  (otu_rm_dis_p ? '--remove-disjoints' : ''),
  '--silence-elk --reasoner elk',
  '--solr-taxon-subset-name amigo_grouping_subset',
  '--solr-eco-subset-name go_groupings'
];
var owltools_ops_flags =
  all_owltools_ops_flags_list.join(' ').replace(/ +/g, ' ');

function _run_cmd(command_bits) {
  var final_command = command_bits.join(' ');
  return ['echo \'' + final_command + '\'', final_command];
}

gulp.task('golr-purge', shell.task(_run_cmd(
  [owltools_runner,
    '--solr-url ', golr_url,
    '--solr-purge'
  ]
)));

gulp.task('load-ontology-go', shell.task(_run_cmd(
  [owltools_runner,
    paths['ontologies-go'].join(' '),
    owltools_ops_flags,
    '--solr-url', golr_url,
    '--solr-config', paths['metadata-go'],
    '--solr-log', golr_load_logfile,
    '--solr-load-ontology',
    '--solr-load-ontology-general'
  ]
)));

gulp.task('load-gafs-go', shell.task(_run_cmd(
  [owltools_runner,
    paths['ontologies-go'].join(' '),
    owltools_ops_flags,
    '--solr-url', golr_url,
    '--solr-log', golr_load_logfile,
    '--solr-load-gafs', paths['gafs-go'].join(' ')
  ]
)));

// Combined "safe" single step.
gulp.task('load-go-safe', shell.task(_run_cmd(
  [owltools_runner,
    paths['ontologies-go'].join(' '),
    owltools_ops_flags,
    //'--ontology-pre-check', // are local, no need to check
    '--solr-url', golr_url,
    '--solr-config', paths['metadata-go'],
    '--solr-log', golr_load_logfile,
    '--solr-purge',
    //'--solr-load-ontology',
    //'--solr-load-ontology-general'
    '--solr-load-gafs', paths['gafs-go'].join(' ')
  ]
)));

// Functional tests for Amigo and Monarch.
gulp.task('test-functional', function(callback) {
  runSequence(
    'start-solr',
    'load-go-safe',
    'load-ontology-go',
    'test-functional-run-test-only',
    'stop-solr',
    function(error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('Success!');
      }
      callback(error);
    });
});

gulp.task('test-functional-run-test-only', function() {
  return gulp.src(paths['tests-functional'], {
    read: false
  }).pipe(mocha({
    reporter: 'spec',
    globals: {
      // Use a different should.
      should: require('chai').should()
    }
  }));
});

// Starts solr server on port 8983
gulp.task('start-solr',
  shell.task(_run_cmd(
    ['solr/bin/solr start -m 4g']
  )));

// Stops solr server
gulp.task('stop-solr',
  shell.task(_run_cmd(
    ['solr/bin/solr stop']
  )));
