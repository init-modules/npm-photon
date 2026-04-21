import { M as WebsiteBuilderBlockDefinition, a as WebsiteBuilderBlock, N as WebsiteBuilderNestedField, O as WebsiteBuilderBlockLocalizationSchema, P as WebsiteBuilderModule, Q as WebsiteBuilderLocalizedDefaultValue, R as WebsiteBuilderRegistryEntry, A as WebsiteBuilderRegistry, S as WebsiteBuilderBlockProps, b as WebsiteBuilderDocument, y as WebsiteBuilderAccountTabExtension, c as WebsiteBuilderDocumentsMap, u as WebsiteBuilderSiteFrameExtension, T as WebsiteBuilderInstallableKit, U as WebsiteBuilderRuntime } from './types-CuFDrLWO.js';

declare const getWebsiteBuilderDefinitionKey: (moduleName: string, blockType: string) => string;
declare const createWebsiteBuilderRegistry: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderRegistry;
declare const createWebsiteBuilderLocalizedDefault: <T>(values: Record<string, T>) => WebsiteBuilderLocalizedDefaultValue<T>;
declare const createWebsiteBuilderBlockLocalizationSchema: (fields: WebsiteBuilderNestedField[]) => WebsiteBuilderBlockLocalizationSchema;
declare const createWebsiteBuilderLocalizationManifest: (modules: WebsiteBuilderModule[]) => {
    [k: string]: WebsiteBuilderBlockLocalizationSchema;
};
declare const createWebsiteBuilderBlock: <Props extends Record<string, unknown> = Record<string, unknown>>(moduleName: string, definition: WebsiteBuilderBlockDefinition<Props>, options?: {
    locale?: string;
    defaultLocale?: string;
}) => WebsiteBuilderBlock<Props>;
declare const defineWebsiteBuilderBlockDefinition: <Props extends WebsiteBuilderBlockProps>(definition: WebsiteBuilderBlockDefinition<Props>) => WebsiteBuilderBlockDefinition<Props>;
declare const moveWebsiteBuilderArrayItem: <T>(items: T[], fromIndex: number, toIndex: number) => T[];
declare const getWebsiteBuilderDocumentFingerprint: (document: WebsiteBuilderDocument) => string;

declare const createWebsiteBuilderKit: (kit: WebsiteBuilderInstallableKit) => WebsiteBuilderInstallableKit;
declare const isWebsiteBuilderInstallableKit: (entry: WebsiteBuilderRegistryEntry) => entry is WebsiteBuilderInstallableKit;
declare const resolveWebsiteBuilderModules: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderModule[];
declare const collectWebsiteBuilderDocuments: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderDocumentsMap;
declare const collectWebsiteBuilderSiteFrameExtensions: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderSiteFrameExtension[];
declare const collectWebsiteBuilderAccountTabs: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderAccountTabExtension[];

declare const createWebsiteBuilderRuntime: (entries: WebsiteBuilderRegistryEntry[]) => WebsiteBuilderRuntime;

export { createWebsiteBuilderKit as a, createWebsiteBuilderLocalizedDefault as b, createWebsiteBuilderBlockLocalizationSchema as c, createWebsiteBuilderRuntime as d, defineWebsiteBuilderBlockDefinition as e, collectWebsiteBuilderAccountTabs as f, collectWebsiteBuilderDocuments as g, collectWebsiteBuilderSiteFrameExtensions as h, createWebsiteBuilderBlock as i, createWebsiteBuilderLocalizationManifest as j, createWebsiteBuilderRegistry as k, getWebsiteBuilderDefinitionKey as l, getWebsiteBuilderDocumentFingerprint as m, isWebsiteBuilderInstallableKit as n, moveWebsiteBuilderArrayItem as o, resolveWebsiteBuilderModules as r };
