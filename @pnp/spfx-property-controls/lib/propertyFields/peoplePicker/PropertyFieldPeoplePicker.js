"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldPeoplePickerHost_1 = require("./PropertyFieldPeoplePickerHost");
/**
 * Represents a PropertyFieldPeoplePicker object
 */
var PropertyFieldPeoplePickerBuilder = (function () {
    /**
     * Constructor method
     */
    function PropertyFieldPeoplePickerBuilder(_targetProperty, _properties) {
        // Properties defined by IPropertyPaneField
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.disabled = false;
        this.allowDuplicate = true;
        this.multiSelect = true;
        this.principalType = [];
        this.deferredValidationTime = 200;
        this.render = this.render.bind(this);
        this.label = _properties.label;
        this.targetProperty = _properties.targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.onPropertyChange = _properties.onPropertyChange;
        this.context = _properties.context;
        this.initialData = _properties.initialData;
        this.allowDuplicate = _properties.allowDuplicate;
        this.principalType = _properties.principalType;
        this.targetSiteUrl = _properties.targetSiteUrl;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        if (typeof _properties.disabled !== 'undefined') {
            this.disabled = _properties.disabled;
        }
        if (_properties.deferredValidationTime) {
            this.deferredValidationTime = _properties.deferredValidationTime;
        }
        if (typeof _properties.multiSelect !== "undefined") {
            this.multiSelect = _properties.multiSelect;
        }
    }
    /**
     * Renders the PeoplePicker field content
     */
    PropertyFieldPeoplePickerBuilder.prototype.render = function (elem, ctx, changeCallback) {
        // Construct the JSX properties
        var element = React.createElement(PropertyFieldPeoplePickerHost_1.default, {
            label: this.label,
            disabled: this.disabled,
            targetProperty: this.targetProperty,
            initialData: this.initialData,
            allowDuplicate: this.allowDuplicate,
            multiSelect: this.multiSelect,
            principalType: this.principalType,
            onDispose: this.dispose,
            onRender: this.render,
            onChange: changeCallback,
            onPropertyChange: this.onPropertyChange,
            context: this.context,
            properties: this.customProperties,
            targetSiteUrl: this.targetSiteUrl,
            key: this.key,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime
        });
        // Calls the REACT content generator
        ReactDom.render(element, elem);
    };
    /**
     * Disposes the current object
     */
    PropertyFieldPeoplePickerBuilder.prototype.dispose = function (elem) { };
    return PropertyFieldPeoplePickerBuilder;
}());
/**
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
function PropertyFieldPeoplePicker(targetProperty, properties) {
    // Calls the PropertyFieldPeoplePicker builder object
    // This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldPeoplePickerBuilder(targetProperty, __assign({}, properties, { targetProperty: targetProperty, onDispose: null, onRender: null }));
}
exports.PropertyFieldPeoplePicker = PropertyFieldPeoplePicker;

//# sourceMappingURL=PropertyFieldPeoplePicker.js.map
