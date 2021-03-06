"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PropertyFieldViewPickerHost_1 = require("./PropertyFieldViewPickerHost");
/**
 * Represents a PropertyFieldViewPicker object
 */
var PropertyFieldViewPickerBuilder = (function () {
    /**
     * Constructor method
     */
    function PropertyFieldViewPickerBuilder(_targetProperty, _properties) {
        this.type = sp_webpart_base_1.PropertyPaneFieldType.Custom;
        this.deferredValidationTime = 200;
        this.disabled = false;
        this.disableReactivePropertyChanges = false;
        this.render = this.render.bind(this);
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.label = _properties.label;
        this.context = _properties.context;
        this.webAbsoluteUrl = _properties.webAbsoluteUrl;
        this.listId = _properties.listId;
        this.selectedView = _properties.selectedView;
        this.orderBy = _properties.orderBy;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.viewsToExclude = _properties.viewsToExclude;
        this.filter = _properties.filter;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        this.onViewsRetrieved = _properties.onViewsRetrieved;
        if (_properties.disabled === true) {
            this.disabled = _properties.disabled;
        }
        if (_properties.deferredValidationTime) {
            this.deferredValidationTime = _properties.deferredValidationTime;
        }
    }
    PropertyFieldViewPickerBuilder.prototype.onPropertyChange = function (propertyPath, oldValue, newValue) { };
    /**
     * Renders the SPViewPicker field content
     */
    PropertyFieldViewPickerBuilder.prototype.render = function (elem, ctx, changeCallback) {
        var componentProps = {
            label: this.label,
            targetProperty: this.targetProperty,
            context: this.context,
            webAbsoluteUrl: this.webAbsoluteUrl,
            listId: this.listId,
            orderBy: this.orderBy,
            onDispose: this.dispose,
            onRender: this.render,
            onChange: changeCallback,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            viewsToExclude: this.viewsToExclude,
            filter: this.filter,
            onViewsRetrieved: this.onViewsRetrieved
        };
        // Single selector
        componentProps['selectedView'] = this.selectedView;
        var element = React.createElement(PropertyFieldViewPickerHost_1.default, componentProps);
        // Calls the REACT content generator
        ReactDom.render(element, elem);
    };
    /**
     * Disposes the current object
     */
    PropertyFieldViewPickerBuilder.prototype.dispose = function (_elem) {
    };
    return PropertyFieldViewPickerBuilder;
}());
/**
 * Helper method to create a SPView Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint view picker is associated to.
 * @param properties - Strongly typed SPView Picker properties.
 */
function PropertyFieldViewPicker(targetProperty, properties) {
    //Create an internal properties object from the given properties
    var newProperties = {
        label: properties.label,
        targetProperty: targetProperty,
        context: properties.context,
        listId: properties.listId,
        selectedView: typeof properties.selectedView === 'string' ? properties.selectedView : null,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        viewsToExclude: properties.viewsToExclude,
        filter: properties.filter,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        onViewsRetrieved: properties.onViewsRetrieved
    };
    //Calls the PropertyFieldViewPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldViewPickerBuilder(targetProperty, newProperties);
}
exports.PropertyFieldViewPicker = PropertyFieldViewPicker;

//# sourceMappingURL=PropertyFieldViewPicker.js.map
