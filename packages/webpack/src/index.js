const { resolve } = require('path');
const root = resolve(__dirname, '..');

module.exports = (env, argv) => {
    const mode = argv.mode || 'production';

    return {
        entry: {
            index: [require.resolve('@game-of-life/client')],
        },

        resolve: {
            extensions: ['.mjs', '.js', '.svelte'],
        },

        output: {
            path: resolve(root, 'dist'),
            filename: '[name].[hash].js',
        },

        module: {
            rules: require('./rules')(mode),
        },

        plugins: [
            new (require('clean-webpack-plugin').CleanWebpackPlugin),

            new (require('html-webpack-plugin'))({
                template: require.resolve('@game-of-life/client/src/index.html'),
                chunks: ['index'],
            }),

            new (require('mini-css-extract-plugin'))({
                filename: '[name].[hash].css',
            }),
        ],
    };
};
