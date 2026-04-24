import { ReactNode, ComponentType, MouseEventHandler } from 'react';

type PhotonMode = "preview" | "content" | "builder";
type PhotonSurfaceMode = "contained" | "bleed" | "full-viewport" | "fixed-shell";
type PhotonFieldKind = "text" | "textarea" | "rich-text" | "number" | "url" | "color" | "select" | "toggle" | "tags" | "json" | "form-fields" | "object" | "repeater" | "image" | "gallery";
type PhotonFieldOption = {
    label: string;
    labelKey?: string;
    value: string;
};
type PhotonFieldLocalization = "localized" | "shared";
type PhotonLocalizedDefaultValue<T = unknown> = {
    __wbLocalizedDefault: true;
    values: Record<string, T>;
};
type PhotonNestedField = {
    path?: string;
    label?: string;
    labelKey?: string;
    kind: PhotonFieldKind;
    localization?: PhotonFieldLocalization;
    description?: string;
    descriptionKey?: string;
    group?: "content" | "style" | "layout" | "data";
    options?: PhotonFieldOption[];
    min?: number;
    max?: number;
    step?: number;
    fields?: PhotonNestedField[];
    itemField?: PhotonNestedField;
    itemLabel?: string;
    itemLabelKey?: string;
    itemLabelPath?: string;
    addLabel?: string;
    addLabelKey?: string;
    defaultValue?: unknown;
    defaultItem?: unknown;
};
type PhotonDefaultable<T> = T extends Array<infer Item> ? Array<PhotonDefaultable<Item>> | PhotonLocalizedDefaultValue<T> : T extends Record<string, unknown> ? {
    [K in keyof T]: PhotonDefaultable<T[K]>;
} | PhotonLocalizedDefaultValue<T> : T | PhotonLocalizedDefaultValue<T>;
type PhotonBlockDefaults<Props extends PhotonBlockProps = PhotonBlockProps> = {
    [K in keyof Props]: PhotonDefaultable<Props[K]>;
};
type PhotonField = PhotonNestedField & {
    path: string;
    label: string;
};
type PhotonBlockLocalizationSchema = {
    localized: string[];
    shared: string[];
};
type PhotonArea = {
    id: string;
    label?: string;
    blocks: PhotonBlock[];
};
type PhotonMediaValue = {
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
type PhotonSearchResult = {
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
type PhotonSearchInput = {
    query: string;
    limit?: number;
};
type PhotonSearchHighlight = {
    query: string;
    targetId: string;
    occurrence: number;
};
type PhotonSearchHandler = (input: PhotonSearchInput) => Promise<PhotonSearchResult[]>;
type PhotonBindingMode = "read" | "write";
type PhotonFieldBinding = {
    source: string;
    path: string;
    mode?: PhotonBindingMode;
    adapter?: string;
};
type PhotonBindingAdapter = {
    key: string;
    read?: (value: unknown) => unknown;
    write?: (value: unknown) => unknown;
};
type PhotonBlockProps = Record<string, unknown>;
type PhotonBlock<Props extends PhotonBlockProps = PhotonBlockProps> = {
    id: string;
    module: string;
    type: string;
    props: Props;
    bindings?: Record<string, PhotonFieldBinding>;
    areas?: PhotonArea[];
};
type PhotonDocument = {
    id: string;
    name: string;
    route: string;
    updatedAt: string;
    blocks: PhotonBlock[];
};
type PhotonDocumentsMap = Record<string, PhotonDocument>;
type PhotonResources = Record<string, unknown>;
type PhotonPageSettings = Record<string, unknown>;
type PhotonPageRuntimeData = Record<string, unknown>;
type PhotonSiteSettings = Record<string, unknown>;
type PhotonSiteDesignAppearance = "light" | "dark";
type PhotonSiteComponentVariants = Record<string, string>;
type PhotonSiteDesignSettings = {
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
type PhotonSiteDesignColorTokens = Pick<PhotonSiteDesignSettings, "backgroundColor" | "surfaceColor" | "textColor" | "mutedTextColor" | "accentColor" | "borderColor">;
type PhotonSiteDesignValue = Partial<PhotonSiteDesignSettings> & {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants?: PhotonSiteComponentVariants;
};
type PhotonResolvedSiteDesignSettings = PhotonSiteDesignSettings & {
    presetId?: string;
    colorSchemeId?: string;
    componentVariants: PhotonSiteComponentVariants;
};
type PhotonSiteDesignPresetDefinition = {
    id: string;
    label: string;
    appearance: PhotonSiteDesignAppearance;
    description: string;
    recommendedColorSchemeId?: string;
    designTokens: Partial<PhotonSiteDesignSettings>;
    componentVariants: PhotonSiteComponentVariants;
};
type PhotonSiteColorSchemeDefinition = {
    id: string;
    label: string;
    appearance: PhotonSiteDesignAppearance;
    description: string;
    colorTokens: PhotonSiteDesignColorTokens;
};
type PhotonSiteRegion = {
    key: string;
    label: string;
    order: number;
    lockedOnCanvas: boolean;
    document: PhotonDocument;
};
type PhotonSite = {
    settings: PhotonSiteSettings;
    regions: Record<string, PhotonSiteRegion>;
};
type PhotonSiteFrameLinkItem = {
    id?: string;
    label: string;
    href: string;
    target?: string;
    rel?: string;
    order?: number;
    enabled?: boolean;
    isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean;
};
type PhotonSiteFrameActionKind = "link" | "auth";
type PhotonSiteFrameHeaderSlot = "utility" | "navigation" | "prominent" | "actions";
type PhotonSiteFrameHeaderSlotItems = {
    links: PhotonSiteFrameLinkItem[];
    actions: PhotonSiteFrameActionItem[];
};
type PhotonSiteFrameHeaderSlots = Record<PhotonSiteFrameHeaderSlot, PhotonSiteFrameHeaderSlotItems>;
type PhotonSiteFrameFooterSlot = "navigation" | "legal";
type PhotonSiteFrameFooterSlotItems = {
    navigationColumns: PhotonSiteFrameNavigationColumn[];
    links: PhotonSiteFrameLinkItem[];
};
type PhotonSiteFrameFooterSlots = Record<PhotonSiteFrameFooterSlot, PhotonSiteFrameFooterSlotItems>;
type PhotonSiteFrameMobileMenuType = "inline" | "drawer" | "fullscreen";
type PhotonSiteFrameFloatingControls = {
    floating?: boolean;
    disableFloatingOnSmallScreens?: boolean;
};
type PhotonSiteFrameMobileMenuControls = PhotonSiteFrameFloatingControls & {
    type?: PhotonSiteFrameMobileMenuType;
    fixedTrigger?: boolean;
    scrollLock?: boolean;
};
type PhotonSiteFrameMobileBottomMenuControls = PhotonSiteFrameFloatingControls & {
    enabled?: boolean;
    showBurger?: boolean;
};
type PhotonSiteFrameMobileControls = {
    sticky?: boolean;
    menu?: PhotonSiteFrameMobileMenuControls;
    bottomMenu?: PhotonSiteFrameMobileBottomMenuControls;
};
type PhotonSiteFrameExtensionContext = {
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    mode: PhotonMode;
    isAdmin: boolean;
    currentRoute: string;
};
type PhotonSiteFrameActionComponentProps = {
    action: PhotonSiteFrameActionItem;
    className: string;
    context: PhotonSiteFrameExtensionContext;
    requestAuth?: () => void;
};
type PhotonSiteFrameActionItem = PhotonSiteFrameLinkItem & {
    kind?: PhotonSiteFrameActionKind;
    appearance?: "primary" | "secondary" | "ghost";
    authenticatedLabel?: string;
    authenticatedHref?: string;
    authenticatedTarget?: string;
    authenticatedRel?: string;
    component?: ComponentType<PhotonSiteFrameActionComponentProps>;
};
type PhotonSiteFrameNavigationColumn = {
    id?: string;
    title: string;
    links: PhotonSiteFrameLinkItem[];
    order?: number;
    enabled?: boolean;
    isVisible?: (context: PhotonSiteFrameExtensionContext) => boolean;
};
type PhotonSiteFrameExtension = {
    id: string;
    label?: string;
    enabled?: boolean;
    order?: number;
    header?: {
        slots?: Partial<Record<PhotonSiteFrameHeaderSlot, {
            links?: PhotonSiteFrameLinkItem[];
            actions?: PhotonSiteFrameActionItem[];
        }>>;
    };
    footer?: {
        slots?: Partial<Record<PhotonSiteFrameFooterSlot, {
            navigationColumns?: PhotonSiteFrameNavigationColumn[];
            links?: PhotonSiteFrameLinkItem[];
        }>>;
    };
};
type PhotonAccountTabMatch = {
    type: "exact";
    href: string;
} | {
    type: "prefix";
    href: string;
};
type PhotonAccountTabExtension = {
    id: string;
    label: string;
    href?: string;
    icon?: string;
    match?: PhotonAccountTabMatch;
    order?: number;
    enabled?: boolean;
};
type PhotonWorkspaceRef = {
    profileId: string;
    branch: string;
    revisionId?: string;
    readonly?: boolean;
};
type PhotonWorkspaceDescriptor = {
    ref: PhotonWorkspaceRef;
    headRevisionId?: string | null;
    profileName?: string | null;
    branchLabel?: string | null;
    revisionLabel?: string | null;
    readonlyReason?: "revision" | "branch-lock" | "permission" | "policy" | "unknown" | null;
};
type PhotonWorkspaceCapabilities = {
    canEdit: boolean;
    canCommit: boolean;
    canBranch: boolean;
    canMerge: boolean;
    canEditMain: boolean;
    isReadonlyRevision: boolean;
    isMainLocked: boolean;
};
type PhotonActorSummary = {
    id: string;
    type: string;
    label: string;
    email?: string | null;
};
type PhotonRevisionChangeSummaryItem = {
    path: string;
    action: "added" | "updated" | "removed" | "moved" | "conflicted";
    label?: string;
};
type PhotonRevisionDescriptor = {
    id: string;
    branch: string;
    parents: string[];
    message: string;
    createdAt: string;
    actor: PhotonActorSummary;
    treeHash?: string;
    changeSummary: PhotonRevisionChangeSummaryItem[];
};
type PhotonBranchPolicyState = {
    isMainBranch: boolean;
    isLocked: boolean;
    directWritePolicy: "allowed" | "forbidden";
    lockReason?: string | null;
    lockedAt?: string | null;
    lockedBy?: PhotonActorSummary | null;
};
type PhotonMergeResolutionStrategy = "take_source_branch" | "take_newest_change" | "manual";
type PhotonMergeDiffItem = {
    path: string;
    nodeType: string;
    change: "added" | "updated" | "removed";
    sourceRevisionId?: string;
    targetRevisionId?: string;
};
type PhotonMergeConflict = {
    path: string;
    nodeType: string;
    baseValue: unknown;
    sourceValue: unknown;
    targetValue: unknown;
    sourceRevisionId?: string;
    targetRevisionId?: string;
    resolution?: {
        kind: PhotonMergeResolutionStrategy;
        value?: unknown;
    };
};
type PhotonMergePreview = {
    mergeBaseRevisionId: string;
    conflicts: PhotonMergeConflict[];
    autoResolved: PhotonMergeDiffItem[];
    cleanChanges: PhotonMergeDiffItem[];
};
type PhotonLinkComponentProps = {
    href: string;
    locale?: string;
    className?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLElement>;
    target?: string;
    rel?: string;
    [ariaAttribute: `aria-${string}`]: string | number | boolean | undefined;
    [dataAttribute: `data-${string}`]: string | number | boolean | undefined;
};
type PhotonLinkComponent = ComponentType<PhotonLinkComponentProps>;
type PhotonLinkFactoryOptions = {
    locale?: string | null;
};
type PhotonLinkFactory = (href: string, options?: PhotonLinkFactoryOptions) => string;
type PhotonBlockComponentProps<Props extends PhotonBlockProps = PhotonBlockProps> = {
    block: PhotonBlock<Props>;
    renderArea?: (area: PhotonArea, index: number) => ReactNode;
};
type PhotonBlockComponent<Props extends PhotonBlockProps = PhotonBlockProps> = {
    bivarianceHack: (props: PhotonBlockComponentProps<Props>) => ReactNode;
}["bivarianceHack"];
type PhotonBlockDefinition<Props extends PhotonBlockProps = PhotonBlockProps> = {
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
    defaults: PhotonBlockDefaults<Props>;
    bindings?: Record<string, PhotonFieldBinding>;
    areas?: PhotonArea[];
    fields: PhotonField[];
    localizationSchema?: PhotonBlockLocalizationSchema;
    component: PhotonBlockComponent<Props>;
};
type PhotonAnyBlockDefinition = PhotonBlockDefinition<any>;
type PhotonPageSettingsPanelProps = {
    scope: PhotonPageSettingsScope;
    currentPage: PhotonPageCatalogItem | null;
    pageSettings: PhotonPageSettings;
    scopeSettings: Record<string, unknown>;
    getValue: (path: string) => unknown;
    setValue: (path: string, value: unknown) => void;
    focusField: (path: string) => void;
};
type PhotonPageSettingsScope = "page" | "record" | "template";
type PhotonPageSettingsPanelDefinition = {
    key: string;
    scope: PhotonPageSettingsScope;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    isVisible?: (context: {
        scope: PhotonPageSettingsScope;
        currentPage: PhotonPageCatalogItem | null;
        pageSettings: PhotonPageSettings;
    }) => boolean;
    component: (props: PhotonPageSettingsPanelProps) => ReactNode;
};
type PhotonSiteSettingsPanelProps = {
    currentPage: PhotonPageCatalogItem | null;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    scopeSettings: Record<string, unknown>;
    viewMode?: string;
    getValue: (path: string) => unknown;
    setValue: (path: string, value: unknown) => void;
    focusField: (path: string) => void;
};
type PhotonSiteSettingsPanelDefinition = {
    key: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    isVisible?: (context: {
        currentPage: PhotonPageCatalogItem | null;
        pageSettings: PhotonPageSettings;
        site: PhotonSite;
    }) => boolean;
    component: (props: PhotonSiteSettingsPanelProps) => ReactNode;
};
type PhotonModule = {
    module: string;
    label: string;
    labelKey?: string;
    version?: string;
    blocks: PhotonAnyBlockDefinition[];
    bindingAdapters?: PhotonBindingAdapter[];
    pageSettingsPanels?: PhotonPageSettingsPanelDefinition[];
    siteSettingsPanels?: PhotonSiteSettingsPanelDefinition[];
};
type PhotonInstallableKit = {
    key: string;
    label: string;
    modules: PhotonModule[];
    documents?: PhotonDocumentsMap;
    siteFrameExtensions?: PhotonSiteFrameExtension[];
    accountTabs?: PhotonAccountTabExtension[];
};
type PhotonRegistryEntry = PhotonModule | PhotonInstallableKit;
type PhotonLocaleStatus = "active" | "draft" | "inactive";
type PhotonLocaleDescriptor = {
    code: string;
    label: string;
    status: PhotonLocaleStatus;
    isDefault?: boolean;
    sortOrder?: number;
};
type PhotonInterfaceLocaleOption = {
    code: string;
    label: string;
};
type PhotonI18nValue = {
    defaultLocale: string;
    locale: string;
    contentLocale: string;
    interfaceLocale: string;
    interfaceLocales: PhotonInterfaceLocaleOption[];
    locales: PhotonLocaleDescriptor[];
    publicLocales: PhotonLocaleDescriptor[];
    editableLocales: PhotonLocaleDescriptor[];
    showLocaleSwitcher?: boolean;
    translate: (key: string, fallback?: string) => string;
};
type PhotonNavigationQueryKeys = {
    mode: string;
    contentLocale: string;
    profile: string;
    branch: string;
    revision: string;
};
type PhotonNavigationConfig = {
    adminPathPrefix?: string;
    queryKeys?: Partial<PhotonNavigationQueryKeys>;
};
type PhotonNavigateOptions = {
    replace?: boolean;
};
type PhotonNavigateHandler = (href: string, options?: PhotonNavigateOptions) => void | Promise<void>;
type PhotonPrefetchHandler = (href: string) => void | Promise<void>;
type PhotonAuthPageRenderInput = {
    route: string;
};
type PhotonAuthPageRenderer = (input: PhotonAuthPageRenderInput) => ReactNode;
type PhotonSelectedField = {
    blockId: string;
    path: string;
} | null;
type PhotonRegistry = {
    modules: PhotonModule[];
    definitions: Map<string, PhotonAnyBlockDefinition>;
    bindingAdapters: Map<string, PhotonBindingAdapter>;
    pageSettingsPanels: PhotonPageSettingsPanelDefinition[];
    siteSettingsPanels: PhotonSiteSettingsPanelDefinition[];
    getDefinition: (moduleName: string, blockType: string) => PhotonAnyBlockDefinition | undefined;
    getBindingAdapter: (key: string) => PhotonBindingAdapter | undefined;
    getPageSettingsPanels: () => PhotonPageSettingsPanelDefinition[];
    getSiteSettingsPanels: () => PhotonSiteSettingsPanelDefinition[];
    getPaletteBlocks: () => Array<PhotonAnyBlockDefinition & {
        module: string;
        key: string;
    }>;
};
type PhotonRuntime = {
    entries: PhotonRegistryEntry[];
    registry: PhotonRegistry;
    documents: PhotonDocumentsMap;
    siteFrameExtensions: PhotonSiteFrameExtension[];
    accountTabs: PhotonAccountTabExtension[];
};
type PhotonPageCatalogItem = {
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
type PhotonResolvedPage = {
    workspace?: PhotonWorkspaceDescriptor;
    page: PhotonPageCatalogItem;
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    runtimeData: PhotonPageRuntimeData;
    site: PhotonSite;
    pages: PhotonPageCatalogItem[];
    capabilities?: PhotonWorkspaceCapabilities;
    history?: PhotonRevisionDescriptor[];
    branchPolicy?: PhotonBranchPolicyState;
    mergePreview?: PhotonMergePreview | null;
};
type PhotonMediaUploadInput = {
    file: File;
    documentId: string;
    blockId: string;
    path: string;
};
type PhotonMediaUploadHandler = (input: PhotonMediaUploadInput) => Promise<PhotonMediaValue>;

export type { PhotonSiteComponentVariants as $, PhotonRegistry as A, PhotonRevisionDescriptor as B, PhotonBranchPolicyState as C, PhotonMergePreview as D, PhotonMode as E, PhotonMediaUploadHandler as F, PhotonSearchHandler as G, PhotonNavigateHandler as H, PhotonPrefetchHandler as I, PhotonLinkComponent as J, PhotonLinkFactory as K, PhotonI18nValue as L, PhotonField as M, PhotonPageSettingsPanelDefinition as N, PhotonSiteSettingsPanelDefinition as O, PhotonArea as P, PhotonBlockDefinition as Q, PhotonNestedField as R, PhotonBlockLocalizationSchema as S, PhotonModule as T, PhotonLocalizedDefaultValue as U, PhotonRegistryEntry as V, PhotonBlockProps as W, PhotonInstallableKit as X, PhotonRuntime as Y, PhotonSiteDesignSettings as Z, PhotonResolvedSiteDesignSettings as _, PhotonBlock as a, PhotonWorkspaceRef as a0, PhotonLinkComponentProps as a1, PhotonAuthPageRenderer as a2, PhotonNavigationConfig as a3, PhotonSiteFrameMobileControls as a4, PhotonAuthPageRenderInput as a5, PhotonBindingAdapter as a6, PhotonBlockComponentProps as a7, PhotonFieldOption as a8, PhotonLinkFactoryOptions as a9, PhotonMergeResolutionStrategy as aA, PhotonNavigationQueryKeys as aB, PhotonPageSettingsPanelProps as aC, PhotonRevisionChangeSummaryItem as aD, PhotonSearchInput as aE, PhotonSiteColorSchemeDefinition as aF, PhotonSiteDesignAppearance as aG, PhotonSiteDesignColorTokens as aH, PhotonSiteDesignPresetDefinition as aI, PhotonSiteDesignValue as aJ, PhotonSiteFrameActionKind as aK, PhotonSiteFrameNavigationColumn as aL, PhotonSiteSettingsPanelProps as aM, PhotonNavigateOptions as aa, PhotonPageSettingsScope as ab, PhotonSiteFrameActionComponentProps as ac, PhotonSiteFrameActionItem as ad, PhotonSiteFrameFloatingControls as ae, PhotonSiteFrameFooterSlot as af, PhotonSiteFrameFooterSlotItems as ag, PhotonSiteFrameHeaderSlot as ah, PhotonSiteFrameHeaderSlotItems as ai, PhotonSiteFrameLinkItem as aj, PhotonSiteFrameMobileBottomMenuControls as ak, PhotonSiteFrameMobileMenuControls as al, PhotonSiteFrameMobileMenuType as am, PhotonSelectedField as an, PhotonAccountTabMatch as ao, PhotonActorSummary as ap, PhotonAnyBlockDefinition as aq, PhotonBindingMode as ar, PhotonBlockComponent as as, PhotonBlockDefaults as at, PhotonDefaultable as au, PhotonFieldKind as av, PhotonFieldLocalization as aw, PhotonInterfaceLocaleOption as ax, PhotonMergeConflict as ay, PhotonMergeDiffItem as az, PhotonDocument as b, PhotonDocumentsMap as c, PhotonFieldBinding as d, PhotonLocaleDescriptor as e, PhotonLocaleStatus as f, PhotonMediaUploadInput as g, PhotonMediaValue as h, PhotonPageCatalogItem as i, PhotonPageRuntimeData as j, PhotonPageSettings as k, PhotonResolvedPage as l, PhotonResources as m, PhotonSearchHighlight as n, PhotonSearchResult as o, PhotonSite as p, PhotonSiteRegion as q, PhotonSiteSettings as r, PhotonWorkspaceCapabilities as s, PhotonWorkspaceDescriptor as t, PhotonSiteFrameExtension as u, PhotonSiteFrameExtensionContext as v, PhotonSiteFrameFooterSlots as w, PhotonSiteFrameHeaderSlots as x, PhotonAccountTabExtension as y, PhotonSurfaceMode as z };
