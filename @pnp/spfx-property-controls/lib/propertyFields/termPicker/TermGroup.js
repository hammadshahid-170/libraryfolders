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
var PropertyFieldTermPickerHost_1 = require("./PropertyFieldTermPickerHost");
var TermSet_1 = require("./TermSet");
var PropertyFieldTermPickerHost_module_scss_1 = require("./PropertyFieldTermPickerHost.module.scss");
var strings = require("PropertyControlStrings");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
/**
 * Term group component
 */
var TermGroup = (function (_super) {
    __extends(TermGroup, _super);
    function TermGroup(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            expanded: false,
            loaded: !!(props.group.TermSets && props.group.TermSets._Child_Items_)
        };
        // Check if the term group has to be automatically opened
        var selectedTermsInGroup = _this.props.activeNodes.filter(function (node) { return node.termGroup === _this.props.group.Id; });
        if (selectedTermsInGroup.length > 0) {
            _this._loadTermSets(true);
        }
        _this._handleClick = _this._handleClick.bind(_this);
        _this._autoExpand = _this._autoExpand.bind(_this);
        return _this;
    }
    /**
     * Handle the click event: collapse or expand
     */
    TermGroup.prototype._handleClick = function () {
        var isExpanded = this.state.expanded; // current state
        this.setState({
            expanded: !isExpanded
        });
        if (!isExpanded) {
            this._loadTermSets();
        }
    };
    /**
     * Function to auto expand the termset
     */
    TermGroup.prototype._autoExpand = function () {
        this.setState({
            expanded: true
        });
    };
    TermGroup.prototype._loadTermSets = function (autoExpand) {
        return __awaiter(this, void 0, void 0, function () {
            var termSets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.state.loaded) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.props.termsService.getGroupTermSets(this.props.group)];
                    case 1:
                        termSets = _a.sent();
                        //
                        // NOTE: the next line is kinda incorrect from React perspective as we're modifying props.
                        // But it is done to avoid redux usage or reimplementing the whole logic
                        // 
                        this.props.group.TermSets = termSets;
                        this.setState({
                            loaded: true,
                            expanded: typeof autoExpand !== 'undefined' ? autoExpand : this.state.expanded
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TermGroup.prototype.render = function () {
        var _this = this;
        // Specify the inline styling to show or hide the termsets
        var styleProps = {
            display: this.state.expanded ? 'block' : 'none'
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: "" + PropertyFieldTermPickerHost_module_scss_1.default.listItem, onClick: this._handleClick },
                React.createElement("img", { src: this.state.expanded ? PropertyFieldTermPickerHost_1.EXPANDED_IMG : PropertyFieldTermPickerHost_1.COLLAPSED_IMG, alt: strings.TermPickerExpandNode, title: strings.TermPickerExpandNode }),
                React.createElement("img", { src: PropertyFieldTermPickerHost_1.GROUP_IMG, title: strings.TermPickerMenuGroup, alt: strings.TermPickerMenuGroup }),
                " ",
                this.props.group.Name),
            React.createElement("div", { style: styleProps }, this.state.loaded ? this.props.group.TermSets._Child_Items_.map(function (termset) {
                return React.createElement(TermSet_1.default, { key: termset.Id, termset: termset, termGroup: _this.props.group.Id, termstore: _this.props.termstore, termsService: _this.props.termsService, autoExpand: _this._autoExpand, activeNodes: _this.props.activeNodes, changedCallback: _this.props.changedCallback, multiSelection: _this.props.multiSelection, isTermSetSelectable: _this.props.isTermSetSelectable, disabledTermIds: _this.props.disabledTermIds });
            }) : React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal }))));
    };
    return TermGroup;
}(React.Component));
exports.default = TermGroup;

//# sourceMappingURL=TermGroup.js.map
