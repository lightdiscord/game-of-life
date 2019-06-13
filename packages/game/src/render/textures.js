import { Graphics } from "pixi.js";

export const TILE_WIDTH = 40;

const createTile = (dead) => {
    const tile = new Graphics();
    tile.beginFill(dead ? 0xffffff : 0x000000);
    tile.lineStyle(1, dead ? 0x000000 : 0xffffff);
    tile.drawRect(0, 0, TILE_WIDTH, TILE_WIDTH);
    tile.endFill();

    return tile;
};

export const createTextures = ({ renderer }) => {
    const alive = createTile(false);
    const dead = createTile(true);

    return {
        alive: renderer.generateTexture(alive, 1, window.devicePixelRatio || 1),
        dead: renderer.generateTexture(dead, 1, window.devicePixelRatio || 1)
    };
};
