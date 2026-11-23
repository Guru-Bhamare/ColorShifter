const r = require('raylib');
const g = require('./geometry');

const getPlayerDetails = function ({ WIDTH, HEIGHT }) {
    const player = {
        radius: 7,
        position: { x: WIDTH / 2, y: HEIGHT / 2 },
        speed: 5,
    }
    return player;
}

const draw = function (player) {
    const { x, y } = player.position;
    r.DrawCircle(x, y, player.radius, r.WHITE);
    r.DrawCircleLines(x, y, 17, r.WHITE)

}

const move = function (player) {
    const mousePosition = r.GetMousePosition();
    g.moveToDestination(mousePosition, player.position, player.speed);
}

module.exports = {
    getPlayerDetails,
    move,
    draw,
}