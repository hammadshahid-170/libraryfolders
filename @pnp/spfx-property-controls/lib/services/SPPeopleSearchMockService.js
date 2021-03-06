"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a http client to request mock data to use the web part with the local workbench
 */
var SPPeoplePickerMockHttpClient = (function () {
    function SPPeoplePickerMockHttpClient() {
    }
    /**
     * Mock search People method
     */
    SPPeoplePickerMockHttpClient.searchPeople = function (restUrl, options) {
        return new Promise(function (resolve) {
            resolve(SPPeoplePickerMockHttpClient._results);
        });
    };
    /**
     * Mock SharePoint result sample
     */
    SPPeoplePickerMockHttpClient._results = [];
    return SPPeoplePickerMockHttpClient;
}());
exports.default = SPPeoplePickerMockHttpClient;

//# sourceMappingURL=SPPeopleSearchMockService.js.map
