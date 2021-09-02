const path = require('path');

module.exports = {
    entry: './assets/scripts/app.js',
    output: {
        filename: 'app.min.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
};
