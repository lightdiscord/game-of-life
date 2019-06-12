<script>
    import { onMount } from 'svelte';
    import { createInstance } from '@game-of-life/game';

    let canvas;

    onMount(() => {
        const instance = createInstance({
            width: 20,
            height: 10,
            pixi: {
                view: canvas,
                backgroundColor: 0xFFFF00
            }
        });

        return () => {};
    })
</script>

<h1>Hello, world!</h1>
<canvas bind:this={canvas}></canvas>

<style>
    h1 {
        text-decoration: underline;
    }
</style>
