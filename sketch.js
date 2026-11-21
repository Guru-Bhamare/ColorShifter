const r = require('raylib');
const g = require('./geometry');
const p = require('./player');
const e = require('./enemy');

const setup = function () {

    const screen = {
        WIDTH: 800,
        HEIGHT: 800,
        FPS: 60,
    }

    const player = p.getPlayerDetails(screen);
    const enemies = e.getEnemies(screen);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, "Color Shifter");
    r.SetTargetFPS(screen.FPS);

    return { screen, player, enemies }
}

const running = function () {
    return !r.WindowShouldClose();
}

const draw = function (world) {
    r.ClearBackground(r.WHITE);

    p.draw(world.player);
    e.draw(world.enemies);

    r.EndDrawing();
}

const update = function (world) {

    const mousePosition = r.GetMousePosition();
    g.moveToDestination(mousePosition, world.player);

    for (const enemy of world.enemies) {
        g.moveToDestination(world.player.position, enemy);
    }
}

const tearDown = function () {
    return r.CloseWindow();
}

module.exports = {
    setup,
    running,
    draw,
    update,
    tearDown,
}           