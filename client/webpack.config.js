const path = require('path');

module.exports = {
    entry: './app-src/app.js',
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
            }
        ]
    }
}