const g = require('./geometry')
const r = require('raylib')
const p = require('./particles')

const getBulletDetails = function () {
    const bullets = {
        currentBullets: [],
        radius: 3,

        pallete: {
            lightBlueGlowCenter: { r: 100, g: 181, b: 246, a: 150 },
            lightBlueGlowSide: { r: 100, g: 181, b: 246, a: 0 },
            lightBlueGlowMain: { r: 100, g: 181, b: 246, a: 255 },
        }
    }
    return bullets;
}

const draw = function (bullets) {
    for (const bullet of bullets) {
        const { pallete: { lightBlueGlowCenter, lightBlueGlowMain, lightBlueGlowSide } } = getBulletDetails();
        const { x, y } = bullet.origin;
        r.DrawCircleGradient(x, y, 5, lightBlueGlowCenter, lightBlueGlowSide)
        r.DrawCircle(x, y, 3, lightBlueGlowMain);
    }
}

const move = function (enemies, bullets, particles) {
    for (let i = 0; i < bullets.length; i++) {
        const { destination, origin } = bullets[i];
        if (g.moveToDestination(destination, origin, 15)) {
            bullets.splice(i, 1);
        }
    }
    isEnemyShooted(enemies, bullets, particles);

}

const getClosestEnemy = function (player, enemies) {
    let closestDistance = Infinity;
    let closestEnemy;

    for (const enemy of enemies) {
        const { distance } = g.getDistance(enemy.position, player.position);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestEnemy = enemy;
        }
    }
    return closestEnemy;
}

const fire = function (player, enemies, bullets) {
    const closestEnemy = getClosestEnemy(player, enemies, bullets);
    if (!closestEnemy) return;
    bullets.push({ destination: { ...closestEnemy.position }, origin: { ...player.position } });
}

const isEnemyShooted = function (enemies, bullets, particles) {
    for (let i = 0; i < bullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (g.checkCollision({ position: bullets[i].origin, radius: 3 }, enemies[j])) {
                p.createMultipleParticles(bullets[i].origin, particles);
                bullets.splice(i, 1);
                enemies.splice(j, 1);
                break;
            }
        }
    }
}

module.exports = {
    fire,
    getBulletDetails,
    move,
    draw,
    isEnemyShooted,
}

