import type { FullOptions, RequestOptions } from './Options';
export type { FullOptions, RequestOptions };
declare const RESTController: {
    ajax(method: string, url: string, data: any, headers?: any, options?: FullOptions): Promise<any>;
    request(method: string, path: string, data: any, options?: RequestOptions): Promise<any>;
    handleError(errorJSON: any): Promise<never>;
};
export default RESTController;
