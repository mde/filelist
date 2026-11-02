var FileList = require('../index').FileList
  , fs = require("fs")
  , assert = require("assert")
  , tests;

tests = {

  'beforeEach': function () {
    jake.mkdirP("./test/tmp/one/two/three");
    jake.mkdirP("./test/tmp/one/exclude");

    fs.writeFileSync("./test/tmp/one/two/three/file.txt", "hello");
    fs.writeFileSync("./test/tmp/one/exclude/file.txt", "world");

    fs.writeFileSync("./test/tmp/foo.json", "{}")
    fs.writeFileSync("./test/tmp/bar.JSON", "{}")
  }

, 'afterEach': function () {
    jake.rmRf('./test/tmp/one', {silent: true});
  }

, 'after': function () {
    jake.rmRf('./test/tmp', {silent:true});
  }

, 'path separator can be used by exclude': function () {
    var fileList = new FileList();
    fileList.include("test/tmp/one/**/*.txt");
    assert.equal(fileList.toArray().length, 2);
    fileList.exclude("tmp/one/exclude");
    assert.equal(fileList.toArray().length, 1);
  }

, 'returns a list of unique file entries': function () {
    var fileList = new FileList();
    fileList.include("test/tmp/one/**/*.txt");
    fileList.include("test/tmp/one/two/three/file.txt");
    assert.equal(fileList.toArray().length, 2);
  }

, 'passing options to minimatch object': function () {
    var filelist = new FileList;
    filelist.include("test/tmp/*.json", { nocase: true })
    assert.equal(filelist.toArray().length, 2)
  }

, 'matches globs with windows path separators': function () {
    var filelist = new FileList;
    filelist.include("test\\tmp\\one\\**\\*.txt");
    assert.equal(filelist.toArray().length, 2);
  }

, 'preserves brace expansion, dotfile options and exclusions': function () {
    fs.writeFileSync('test/tmp/.hidden.json', '{}');
    var filelist = new FileList();
    filelist.include('test/tmp/{foo,.hidden}.json', {dot: true});
    filelist.include('test/tmp/bar.*', {nocase: true});
    filelist.exclude('test/tmp/foo.json');
    assert.deepEqual(filelist.toArray().sort(), [
      'test/tmp/.hidden.json',
      'test/tmp/bar.JSON'
    ]);
  }

};

module.exports = tests;
