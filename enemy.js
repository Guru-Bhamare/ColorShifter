const g = require('./geometry')
const r = require('raylib')

const degreeToRadient = function (degree) {
    return degree * Math.PI / 180;
}

const getEnemyDetails = function ({ WIDTH, HEIGHT }) {
    const radius = Math.sqrt(g.square(WIDTH) + g.square(HEIGHT));
    const randomDegree = Math.random() * 360;

    const position = {
        x: radius * Math.cos(degreeToRadient(randomDegree)),
        y: radius * Math.sin(degreeToRadient(randomDegree)),
    }

    const enemy = {
        radius: 7,
        position,
        speed: 3,
    }

    return enemy;
}

const getEnemies = function (screen) {
    const enemies = [];
    for (let i = 0; i < 10; i++) {
        enemies.push(getEnemyDetails(screen));
    }
    return enemies;
}

const draw = function (enemies) {
    for (const enemy of enemies) {
        const enemyPosition = enemy.position;
        r.DrawCircle(enemyPosition.x, enemyPosition.y, enemy.radius, r.RED);
    }
}

module.exports = {
    getEnemyDetails,
    getEnemies,
    draw,
}       