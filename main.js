const sketch = require('./sketch.js')

const loop = function (world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

const main = function () {
    const world = sketch.setup();
    loop(world);
    sketch.tearDown(world);
}

main();