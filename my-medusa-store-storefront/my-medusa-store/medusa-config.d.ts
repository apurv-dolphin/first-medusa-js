/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
export const projectConfig: import('@medusajs/medusa').ConfigModule["projectConfig"];
export const plugins: (string | {
    resolve: string;
    options: {
        upload_dir: string;
        applicationId?: undefined;
        adminApiKey?: undefined;
        settings?: undefined;
    };
} | {
    resolve: string;
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: import('@medusajs/admin').PluginOptions;
} | {
    resolve: string;
    options: {
        applicationId: string;
        adminApiKey: string;
        settings: {
            products: {
                indexSettings: {
                    searchableAttributes: string[];
                    attributesToRetrieve: string[];
                };
            };
        };
        upload_dir?: undefined;
    };
})[];
export const modules: {};
