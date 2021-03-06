"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var propertyPaneSpinner_1 = require("../common/propertyPaneSpinner");
var PropertyPaneHelpers = (function () {
    function PropertyPaneHelpers() {
    }
    /**
     * Add a spinner for the `loadPropertyPaneResources` method
     */
    PropertyPaneHelpers.setSpinner = function (props) {
        var _this = this;
        this.clearSpinner();
        var className = ".spPropertyPaneContainer";
        this.waitForElement(className).then(function (propPanelElm) {
            if (propPanelElm) {
                _this.propertyPaneElm = propPanelElm;
                var spinnerElm = document.createElement("div");
                spinnerElm.style.height = "100%";
                spinnerElm.style.backgroundColor = props && props.bgColor ? props.bgColor : "rgba(255, 255, 255, 0.8)";
                spinnerElm.style.zIndex = "99";
                spinnerElm.style.position = "relative";
                if (props && props.className) {
                    spinnerElm.classList.add(className);
                }
                _this.spinnerElm = propPanelElm.appendChild(spinnerElm);
                var element = React.createElement(propertyPaneSpinner_1.PropertyPaneSpinner, props && props.spinnerProps);
                ReactDom.render(element, _this.spinnerElm);
            }
        });
    };
    /**
     * Clear the spinner from the property pane
     */
    PropertyPaneHelpers.clearSpinner = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (delay <= 0) {
            // Check if the property pane element exists and remove the styling
            if (this.propertyPaneElm) {
                this.propertyPaneElm = null;
            }
            if (this.spinnerElm) {
                this.spinnerElm.remove();
                this.spinnerElm = null;
            }
        }
        else {
            setTimeout(function () {
                _this.clearSpinner();
            }, delay);
        }
    };
    /**
     * Waiting until an element exists
     *
     * @param selector
     */
    PropertyPaneHelpers.waitForElement = function (selector) {
        return new Promise(function (resolve, reject) {
            var element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }
            var observer = new MutationObserver(function (mutations) {
                // Timeout
                var timer = setTimeout(function () {
                    observer.disconnect();
                    resolve(null);
                    return;
                }, 5000);
                mutations.forEach(function (mutation) {
                    var nodes = [].slice.call(mutation.addedNodes);
                    for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
                        var node = nodes_1[_i];
                        if (node.matches && node.matches(selector)) {
                            clearTimeout(timer);
                            observer.disconnect();
                            resolve(node);
                            return;
                        }
                    }
                });
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        });
    };
    PropertyPaneHelpers.propertyPaneElm = null;
    PropertyPaneHelpers.spinnerElm = null;
    return PropertyPaneHelpers;
}());
exports.PropertyPaneHelpers = PropertyPaneHelpers;

//# sourceMappingURL=PropertyPaneHelpers.js.map
