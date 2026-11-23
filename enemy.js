const g = require('./geometry')
const r = require('raylib')

const chooseRandomXorY = function () {
    const keys = ['x', 'y'];
    return keys[Math.round((keys.length - 1) * Math.random())];
}

const getRandomXAndY = function ({ WIDTH, HEIGHT }) {

    const x = [0, WIDTH][Math.round(Math.random())];
    const y = [0, HEIGHT][Math.round(Math.random())];
    const coordinates = {
        x,
        y,
    }

    const selectedKey = chooseRandomXorY();
    console.log(selectedKey);
    console.log(WIDTH, HEIGHT)
    coordinates[selectedKey] = Math.round(Math.random() * (selectedKey === 'x' ? WIDTH : HEIGHT));

    console.log(coordinates);
    return coordinates;
}


const random = function (min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

const getRandomOutOfBound = function (axis, height, width) {
    const max = axis === "H" ? width : height;
    return Math.random() < 0.5 ? -1 : max;
}

// const getParticlePos = function (width, height) {
//     const axis = Math.random() < 0.5 ? "W" : "H"
//     const generateOnX = axis === "W"

//     const within = generateOnX ? width : height;

//     const d = random(0, within);
//     const d2 = getRandomOutOfBound(axis, height, width);

//     return { x: generateOnX ? d : d2, y: generateOnX ? d2 : d }
// }

const getEnemy = function (position) {
    const enemy = {
        radius: 7,
        outerBorderRadius: 15,
        position,
        speed: 3,

        pallete: {
            redGlowCenter: { r: 226, g: 75, b: 74, a: 150 },
            redGlowSide: { r: 226, g: 75, b: 74, a: 0 },
            redGlowMain: { r: 226, g: 75, b: 74, a: 255 },
        }
    }
    return enemy;
}

const getEnemies = function ({ WIDTH, HEIGHT }, noOfEnemies) {
    const enemies = [];
    for (let i = 0; i < noOfEnemies; i++) {
        const position = getRandomXAndY({ WIDTH, HEIGHT });
        enemies.push(getEnemy(position));
    }
    return enemies;
}

const draw = function (enemies) {
    for (const enemy of enemies) {
        const { x, y } = enemy.position;
        const { redGlowCenter, redGlowSide, redGlowMain } = enemy.pallete;
        const { radius, outerBorderRadius } = enemy;

        r.DrawCircleGradient(x, y, outerBorderRadius, redGlowCenter, redGlowSide)
        r.DrawCircle(x, y, radius, redGlowMain);
    }
}

const move = function (player, enemies) {
    for (const enemy of enemies) {
        const { position: enemyPosition, speed: enemySpeed } = enemy;
        g.moveToDestination(player.position, enemyPosition, enemySpeed);
    }
}

module.exports = {
    getEnemyDetails: getEnemy,
    getEnemies,
    draw,
    move,
    getEnemy,
}       