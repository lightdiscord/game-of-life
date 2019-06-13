import { Application, Container, Sprite } from "pixi.js";
import { createTextures, TILE_WIDTH } from "./textures";

export const initializeRender = ({ options, ecosystem, wasm }) => {
    const application = new Application(options.pixi);
    const textures = createTextures(application);
    const camera = new Container();

    application.view.width = TILE_WIDTH * options.width;
    application.view.height = TILE_WIDTH * options.height;
    application.stage.addChild(camera);

    const grid = [];

    for (let y = 0; y < options.height; y++) {
        const line = [];

        for (let x = 0; x < options.width; x++) {
            const idx = wasm.Index.new_with_coords_and_width(x, y, options.width);
            const alive = ecosystem.is_alive(idx);
            const sprite = new Sprite(alive ? textures.alive : textures.dead);

            sprite.x = x * TILE_WIDTH;
            sprite.y = y * TILE_WIDTH;
            sprite.interactive = true;

            sprite.on('pointerdown', () => {
                const alive = ecosystem.toggle(idx);
                sprite.texture = alive ? textures.alive : textures.dead;
            });

            camera.addChild(sprite);
            line.push(sprite);
        }

        grid.push(line);
    }

    const tick = () => {
        for (let y = 0; y < options.height; y++) {
            for (let x = 0; x < options.width; x++) {
                const idx = wasm.Index.new_with_coords_and_width(x, y, options.width);
                const alive = ecosystem.is_alive(idx);

                grid[y][x].texture = alive ? textures.alive : textures.dead;
            }
        }
    }

    return { application, tick };
}
