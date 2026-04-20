import { ReactNode, ComponentType, MouseEventHandler } from 'react';

type WebsiteBuilderMode = "preview" | "content" | "builder";
type WebsiteBuilderSurfaceMode = "contained" | "bleed" | "full-viewport" | "fixed-shell";
type WebsiteBuilderFieldKind = "text" | "textarea" | "rich-text" | "number" | "url" | "color" | "select" | "toggle" | "tags" | "json" | "form-fields" | "object" | "repeater" | "image" | "gallery";
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
type WebsiteBuilderSiteFrameLinkItem = {
    id?: string;
    label: string;
    href: string;
    target?: string;
    rel?: string;
    order?: number;
    enabled?: boolean;
};
type WebsiteBuilderSiteFrameActionKind = "link" | "auth";
type WebsiteBuilderSiteFrameActionItem = WebsiteBuilderSiteFrameLinkItem & {
    kind?: WebsiteBuilderSiteFrameActionKind;
    appearance?: "primary" | "secondary" | "ghost";
    authenticatedLabel?: string;
    authenticatedHref?: string;
    authenticatedTarget?: string;
    authenticatedRel?: string;
};
type WebsiteBuilderSiteFrameNavigationColumn = {
    id?: string;
    title: string;
    links: WebsiteBuilderSiteFrameLinkItem[];
    order?: number;
    enabled?: boolean;
};
type WebsiteBuilderSiteFrameExtension = {
    id: string;
    label?: string;
    enabled?: boolean;
    order?: number;
    header?: {
        utilityLinks?: WebsiteBuilderSiteFrameLinkItem[];
        categoryLinks?: WebsiteBuilderSiteFrameLinkItem[];
        actions?: WebsiteBuilderSiteFrameActionItem[];
    };
    footer?: {
        navigationColumns?: WebsiteBuilderSiteFrameNavigationColumn[];
        legalLinks?: WebsiteBuilderSiteFrameLinkItem[];
    };
};
type WebsiteBuilderAccountTabExtension = {
    id: string;
    label: string;
    href?: string;
    order?: number;
    enabled?: boolean;
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
    siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
    accountTabs?: WebsiteBuilderAccountTabExtension[];
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
    siteFrameExtensions: WebsiteBuilderSiteFrameExtension[];
    accountTabs: WebsiteBuilderAccountTabExtension[];
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

export type { WebsiteBuilderBlockDefaults as $, WebsiteBuilderRegistry as A, WebsiteBuilderRevisionDescriptor as B, WebsiteBuilderBranchPolicyState as C, WebsiteBuilderMergePreview as D, WebsiteBuilderMode as E, WebsiteBuilderMediaUploadHandler as F, WebsiteBuilderSearchHandler as G, WebsiteBuilderLinkComponent as H, WebsiteBuilderI18nValue as I, WebsiteBuilderField as J, WebsiteBuilderPageSettingsPanelDefinition as K, WebsiteBuilderSiteSettingsPanelDefinition as L, WebsiteBuilderSiteDesignSettings as M, WebsiteBuilderResolvedSiteDesignSettings as N, WebsiteBuilderSiteComponentVariants as O, WebsiteBuilderWorkspaceRef as P, WebsiteBuilderSelectedField as Q, WebsiteBuilderLinkComponentProps as R, WebsiteBuilderBindingAdapter as S, WebsiteBuilderInstallableKit as T, WebsiteBuilderModule as U, WebsiteBuilderActorSummary as V, WebsiteBuilderArea as W, WebsiteBuilderAnyBlockDefinition as X, WebsiteBuilderBindingMode as Y, WebsiteBuilderBlockComponent as Z, WebsiteBuilderBlockComponentProps as _, WebsiteBuilderBlock as a, WebsiteBuilderBlockDefinition as a0, WebsiteBuilderBlockLocalizationSchema as a1, WebsiteBuilderBlockProps as a2, WebsiteBuilderDefaultable as a3, WebsiteBuilderFieldKind as a4, WebsiteBuilderFieldLocalization as a5, WebsiteBuilderFieldOption as a6, WebsiteBuilderInterfaceLocaleOption as a7, WebsiteBuilderLocalizedDefaultValue as a8, WebsiteBuilderMergeConflict as a9, WebsiteBuilderMergeDiffItem as aa, WebsiteBuilderMergeResolutionStrategy as ab, WebsiteBuilderNestedField as ac, WebsiteBuilderPageSettingsPanelProps as ad, WebsiteBuilderPageSettingsScope as ae, WebsiteBuilderRegistryEntry as af, WebsiteBuilderRevisionChangeSummaryItem as ag, WebsiteBuilderRuntime as ah, WebsiteBuilderSearchInput as ai, WebsiteBuilderSiteColorSchemeDefinition as aj, WebsiteBuilderSiteDesignAppearance as ak, WebsiteBuilderSiteDesignColorTokens as al, WebsiteBuilderSiteDesignPresetDefinition as am, WebsiteBuilderSiteDesignValue as an, WebsiteBuilderSiteFrameActionKind as ao, WebsiteBuilderSiteSettingsPanelProps as ap, WebsiteBuilderDocument as b, WebsiteBuilderDocumentsMap as c, WebsiteBuilderFieldBinding as d, WebsiteBuilderLocaleDescriptor as e, WebsiteBuilderLocaleStatus as f, WebsiteBuilderMediaUploadInput as g, WebsiteBuilderMediaValue as h, WebsiteBuilderPageCatalogItem as i, WebsiteBuilderPageRuntimeData as j, WebsiteBuilderPageSettings as k, WebsiteBuilderResolvedPage as l, WebsiteBuilderResources as m, WebsiteBuilderSearchHighlight as n, WebsiteBuilderSearchResult as o, WebsiteBuilderSite as p, WebsiteBuilderSiteRegion as q, WebsiteBuilderSiteSettings as r, WebsiteBuilderWorkspaceCapabilities as s, WebsiteBuilderWorkspaceDescriptor as t, WebsiteBuilderSiteFrameExtension as u, WebsiteBuilderSiteFrameNavigationColumn as v, WebsiteBuilderSiteFrameLinkItem as w, WebsiteBuilderSiteFrameActionItem as x, WebsiteBuilderAccountTabExtension as y, WebsiteBuilderSurfaceMode as z };
