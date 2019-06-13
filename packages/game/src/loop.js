export const register = (options) => {
    let interval;

    const start = () => {
        if (interval) return;

        interval = setInterval(tick(options), 1000);
    }

    const stop = () => {
        if (!interval) return;

        clearInterval(interval);
        interval = null;
    }

    return {
        start,
        stop,
        running: () => !!interval,
        toggle: () => {
            if (interval) {
                stop();
            } else {
                start();
            }
        }
    }
}

const tick = ({ ecosystem, width, height, textures, grid, Index }) => () => {
    ecosystem.next();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const alive = ecosystem.is_alive(Index.new_with_coords_and_width(x, y, width));
            const sprite = grid[x][y];

            sprite.texture = alive ? textures.alive : textures.dead;
        }
    }
};
