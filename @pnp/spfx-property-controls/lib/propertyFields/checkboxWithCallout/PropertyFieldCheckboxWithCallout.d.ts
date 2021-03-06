import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldCheckboxWithCalloutPropsInternal, IPropertyFieldCheckboxWithCalloutProps } from './IPropertyFieldCheckboxWithCallout';
/**
 * Helper method to create a Checkbox with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Checkbox with Callout component is associated to.
 * @param properties - Strongly typed Checkbox with Callout component properties.
 */
export declare function PropertyFieldCheckboxWithCallout(targetProperty: string, properties: IPropertyFieldCheckboxWithCalloutProps): IPropertyPaneField<IPropertyFieldCheckboxWithCalloutPropsInternal>;
