import { ComponentType, ReactNode, MouseEventHandler } from 'react';

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
type PhotonInteractionSurfaceKind = "dialog" | "panel" | "toast";
type PhotonInteractionSurfaceVariant = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
};
type PhotonInteractionSurfaceInstance = {
    id: string;
    definitionId: string;
    label: string;
    labelKey?: string;
    variant?: string;
    enabled?: boolean;
    props?: Record<string, unknown>;
};
type PhotonInteractionSurfaceIntentBinding = {
    intent: string;
    surfaceInstanceId: string;
    enabled?: boolean;
    overrides?: Record<string, unknown>;
    payload?: Record<string, unknown>;
};
type PhotonInteractionToastStatus = "message" | "success" | "error" | "info" | "warning";
type PhotonInteractionToastTemplate = {
    id: string;
    label: string;
    labelKey?: string;
    status?: PhotonInteractionToastStatus;
    title: string;
    titleKey?: string;
    description?: string;
    descriptionKey?: string;
    enabled?: boolean;
    props?: Record<string, unknown>;
};
type PhotonInteractionSurfaceDefinition = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    kind: PhotonInteractionSurfaceKind;
    rendererKey: string;
    order?: number;
    variants?: PhotonInteractionSurfaceVariant[];
    fields?: PhotonField[];
    defaultInstances?: PhotonInteractionSurfaceInstance[];
    defaultIntentBindings?: PhotonInteractionSurfaceIntentBinding[];
    defaultToastTemplates?: PhotonInteractionToastTemplate[];
};
type PhotonInteractionSurfaceSettings = {
    instances?: Record<string, PhotonInteractionSurfaceInstance>;
    intents?: Record<string, PhotonInteractionSurfaceIntentBinding>;
    toastTemplates?: Record<string, PhotonInteractionToastTemplate>;
};
type PhotonInteractionSurfaceTrigger = {
    intent?: string;
    surfaceInstanceId?: string;
    overrides?: Record<string, unknown>;
    payload?: Record<string, unknown>;
    fallbackHref?: string;
};
type PhotonActionValue = {
    type: "link";
    href: string;
    target?: string;
    rel?: string;
} | ({
    type: "interaction";
} & PhotonInteractionSurfaceTrigger);
type PhotonResolvedInteractionSurfaceCatalog = {
    definitions: PhotonInteractionSurfaceDefinition[];
    definitionsById: Map<string, PhotonInteractionSurfaceDefinition>;
    instances: Record<string, PhotonInteractionSurfaceInstance>;
    intents: Record<string, PhotonInteractionSurfaceIntentBinding>;
    toastTemplates: Record<string, PhotonInteractionToastTemplate>;
};
type PhotonResolvedInteractionSurfaceRequest = {
    definition: PhotonInteractionSurfaceDefinition;
    instance: PhotonInteractionSurfaceInstance;
    trigger: PhotonInteractionSurfaceTrigger;
    props: Record<string, unknown>;
    payload: Record<string, unknown>;
    fallbackHref?: string;
};
type PhotonInteractionSurfaceRendererProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: PhotonResolvedInteractionSurfaceRequest;
    previewMode?: "runtime" | "builder-inline";
    previewScenarioId?: string;
};
type PhotonInteractionSurfaceRenderer = ComponentType<PhotonInteractionSurfaceRendererProps>;
type PhotonInteractionSurfaceRendererMap = Record<string, PhotonInteractionSurfaceRenderer>;
type PhotonInteractionSurfaceOpenHandler = (trigger: PhotonInteractionSurfaceTrigger) => boolean;
type PhotonInteractionToastInput = {
    templateId: string;
    overrides?: Partial<Pick<PhotonInteractionToastTemplate, "status" | "title" | "description" | "props">>;
};
type PhotonInteractionToastHandler = (input: PhotonInteractionToastInput) => boolean;
type PhotonInteractionPreviewScenario = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    resources?: Record<string, unknown>;
    props?: Record<string, unknown>;
};
type PhotonInteractionGuardEvaluationResult = {
    status: "allowed";
    reason?: string;
} | {
    status: "blocked";
    reason?: string;
    action?: PhotonInteractionActionPresentation;
};
type PhotonInteractionGuardMissingEvaluatorPolicy = "block" | "allow";
type PhotonInteractionExecutionStatus = "executed" | "blocked" | "missing-action" | "missing-evaluator" | "missing-renderer" | "fallback";
type PhotonInteractionExecutionResult = {
    status: PhotonInteractionExecutionStatus;
    executed: boolean;
    reason?: string;
    action?: PhotonInteractionActionPresentation | null;
    guard?: PhotonInteractionGuardInstance;
    fallbackHref?: string;
};
type PhotonInteractionGuardEvaluationContext = {
    guard: PhotonInteractionGuardInstance;
    definition?: PhotonInteractionGuardDefinition;
    slot?: PhotonInteractionTriggerSlot;
    action?: PhotonInteractionActionPresentation | null;
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    mode: PhotonMode;
    isAdmin: boolean;
    scenarioId?: string | null;
};
type PhotonInteractionGuardEvaluator = (context: PhotonInteractionGuardEvaluationContext) => PhotonInteractionGuardEvaluationResult | boolean | null | undefined;
type PhotonInteractionGuardEvaluatorMap = Record<string, PhotonInteractionGuardEvaluator>;
type PhotonInteractionActionExecutionHandlers = {
    openInteractionSurface: PhotonInteractionSurfaceOpenHandler;
    showInteractionToast: PhotonInteractionToastHandler;
    navigate?: PhotonNavigateHandler;
};
type PhotonInteractionActionPresentation = ({
    type: "surface";
} & PhotonInteractionSurfaceTrigger) | {
    type: "toast";
    templateId: string;
    overrides?: PhotonInteractionToastInput["overrides"];
} | {
    type: "link";
    href: string;
    target?: string;
    rel?: string;
};
type PhotonInteractionActionInstance = {
    id: string;
    definitionId: string;
    label: string;
    labelKey?: string;
    enabled?: boolean;
    presentation: PhotonInteractionActionPresentation;
    props?: Record<string, unknown>;
};
type PhotonInteractionActionDefinition = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    fields?: PhotonField[];
    defaultInstances?: PhotonInteractionActionInstance[];
    previewScenarios?: PhotonInteractionPreviewScenario[];
};
type PhotonInteractionGuardInstance = {
    id: string;
    definitionId: string;
    label: string;
    labelKey?: string;
    enabled?: boolean;
    action?: PhotonInteractionActionPresentation;
    props?: Record<string, unknown>;
};
type PhotonInteractionGuardDefinition = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    order?: number;
    missingEvaluatorPolicy?: PhotonInteractionGuardMissingEvaluatorPolicy;
    fields?: PhotonField[];
    defaultInstances?: PhotonInteractionGuardInstance[];
    previewScenarios?: PhotonInteractionPreviewScenario[];
};
type PhotonInteractionTriggerSlot = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    action?: PhotonInteractionActionPresentation;
    actionInstanceId?: string;
    guardInstanceIds?: string[];
    allowedActionDefinitionIds?: string[];
    allowedGuardDefinitionIds?: string[];
    previewScenarios?: PhotonInteractionPreviewScenario[];
};
type PhotonInteractionTriggerBinding = {
    slotId: string;
    actionInstanceId?: string;
    guardInstanceIds?: string[];
    overrides?: Record<string, unknown>;
    enabled?: boolean;
};
type PhotonInteractionSettings = {
    actionInstances?: Record<string, PhotonInteractionActionInstance>;
    triggerBindings?: Record<string, PhotonInteractionTriggerBinding>;
    guardInstances?: Record<string, PhotonInteractionGuardInstance>;
};
type PhotonResolvedInteractionActionCatalog = {
    actions: PhotonInteractionActionDefinition[];
    actionsById: Map<string, PhotonInteractionActionDefinition>;
    actionInstances: Record<string, PhotonInteractionActionInstance>;
    guards: PhotonInteractionGuardDefinition[];
    guardsById: Map<string, PhotonInteractionGuardDefinition>;
    guardInstances: Record<string, PhotonInteractionGuardInstance>;
    triggerBindings: Record<string, PhotonInteractionTriggerBinding>;
};
type PhotonComponentLibraryItem = {
    id: string;
    label: string;
    labelKey?: string;
    description?: string;
    descriptionKey?: string;
    enabled?: boolean;
    blocks: PhotonBlock[];
    createdAt?: string;
    updatedAt?: string;
};
type PhotonComponentLibrarySettings = {
    items?: Record<string, PhotonComponentLibraryItem>;
};
type PhotonComponentLibraryUsage = {
    itemId: string;
    referenceBlockId: string;
    regionKey?: string | null;
    path: string;
    source?: "currentDocument" | "siteFrame" | "workspacePage" | "current" | "workspace";
    documentId?: string;
    documentLabel?: string;
    route?: string;
};
type PhotonComponentLibrarySourceSelection = {
    kind: "component-library-source";
    itemId: string;
    sourceBlockId: string;
};
type PhotonComponentLibraryEditorSelection = {
    kind: "document-block";
    blockId: string;
} | PhotonComponentLibrarySourceSelection;
type PhotonComponentLibraryUsageProvider = (input: {
    site: PhotonSite;
    document: PhotonDocument;
    pageSettings: PhotonPageSettings;
    workspace?: PhotonWorkspaceDescriptor;
    itemIds?: string[];
}) => PhotonComponentLibraryUsage[] | Promise<PhotonComponentLibraryUsage[]>;
type PhotonComponentReferenceProps = {
    itemId: string;
    label?: string;
};
type PhotonStudioSurfaceMode = "canvas" | "settings" | "interactions";
type PhotonStudioPaletteTab = "blocks" | "library";
type PhotonStudioInteractionTab = "actions" | "guards" | "surfaces" | "toasts";
type PhotonStudioUrlState = {
    mode?: PhotonMode;
    builderSurface?: PhotonStudioSurfaceMode;
    surface?: string;
    toast?: string;
    interactionTab?: PhotonStudioInteractionTab;
    action?: string;
    guard?: string;
    scenario?: string;
    block?: string;
    trigger?: string;
    paletteTab?: PhotonStudioPaletteTab;
    library?: string;
};
type PhotonStudioUrlStatePatch = {
    [Key in keyof PhotonStudioUrlState]?: PhotonStudioUrlState[Key] | null;
};
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
    dedupeKey?: string;
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
type PhotonSiteFrameMobileMenuTriggerPlacement = "fixed" | "header" | "hidden";
type PhotonSiteFrameFloatingControls = {
    floating?: boolean;
    disableFloatingOnSmallScreens?: boolean;
};
type PhotonSiteFrameMobileMenuControls = PhotonSiteFrameFloatingControls & {
    type?: PhotonSiteFrameMobileMenuType;
    triggerPlacement?: PhotonSiteFrameMobileMenuTriggerPlacement;
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
    openInteractionSurface?: PhotonInteractionSurfaceOpenHandler;
    showInteractionToast?: PhotonInteractionToastHandler;
    executeInteractionAction?: (action: PhotonInteractionActionPresentation | undefined) => PhotonInteractionExecutionResult;
    executeInteractionTriggerSlot?: (slot: PhotonInteractionTriggerSlot, options?: {
        scenarioId?: string | null;
        scenario?: PhotonInteractionPreviewScenario | null;
    }) => PhotonInteractionExecutionResult;
};
type PhotonSiteFrameActionItem = PhotonSiteFrameLinkItem & {
    kind?: PhotonSiteFrameActionKind;
    appearance?: "primary" | "secondary" | "ghost";
    authenticatedLabel?: string;
    authenticatedHref?: string;
    authenticatedTarget?: string;
    authenticatedRel?: string;
    interaction?: PhotonInteractionSurfaceTrigger;
    action?: PhotonInteractionActionPresentation;
    triggerSlot?: PhotonInteractionTriggerSlot;
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
type PhotonBlockInteractionSlotContext = {
    block: PhotonBlock;
    document: PhotonDocument;
    resources: PhotonResources;
    pageSettings: PhotonPageSettings;
    site: PhotonSite;
    mode: PhotonMode;
    isAdmin: boolean;
    registry: PhotonRegistry;
    siteFrameExtensions: PhotonSiteFrameExtension[];
};
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
    interactionSlots?: PhotonInteractionTriggerSlot[] | ((context: PhotonBlockInteractionSlotContext) => PhotonInteractionTriggerSlot[]);
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
    interactionSurfaces?: PhotonInteractionSurfaceDefinition[];
    interactionActions?: PhotonInteractionActionDefinition[];
    interactionGuards?: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators?: PhotonInteractionGuardEvaluatorMap;
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
    interactionSurfaces: PhotonInteractionSurfaceDefinition[];
    interactionActions: PhotonInteractionActionDefinition[];
    interactionGuards: PhotonInteractionGuardDefinition[];
    interactionGuardEvaluators: PhotonInteractionGuardEvaluatorMap;
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

export type { PhotonSiteFrameFooterSlots as $, PhotonInteractionSurfaceDefinition as A, PhotonInteractionSurfaceInstance as B, PhotonInteractionSurfaceIntentBinding as C, PhotonInteractionSurfaceSettings as D, PhotonInteractionSurfaceTrigger as E, PhotonInteractionToastTemplate as F, PhotonInteractionTriggerBinding as G, PhotonInteractionTriggerSlot as H, PhotonLocaleDescriptor as I, PhotonLocaleStatus as J, PhotonMediaUploadInput as K, PhotonMediaValue as L, PhotonPageCatalogItem as M, PhotonPageRuntimeData as N, PhotonPageSettings as O, PhotonArea as P, PhotonResolvedPage as Q, PhotonResources as R, PhotonSearchHighlight as S, PhotonSearchResult as T, PhotonSite as U, PhotonSiteRegion as V, PhotonSiteSettings as W, PhotonWorkspaceCapabilities as X, PhotonWorkspaceDescriptor as Y, PhotonSiteFrameExtension as Z, PhotonSiteFrameExtensionContext as _, PhotonBlock as a, PhotonSiteFrameFooterSlot as a$, PhotonSiteFrameHeaderSlots as a0, PhotonAccountTabExtension as a1, PhotonSurfaceMode as a2, PhotonRegistry as a3, PhotonRevisionDescriptor as a4, PhotonBranchPolicyState as a5, PhotonMergePreview as a6, PhotonMode as a7, PhotonMediaUploadHandler as a8, PhotonSearchHandler as a9, PhotonStudioSurfaceMode as aA, PhotonStudioUrlState as aB, PhotonSiteDesignSettings as aC, PhotonResolvedSiteDesignSettings as aD, PhotonSiteComponentVariants as aE, PhotonWorkspaceRef as aF, PhotonLinkComponentProps as aG, PhotonAuthPageRenderer as aH, PhotonNavigationConfig as aI, PhotonInteractionSurfaceOpenHandler as aJ, PhotonInteractionToastHandler as aK, PhotonSiteFrameMobileControls as aL, PhotonSiteFrameMobileMenuTriggerPlacement as aM, PhotonAuthPageRenderInput as aN, PhotonBindingAdapter as aO, PhotonBlockComponentProps as aP, PhotonFieldOption as aQ, PhotonInteractionSurfaceKind as aR, PhotonInteractionSurfaceRenderer as aS, PhotonInteractionSurfaceVariant as aT, PhotonInteractionToastStatus as aU, PhotonLinkFactoryOptions as aV, PhotonNavigateOptions as aW, PhotonPageSettingsScope as aX, PhotonSiteFrameActionComponentProps as aY, PhotonSiteFrameActionItem as aZ, PhotonSiteFrameFloatingControls as a_, PhotonNavigateHandler as aa, PhotonPrefetchHandler as ab, PhotonLinkComponent as ac, PhotonLinkFactory as ad, PhotonInteractionSurfaceRendererMap as ae, PhotonI18nValue as af, PhotonField as ag, PhotonPageSettingsPanelDefinition as ah, PhotonSiteSettingsPanelDefinition as ai, PhotonInteractionSurfaceRendererProps as aj, PhotonBlockDefinition as ak, PhotonNestedField as al, PhotonBlockLocalizationSchema as am, PhotonModule as an, PhotonLocalizedDefaultValue as ao, PhotonRegistryEntry as ap, PhotonBlockProps as aq, PhotonInstallableKit as ar, PhotonRuntime as as, PhotonActionValue as at, PhotonResolvedInteractionSurfaceCatalog as au, PhotonResolvedInteractionSurfaceRequest as av, PhotonInteractionToastInput as aw, PhotonResolvedInteractionActionCatalog as ax, PhotonBlockInteractionSlotContext as ay, PhotonStudioUrlStatePatch as az, PhotonComponentLibraryEditorSelection as b, PhotonSiteFrameFooterSlotItems as b0, PhotonSiteFrameHeaderSlot as b1, PhotonSiteFrameHeaderSlotItems as b2, PhotonSiteFrameLinkItem as b3, PhotonSiteFrameMobileBottomMenuControls as b4, PhotonSiteFrameMobileMenuControls as b5, PhotonSiteFrameMobileMenuType as b6, PhotonSiteFrameNavigationColumn as b7, PhotonSelectedField as b8, PhotonAccountTabMatch as b9, PhotonActorSummary as ba, PhotonAnyBlockDefinition as bb, PhotonBindingMode as bc, PhotonBlockComponent as bd, PhotonBlockDefaults as be, PhotonDefaultable as bf, PhotonFieldKind as bg, PhotonFieldLocalization as bh, PhotonInterfaceLocaleOption as bi, PhotonMergeConflict as bj, PhotonMergeDiffItem as bk, PhotonMergeResolutionStrategy as bl, PhotonNavigationQueryKeys as bm, PhotonPageSettingsPanelProps as bn, PhotonRevisionChangeSummaryItem as bo, PhotonSearchInput as bp, PhotonSiteColorSchemeDefinition as bq, PhotonSiteDesignAppearance as br, PhotonSiteDesignColorTokens as bs, PhotonSiteDesignPresetDefinition as bt, PhotonSiteDesignValue as bu, PhotonSiteFrameActionKind as bv, PhotonSiteSettingsPanelProps as bw, PhotonStudioInteractionTab as bx, PhotonStudioPaletteTab as by, PhotonComponentLibraryItem as c, PhotonComponentLibrarySettings as d, PhotonComponentLibrarySourceSelection as e, PhotonComponentLibraryUsage as f, PhotonComponentLibraryUsageProvider as g, PhotonComponentReferenceProps as h, PhotonDocument as i, PhotonDocumentsMap as j, PhotonFieldBinding as k, PhotonInteractionActionDefinition as l, PhotonInteractionActionExecutionHandlers as m, PhotonInteractionActionInstance as n, PhotonInteractionActionPresentation as o, PhotonInteractionExecutionResult as p, PhotonInteractionExecutionStatus as q, PhotonInteractionGuardDefinition as r, PhotonInteractionGuardEvaluationContext as s, PhotonInteractionGuardEvaluationResult as t, PhotonInteractionGuardEvaluator as u, PhotonInteractionGuardEvaluatorMap as v, PhotonInteractionGuardInstance as w, PhotonInteractionGuardMissingEvaluatorPolicy as x, PhotonInteractionPreviewScenario as y, PhotonInteractionSettings as z };
