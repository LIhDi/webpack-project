const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins= [];
// Process é uma variavel acessada por qualquer modulo do nodeJs que me da acesso ao processo do node.
// E esse processo me da acesso a variavel env que me permite acessar as variaveis de ambiente.

// Vamos usar tanto em produção como em desenvolvimento
plugins.push(
    new extractTextPlugin("styles.css"))

plugins.push(new HtmlWebpackPlugin({
    hash: true,
    minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
    },
    filename: 'index.html',
    template: __dirname + '/main.html'
}))

plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        // Vamos dar uma identificação para ele
        name: 'vendor',
        // E toda bibliotecas de terceiros irá ficar em
        filename: 'vendor.bundle.js'
}))

plugins.push(
    new webpack.ProvidePlugin({
            // O $ diz que vai estar disponivel para todos os modulos e passa o caminho e outro com o nome JQuery e passa o caminho
           '$': 'jquery/dist/jquery.js',
           'jQuery': 'jquery/dist/jquery.js'
    })
)

// Vamos minificar os arquivos apenas em prod
if (process.env.NODE_ENV == 'production') {


    plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    plugins.push(new babiliPlugin());

    plugins.push(new optimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
            discardComments: {
                removeAll: true
            }
        },
        canPrint: true
     }));
}

module.exports = {
    entry: {
        app: './app-src/app.js',
        // Mesmo nome do identificador do plugins
        vendor: ['jquery', 'bootstrap', 'reflect-metadata']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // Antes do webpack criar o bundle ele vai carregar o loader
        // Cada regra é representada por um objeto javascript, varias regras para carregar varios loaders
        rules: [
            {   // Passamos uma expressao regular para falar quais arquivos que ela tem que considerar quando o webpack for trabalhar
                test: /\.js$/,
                // Nao queremos processar os arquivos da node_modules
                exclude: /node_modules/,
                // Vamos dizer qual loader ele vai usar
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins
}