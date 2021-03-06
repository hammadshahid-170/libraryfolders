"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
/**
 * Helper class with some methods that can be used in any Term Store Picker Service implementation
 */
var TermStorePickerServiceHelper = (function () {
    function TermStorePickerServiceHelper() {
    }
    /**
     * Cleans the Guid from the Web Service response
     * @param guid
     */
    TermStorePickerServiceHelper.cleanGuid = function (guid) {
        if (guid !== undefined) {
            return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
        }
        else {
            return '';
        }
    };
    /**
     * Checks if the provided string is a GUID
     * @param strGuid string to check
     */
    TermStorePickerServiceHelper.isGuid = function (strGuid) {
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(strGuid);
    };
    /**
     * Sorting terms based on their path and depth
     *
     * @param terms
     */
    TermStorePickerServiceHelper.sortTerms = function (terms) {
        // Start sorting by depth
        var newTermsOrder = [];
        var itemsToSort = true;
        var pathLevel = 1;
        while (itemsToSort) {
            // Get terms for the current level
            var crntTerms = terms.filter(function (term) { return term.PathDepth === pathLevel; });
            if (crntTerms && crntTerms.length > 0) {
                crntTerms = crntTerms.sort(this.sortTermByPath);
                if (pathLevel !== 1) {
                    crntTerms = crntTerms.reverse();
                    var _loop_1 = function (crntTerm) {
                        var pathElms = crntTerm.PathOfTerm.split(";");
                        // Last item is not needed for parent path
                        pathElms.pop();
                        // Find the parent item and add the new item
                        var idx = sp_lodash_subset_1.findIndex(newTermsOrder, function (term) { return term.PathOfTerm === pathElms.join(";"); });
                        if (idx !== -1) {
                            newTermsOrder.splice(idx + 1, 0, crntTerm);
                        }
                        else {
                            // Push the item at the end if the parent couldn't be found
                            newTermsOrder.push(crntTerm);
                        }
                    };
                    for (var _i = 0, crntTerms_1 = crntTerms; _i < crntTerms_1.length; _i++) {
                        var crntTerm = crntTerms_1[_i];
                        _loop_1(crntTerm);
                    }
                }
                else {
                    newTermsOrder = crntTerms;
                }
                ++pathLevel;
            }
            else {
                itemsToSort = false;
            }
        }
        return newTermsOrder;
    };
    /**
     * Sort the terms by their path
     *
     * @param a term 2
     * @param b term 2
     */
    TermStorePickerServiceHelper.sortTermByPath = function (a, b) {
        if (a.PathOfTerm < b.PathOfTerm) {
            return -1;
        }
        if (a.PathOfTerm > b.PathOfTerm) {
            return 1;
        }
        return 0;
    };
    return TermStorePickerServiceHelper;
}());
exports.TermStorePickerServiceHelper = TermStorePickerServiceHelper;

//# sourceMappingURL=ISPTermStorePickerService.js.map
