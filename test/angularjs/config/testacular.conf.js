basePath = '../../../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'vendor/assets/javascripts/angular.js',
  'vendor/assets/javascripts/angular-*.js',
  'vendor/assets/javascripts/moment.min.js',
  'test/angularjs/test/lib/angular/angular-mocks.js',
  'app/assets/javascripts/angularjs/*.js',
  'test/angularjs/test/unit/controllersSpec.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
