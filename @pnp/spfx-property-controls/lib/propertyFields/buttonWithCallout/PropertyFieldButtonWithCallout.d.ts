import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldButtonWithCalloutPropsInternal, IPropertyFieldButtonWithCalloutProps } from './IPropertyFieldButtonWithCallout';
/**
 * Helper method to create a Button with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Button with Callout component is associated to.
 * @param properties - Strongly typed Button with Callout component properties.
 */
export declare function PropertyFieldButtonWithCallout(targetProperty: string, properties: IPropertyFieldButtonWithCalloutProps): IPropertyPaneField<IPropertyFieldButtonWithCalloutPropsInternal>;
