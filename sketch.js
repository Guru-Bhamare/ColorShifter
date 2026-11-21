const r = require('raylib');

const setup = function () {

    const screen = {
        WIDTH: 800,
        HEIGHT: 800,
        FPS: 60,
    }

    const player = {
        radius: 10,
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, "");
    r.SetTargetFPS(screen.FPS);

    return { screen, player }
}

const running = function () {
    return !r.WindowShouldClose();
}

const draw = function (world) {
    const screen = world.screen;
    const player = world.player;

    r.ClearBackground(r.WHITE);
    r.DrawCircle(screen.WIDTH / 2, screen.HEIGHT / 2, player.radius, r.RED);
    r.EndDrawing();
}

const update = function () { }

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