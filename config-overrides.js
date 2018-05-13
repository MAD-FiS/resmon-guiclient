const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = {
    webpack: (config, env) => {
        console.log(config.module);
        config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
        config = rewireLess.withLoaderOptions({
            modifyVars: { "@primary-color": "#1DA57A" },
        })(config, env);
        console.log('LOADED!!!!');
        return config;
    }
};
