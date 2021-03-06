"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Dropdown_1 = require("office-ui-fabric-react/lib/Dropdown");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var SPViewPickerService_1 = require("../../services/SPViewPickerService");
var FieldErrorMessage_1 = require("../errorMessage/FieldErrorMessage");
// Empty view value
var EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';
/**
 * Renders the controls for PropertyFieldViewPicker component
 */
var PropertyFieldViewPickerHost = (function (_super) {
    __extends(PropertyFieldViewPickerHost, _super);
    /**
     * Constructor method
     */
    function PropertyFieldViewPickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.options = [];
        _this.state = {
            results: _this.options,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.onChanged = _this.onChanged.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    PropertyFieldViewPickerHost.prototype.componentDidMount = function () {
        // Start retrieving the list views
        this.loadViews();
    };
    PropertyFieldViewPickerHost.prototype.componentDidUpdate = function (prevProps, _prevState) {
        if (this.props.listId !== prevProps.listId || this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
            this.loadViews();
        }
    };
    /**
     * Loads the views from a SharePoint list
     */
    PropertyFieldViewPickerHost.prototype.loadViews = function () {
        var _this = this;
        var viewService = new SPViewPickerService_1.SPViewPickerService(this.props, this.props.context);
        var viewsToExclude = this.props.viewsToExclude || [];
        this.options = [];
        viewService.getViews().then(function (response) {
            // Start mapping the views that are selected
            response.value.forEach(function (view) {
                if (_this.props.selectedView === view.Id) {
                    _this.selectedKey = view.Id;
                }
                // Make sure that the current view is NOT in the 'viewsToExclude' array
                if (viewsToExclude.indexOf(view.Title) === -1 && viewsToExclude.indexOf(view.Id) === -1) {
                    _this.options.push({
                        key: view.Id,
                        text: view.Title
                    });
                }
            });
            // Option to unselect the view
            _this.options.unshift({
                key: EMPTY_VIEW_KEY,
                text: ''
            });
            // Update the current component state
            _this.setState({
                results: _this.options,
                selectedKey: _this.selectedKey
            });
        });
    };
    /**
     * Raises when a view has been selected
     */
    PropertyFieldViewPickerHost.prototype.onChanged = function (option, _index) {
        var newValue = option.key;
        this.delayedValidate(newValue);
    };
    /**
     * Validates the new custom field value
     */
    PropertyFieldViewPickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.selectedView, value);
            return;
        }
        if (this.latestValidateValue === value) {
            return;
        }
        this.latestValidateValue = value;
        var errResult = this.props.onGetErrorMessage(value || '');
        if (typeof errResult !== 'undefined') {
            if (typeof errResult === 'string') {
                if (errResult === '') {
                    this.notifyAfterValidate(this.props.selectedView, value);
                }
                this.setState({
                    errorMessage: errResult
                });
            }
            else {
                errResult.then(function (errorMessage) {
                    if (!errorMessage) {
                        _this.notifyAfterValidate(_this.props.selectedView, value);
                    }
                    _this.setState({
                        errorMessage: errorMessage
                    });
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.selectedView, value);
        }
    };
    /**
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldViewPickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        // Check if the user wanted to unselect the view
        var propValue = newValue === EMPTY_VIEW_KEY ? '' : newValue;
        // Deselect all options
        this.options = this.state.results.map(function (option) {
            if (option.selected) {
                option.selected = false;
            }
            return option;
        });
        // Set the current selected key
        this.selectedKey = newValue;
        // Update the state
        this.setState({
            selectedKey: this.selectedKey,
            results: this.options
        });
        if (this.props.onPropertyChange && propValue !== null) {
            // Store the new property value
            this.props.properties[this.props.targetProperty] = propValue;
            // Trigger the default onPropertyChange event
            this.props.onPropertyChange(this.props.targetProperty, oldValue, propValue);
            // Trigger the apply button
            if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
                this.props.onChange(this.props.targetProperty, propValue);
            }
        }
    };
    /**
     * Called when the component will unmount
     */
    PropertyFieldViewPickerHost.prototype.componentWillUnmount = function () {
        if (typeof this.async !== 'undefined') {
            this.async.dispose();
        }
    };
    /**
     * Renders the SPViewPicker controls with Office UI Fabric
     */
    PropertyFieldViewPickerHost.prototype.render = function () {
        // Renders content
        return (React.createElement("div", null,
            this.props.label && React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Dropdown_1.Dropdown, { disabled: this.props.disabled, label: '', onChanged: this.onChanged, options: this.state.results, selectedKey: this.state.selectedKey }),
            React.createElement(FieldErrorMessage_1.default, { errorMessage: this.state.errorMessage })));
    };
    return PropertyFieldViewPickerHost;
}(React.Component));
exports.default = PropertyFieldViewPickerHost;

//# sourceMappingURL=PropertyFieldViewPickerHost.js.map
