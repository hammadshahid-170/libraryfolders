/// <reference types="react" />
import * as React from 'react';
import { ICollectionDataViewerProps, ICollectionDataViewerState } from '.';
export declare class CollectionDataViewer extends React.Component<ICollectionDataViewerProps, ICollectionDataViewerState> {
    private readonly SORT_IDX;
    constructor(props: ICollectionDataViewerProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * Add a new item to the collection
     */
    private addItem;
    /**
     * Remove an item from the collection
     */
    private updateItem;
    /**
     * Remove an item from the collection
     */
    private deleteItem;
    /**
     * Validate every item
     */
    private validateItem;
    /**
     * Check if all items are valid
     */
    private allItemsValid();
    /**
     * Currently in creation
     */
    private addInCreation;
    /**
     * Add the item and save the form
     */
    private addAndSave;
    /**
     * Move an item in the array
     *
     * @param crntItems
     * @param oldIdx
     * @param newIdx
     */
    private moveItemTo(crntItems, oldIdx, newIdx);
    /**
     * Update the sort property
     *
     * @param crntItems
     */
    private updateSortProperty(crntItems);
    /**
     * Update the sort order
     */
    private updateSortOrder;
    /**
     * Save the collection data
     */
    private onSave;
    /**
     * Cancel
     */
    private onCancel;
    /**
     * Default React render
     */
    render(): React.ReactElement<ICollectionDataViewerProps>;
}
