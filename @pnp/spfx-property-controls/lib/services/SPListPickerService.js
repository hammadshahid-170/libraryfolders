"use strict";
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
var sp_http_1 = require("@microsoft/sp-http");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var IPropertyFieldListPicker_1 = require("../propertyFields/listPicker/IPropertyFieldListPicker");
var SPListPickerMockService_1 = require("./SPListPickerMockService");
/**
 * Service implementation to get list & list items from current SharePoint site
 */
var SPListPickerService = (function () {
    /**
     * Service constructor
     */
    function SPListPickerService(_props, pageContext) {
        this.props = _props;
        this.context = pageContext;
    }
    /**
     * Gets the collection of libs in the current SharePoint site, or target site if specified by webRelativeUrl
     */
    SPListPickerService.prototype.getLibs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, queryUrl, response, lists, lr, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local)) return [3 /*break*/, 1];
                        // If the running environment is local, load the data from the mock
                        return [2 /*return*/, this.getLibsFromMock()];
                    case 1:
                        webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;
                        queryUrl = webAbsoluteUrl + "/_api/lists?$select=Title,id,BaseTemplate";
                        // Check if the orderBy property is provided
                        if (this.props.orderBy !== null) {
                            queryUrl += '&$orderby=';
                            switch (this.props.orderBy) {
                                case IPropertyFieldListPicker_1.PropertyFieldListPickerOrderBy.Id:
                                    queryUrl += 'Id';
                                    break;
                                case IPropertyFieldListPicker_1.PropertyFieldListPickerOrderBy.Title:
                                    queryUrl += 'Title';
                                    break;
                            }
                        }
                        // Adds an OData Filter to the list
                        if (this.props.filter) {
                            queryUrl += "&$filter=" + encodeURIComponent(this.props.filter);
                        }
                        else if (this.props.baseTemplate !== null && this.props.baseTemplate) {
                            queryUrl += '&$filter=BaseTemplate%20eq%20';
                            queryUrl += this.props.baseTemplate;
                            // Check if you also want to exclude hidden list in the list
                            if (this.props.includeHidden === false) {
                                queryUrl += '%20and%20Hidden%20eq%20false';
                            }
                        }
                        else {
                            if (this.props.includeHidden === false) {
                                queryUrl += '&$filter=Hidden%20eq%20false';
                            }
                        }
                        return [4 /*yield*/, this.context.spHttpClient.get(queryUrl, sp_http_1.SPHttpClient.configurations.v1)];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        lists = (_a.sent());
                        if (!this.props.onListsRetrieved) return [3 /*break*/, 7];
                        lr = this.props.onListsRetrieved(lists.value);
                        output = void 0;
                        if (!(lr instanceof Array)) return [3 /*break*/, 4];
                        output = lr;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, lr];
                    case 5:
                        output = _a.sent();
                        _a.label = 6;
                    case 6:
                        lists = {
                            value: output
                        };
                        _a.label = 7;
                    case 7: return [2 /*return*/, lists];
                }
            });
        });
    };
    /**
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    SPListPickerService.prototype.getLibsFromMock = function () {
        return SPListPickerMockService_1.default.getLists(this.context.pageContext.web.absoluteUrl).then(function () {
            var listData = {
                value: [
                    { Title: 'Mock List One', Id: '6770c83b-29e8-494b-87b6-468a2066bcc6', BaseTemplate: '109' },
                    { Title: 'Mock List Two', Id: '2ece98f2-cc5e-48ff-8145-badf5009754c', BaseTemplate: '109' },
                    { Title: 'Mock List Three', Id: 'bd5dbd33-0e8d-4e12-b289-b276e5ef79c2', BaseTemplate: '109' }
                ]
            };
            return listData;
        });
    };
    return SPListPickerService;
}());
exports.default = SPListPickerService;

//# sourceMappingURL=SPListPickerService.js.map
