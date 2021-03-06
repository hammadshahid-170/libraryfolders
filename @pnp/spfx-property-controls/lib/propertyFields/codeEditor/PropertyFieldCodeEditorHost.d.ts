/// <reference types="react" />
import * as React from 'react';
import { IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState } from './IPropertyFieldCodeEditorHost';
import 'brace/mode/json';
import 'brace/mode/javascript';
import 'brace/mode/sass';
import 'brace/mode/typescript';
import 'brace/mode/html';
import 'brace/mode/handlebars';
import 'brace/mode/xml';
import 'brace/theme/monokai';
/**
 * Renders the controls for PropertyFieldCodeEditor component
 */
export default class PropertyFieldCodeEditorHost extends React.Component<IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState> {
    private async;
    private previousValue;
    private cancel;
    /**
     * Constructor method
     */
    constructor(props: IPropertyFieldCodeEditorHostProps);
    /**
     * componentWillUpdate lifecycle hook
     *
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps: IPropertyFieldCodeEditorHostProps, nextState: IPropertyFieldCodeEditorHostState): void;
    /**
     * Open the right Panel
     */
    private onOpenPanel();
    /**
     * Close the panel
     */
    private onClosePanel();
    /**
     * Called when the component will unmount
     */
    componentWillUnmount(): void;
    /**
     * Called when the save button  gets clicked
     */
    onSave(): void;
    /**
     * Called when the code gets changed
     */
    onChange(newValue: string, event?: any): void;
    /**
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
