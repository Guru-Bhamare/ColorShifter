const r = require('raylib');
const g = require('./geometry');
const p = require('./player');
const e = require('./enemy');
const b = require('./bullet');
const pr = require('./particles')

const setup = function () {

    const screen = {
        WIDTH: 1920,
        HEIGHT: 1080,
        FPS: 60,
        Title: "Color Shifter",
    }

    const playerConfig = p.getPlayerDetails(screen);
    const enemies = e.getEnemies(screen, 20);
    const bulletConfig = b.getBulletDetails();
    const particles = [];

    const game = {
        timer: 0
    }

    const pallete = {
        bg: { r: 14, g: 16, b: 32, a: 255 },
    }

    r.SetTraceLogLevel(r.LOG_NONE);
    r.SetConfigFlags(r.FLAG_WINDOW_HIGHDPI);
    r.InitWindow(screen.WIDTH, screen.HEIGHT, screen.Title);
    r.SetMousePosition(screen.WIDTH / 2, screen.HEIGHT / 2);
    r.SetTargetFPS(screen.FPS);

    return { screen, player: playerConfig, enemies, bullets: bulletConfig, game, pallete, particles };
}


const running = function () {
    return !r.WindowShouldClose();
}

const draw = function (world) {
    r.ClearBackground(world.pallete.bg);

    p.draw(world.player);
    e.draw(world.enemies);
    b.draw(world.bullets.currentBullets);
    pr.draw(world.particles);

    r.EndDrawing();
}

const update = function (world) {
    const { currentBullets } = world.bullets;

    p.move(world.player);
    e.move(world.player, world.enemies);


    if (world.game.timer === 30) {
        b.fire(world.player, world.enemies, currentBullets)
        world.game.timer = 0;
    };

    b.move(world.enemies, currentBullets, world.particles);
    world.game.timer++;

    pr.move(world.particles);
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