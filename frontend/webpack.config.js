var path = require('path');
var webpack = require('webpack');   // for django-webpack
var BundleTracker = require('webpack-bundle-tracker');     // for django-webpack
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')


var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'privacy_app-[hash].js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({use: ['vue-style-loader', 'css-loader']}),
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers'),
                                indentedSyntax: true // optional
                            },
                        },
                    }
                ]
            },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.png$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new ExtractTextPlugin('privacy_styles-[hash].css'),
        new BundleTracker({filename: './webpack-stats.json'}),
    ]
};
