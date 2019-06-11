module.exports = (mode) => [
    require('./css')(mode),
    require('./svelte'),
    require('./javascript'),
];
