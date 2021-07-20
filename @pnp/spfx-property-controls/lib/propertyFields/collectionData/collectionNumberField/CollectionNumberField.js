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
var PropertyFieldCollectionDataHost_module_scss_1 = require("../PropertyFieldCollectionDataHost.module.scss");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var CollectionNumberField = (function (_super) {
    __extends(CollectionNumberField, _super);
    function CollectionNumberField(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Value change event handler
         *
         * @param field
         * @param value
         */
        _this.valueChange = function (field, value) {
            var inputVal = typeof value === "string" ? parseInt(value) : value;
            _this.setState({
                value: inputVal
            });
            _this.props.fOnValueChange(field.id, value);
            _this.delayedValidate(field, inputVal);
        };
        /**
         * Delayed field validation
         */
        _this.valueValidation = function (field, value) { return __awaiter(_this, void 0, void 0, function () {
            var validation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.fValidation(field, value)];
                    case 1:
                        validation = _a.sent();
                        // Update the error message
                        this.setState({
                            errorMessage: validation
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        _this.state = {
            value: null,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.delayedValidate = _this.async.debounce(_this.valueValidation, (_this.props.field.deferredValidationTime || _this.props.field.deferredValidationTime >= 0) ? _this.props.field.deferredValidationTime : 200);
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    CollectionNumberField.prototype.componentWillMount = function () {
        this.setState({
            value: this.props.item[this.props.field.id]
        });
        this.valueChange(this.props.field, this.props.item[this.props.field.id]);
    };
    /**
     * componentWillUpdate lifecycle hook
     *
     * @param nextProps
     * @param nextState
     */
    CollectionNumberField.prototype.componentWillUpdate = function (nextProps, nextState) {
        if (!sp_lodash_subset_1.isEqual(nextProps.item, this.props.item)) {
            this.setState({
                value: nextProps.item[nextProps.field.id]
            });
        }
    };
    /**
     * Default React render method
     */
    CollectionNumberField.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "PropertyFieldCollectionData__panel__number-field " + PropertyFieldCollectionDataHost_module_scss_1.default.numberField + " " + (this.state.errorMessage ? PropertyFieldCollectionDataHost_module_scss_1.default.invalidField : "") },
            React.createElement("input", { type: "number", role: "spinbutton", placeholder: this.props.field.placeholder || this.props.field.title, "aria-valuemax": "99999", "aria-valuemin": "-999999", "aria-valuenow": this.props.item[this.props.field.id] || '', "aria-invalid": !!this.state.errorMessage, value: this.state.value || '', onChange: function (ev) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.valueChange(this.props.field, ev.target.value)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); }, disabled: this.props.disableEdit })));
    };
    return CollectionNumberField;
}(React.Component));
exports.CollectionNumberField = CollectionNumberField;

//# sourceMappingURL=CollectionNumberField.js.map
