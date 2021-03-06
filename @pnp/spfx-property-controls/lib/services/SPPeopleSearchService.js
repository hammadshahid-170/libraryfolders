"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_http_1 = require("@microsoft/sp-http");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var SPPeopleSearchMockService_1 = require("./SPPeopleSearchMockService");
/**
 * Service implementation to search people in SharePoint
 */
var SPPeopleSearchService = (function () {
    function SPPeopleSearchService() {
    }
    /**
     * Search people from the SharePoint People database
     */
    SPPeopleSearchService.prototype.searchPeople = function (ctx, query, principalType, siteUrl) {
        var _this = this;
        if (siteUrl === void 0) { siteUrl = null; }
        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return this.searchPeopleFromMock(ctx, query);
        }
        else {
            // Check the type of action to perform (gobal or local)
            if (siteUrl) {
                var userRequestUrl = siteUrl + "/_api/web/siteusers";
                // filter for principal Type
                var filterVal = "";
                if (principalType) {
                    filterVal = "?$filter=(" + principalType.map(function (type) { return "(PrincipalType eq " + type + ")"; }).join(" or ") + ")";
                }
                // Filter for hidden values
                filterVal = filterVal ? filterVal + " and (IsHiddenInUI eq false)" : "?$filter=(IsHiddenInUI eq false)";
                userRequestUrl = "" + userRequestUrl + filterVal;
                return ctx.spHttpClient.get(userRequestUrl, sp_http_1.SPHttpClient.configurations.v1, {
                    headers: {
                        'Accept': 'application/json;odata.metadata=none'
                    }
                })
                    .then(function (data) { return data.json(); })
                    .then(function (usersData) {
                    var res = [];
                    if (usersData && usersData.value && usersData.value.length > 0) {
                        res = usersData.value.filter(function (element) { return element.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || element.LoginName.toLowerCase().indexOf(query.toLowerCase()) !== -1; }).map(function (element) { return ({
                            fullName: element.Title,
                            id: element.Id.toString(),
                            login: element.LoginName,
                            email: element.Email,
                            imageUrl: _this.getUserPhotoUrl(element.Email, siteUrl),
                            initials: _this.getFullNameInitials(element.Title)
                        }); });
                    }
                    return res;
                });
            }
            else {
                // If the running env is SharePoint, loads from the peoplepicker web service
                var userRequestUrl = ctx.pageContext.web.absoluteUrl + "/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
                var data = {
                    'queryParams': {
                        'AllowEmailAddresses': true,
                        'AllowMultipleEntities': false,
                        'AllUrlZones': false,
                        'MaximumEntitySuggestions': 20,
                        'PrincipalSource': 15,
                        // PrincipalType controls the type of entities that are returned in the results.
                        // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
                        // These values can be combined (example: 13 is security + SP groups + users)
                        'PrincipalType': !!principalType && principalType.length > 0 ? principalType.reduce(function (a, b) { return a + b; }, 0) : 1,
                        'QueryString': query
                    }
                };
                var httpPostOptions = {
                    headers: {
                        'accept': 'application/json',
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                // Do the call against the People REST API endpoint
                return ctx.spHttpClient.post(userRequestUrl, sp_http_1.SPHttpClient.configurations.v1, httpPostOptions).then(function (searchResponse) {
                    return searchResponse.json().then(function (usersResponse) {
                        var res = [];
                        var values = JSON.parse(usersResponse.value);
                        res = values.map(function (element) {
                            switch (element.EntityType) {
                                case 'User':
                                    var groupOrPerson = { fullName: element.DisplayText, login: element.Description };
                                    groupOrPerson.email = element.EntityData.Email;
                                    groupOrPerson.jobTitle = element.EntityData.Title;
                                    groupOrPerson.initials = _this.getFullNameInitials(groupOrPerson.fullName);
                                    groupOrPerson.imageUrl = _this.getUserPhotoUrl(groupOrPerson.email, ctx.pageContext.web.absoluteUrl);
                                    return groupOrPerson;
                                case 'SecGroup':
                                    var group = {
                                        fullName: element.DisplayText,
                                        login: element.ProviderName,
                                        id: element.Key,
                                        description: element.Description
                                    };
                                    return group;
                                case 'FormsRole':
                                    var formsRole = {
                                        fullName: element.DisplayText,
                                        login: element.ProviderName,
                                        id: element.Key,
                                        description: element.Description
                                    };
                                    return formsRole;
                                default:
                                    var persona = {
                                        fullName: element.DisplayText,
                                        login: element.EntityData.AccountName,
                                        id: element.EntityData.SPGroupID,
                                        description: element.Description
                                    };
                                    return persona;
                            }
                        });
                        return res;
                    });
                });
            }
        }
    };
    /**
     * Generates Initials from a full name
     */
    SPPeopleSearchService.prototype.getFullNameInitials = function (fullName) {
        if (fullName === null) {
            return fullName;
        }
        var words = fullName.split(' ');
        if (words.length === 0) {
            return '';
        }
        else if (words.length === 1) {
            return words[0].charAt(0);
        }
        else {
            return (words[0].charAt(0) + words[1].charAt(0));
        }
    };
    /**
     * Gets the user photo url
     */
    SPPeopleSearchService.prototype.getUserPhotoUrl = function (userEmail, siteUrl) {
        if (userEmail) {
            return siteUrl + "/_layouts/15/userphoto.aspx?size=S&accountname=" + userEmail;
        }
        return null;
    };
    /**
     * Returns fake people results for the Mock mode
     */
    SPPeopleSearchService.prototype.searchPeopleFromMock = function (ctx, query) {
        return SPPeopleSearchMockService_1.default.searchPeople(ctx.pageContext.web.absoluteUrl).then(function () {
            var results = [
                { fullName: 'Katie Jordan', initials: 'KJ', jobTitle: 'VIP Marketing', email: 'katiej@contoso.com', login: 'katiej@contoso.com' },
                { fullName: 'Gareth Fort', initials: 'GF', jobTitle: 'Sales Lead', email: 'garethf@contoso.com', login: 'garethf@contoso.com' },
                { fullName: 'Sara Davis', initials: 'SD', jobTitle: 'Assistant', email: 'sarad@contoso.com', login: 'sarad@contoso.com' },
                { fullName: 'John Doe', initials: 'JD', jobTitle: 'Developer', email: 'johnd@contoso.com', login: 'johnd@contoso.com' }
            ];
            return results;
        });
    };
    return SPPeopleSearchService;
}());
exports.default = SPPeopleSearchService;

//# sourceMappingURL=SPPeopleSearchService.js.map
