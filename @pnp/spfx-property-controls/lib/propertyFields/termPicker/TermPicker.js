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
var Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
var PropertyFieldTermPickerHost_module_scss_1 = require("./PropertyFieldTermPickerHost.module.scss");
var strings = require("PropertyControlStrings");
var ISPTermStorePickerService_1 = require("../../services/ISPTermStorePickerService");
var TermBasePicker = (function (_super) {
    __extends(TermBasePicker, _super);
    function TermBasePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermBasePicker;
}(Pickers_1.BasePicker));
exports.TermBasePicker = TermBasePicker;
var TermPicker = (function (_super) {
    __extends(TermPicker, _super);
    /**
     * Constructor method
     */
    function TermPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onRenderItem = _this.onRenderItem.bind(_this);
        _this.onRenderSuggestionsItem = _this.onRenderSuggestionsItem.bind(_this);
        _this.onFilterChanged = _this.onFilterChanged.bind(_this);
        _this.onGetTextFromItem = _this.onGetTextFromItem.bind(_this);
        _this.state = {
            terms: _this.props.value
        };
        return _this;
    }
    /**
     * componentWillReceiveProps method
     */
    TermPicker.prototype.componentWillReceiveProps = function (nextProps) {
        // check to see if props is different to avoid re-rendering
        var newKeys = nextProps.value.map(function (a) { return a.key; });
        var currentKeys = this.state.terms.map(function (a) { return a.key; });
        newKeys.sort();
        currentKeys.sort();
        if (newKeys.join(',') !== currentKeys.join(',')) {
            this.setState({ terms: nextProps.value });
        }
    };
    /**
     * Renders the item in the picker
     */
    TermPicker.prototype.onRenderItem = function (term) {
        return (React.createElement("div", { className: PropertyFieldTermPickerHost_module_scss_1.default.pickedTermRoot, key: term.index, "data-selection-index": term.index, "data-is-focusable": !term.disabled && true },
            React.createElement("span", { className: PropertyFieldTermPickerHost_module_scss_1.default.pickedTermText }, term.item.name),
            !term.disabled &&
                React.createElement("span", { className: PropertyFieldTermPickerHost_module_scss_1.default.pickedTermCloseIcon, onClick: term.onRemoveItem },
                    React.createElement("i", { className: "ms-Icon ms-Icon--Cancel", "aria-hidden": "true" }))));
    };
    /**
     * Renders the suggestions in the picker
     */
    TermPicker.prototype.onRenderSuggestionsItem = function (term, props) {
        var termParent = term.termSetName;
        var termTitle = term.name + " [" + term.termSetName + "]";
        if (term.path.indexOf(";") !== -1) {
            var splitPath = term.path.split(";");
            termParent = splitPath[splitPath.length - 2];
            splitPath.pop();
            termTitle = term.name + " [" + term.termSetName + ":" + splitPath.join(':') + "]";
        }
        return (React.createElement("div", { className: PropertyFieldTermPickerHost_module_scss_1.default.termSuggestion, title: termTitle },
            React.createElement("div", null, term.name),
            // Check if term or term set is fetched
            term.termSet.indexOf(term.key) !== -1 ? (React.createElement("div", { className: PropertyFieldTermPickerHost_module_scss_1.default.termSuggestionSubTitle }, strings.TermPickerTermSetLabel)) : (React.createElement("div", { className: PropertyFieldTermPickerHost_module_scss_1.default.termSuggestionSubTitle },
                " ",
                strings.TermPickerInLabel,
                " ",
                termParent))));
    };
    /**
     * When Filter Changes a new search for suggestions
     */
    TermPicker.prototype.onFilterChanged = function (filterText, tagList) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, termPickerHostProps, allowMultipleSelections, isTermSetSelectable, disabledTermIds, termsService, terms, termSets, _i, termSets_1, termSet, filteredTerms, _loop_1, _b, terms_1, term;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, context = _a.context, termPickerHostProps = _a.termPickerHostProps, allowMultipleSelections = _a.allowMultipleSelections, isTermSetSelectable = _a.isTermSetSelectable, disabledTermIds = _a.disabledTermIds;
                        if (!(filterText !== "" && (allowMultipleSelections || tagList.length === 0))) return [3 /*break*/, 4];
                        termsService = this.props.termsService;
                        return [4 /*yield*/, termsService.searchTermsByName(filterText)];
                    case 1:
                        terms = _c.sent();
                        if (!isTermSetSelectable) return [3 /*break*/, 3];
                        return [4 /*yield*/, termsService.getTermSets()];
                    case 2:
                        termSets = _c.sent();
                        // Check if termset was retrieved and if it contains the filter value
                        if (termSets && termSets.length > 0) {
                            for (_i = 0, termSets_1 = termSets; _i < termSets_1.length; _i++) {
                                termSet = termSets_1[_i];
                                if (termSet.Name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) {
                                    // Add the termset to the suggestion list
                                    terms.push({
                                        key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termSet.Id),
                                        name: termSet.Name,
                                        path: "",
                                        termSet: termSet.Id,
                                        termGroup: termSet.Group
                                    });
                                }
                            }
                        }
                        _c.label = 3;
                    case 3:
                        filteredTerms = [];
                        _loop_1 = function (term) {
                            var canBePicked = true;
                            // Check if the term is in the disabled list
                            if (disabledTermIds && disabledTermIds.length > 0) {
                                if (disabledTermIds.indexOf(term.key) !== -1) {
                                    canBePicked = false;
                                }
                            }
                            // Check if the term can be used
                            if (canBePicked) {
                                // Only retrieve the terms which are not yet tagged
                                if (tagList.filter(function (tag) { return tag.key === term.key; }).length === 0) {
                                    filteredTerms.push(term);
                                }
                            }
                        };
                        for (_b = 0, terms_1 = terms; _b < terms_1.length; _b++) {
                            term = terms_1[_b];
                            _loop_1(term);
                        }
                        return [2 /*return*/, filteredTerms];
                    case 4: return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    /**
     * gets the text from an item
     */
    TermPicker.prototype.onGetTextFromItem = function (item) {
        return item.name;
    };
    /**
   * Render method
   */
    TermPicker.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(TermBasePicker, { disabled: this.props.disabled, onResolveSuggestions: this.onFilterChanged, onRenderSuggestionsItem: this.onRenderSuggestionsItem, getTextFromItem: this.onGetTextFromItem, onRenderItem: this.onRenderItem, defaultSelectedItems: this.props.value, selectedItems: this.state.terms, itemLimit: !this.props.allowMultipleSelections ? 1 : undefined, onChange: this.props.onChanged, resolveDelay: this.props.resolveDelay, className: PropertyFieldTermPickerHost_module_scss_1.default.termBasePicker })));
    };
    return TermPicker;
}(React.Component));
exports.default = TermPicker;

//# sourceMappingURL=TermPicker.js.map
