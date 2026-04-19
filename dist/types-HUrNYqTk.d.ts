import { ReactNode, ComponentType, MouseEventHandler } from 'react';

type WebsiteBuilderMode = "preview" | "content" | "builder";
type WebsiteBuilderSurfaceMode = "contained" | "bleed" | "full-viewport" | "fixed-shell";
type WebsiteBuilderFieldKind = "text" | "textarea" | "rich-text" | "number" | "url" | "color" | "select" | "toggle" | "tags" | "json" | "object" | "repeater" | "image" | "gallery";
type WebsiteBuilderFieldOption = {
    label: string;
    labelKey?: string;
    value: string;
};
type WebsiteBuilderFieldLocalization = "localized" | "shared";
type WebsiteBuilderLocalizedDefaultValue<T = unknown> = {
    __wbLocalizedDefault: true;
    values: Record<string, T>;
};
type WebsiteBuilderNestedField = {
    path?: string;
    label?: string;
    labelKey?: string;
    kind: WebsiteBuilderFieldKind;
    localization?: WebsiteBuilderFieldLocalization;
    description?: string;
    descriptionKey?: string;
    group?: "content" | "style" | "layout" | "data";
    options?: WebsiteBuilderFieldOption[];
    min?: number;
    max?: number;
    step?: number;
    fields?: WebsiteBuilderNestedField[];
    itemField?: WebsiteBuilderNestedField;
    itemLabel?: string;
    itemLabelKey?: string;
    itemLabelPath?: string;
    addLabel?: string;
    addLabelKey?: string;
    defaultValue?: unknown;
    defaultItem?: unknown;
};
type WebsiteBuilderDefaultable<T> = T extends Array<infer Item> ? Array<WebsiteBuilderDefaultable<Item>> | WebsiteBuilderLocalizedDefaultValue<T> : T extends Record<string, unknown> ? {
    [K in keyof T]: WebsiteBuilderDefaultable<T[K]>;
} | WebsiteBuilderLocalizedDefaultValue<T> : T | WebsiteBuilderLocalizedDefaultValue<T>;
type WebsiteBuilderBlockDefaults<Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps> = {
    [K in keyof Props]: WebsiteBuilderDefaultable<Props[K]>;
};
type WebsiteBuilderField = WebsiteBuilderNestedField & {
    path: string;
    label: string;
};
type WebsiteBuilderBlockLocalizationSchema = {
    localized: string[];
    shared: string[];
};
type WebsiteBuilderArea = {
    id: string;
    label?: string;
    blocks: WebsiteBuilderBlock[];
};
type WebsiteBuilderMediaValue = {
    kind: "media";
    url: string;
    previewUrl?: string | null;
    temporaryUploadId?: string | null;
    mediaId?: string | null;
    name?: string | null;
    fileName?: string | null;
    mimeType?: string | null;
    size?: number | null;
    extension?: string | null;
    width?: number | null;
    height?: number | null;
    context?: string | null;
    expiresAt?: string | null;
    uploadedAt?: string | null;
};
type WebsiteBuilderSearchResult = {
    id: string;
    pageKey: string;
    pageName: string;
    pageGroup?: string | null;
    pageKind: "page" | "template";
    route: string;
    blockId: string;
    path: string;
    targetId: string;
    occurrence: number;
    snippet: string;
};
type WebsiteBuilderSearchInput = {
    query: string;
    limit?: number;
};
type WebsiteBuilderSearchHighlight = {
    query: string;
    targetId: string;
    occurrence: number;
};
type WebsiteBuilderSearchHandler = (input: WebsiteBuilderSearchInput) => Promise<WebsiteBuilderSearchResult[]>;
type WebsiteBuilderBindingMode = "read" | "write";
type WebsiteBuilderFieldBinding = {
    source: string;
    path: string;
    mode?: WebsiteBuilderBindingMode;
    adapter?: string;
};
type WebsiteBuilderBindingAdapter = {
    key: string;
    read?: (value: unknown) => unknown;
    write?: (value: unknown) => unknown;
};
type WebsiteBuilderBlockProps = Record<string, unknown>;
type WebsiteBuilderBlock<Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps> = {
    id: string;
    module: string;
    type: string;
    props: Props;
    bindings?: Record<string, WebsiteBuilderFieldBinding>;
    areas?: WebsiteBuilderArea[];
};
type WebsiteBuilderDocument = {
    id: string;
    name: string;
    route: string;
    updatedAt: string;
    blocks: WebsiteBuilderBlock[];
};
type WebsiteBuilderDocumentsMap = Record<string, WebsiteBuilderDocument>;
type WebsiteBuilderResources = Record<string, unknown>;
type WebsiteBuilderPageSettings = Record<string, unknown>;
type WebsiteBuilderPageRuntimeData = Record<string, unknown>;
type WebsiteBuilderSiteSettings = Record<string, unknown>;
type WebsiteBuilderSiteDesignAppearance = "light" | "dark";
type WebsiteBuilderSiteComponentVariants = Record<string, string>;
type WebsiteBuilderSiteDesignSettings = {
    bodyFontFamily: string;
    headingFontFamily: string;
    backgroundColor: string;
    surfaceColor: string;
    textColor: string;
    mutedTextColor: string;
    accentColor: string;
    borderColor: string;
    siteMaxWidth: string;
    pageGutter: string;
    sectionGap: string;
    radius: string;
    headerOffset: string;
};
type WebsiteBuilderSiteDesignColorTokens = Pick<WebsiteBuilderSiteDesignSettings, "backgroundColor" | "surfaceColor" | "textColor" | "mutedTextColor" | "accentColor" | "borderColor">;
type WebsiteBuilderSiteDesignValue = Partial<WebsiteBuilderSiteDesignSettings> & {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants?: WebsiteBuilderSiteComponentVariants;
};
type WebsiteBuilderResolvedSiteDesignSettings = WebsiteBuilderSiteDesignSettings & {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants: WebsiteBuilderSiteComponentVariants;
};
type WebsiteBuilderSiteDesignPresetDefinition = {
    id: string;
    label: string;
    appearance: WebsiteBuilderSiteDesignAppearance;
    description: string;
    recommendedColorSchemeId?: string;
    designTokens: Partial<WebsiteBuilderSiteDesignSettings>;
    componentVariants: WebsiteBuilderSiteComponentVariants;
};
type WebsiteBuilderSiteColorSchemeDefinition = {
    id: string;
    label: string;
    appearance: WebsiteBuilderSiteDesignAppearance;
    description: string;
    colorTokens: WebsiteBuilderSiteDesignColorTokens;
};
type WebsiteBuilderSiteRegion = {
    key: string;
    label: string;
    order: number;
    lockedOnCanvas: boolean;
    document: WebsiteBuilderDocument;
};
type WebsiteBuilderSite = {
    settings: WebsiteBuilderSiteSettings;
    regions: Record<string, WebsiteBuilderSiteRegion>;
};
type WebsiteBuilderWorkspaceRef = {
    profileId: string;
    branch: string;
    revisionId?: string;
    readonly?: boolean;
};
type WebsiteBuilderWorkspaceDescriptor = {
    ref: WebsiteBuilderWorkspaceRef;
    headRevisionId?: string | null;
    profileName?: string | null;
    branchLabel?: string | null;
    revisionLabel?: string | null;
    readonlyReason?: "revision" | "branch-lock" | "permission" | "policy" | "unknown" | null;
};
type WebsiteBuilderWorkspaceCapabilities = {
    canEdit: boolean;
    canCommit: boolean;
    canBranch: boolean;
    canMerge: boolean;
    canEditMain: boolean;
    isReadonlyRevision: boolean;
    isMainLocked: boolean;
};
type WebsiteBuilderActorSummary = {
    id: string;
    type: string;
    label: string;
    email?: string | null;
};
type WebsiteBuilderRevisionChangeSummaryItem = {
    path: string;
    action: "added" | "updated" | "removed" | "moved" | "conflicted";
    label?: string;
};
type WebsiteBuilderRevisionDescriptor = {
    id: string;
    branch: string;
    parents: string[];
    message: string;
    createdAt: string;
    actor: WebsiteBuilderActorSummary;
    treeHash?: string;
    changeSummary: WebsiteBuilderRevisionChangeSummaryItem[];
};
type WebsiteBuilderBranchPolicyState = {
    isMainBranch: boolean;
    isLocked: boolean;
    directWritePolicy: "allowed" | "forbidden";
    lockReason?: string | null;
    lockedAt?: string | null;
    lockedBy?: WebsiteBuilderActorSummary | null;
};
type WebsiteBuilderMergeResolutionStrategy = "take_source_branch" | "take_newest_change" | "manual";
type WebsiteBuilderMergeDiffItem = {
    path: string;
    nodeType: string;
    change: "added" | "updated" | "removed";
    sourceRevisionId?: string;
    targetRevisionId?: string;
};
type WebsiteBuilderMergeConflict = {
    path: string;
    nodeType: string;
    baseValue: unknown;
    sourceValue: unknown;
    targetValue: unknown;
    sourceRevisionId?: string;
    targetRevisionId?: string;
    resolution?: {
        kind: WebsiteBuilderMergeResolutionStrategy;
        value?: unknown;
    };
};
type WebsiteBuilderMergePreview = {
    mergeBaseRevisionId: string;
    conflicts: WebsiteBuilderMergeConflict[];
    autoResolved: WebsiteBuilderMergeDiffItem[];
    cleanChanges: WebsiteBuilderMergeDiffItem[];
};
type WebsiteBuilderLinkComponentProps = {
    href: string;
    locale?: string;
    className?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLElement>;
    target?: string;
    rel?: string;
};
type WebsiteBuilderLinkComponent = ComponentType<WebsiteBuilderLinkComponentProps>;
type WebsiteBuilderBlockComponentProps<Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps> = {
    block: WebsiteBuilderBlock<Props>;
    renderArea?: (area: WebsiteBuilderArea, index: number) => ReactNode;
};
type WebsiteBuilderBlockComponent<Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps> = {
    bivarianceHack: (props: WebsiteBuilderBlockComponentProps<Props>) => ReactNode;
}["bivarianceHack"];
type WebsiteBuilderBlockDefinition<Props extends WebsiteBuilderBlockProps = WebsiteBuilderBlockProps> = {
    type: string;
    label: string;
    labelKey?: string;
    description: string;
    descriptionKey?: string;
    category: string;
    family?: string;
    group?: string;
    package?: string;
    icon?: string;
    defaults: WebsiteBuilderBlockDefaults<Props>;
    bindings?: Record<string, WebsiteBuilderFieldBinding>;
    areas?: WebsiteBuilderArea[];
    fields: WebsiteBuilderField[];
    localizationSchema?: WebsiteBuilderBlockLocalizationSchema;
    component: WebsiteBuilderBlockComponent<Props>;
};
type WebsiteBuilderAnyBlockDefinition = WebsiteBuilderBlockDefinition<any>;
type WebsiteBuilderPageSettingsPanelProps = {
    scope: WebsiteBuilderPageSettingsScope;
    currentPage: WebsiteBuilderPageCatalogItem | null;
    pageSettings: WebsiteBuilderPageSettings;
    scopeSettings: Record<string, unknown>;
    getValue: (path: string) => unknown;
    setValue: (path: string, value: unknown) => void;
    focusField: (path: string) => void;
};
type WebsiteBuilderPageSettingsScope = "page" | "record" | "template";
type WebsiteBuilderPageSettingsPanelDefinition = {
    key: string;
    scope: WebsiteBuilderPageSettingsScope;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    isVisible?: (context: {
        scope: WebsiteBuilderPageSettingsScope;
        currentPage: WebsiteBuilderPageCatalogItem | null;
        pageSettings: WebsiteBuilderPageSettings;
    }) => boolean;
    component: (props: WebsiteBuilderPageSettingsPanelProps) => ReactNode;
};
type WebsiteBuilderSiteSettingsPanelProps = {
    currentPage: WebsiteBuilderPageCatalogItem | null;
    pageSettings: WebsiteBuilderPageSettings;
    site: WebsiteBuilderSite;
    scopeSettings: Record<string, unknown>;
    viewMode?: string;
    getValue: (path: string) => unknown;
    setValue: (path: string, value: unknown) => void;
    focusField: (path: string) => void;
};
type WebsiteBuilderSiteSettingsPanelDefinition = {
    key: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    isVisible?: (context: {
        currentPage: WebsiteBuilderPageCatalogItem | null;
        pageSettings: WebsiteBuilderPageSettings;
        site: WebsiteBuilderSite;
    }) => boolean;
    component: (props: WebsiteBuilderSiteSettingsPanelProps) => ReactNode;
};
type WebsiteBuilderModule = {
    module: string;
    label: string;
    labelKey?: string;
    version?: string;
    blocks: WebsiteBuilderAnyBlockDefinition[];
    bindingAdapters?: WebsiteBuilderBindingAdapter[];
    pageSettingsPanels?: WebsiteBuilderPageSettingsPanelDefinition[];
    siteSettingsPanels?: WebsiteBuilderSiteSettingsPanelDefinition[];
};
type WebsiteBuilderInstallableKit = {
    key: string;
    label: string;
    modules: WebsiteBuilderModule[];
    documents?: WebsiteBuilderDocumentsMap;
};
type WebsiteBuilderRegistryEntry = WebsiteBuilderModule | WebsiteBuilderInstallableKit;
type WebsiteBuilderLocaleStatus = "active" | "draft" | "inactive";
type WebsiteBuilderLocaleDescriptor = {
    code: string;
    label: string;
    status: WebsiteBuilderLocaleStatus;
    isDefault?: boolean;
    sortOrder?: number;
};
type WebsiteBuilderInterfaceLocaleOption = {
    code: string;
    label: string;
};
type WebsiteBuilderI18nValue = {
    defaultLocale: string;
    locale: string;
    contentLocale: string;
    interfaceLocale: string;
    interfaceLocales: WebsiteBuilderInterfaceLocaleOption[];
    locales: WebsiteBuilderLocaleDescriptor[];
    publicLocales: WebsiteBuilderLocaleDescriptor[];
    editableLocales: WebsiteBuilderLocaleDescriptor[];
    showLocaleSwitcher?: boolean;
    translate: (key: string, fallback?: string) => string;
};
type WebsiteBuilderSelectedField = {
    blockId: string;
    path: string;
} | null;
type WebsiteBuilderRegistry = {
    modules: WebsiteBuilderModule[];
    definitions: Map<string, WebsiteBuilderAnyBlockDefinition>;
    bindingAdapters: Map<string, WebsiteBuilderBindingAdapter>;
    pageSettingsPanels: WebsiteBuilderPageSettingsPanelDefinition[];
    siteSettingsPanels: WebsiteBuilderSiteSettingsPanelDefinition[];
    getDefinition: (moduleName: string, blockType: string) => WebsiteBuilderAnyBlockDefinition | undefined;
    getBindingAdapter: (key: string) => WebsiteBuilderBindingAdapter | undefined;
    getPageSettingsPanels: () => WebsiteBuilderPageSettingsPanelDefinition[];
    getSiteSettingsPanels: () => WebsiteBuilderSiteSettingsPanelDefinition[];
    getPaletteBlocks: () => Array<WebsiteBuilderAnyBlockDefinition & {
        module: string;
        key: string;
    }>;
};
type WebsiteBuilderRuntime = {
    entries: WebsiteBuilderRegistryEntry[];
    registry: WebsiteBuilderRegistry;
    documents: WebsiteBuilderDocumentsMap;
};
type WebsiteBuilderPageCatalogItem = {
    key: string;
    name: string;
    description?: string | null;
    group?: string | null;
    kind: "page" | "template";
    route: string;
    routePattern?: string | null;
    navigationRoute?: string | null;
    canOpen: boolean;
    canDuplicate: boolean;
    isDynamic: boolean;
};
type WebsiteBuilderResolvedPage = {
    workspace?: WebsiteBuilderWorkspaceDescriptor;
    page: WebsiteBuilderPageCatalogItem;
    document: WebsiteBuilderDocument;
    resources: WebsiteBuilderResources;
    pageSettings: WebsiteBuilderPageSettings;
    runtimeData: WebsiteBuilderPageRuntimeData;
    site: WebsiteBuilderSite;
    pages: WebsiteBuilderPageCatalogItem[];
    capabilities?: WebsiteBuilderWorkspaceCapabilities;
    history?: WebsiteBuilderRevisionDescriptor[];
    branchPolicy?: WebsiteBuilderBranchPolicyState;
    mergePreview?: WebsiteBuilderMergePreview | null;
};
type WebsiteBuilderMediaUploadInput = {
    file: File;
    documentId: string;
    blockId: string;
    path: string;
};
type WebsiteBuilderMediaUploadHandler = (input: WebsiteBuilderMediaUploadInput) => Promise<WebsiteBuilderMediaValue>;

