/// <reference types="react" />
import * as React from 'react';
import { IPropertyFieldSitePickerHostProps, ISitePickerState } from './IPropertyFieldSitePickerHost';
export default class PropertyFieldSitePickerHost extends React.Component<IPropertyFieldSitePickerHostProps, ISitePickerState> {
    private searchService;
    private async;
    constructor(props: IPropertyFieldSitePickerHostProps);
    private onSearchFieldChange;
    private handleCheckboxChange;
    render(): JSX.Element;
}
