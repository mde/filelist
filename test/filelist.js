const { FileList } = require('../index.js')
const fs = require('fs')
const assert = require('assert')

const tests = {
  beforeEach () {
    jake.mkdirP('./test/tmp/one/two/three')
    jake.mkdirP('./test/tmp/one/exclude')

    fs.writeFileSync('./test/tmp/one/two/three/file.txt', 'hello')
    fs.writeFileSync('./test/tmp/one/exclude/file.txt', 'world')

    fs.writeFileSync('./test/tmp/foo.json', '{}')
    fs.writeFileSync('./test/tmp/bar.JSON', '{}')
  },

  afterEach () {
    jake.rmRf('./test/tmp/one', { silent: true })
  },

  after () {
    jake.rmRf('./test/tmp', { silent: true })
  },

  'path separator can be used by exclude' () {
    const fileList = new FileList()
    fileList.include('test/tmp/one/**/*.txt')
    assert.equal(fileList.toArray().length, 2)
    fileList.exclude('tmp/one/exclude')
    assert.equal(fileList.toArray().length, 1)
  },

  'returns a list of unique file entries' () {
    const fileList = new FileList()
    fileList.include('test/tmp/one/**/*.txt')
    fileList.include('test/tmp/one/two/three/file.txt')
    assert.equal(fileList.toArray().length, 2)
  },

  'passing options to minimatch object' () {
    const filelist = new FileList()
    filelist.include('test/tmp/*.json', { nocase: true })
    assert.equal(filelist.toArray().length, 2)
  }
}

module.exports = tests
