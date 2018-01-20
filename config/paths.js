

var path = require('path');

// True after ejecting, false when used as a dependency
var isEjected = (
  path.resolve(path.join(__dirname, '..')) ===
  path.resolve(process.cwd())
);

// Are we developing create-react-app locally?
var isInDialwordBoilerAppSource = (
  process.argv.some(arg => arg.indexOf('--debug-template') > -1)
);

function resolveOwn(relativePath) {
  return path.resolve(__dirname, relativePath);
}

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

if (isInDialwordBoilerAppSource) {
  // create-react-app development: we're in ./config/
  module.exports = {
    appBuild: resolveOwn('../build'),
    appHtml: resolveOwn('../template/index.html'),
    appPackageJson: resolveOwn('../package.json'),
    appSrc: resolveOwn('../template/src'),
    appNodeModules: resolveOwn('../node_modules'),
    ownNodeModules: resolveOwn('../node_modules')
  };
} else if (!isEjected) {
  // before eject: we're in ./node_modules/react-scripts/config/
  module.exports = {
    appBuild: resolveApp('build'),
    appHtml: resolveApp('index.html'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    // this is empty with npm3 but node resolution searches higher anyway:
    ownNodeModules: resolveOwn('../node_modules')
  };
} else {
  // after eject: we're in ./config/
  module.exports = {
    appBuild: resolveApp('build'),
    appHtml: resolveApp('index.html'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveApp('node_modules')
  };
}
