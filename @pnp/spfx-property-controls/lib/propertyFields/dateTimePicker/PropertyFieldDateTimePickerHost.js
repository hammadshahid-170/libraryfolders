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
var IPropertyFieldDateTimePicker_1 = require("./IPropertyFieldDateTimePicker");
var DatePicker_1 = require("office-ui-fabric-react/lib/DatePicker");
var Label_1 = require("office-ui-fabric-react/lib/Label");
var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
var strings = require("PropertyControlStrings");
var FieldErrorMessage_1 = require("../errorMessage/FieldErrorMessage");
var PropertyFieldDateTimePickerHost_module_scss_1 = require("./PropertyFieldDateTimePickerHost.module.scss");
var HoursComponent_1 = require("./HoursComponent");
var MinutesComponent_1 = require("./MinutesComponent");
var SecondsComponent_1 = require("./SecondsComponent");
var telemetry = require("../../common/telemetry");
/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
var DatePickerStrings = (function () {
    function DatePickerStrings() {
        /**
         * An array of strings for the full names of months.
         * The array is 0-based, so months[0] should be the full name of January.
         */
        this.months = [
            strings.DatePickerMonthLongJanuary, strings.DatePickerMonthLongFebruary,
            strings.DatePickerMonthLongMarch, strings.DatePickerMonthLongApril,
            strings.DatePickerMonthLongMay, strings.DatePickerMonthLongJune, strings.DatePickerMonthLongJuly,
            strings.DatePickerMonthLongAugust, strings.DatePickerMonthLongSeptember, strings.DatePickerMonthLongOctober,
            strings.DatePickerMonthLongNovember, strings.DatePickerMonthLongDecember
        ];
        /**
         * An array of strings for the short names of months.
         * The array is 0-based, so shortMonths[0] should be the short name of January.
         */
        this.shortMonths = [
            strings.DatePickerMonthShortJanuary, strings.DatePickerMonthShortFebruary,
            strings.DatePickerMonthShortMarch, strings.DatePickerMonthShortApril,
            strings.DatePickerMonthShortMay, strings.DatePickerMonthShortJune, strings.DatePickerMonthShortJuly,
            strings.DatePickerMonthShortAugust, strings.DatePickerMonthShortSeptember, strings.DatePickerMonthShortOctober,
            strings.DatePickerMonthShortNovember, strings.DatePickerMonthShortDecember
        ];
        /**
         * An array of strings for the full names of days of the week.
         * The array is 0-based, so days[0] should be the full name of Sunday.
         */
        this.days = [
            strings.DatePickerDayLongSunday, strings.DatePickerDayLongMonday, strings.DatePickerDayLongTuesday,
            strings.DatePickerDayLongWednesday, strings.DatePickerDayLongThursday, strings.DatePickerDayLongFriday,
            strings.DatePickerDayLongSaturday
        ];
        /**
         * An array of strings for the initials of the days of the week.
         * The array is 0-based, so days[0] should be the initial of Sunday.
         */
        this.shortDays = [
            strings.DatePickerDayShortSunday, strings.DatePickerDayShortMonday, strings.DatePickerDayShortTuesday,
            strings.DatePickerDayShortWednesday, strings.DatePickerDayShortThursday, strings.DatePickerDayShortFriday,
            strings.DatePickerDayShortSaturday
        ];
        /**
         * String to render for button to direct the user to today's date.
         */
        this.goToToday = strings.DatepickerGoToToday;
        /**
         * Error message to render for TextField if isRequired validation fails.
         */
        this.isRequiredErrorMessage = '';
        /**
         * Error message to render for TextField if input date string parsing fails.
         */
        this.invalidInputErrorMessage = '';
    }
    return DatePickerStrings;
}());
/**
 * Renders the controls for PropertyFieldDateTimePicker component
 */
