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
var strings = require("PropertyControlStrings");
var React = require("react");
var Dropdown_1 = require("office-ui-fabric-react/lib/components/Dropdown");
var telemetry = require("../../common/telemetry");
var PropertyFieldMultiSelectHost = (function (_super) {
    __extends(PropertyFieldMultiSelectHost, _super);
    function PropertyFieldMultiSelectHost(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('PropertyFieldMultiSelect', {
            disabled: props.disabled
        });
        return _this;
    }
    PropertyFieldMultiSelectHost.prototype.render = function () {
        if (!this.props.options || (this.props.options && this.props.options.length === 0)) {
            return (React.createElement("div", null,
                React.createElement(Dropdown_1.Dropdown, { key: "MultiSelectOptionsDisabled", label: this.props.label, options: [], placeHolder: strings.propertyFieldMultiSelectNoOptions, disabled: true })));
        }
        return (React.createElement("div", null,
            React.createElement(Dropdown_1.Dropdown, __assign({ key: "MultiSelectOptions" }, this.props, { multiSelect: true }))));
    };
    return PropertyFieldMultiSelectHost;
}(React.Component));
exports.default = PropertyFieldMultiSelectHost;

//# sourceMappingURL=PropertyFieldMultiSelectHost.js.map
