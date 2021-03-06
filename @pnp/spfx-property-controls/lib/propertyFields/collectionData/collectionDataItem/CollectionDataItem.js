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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropertyFieldCollectionDataHost_module_scss_1 = require("../PropertyFieldCollectionDataHost.module.scss");
var TextField_1 = require("office-ui-fabric-react/lib/components/TextField");
var Icon_1 = require("office-ui-fabric-react/lib/components/Icon");
var Link_1 = require("office-ui-fabric-react/lib/components/Link");
var Checkbox_1 = require("office-ui-fabric-react/lib/components/Checkbox");
var strings = require("PropertyControlStrings");
var __1 = require("..");
var Dropdown_1 = require("office-ui-fabric-react/lib/components/Dropdown");
var Callout_1 = require("office-ui-fabric-react/lib/components/Callout");
var collectionIconField_1 = require("../collectionIconField");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var collectionNumberField_1 = require("../collectionNumberField");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var CollectionDataItem = (function (_super) {
    __extends(CollectionDataItem, _super);
    function CollectionDataItem(props) {
        var _this = _super.call(this, props) || this;
        _this.emptyItem = null;
        _this.validation = {};
        /**
         * Update the item value on the field change
         */
        _this.onValueChanged = function (fieldId, value) {
            _this.setState(function (prevState) {
                var crntItem = prevState.crntItem;
                // Update the changed field
                crntItem[fieldId] = value;
                _this.doAllFieldChecks();
                // Store this in the current state
                return { crntItem: crntItem };
            });
        };
        /**
         * Add the current row to the collection
         */
        _this.addRow = function () {
            if (_this.props.fAddItem) {
                var crntItem = _this.state.crntItem;
                // Check if all the fields are correctly provided
                if (_this.checkAllRequiredFieldsValid(crntItem) &&
                    _this.checkAnyFieldContainsValue(crntItem) &&
                    _this.checkAllFieldsAreValid()) {
                    _this.props.fAddItem(crntItem);
                    // Clear all field values
                    var emptyItem = _this.generateEmptyItem();
                    _this.setState({
                        crntItem: __assign({}, emptyItem)
                    });
                }
            }
        };
        /**
         * Add the current row to the collection
         */
        _this.updateItem = function () {
            var crntItem = _this.state.crntItem;
            var isValid = _this.checkAllRequiredFieldsValid(crntItem) && _this.checkAnyFieldContainsValue(crntItem) && _this.checkAllFieldsAreValid();
            if (_this.props.fUpdateItem) {
                // Check if all the fields are correctly provided
                if (isValid) {
                    _this.props.fUpdateItem(_this.props.index, crntItem);
                }
            }
            // Set the validation for the item
            if (_this.props.fValidation) {
                _this.props.fValidation(_this.props.index, isValid);
            }
        };
        /**
         * Delete the item from the collection
         */
        _this.deleteRow = function () {
            if (_this.props.fDeleteItem) {
                _this.props.fDeleteItem(_this.props.index);
            }
        };
        /**
         * Allow custom field validation
         *
         * @param field
         * @param value
         */
        _this.fieldValidation = function (field, value) { return __awaiter(_this, void 0, void 0, function () {
            var validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validation = "";
                        if (!field.onGetErrorMessage) return [3 /*break*/, 2];
                        // Set initial field validation
                        this.validation[field.id] = false;
                        return [4 /*yield*/, field.onGetErrorMessage(value, this.props.index, this.state.crntItem)];
                    case 1:
                        // Do the validation
                        validation = _a.sent();
                        _a.label = 2;
                    case 2:
                        // Store the field validation
                        this.validation[field.id] = validation === "";
                        // Add message for the error callout
                        this.errorCalloutHandler(field.id, validation);
                        this.doAllFieldChecks();
                        return [2 /*return*/, validation];
                }
            });
        }); };
        /**
         * Custom field validation
         */
        _this.onCustomFieldValidation = function (fieldId, errorMsg) {
            console.log(fieldId, errorMsg);
            if (fieldId) {
                _this.validation[fieldId] = errorMsg === "";
                _this.errorCalloutHandler(fieldId, errorMsg);
                _this.doAllFieldChecks();
            }
        };
        /**
         * URL field validation
         *
         * @param field
         * @param value
         * @param item
         */
        _this.urlFieldValidation = function (field, value, item) { return __awaiter(_this, void 0, void 0, function () {
            var isValid, validation, regEx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isValid = true;
                        validation = "";
                        if (!field.onGetErrorMessage) return [3 /*break*/, 2];
                        return [4 /*yield*/, field.onGetErrorMessage(value, this.props.index, item)];
                    case 1:
                        // Using the custom validation
                        validation = _a.sent();
                        isValid = validation === "";
                        return [3 /*break*/, 3];
                    case 2:
                        regEx = /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
                        isValid = (value === null || value.length === 0 || regEx.test(value));
                        validation = isValid ? "" : strings.InvalidUrlError;
                        _a.label = 3;
                    case 3:
                        // Store the field validation
                        this.validation[field.id] = isValid;
                        // Add message for the error callout
                        this.errorCalloutHandler(field.id, validation);
                        this.doAllFieldChecks();
                        // Return the error message if needed
                        return [2 /*return*/, validation];
                }
            });
        }); };
        /**
         * Toggle the error callout
         */
        _this.toggleErrorCallout = function () {
            _this.setState(function (prevState) { return ({
                showCallout: !prevState.showCallout
            }); });
        };
        _this.hideErrorCallout = function () {
            _this.setState({
                showCallout: false
            });
        };
        // Create an empty item with all properties
        var emptyItem = _this.generateEmptyItem();
        _this.state = {
            crntItem: sp_lodash_subset_1.clone(_this.props.item) || __assign({}, emptyItem),
            errorMsgs: [],
            showCallout: false
        };
        return _this;
    }
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    CollectionDataItem.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.item !== prevProps.item) {
            this.setState({
                crntItem: sp_lodash_subset_1.clone(this.props.item)
            });
        }
    };
    /**
     * Perform all required field checks at once
     */
    CollectionDataItem.prototype.doAllFieldChecks = function () {
        var crntItem = this.state.crntItem;
        // Check if current item is valid
        if (this.props.fAddInCreation) {
            if (this.checkAllRequiredFieldsValid(crntItem) &&
                this.checkAnyFieldContainsValue(crntItem) &&
                this.checkAllFieldsAreValid()) {
                this.props.fAddInCreation(crntItem);
            }
            else {
                this.props.fAddInCreation(null);
            }
        }
        // Check if item needs to be updated
        if (this.props.fUpdateItem) {
            this.updateItem();
        }
    };
    /**
     * Check if all values of the required fields are provided
     */
    CollectionDataItem.prototype.checkAllRequiredFieldsValid = function (item) {
        // Get all the required fields
        var requiredFields = this.props.fields.filter(function (f) { return f.required; });
        // Check all the required field values
        for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
            var field = requiredFields_1[_i];
            if (typeof item[field.id] === "undefined" || item[field.id] === null || item[field.id] === "") {
                return false;
            }
        }
        return true;
    };
    /**
     * Check if any of the fields contain a value
     * @param item
     */
    CollectionDataItem.prototype.checkAnyFieldContainsValue = function (item) {
        var fields = this.props.fields;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            if (typeof item[field.id] !== "undefined" && item[field.id] !== null && item[field.id] !== "") {
                return true;
            }
        }
        return false;
    };
    /**
     * Check if the add action needs to be disabled
     */
    CollectionDataItem.prototype.disableAdd = function (item) {
        return !this.checkAllRequiredFieldsValid(item) || !this.checkAnyFieldContainsValue(item) || !this.checkAllFieldsAreValid() || !this.props.fAddItem;
    };
    /**
     * Checks if all fields are valid
     */
    CollectionDataItem.prototype.checkAllFieldsAreValid = function () {
        if (this.validation) {
            var keys = Object.keys(this.validation);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (!this.validation[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Error callout message handler
     *
     * @param field
     * @param message
     */
    CollectionDataItem.prototype.errorCalloutHandler = function (fieldId, message) {
        var _this = this;
        this.setState(function (prevState) {
            var crntItem = prevState.crntItem, errorMsgs = prevState.errorMsgs;
            // Get the current field
            var fieldIdx = sp_lodash_subset_1.findIndex(_this.props.fields, function (f) { return f.id === fieldId; });
            if (fieldIdx === -1) {
                return;
            }
            var field = _this.props.fields[fieldIdx];
            // Check if there already is a message for the field
            var fieldMsgIdx = sp_lodash_subset_1.findIndex(errorMsgs, function (msg) { return msg.field === field.title; });
            // Add message
            var fieldMsg;
            if (fieldMsgIdx === -1) {
                fieldMsg = {
                    field: field.title,
                    message: message
                };
            }
            else {
                // Update message
                fieldMsg = errorMsgs[fieldMsgIdx];
                if (fieldMsg) {
                    fieldMsg.message = message;
                }
            }
            // Check if field required message needs to be shown
            if (field.required) {
                if (typeof crntItem[field.id] === "undefined" || crntItem[field.id] === null || crntItem[field.id] === "") {
                    fieldMsg.isRequired = true;
                }
                else {
                    fieldMsg.isRequired = false;
                }
            }
            // If required and message are false, it doesn't need to be added
            if (!fieldMsg.message && !fieldMsg.isRequired) {
                // Remove the item
                if (fieldMsgIdx !== -1) {
                    errorMsgs.splice(fieldMsgIdx, 1);
                }
            }
            else {
                if (fieldMsgIdx === -1) {
                    errorMsgs.push(fieldMsg);
                }
            }
            // Sort based on the index
            errorMsgs = sp_lodash_subset_1.sortBy(errorMsgs, ["field"]);
            return {
                errorMsgs: errorMsgs
            };
        });
    };
    /**
     * Render the field
     *
     * @param field
     * @param item
     */
    CollectionDataItem.prototype.renderField = function (field, item) {
        var _this = this;
        var disableFieldOnEdit = field.disableEdit && !!this.props.fUpdateItem;
        switch (field.type) {
            case __1.CustomCollectionFieldType.boolean:
                return React.createElement(Checkbox_1.Checkbox, { checked: item[field.id] ? item[field.id] : false, onChange: function (ev, value) { return _this.onValueChanged(field.id, value); }, disabled: disableFieldOnEdit, className: "PropertyFieldCollectionData__panel__boolean-field" });
            case __1.CustomCollectionFieldType.dropdown:
                return React.createElement(Dropdown_1.Dropdown, { placeHolder: field.placeholder || field.title, options: field.options, selectedKey: item[field.id] || null, required: field.required, disabled: disableFieldOnEdit, onChanged: function (opt) { return _this.onValueChanged(field.id, opt.key); }, onRenderOption: field.onRenderOption, className: "PropertyFieldCollectionData__panel__dropdown-field" });
            case __1.CustomCollectionFieldType.number:
                return (React.createElement(collectionNumberField_1.CollectionNumberField, { field: field, item: item, disableEdit: disableFieldOnEdit, fOnValueChange: this.onValueChanged, fValidation: this.fieldValidation }));
            case __1.CustomCollectionFieldType.fabricIcon:
                return (React.createElement(collectionIconField_1.CollectionIconField, { field: field, item: item, disableEdit: disableFieldOnEdit, fOnValueChange: this.onValueChanged, fValidation: this.fieldValidation }));
            case __1.CustomCollectionFieldType.url:
                return React.createElement(TextField_1.TextField, { placeholder: field.placeholder || field.title, value: item[field.id] ? item[field.id] : "", required: field.required, disabled: disableFieldOnEdit, className: PropertyFieldCollectionDataHost_module_scss_1.default.collectionDataField, onChanged: function (value) { return _this.onValueChanged(field.id, value); }, deferredValidationTime: field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200, onGetErrorMessage: function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, this.urlFieldValidation(field, value, item)];
                    }); }); }, inputClassName: "PropertyFieldCollectionData__panel__url-field" });
            case __1.CustomCollectionFieldType.custom:
                if (field.onCustomRender) {
                    return field.onCustomRender(field, item[field.id], this.onValueChanged, item, item.uniqueId, this.onCustomFieldValidation);
                }
                return null;
            case __1.CustomCollectionFieldType.string:
            default:
                return React.createElement(TextField_1.TextField, { placeholder: field.placeholder || field.title, className: PropertyFieldCollectionDataHost_module_scss_1.default.collectionDataField, value: item[field.id] ? item[field.id] : "", required: field.required, disabled: disableFieldOnEdit, onChanged: function (value) { return _this.onValueChanged(field.id, value); }, deferredValidationTime: field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200, onGetErrorMessage: function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.fieldValidation(field, value)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); }, inputClassName: "PropertyFieldCollectionData__panel__string-field" });
        }
    };
    /**
     * Retrieve all dropdown options
     */
    CollectionDataItem.prototype.getSortingOptions = function () {
        var opts = [];
        var totalItems = this.props.totalItems;
        for (var i = 1; i <= totalItems; i++) {
            opts.push({
                text: i.toString(),
                key: i
            });
        }
        return opts;
    };
    /**
    * Creates an empty item with a unique id
    */
    CollectionDataItem.prototype.generateEmptyItem = function () {
        // Create an empty item with all properties
        var emptyItem = {};
        emptyItem.uniqueId = sp_core_library_1.Guid.newGuid().toString();
        for (var _i = 0, _a = this.props.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            // Assign default value or null to the emptyItem
            emptyItem[field.id] = field.defaultValue || null;
        }
        return emptyItem;
    };
    /**
     * Default React render
     */
    CollectionDataItem.prototype.render = function () {
        var _this = this;
        var crntItem = this.state.crntItem;
        var opts = this.getSortingOptions();
        return (React.createElement("div", { className: "PropertyFieldCollectionData__panel__table-row " + PropertyFieldCollectionDataHost_module_scss_1.default.tableRow + " " + (this.props.index === null ? PropertyFieldCollectionDataHost_module_scss_1.default.tableFooter : "") },
            (this.props.sortingEnabled && this.props.totalItems) && (React.createElement("span", { className: "PropertyFieldCollectionData__panel__sorting-field " + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell },
                React.createElement(Dropdown_1.Dropdown, { options: opts, selectedKey: this.props.index + 1, onChanged: function (opt) { return _this.props.fOnSorting(_this.props.index, opt.key); } }))),
            (this.props.sortingEnabled && this.props.totalItems === null) && (React.createElement("span", { className: "" + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell })),
            this.props.fields.map(function (f) { return (React.createElement("span", { key: "dataitem-" + f.id, className: PropertyFieldCollectionDataHost_module_scss_1.default.tableCell + " " + PropertyFieldCollectionDataHost_module_scss_1.default.inputField }, _this.renderField(f, crntItem))); }),
            React.createElement("span", { className: PropertyFieldCollectionDataHost_module_scss_1.default.tableCell },
                React.createElement("span", { ref: function (ref) { return _this.calloutCellRef = ref; } },
                    React.createElement(Link_1.Link, { title: strings.CollectionDataItemShowErrorsLabel, className: PropertyFieldCollectionDataHost_module_scss_1.default.errorCalloutLink, disabled: !this.state.errorMsgs || this.state.errorMsgs.length === 0, onClick: this.toggleErrorCallout },
                        React.createElement(Icon_1.Icon, { iconName: "Error" }))),
                this.state.showCallout && (React.createElement(Callout_1.Callout, { className: PropertyFieldCollectionDataHost_module_scss_1.default.errorCallout, target: this.calloutCellRef, isBeakVisible: true, directionalHint: 4 /* bottomLeftEdge */, directionalHintForRTL: 13 /* rightBottomEdge */, onDismiss: this.hideErrorCallout }, (this.state.errorMsgs && this.state.errorMsgs.length > 0) && (React.createElement("div", { className: PropertyFieldCollectionDataHost_module_scss_1.default.errorMsgs },
                    React.createElement("p", null, "Field issues:"),
                    React.createElement("ul", null, this.state.errorMsgs.map(function (msg, idx) { return (React.createElement("li", { key: msg.field + "-" + idx },
                        React.createElement("b", null, msg.field),
                        ": ",
                        msg.message ? msg.message : msg.isRequired ? strings.CollectionDataItemFieldRequiredLabel : null)); }))))))),
            React.createElement("span", { className: PropertyFieldCollectionDataHost_module_scss_1.default.tableCell }, 
            /* Check add or delete action */
            this.props.index !== null ? (React.createElement(Link_1.Link, { title: strings.CollectionDeleteRowButtonLabel, disabled: !this.props.fDeleteItem || this.props.disableItemDeletion, onClick: this.deleteRow },
                React.createElement(Icon_1.Icon, { iconName: "Clear" }))) : (React.createElement(Link_1.Link, { title: strings.CollectionAddRowButtonLabel, className: "" + (this.disableAdd(crntItem) ? "" : PropertyFieldCollectionDataHost_module_scss_1.default.addBtn), disabled: this.disableAdd(crntItem), onClick: this.addRow },
                React.createElement(Icon_1.Icon, { iconName: "Add" }))))));
    };
    return CollectionDataItem;
}(React.Component));
exports.CollectionDataItem = CollectionDataItem;

//# sourceMappingURL=CollectionDataItem.js.map
