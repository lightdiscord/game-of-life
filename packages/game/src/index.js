import { initializeRender } from './render';
import { writable, get } from 'svelte/store';

export const bindings = import('../pkg');

export const createInstance = ({ width, height, pixi = {}, alives = new Uint32Array(0) }) => bindings.then((wasm) => {
    const ecosystem = wasm.Ecosystem.new(width, height, alives);
    const render = initializeRender({
        options: { width, height, pixi },
        ecosystem,
        wasm
    });


    const interval = Symbol();

    const control = {
        [interval]: null,
        running: writable(false),

        start() {
            if (this[interval] !== null) return;

            this.running.set(true);
            this[interval] = setInterval(() => {
                ecosystem.next();
                render.tick();
            }, 1000)
        },

        stop() {
            if (this[interval] === null) return;

            clearInterval(this[interval]);
            this.running.set(false);
            this[interval] = null;
        },

        toggle() {
            if (get(this.running)) {
                this.stop();
            } else {
                this.start();
            }
        }
    }

    return {
        ecosystem,
        control
    };
});
