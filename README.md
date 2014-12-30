# env-config

A tool for creating a configuration object based on a set of yaml files.
Pass env-config the relative path to your configuration, and it will create
a tree of options based on yaml files and their names.

This tool also looks for a nested directory with the same name as the current
`process.env.NODE_ENV`, and will deep merge those configuration properties
into the base files, so you can explicitly overwrite only the config
options that you want on an environment by environment basis.

## usage

### yaml structure
`
  ./app
    ./config
      ./production
        app.yaml
      app.yaml
      database.yaml
`

### yaml files
```yaml
# ./app/config/app.yaml

name: 'My Config'
port: 3000
```

```yaml
# ./app/config/database.yaml

driver: mongo
port: 27017
```

```yaml
# ./app/config/production/app.yaml

port: 9000
```

### javacript
```js
// Running with NODE_ENV=production
var config = require('env-config')('path/to/config');

console.log(config);
/**
 * Yields:
 * {
 *   app: {
 *     name: 'My Config',
 *     port: 9000
 *   },
 *   database: {
 *     driver: 'mongo',
 *     port: 27017
 *   }
 * }
 */
```
