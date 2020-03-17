import Core from "./Core";
import Acomp from "absol-acomp";
import '../../css/combobox.css';
import Dom from "absol/src/HTML5/Dom";
import EventEmitter from "absol/src/HTML5/EventEmitter";


var _ = Core._;
var $ = Core.$;



function ComboBox() {
    this.$background = $('.ab-combo-box-background', this);
    this.$text = $('.ab-combo-box-text', this);
    this.$toggleIcon = $('.ab-combo-box-toggle-icon', this);
    this.$listCtn;
    this.$list;
    this._isOpen = false;
    this.on('click', this.toggle.bind(this));
    this._listUpdated = false;
    this.value2ItemElt = {};
    this.value2Text = {};
}

ComboBox.prototype.open = function () {
    if (this._isOpen) return;
    this._isOpen = true;
    var thisCb = this;
    this.addClass('ab-combo-box-active');

    setTimeout(function () {
        document.body.addEventListener('click', thisCb.eventHandler.clickBody);
        thisCb._updateDropdowPosition();
        thisCb.$listCtn.removeStyle('visibility');
    }, 1);
    if (!this.$listCtn) {
        this.$listCtn = Acomp._('.ab-combo-box-list-container')
            .addStyle('visibility', 'hidden');
        this.$list = Acomp._('.ab-combo-box-list')
            .addTo(this.$listCtn);
    }
    this.$listCtn.addTo(document.body);
    if (!this._listUpdated) {
        this.$list.clearChild();
        thisCb.value2ItemElt = {};
        this._items.forEach(function (item) {

            thisCb.value2ItemElt[item.value] = Acomp._({
                class: ['ab-combo-box-list-item'].concat(item.value == thisCb._value ? ['ab-combo-box-list-item-selected'] : []),
                child: {
                    text: item.text || item.toString(),
                },
                on: {
                    click: thisCb.eventHandler.clickItem.bind(thisCb, item)
                }
            }).addTo(thisCb.$list);
        });
    }

};

ComboBox.prototype._updateDropdowPosition = function () {
    var bound = this.getBoundingClientRect();
    var listCtnBound = this.$listCtn.getBoundingClientRect();
    var screenSize = Dom.getScreenSize();
    if (bound.bottom + listCtnBound.height > screenSize.height) {
        this.$listCtn.addStyle('top', bound.top - listCtnBound.height + 'px');
    }
    else {
        this.$listCtn.addStyle('top', bound.bottom + 'px');
    }

    if (bound.right + listCtnBound.width > screenSize.width) {
        this.$listCtn.addStyle('left', bound.right - listCtnBound.width + 'px');

    }
    else {
        this.$listCtn.addStyle('left', bound.left + 'px');
    }
};

ComboBox.prototype.close = function () {
    if (!this._isOpen) return;
    this._isOpen = false;
    this.removeClass('ab-combo-box-active');
    document.body.removeEventListener('click', this.eventHandler.clickBody);
    this.$listCtn.selfRemove();
};

ComboBox.prototype.toggle = function () {
    if (this._isOpen) this.close();
    else this.open();
};

ComboBox.prototype.updateSize = function () {
    var textBBox = this.$text.getBBox();
    this.$background.attr('width', 5 + textBBox.width + 5 + 6 + 5);
    this.$toggleIcon.attr('d', 'M ' + (5 + textBBox.width + 5) + ',5 h 6 l -3,6 z');
};

ComboBox.render = function () {
    return _({
        class: 'ab-combo-box',
        child: [
            {
                tag: 'rect',
                class: 'ab-combo-box-background',
                attr: {
                    rx: 4,
                    ry: 4,
                    x: 0,
                    y: 0,
                    height: 16,
                    width: 98
                }
            },
            {
                tag: 'text',
                class: 'ab-combo-box-text',
                attr: {
                    x: 5,
                    y: 12
                },
                child: { text: '+' }
            },
            {
                tag: 'path',
                class: 'ab-combo-box-toggle-icon'
            }
        ]
    });
};


ComboBox.property = {};

ComboBox.property.value = {
    set: function (value) {
        var activeItem = this.value2ItemElt[this._value];
        if (activeItem) {
            activeItem.removeClass('ab-combo-box-list-item-selected');
        }
        this._value = value;
        activeItem = this.value2ItemElt[this._value];
        if (activeItem) {
            activeItem.addClass('ab-combo-box-list-item-selected');
        }
        var text = this.value2Text[this._value];
        if (text) {
            this.$text.clearChild().addChild(Acomp._({ text: text }));
            this.updateSize();
        }
    },
    get: function () {
        return this._value;
    }
}

ComboBox.property.items = {
    set: function (value) {
        this._items = value || [];
        this.value2Text = this._items.reduce(function (ac, cr) {
            ac[cr.value] = cr.text;
            return ac;
        }, {});
        var text = this.value2Text[this._value];
        if (text) {
            this.$text.clearChild().addChild(Acomp._({ text: text }));
            this.updateSize();
        }
    },
    get: function () {
        return this._items;
    }
}


ComboBox.eventHandler = {};
ComboBox.eventHandler.clickBody = function (event) {
    if (EventEmitter.hitElement(this.$listCtn, event)) return;
    this.close();
};

ComboBox.eventHandler.clickItem = function (item, event) {
    this.value = item.value;
    this.close();

};

Core.install('combobox', ComboBox);

export default ComboBox;