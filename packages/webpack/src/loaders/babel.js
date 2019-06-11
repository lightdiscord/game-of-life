module.exports = {
    loader: 'babel-loader',
    options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-syntax-dynamic-import'],
    },
};
