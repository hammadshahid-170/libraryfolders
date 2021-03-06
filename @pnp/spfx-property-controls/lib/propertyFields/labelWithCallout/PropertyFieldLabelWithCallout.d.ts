import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldLabelWithCalloutPropsInternal, IPropertyFieldLabelWithCalloutProps } from './IPropertyFieldLabelWithCallout';
/**
 * Helper method to create a Label with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Label with Callout component is associated to.
 * @param properties - Strongly typed Label with Callout component properties.
 */
export declare function PropertyFieldLabelWithCallout(targetProperty: string, properties: IPropertyFieldLabelWithCalloutProps): IPropertyPaneField<IPropertyFieldLabelWithCalloutPropsInternal>;
