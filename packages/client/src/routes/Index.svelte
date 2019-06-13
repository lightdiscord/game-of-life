<script>
    import { onMount } from 'svelte';
    import { createInstance } from '@game-of-life/game';

    let canvas;
    let instance;
    let running;

    onMount(() => {
        instance = createInstance({
            width: 20,
            height: 10,
            pixi: {
                view: canvas,
                backgroundColor: 0xFFFF00
            }
        });

        instance.then(x => (running = x.control.running));

        return () => {
            // instance.then(({ control }) => control.stop());
        };
    })
</script>

<h1>Hello, world!</h1>

<div>
{#if !!instance && !!running}
    {#await instance}
        <p>Await</p>
    {:then i}
        <p>Status: {$running}</p>
        <button on:click={i.control.toggle.bind(i.control)}>Start/Stop</button>
    {:catch error}
        <p>Error {error}</p>
    {/await}
{/if}
</div>

<canvas bind:this={canvas}></canvas>

<style>
    h1 {
        text-decoration: underline;
    }
</style>
