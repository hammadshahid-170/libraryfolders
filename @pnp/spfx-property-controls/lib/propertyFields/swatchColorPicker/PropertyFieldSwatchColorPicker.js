"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var colors_1 = require("office-ui-fabric-react/lib/utilities/color/colors");
var React = require("react");
var ReactDom = require("react-dom");
var IPropertyFieldSwatchColorPicker_1 = require("./IPropertyFieldSwatchColorPicker");
var PropertyFieldSwatchColorPickerHost_1 = require("./PropertyFieldSwatchColorPickerHost");
var PropertyFieldSwatchColorPickerBuilder = (function () {
    function PropertyFieldSwatchColorPickerBuilder(_targetProperty, _properties) {
        //Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.targetProperty = _targetProperty;
        this.properties = {
            key: _properties.key,
            label: _properties.label,
            onPropertyChange: _properties.onPropertyChange,
            selectedColor: _properties.selectedColor,
            colors: _properties.colors,
            showAsCircles: _properties.showAsCircles,
            columnCount: _properties.columnCount,
            disabled: _properties.disabled,
            properties: _properties.properties,
            style: _properties.style,
            iconName: _properties.iconName,
            onRender: this.onRender.bind(this)
        };
        if (typeof _properties.selectedColor === 'undefined') {
            this.color = null;
        }
        else {
            if (typeof _properties.selectedColor === 'string') {
                this.color = _properties.selectedColor;
            }
            else {
                this.color = _properties.selectedColor.str;
            }
        }
        this.valueAsObject = _properties.valueAsObject;
    }
    PropertyFieldSwatchColorPickerBuilder.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyFieldSwatchColorPickerBuilder.prototype.onRender = function (elem, ctx, changeCallback) {
        if (!this.elem) {
            this.elem = elem;
        }
        this.changeCB = changeCallback;
        var element = React.createElement(PropertyFieldSwatchColorPickerHost_1.default, {
            label: this.properties.label,
            disabled: this.properties.disabled,
            colors: (typeof this.properties.colors === 'undefined' || this.properties.colors.length === 0) ? [{ color: '#FFFFFF' }] : this.properties.colors,
            showAsCircles: this.properties.showAsCircles,
            columnCount: typeof this.properties.columnCount === 'undefined' ? 6 : Math.min(Math.max(1, this.properties.columnCount), 8),
            selectedColor: this.color,
            style: this.properties.style || IPropertyFieldSwatchColorPicker_1.PropertyFieldSwatchColorPickerStyle.Inline,
            iconName: this.properties.iconName || 'Color',
            onColorChanged: this.onColorChanged.bind(this)
        });
        ReactDom.render(element, elem);
    };
    PropertyFieldSwatchColorPickerBuilder.prototype.onColorChanged = function (id, newColor) {
        if (this.properties.onPropertyChange && newColor !== null) {
            var newValue = (this.valueAsObject ? colors_1.getColorFromString(newColor) : newColor);
            var oldValue = (this.valueAsObject ? colors_1.getColorFromString(this.color) : this.color);
            this.color = newColor;
            this.properties.onPropertyChange(this.targetProperty, oldValue, newValue);
            this.properties.properties[this.targetProperty] = newValue;
            if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
                this.changeCB(this.targetProperty, newValue);
            }
        }
    };
    return PropertyFieldSwatchColorPickerBuilder;
}());
function PropertyFieldSwatchColorPicker(targetProperty, properties) {
    return new PropertyFieldSwatchColorPickerBuilder(targetProperty, properties);
}
exports.PropertyFieldSwatchColorPicker = PropertyFieldSwatchColorPicker;

//# sourceMappingURL=PropertyFieldSwatchColorPicker.js.map
