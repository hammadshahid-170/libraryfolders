import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldSitePickerPropsInternal, IPropertyFieldSitePickerProps } from './IPropertyFieldSitePicker';
/**
 * Helper method to create a Site Picker on the PropertyPane.
 * @param targetProperty - Target property the site picker is associated to.
 * @param properties - Strongly typed site Picker properties.
 */
export declare function PropertyFieldSitePicker(targetProperty: string, properties: IPropertyFieldSitePickerProps): IPropertyPaneField<IPropertyFieldSitePickerPropsInternal>;
