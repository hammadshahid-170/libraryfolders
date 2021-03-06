import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldLinkWithCalloutPropsInternal, IPropertyFieldLinkWithCalloutProps } from './IPropertyFieldLinkWithCallout';
/**
 * Helper method to create a Link with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Link with Callout component is associated to.
 * @param properties - Strongly typed Link with Callout component properties.
 */
export declare function PropertyFieldLinkWithCallout(targetProperty: string, properties: IPropertyFieldLinkWithCalloutProps): IPropertyPaneField<IPropertyFieldLinkWithCalloutPropsInternal>;
