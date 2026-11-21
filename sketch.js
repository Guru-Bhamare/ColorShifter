const r = require('raylib');
const g = require('./geometry')
const p = require('./player')

const setup = function () {

    const screen = {
        WIDTH: 800,
        HEIGHT: 800,
        FPS: 60,
    }

    const player = p.getPlayerDetails(screen);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, "");
    r.SetTargetFPS(screen.FPS);

    return { screen, player }
}

const running = function () {
    return !r.WindowShouldClose();
}

const draw = function (world) {
    const playerPosition = world.player.position;
    r.ClearBackground(r.WHITE);
    r.DrawCircle(playerPosition.x, playerPosition.y, world.player.radius, r.RED);
    r.EndDrawing();
}

const update = function (world) {
    p.movePlayer(world.player);
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