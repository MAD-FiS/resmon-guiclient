const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = {
    webpack: (config, env) => {
        config = rewireDefinePlugin(config, env, {
            'window.DEFAULT_AUTH_SERVER': JSON.stringify('http://localhost:3001')
        });
        config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
        config = rewireLess.withLoaderOptions({
            modifyVars: { "@primary-color": "#1DA57A" },
        })(config, env);
        return config;
    }
};
