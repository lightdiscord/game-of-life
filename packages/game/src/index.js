import { Application, Sprite, Container } from 'pixi.js';
import { createTextures, TILE_WIDTH } from './textures';

export const bindings = import('../pkg');

export const createInstance = ({ width, height, pixi = {}, alives = new Uint32Array(0) }) => bindings.then(({ Ecosystem, Index }) => {
    const application = new Application(pixi);
    const ecosystem = Ecosystem.new(width, height, alives);

    application.view.width = TILE_WIDTH * width;
    application.view.height = TILE_WIDTH * height;

    const textures = createTextures(application);
    const container = new Container();
    application.stage.addChild(container);

    const grid = [];

    for (let x = 0; x < width; x++) {
        const column = [];
        for (let y = 0; y < height; y++) {
            const index = Index.new_with_coords_and_width(x, y, width);
            const alive = ecosystem.is_alive(index);
            const sprite = new Sprite(alive ? textures.alive : textures.dead);

            sprite.x = x * TILE_WIDTH;
            sprite.y = y * TILE_WIDTH;

            sprite.interactive = true;
            sprite.on('pointerdown', () => {
                const alive = ecosystem.toggle(index)
                sprite.texture = alive ? textures.alive : textures.dead;
            })

            container.addChild(sprite);
            column.push(sprite);
        }
        grid.push(column);
    }

    setInterval(() => {
        ecosystem.next();

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const alive = ecosystem.is_alive(Index.new_with_coords_and_width(x, y, width));
                const sprite = grid[x][y];

                sprite.texture = alive ? textures.alive : textures.dead;
            }
        }

    }, 1000);

    return {
        ecosystem,
        application
    };
});
