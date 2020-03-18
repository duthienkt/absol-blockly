import Core from "./Core";
import Acomp from "absol-acomp";
import '../../css/textinput.css';
import Dom from "absol/src/HTML5/Dom";
import EventEmitter from "absol/src/HTML5/EventEmitter";


var _ = Core._;
var $ = Core.$;



function TextInput() {
    this.$background = $('.ab-text-input-background', this);
    this.$text = $('.ab-text-input-text', this);
    this._isOpen = false;
    this._value = '';
    this.on('click', this.toggle.bind(this));

}

TextInput.prototype.open = function () {
    if (this._isOpen) return;
    this._isOpen = true;
    var thisCb = this;
    this.addClass('ab-text-input-active');
    if (!this.$inputCtn) {
        this.$inputCtn = Acomp._('.ab-text-input-real-input-ctn');
        this.$input = Acomp._('input[type="text"].ab-text-input-real-input').addTo(this.$inputCtn);
        this.$input.on('blur', this.eventHandler.inputBlur);
        this.$input.on('keydown', this.eventHandler.inputKeydown, true);
        this.$input.on('change', this.eventHandler.change, true);
    }
    this.$input.value = this.value + '';
    this.$inputCtn.addTo(document.body);
    this._updateInputPosition();
    this.updateSize();
    this.$input.focus();
    // setTimeout(function () {
    //     document.body.addEventListener('click', thisCb.eventHandler.clickBody);
    //     thisCb._updateInputPosition();
    //     thisCb.$listCtn.removeStyle('visibility');
    // }, 1);
    // if (!this.$listCtn) {
    //     this.$listCtn = Acomp._('.ab-text-input-list-container')
    //         .addStyle('visibility', 'hidden');
    //     this.$list = Acomp._('.ab-text-input-list')
    //         .addTo(this.$listCtn);
    // }
    // this.$listCtn.addTo(document.body);
    // if (!this._listUpdated) {
    //     this.$list.clearChild();
    //     thisCb.value2ItemElt = {};
    //     this._items.forEach(function (item) {

    //         thisCb.value2ItemElt[item.value] = Acomp._({
    //             class: ['ab-text-input-list-item'].concat(item.value == thisCb._value ? ['ab-text-input-list-item-selected'] : []),
    //             child: {
    //                 text: item.text || item.toString(),
    //             },
    //             on: {
    //                 click: thisCb.eventHandler.clickItem.bind(thisCb, item)
    //             }
    //         }).addTo(thisCb.$list);
    //     });
    // }

};

TextInput.prototype._updateInputPosition = function () {
    var bound = this.$text.getBoundingClientRect();
    this.$inputCtn.addStyle({
        top: bound.top  + 'px',
        left: bound.left - 5 + 'px'
    });
};

TextInput.prototype.close = function () {
    if (!this._isOpen) return;
    this._isOpen = false;
    this.removeClass('ab-text-input-active');
    // document.body.removeEventListener('click', this.eventHandler.clickBody);
    this.$inputCtn.selfRemove();
};

TextInput.prototype.toggle = function () {
    if (this._isOpen) this.close();
    else this.open();
};

TextInput.prototype.updateSize = function () {
    var textBBox = this.$text.getBBox();
    this.$background.attr('width', 5 + textBBox.width + 5);
    if (this.$input && this.$inputCtn.parentElement) this.$input.addStyle('width', textBBox.width + 10 + 'px');
};

TextInput.render = function () {
    return _({
        class: 'ab-text-input',
        child: [
            {
                tag: 'rect',
                class: 'ab-text-input-background',
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
                class: 'ab-text-input-text',
                attr: {
                    x: 5,
                    y: 12
                },
                child: { text: '' }
            }
        ]
    });
};


TextInput.property = {};

TextInput.property.value = {
    set: function (value) {
        this._value = value;
        this.$text.clearChild().addChild(_({ text: value }));
       
    },
    get: function () {
        return this._value;
    }
}


TextInput.eventHandler = {};
TextInput.eventHandler.inputBlur = function (event) {
    var newValue = this.$input.value;
    this.value = newValue;
    this.close();
};

TextInput.eventHandler.inputKeydown = function (event) {
    var lastValue = this.$input.value;
    var thisIp = this;
    if (!event.ctrlKey && !event.altKey && event.key.length == 1) {
        var newValue = lastValue + event.key;
        this.$text.clearChild().addChild(_({ text: newValue }));
        this.updateSize();
    }
    else if (event.key == 'Enter') {
        this.$input.blur();
    }
    else if (event.key == "Escape"){
        this.$input.value =  this.value;
        this.$input.blur();
        this.updateSize();

    }
    else {
        setTimeout(function () {
            var newValue = thisIp.$input.value;
            thisIp.$text.clearChild().addChild(_({ text: newValue }));
            thisIp.updateSize();
        }, 1)
    }
};

TextInput.eventHandler.inputChange = function () {
    var newValue = thisIp.$input.value;
    this.$text.clearChild().addChild(_({ text: newValue }));
    this.updateSize();
};

Core.install('textinput', TextInput);

export default TextInput;