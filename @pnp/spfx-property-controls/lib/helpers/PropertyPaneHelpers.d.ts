import { ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';
export interface IPropertyPaneSpinner {
    /**
     * Spinner background color
     */
    bgColor?: string;
    /**
     * Class name
     */
    className?: string;
    /**
     * Office UI Fabric spinner properties
     */
    spinnerProps?: ISpinnerProps;
}
export declare class PropertyPaneHelpers {
    private static propertyPaneElm;
    private static spinnerElm;
    /**
     * Add a spinner for the `loadPropertyPaneResources` method
     */
    static setSpinner(props?: IPropertyPaneSpinner): void;
    /**
     * Clear the spinner from the property pane
     */
    static clearSpinner(delay?: number): void;
    /**
     * Waiting until an element exists
     *
     * @param selector
     */
    private static waitForElement(selector);
}
