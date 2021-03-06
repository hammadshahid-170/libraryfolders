/// <reference types="react" />
import * as React from 'react';
import { IPropertyFieldCollectionDataHostProps, IPropertyFieldCollectionDataHostState } from '.';
export declare class PropertyFieldCollectionDataHost extends React.Component<IPropertyFieldCollectionDataHostProps, IPropertyFieldCollectionDataHostState> {
    constructor(props: IPropertyFieldCollectionDataHostProps);
    /**
     * Open the panel
     */
    private openPanel;
    /**
     * Closes the panel
     */
    private closePanel;
    /**
     * On save action
     */
    private onSave;
    render(): JSX.Element;
}
