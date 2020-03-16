import Core from "./Core";
import '../../css/entry.css';


var _ = Core._;
var $ = Core.$;



export function makeExpressionPath(x0, y0, width, height) {
    return [
        ['M', [0 + x0, 0 + y0]],
        ['H', [width + x0]],
        ['v', [height]],
        ['H', [0+ x0]],
        ['V', [20+y0]],
        ['c', [0, -10], [-8, 8], [- 8, -7.5] ],
        ['s', [8, 2.5], [8, -7.5]],
        ['z']
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
        child: [{
            tag: 'path',
            attr: {
                d: makeExpressionPath(10, 20, 240, 150)

            }
        },
        {
            tag: 'text',
            attr: {
                x: 12,
                y: 16
            },
            child: { text: "Long Text" }
        }
        ]
    });
};

Core.install('expression', Expression);

export default Expression;
