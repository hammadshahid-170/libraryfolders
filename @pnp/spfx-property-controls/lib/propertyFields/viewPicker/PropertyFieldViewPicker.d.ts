import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldViewPickerProps, IPropertyFieldViewPickerPropsInternal } from './IPropertyFieldViewPicker';
/**
 * Helper method to create a SPView Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint view picker is associated to.
 * @param properties - Strongly typed SPView Picker properties.
 */
export declare function PropertyFieldViewPicker(targetProperty: string, properties: IPropertyFieldViewPickerProps): IPropertyPaneField<IPropertyFieldViewPickerPropsInternal>;
