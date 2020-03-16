import Core from "./Core";
import '../../css/entry.css';


var _ = Core._;
var $ = Core.$;



export function makeExpressionPath(x0, y0, width, height) {
    return [
        ['M', [0 + x0, 0 + y0]],
        ['H', [width + x0]],
        ['v', [height]],
        ['H', [0 + x0]],
        ['V', [20 + y0]],
        ['c', [0, -10], [-8, 8], [- 8, -7.5]],
        ['s', [8, 2.5], [8, -7.5]],
        ['z']
    ].map(function (cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function (p) { return p.join(',') }).join(' ');
    });
}



export function makeExpressionConnectorPath(x0, y0, width, height) {
    return [
        ['M', [0 + x0, 0 + y0 + height]],
        ['V', [20 + y0]],
        ['c', [0, -10], [-8, 8], [- 8, -7.5]],
        ['s', [8, 2.5], [8, -7.5]],
        ['V', [0 + y0 ]]
    ].map(function (cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function (p) { return p.join(',') }).join(' ');
    });
}



function Expression() {

}


Expression.prototype.updateSize = function () {
};

Expression.render = function () {
    return _({
        class: 'ab-entry',
        child: [
            {
                tag: 'path',
                attr: {
                    d: makeExpressionPath(10, 20, 240, 150)

                }
            },
            {
                tag: 'path',
                attr: {
                    d: makeExpressionConnectorPath(10, 20, 240, 150)
                },
                style: {
                    strokeWidth: '4',
                    stroke: 'rgba(255, 255, 0, 0.9)'
                }
            }
        ]
    });
};

Core.install('expression', Expression);

export default Expression;
