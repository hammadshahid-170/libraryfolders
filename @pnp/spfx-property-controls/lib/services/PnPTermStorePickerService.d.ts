import { ISPTermStorePickerService, IPnPTermStorePickerServiceProps, ITermStore, ITermSet, ITerm, IGroup, ITermSets } from "./ISPTermStorePickerService";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
/**
 * Term Store Picker Service implementation that uses @pnp/sp-taxonomy to work with taxonomy service
 */
export default class PnPTermStorePickerService implements ISPTermStorePickerService {
    private props;
    private context;
    private readonly _termSetCollectionObjectType;
    private readonly _termGroupCollectionObjectType;
    private _pnpTermStores;
    private _pnpGroups;
    constructor(props: IPnPTermStorePickerServiceProps, context: IWebPartContext);
    /**
     * Gets term stores from the taxonomy service
     */
    getTermStores(): Promise<ITermStore[]>;
    /**
     * Searches terms by provided text
     * @param searchText text to search
     */
    searchTermsByName(searchText: string): Promise<IPickerTerm[]>;
    /**
     * Gets term sets from the stores
     */
    getTermSets(): Promise<ITermSet[]>;
    /**
     * Gets all terms from the specified term set
     * @param termSet Term Set to get terms from
     */
    getAllTerms(termSet: ITermSet): Promise<ITerm[]>;
    /**
     * Get term sets from the specified group
     * @param group Term Group
     */
    getGroupTermSets(group: IGroup): Promise<ITermSets>;
    /**
     * Tries to get terms from the specified Term Set.
     * @param pnpTermStore Term Store to work with
     * @param termSet Term set to get terms from
     */
    private _tryGetAllTerms(pnpTermStore, termSet);
    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByTermSetNameOrId
     * @param searchText text to search
     */
    private _searchTermsByTermSet(searchText);
    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByGroupNameOrId
     * @param searchText text to search
     */
    private _searchTermsByGroup(searchText);
    /**
     * Searches for terms in the term store
     * @param searchText text to search
     */
    private _searchAllTerms(searchText);
    /**
     * Searches for terms by provided text in specified term sets
     * @param pnpTermStore Term Store
     * @param pnpTermSets term sets where the terms should be searched for
     * @param searchText text to search
     * @param termGroupId Id of the group that contains the term sets
     */
    private _searchTermsInTermSets(pnpTermStore, pnpTermSets, searchText, termGroupId?);
    /**
     * Ensures (loads if needed) term stores and term groups from taxonomy service
     */
    private _ensureTermStores();
    /**
     * Converts @pnp/sp-taxonomy Term Set instance into internal ITermSet object
     * @param pnpTermSet @pnp/sp-taxonomy Term Set instance
     * @param groupId Id of the group that contains the term set
     */
    private _pnpTermSet2TermSet(pnpTermSet, groupId);
    /**
     * Converts @pnp/sp-taxonomy Term Group instance into internal IGroup object
     * @param pnpTermGroup @pnp/sp-taxonomy Term Group instance
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     */
    private _pnpTermGroup2TermGroup(pnpTermGroup, pnpTermStore);
    /**
     * Gets term set(s) from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     * @param termSetNameOrID term set name or id
     */
    private _getPnPTermSetsByNameOrId(pnpTermStore, termSetNameOrID);
    /**
     * Gets group from cached (previously loaded) list of groups by name or id
     * @param termStoreId term store id
     * @param groupNameOrID group name or id
     */
    private _getPnPTermGroupsByNameOrId(termStoreId, groupNameOrID);
    /**
     * Gets group from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonomy term store to work with
     * @param groupNameOrID group name or id
     */
    private _requestPnPTermGroupByNameOrId(pnpTermStore, groupNameOrID);
}
