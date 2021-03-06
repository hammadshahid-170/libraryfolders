import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ISPSiteSearchService } from './ISPSiteSearchService';
import { IPropertyFieldSite } from '../propertyFields/sitePicker/IPropertyFieldSitePicker';
/**
 * Service implementation to search sites in SharePoint
 */
export default class SPSiteSearchService implements ISPSiteSearchService {
    /**
     * Search sites from the SharePoint
     */
    searchSites(ctx: IWebPartContext, query: string): Promise<IPropertyFieldSite[]>;
    /**
     * Returns fake sites results for the Mock mode
     */
    private searchSitesFromMock(ctx, query);
}
