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
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var dragdrop_1 = require("office-ui-fabric-react/lib/utilities/dragdrop");
var React = require("react");
var telemetry = require("../../common/telemetry");
var PropertyFieldOrderHost_module_scss_1 = require("./PropertyFieldOrderHost.module.scss");
var sp_lodash_subset_1 = require("@microsoft/sp-lodash-subset");
var EventGroup_1 = require("@uifabric/utilities/lib/EventGroup");
var PropertyFieldOrderHost = (function (_super) {
    __extends(PropertyFieldOrderHost, _super);
    function PropertyFieldOrderHost(props, state) {
        var _this = _super.call(this, props) || this;
        _this.registerRef = function (ref) {
            _this._refs.push(ref);
        };
        _this.setupSubscriptions = function () {
            if (!_this.props.disableDragAndDrop && !_this.props.disabled) {
                _this._refs.forEach(function (value, index) {
                    _this._ddSubs.push(_this._ddHelper.subscribe(value, new EventGroup_1.EventGroup(value), {
                        eventMap: [
                            {
                                callback: function (context, event) {
                                    _this._draggedItem = context.data;
                                },
                                eventName: 'dragstart'
                            }
                        ],
                        selectionIndex: index,
                        context: { data: _this.state.items[index], index: index },
                        updateDropState: function (isDropping, event) {
                            if (isDropping) {
                                value.classList.add(PropertyFieldOrderHost_module_scss_1.default.dragEnter);
                            }
                            else {
                                value.classList.remove(PropertyFieldOrderHost_module_scss_1.default.dragEnter);
                            }
                        },
                        canDrop: function (dropContext, dragContext) {
                            return true;
                        },
                        canDrag: function (item) {
                            return true;
                        },
                        onDrop: function (item, event) {
                            if (_this._draggedItem) {
                                _this.insertBeforeItem(item);
                            }
                        },
                        /*onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
                            //Never called for some reason, so using eventMap above
                            this._draggedItem = item;
                        },*/
                        onDragEnd: function (item, event) {
                            _this._draggedItem = null;
                        }
                    }));
                });
                //Create dropable area below list to allow items to be dragged to the bottom
                if (_this._refs.length && typeof _this._lastBox !== "undefined") {
                    _this._ddSubs.push(_this._ddHelper.subscribe(_this._lastBox, new EventGroup_1.EventGroup(_this._lastBox), {
                        selectionIndex: _this._refs.length,
                        context: { data: {}, index: _this._refs.length },
                        updateDropState: function (isDropping, event) {
                            if (isDropping) {
                                _this._refs[_this._refs.length - 1].classList.add(PropertyFieldOrderHost_module_scss_1.default.dragLast);
                            }
                            else {
                                _this._refs[_this._refs.length - 1].classList.remove(PropertyFieldOrderHost_module_scss_1.default.dragLast);
                            }
                        },
                        canDrop: function (dropContext, dragContext) {
                            return true;
                        },
                        onDrop: function (item, event) {
                            if (_this._draggedItem) {
                                var itemIndex = _this.state.items.indexOf(_this._draggedItem);
                                _this.moveItemAtIndexToTargetIndex(itemIndex, _this.state.items.length - 1);
                            }
                        }
                    }));
                }
            }
        };
        _this.cleanupSubscriptions = function () {
            while (_this._ddSubs.length) {
                var sub = _this._ddSubs.pop();
                sub.dispose();
            }
        };
        _this.insertBeforeItem = function (item) {
            var itemIndex = _this.state.items.indexOf(_this._draggedItem);
            var targetIndex = _this.state.items.indexOf(item);
            if (itemIndex < targetIndex) {
                targetIndex -= 1;
            }
            _this.moveItemAtIndexToTargetIndex(itemIndex, targetIndex);
        };
        _this.onMoveUpClick = function (itemIndex) {
            if (itemIndex > 0) {
                _this.moveItemAtIndexToTargetIndex(itemIndex, itemIndex - 1);
            }
        };
        _this.onMoveDownClick = function (itemIndex) {
            if (itemIndex < _this.state.items.length - 1) {
                _this.moveItemAtIndexToTargetIndex(itemIndex, itemIndex + 1);
            }
        };
        _this.moveItemAtIndexToTargetIndex = function (itemIndex, targetIndex) {
            if (itemIndex !== targetIndex && itemIndex > -1 && targetIndex > -1 && itemIndex < _this.state.items.length && targetIndex < _this.state.items.length) {
                var items = _this.state.items;
                items.splice.apply(items, [targetIndex, 0].concat(items.splice(itemIndex, 1)[0]));
                _this.setState({
                    items: items
                });
                _this.props.valueChanged(items);
            }
        };
        telemetry.track('PropertyFieldOrder', {
            disabled: props.disabled
        });
        _this._selection = null;
        _this._ddHelper = new dragdrop_1.DragDropHelper({
            selection: _this._selection
        });
        _this._refs = new Array();
        _this._ddSubs = new Array();
        _this._draggedItem = null;
        _this.state = {
            items: []
        };
        return _this;
    }
    PropertyFieldOrderHost.prototype.render = function () {
        var _this = this;
        var items = this.state.items;
        return (React.createElement("div", { className: PropertyFieldOrderHost_module_scss_1.default.propertyFieldOrder },
            this.props.label && React.createElement(Label_1.Label, null, this.props.label),
            React.createElement("ul", { style: { maxHeight: this.props.maxHeight ? this.props.maxHeight + 'px' : '100%' }, className: !this.props.disabled ? PropertyFieldOrderHost_module_scss_1.default.enabled : PropertyFieldOrderHost_module_scss_1.default.disabled },
                (items && items.length > 0) && (items.map(function (value, index) {
                    return (React.createElement("li", { ref: _this.registerRef, key: index, draggable: !_this.props.disableDragAndDrop && !_this.props.disabled, style: { cursor: !_this.props.disableDragAndDrop && !_this.props.disabled ? 'pointer' : 'default' } }, _this.renderItem(value, index)));
                })),
                (items && items.length > 0) && React.createElement("div", { className: PropertyFieldOrderHost_module_scss_1.default.lastBox, ref: function (ref) { _this._lastBox = ref; } }))));
    };
    PropertyFieldOrderHost.prototype.renderItem = function (item, index) {
        return (React.createElement("div", null,
            React.createElement("div", { className: PropertyFieldOrderHost_module_scss_1.default.itemBox }, this.renderDisplayValue(item, index)),
            !this.props.removeArrows &&
                React.createElement("div", null, this.renderArrows(index))));
    };
    PropertyFieldOrderHost.prototype.renderDisplayValue = function (item, index) {
        if (typeof this.props.onRenderItem === "function") {
            return this.props.onRenderItem(item, index);
        }
        else {
            return (React.createElement("span", null, this.props.textProperty ? item[this.props.textProperty] : item.toString()));
        }
    };
    PropertyFieldOrderHost.prototype.renderArrows = function (index) {
        var _this = this;
        var arrowButtonStyles = {
            root: {
                width: '14px',
                height: '100%',
                display: 'inline-block !important'
            },
            rootDisabled: {
                backgroundColor: 'transparent'
            },
            icon: {
                fontSize: "10px"
            }
        };
        return (React.createElement("div", null,
            React.createElement(Button_1.IconButton, { disabled: this.props.disabled || index === 0, iconProps: { iconName: this.props.moveUpIconName }, onClick: function () { _this.onMoveUpClick(index); }, styles: arrowButtonStyles }),
            React.createElement(Button_1.IconButton, { disabled: this.props.disabled || index === this.props.items.length - 1, iconProps: { iconName: this.props.moveDownIconName }, onClick: function () { _this.onMoveDownClick(index); }, styles: arrowButtonStyles })));
    };
    PropertyFieldOrderHost.prototype.componentWillMount = function () {
        this.setState({
            items: this.props.items || []
        });
    };
    PropertyFieldOrderHost.prototype.componentDidMount = function () {
        this.setupSubscriptions();
    };
    PropertyFieldOrderHost.prototype.componentWillUpdate = function (nextProps) {
        // Check if the provided items are still the same
        if (!sp_lodash_subset_1.isEqual(nextProps.items, this.state.items)) {
            this.setState({
                items: this.props.items || []
            });
        }
    };
    PropertyFieldOrderHost.prototype.componentDidUpdate = function () {
        this.cleanupSubscriptions();
        this.setupSubscriptions();
    };
    PropertyFieldOrderHost.prototype.componentWillUnmount = function () {
        this.cleanupSubscriptions();
    };
    return PropertyFieldOrderHost;
}(React.Component));
exports.default = PropertyFieldOrderHost;

//# sourceMappingURL=PropertyFieldOrderHost.js.map
