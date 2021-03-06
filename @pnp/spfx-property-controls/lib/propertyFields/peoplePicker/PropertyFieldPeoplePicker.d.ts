import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldPeoplePickerProps, IPropertyFieldPeoplePickerPropsInternal } from './IPropertyFieldPeoplePicker';
/**
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
export declare function PropertyFieldPeoplePicker(targetProperty: string, properties: IPropertyFieldPeoplePickerProps): IPropertyPaneField<IPropertyFieldPeoplePickerPropsInternal>;