var PropertyFieldDateTimePickerHost = (function (_super) {
    __extends(PropertyFieldDateTimePickerHost, _super);
    /**
     * Constructor
     */
    function PropertyFieldDateTimePickerHost(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('PropertyFieldDateTimePicker', {
            dateConvention: props.dateConvention ? IPropertyFieldDateTimePicker_1.DateConvention[props.dateConvention] : '',
            formatDate: !!props.formatDate,
            timeConvention: props.timeConvention ? IPropertyFieldDateTimePicker_1.TimeConvention[props.timeConvention] : '',
            disabled: props.disabled
        });
        // Bind the current object to the external called onSelectDate method
        _this._onSelectDate = _this._onSelectDate.bind(_this);
        _this._dropdownHoursChanged = _this._dropdownHoursChanged.bind(_this);
        _this._dropdownMinutesChanged = _this._dropdownMinutesChanged.bind(_this);
        _this._dropdownSecondsChanged = _this._dropdownSecondsChanged.bind(_this);
        // Initiate the current date values
        _this._crntDate = _this._getDateValue();
        // Intiate the time values (only when date and time convention is active)
        _this._crntHours = _this.props.dateConvention === IPropertyFieldDateTimePicker_1.DateConvention.DateTime && _this._getDateValue() !== null ? _this._getDateValue().getHours() : 0;
        _this._crntMinutes = _this.props.dateConvention === IPropertyFieldDateTimePicker_1.DateConvention.DateTime && _this._getDateValue() !== null ? _this._getDateValue().getMinutes() : 0;
        _this._crntSeconds = _this.props.dateConvention === IPropertyFieldDateTimePicker_1.DateConvention.DateTime && _this._getDateValue() !== null ? _this._getDateValue().getSeconds() : 0;
        // Set the current state
        _this.state = {
            day: _this._crntDate,
            hours: _this._crntHours,
            minutes: _this._crntMinutes,
            seconds: _this._crntSeconds,
            errorMessage: ''
        };
        _this.async = new Utilities_1.Async(_this);
        _this.validate = _this.validate.bind(_this);
        _this.notifyAfterValidate = _this.notifyAfterValidate.bind(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, _this.props.deferredValidationTime);
        return _this;
    }
    /**
     * Function to retrieve the initial date
     */
    PropertyFieldDateTimePickerHost.prototype._getDateValue = function () {
        if (typeof this.props.initialDate !== 'undefined' && this.props.initialDate !== null) {
            if (typeof this.props.initialDate.value !== 'undefined' && this.props.initialDate.value !== null) {
                return new Date(this.props.initialDate.value.toString());
            }
        }
        return null;
    };
    /**
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    PropertyFieldDateTimePickerHost.prototype._onSelectDate = function (date) {
        if (date === null) {
            return;
        }
        this._crntDate = date;
        this._saveDate();
    };
    /**
     * Function called when hours value have been changed
     * @param element Hours dropdown value
     */
    PropertyFieldDateTimePickerHost.prototype._dropdownHoursChanged = function (element) {
        this._crntHours = parseInt(element.key.toString());
        this._saveDate();
    };
    /**
     * Function called when minutes value have been changed
     * @param element Minutes dropdown value
     */
    PropertyFieldDateTimePickerHost.prototype._dropdownMinutesChanged = function (element) {
        this._crntMinutes = parseInt(element.key.toString());
        this._saveDate();
    };
    /**
     * Function called when seconds value have been changed
     * @param element Seconds dropdown value
     */
    PropertyFieldDateTimePickerHost.prototype._dropdownSecondsChanged = function (element) {
        this._crntSeconds = parseInt(element.key.toString());
        this._saveDate();
    };
    /**
     * Save the new date
     */
    PropertyFieldDateTimePickerHost.prototype._saveDate = function () {
        // Check if the current date object exists
        if (this._crntDate === null) {
            return;
        }
        // Set the current date state for the component
        this.setState({
            day: this._crntDate,
            hours: this._crntHours,
            minutes: this._crntMinutes,
            seconds: this._crntSeconds
        });
        // Create the final date object
        var finalDate = new Date(this._crntDate.toISOString());
        finalDate.setHours(this._crntHours);
        finalDate.setMinutes(this._crntMinutes);
        finalDate.setSeconds(this._crntSeconds);
        if (finalDate !== null) {
            var finalDateAsString = '';
            if (this.props.formatDate) {
                finalDateAsString = this.props.formatDate(finalDate);
            }
            else {
                finalDateAsString = finalDate.toString();
            }
            this.delayedValidate({
                value: finalDate,
                displayValue: finalDateAsString
            });
        }
    };
    /**
     * Validates the new custom field value
     */
    PropertyFieldDateTimePickerHost.prototype.validate = function (dateVal) {
        var _this = this;
        if (typeof this.props.onGetErrorMessage === 'undefined' || this.props.onGetErrorMessage === null) {
            this.notifyAfterValidate(this.props.initialDate, dateVal);
            return;
        }
        if (this._latestValidateValue === dateVal.displayValue) {
            return;
        }
        this._latestValidateValue = dateVal.displayValue;
        var result = this.props.onGetErrorMessage(dateVal.displayValue || '');
        if (typeof result !== 'undefined') {
            if (typeof result === 'string') {
                if (result === '') {
                    this.notifyAfterValidate(this.props.initialDate, dateVal);
                }
                this.setState({
                    errorMessage: result
                });
            }
            else {
                result.then(function (errorMessage) {
                    if (typeof errorMessage === 'undefined' || errorMessage === '') {
                        _this.notifyAfterValidate(_this.props.initialDate, dateVal);
                    }
                    _this.setState({
                        errorMessage: errorMessage
                    });
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialDate, dateVal);
        }
    };
    /**
     * Notifies the parent Web Part of a property value change
     */
    PropertyFieldDateTimePickerHost.prototype.notifyAfterValidate = function (oldValue, newValue) {
        if (this.props.onPropertyChange && newValue !== null) {
            this.props.properties[this.props.targetProperty] = newValue;
            this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
            //  Trigger the apply button
            if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
                this.props.onChange(this.props.targetProperty, newValue);
            }
        }
    };
    /**
     * Called when the component will unmount
     */
    PropertyFieldDateTimePickerHost.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * Renders the control
     */
    PropertyFieldDateTimePickerHost.prototype.render = function () {
        // Defines the DatePicker control labels
        var dateStrings = new DatePickerStrings();
        var _a = this.props, showLabels = _a.showLabels, disabled = _a.disabled, timeConvention = _a.timeConvention, dateConvention = _a.dateConvention, label = _a.label;
        // Check if the time element needs to be rendered
        var timeElm = React.createElement("tr", null);
        if (dateConvention === IPropertyFieldDateTimePicker_1.DateConvention.DateTime) {
            timeElm = (React.createElement("tr", null,
                showLabels && React.createElement("td", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.labelCell },
                    React.createElement(Label_1.Label, { className: PropertyFieldDateTimePickerHost_module_scss_1.default.fieldLabel }, strings.DateTimePickerTime)),
                React.createElement("td", null,
                    React.createElement("table", { cellPadding: '0', cellSpacing: '0' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement(HoursComponent_1.default, { disabled: disabled, timeConvention: timeConvention, value: this.state.hours, onChange: this._dropdownHoursChanged })),
                                React.createElement("td", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.seperator },
                                    React.createElement(Label_1.Label, null, ":")),
                                React.createElement("td", null,
                                    React.createElement(MinutesComponent_1.default, { disabled: disabled, value: this.state.minutes, onChange: this._dropdownMinutesChanged })),
                                React.createElement("td", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.seperator },
                                    React.createElement(Label_1.Label, null, ":")),
                                React.createElement("td", null,
                                    React.createElement(SecondsComponent_1.default, { disabled: disabled, value: this.state.seconds, onChange: this._dropdownSecondsChanged }))))))));
        }
        // Renders content
        return (React.createElement("div", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.propertyFieldDateTimePicker },
            label && React.createElement(Label_1.Label, null, label),
            React.createElement("table", { cellPadding: '0', cellSpacing: '0' },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        showLabels && React.createElement("td", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.labelCell },
                            React.createElement(Label_1.Label, { className: PropertyFieldDateTimePickerHost_module_scss_1.default.fieldLabel }, strings.DateTimePickerDate)),
                        React.createElement("td", null,
                            React.createElement(DatePicker_1.DatePicker, { disabled: disabled, value: this.state.day, strings: dateStrings, isMonthPickerVisible: true, onSelectDate: this._onSelectDate, allowTextInput: false, firstDayOfWeek: this.props.firstDayOfWeek }))),
                    !!timeElm &&
                        React.createElement("tr", null,
                            React.createElement("td", { className: PropertyFieldDateTimePickerHost_module_scss_1.default.spacerRow, colSpan: showLabels ? 2 : 1 })),
                    timeElm)),
            React.createElement(FieldErrorMessage_1.default, { errorMessage: this.state.errorMessage })));
    };
    PropertyFieldDateTimePickerHost.defaultProps = {
        showLabels: true
    };
    return PropertyFieldDateTimePickerHost;
}(React.Component));
exports.default = PropertyFieldDateTimePickerHost;

//# sourceMappingURL=PropertyFieldDateTimePickerHost.js.map