export type { WebsiteBuilderFieldKind as $, WebsiteBuilderMediaUploadHandler as A, WebsiteBuilderSearchHandler as B, WebsiteBuilderLinkComponent as C, WebsiteBuilderI18nValue as D, WebsiteBuilderField as E, WebsiteBuilderPageSettingsPanelDefinition as F, WebsiteBuilderSiteSettingsPanelDefinition as G, WebsiteBuilderSiteDesignSettings as H, WebsiteBuilderResolvedSiteDesignSettings as I, WebsiteBuilderSiteComponentVariants as J, WebsiteBuilderWorkspaceRef as K, WebsiteBuilderSelectedField as L, WebsiteBuilderLinkComponentProps as M, WebsiteBuilderBindingAdapter as N, WebsiteBuilderInstallableKit as O, WebsiteBuilderModule as P, WebsiteBuilderActorSummary as Q, WebsiteBuilderAnyBlockDefinition as R, WebsiteBuilderBindingMode as S, WebsiteBuilderBlockComponent as T, WebsiteBuilderBlockComponentProps as U, WebsiteBuilderBlockDefaults as V, WebsiteBuilderArea as W, WebsiteBuilderBlockDefinition as X, WebsiteBuilderBlockLocalizationSchema as Y, WebsiteBuilderBlockProps as Z, WebsiteBuilderDefaultable as _, WebsiteBuilderBlock as a, WebsiteBuilderFieldLocalization as a0, WebsiteBuilderFieldOption as a1, WebsiteBuilderInterfaceLocaleOption as a2, WebsiteBuilderLocalizedDefaultValue as a3, WebsiteBuilderMergeConflict as a4, WebsiteBuilderMergeDiffItem as a5, WebsiteBuilderMergeResolutionStrategy as a6, WebsiteBuilderNestedField as a7, WebsiteBuilderPageSettingsPanelProps as a8, WebsiteBuilderPageSettingsScope as a9, WebsiteBuilderRegistryEntry as aa, WebsiteBuilderRevisionChangeSummaryItem as ab, WebsiteBuilderRuntime as ac, WebsiteBuilderSearchInput as ad, WebsiteBuilderSiteColorSchemeDefinition as ae, WebsiteBuilderSiteDesignAppearance as af, WebsiteBuilderSiteDesignColorTokens as ag, WebsiteBuilderSiteDesignPresetDefinition as ah, WebsiteBuilderSiteDesignValue as ai, WebsiteBuilderSiteSettingsPanelProps as aj, WebsiteBuilderDocument as b, WebsiteBuilderDocumentsMap as c, WebsiteBuilderFieldBinding as d, WebsiteBuilderLocaleDescriptor as e, WebsiteBuilderLocaleStatus as f, WebsiteBuilderMediaUploadInput as g, WebsiteBuilderMediaValue as h, WebsiteBuilderPageCatalogItem as i, WebsiteBuilderPageRuntimeData as j, WebsiteBuilderPageSettings as k, WebsiteBuilderResolvedPage as l, WebsiteBuilderResources as m, WebsiteBuilderSearchHighlight as n, WebsiteBuilderSearchResult as o, WebsiteBuilderSite as p, WebsiteBuilderSiteRegion as q, WebsiteBuilderSiteSettings as r, WebsiteBuilderWorkspaceCapabilities as s, WebsiteBuilderWorkspaceDescriptor as t, WebsiteBuilderSurfaceMode as u, WebsiteBuilderRegistry as v, WebsiteBuilderRevisionDescriptor as w, WebsiteBuilderBranchPolicyState as x, WebsiteBuilderMergePreview as y, WebsiteBuilderMode as z };
