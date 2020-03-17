export function makeBlockPath(x0, y0, hingeWidth, headerHeight, width, height) {
    return [
        ['M', [x0, 8 + y0]],
        ['A', [8, 8], [0], [0, 1], [8 + x0, y0]],
        ['H', [15 + x0]],
        ['l', [6, 4], [3, 0], [6, -4]],
        ['H', [x0 + width]],
        ['v', [headerHeight]],
        ['H', [hingeWidth + 6 + 3 + 6 + x0]],
        ['l', [-6, 4], [-3, 0], [- 6, -4]],
        ['h', [- 7]],
        ['a', [8, 8], [0], [0, 0], [- 8, 8]],
        ['v', [8]], //some thing,
        ['a', [8, 8], [0], [0, 0], [8, 8]],
        ['H', [132.89903259277344 + x0]],//todo,
        ['v', [10]],
        ['H', [29.5+ x0]],
        ['l', [-6, 4], [-3, 0], [-6, -4]],
        ['H', [8 + x0]],
        ['a', [8, 8], [0], [0, 1], [-8, -8]],
        ['z']
    ].map(function (cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function (p) { return p.join(',') }).join(' ');
    });
}