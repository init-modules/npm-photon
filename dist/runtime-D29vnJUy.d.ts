import { ak as PhotonBlockDefinition, a as PhotonBlock, al as PhotonNestedField, am as PhotonBlockLocalizationSchema, an as PhotonModule, ao as PhotonLocalizedDefaultValue, ap as PhotonRegistryEntry, a3 as PhotonRegistry, aq as PhotonBlockProps, i as PhotonDocument, a1 as PhotonAccountTabExtension, j as PhotonDocumentsMap, l as PhotonInteractionActionDefinition, v as PhotonInteractionGuardEvaluatorMap, r as PhotonInteractionGuardDefinition, A as PhotonInteractionSurfaceDefinition, Z as PhotonSiteFrameExtension, ar as PhotonInstallableKit, as as PhotonRuntime } from './types-DkoIiv0C.js';

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
declare const collectPhotonInteractionSurfaces: (entries: PhotonRegistryEntry[]) => PhotonInteractionSurfaceDefinition[];
declare const collectPhotonInteractionActions: (entries: PhotonRegistryEntry[]) => PhotonInteractionActionDefinition[];
declare const collectPhotonInteractionGuards: (entries: PhotonRegistryEntry[]) => PhotonInteractionGuardDefinition[];
declare const collectPhotonInteractionGuardEvaluators: (entries: PhotonRegistryEntry[]) => PhotonInteractionGuardEvaluatorMap;

declare const createPhotonRuntime: (entries: PhotonRegistryEntry[]) => PhotonRuntime;

export { createPhotonKit as a, createPhotonLocalizedDefault as b, createPhotonBlockLocalizationSchema as c, createPhotonRuntime as d, definePhotonBlockDefinition as e, collectPhotonAccountTabs as f, collectPhotonDocuments as g, collectPhotonInteractionActions as h, collectPhotonInteractionGuardEvaluators as i, collectPhotonInteractionGuards as j, collectPhotonInteractionSurfaces as k, collectPhotonSiteFrameExtensions as l, createPhotonBlock as m, createPhotonLocalizationManifest as n, createPhotonRegistry as o, getPhotonDefinitionKey as p, getPhotonDocumentFingerprint as q, isPhotonInstallableKit as r, movePhotonArrayItem as s, resolvePhotonModules as t };
