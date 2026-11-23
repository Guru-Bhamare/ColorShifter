const g = require('./geometry');
const r = require('raylib');

const getX = function (originX, radius, angle) {
    return originX + radius * Math.cos(g.degreeToRadient(angle))
}

const getY = function (originY, radius, angle) {
    return originY + radius * Math.sin(g.degreeToRadient(angle))
}

const createSinglePartile = function (bullet) {
    const angle = Math.random() * 360;
    const radius = Math.random() * 70;

    const speed = Math.ceil(Math.random() * 5);
    const position = { ...bullet };
    const { x, y } = position;


    const destination = { x: getX(x, radius, angle), y: getY(y, radius, angle) }
    return {
        angle, radius, speed, position, destination
    }
}

const createMultipleParticles = function (bullet, particles) {
    for (let i = 0; i < 100; i++) {
        particles.push(createSinglePartile(bullet, particles));
    }
}

const draw = function (particles) {

    const p = {
        redGlowCenter: { r: 226, g: 75, b: 74, a: 150 },
        redGlowSide: { r: 226, g: 75, b: 74, a: 0 },
        redGlowMain: { r: 226, g: 75, b: 74, a: 255 },
    }

    for (const particle of particles) {
        const { position: { x, y } } = particle;
        r.DrawCircleGradient(x, y, 5, p.redGlowCenter, p.redGlowSide);
        r.DrawCircle(x, y, 3, p.redGlowMain);
    }
}

const move = function (particles) {
    for (let i = 0; i < particles.length; i++) {
        if (g.moveToDestination(particles[i].destination, particles[i].position, particles[i].speed)) {
            particles.splice(i, 1);
        }
    }
}

module.exports = {
    createMultipleParticles,
    move,
    draw,
}