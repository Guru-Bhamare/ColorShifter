const r = require('raylib')

const getPlayerDetails = function ({ WIDTH, HEIGHT }) {

    const player = {
        radius: 10,
        position: { x: WIDTH / 2, y: HEIGHT / 2 },
        speed: 3,
    }

    return player;
}

const movePlayer = function (player) {
    const mousePosition = r.GetMousePosition();

    const dx = mousePosition.x - player.position.x;
    const dy = mousePosition.y - player.position.y

    const distance = Math.sqrt(dx * dx + dy * dy);

    const directionX = dx / distance;
    const directionY = dy / distance;

    if (Math.round(distance) <= player.speed) {
        player.position = mousePosition;
        return;
    }

    player.position.x += directionX * player.speed;
    player.position.y += directionY * player.speed;
}

module.exports = {
    getPlayerDetails,
    movePlayer,
}