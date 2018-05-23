const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');

module.exports = {
    webpack: (config, env) => {
        config = rewireDefinePlugin(config, env, {
            'window.DEFAULT_AUTH_SERVER': JSON.stringify('http://localhost:3001'),
            'window.DEFAULT_MONITORS': JSON.stringify([
                {
                    address: 'http://localhost:3002',
                    description: 'Test server #1'
                },
                {
                    address: 'http://localhost:3003',
                    description: 'Test server #2'
                },
                {
                    address: 'http://localhost:3004',
                    description: 'Test server #3'
                }
            ])
        });
        config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
        config = rewireLess.withLoaderOptions({
            modifyVars: { "@primary-color": "#1DA57A" },
        })(config, env);
        return config;
    }
};
