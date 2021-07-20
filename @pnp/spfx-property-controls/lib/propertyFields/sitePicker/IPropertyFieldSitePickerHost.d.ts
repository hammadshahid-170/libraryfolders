import { IPropertyFieldSitePickerPropsInternal, IPropertyFieldSite } from './IPropertyFieldSitePicker';
/**
 * PropertyFieldSitePickerHost properties interface
 */
export interface IPropertyFieldSitePickerHostProps extends IPropertyFieldSitePickerPropsInternal {
    onChange: (targetProperty?: string, newValue?: any) => void;
}
export interface ISitePickerState {
    siteSearchResults?: Array<IPropertyFieldSite>;
    selectedSites?: Array<IPropertyFieldSite>;
    isLoading: boolean;
    errorMessage?: string;
}
