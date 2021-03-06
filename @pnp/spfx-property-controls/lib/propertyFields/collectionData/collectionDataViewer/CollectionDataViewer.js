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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropertyFieldCollectionDataHost_module_scss_1 = require("../PropertyFieldCollectionDataHost.module.scss");
var collectionDataItem_1 = require("../collectionDataItem");
var Button_1 = require("office-ui-fabric-react/lib/components/Button");
var Icon_1 = require("office-ui-fabric-react/lib/components/Icon");
var strings = require("PropertyControlStrings");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var CollectionDataViewer = (function (_super) {
    __extends(CollectionDataViewer, _super);
    function CollectionDataViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.SORT_IDX = "sortIdx";
        /**
         * Add a new item to the collection
         */
        _this.addItem = function (item) {
            _this.setState(function (prevState) {
                var crntItems = prevState.crntItems.concat([item]);
                crntItems = _this.updateSortProperty(crntItems);
                return {
                    crntItems: crntItems,
                    inCreationItem: null
                };
            });
        };
        /**
         * Remove an item from the collection
         */
        _this.updateItem = function (idx, item) {
            _this.setState(function (prevState) {
                var crntItems = prevState.crntItems;
                // Update the item in the array
                crntItems[idx] = item;
                return { crntItems: crntItems };
            });
        };
        /**
         * Remove an item from the collection
         */
        _this.deleteItem = function (idx) {
            _this.setState(function (prevState) {
                var crntItems = prevState.crntItems;
                crntItems.splice(idx, 1);
                // Update the sort propety
                crntItems = _this.updateSortProperty(crntItems);
                return {
                    crntItems: sp_lodash_subset_1.sortBy(crntItems, _this.SORT_IDX)
                };
            });
        };
        /**
         * Validate every item
         */
        _this.validateItem = function (idx, isValid) {
            _this.setState(function (prevState) {
                var validation = prevState.validation;
                validation[idx] = isValid;
                return {
                    validation: prevState.validation
                };
            });
        };
        /**
         * Currently in creation
         */
        _this.addInCreation = function (item) {
            _this.setState({
                inCreationItem: item
            });
        };
        /**
         * Add the item and save the form
         */
        _this.addAndSave = function () {
            // Check if the item is not empty
            if (_this.state.inCreationItem) {
                _this.props.fOnSave(_this.state.crntItems.concat([_this.state.inCreationItem]));
            }
            else {
                _this.onSave();
            }
        };
        /**
         * Update the sort order
         */
        _this.updateSortOrder = function (oldIdx, newIdx) {
            _this.setState(function (prevState) {
                var crntItems = prevState.crntItems;
                var newOrderedItems = sp_lodash_subset_1.cloneDeep(crntItems);
                newOrderedItems = _this.moveItemTo(newOrderedItems, oldIdx, newIdx - 1);
                newOrderedItems = _this.updateSortProperty(newOrderedItems);
                newOrderedItems = sp_lodash_subset_1.sortBy(newOrderedItems, _this.SORT_IDX);
                return {
                    crntItems: newOrderedItems
                };
            });
        };
        /**
         * Save the collection data
         */
        _this.onSave = function () {
            _this.props.fOnSave(_this.state.crntItems);
        };
        /**
         * Cancel
         */
        _this.onCancel = function () {
            _this.props.fOnClose();
        };
        _this.state = {
            crntItems: [],
            inCreationItem: null,
            validation: {}
        };
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    CollectionDataViewer.prototype.componentDidMount = function () {
        var _this = this;
        var crntItems = this.props.value ? sp_lodash_subset_1.sortBy(sp_lodash_subset_1.cloneDeep(this.props.value), this.SORT_IDX) : [];
        crntItems = crntItems.map(function (item, idx) {
            if (!item[_this.SORT_IDX]) {
                item[_this.SORT_IDX] = idx + 1;
            }
            return item;
        });
        // Update the sort propety
        crntItems = this.updateSortProperty(crntItems);
        this.setState({
            crntItems: sp_lodash_subset_1.sortBy(crntItems, this.SORT_IDX)
        });
    };
    /**
     * Check if all items are valid
     */
    CollectionDataViewer.prototype.allItemsValid = function () {
        var validation = this.state.validation;
        if (validation) {
            var keys = Object.keys(validation);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (!validation[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Move an item in the array
     *
     * @param crntItems
     * @param oldIdx
     * @param newIdx
     */
    CollectionDataViewer.prototype.moveItemTo = function (crntItems, oldIdx, newIdx) {
        if (newIdx > -1 && newIdx < crntItems.length) {
            var removedElement = crntItems.splice(oldIdx, 1)[0];
            if (removedElement) {
                crntItems.splice(newIdx, 0, removedElement);
            }
        }
        return crntItems;
    };
    /**
     * Update the sort property
     *
     * @param crntItems
     */
    CollectionDataViewer.prototype.updateSortProperty = function (crntItems) {
        var _this = this;
        // Update the sort order
        return crntItems.map(function (item, itemIdx) {
            item[_this.SORT_IDX] = itemIdx + 1;
            return item;
        });
    };
    /**
     * Default React render
     */
    CollectionDataViewer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "PropertyFieldCollectionData__panel__table " + PropertyFieldCollectionDataHost_module_scss_1.default.table + " " + (this.props.tableClassName || "") },
                React.createElement("div", { className: "PropertyFieldCollectionData__panel__table-head " + PropertyFieldCollectionDataHost_module_scss_1.default.tableRow + " " + PropertyFieldCollectionDataHost_module_scss_1.default.tableHead },
                    this.props.enableSorting && (React.createElement("span", { className: "PropertyFieldCollectionData__panel__table-cell " + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell })),
                    this.props.fields.map(function (f) { return (React.createElement("span", { key: "dataviewer-" + f.id, className: "PropertyFieldCollectionData__panel__table-cell " + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell },
                        f.title,
                        " ",
                        f.required && React.createElement(Icon_1.Icon, { className: PropertyFieldCollectionDataHost_module_scss_1.default.required, iconName: "Asterisk" }))); }),
                    React.createElement("span", { className: "PropertyFieldCollectionData__panel__table-cell " + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell }),
                    React.createElement("span", { className: "PropertyFieldCollectionData__panel__table-cell " + PropertyFieldCollectionDataHost_module_scss_1.default.tableCell })),
                (this.state.crntItems && this.state.crntItems.length > 0) && (this.state.crntItems.map(function (item, idx, allItems) { return (React.createElement(collectionDataItem_1.CollectionDataItem, { key: item.uniqueId, fields: _this.props.fields, index: idx, item: item, totalItems: allItems.length, sortingEnabled: _this.props.enableSorting, disableItemDeletion: _this.props.disableItemDeletion, fUpdateItem: _this.updateItem, fDeleteItem: _this.deleteItem, fValidation: _this.validateItem, fOnSorting: _this.updateSortOrder })); })),
                !this.props.disableItemCreation && (React.createElement(collectionDataItem_1.CollectionDataItem, { fields: this.props.fields, index: null, item: null, sortingEnabled: this.props.enableSorting, totalItems: null, fAddItem: this.addItem, fAddInCreation: this.addInCreation }))),
            (!this.state.crntItems || this.state.crntItems.length === 0) && (React.createElement("p", { className: "PropertyFieldCollectionData__panel__no-collection-data " + PropertyFieldCollectionDataHost_module_scss_1.default.noCollectionData }, strings.CollectionDataEmptyValue)),
            React.createElement("div", { className: "PropertyFieldCollectionData__panel__actions " + PropertyFieldCollectionDataHost_module_scss_1.default.panelActions },
                this.state.inCreationItem && React.createElement(Button_1.PrimaryButton, { text: this.props.saveAndAddBtnLabel || strings.CollectionSaveAndAddButtonLabel, onClick: this.addAndSave, disabled: !this.allItemsValid(), className: "PropertyFieldCollectionData__panel__action__add" }),
                !this.state.inCreationItem && React.createElement(Button_1.PrimaryButton, { text: this.props.saveBtnLabel || strings.SaveButtonLabel, onClick: this.onSave, disabled: !this.allItemsValid(), className: "PropertyFieldCollectionData__panel__action__save" }),
                React.createElement(Button_1.DefaultButton, { text: this.props.cancelBtnLabel || strings.CancelButtonLabel, onClick: this.onCancel, className: "PropertyFieldCollectionData__panel__action__cancel" }))));
    };
    return CollectionDataViewer;
}(React.Component));
exports.CollectionDataViewer = CollectionDataViewer;

//# sourceMappingURL=CollectionDataViewer.js.map
