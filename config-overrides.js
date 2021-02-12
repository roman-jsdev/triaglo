const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@containers": "src/containers/",
    "@hooks": "src/hooks",
    "@pages": "src/pages",
    "@store": "src/store",
    "@src": "src/",
  })(config);

  return config
}
