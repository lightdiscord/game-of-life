module.exports = (mode) => ({
    test: /\.css$/,
    use: [
        (mode === 'production' ? require('mini-css-extract-plugin').loader : 'style-loader'),
        'css-loader'
    ],
});
