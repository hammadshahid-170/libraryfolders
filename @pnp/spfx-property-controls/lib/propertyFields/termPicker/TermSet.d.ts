/// <reference types="react" />
import * as React from 'react';
import { ITermSetProps, ITermSetState } from './IPropertyFieldTermPickerHost';
/**
 * Term set component
 */
export default class TermSet extends React.Component<ITermSetProps, ITermSetState> {
    constructor(props: ITermSetProps);
    /**
     * Autoload the terms of the term set
     */
    private _autoLoadTerms();
    /**
     * Handle the click event: collapse or expand
     */
    private _handleClick();
    /**
     * Load the terms for the current term set
     */
    private _loadTerms(autoExpand?);
    /**
     * The term set selection changed
     */
    private termSetSelectionChange;
    render(): JSX.Element;
}
