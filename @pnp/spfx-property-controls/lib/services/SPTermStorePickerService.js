"use strict";
/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */
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
var ISPTermStorePickerService_1 = require("./ISPTermStorePickerService");
var SPTermStorePickerMockService_1 = require("./SPTermStorePickerMockService");
/**
 * Service implementation to manage term stores in SharePoint
 */
var SPTermStorePickerService = (function () {
    /**
     * Service constructor
     */
    function SPTermStorePickerService(props, context) {
        this.props = props;
        this.context = context;
        this.clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
    }
    /**
     * Gets the collection of term stores in the current SharePoint env
     */
    SPTermStorePickerService.prototype.getTermStores = function () {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return this.getTermStoresFromMock();
        }
        else {
            // Retrieve the term store name, groups, and term sets
            var data = '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="2" ObjectPathId="1" /><ObjectIdentityQuery Id="3" ObjectPathId="1" /><ObjectPath Id="5" ObjectPathId="4" /><ObjectIdentityQuery Id="6" ObjectPathId="4" /><Query Id="7" ObjectPathId="4"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /><Property Name="Name" ScalarProperty="true" /><Property Name="Groups"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="IsSystemGroup" ScalarProperty="true" /><Property Name="TermSets"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="Names" ScalarProperty="true" /></Properties></ChildItemQuery></Property></Properties></ChildItemQuery></Property></Properties></Query></Query></Actions><ObjectPaths><StaticMethod Id="1" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="4" ParentId="1" Name="GetDefaultSiteCollectionTermStore" /></ObjectPaths></Request>';
            var reqHeaders = new Headers();
            reqHeaders.append("accept", "application/json");
            reqHeaders.append("content-type", "application/xml");
            var httpPostOptions = {
                headers: reqHeaders,
                body: data
            };
            return this.context.spHttpClient.post(this.clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                return serviceResponse.json().then(function (serviceJSONResponse) {
                    // Construct results
                    var termStoreResult = serviceJSONResponse.filter(function (r) { return r['_ObjectType_'] === 'SP.Taxonomy.TermStore'; });
                    // Check if term store was retrieved
                    if (termStoreResult.length > 0) {
                        // Check if the termstore needs to be filtered or limited
                        if (_this.props.limitByGroupNameOrID || _this.props.limitByTermsetNameOrID || _this.props.excludeSystemGroup) {
                            return termStoreResult.map(function (termstore) {
                                var termGroups = termstore.Groups._Child_Items_;
                                // Check if the groups have to be limited to a specific group name or ID
                                if (_this.props.limitByGroupNameOrID) {
                                    var groupNameOrId_1 = _this.props.limitByGroupNameOrID;
                                    termGroups = termGroups.filter(function (group) { return group.Name === groupNameOrId_1 || group.Id.toLowerCase() === groupNameOrId_1.toLowerCase(); });
                                }
                                // Check if the groups have to be limited to a specific term set
                                if (_this.props.limitByTermsetNameOrID) {
                                    var termsetNameOrId_1 = _this.props.limitByTermsetNameOrID;
                                    termGroups = termGroups.map(function (group) {
                                        group.TermSets._Child_Items_ = group.TermSets._Child_Items_.filter(function (termSet) { return termSet.Name === termsetNameOrId_1 || ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termSet.Id).toLowerCase() === ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termsetNameOrId_1).toLowerCase(); });
                                        return group;
                                    });
                                }
                                // Filter out all systen groups
                                if (_this.props.excludeSystemGroup) {
                                    termGroups = termGroups.filter(function (group) { return !group.IsSystemGroup; });
                                }
                                // Filter out empty groups
                                termGroups = termGroups.filter(function (group) { return group.TermSets._Child_Items_.length > 0; });
                                // Map the new groups
                                termstore.Groups._Child_Items_ = termGroups;
                                return termstore;
                            });
                        }
                        // Return the term store results
                        return termStoreResult;
                    }
                    return [];
                });
            });
        }
    };
    /**
     * Gets the current term set
     */
    SPTermStorePickerService.prototype.getTermSets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var termStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getTermStores()];
                    case 1:
                        termStore = _a.sent();
                        return [2 /*return*/, this.getAllTermSets(termStore, this.props.limitByTermsetNameOrID)];
                }
            });
        });
    };
    /**
     * Get the term set ID by its name
     * @param termstore
     * @param termset
     */
    SPTermStorePickerService.prototype.getAllTermSets = function (termstore, termsetNameOrId) {
        if (termstore && termstore.length > 0) {
            // Get the first term store
            var ts = termstore[0];
            var termSets = [];
            // Check if the term store contains groups
            if (ts.Groups && ts.Groups._Child_Items_) {
                for (var _i = 0, _a = ts.Groups._Child_Items_; _i < _a.length; _i++) {
                    var group = _a[_i];
                    // Check if the group contains term sets
                    if (group.TermSets && group.TermSets._Child_Items_) {
                        if (termsetNameOrId) {
                            for (var _b = 0, _c = group.TermSets._Child_Items_; _b < _c.length; _b++) {
                                var termSet = _c[_b];
                                // Check if the term set is found
                                if (termSet.Name === termsetNameOrId || termSet.Id.indexOf(termsetNameOrId) !== -1) {
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
            return termSets;
        }
        return null;
    };
    /**
     * Retrieve all terms for the given term set
     * @param termsetId
     */
    SPTermStorePickerService.prototype.getAllTerms = function (termSet) {
        return __awaiter(this, void 0, void 0, function () {
            var data, reqHeaders, httpPostOptions;
            return __generator(this, function (_a) {
                if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
                    // If the running environment is local, load the data from the mock
                    return [2 /*return*/, this.getAllMockTerms()];
                }
                else {
                    data = "<Request AddExpandoFieldTypeSuffix=\"true\" SchemaVersion=\"15.0.0.0\" LibraryVersion=\"16.0.0.0\" ApplicationName=\".NET Library\" xmlns=\"http://schemas.microsoft.com/sharepoint/clientquery/2009\"><Actions><ObjectPath Id=\"30\" ObjectPathId=\"29\" /><Query Id=\"31\" ObjectPathId=\"29\"><Query SelectAllProperties=\"false\"><Properties /></Query><ChildItemQuery SelectAllProperties=\"false\"><Properties><Property Name=\"Name\" ScalarProperty=\"true\" /><Property Name=\"Id\" ScalarProperty=\"true\" /><Property Name=\"Description\" ScalarProperty=\"true\" /><Property Name=\"IsDeprecated\" ScalarProperty=\"true\" /><Property Name=\"IsAvailableForTagging\" ScalarProperty=\"true\" /><Property Name=\"IsRoot\" ScalarProperty=\"true\" /><Property Name=\"PathOfTerm\" ScalarProperty=\"true\" /><Property Name=\"TermSet\" SelectAll=\"true\" /><Property Name=\"Parent\" SelectAll=\"true\"><Query SelectAllProperties=\"false\"><Properties /></Query></Property><Property Name=\"TermSet\"><Query SelectAllProperties=\"false\"><Properties><Property Name=\"Id\" ScalarProperty=\"true\" /></Properties></Query></Property></Properties></ChildItemQuery></Query></Actions><ObjectPaths><Method Id=\"29\" ParentId=\"18\" Name=\"GetAllTerms\" /><Identity Id=\"18\" Name=\"" + termSet._ObjectIdentity_ + "\"\n      /></ObjectPaths></Request>";
                    reqHeaders = new Headers();
                    reqHeaders.append("accept", "application/json");
                    reqHeaders.append("content-type", "application/xml");
                    httpPostOptions = {
                        headers: reqHeaders,
                        body: data
                    };
                    return [2 /*return*/, this.context.spHttpClient.post(this.clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                            return serviceResponse.json().then(function (serviceJSONResponse) {
                                // Retrieve the term collection results
                                var termStoreResult = serviceJSONResponse.filter(function (r) { return r['_ObjectType_'] === 'SP.Taxonomy.TermCollection'; });
                                if (termStoreResult.length > 0) {
                                    // Retrieve all terms
                                    var terms = termStoreResult[0]._Child_Items_;
                                    // Clean the term ID and specify the path depth
                                    terms = terms.map(function (term) {
                                        term.Id = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(term.Id);
                                        term['PathDepth'] = term.PathOfTerm.split(';').length;
                                        return term;
                                    });
                                    // Check if the term set was not empty
                                    if (terms.length > 0) {
                                        // Sort the terms by PathOfTerm and their depth
                                        return ISPTermStorePickerService_1.TermStorePickerServiceHelper.sortTerms(terms);
                                    }
                                }
                                return null;
                            });
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Retrieve all terms that starts with the searchText
     * @param searchText
     */
    SPTermStorePickerService.prototype.searchTermsByName = function (searchText) {
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStorePickerMockService_1.default.searchTermsByName(searchText);
        }
        else {
            if (this.props.limitByTermsetNameOrID) {
                return this.searchTermsByTermSet(searchText, this.props.limitByTermsetNameOrID);
            }
            else if (this.props.limitByGroupNameOrID) {
                return this.searchTermsByGroup(searchText);
            }
            else {
                return this.searchAllTerms(searchText);
            }
        }
    };
    SPTermStorePickerService.prototype.getGroupTermSets = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, group.TermSets];
            });
        });
    };
    /**
       * Searches terms for the given term set
       * @param searchText
       * @param termsetId
       */
    SPTermStorePickerService.prototype.searchTermsByTermSet = function (searchText, termSet) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStorePickerMockService_1.default.searchTermsByName(searchText);
        }
        else {
            return new Promise(function (resolve) {
                _this.getTermStores().then(function (termStore) {
                    var TermSetId = termSet;
                    if (!ISPTermStorePickerService_1.TermStorePickerServiceHelper.isGuid(termSet)) {
                        TermSetId = ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termStore[0].Groups._Child_Items_[0].TermSets._Child_Items_[0].Id);
                    }
                    var group = _this.getTermGroupByTermSetId(TermSetId, termStore);
                    var data = "<Request xmlns=\"http://schemas.microsoft.com/sharepoint/clientquery/2009\" SchemaVersion=\"15.0.0.0\" LibraryVersion=\"16.0.0.0\" ApplicationName=\"Javascript Library\"><Actions><ObjectPath Id=\"456\" ObjectPathId=\"455\" /><ObjectIdentityQuery Id=\"457\" ObjectPathId=\"455\" /><ObjectPath Id=\"459\" ObjectPathId=\"458\" /><ObjectIdentityQuery Id=\"460\" ObjectPathId=\"458\" /><ObjectPath Id=\"462\" ObjectPathId=\"461\" /><ObjectIdentityQuery Id=\"463\" ObjectPathId=\"461\" /><ObjectPath Id=\"465\" ObjectPathId=\"464\" /><SetProperty Id=\"466\" ObjectPathId=\"464\" Name=\"TermLabel\"><Parameter Type=\"String\">" + searchText + "</Parameter></SetProperty><SetProperty Id=\"467\" ObjectPathId=\"464\" Name=\"DefaultLabelOnly\"><Parameter Type=\"Boolean\">true</Parameter></SetProperty><SetProperty Id=\"468\" ObjectPathId=\"464\" Name=\"StringMatchOption\"><Parameter Type=\"Number\">0</Parameter></SetProperty><SetProperty Id=\"469\" ObjectPathId=\"464\" Name=\"ResultCollectionSize\"><Parameter Type=\"Number\">10</Parameter></SetProperty><SetProperty Id=\"470\" ObjectPathId=\"464\" Name=\"TrimUnavailable\"><Parameter Type=\"Boolean\">true</Parameter></SetProperty><ObjectPath Id=\"472\" ObjectPathId=\"471\" /><Query Id=\"473\" ObjectPathId=\"471\"><Query SelectAllProperties=\"false\"><Properties /></Query><ChildItemQuery SelectAllProperties=\"false\"><Properties><Property Name=\"IsRoot\" SelectAll=\"true\" /><Property Name=\"Id\" SelectAll=\"true\" /><Property Name=\"Name\" SelectAll=\"true\" /><Property Name=\"PathOfTerm\" SelectAll=\"true\" /><Property Name=\"TermSet\" SelectAll=\"true\" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id=\"455\" Name=\"GetTaxonomySession\" TypeId=\"{981cbc68-9edc-4f8d-872f-71146fcbb84f}\" /><Method Id=\"458\" ParentId=\"455\" Name=\"GetDefaultKeywordsTermStore\" /><Method Id=\"461\" ParentId=\"458\" Name=\"GetTermSet\"><Parameters><Parameter Type=\"Guid\">" + TermSetId + "</Parameter></Parameters></Method><Constructor Id=\"464\" TypeId=\"{61a1d689-2744-4ea3-a88b-c95bee9803aa}\" /><Method Id=\"471\" ParentId=\"461\" Name=\"GetTerms\"><Parameters><Parameter ObjectPathId=\"464\" /></Parameters></Method></ObjectPaths></Request>";
                    var reqHeaders = new Headers();
                    reqHeaders.append("accept", "application/json");
                    reqHeaders.append("content-type", "application/xml");
                    var httpPostOptions = {
                        headers: reqHeaders,
                        body: data
                    };
                    return _this.context.spHttpClient.post(_this.clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                        return serviceResponse.json().then(function (serviceJSONResponse) {
                            // Retrieve the term collection results
                            var termStoreResult = serviceJSONResponse.filter(function (r) { return r['_ObjectType_'] === 'SP.Taxonomy.TermCollection'; });
                            if (termStoreResult.length > 0) {
                                // Retrieve all terms
                                var terms = termStoreResult[0]._Child_Items_;
                                var returnTerms_1 = [];
                                terms.forEach(function (term) {
                                    if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                                        returnTerms_1.push({
                                            key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(term.Id),
                                            name: term.Name,
                                            path: term.PathOfTerm,
                                            termSet: term.TermSet.Id,
                                            termSetName: term.TermSet.Name,
                                            termGroup: group ? ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(group.Id) : ''
                                        });
                                    }
                                });
                                resolve(returnTerms_1);
                            }
                            return null;
                        });
                    });
                });
            });
        }
    };
    /**
     * Searches terms for a group
     * @param searchText
     */
    SPTermStorePickerService.prototype.searchTermsByGroup = function (searchText) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStorePickerMockService_1.default.searchTermsByName(searchText);
        }
        else {
            return new Promise(function (resolve) {
                _this.getTermStores().then(function (termStore) {
                    var termSetTerms = [];
                    termStore[0].Groups._Child_Items_[0].TermSets._Child_Items_.forEach(function (ts) {
                        termSetTerms.push(_this.getAllTerms(ts));
                    });
                    Promise.all(termSetTerms).then(function (results) {
                        var returnTerms = [];
                        results.forEach(function (terms) {
                            if (terms) {
                                terms.forEach(function (term) {
                                    if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                                        returnTerms.push({
                                            key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(term.Id),
                                            name: term.Name,
                                            path: term.PathOfTerm,
                                            termSet: term.TermSet.Id,
                                            termSetName: term.TermSet.Name,
                                            termGroup: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(termStore[0].Groups._Child_Items_[0].Id) // ??? I don't know why we always work with the 1st group
                                        });
                                    }
                                });
                            }
                        });
                        resolve(returnTerms);
                    });
                });
            });
        }
    };
    /**
     * Searches terms in termstore
     * @param searchText
     */
    SPTermStorePickerService.prototype.searchAllTerms = function (searchText) {
        var _this = this;
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStorePickerMockService_1.default.searchTermsByName(searchText);
        }
        else {
            return new Promise(function (resolve) {
                var data = "<Request xmlns=\"http://schemas.microsoft.com/sharepoint/clientquery/2009\" SchemaVersion=\"15.0.0.0\" LibraryVersion=\"16.0.0.0\" ApplicationName=\"Javascript Library\"><Actions><ObjectPath Id=\"775\" ObjectPathId=\"774\" /><ObjectIdentityQuery Id=\"776\" ObjectPathId=\"774\" /><ObjectPath Id=\"778\" ObjectPathId=\"777\" /><ObjectIdentityQuery Id=\"779\" ObjectPathId=\"777\" /><ObjectPath Id=\"781\" ObjectPathId=\"780\" /><SetProperty Id=\"782\" ObjectPathId=\"780\" Name=\"TermLabel\"><Parameter Type=\"String\">" + searchText + "</Parameter></SetProperty><SetProperty Id=\"783\" ObjectPathId=\"780\" Name=\"DefaultLabelOnly\"><Parameter Type=\"Boolean\">true</Parameter></SetProperty><SetProperty Id=\"784\" ObjectPathId=\"780\" Name=\"StringMatchOption\"><Parameter Type=\"Number\">0</Parameter></SetProperty><SetProperty Id=\"785\" ObjectPathId=\"780\" Name=\"ResultCollectionSize\"><Parameter Type=\"Number\">10</Parameter></SetProperty><SetProperty Id=\"786\" ObjectPathId=\"780\" Name=\"TrimUnavailable\"><Parameter Type=\"Boolean\">true</Parameter></SetProperty><ObjectPath Id=\"788\" ObjectPathId=\"787\" /><Query Id=\"789\" ObjectPathId=\"787\"><Query SelectAllProperties=\"false\"><Properties /></Query><ChildItemQuery SelectAllProperties=\"false\"><Properties><Property Name=\"IsRoot\" SelectAll=\"true\" /><Property Name=\"Id\" SelectAll=\"true\" /><Property Name=\"Name\" SelectAll=\"true\" /><Property Name=\"PathOfTerm\" SelectAll=\"true\" /><Property Name=\"TermSet\" SelectAll=\"true\" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id=\"774\" Name=\"GetTaxonomySession\" TypeId=\"{981cbc68-9edc-4f8d-872f-71146fcbb84f}\" /><Method Id=\"777\" ParentId=\"774\" Name=\"GetDefaultKeywordsTermStore\" /><Constructor Id=\"780\" TypeId=\"{61a1d689-2744-4ea3-a88b-c95bee9803aa}\" /><Method Id=\"787\" ParentId=\"777\" Name=\"GetTerms\"><Parameters><Parameter ObjectPathId=\"780\" /></Parameters></Method></ObjectPaths></Request>";
                var reqHeaders = new Headers();
                reqHeaders.append("accept", "application/json");
                reqHeaders.append("content-type", "application/xml");
                var httpPostOptions = {
                    headers: reqHeaders,
                    body: data
                };
                return _this.context.spHttpClient.post(_this.clientServiceUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (serviceResponse) {
                    return serviceResponse.json().then(function (serviceJSONResponse) {
                        // Retrieve the term collection results
                        var termStoreResult = serviceJSONResponse.filter(function (r) { return r['_ObjectType_'] === 'SP.Taxonomy.TermCollection'; });
                        if (termStoreResult.length > 0) {
                            // Retrieve all terms
                            var terms = termStoreResult[0]._Child_Items_;
                            var returnTerms_2 = [];
                            terms.forEach(function (term) {
                                if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                                    returnTerms_2.push({
                                        key: ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(term.Id),
                                        name: term.Name,
                                        path: term.PathOfTerm,
                                        termSet: term.TermSet.Id,
                                        termSetName: term.TermSet.Name,
                                        termGroup: '' // didn't find a way to simply get Group in that situation. It won't affect functionality. Only switch between TermStorePicker and EnterpriseTermStorePicker
                                    });
                                }
                            });
                            resolve(returnTerms_2);
                        }
                        return null;
                    });
                });
            });
        }
    };
    /**
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    SPTermStorePickerService.prototype.getTermStoresFromMock = function () {
        return SPTermStorePickerMockService_1.default.getTermStores(this.context.pageContext.web.absoluteUrl).then(function (data) {
            return data;
        });
    };
    /**
     * Returns 3 fake SharePoint lists for the Mock mode
     */
    SPTermStorePickerService.prototype.getAllMockTerms = function () {
        return SPTermStorePickerMockService_1.default.getAllTerms().then(function (data) {
            return data;
        });
    };
    SPTermStorePickerService.prototype.getTermGroupByTermSetId = function (termSetId, termStores) {
        for (var i = 0, len = termStores.length; i < len; i++) {
            var termStore = termStores[i];
            for (var groupIdx = 0, groupsLen = termStore.Groups._Child_Items_.length; groupIdx < groupsLen; groupIdx++) {
                var group = termStore.Groups._Child_Items_[groupIdx];
                if (group.TermSets._Child_Items_.filter(function (ts) { return ISPTermStorePickerService_1.TermStorePickerServiceHelper.cleanGuid(ts.Id) === termSetId; }).length) {
                    return group;
                }
            }
        }
        return null;
    };
    return SPTermStorePickerService;
}());
exports.default = SPTermStorePickerService;

//# sourceMappingURL=SPTermStorePickerService.js.map
