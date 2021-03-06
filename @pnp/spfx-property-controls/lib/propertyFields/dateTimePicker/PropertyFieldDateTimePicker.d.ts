import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldDateTimePickerPropsInternal, IPropertyFieldDateTimePickerProps } from './IPropertyFieldDateTimePicker';
/**
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
export declare function PropertyFieldDateTimePicker(targetProperty: string, properties: IPropertyFieldDateTimePickerProps): IPropertyPaneField<IPropertyFieldDateTimePickerPropsInternal>;
