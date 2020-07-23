System.config({
  paths: {
    'npm:': '/node_modules/'
  },
  map: {
    app: 'dist/app',
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'core-js': 'npm:core-js',
    'zone.js': 'npm:zone.js',
    'rxjs': 'npm:rxjs',
    'tslib': 'npm:tslib/tslib.js',
    'nouislider': 'node_modules/nouislider',
    'ng2-nouislider': 'node_modules/ng2-nouislider'
  },
  packages: {
    'dist/app': {},
    'rxjs': {},
    'core-js': {},
    'zone.js': {},
    'node_modules/ng2-slider-component': {
      main: 'ng2-slider.component.system.js',
      defaultExtension: 'system.js',
      'nouislider': { main: 'distribute/nouislider.js', defaultExtension: 'js' },
'ng2-nouislider': { main: 'src/nouislider.js', defaultExtension: 'js' }
},
  }
});
