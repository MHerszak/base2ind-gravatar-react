Package.describe({
  name: 'browserstudios:gravatar-react',
  version: '0.0.1',
  summary: 'React component for rendering a gravatar profile image.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/MHerszak/base2ind-gravatar-react.git',
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  "querystring": "0.2.0",
  "is-retina": "1.0.3",
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([

    'ecmascript',
    'react@0.14.1_1',
    'cosmos:browserify@0.9.2',
    'jparker:crypto-md5@0.1.1',

  ],['client']);

  api.addFiles([
    './client.browserify.js',
    './gravatar-react.jsx'
  ],['client']);

  api.export([
    'Gravatar'
  ],['client']);

});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('browserstudios:gravatar-react');
  api.addFiles('gravatar-react-tests.js');
});
