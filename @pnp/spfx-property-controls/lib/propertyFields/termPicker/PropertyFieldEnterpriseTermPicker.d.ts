import { IPropertyFieldEnterpriseTermPickerProps, IPropertyFieldEnterpriseTermPickerPropsInternal } from "./IPropertyFieldTermPicker";
import { IPropertyPaneField } from "@microsoft/sp-webpart-base";
/**
 * Helper method to create a Enterprise Term Picker on the PropertyPane.
 * @param targetProperty - Target property the Term Picker is associated to.
 * @param properties - Strongly typed Term Picker Picker properties.
 */
export declare function PropertyFieldEnterpriseTermPicker(targetProperty: string, properties: IPropertyFieldEnterpriseTermPickerProps): IPropertyPaneField<IPropertyFieldEnterpriseTermPickerPropsInternal>;
