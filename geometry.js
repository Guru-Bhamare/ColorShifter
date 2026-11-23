const square = function (x) {
    return x * x;
}

const double = function (x) {
    return x * 2;
}

const getDistance = function (destination, origin) {
    const dx = (destination.x - origin.x);
    const dy = (destination.y - origin.y);
    const distance = Math.sqrt(square(dx) + square(dy));

    return { dx, dy, distance };
}

const degreeToRadient = function (degree) {
    return degree * Math.PI / 180;
}

const moveToDestination = function (destination, origin, speed) {
    const { dx, dy, distance } = getDistance(destination, origin);

    const directionX = dx / distance;
    const directionY = dy / distance;

    if (Math.round(distance) <= speed) {
        origin = destination;
        return true;
    }

    origin.x += directionX * speed;
    origin.y += directionY * speed;
    return false;
}

const checkCollision = function (circleOne, circleTwo) {
    const { distance } = getDistance(circleTwo.position, circleOne.position);

    if (distance < (circleOne.radius + circleTwo.radius)) return true;
    return false;
}

module.exports = {
    square,
    double,
    moveToDestination,
    getDistance,
    checkCollision,
    degreeToRadient
}   