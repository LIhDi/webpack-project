const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

let plugins= [];
// Process é uma variavel acessada por qualquer modulo do nodeJs que me da acesso ao processo do node.
// E esse processo me da acesso a variavel env que me permite acessar as variaveis de ambiente.

// Vamos usar tanto em produção como em desenvolvimento
plugins.push(
    new extractTextPlugin("styles.css"))

// Vamos minificar os arquivos apenas em prod
if (process.env.NODE_ENV == 'production') {

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
    entry: './app-src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
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