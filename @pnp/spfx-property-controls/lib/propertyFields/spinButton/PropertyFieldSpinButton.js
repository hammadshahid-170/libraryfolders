"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldSpinButtonHost_1 = require("./PropertyFieldSpinButtonHost");
var PropertyFieldSpinButtonBuilder = (function () {
    function PropertyFieldSpinButtonBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = _targetProperty;
        this.properties = {
            key: _properties.key,
            label: _properties.label,
            step: _properties.step || 1,
            min: _properties.min,
            max: _properties.max,
            onPropertyChange: _properties.onPropertyChange,
            disabled: _properties.disabled,
            properties: _properties.properties,
            incrementIconName: _properties.incrementIconName,
            decrementIconName: _properties.decrementIconName,
            suffix: _properties.suffix,
            decimalPlaces: _properties.decimalPlaces || 0,
            onRender: this.onRender.bind(this)
        };
        this.svalue = _properties.initialValue || this.properties.min || 0;
    }
    PropertyFieldSpinButtonBuilder.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyFieldSpinButtonBuilder.prototype.onRender = function (elem, ctx, changeCallback) {
        if (!this.elem) {
            this.elem = elem;
        }
        this.changeCB = changeCallback;
        var element = React.createElement(PropertyFieldSpinButtonHost_1.default, {
            label: this.properties.label,
            disabled: this.properties.disabled,
            value: this.formatValueString(this.svalue),
            incrementIconName: this.properties.incrementIconName || 'ChevronUpSmall',
            decrementIconName: this.properties.decrementIconName || 'ChevronDownSmall',
            onValidate: this.validate.bind(this),
            onIncrement: this.increment.bind(this),
            onDecrement: this.decrement.bind(this)
        });
        ReactDom.render(element, elem);
    };
    PropertyFieldSpinButtonBuilder.prototype.validate = function (rawValue) {
        var numValue = this.extractNumValue(rawValue);
        return this.validateNumber(numValue);
    };
    PropertyFieldSpinButtonBuilder.prototype.validateNumber = function (numValue) {
        // Check against max value
        if (typeof this.properties.max !== "undefined" && numValue > this.properties.max) {
            numValue = this.properties.max;
        }
        // Check against min value
        if (typeof this.properties.min !== "undefined" && numValue < this.properties.min) {
            numValue = this.properties.min;
        }
        //ensure matching rounding for decimals
        numValue = +numValue.toFixed(this.properties.decimalPlaces);
        //Check for change and notify
        if (numValue !== this.svalue) {
            this.onValueChanged(numValue);
        }
        return this.formatValueString(numValue);
    };
    PropertyFieldSpinButtonBuilder.prototype.increment = function (rawValue) {
        var numValue = this.extractNumValue(rawValue);
        numValue += this.properties.step;
        return this.validateNumber(numValue);
    };
    PropertyFieldSpinButtonBuilder.prototype.decrement = function (rawValue) {
        var numValue = this.extractNumValue(rawValue);
        numValue -= this.properties.step;
        return this.validateNumber(numValue);
    };
    PropertyFieldSpinButtonBuilder.prototype.extractNumValue = function (rawValue) {
        var numValue;
        var baseValue = this.removeSuffix(rawValue);
        if (isNaN(+baseValue)) {
            if (this.properties.min) {
                numValue = Math.max(this.properties.min, 0);
            }
            else {
                numValue = 0;
            }
        }
        else {
            numValue = +baseValue;
        }
        return numValue;
    };
    PropertyFieldSpinButtonBuilder.prototype.hasSuffix = function (rawValue) {
        if (!this.properties.suffix) {
            return false;
        }
        var subString = rawValue.substr(rawValue.length - this.properties.suffix.length);
        return subString === this.properties.suffix;
    };
    PropertyFieldSpinButtonBuilder.prototype.removeSuffix = function (rawValue) {
        if (!this.hasSuffix(rawValue)) {
            return rawValue;
        }
        return rawValue.substr(0, rawValue.length - this.properties.suffix.length);
    };
    PropertyFieldSpinButtonBuilder.prototype.formatValueString = function (numValue) {
        return this.addSuffix(numValue.toFixed(this.properties.decimalPlaces));
    };
    PropertyFieldSpinButtonBuilder.prototype.addSuffix = function (stringValue) {
        if (!this.properties.suffix) {
            return stringValue;
        }
        return stringValue + this.properties.suffix;
    };
    PropertyFieldSpinButtonBuilder.prototype.onValueChanged = function (newValue) {
        if (this.properties.onPropertyChange && newValue !== null) {
            this.properties.onPropertyChange(this.targetProperty, this.svalue, newValue);
            this.svalue = newValue;
            this.properties.properties[this.targetProperty] = newValue;
            if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
                this.changeCB(this.targetProperty, newValue);
            }
        }
    };
    return PropertyFieldSpinButtonBuilder;
}());
function PropertyFieldSpinButton(targetProperty, properties) {
    return new PropertyFieldSpinButtonBuilder(targetProperty, properties);
}
exports.PropertyFieldSpinButton = PropertyFieldSpinButton;

//# sourceMappingURL=PropertyFieldSpinButton.js.map
