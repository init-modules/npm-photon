import { M as PhotonBlockDefinition, a as PhotonBlock, N as PhotonNestedField, O as PhotonBlockLocalizationSchema, Q as PhotonModule, R as PhotonLocalizedDefaultValue, S as PhotonRegistryEntry, A as PhotonRegistry, T as PhotonBlockProps, b as PhotonDocument, y as PhotonAccountTabExtension, c as PhotonDocumentsMap, u as PhotonSiteFrameExtension, U as PhotonInstallableKit, V as PhotonRuntime } from './types-BAycJgQn.js';

declare const getPhotonDefinitionKey: (moduleName: string, blockType: string) => string;
declare const createPhotonRegistry: (entries: PhotonRegistryEntry[]) => PhotonRegistry;
declare const createPhotonLocalizedDefault: <T>(values: Record<string, T>) => PhotonLocalizedDefaultValue<T>;
declare const createPhotonBlockLocalizationSchema: (fields: PhotonNestedField[]) => PhotonBlockLocalizationSchema;
declare const createPhotonLocalizationManifest: (modules: PhotonModule[]) => {
    [k: string]: PhotonBlockLocalizationSchema;
};
declare const createPhotonBlock: <Props extends Record<string, unknown> = Record<string, unknown>>(moduleName: string, definition: PhotonBlockDefinition<Props>, options?: {
    locale?: string;
    defaultLocale?: string;
}) => PhotonBlock<Props>;
declare const definePhotonBlockDefinition: <Props extends PhotonBlockProps>(definition: PhotonBlockDefinition<Props>) => PhotonBlockDefinition<Props>;
declare const movePhotonArrayItem: <T>(items: T[], fromIndex: number, toIndex: number) => T[];
declare const getPhotonDocumentFingerprint: (document: PhotonDocument) => string;

declare const createPhotonKit: (kit: PhotonInstallableKit) => PhotonInstallableKit;
declare const isPhotonInstallableKit: (entry: PhotonRegistryEntry) => entry is PhotonInstallableKit;
declare const resolvePhotonModules: (entries: PhotonRegistryEntry[]) => PhotonModule[];
declare const collectPhotonDocuments: (entries: PhotonRegistryEntry[]) => PhotonDocumentsMap;
declare const collectPhotonSiteFrameExtensions: (entries: PhotonRegistryEntry[]) => PhotonSiteFrameExtension[];
declare const collectPhotonAccountTabs: (entries: PhotonRegistryEntry[]) => PhotonAccountTabExtension[];

declare const createPhotonRuntime: (entries: PhotonRegistryEntry[]) => PhotonRuntime;

export { createPhotonKit as a, createPhotonLocalizedDefault as b, createPhotonBlockLocalizationSchema as c, createPhotonRuntime as d, definePhotonBlockDefinition as e, collectPhotonAccountTabs as f, collectPhotonDocuments as g, collectPhotonSiteFrameExtensions as h, createPhotonBlock as i, createPhotonLocalizationManifest as j, createPhotonRegistry as k, getPhotonDefinitionKey as l, getPhotonDocumentFingerprint as m, isPhotonInstallableKit as n, movePhotonArrayItem as o, resolvePhotonModules as r };
