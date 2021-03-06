import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldCodeEditorPropsInternal, IPropertyFieldCodeEditorProps } from './IPropertyFieldCodeEditor';
/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export declare function PropertyFieldCodeEditor(targetProperty: string, properties: IPropertyFieldCodeEditorProps): IPropertyPaneField<IPropertyFieldCodeEditorPropsInternal>;
