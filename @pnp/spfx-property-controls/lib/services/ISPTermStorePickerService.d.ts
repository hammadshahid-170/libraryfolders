import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
/**
 * Interfaces for Term store, groups and term sets
 */
export interface ITermStore {
    _ObjectType_: string;
    _ObjectIdentity_: string;
    Id: string;
    Name: string;
    Groups: IGroups;
}
/**
 * Interface to store backward connection between Group and Term store
 */
export interface ITermStoreMinimal {
    Id: string;
    Name: string;
}
export interface IGroups {
    _ObjectType_: string;
    _Child_Items_: IGroup[];
}
export interface IGroup {
    _ObjectType_: string;
    _ObjectIdentity_: string;
    TermSets: ITermSets;
    Id: string;
    Name: string;
    IsSystemGroup: boolean;
    TermStore?: ITermStoreMinimal;
}
export interface ITermSets {
    _ObjectType_: string;
    _Child_Items_: ITermSet[];
}
export interface ITermSet {
    _ObjectType_: string;
    _ObjectIdentity_: string;
    Id: string;
    Name: string;
    Description: string;
    Names: ITermSetNames;
    /**
     * This prop is internal. It is not returned from SP Service.
     * We need that to store Group Id.
     */
    Group?: string;
}
export interface ITermSetMinimal {
    _ObjectType_: string;
    _ObjectIdentity_: string;
    Id: string;
    Name: string;
}
export interface ITermSetNames {
    [locale: string]: string;
}
/**
 * Interfaces for the terms
 */
export interface ITerms {
    _ObjectType_: string;
    _Child_Items_: ITerm[];
}
/**
 * Term
 */
export interface ITerm {
    _ObjectType_: string;
    _ObjectIdentity_: string;
    Id: string;
    Name: string;
    Description: string;
    IsDeprecated: boolean;
    IsAvailableForTagging: boolean;
    IsRoot: boolean;
    PathOfTerm: string;
    TermSet: ITermSetMinimal;
    PathDepth?: number;
    Labels?: string[];
}
/**
 * Properties for the Term Store Picker Service
 */
export interface ISPTermStorePickerServiceProps {
    limitByGroupNameOrID?: string;
    limitByTermsetNameOrID?: string;
    excludeSystemGroup?: boolean;
}
/**
 * Properties for the Enterprise Term Store Picker Service
 */
export interface IPnPTermStorePickerServiceProps extends ISPTermStorePickerServiceProps {
    /**
     * Specifies if term labels should be loaded from the store
     */
    includeLabels?: boolean;
}
/**
 * Interface to be implemented by Term Store Picker Services
 */
export interface ISPTermStorePickerService {
    /**
     * Searches terms by provided text
     */
    searchTermsByName: (searchText: string) => Promise<IPickerTerm[]>;
    /**
     * Gets term sets from the stores
     */
    getTermSets: () => Promise<ITermSet[]>;
    /**
     * Get term sets from the specified group
     */
    getGroupTermSets: (group: IGroup) => Promise<ITermSets>;
    /**
     * Gets all terms from the specified term set
     */
    getAllTerms: (termSet: ITermSet) => Promise<ITerm[]>;
    /**
     * Gets term stores from the taxonomy service
     */
    getTermStores: () => Promise<ITermStore[]>;
}
/**
 * Helper class with some methods that can be used in any Term Store Picker Service implementation
 */
export declare class TermStorePickerServiceHelper {
    /**
     * Cleans the Guid from the Web Service response
     * @param guid
     */
    static cleanGuid(guid: string): string;
    /**
     * Checks if the provided string is a GUID
     * @param strGuid string to check
     */
    static isGuid(strGuid: string): boolean;
    /**
     * Sorting terms based on their path and depth
     *
     * @param terms
     */
    static sortTerms(terms: ITerm[]): ITerm[];
    /**
     * Sort the terms by their path
     *
     * @param a term 2
     * @param b term 2
     */
    private static sortTermByPath(a, b);
}
