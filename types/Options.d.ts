/**
 * Shared option shapes used across the SDK.
 * Centralized here so option contracts stay consistent and easy to review.
 */
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
    usePost?: boolean;
}
export interface BatchSizeOption {
    batchSize?: number;
}
export interface CascadeSaveOption {
    /** If false, nested objects will not be saved (default is true). */
    cascadeSave?: boolean;
}
export interface SuccessOption {
    success?: (...args: any[]) => void;
}
export interface ErrorOption {
    error?: (...args: any[]) => void;
}
export interface ContextOption {
    context?: Record<string, any>;
}
export interface SessionTokenOption {
    sessionToken?: string;
}
export interface WaitOption {
    /** Set to true to wait for server confirmation before triggering events. */
    wait?: boolean;
}
export interface UseMasterKeyOption {
    /** In Cloud Code and Node only, causes the Master Key to be used for this request. */
    useMasterKey?: boolean;
}
/** Option for returning raw JSON from queries. */
export interface RawJSONOptions {
    json?: boolean;
}
export interface SilentOption {
    /** Set to true to avoid firing the event. */
    silent?: boolean;
}
export interface ScopeOptions extends SessionTokenOption, UseMasterKeyOption {
}
export interface SuccessFailureOptions extends SuccessOption, ErrorOption {
}
