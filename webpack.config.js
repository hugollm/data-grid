var webpack = require('webpack');

var build = Boolean(process.env.BUILD);
var dev = !build;


var config = {
    entry: './main',
    resolve: {
        root: __dirname + '/src',
    },
    module: {
        loaders: []
    },
    target: 'electron'
};


var loaders = {
    hot: {
        test: /\.js$/,
        exclude: __dirname + '/node_modules',
        loader: 'react-hot',
    },
    babel: {
        test: /\.js$/,
        exclude: __dirname + '/node_modules',
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        },
    },
    stylesDev: {
        test: /\.s?css$/,
        exclude: __dirname + '/node_modules',
        loaders: ['style', 'css', 'sass'],
    },
    stylesBuild: {
        test: /\.s?css$/,
        exclude: __dirname + '/node_modules',
        loaders: ['style/url', 'file?name=[hash].css', 'extract', 'css', 'sass'],
    }
};


plugins = {
    nodeEnvProduction: new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': '"production"'}
    }),
    uglify: new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: true}
    }),
    dedupe: new webpack.optimize.DedupePlugin()
};


if (dev) {
    config['output'] = {path: 'static', filename: 'bundle.js'};
    config['module']['loaders'] = [loaders.hot, loaders.babel, loaders.stylesDev];
    config['devtool'] = 'source-map';
}

if (build) {
    config['output'] = {path: 'build', filename: '[hash].js'};
    config['module']['loaders'] = [loaders.babel, loaders.stylesBuild];
    config['plugins'] = [plugins.nodeEnvProduction, plugins.dedupe, plugins.uglify];
}


module.exports = config;
