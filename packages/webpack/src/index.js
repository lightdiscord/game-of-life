const { resolve, dirname } = require('path');

module.exports = (env, argv) => {
    const mode = argv.mode || 'production';

    return {
        entry: {
            index: [require.resolve('@game-of-life/client')],
        },

        resolve: {
            extensions: ['.mjs', '.js', '.svelte', '.wasm'],
        },

        output: {
            path: resolve(__dirname, '..', 'dist'),
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

            // @ts-ignore
            new (require('@wasm-tool/wasm-pack-plugin'))({
                crateDirectory: resolve(dirname(require.resolve('@game-of-life/game')), '..'),
            }),
        ],
    };
};
