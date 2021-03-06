import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { IPropertyFieldTermPickerPropsInternal, IPropertyFieldTermPickerProps } from './IPropertyFieldTermPicker';
/**
 * Represents a PropertyFieldTermPicker object.
 * NOTE: INTERNAL USE ONLY
 * @internal
 */
export declare class PropertyFieldTermPickerBuilder implements IPropertyPaneField<IPropertyFieldTermPickerPropsInternal> {
    type: PropertyPaneFieldType;
    targetProperty: string;
    properties: IPropertyFieldTermPickerPropsInternal;
    private label;
    private context;
    private allowMultipleSelections;
    private initialValues;
    private excludeSystemGroup;
    private limitByGroupNameOrID;
    private limitByTermsetNameOrID;
    private panelTitle;
    private hideTermStoreName;
    private isTermSetSelectable;
    private disabledTermIds;
    private termService;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    private customProperties;
    private key;
    private disabled;
    private onGetErrorMessage;
    private deferredValidationTime;
    /**
     * Constructor method
     */
    constructor(_targetProperty: string, _properties: IPropertyFieldTermPickerPropsInternal);
    /**
     * Renders the SPListPicker field content
     */
    private render(elem, ctx?, changeCallback?);
    /**
     * Disposes the current object
     */
    private dispose(elem);
}
/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export declare function PropertyFieldTermPicker(targetProperty: string, properties: IPropertyFieldTermPickerProps): IPropertyPaneField<IPropertyFieldTermPickerPropsInternal>;
