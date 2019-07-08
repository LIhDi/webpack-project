const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');

let plugins= [];
// Process é uma variavel acessada por qualquer modulo do nodeJs que me da acesso ao processo do node.
// E esse processo me da acesso a variavel env que me permite acessar as variaveis de ambiente.

if(process.env.NODE_ENV == 'production') {
    plugins.push(new babiliPlugin());
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
            }
        ]
    },
    plugins
}