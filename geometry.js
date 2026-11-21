function square(x) {
    return x * x;
}

function double(x) {
    return x * 2;
}

const moveToDestination = function (destination, origin) {

    const dx = destination.x - origin.position.x;
    const dy = destination.y - origin.position.y

    const distance = Math.sqrt(dx * dx + dy * dy);

    const directionX = dx / distance;
    const directionY = dy / distance;

    if (Math.round(distance) <= origin.speed) {
        origin.position = destination;
        return;
    }

    origin.position.x += directionX * origin.speed;
    origin.position.y += directionY * origin.speed;
}

module.exports = {
    square,
    double,
    moveToDestination,
}   