import { X as PhotonBlockDefinition, Y as PhotonBlock, Z as PhotonNestedField, _ as PhotonBlockLocalizationSchema, $ as PhotonModule, a0 as PhotonLocalizedDefaultValue, a1 as PhotonRegistryEntry, x as PhotonRegistry, a2 as PhotonBlockProps, t as PhotonDocument, d as PhotonAccountTabExtension, a3 as PhotonConditionDefinition, a4 as PhotonConditionEvaluatorMap, a5 as PhotonDocumentsMap, j as PhotonFormSchemaDescriptor, O as PhotonInteractionActionDefinition, R as PhotonInteractionGuardEvaluatorMap, Q as PhotonInteractionGuardDefinition, a6 as PhotonActionPolicy, N as PhotonInteractionSurfaceDefinition, a7 as PhotonRouteContextField, a8 as PhotonSiteDataSchema, P as PhotonSiteFrameExtension, a9 as PhotonInstallableKit, aa as PhotonRuntime } from './types-B49fMVug.js';

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
declare const collectPhotonInteractionPolicies: (entries: PhotonRegistryEntry[]) => PhotonActionPolicy[];
declare const collectPhotonConditionDefinitions: (entries: PhotonRegistryEntry[]) => PhotonConditionDefinition[];
declare const collectPhotonConditionEvaluators: (entries: PhotonRegistryEntry[]) => PhotonConditionEvaluatorMap;
declare const collectPhotonSiteDataSchemas: (entries: PhotonRegistryEntry[]) => PhotonSiteDataSchema[];
declare const collectPhotonRouteContextFields: (entries: PhotonRegistryEntry[]) => PhotonRouteContextField[];
declare const collectPhotonFormSchemas: (entries: PhotonRegistryEntry[]) => PhotonFormSchemaDescriptor[];

declare const createPhotonRuntime: (entries: PhotonRegistryEntry[]) => PhotonRuntime;

export { createPhotonKit as a, createPhotonLocalizedDefault as b, createPhotonBlockLocalizationSchema as c, createPhotonRuntime as d, definePhotonBlockDefinition as e, collectPhotonAccountTabs as f, collectPhotonConditionDefinitions as g, collectPhotonConditionEvaluators as h, collectPhotonDocuments as i, collectPhotonFormSchemas as j, collectPhotonInteractionActions as k, collectPhotonInteractionGuardEvaluators as l, collectPhotonInteractionGuards as m, collectPhotonInteractionPolicies as n, collectPhotonInteractionSurfaces as o, collectPhotonRouteContextFields as p, collectPhotonSiteDataSchemas as q, collectPhotonSiteFrameExtensions as r, createPhotonBlock as s, createPhotonLocalizationManifest as t, createPhotonRegistry as u, getPhotonDefinitionKey as v, getPhotonDocumentFingerprint as w, isPhotonInstallableKit as x, movePhotonArrayItem as y, resolvePhotonModules as z };
