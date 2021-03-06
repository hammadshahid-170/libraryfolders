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
var SPSiteSearchService_1 = require("../../services/SPSiteSearchService");
var FieldErrorMessage_1 = require("../errorMessage/FieldErrorMessage");
var telemetry = require("../../common/telemetry");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
var strings = require("PropertyControlStrings");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var PropertyFieldSitePickerListItem_1 = require("./PropertyFieldSitePickerListItem/PropertyFieldSitePickerListItem");
var PropertyFieldSitePickerHost_module_scss_1 = require("./PropertyFieldSitePickerHost.module.scss");
var icons_1 = require("@uifabric/icons");
var lib_1 = require("@uifabric/utilities/lib");
var PropertyFieldSitePickerHost = (function (_super) {
    __extends(PropertyFieldSitePickerHost, _super);
    function PropertyFieldSitePickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.onSearchFieldChange = function (newValue) { return __awaiter(_this, void 0, void 0, function () {
            var sites, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(newValue && newValue.length > 2)) return [3 /*break*/, 6];
                        this.setState({ isLoading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, this.searchService.searchSites(this.props.context, newValue)];
                    case 2:
                        sites = _a.sent();
                        this.setState({ siteSearchResults: sites });
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        this.setState({ errorMessage: error_1 });
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({ isLoading: false });
                        return [7 /*endfinally*/];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        this.setState({ siteSearchResults: [] });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        _this.handleCheckboxChange = function (site, checked) {
            var selectedSites = _this.state.selectedSites.slice();
            if (checked) {
                if (_this.props.multiSelect) {
                    selectedSites.push(site);
                }
                else {
                    selectedSites = [site];
                }
            }
            else {
                if (_this.props.multiSelect) {
                    selectedSites.splice(selectedSites.indexOf(site), 1);
                }
                else {
                    selectedSites = [];
                }
            }
            _this.props.onPropertyChange(_this.props.targetProperty, _this.state.selectedSites, selectedSites);
            // Trigger the apply button
            if (typeof _this.props.onChange !== 'undefined' && _this.props.onChange !== null) {
                _this.props.onChange(_this.props.targetProperty, selectedSites);
            }
            _this.setState({ selectedSites: selectedSites });
        };
        icons_1.initializeIcons();
        telemetry.track('PropertyFieldSitePicker', {
            disabled: props.disabled
        });
        _this.state = {
            isLoading: false,
            selectedSites: props.initialSites || [],
            siteSearchResults: [],
            errorMessage: null
        };
        _this.async = new lib_1.Async(_this);
        _this.searchService = new SPSiteSearchService_1.default();
        return _this;
    }
    PropertyFieldSitePickerHost.prototype.render = function () {
        var _this = this;
        var _a = this.state, isLoading = _a.isLoading, siteSearchResults = _a.siteSearchResults, selectedSites = _a.selectedSites;
        return (React.createElement("div", null,
            this.props.label && React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(SearchBox_1.SearchBox, { placeholder: strings.SitePickerSearchBoxPlaceholder, onChanged: this.async.debounce(this.onSearchFieldChange, this.props.deferredValidationTime) }),
            isLoading &&
                React.createElement(Spinner_1.Spinner, { size: Spinner_1.SpinnerSize.medium }),
            !isLoading && siteSearchResults &&
                React.createElement("div", null,
                    siteSearchResults.length > 0 &&
                        React.createElement("ul", { className: PropertyFieldSitePickerHost_module_scss_1.default.siteList }, siteSearchResults.map(function (site) {
                            return React.createElement(PropertyFieldSitePickerListItem_1.PropertyFieldSitePickerListItem, { key: site.id, checked: selectedSites.filter(function (s) { return s.id === site.id; }).length > 0, handleCheckboxChange: _this.handleCheckboxChange, site: site });
                        })),
                    siteSearchResults.length === 0 &&
                        React.createElement(Label_1.Label, null, strings.SitePickerNoResults)),
            selectedSites && selectedSites.length > 0 &&
                React.createElement("div", null,
                    React.createElement(Label_1.Label, { className: PropertyFieldSitePickerHost_module_scss_1.default.bold },
                        selectedSites.length,
                        " ",
                        strings.SitePickerSitesChosen),
                    React.createElement("ul", { className: PropertyFieldSitePickerHost_module_scss_1.default.siteList }, selectedSites.map(function (site) {
                        return React.createElement(PropertyFieldSitePickerListItem_1.PropertyFieldSitePickerListItem, { key: site.id, checked: selectedSites.filter(function (s) { return s.id === site.id; }).length > 0, handleCheckboxChange: _this.handleCheckboxChange, site: site });
                    }))),
            React.createElement(FieldErrorMessage_1.default, { errorMessage: this.state.errorMessage })));
    };
    return PropertyFieldSitePickerHost;
}(React.Component));
exports.default = PropertyFieldSitePickerHost;

//# sourceMappingURL=PropertyFieldSitePickerHost.js.map
