/// <reference types="react" />
import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPickerTerm, IPickerTerms } from './IPropertyFieldTermPicker';
import { IPropertyFieldTermPickerHostProps } from './IPropertyFieldTermPickerHost';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPTermStorePickerService } from '../../services/ISPTermStorePickerService';
export declare class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>> {
}
export interface ITermPickerState {
    terms: IPickerTerms;
}
export interface ITermPickerProps {
    termPickerHostProps: IPropertyFieldTermPickerHostProps;
    context: IWebPartContext;
    disabled: boolean;
    value: IPickerTerms;
    allowMultipleSelections: boolean;
    isTermSetSelectable: boolean;
    disabledTermIds: string[];
    onChanged: (items: IPickerTerm[]) => void;
    termsService: ISPTermStorePickerService;
    resolveDelay?: number;
}
export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {
    /**
     * Constructor method
     */
    constructor(props: any);
    /**
     * componentWillReceiveProps method
     */
    componentWillReceiveProps(nextProps: ITermPickerProps): void;
    /**
     * Renders the item in the picker
     */
    protected onRenderItem(term: IPickerItemProps<IPickerTerm>): JSX.Element;
    /**
     * Renders the suggestions in the picker
     */
    protected onRenderSuggestionsItem(term: IPickerTerm, props: any): JSX.Element;
    /**
     * When Filter Changes a new search for suggestions
     */
    private onFilterChanged(filterText, tagList);
    /**
     * gets the text from an item
     */
    private onGetTextFromItem(item);
    /**
   * Render method
   */
    render(): JSX.Element;
}
