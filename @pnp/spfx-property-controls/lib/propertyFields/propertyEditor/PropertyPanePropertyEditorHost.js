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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Panel_1 = require("office-ui-fabric-react/lib/Panel");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var react_ace_1 = require("react-ace");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var telemetry = require("../../common/telemetry");
var PropertyPanePropertyEditorHost_module_scss_1 = require("./PropertyPanePropertyEditorHost.module.scss");
var strings = require("PropertyControlStrings");
var PropertyPanePropertyEditorHost = (function (_super) {
    __extends(PropertyPanePropertyEditorHost, _super);
    function PropertyPanePropertyEditorHost(props, state) {
        var _this = _super.call(this, props) || this;
        _this.cancel = true;
        _this.fileRef = null;
        _this.setFileRef = function (element) {
            _this.fileRef = element;
        };
        _this.getProperties = function () {
            var props = {};
            props = _this.props.webpart.properties;
            return JSON.stringify(props);
        };
        /**
         * Called when the save button  gets clicked
         */
        _this.onSave = function () {
            var newProperties = JSON.parse(_this.state.propertiesJson);
            for (var propName in newProperties) {
                sp_lodash_subset_1.set(_this.props.webpart.properties, propName, newProperties[propName]);
                if (typeof _this.props.webpart.properties[propName].onChange !== 'undefined' && _this.props.webpart.properties[propName].onChange !== null) {
                    _this.props.webpart.properties[propName].onChange(propName, newProperties[propName]);
                }
            }
            _this.props.webpart.render();
            _this.props.webpart.context.propertyPane.refresh();
            _this.setState(function (current) { return (__assign({}, current, { openPanel: false })); });
        };
        /**
         * Called when the properties editor changes
         */
        _this.onChange = function (newValue, event) {
            _this.setState(function (current) { return (__assign({}, current, { propertiesJson: newValue })); });
        };
        /**
         * Called to open the editor panel
         */
        _this.onOpenPanel = function () {
            // Store the current code value
            _this.previousValue = JSON.stringify(_this.props.webpart.properties, null, '\t');
            _this.setState(function (current) { return (__assign({}, current, { propertiesJson: _this.previousValue })); });
            _this.cancel = true;
            _this.setState({
                openPanel: true,
            });
        };
        /**
        * Close the panel
        */
        _this.onClosePanel = function () {
            _this.setState(function (crntState) {
                var newState = {
                    openPanel: false,
                };
                // Check if the property has to be reset
                if (_this.cancel) {
                    newState.propertiesJson = _this.previousValue;
                }
                return newState;
            });
        };
        /**
         * Called when clicking 'Download'
         */
        _this.onDownload = function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute("style", "display: none");
            a.setAttribute("data-interception", "off");
            var json = JSON.stringify(JSON.parse(_this.state.propertiesJson), null, '\t'); // remove indentation
            var blob = new Blob([json], { type: "octet/stream" });
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = "webpartproperties.json";
            a.click();
            window.URL.revokeObjectURL(url);
        };
        /**
         * Called when the changed event occurs on the file upload control
         */
        _this.onUpload = function () {
            if (_this.fileRef.files.length > 0 && _this.fileRef.files[0].type === "application/json") {
                var fileReader_1 = new FileReader();
                fileReader_1.readAsText(_this.fileRef.files[0]);
                fileReader_1.onload = function () {
                    var jsonString = fileReader_1.result;
                    var json = JSON.parse(jsonString); // normalize as an object
                    jsonString = JSON.stringify(json, null, '\t'); // and format as an indented string again
                    _this.setState(function (current) { return (__assign({}, current, { propertiesJson: jsonString })); });
                };
            }
            else {
                alert(strings.JsonFileRequiredMessage);
            }
        };
        telemetry.track('PropertyWebPartInformation', {});
        _this.state = {
            propertiesJson: _this.getProperties(),
            errorMessage: undefined,
        };
        return _this;
    }
    PropertyPanePropertyEditorHost.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(Button_1.DefaultButton, { onClick: this.onOpenPanel }, "Edit Properties"),
            React.createElement(Panel_1.Panel, { isOpen: this.state.openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: Panel_1.PanelType.medium, headerText: "Edit Raw Properties", onRenderFooterContent: function () { return (React.createElement("div", { className: PropertyPanePropertyEditorHost_module_scss_1.default.actions },
                    React.createElement("div", { className: "ms-Grid", dir: "ltr" },
                        React.createElement("div", { className: "ms-Grid-row" },
                            React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignLeft" },
                                React.createElement(Button_1.PrimaryButton, { iconProps: { iconName: 'Accept' }, text: strings.ApplyButtonLabel, value: strings.ApplyButtonLabel, onClick: _this.onSave }),
                                React.createElement(Button_1.DefaultButton, { iconProps: { iconName: 'Cancel' }, text: strings.CancelButtonLabel, value: strings.CancelButtonLabel, onClick: _this.onClosePanel })),
                            React.createElement("div", { className: "ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignRight" },
                                React.createElement(Button_1.DefaultButton, { color: "ms-bgColor-themeLight", iconProps: { iconName: 'Download' }, text: strings.ExportButtonLabel, value: strings.ExportButtonLabel, onClick: _this.onDownload }),
                                React.createElement("input", { type: "file", id: "uploadwebpartjson", ref: _this.setFileRef, style: { display: "none" }, onChange: _this.onUpload }),
                                React.createElement(Button_1.DefaultButton, { iconProps: { iconName: 'Upload' }, text: strings.ImportButtonLabel, value: strings.ImportButtonLabel, onClick: function () { _this.fileRef.click(); } })))))); } },
                React.createElement(react_ace_1.default, { mode: 'ace/mode/json', theme: "monokai", onChange: this.onChange, value: this.state.propertiesJson, name: "code-property-editor", editorProps: { $blockScrolling: true } }))));
    };
    return PropertyPanePropertyEditorHost;
}(React.Component));
exports.default = PropertyPanePropertyEditorHost;

//# sourceMappingURL=PropertyPanePropertyEditorHost.js.map
