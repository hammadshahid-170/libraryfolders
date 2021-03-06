/// <reference types="react" />
import * as React from 'react';
import { IPropertyFieldNumberHostProps, IPropertyFieldNumberHostState } from './IPropertyFieldNumberHost';
export default class PropertyFieldNumberHost extends React.Component<IPropertyFieldNumberHostProps, IPropertyFieldNumberHostState> {
    private _async;
    private _delayedChange;
    constructor(props: IPropertyFieldNumberHostProps);
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IPropertyFieldNumberHostProps, prevState: IPropertyFieldNumberHostState): void;
    /**
     * Validate if field value is a number
     * @param value
     */
    private _validateNumber;
    /**
     * On field change event handler
     */
    private _onChanged;
    /**
     * Render field
     */
    render(): JSX.Element;
}
