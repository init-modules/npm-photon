import { FormEvent, ReactNode, ComponentType, MouseEventHandler } from 'react';

type PhotonFormMode = "fixed" | "extendable" | "freeform";
type PhotonFormFieldType = "text" | "email" | "phone" | "number" | "textarea" | "select" | "checkbox" | "date" | "hidden";
type PhotonFormFieldWidth = "full" | "half" | "third";
type PhotonFormFieldOption = {
    id?: string;
    label: string;
    value: string;
};
type PhotonFormFieldValidation = {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
};
type PhotonFormFieldDefinition = {
    id: string;
    name: string;
    type: PhotonFormFieldType;
    label: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    defaultValue?: unknown;
    options?: PhotonFormFieldOption[];
    width?: PhotonFormFieldWidth;
    locked?: boolean;
    removable?: boolean;
    disabled?: boolean;
    validation?: PhotonFormFieldValidation;
};
type PhotonFormPolicy = {
    allowedFieldTypes?: PhotonFormFieldType[];
    deniedFieldTypes?: PhotonFormFieldType[];
    requiredFieldIds?: string[];
    lockedFieldIds?: string[];
    removableFieldIds?: string[];
    allowAddFields?: boolean;
    allowRemoveFields?: boolean;
    allowReorder?: boolean;
    allowEditFieldNames?: boolean;
};
type PhotonFormDefinition = {
    id: string;
    mode?: PhotonFormMode;
    defaultFields: PhotonFormFieldDefinition[];
    policy?: PhotonFormPolicy;
};
type PhotonResolvedFormField = PhotonFormFieldDefinition & {
    sourceIndex: number | null;
};
type PhotonFormValues = Record<string, unknown>;
type PhotonFormSubmitHandler = (values: PhotonFormValues, event: FormEvent<HTMLFormElement>) => void | Promise<void>;
type PhotonFormFieldRenderContext = {
    field: PhotonResolvedFormField;
    input: ReactNode;
    label: ReactNode;
    helpText: ReactNode;
    error?: ReactNode;
};
type PhotonFormSchemaDescriptor = {
    id: string;
    packageName: string;
    label: string;
    description?: string;
    fields: PhotonFormFieldDefinition[];
    policy?: PhotonFormPolicy;
    submit?: {
        intent?: string;
        endpoint?: string;
        successMessage?: string;
        errorMessage?: string;
    };
};

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
type PhotonInteractionSurfaceEditableFieldKind = "text" | "textarea" | "select";
type PhotonInteractionSurfaceEditableFieldOption = {
    value: string;
    label: string;
};
type PhotonInteractionSurfaceEditableFieldInput = {
    path: string;
    value: string;
    kind?: Exclude<PhotonInteractionSurfaceEditableFieldKind, "select">;
    options?: never;
    placeholder?: string;
    className?: string;
} | {
    path: string;
    value: string;
    kind: "select";
    options: readonly PhotonInteractionSurfaceEditableFieldOption[];
    placeholder?: string;
    className?: string;
};
type PhotonInteractionSurfaceEditableFieldRenderer = (input: PhotonInteractionSurfaceEditableFieldInput) => ReactNode;
/**
 * Surface renderer contract.
 *
 * `previewMode` controls which surface form to render:
 * - `"runtime"` (default) — real interactive surface (e.g. open dialog).
 * - `"builder-inline"` — compact static preview suitable for inspector chips.
 * - `"builder-canvas-stage"` — full inline canvas stage with editable fields.
 *
 * In any `"builder-*"` mode the renderer MUST NOT open a real dialog/modal and
 * MUST ignore `open`/`onOpenChange`. When the mode is unknown the renderer
 * SHOULD return `null` instead of falling back to runtime — otherwise the
 * builder canvas accidentally surfaces a real popup that the user cannot close.
 *
 * `editableField` is provided by the builder canvas stage; renderers in
 * `"builder-canvas-stage"` mode use it to wrap user-editable labels into
 * inline-edit controls. Without it, render labels as plain text.
 */
type PhotonInteractionSurfaceRendererProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    request: PhotonResolvedInteractionSurfaceRequest;
    previewMode?: "runtime" | "builder-inline" | "builder-canvas-stage";
    previewScenarioId?: string;
    editableField?: PhotonInteractionSurfaceEditableFieldRenderer;
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
    states?: PhotonActionStateDefinition[];
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
/** @deprecated Use PhotonActionPolicy. Guards remain only as a runtime compat alias. */
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
    /**
     * @deprecated Map guards to ActionPolicy entries instead.
     * Use interactionPolicies with condition-based prerequisites.
     */
    guardInstanceIds?: string[];
    /** Global field overrides applied across all preview states. */
    overrides?: Record<string, unknown>;
    enabled?: boolean;
};
type PhotonInteractionSettings = {
    actionInstances?: Record<string, PhotonInteractionActionInstance>;
    triggerBindings?: Record<string, PhotonInteractionTriggerBinding>;
    guardInstances?: Record<string, PhotonInteractionGuardInstance>;
    policies?: Record<string, PhotonActionPolicy>;
    /** Builder-only: per-slot, per-scenario field overrides for canvas stage preview. Not used by public runtime. */
    canvasStageOverrides?: Record<string, Record<string, Record<string, unknown>>>;
};
type PhotonResolvedInteractionActionCatalog = {
    actions: PhotonInteractionActionDefinition[];
    actionsById: Map<string, PhotonInteractionActionDefinition>;
    actionInstances: Record<string, PhotonInteractionActionInstance>;
    guards: PhotonInteractionGuardDefinition[];
    guardsById: Map<string, PhotonInteractionGuardDefinition>;
    guardInstances: Record<string, PhotonInteractionGuardInstance>;
    triggerBindings: Record<string, PhotonInteractionTriggerBinding>;
    policies: PhotonActionPolicy[];
    policiesById: Map<string, PhotonActionPolicy>;
};
type PhotonConditionResolution = "server" | "client" | "both";
type PhotonConditionExpression = {
    type: "ref";
    conditionId: string;
} | {
    type: "and";
    operands: PhotonConditionExpression[];
} | {
    type: "or";
    operands: PhotonConditionExpression[];
} | {
    type: "not";
    operand: PhotonConditionExpression;
} | {
    type: "eq";
    path: string;
    value: string | number | boolean;
};
type PhotonConditionDefinition = {
    id: string;
    packageName: string;
    label: string;
    resolution: PhotonConditionResolution;
    defaultServerPreviewStateId?: string;
};
type PhotonSearchRuntimeState = {
    query?: string;
    results?: unknown[];
    isProviderAvailable?: boolean;
    lastError?: string | null;
};
type PhotonConditionEvaluationContext = {
    siteSettings: PhotonSiteSettings;
    routeContext?: Record<string, unknown>;
    resources?: PhotonResources;
    searchState?: PhotonSearchRuntimeState;
};
type PhotonConditionEvaluator = (context: PhotonConditionEvaluationContext) => boolean | null | undefined;
type PhotonConditionEvaluatorMap = Record<string, PhotonConditionEvaluator>;
type PhotonActionPolicyScope = "package-default" | "site" | "workspace";
type PhotonActionPolicyEnforcement = "client-hint" | "server-required";
type PhotonActionPolicy = {
    id: string;
    packageName: string;
    targetActionId: string;
    when: PhotonConditionExpression;
    run: string;
    scope: PhotonActionPolicyScope;
    priority?: number;
    enforcement?: PhotonActionPolicyEnforcement;
    securityMode?: "fail-open" | "fail-closed";
    schemaVersion?: number;
};
type PhotonActionStateDefinition = {
    id: string;
    label: string;
    condition?: PhotonConditionExpression;
    triggerRendererKey?: string;
    actionRendererKey?: string;
    effectKey?: string;
    isDefaultServerState?: boolean;
};
type PhotonActionPlanStep = {
    actionInstanceId: string;
    policyId: string;
};
type PhotonActionPlan = {
    targetActionInstanceId: string;
    steps: PhotonActionPlanStep[];
    hasCycles: boolean;
    warnings: string[];
};
type PhotonActionPlanExecutionStatus = "completed" | "cancelled" | "blocked" | "failed" | "missing-action" | "missing-evaluator" | "cycle-detected";
type PhotonActionPlanResult = {
    status: PhotonActionPlanExecutionStatus;
    completedSteps: string[];
    cancelledAt?: string;
    warnings: string[];
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
type PhotonStudioSurfaceMode = "canvas" | "settings" | "interactions" | "data";
type PhotonStudioPaletteTab = "blocks" | "library";
type PhotonStudioInteractionTab = "actions" | "policies" | "guards" | "surfaces" | "toasts";
type PhotonStudioUrlState = {
    mode?: PhotonMode;
    builderSurface?: PhotonStudioSurfaceMode;
    surface?: string;
    toast?: string;
    interactionTab?: PhotonStudioInteractionTab;
    action?: string;
    guard?: string;
    policy?: string;
    scenario?: string;
    block?: string;
    trigger?: string;
    /** Canvas stage open for this trigger slot id (separate from inspector trigger tab). */
    canvasTrigger?: string;
    paletteTab?: PhotonStudioPaletteTab;
    library?: string;
    dataField?: string;
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
    routePatterns?: string[];
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
    interactionPolicies?: PhotonActionPolicy[];
    conditionDefinitions?: PhotonConditionDefinition[];
    conditionEvaluators?: PhotonConditionEvaluatorMap;
    siteDataSchemas?: PhotonSiteDataSchema[];
    routeContextFields?: PhotonRouteContextField[];
    formSchemas?: PhotonFormSchemaDescriptor[];
};
type PhotonSiteDataFieldKind = "text" | "textarea" | "url" | "email" | "phone" | "number" | "toggle";
type PhotonSiteDataField = {
    path: string;
    label: string;
    kind: PhotonSiteDataFieldKind;
    description?: string;
    defaultValue?: unknown;
    group?: "content" | "contact" | "social" | "advanced";
};
type PhotonSiteDataSchema = {
    id: string;
    packageName: string;
    label: string;
    description?: string;
    fields: PhotonSiteDataField[];
};
type PhotonResolvedSiteData = {
    schemas: PhotonSiteDataSchema[];
    schemasById: Map<string, PhotonSiteDataSchema>;
    values: Record<string, Record<string, unknown>>;
};
type PhotonSiteDataBinding = {
    schemaId: string;
    fieldPath: string;
};
type PhotonRouteContextFieldKind = "text" | "number" | "enum";
type PhotonRouteContextField = {
    path: string;
    label: string;
    kind: PhotonRouteContextFieldKind;
    description?: string;
    defaultValue?: string | number;
    urlParam?: string;
    enumValues?: string[];
    packageName: string;
};

type PhotonResolvedRouteContext = {
    fields: PhotonRouteContextField[];
    fieldsByPath: Map<string, PhotonRouteContextField>;
    values: Record<string, unknown>;
    matchedPattern: string | null;
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
    interactionPolicies: PhotonActionPolicy[];
    conditionDefinitions: PhotonConditionDefinition[];
    conditionEvaluators: PhotonConditionEvaluatorMap;
    siteDataSchemas: PhotonSiteDataSchema[];
    routeContextFields: PhotonRouteContextField[];
    formSchemas: PhotonFormSchemaDescriptor[];
};
type PhotonPageCatalogItem = {
    key: string;
    name: string;
    description?: string | null;
    group?: string | null;
    kind: "page" | "template";
    route: string;
    routePattern?: string | null;
    routePatterns?: string[];
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

export type { PhotonNestedField as $, PhotonRevisionDescriptor as A, PhotonBranchPolicyState as B, PhotonMergePreview as C, PhotonMode as D, PhotonPageCatalogItem as E, PhotonInteractionActionPresentation as F, PhotonMediaUploadHandler as G, PhotonSearchHandler as H, PhotonNavigateHandler as I, PhotonPrefetchHandler as J, PhotonSearchHighlight as K, PhotonLinkComponent as L, PhotonLinkFactory as M, PhotonInteractionSurfaceDefinition as N, PhotonInteractionActionDefinition as O, PhotonSiteFrameExtension as P, PhotonInteractionGuardDefinition as Q, PhotonInteractionGuardEvaluatorMap as R, PhotonInteractionSurfaceRendererMap as S, PhotonComponentLibraryUsageProvider as T, PhotonI18nValue as U, PhotonPageSettingsPanelDefinition as V, PhotonSiteSettingsPanelDefinition as W, PhotonInteractionSurfaceEditableFieldRenderer as X, PhotonInteractionSurfaceRendererProps as Y, PhotonBlockDefinition as Z, PhotonBlock as _, PhotonSiteFrameExtensionContext as a, PhotonConditionEvaluationContext as a$, PhotonBlockLocalizationSchema as a0, PhotonModule as a1, PhotonLocalizedDefaultValue as a2, PhotonRegistryEntry as a3, PhotonBlockProps as a4, PhotonConditionDefinition as a5, PhotonConditionEvaluatorMap as a6, PhotonDocumentsMap as a7, PhotonActionPolicy as a8, PhotonRouteContextField as a9, PhotonInteractionActionExecutionHandlers as aA, PhotonInteractionSettings as aB, PhotonBlockInteractionSlotContext as aC, PhotonStudioUrlStatePatch as aD, PhotonStudioSurfaceMode as aE, PhotonStudioUrlState as aF, PhotonLinkComponentProps as aG, PhotonAuthPageRenderer as aH, PhotonNavigationConfig as aI, PhotonInteractionSurfaceOpenHandler as aJ, PhotonInteractionToastHandler as aK, PhotonInteractionPreviewScenario as aL, PhotonSiteFrameMobileControls as aM, PhotonSiteFrameMobileMenuTriggerPlacement as aN, PhotonResolvedPage as aO, PhotonActionPlan as aP, PhotonActionPlanExecutionStatus as aQ, PhotonActionPlanResult as aR, PhotonActionPlanStep as aS, PhotonActionPolicyEnforcement as aT, PhotonActionPolicyScope as aU, PhotonActionStateDefinition as aV, PhotonAuthPageRenderInput as aW, PhotonBindingAdapter as aX, PhotonBlockComponentProps as aY, PhotonComponentLibraryEditorSelection as aZ, PhotonComponentLibrarySourceSelection as a_, PhotonSiteDataSchema as aa, PhotonInstallableKit as ab, PhotonRuntime as ac, PhotonSiteDesignSettings as ad, PhotonResolvedSiteDesignSettings as ae, PhotonSiteComponentVariants as af, PhotonWorkspaceRef as ag, PhotonActionValue as ah, PhotonSiteSettings as ai, PhotonInteractionSurfaceSettings as aj, PhotonResolvedInteractionSurfaceCatalog as ak, PhotonInteractionSurfaceTrigger as al, PhotonResolvedInteractionSurfaceRequest as am, PhotonInteractionToastInput as an, PhotonInteractionToastTemplate as ao, PhotonResolvedRouteContext as ap, PhotonComponentLibraryItem as aq, PhotonComponentLibraryUsage as ar, PhotonComponentReferenceProps as as, PhotonComponentLibrarySettings as at, PhotonInteractionExecutionResult as au, PhotonInteractionTriggerSlot as av, PhotonInteractionGuardInstance as aw, PhotonInteractionGuardEvaluationContext as ax, PhotonResolvedInteractionActionCatalog as ay, PhotonInteractionGuardEvaluationResult as az, PhotonSiteFrameFooterSlots as b, PhotonSearchInput as b$, PhotonConditionEvaluator as b0, PhotonConditionExpression as b1, PhotonConditionResolution as b2, PhotonFieldOption as b3, PhotonInteractionActionInstance as b4, PhotonInteractionExecutionStatus as b5, PhotonInteractionGuardEvaluator as b6, PhotonInteractionGuardMissingEvaluatorPolicy as b7, PhotonInteractionSurfaceInstance as b8, PhotonInteractionSurfaceIntentBinding as b9, PhotonArea as bA, PhotonSelectedField as bB, PhotonFieldBinding as bC, PhotonMediaValue as bD, PhotonSearchResult as bE, PhotonAccountTabMatch as bF, PhotonActorSummary as bG, PhotonAnyBlockDefinition as bH, PhotonBindingMode as bI, PhotonBlockComponent as bJ, PhotonBlockDefaults as bK, PhotonDefaultable as bL, PhotonFieldKind as bM, PhotonFieldLocalization as bN, PhotonInteractionSurfaceEditableFieldInput as bO, PhotonInteractionSurfaceEditableFieldKind as bP, PhotonInteractionSurfaceEditableFieldOption as bQ, PhotonInterfaceLocaleOption as bR, PhotonMediaUploadInput as bS, PhotonMergeConflict as bT, PhotonMergeDiffItem as bU, PhotonMergeResolutionStrategy as bV, PhotonNavigationQueryKeys as bW, PhotonPageRuntimeData as bX, PhotonPageSettingsPanelProps as bY, PhotonRevisionChangeSummaryItem as bZ, PhotonRouteContextFieldKind as b_, PhotonInteractionSurfaceKind as ba, PhotonInteractionSurfaceRenderer as bb, PhotonInteractionSurfaceVariant as bc, PhotonInteractionToastStatus as bd, PhotonInteractionTriggerBinding as be, PhotonLinkFactoryOptions as bf, PhotonLocaleDescriptor as bg, PhotonLocaleStatus as bh, PhotonNavigateOptions as bi, PhotonPageSettingsScope as bj, PhotonResolvedSiteData as bk, PhotonSiteDataBinding as bl, PhotonSiteDataField as bm, PhotonSiteDataFieldKind as bn, PhotonSiteFrameActionComponentProps as bo, PhotonSiteFrameActionItem as bp, PhotonSiteFrameFloatingControls as bq, PhotonSiteFrameFooterSlot as br, PhotonSiteFrameFooterSlotItems as bs, PhotonSiteFrameHeaderSlot as bt, PhotonSiteFrameHeaderSlotItems as bu, PhotonSiteFrameLinkItem as bv, PhotonSiteFrameMobileBottomMenuControls as bw, PhotonSiteFrameMobileMenuControls as bx, PhotonSiteFrameMobileMenuType as by, PhotonSiteFrameNavigationColumn as bz, PhotonSiteFrameHeaderSlots as c, PhotonSearchRuntimeState as c0, PhotonSiteColorSchemeDefinition as c1, PhotonSiteDesignAppearance as c2, PhotonSiteDesignColorTokens as c3, PhotonSiteDesignPresetDefinition as c4, PhotonSiteDesignValue as c5, PhotonSiteFrameActionKind as c6, PhotonSiteRegion as c7, PhotonSiteSettingsPanelProps as c8, PhotonStudioInteractionTab as c9, PhotonStudioPaletteTab as ca, PhotonAccountTabExtension as d, PhotonSurfaceMode as e, PhotonFormFieldDefinition as f, PhotonFormFieldType as g, PhotonField as h, PhotonFormDefinition as i, PhotonFormSchemaDescriptor as j, PhotonFormValues as k, PhotonResolvedFormField as l, PhotonFormSubmitHandler as m, PhotonFormFieldRenderContext as n, PhotonFormFieldOption as o, PhotonFormFieldValidation as p, PhotonFormFieldWidth as q, PhotonFormMode as r, PhotonFormPolicy as s, PhotonDocument as t, PhotonResources as u, PhotonPageSettings as v, PhotonSite as w, PhotonRegistry as x, PhotonWorkspaceDescriptor as y, PhotonWorkspaceCapabilities as z };
