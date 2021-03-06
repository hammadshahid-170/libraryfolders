import { IPropertyPaneField } from '@microsoft/sp-webpart-base';
import { IPropertyFieldCollectionDataPropsInternal, IPropertyFieldCollectionDataProps } from '.';
/**
 * Property field
 * @param targetProperty
 * @param properties
 */
export declare function PropertyFieldCollectionData(targetProperty: string, properties: IPropertyFieldCollectionDataProps): IPropertyPaneField<IPropertyFieldCollectionDataPropsInternal>;
