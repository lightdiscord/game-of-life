import Application from './App.svelte';

export const application = new Application({
    target: document.body,
});

import('@game-of-life/game');
