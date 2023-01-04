testTask('FileList', function () {
  this.testFiles.include('test/filelist.js');
});

publishTask('FileList', function () {
  this.packageFiles.include([
  'jakefile.js',
  'README.md',
  'package.json',
  'index.js',
  'index.d.ts'
  ]);
});


