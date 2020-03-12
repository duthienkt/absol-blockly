import Core from "./Core";
import '../../css/entry.css';


var _ = Core._;
var $ = Core.$;

function Active() {

}


Active.prototype.updateSize = function () {
    // var textBBox = this.$text.getBBox();
    // this._setWidth(textBBox.width + 24);

};

Active.render = function () {
    return _({
        class: 'ab-entry',
        child: [
            {
                tag: 'path',
                attr: {
                    d: 'm 0,0 H 15 l 6,4 3,0 6,-4 H 40 H 439.7804870605469 v 98 H 29.5 l -6,4 -3,0 -6,-4 H 8 a 8,8 0 0,1 -8,-8 z '
                        + 'M 412.45050048828125,5 h -357.67457580566406 v 5 c 0,10 -8,-8 -8,7.5 s 8,-2.5 8,7.5 v 69 h 357.67457580566406 z'
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