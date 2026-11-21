const r = require('raylib');

const getPlayerDetails = function ({ WIDTH, HEIGHT }) {
    const player = {
        radius: 15,
        position: { x: WIDTH / 2, y: HEIGHT / 2 },
        speed: 12,
    }
    return player;
}

const draw = function (player) {
    const playerPosition = player.position;
    r.DrawCircle(playerPosition.x, playerPosition.y, player.radius, r.SKYBLUE);
}


module.exports = {
    getPlayerDetails,
    draw,
}