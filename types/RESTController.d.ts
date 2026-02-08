/** Base options for all Parse requests that go through _getRequestOptions */
export interface BaseRequestOptions {
    /**
     * Causes the Master Key to be used for this request.
     */
    useMasterKey?: boolean;
    /**
     * Causes the Maintenance Key to be used for this request.
     */
    useMaintenanceKey?: boolean;
    /**
     * A valid session token, used for making a request on behalf of a specific user.
     */
    sessionToken?: string;
    /**
     * The installationId which made the request.
     */
    installationId?: string;
    /**
     * A dictionary that is accessible in Cloud Code triggers.
     */
    context?: Record<string, unknown>;
}
export interface RequestOptions {
    useMasterKey?: boolean;
    useMaintenanceKey?: boolean;
    sessionToken?: string;
    installationId?: string;
    returnStatus?: boolean;
    batchSize?: number;
    include?: any;
    progress?: any;
    context?: any;
    /**
     * (defaults to true) Only used by login which uses POST instead of GET for security
     */
    usePost?: boolean;
    ignoreEmailVerification?: boolean;
    transaction?: boolean;
}
export interface FullOptions {
    success?: any;
    error?: any;
    useMasterKey?: boolean;
    useMaintenanceKey?: boolean;
    sessionToken?: string;
    installationId?: string;
    progress?: any;
    /**
     * (defaults to true) Only used by login which uses POST instead of GET for security
     */
    usePost?: boolean;
}
declare const RESTController: {
    ajax(method: string, url: string, data: any, headers?: any, options?: FullOptions): Promise<any>;
    request(method: string, path: string, data: any, options?: RequestOptions): Promise<any>;
    handleError(errorJSON: any): Promise<never>;
};
export default RESTController;
