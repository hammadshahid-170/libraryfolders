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
var ISPTermStorePickerService_1 = require("./ISPTermStorePickerService");
var sp_taxonomy_1 = require("@pnp/sp-taxonomy");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var SPTermStorePickerMockService_1 = require("./SPTermStorePickerMockService");
/**
 * Term Store Picker Service implementation that uses @pnp/sp-taxonomy to work with taxonomy service
 */
var PnPTermStorePickerService = (function () {
    function PnPTermStorePickerService(props, context) {
        this.props = props;
        this.context = context;
        this._termSetCollectionObjectType = 'SP.Taxonomy.TermSetCollection';
        this._termGroupCollectionObjectType = 'SP.Taxonomy.TermGroupCollection';
        this._pnpGroups = {};
        sp_taxonomy_1.taxonomy.setup({
            spfxContext: context
            //globalCacheDisable: true // uncomment this one for debugging with no cache
        });
    }
    /**
     * Gets term stores from the taxonomy service
     */
    PnPTermStorePickerService.prototype.getTermStores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SPTermStorePickerMockService_1.default.getTermStores(this.context.pageContext.web.absoluteUrl)];
                    case 1: 
                    // If the running environment is local, load the data from the mock
                    return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this._ensureTermStores()];
                    case 3:
                        _a.sent();
                        result_1 = [];
                        this._pnpTermStores.forEach(function (pnpTermStore) {
                            var pnpTermStoreAny = pnpTermStore;
                            result_1.push({
                                _ObjectType_: 'SP.Taxonomy.TermStore',
                                _ObjectIdentity_: pnpTermStoreAny._ObjectIdentity_,
                                Id: pnpTermStore.Id,
                                Name: pnpTermStore.Name,
                                Groups: {
                                    _ObjectType_: _this._termGroupCollectionObjectType,
                                    _Child_Items_: _this._pnpGroups[pnpTermStore.Id].map(function (g) {
                                        return _this._pnpTermGroup2TermGroup(g, pnpTermStore);
                                    })
                                }
                            });
                        });
                        return [2 /*return*/, result_1];
                }
            });
        });
    };
    /**
     * Searches terms by provided text
     * @param searchText text to search
     */
    PnPTermStorePickerService.prototype.searchTermsByName = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
                    // If the running environment is local, load the data from the mock
                    return [2 /*return*/, SPTermStorePickerMockService_1.default.searchTermsByName(searchText)];
                }
                else {
                    if (this.props.limitByTermsetNameOrID) {
                        return [2 /*return*/, this._searchTermsByTermSet(searchText)];
                    }
                    else if (this.props.limitByGroupNameOrID) {
                        return [2 /*return*/, this._searchTermsByGroup(searchText)];
                    }
                    else {
                        return [2 /*return*/, this._searchAllTerms(searchText)];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Gets term sets from the stores
     */
    PnPTermStorePickerService.prototype.getTermSets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var termSets, termStores, ts, _i, _a, group, _b, _c, termSet, _loop_1, this_1, i, len;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        termSets = [];
                        if (!(sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local)) return [3 /*break*/, 2];
                        return [4 /*yield*/, SPTermStorePickerMockService_1.default.getTermStores(this.context.pageContext.web.absoluteUrl)];
                    case 1:
                        termStores = _d.sent();
                        if (termStores && termStores.length > 0) {
                            ts = termStores[0];
                            // Check if the term store contains groups
                            if (ts.Groups && ts.Groups._Child_Items_) {
                                for (_i = 0, _a = ts.Groups._Child_Items_; _i < _a.length; _i++) {
                                    group = _a[_i];
                                    // Check if the group contains term sets
                                    if (group.TermSets && group.TermSets._Child_Items_) {
                                        if (this.props.limitByTermsetNameOrID) {
                                            for (_b = 0, _c = group.TermSets._Child_Items_; _b < _c.length; _b++) {
                                                termSet = _c[_b];
                                                // Check if the term set is found
                                                if (termSet.Name === this.props.limitByTermsetNameOrID || termSet.Id.indexOf(this.props.limitByTermsetNameOrID) !== -1) {
                                                    termSets = termSets.concat([termSet]);
                                                }
                                            }
                                        }
                                        else {
                                            termSets = termSets.concat(group.TermSets._Child_Items_);
                                        }
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, termSets];
                    case 2: return [4 /*yield*/, this._ensureTermStores()];
                    case 3:
                        _d.sent();
                        _loop_1 = function (i, len) {
                            var pnpTermStore, pnpTermSets, groupsBatch, _loop_2, termSetIdx, termSetLen, pnpGroups, pnpGroup, batch_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pnpTermStore = this_1._pnpTermStores[i];
                                        if (!this_1.props.limitByTermsetNameOrID) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1._getPnPTermSetsByNameOrId(pnpTermStore, this_1.props.limitByTermsetNameOrID)];
                                    case 1:
                                        pnpTermSets = _a.sent();
                                        groupsBatch = sp_taxonomy_1.taxonomy.createBatch();
                                        _loop_2 = function (termSetIdx, termSetLen) {
                                            var pnpTermSet = pnpTermSets[termSetIdx];
                                            var termSet = this_1._pnpTermSet2TermSet(pnpTermSet, '');
                                            termSets.push(termSet);
                                            pnpTermSet.group.inBatch(groupsBatch).usingCaching().get().then(function (pnpTermGroup) {
                                                termSet.Group = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                                            });
                                        };
                                        for (termSetIdx = 0, termSetLen = pnpTermSets.length; termSetIdx < termSetLen; termSetIdx++) {
                                            _loop_2(termSetIdx, termSetLen);
                                        }
                                        return [4 /*yield*/, groupsBatch.execute()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 5];
                                    case 3:
                                        pnpGroups = void 0;
                                        if (this_1.props.limitByGroupNameOrID) {
                                            pnpGroup = this_1._getPnPTermGroupsByNameOrId(pnpTermStore.Id, this_1.props.limitByGroupNameOrID);
                                            pnpGroups = [];
                                            if (pnpGroup) {
                                                pnpGroups.push(pnpGroup);
                                            }
                                        }
                                        else {
                                            pnpGroups = this_1._pnpGroups[pnpTermStore.Id];
                                        }
                                        batch_1 = sp_taxonomy_1.taxonomy.createBatch();
                                        pnpGroups.forEach(function (pnpGroup) {
                                            pnpGroup.termSets.inBatch(batch_1).usingCaching().get().then(function (pnpTermSets) {
                                                termSets = termSets.concat(pnpTermSets.map(function (pnpTermSet) {
                                                    return _this._pnpTermSet2TermSet(pnpTermSet, ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id));
                                                }));
                                            });
                                        });
                                        return [4 /*yield*/, batch_1.execute()];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0, len = this._pnpTermStores.length;
                        _d.label = 4;
                    case 4:
                        if (!(i < len)) return [3 /*break*/, 7];
                        return [5 /*yield**/, _loop_1(i, len)];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, termSets];
                }
            });
        });
    };
    /**
     * Gets all terms from the specified term set
     * @param termSet Term Set to get terms from
     */
    PnPTermStorePickerService.prototype.getAllTerms = function (termSet) {
        return __awaiter(this, void 0, void 0, function () {
            var pnpTermStores, _i, pnpTermStores_1, pnpTermStore, termsResult, pnpTerms, resultTerms, labelsBatch, _loop_3, this_2, termIdx, termsLen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
                            // If the running environment is local, load the data from the mock
                            return [2 /*return*/, SPTermStorePickerMockService_1.default.getAllTerms()];
                        }
                        return [4 /*yield*/, this._ensureTermStores()];
                    case 1:
                        _a.sent();
                        pnpTermStores = this._pnpTermStores;
                        _i = 0, pnpTermStores_1 = pnpTermStores;
                        _a.label = 2;
                    case 2:
                        if (!(_i < pnpTermStores_1.length)) return [3 /*break*/, 7];
                        pnpTermStore = pnpTermStores_1[_i];
                        return [4 /*yield*/, this._tryGetAllTerms(pnpTermStore, termSet).catch(function (error) { })];
                    case 3:
                        termsResult = _a.sent();
                        if (!termsResult) {
                            return [3 /*break*/, 6];
                        }
                        pnpTerms = termsResult;
                        resultTerms = [];
                        labelsBatch = sp_taxonomy_1.taxonomy.createBatch();
                        _loop_3 = function (termIdx, termsLen) {
                            var pnpTerm = pnpTerms[termIdx];
                            var term = pnpTerm;
                            term.Id = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(term.Id);
                            term.PathDepth = term.PathOfTerm.split(';').length;
                            term.TermSet = termSet;
                            resultTerms.push(term);
                            if (this_2.props.includeLabels) {
                                pnpTerm.labels.inBatch(labelsBatch).usingCaching().get().then(function (labels) {
                                    term.Labels = labels.map(function (label) { return label.Value; });
                                });
                            }
                        };
                        this_2 = this;
                        for (termIdx = 0, termsLen = pnpTerms.length; termIdx < termsLen; termIdx++) {
                            _loop_3(termIdx, termsLen);
                        }
                        if (!this.props.includeLabels) return [3 /*break*/, 5];
                        return [4 /*yield*/, labelsBatch.execute()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, ISPTermStorePickerService_1.TermStorePickerServiceHelper.sortTerms(resultTerms)];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get term sets from the specified group
     * @param group Term Group
     */
    PnPTermStorePickerService.prototype.getGroupTermSets = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pnpTermStore, pnpGroups, pnpGroup, pnpTermSets, isGuid, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._ensureTermStores()];
                    case 1:
                        _a.sent();
                        pnpTermStore = this._pnpTermStores.filter(function (ts) { return ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(ts.Id) === group.TermStore.Id; })[0];
                        pnpGroups = this._pnpGroups[pnpTermStore.Id].filter(function (gr) { return ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(gr.Id) === group.Id; });
                        if (!pnpGroups || !pnpGroups.length) {
                            return [2 /*return*/, {
                                    _ObjectType_: this._termSetCollectionObjectType,
                                    _Child_Items_: []
                                }];
                        }
                        pnpGroup = pnpGroups[0];
                        if (!this.props.limitByTermsetNameOrID) return [3 /*break*/, 6];
                        isGuid = ISPTermStorePickerService_1.TermStorePickerServiceHelper.isGuid(this.props.limitByTermsetNameOrID);
                        if (!isGuid) return [3 /*break*/, 3];
                        return [4 /*yield*/, pnpGroup.termSets.getById(this.props.limitByTermsetNameOrID).usingCaching().get()];
                    case 2:
                        pnpTermSets = [_a.sent()];
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, pnpGroup.termSets.getByName(this.props.limitByTermsetNameOrID).usingCaching().get()];
                    case 4:
                        pnpTermSets = [_a.sent()];
                        _a.label = 5;
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, pnpGroup.termSets.usingCaching().get()];
                    case 7:
                        pnpTermSets = _a.sent();
                        _a.label = 8;
                    case 8:
                        result = {
                            _ObjectType_: this._termSetCollectionObjectType,
                            _Child_Items_: pnpTermSets.map(function (pnpTermSet) {
                                return _this._pnpTermSet2TermSet(pnpTermSet, ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id));
                            })
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Tries to get terms from the specified Term Set.
     * @param pnpTermStore Term Store to work with
     * @param termSet Term set to get terms from
     */
    PnPTermStorePickerService.prototype._tryGetAllTerms = function (pnpTermStore, termSet) {
        return new Promise(function (resolve, reject) {
            pnpTermStore.getTermSetById(termSet.Id).terms.usingCaching().get().then(function (pnpTerms) {
                resolve(pnpTerms);
            }, function (error) {
                reject(error);
            });
        });
    };
    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByTermSetNameOrId
     * @param searchText text to search
     */
    PnPTermStorePickerService.prototype._searchTermsByTermSet = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var returnTerms, pnpTermStores, i, len, pnpTermStore, pnpTermSets, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local)) return [3 /*break*/, 1];
                        // If the running environment is local, load the data from the mock
                        return [2 /*return*/, SPTermStorePickerMockService_1.default.searchTermsByName(searchText)];
                    case 1: return [4 /*yield*/, this._ensureTermStores()];
                    case 2:
                        _d.sent();
                        returnTerms = [];
                        pnpTermStores = this._pnpTermStores;
                        i = 0, len = pnpTermStores.length;
                        _d.label = 3;
                    case 3:
                        if (!(i < len)) return [3 /*break*/, 7];
                        pnpTermStore = pnpTermStores[i];
                        return [4 /*yield*/, this._getPnPTermSetsByNameOrId(pnpTermStore, this.props.limitByTermsetNameOrID)];
                    case 4:
                        pnpTermSets = _d.sent();
                        _b = 
                        // getting filtered terms from term sets
                        (_a = returnTerms.push).apply;
                        _c = [
                            // getting filtered terms from term sets
                            returnTerms];
                        return [4 /*yield*/, this._searchTermsInTermSets(pnpTermStore, pnpTermSets, searchText)];
                    case 5:
                        // getting filtered terms from term sets
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, returnTerms];
                }
            });
        });
    };
    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByGroupNameOrId
     * @param searchText text to search
     */
    PnPTermStorePickerService.prototype._searchTermsByGroup = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var groupNameOrID, returnTerms, pnpTermStores, i, len, pnpTermStore, pnpGroup, pnpTermSets, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local)) return [3 /*break*/, 1];
                        // If the running environment is local, load the data from the mock
                        return [2 /*return*/, SPTermStorePickerMockService_1.default.searchTermsByName(searchText)];
                    case 1: return [4 /*yield*/, this._ensureTermStores()];
                    case 2:
                        _d.sent();
                        groupNameOrID = this.props.limitByGroupNameOrID;
                        returnTerms = [];
                        pnpTermStores = this._pnpTermStores;
                        i = 0, len = pnpTermStores.length;
                        _d.label = 3;
                    case 3:
                        if (!(i < len)) return [3 /*break*/, 7];
                        pnpTermStore = pnpTermStores[i];
                        pnpGroup = this._getPnPTermGroupsByNameOrId(pnpTermStore.Id, groupNameOrID);
                        if (!pnpGroup) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, pnpGroup.termSets.usingCaching().get()];
                    case 4:
                        pnpTermSets = _d.sent();
                        _b = 
                        // getting filtered terms from term sets
                        (_a = returnTerms.push).apply;
                        _c = [
                            // getting filtered terms from term sets
                            returnTerms];
                        return [4 /*yield*/, this._searchTermsInTermSets(pnpTermStore, pnpTermSets, searchText, pnpGroup.Id)];
                    case 5:
                        // getting filtered terms from term sets
                        _b.apply(_a, _c.concat([_d.sent()]));
                        _d.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 3];
                    case 7: return [2 /*return*/, returnTerms];
                }
            });
        });
    };
    /**
     * Searches for terms in the term store
     * @param searchText text to search
     */
    PnPTermStorePickerService.prototype._searchAllTerms = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var pnpTermStores, returnTerms, _loop_4, i, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
                            // If the running environment is local, load the data from the mock
                            return [2 /*return*/, SPTermStorePickerMockService_1.default.searchTermsByName(searchText)];
                        }
                        return [4 /*yield*/, this._ensureTermStores()];
                    case 1:
                        _a.sent();
                        pnpTermStores = this._pnpTermStores;
                        returnTerms = [];
                        _loop_4 = function (i, len) {
                            var pnpTermStore, pnpTerms, batch;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pnpTermStore = pnpTermStores[i];
                                        return [4 /*yield*/, pnpTermStore.getTerms({
                                                TermLabel: searchText,
                                                StringMatchOption: sp_taxonomy_1.StringMatchOption.StartsWith,
                                                DefaultLabelOnly: true,
                                                TrimUnavailable: true,
                                                ResultCollectionSize: 30
                                            }).usingCaching().get()];
                                    case 1:
                                        pnpTerms = _a.sent();
                                        batch = sp_taxonomy_1.taxonomy.createBatch();
                                        //
                                        // processing each term to get termSet info and labels
                                        //
                                        pnpTerms.forEach(function (pnpTerm) {
                                            var pickerTerm = {
                                                key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTerm.Id),
                                                name: pnpTerm.Name,
                                                path: pnpTerm.PathOfTerm,
                                                termSet: '',
                                                termGroup: ''
                                            };
                                            returnTerms.push(pickerTerm);
                                            pnpTerm.termSet.group.inBatch(batch).usingCaching().get().then(function (pnpTermGroup) {
                                                pickerTerm.termGroup = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                                            });
                                            pnpTerm.termSet.inBatch(batch).usingCaching().get().then(function (pnpTermSet) {
                                                pickerTerm.termSet = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id);
                                                pickerTerm.termSetName = pnpTermSet.Name;
                                            });
                                            if (_this.props.includeLabels) {
                                                pnpTerm.labels.inBatch(batch).usingCaching().get().then(function (labels) {
                                                    pickerTerm.labels = labels.map(function (label) { return label.Value; });
                                                });
                                            }
                                        });
                                        return [4 /*yield*/, batch.execute()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        i = 0, len = pnpTermStores.length;
                        _a.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_4(i, len)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, returnTerms];
                }
            });
        });
    };
    /**
     * Searches for terms by provided text in specified term sets
     * @param pnpTermStore Term Store
     * @param pnpTermSets term sets where the terms should be searched for
     * @param searchText text to search
     * @param termGroupId Id of the group that contains the term sets
     */
    PnPTermStorePickerService.prototype._searchTermsInTermSets = function (pnpTermStore, pnpTermSets, searchText, termGroupId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var returnTerms, termSetGroups, termsBatch, labelsBatch, lowerCasedSearchText, _loop_5, termSetIdx, termSetLen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnTerms = [];
                        termSetGroups = {};
                        termsBatch = sp_taxonomy_1.taxonomy.createBatch();
                        labelsBatch = sp_taxonomy_1.taxonomy.createBatch();
                        lowerCasedSearchText = searchText.toLowerCase();
                        _loop_5 = function (termSetIdx, termSetLen) {
                            var pnpTermSet = pnpTermSets[termSetIdx];
                            var pnpTermSetGuid = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id);
                            if (!termGroupId) {
                                pnpTermSet.group.inBatch(termsBatch).usingCaching().get().then(function (pnpTermGroup) {
                                    termSetGroups[pnpTermSet.Id] = pnpTermGroup.Id;
                                    var loadedTerms = returnTerms.filter(function (t) { return t.termSet === pnpTermSetGuid; });
                                    loadedTerms.forEach(function (t) {
                                        t.termGroup = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                                    });
                                });
                            }
                            // getting terms for term set in batch
                            pnpTermSet.terms.inBatch(termsBatch).usingCaching().get().then(function (pnpTerms) {
                                var _loop_6 = function (termIdx, termLen) {
                                    var pnpTerm = pnpTerms[termIdx];
                                    if (pnpTerm.Name.toLowerCase().indexOf(lowerCasedSearchText) === 0) {
                                        var pickerTerm_1 = {
                                            key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTerm.Id),
                                            name: pnpTerm.Name,
                                            path: pnpTerm.PathOfTerm,
                                            termSet: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermSetGuid),
                                            termSetName: pnpTermSet.Name,
                                            termGroup: termGroupId || ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termSetGroups[pnpTermSet.Id])
                                        };
                                        returnTerms.push(pickerTerm_1);
                                        // getting labels for each term in a separate batch
                                        if (_this.props.includeLabels) {
                                            pnpTerm.labels.inBatch(labelsBatch).usingCaching().get().then(function (pnpLabels) {
                                                pickerTerm_1.labels = pnpLabels.map(function (l) { return l.Value; });
                                            });
                                        }
                                    }
                                };
                                for (var termIdx = 0, termLen = pnpTerms.length; termIdx < termLen; termIdx++) {
                                    _loop_6(termIdx, termLen);
                                }
                            });
                        };
                        for (termSetIdx = 0, termSetLen = pnpTermSets.length; termSetIdx < termSetLen; termSetIdx++) {
                            _loop_5(termSetIdx, termSetLen);
                        }
                        //
                        // executing batches
                        //
                        return [4 /*yield*/, termsBatch.execute()];
                    case 1:
                        //
                        // executing batches
                        //
                        _a.sent();
                        if (!this.props.includeLabels) return [3 /*break*/, 3];
                        return [4 /*yield*/, labelsBatch.execute()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, returnTerms];
                }
            });
        });
    };
    /**
     * Ensures (loads if needed) term stores and term groups from taxonomy service
     */
    PnPTermStorePickerService.prototype._ensureTermStores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _loop_7, this_3, i, len;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._pnpTermStores) return [3 /*break*/, 5];
                        _a = this;
                        return [4 /*yield*/, sp_taxonomy_1.taxonomy.termStores.usingCaching().get()];
                    case 1:
                        _a._pnpTermStores = _b.sent();
                        _loop_7 = function (i, len) {
                            var pnpTermStore, pnpGroups, group, pnpTermSets, groupsBatch_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        pnpTermStore = this_3._pnpTermStores[i];
                                        if (!this_3.props.limitByGroupNameOrID) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_3._requestPnPTermGroupByNameOrId(pnpTermStore, this_3.props.limitByGroupNameOrID)];
                                    case 1:
                                        group = _a.sent();
                                        pnpGroups = [];
                                        if (group) {
                                            pnpGroups.push(group);
                                        }
                                        return [3 /*break*/, 7];
                                    case 2:
                                        if (!this_3.props.limitByTermsetNameOrID) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this_3._getPnPTermSetsByNameOrId(pnpTermStore, this_3.props.limitByTermsetNameOrID)];
                                    case 3:
                                        pnpTermSets = _a.sent();
                                        pnpGroups = [];
                                        groupsBatch_1 = sp_taxonomy_1.taxonomy.createBatch();
                                        pnpTermSets.forEach(function (pnpTermSet) {
                                            pnpTermSet.group.inBatch(groupsBatch_1).usingCaching().get().then(function (pnpGroup) {
                                                if (!pnpGroups.filter(function (gr) { return gr.Id === pnpGroup.Id; }).length) {
                                                    pnpGroups.push(pnpGroup);
                                                }
                                            });
                                        });
                                        return [4 /*yield*/, groupsBatch_1.execute()];
                                    case 4:
                                        _a.sent();
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, pnpTermStore.groups.usingCaching().get()];
                                    case 6:
                                        pnpGroups = _a.sent();
                                        _a.label = 7;
                                    case 7:
                                        this_3._pnpGroups[pnpTermStore.Id] = pnpGroups;
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_3 = this;
                        i = 0, len = this._pnpTermStores.length;
                        _b.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_7(i, len)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Converts @pnp/sp-taxonomy Term Set instance into internal ITermSet object
     * @param pnpTermSet @pnp/sp-taxonomy Term Set instance
     * @param groupId Id of the group that contains the term set
     */
    PnPTermStorePickerService.prototype._pnpTermSet2TermSet = function (pnpTermSet, groupId) {
        var anyPnPTermSet = pnpTermSet; // we need this one to reference _ObjectType_ and _ObjectIdentity_
        return {
            _ObjectType_: anyPnPTermSet._ObjectType_,
            _ObjectIdentity_: anyPnPTermSet._ObjectIdentity_,
            Id: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id),
            Name: pnpTermSet.Name,
            Description: pnpTermSet.Description,
            Names: pnpTermSet.Names,
            Group: groupId
        };
    };
    /**
     * Converts @pnp/sp-taxonomy Term Group instance into internal IGroup object
     * @param pnpTermGroup @pnp/sp-taxonomy Term Group instance
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     */
    PnPTermStorePickerService.prototype._pnpTermGroup2TermGroup = function (pnpTermGroup, pnpTermStore) {
        var anyPnPTermGroup = pnpTermGroup; // we need this one to reference _ObjectType_ and _ObjectIdentity_
        return {
            _ObjectType_: anyPnPTermGroup._ObjectType_,
            _ObjectIdentity_: anyPnPTermGroup._ObjectIdentity_,
            Id: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id),
            Name: pnpTermGroup.Name,
            IsSystemGroup: pnpTermGroup.IsSystemGroup,
            TermStore: {
                Id: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpTermStore.Id),
                Name: pnpTermStore.Name
            },
            TermSets: {
                _ObjectType_: this._termSetCollectionObjectType,
                _Child_Items_: null
            }
        };
    };
    /**
     * Gets term set(s) from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     * @param termSetNameOrID term set name or id
     */
    PnPTermStorePickerService.prototype._getPnPTermSetsByNameOrId = function (pnpTermStore, termSetNameOrID) {
        return __awaiter(this, void 0, void 0, function () {
            var pnpTermSets, isGuid, pnpTermSet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isGuid = ISPTermStorePickerService_1.TermStorePickerServiceHelper.isGuid(termSetNameOrID);
                        if (!isGuid) return [3 /*break*/, 2];
                        pnpTermSets = [];
                        return [4 /*yield*/, pnpTermStore.getTermSetById(termSetNameOrID).usingCaching().get()];
                    case 1:
                        pnpTermSet = _a.sent();
                        if (pnpTermSet.Id) {
                            pnpTermSets.push(pnpTermSet);
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, pnpTermStore.getTermSetsByName(termSetNameOrID, pnpTermStore.DefaultLanguage).usingCaching().get()];
                    case 3:
                        pnpTermSets = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, pnpTermSets];
                }
            });
        });
    };
    /**
     * Gets group from cached (previously loaded) list of groups by name or id
     * @param termStoreId term store id
     * @param groupNameOrID group name or id
     */
    PnPTermStorePickerService.prototype._getPnPTermGroupsByNameOrId = function (termStoreId, groupNameOrID) {
        var isGuid = ISPTermStorePickerService_1.TermStorePickerServiceHelper.isGuid(groupNameOrID);
        var pnpTermStoreGroups = this._pnpGroups[termStoreId];
        if (pnpTermStoreGroups) {
            var groups = pnpTermStoreGroups.filter(function (pnpGroup) {
                return isGuid ? ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id) === groupNameOrID
                    : pnpGroup.Name === groupNameOrID;
            });
            if (groups && groups.length) {
                return groups[0];
            }
        }
        return null;
    };
    /**
     * Gets group from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonomy term store to work with
     * @param groupNameOrID group name or id
     */
    PnPTermStorePickerService.prototype._requestPnPTermGroupByNameOrId = function (pnpTermStore, groupNameOrID) {
        return __awaiter(this, void 0, void 0, function () {
            var isGuid, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isGuid = ISPTermStorePickerService_1.TermStorePickerServiceHelper.isGuid(groupNameOrID);
                        if (!isGuid) return [3 /*break*/, 2];
                        return [4 /*yield*/, pnpTermStore.getTermGroupById(groupNameOrID).usingCaching().get()];
                    case 1:
                        group = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, pnpTermStore.groups.getByName(groupNameOrID).usingCaching().get()];
                    case 3:
                        group = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (group.Id) {
                            return [2 /*return*/, group];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    return PnPTermStorePickerService;
}());
exports.default = PnPTermStorePickerService;

//# sourceMappingURL=PnPTermStorePickerService.js.map
