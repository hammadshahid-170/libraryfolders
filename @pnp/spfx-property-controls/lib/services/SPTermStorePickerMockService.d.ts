import { ITermStore, ITerm } from './ISPTermStorePickerService';
import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
/**
 * Defines a http client to request mock data to use the web part with the local workbench
 */
export default class SPTermStoreMockHttpClient {
    /**
     * Mock SharePoint result sample
     */
    private static _mockTermStores;
    private static _mockTerms;
    /**
     * Mock method which returns mock terms stores
     */
    static getTermStores(restUrl: string, options?: any): Promise<ITermStore[]>;
    /**
     * Mock method wich returns mock terms
     */
    static getAllTerms(): Promise<ITerm[]>;
    static searchTermsByName(searchText: string): Promise<IPickerTerm[]>;
}
