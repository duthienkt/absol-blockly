import Core from "./Core";
import '../../css/entry.css';


var _ = Core._;
var $ = Core.$;


export function makeEntryPath(x0, y0, width, height) {
    return  [
        ['M', [0 + x0, 8 + y0]],
        ['A', [8 , 8, 0, 0, 1, 8 + x0, 0 + y0]],
        ['H', [width +x0]],
        ['v', [height]],
        ['H', [29.5+ x0]],
        ['l', [-6, 4], [-3, 0], [-6, -4]],
        ['H', [8+ x0]],
        ['a', [8, 8], [0], [0, 1], [-8, -8]],
        ['z']
        
    ].map(function(cmd) {
        return cmd[0] + ' ' + cmd.slice(1).map(function(p){return p.join(',')}).join(' ');
    });
}

function Entry() {
    this.$text = $('text', this);
    this.$path = $('path', this);
}


Entry.prototype._setWidth = function(value) {
    this.$path.attr('d', makeEntryPath(0, 0, value, 24));
};

Entry.prototype.updateSize = function() {
    var textBBox = this.$text.getBBox();
    this._setWidth(textBBox.width + 24);

};

Entry.render = function() {
    return _({
        class: 'ab-entry',
        child: [{
                tag: 'path',
                attr: {
                    d: 'm 0,8 A 8,8 0 0,1 8,0 H 20 v 24 H 29.5 l -6,4 -3,0 -6,-4 H 8 a 8,8 0 0,1 -8,-8 z'
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

Entry.property = {};

Entry.property.name = {
    set: function(value) {
        this._name = value + '';
        this.$text.clearChild().addChild(_({ text: this._name }));
    },
    get: function() {
        return this._name;
    }
};


// Entry.attribute = {};

Core.install('entry', Entry);

export default Entry;
