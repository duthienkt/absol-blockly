const path = require('path');


module.exports = {
    // mode: process.env.MODE || "development",
    entry: [ "./dev.js"],
    output: {
        path: path.join(__dirname, "."),
        filename: "./dist/absol-blockly.js"
    },
    resolve: {
        modules: [
            path.join(__dirname, './node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: [['@babel/preset-env', { modules: false }]] }
            },
            {
                test: /\.(tpl|txt|xml|rels|svg)$/i,
                use: 'raw-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
		minimize: false
	},
    devServer: {
        compress: true,
        disableHostCheck: true,
        host: '0.0.0.0'
    },
    performance: {
        hints: false
    }
};