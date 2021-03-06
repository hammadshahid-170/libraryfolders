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
var IPropertyFieldPeoplePicker_1 = require("./IPropertyFieldPeoplePicker");
var Pickers_1 = require("office-ui-fabric-react/lib/Pickers");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Persona_1 = require("office-ui-fabric-react/lib/Persona");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("PropertyControlStrings");
var SPPeopleSearchService_1 = require("../../services/SPPeopleSearchService");
var FieldErrorMessage_1 = require("../errorMessage/FieldErrorMessage");
var telemetry = require("../../common/telemetry");
/**
 * Renders the controls for PropertyFieldPeoplePicker component
 */
var PropertyFieldPeoplePickerHost = (function (_super) {
    __extends(PropertyFieldPeoplePickerHost, _super);
    /**
     * Constructor method
     */
    function PropertyFieldPeoplePickerHost(props) {
        var _this = _super.call(this, props) || this;
        _this.intialPersonas = new Array();
        _this.resultsPeople = new Array();
        _this.resultsPersonas = new Array();
        _this.selectedPeople = new Array();
        _this.selectedPersonas = new Array();
        telemetry.track('PropertyFieldPeoplePicker', {
            allowDuplicate: props.allowDuplicate,
            principalType: props.principalType ? props.principalType.toString() : '',
            disabled: props.disabled
        });
        _this.searchService = new SPPeopleSearchService_1.default();
        _this.onSearchFieldChanged = _this.onSearchFieldChanged.bind(_this);
        _this.onItemChanged = _this.onItemChanged.bind(_this);
        _this.createInitialPersonas();
        _this.state = {
            resultsPeople: _this.resultsPeople,
            resultsPersonas: _this.resultsPersonas,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * A search field change occured
     */
    PropertyFieldPeoplePickerHost.prototype.onSearchFieldChanged = function (searchText, currentSelected) {
        var _this = this;
        if (searchText.length > 2) {
            // Clear the suggestions list
            this.setState({ resultsPeople: this.resultsPeople, resultsPersonas: this.resultsPersonas });
            // Request the search service
            var result = this.searchService.searchPeople(this.props.context, searchText, this.props.principalType, this.props.targetSiteUrl).then(function (response) {
                _this.resultsPeople = [];
                _this.resultsPersonas = [];
                // If allowDuplicate == false, so remove duplicates from results
                if (_this.props.allowDuplicate === false) {
                    response = _this.removeDuplicates(response);
                }
                response.forEach(function (element, index) {
                    // Fill the results Array
                    _this.resultsPeople.push(element);
                    // Transform the response in IPersonaProps object
                    _this.resultsPersonas.push(_this.getPersonaFromPeople(element, index));
                });
                // Refresh the component's state
                _this.setState({ resultsPeople: _this.resultsPeople, resultsPersonas: _this.resultsPersonas });
                return _this.resultsPersonas;
            });
            return result;
        }
        else {
            return [];
        }
    };
    /**
     * Remove the duplicates if property allowDuplicate equals false
     */
    PropertyFieldPeoplePickerHost.prototype.removeDuplicates = function (responsePeople) {
        if (this.selectedPeople === null || this.selectedPeople.length === 0) {
            return responsePeople;
        }
        var res = [];
        for (var _i = 0, responsePeople_1 = responsePeople; _i < responsePeople_1.length; _i++) {
            var element = responsePeople_1[_i];
            var found = false;
            for (var i = 0; i < this.selectedPeople.length; i++) {
                var responseItem = this.selectedPeople[i];
                if (responseItem.login === element.login &&
                    responseItem.id === element.id) {
                    found = true;
                    break;
                }
            }
            if (found === false) {
                res.push(element);
            }
        }
        return res;
    };
    /**
     * Creates the collection of initial personas from initial IPropertyFieldGroupOrPerson collection
     */
    PropertyFieldPeoplePickerHost.prototype.createInitialPersonas = function () {
        var _this = this;
        if (this.props.initialData === null || typeof (this.props.initialData) !== typeof Array()) {
            return;
        }
        this.props.initialData.forEach(function (element, index) {
            var persona = _this.getPersonaFromPeople(element, index);
            _this.intialPersonas.push(persona);
            _this.selectedPersonas.push(persona);
            _this.selectedPeople.push(element);
        });
    };
    /**
     * Generates a IPersonaProps object from a IPropertyFieldGroupOrPerson object
     */
    PropertyFieldPeoplePickerHost.prototype.getPersonaFromPeople = function (element, index) {
        return {
            primaryText: element.fullName,
            secondaryText: element.jobTitle,
            imageUrl: element.imageUrl,
            imageInitials: element.initials,
            presence: Persona_1.PersonaPresence.none,
            initialsColor: this.getRandomInitialsColor(index)
        };
    };
    /**
     * Refreshes the web part properties
     */
    PropertyFieldPeoplePickerHost.prototype.refreshWebPartProperties = function () {
        this.delayedValidate(this.selectedPeople);
    };
    /**
    * Validates the new custom field value
    */
    PropertyFieldPeoplePickerHost.prototype.validate = function (value) {
        var _this = this;
        if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
            this.notifyAfterValidate(this.props.initialData, value);
            return;
        }
        var errResult = this.props.onGetErrorMessage(value || []);
        if (errResult) {
            if (typeof errResult === 'string') {
                if (errResult === '') {
                    this.notifyAfterValidate(this.props.initialData, value);
                }
                this.setState({
                    errorMessage: errResult
                });
            }
            else {
                errResult.then(function (errorMessage) {
                    if (!errorMessage) {
                        _this.notifyAfterValidate(_this.props.initialData, value);
                    }
                    _this.setState({
                        errorMessage: errorMessage
                    });
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialData, value);
            this.setState({
                errorMessage: null
            });
        }
    };
    /**
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldPeoplePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            // Trigger the apply button
            if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
                this.props.onChange(this.props.targetProperty, newValue);
            }
        }
    };
    /**
     * Called when the component will unmount
     */
    PropertyFieldPeoplePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * Find the index of the selected person
     * @param selectedItem
     */
    PropertyFieldPeoplePickerHost.prototype._findIndex = function (selectedItem) {
        for (var i = 0; i < this.resultsPersonas.length; i++) {
            var crntPersona = this.resultsPersonas[i];
            // Check if the imageUrl, primaryText, secondaryText are equal
            if (crntPersona.imageUrl === selectedItem.imageUrl &&
                crntPersona.primaryText === selectedItem.primaryText &&
                crntPersona.secondaryText === selectedItem.secondaryText) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Event raises when the user changed people from the PeoplePicker component
     */
    PropertyFieldPeoplePickerHost.prototype.onItemChanged = function (selectedItems) {
        var _this = this;
        if (selectedItems.length > 0) {
            if (selectedItems.length > this.selectedPersonas.length) {
                var index = this._findIndex(selectedItems[selectedItems.length - 1]);
                if (index > -1) {
                    var people = this.resultsPeople[index];
                    this.selectedPeople.push(people);
                    this.selectedPersonas.push(this.resultsPersonas[index]);
                }
            }
            else {
                this.selectedPersonas.forEach(function (person, index2) {
                    var selectedItemIndex = selectedItems.indexOf(person);
                    if (selectedItemIndex === -1) {
                        _this.selectedPersonas.splice(index2, 1);
                        _this.selectedPeople.splice(index2, 1);
                    }
                });
            }
        }
        else {
            this.selectedPersonas.splice(0, this.selectedPersonas.length);
            this.selectedPeople.splice(0, this.selectedPeople.length);
        }
        this.refreshWebPartProperties();
    };
    /**
     * Generate a PersonaInitialsColor from the item position in the collection
     */
    PropertyFieldPeoplePickerHost.prototype.getRandomInitialsColor = function (index) {
        var num = index % 13;
        switch (num) {
            case 0: return Persona_1.PersonaInitialsColor.blue;
            case 1: return Persona_1.PersonaInitialsColor.darkBlue;
            case 2: return Persona_1.PersonaInitialsColor.teal;
            case 3: return Persona_1.PersonaInitialsColor.lightGreen;
            case 4: return Persona_1.PersonaInitialsColor.green;
            case 5: return Persona_1.PersonaInitialsColor.darkGreen;
            case 6: return Persona_1.PersonaInitialsColor.lightPink;
            case 7: return Persona_1.PersonaInitialsColor.pink;
            case 8: return Persona_1.PersonaInitialsColor.magenta;
            case 9: return Persona_1.PersonaInitialsColor.purple;
            case 10: return Persona_1.PersonaInitialsColor.black;
            case 11: return Persona_1.PersonaInitialsColor.orange;
            case 12: return Persona_1.PersonaInitialsColor.red;
            case 13: return Persona_1.PersonaInitialsColor.darkRed;
            default: return Persona_1.PersonaInitialsColor.blue;
        }
    };
    /**
     * Renders the PeoplePicker controls with Office UI  Fabric
     */
    PropertyFieldPeoplePickerHost.prototype.render = function () {
        var suggestionProps = {
            suggestionsHeaderText: strings.PeoplePickerSuggestedContacts,
            noResultsFoundText: strings.PeoplePickerNoResults,
            loadingText: strings.PeoplePickerLoading,
        };
        // Check which text have to be shown
        if (this.props.principalType && this.props.principalType.length > 0) {
            var userType = this.props.principalType.indexOf(IPropertyFieldPeoplePicker_1.PrincipalType.Users) !== -1;
            var groupType = this.props.principalType.indexOf(IPropertyFieldPeoplePicker_1.PrincipalType.SharePoint) !== -1 || this.props.principalType.indexOf(IPropertyFieldPeoplePicker_1.PrincipalType.Security) !== -1;
            // Check if both user and group are present
            if (userType && groupType) {
                suggestionProps.suggestionsHeaderText = strings.PeoplePickerSuggestedCombined;
            }
            // If only group is active
            if (!userType && groupType) {
                suggestionProps.suggestionsHeaderText = strings.PeoplePickerSuggestedGroups;
            }
        }
        // Renders content
        return (React.createElement("div", null,
            this.props.label && React.createElement(Label_1.Label, null, this.props.label),
            React.createElement(Pickers_1.NormalPeoplePicker, { disabled: this.props.disabled, pickerSuggestionsProps: suggestionProps, onResolveSuggestions: this.onSearchFieldChanged, onChange: this.onItemChanged, defaultSelectedItems: this.intialPersonas, itemLimit: this.props.multiSelect ? undefined : 1 }),
            React.createElement(FieldErrorMessage_1.default, { errorMessage: this.state.errorMessage })));
    };
    return PropertyFieldPeoplePickerHost;
}(React.Component));
exports.default = PropertyFieldPeoplePickerHost;

//# sourceMappingURL=PropertyFieldPeoplePickerHost.js.map
