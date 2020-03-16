import Core from "./Core";
import '../../css/entry.css';


var _ = Core._;
var $ = Core.$;



export function makeActivePath(x0, y0, width, height) {
    return [
        ['M', [0 + x0, 0 + y0]],
        ['H', [15 + x0]],
        ['l', [6, 4],
            [3, 0],
            [6, -4]
        ],
        ['H', [width + x0]],
        ['v', [height]],
        ['H', [29.5 + x0]],
        ['l', [-6, 4], [-3, 0], [-6, -4]],
        ['H', [8 + x0]],
        ['a', [8, 8],
            [0],
            [0, 1],
            [-8, -8]
        ],
        ['z']
    ].map(function (cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function (p) { return p.join(',') }).join(' ');
    });
}


export function makeActiveConnectorPath(x0, y0, width, height) {
    return [
        ['M', [29.5 + (29.5 - 15 - 8) + x0, y0 + height]],
        ['H', [29.5 + x0]],
        ['l', [-6, 4], [-3, 0], [-6, -4]],
        ['H', [8 + x0]]
    ].map(function (cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function (p) { return p.join(',') }).join(' ');
    });
}


function Active() {

}


Active.prototype.updateSize = function () {
    // var textBBox = this.$text.getBBox();
    // this._setWidth(textBBox.width + 24);

};

Active.render = function () {
    return _({
        class: 'ab-entry',
        child: [{
            tag: 'path',
            attr: {
                d: makeActivePath(10, 20, 240, 50)

            }
        },
        {
            tag: 'path',
            attr: {
                d: makeActiveConnectorPath(10, 20, 240, 50)
            },
            style: {
                strokeWidth: '4',
                stroke: 'rgba(255, 255, 0, 0.9)'
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

Core.install('active', Active);

export default Active;
