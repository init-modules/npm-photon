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
    /**
     * Renderers MUST call this when the surface flow finishes successfully
     * (login OK, form submitted, search picked). Distinct from
     * `onOpenChange(false)` which is ambiguous (cancel vs success).
     *
     * The runtime uses this signal to advance any pending action plan
     * deterministically without re-evaluating conditions. Renderers that
     * only know "I closed" should still call `onOpenChange(false)`; the
     * runtime falls back to plan re-evaluation for backward compat.
     */
    onComplete?: () => void;
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
type PhotonInteractionExecutionStatus = "executed" | "blocked" | "missing-action" | "missing-evaluator" | "missing-renderer" | "fallback" | "prerequisite-required";
/**
 * Pending continuation metadata returned when a trigger plan executed a
 * prerequisite (e.g. opened a sign-in dialog) instead of the target action.
 * The runtime stores this and re-evaluates the plan when the prereq surface
 * closes — if conditions changed, the next step (or target) is auto-executed.
 */
type PhotonInteractionExecutionPlanMeta = {
    targetAction: PhotonInteractionActionPresentation;
    targetActionInstanceId: string;
    previousStepCount: number;
};
type PhotonInteractionExecutionResult = {
    status: PhotonInteractionExecutionStatus;
    executed: boolean;
    reason?: string;
    action?: PhotonInteractionActionPresentation | null;
    guard?: PhotonInteractionGuardInstance;
    fallbackHref?: string;
    /**
     * Present when a prerequisite step was executed instead of the target
     * action. The store reads this to set up auto-continuation.
     */
    plan?: PhotonInteractionExecutionPlanMeta;
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
/**
 * Cascade scope hierarchy from 6.md §Override Resolution Algorithm.
 *
 * Lower number = lower priority (broader, more general). Higher number
 * wins when contributions conflict on the same key. Within one scope:
 * explicit `priority` field wins; on tie, alphabetical `packageName`.
 *
 * The same scope ladder is reused across all layered domains: site data,
 * action instances, action policies, library references, route context
 * overrides, localized strings.
 *
 * Scope semantics:
 * - `package-default`: shipped by an installable package
 * - `site`: site-owner override across the whole site
 * - `locale`: per-locale override (e.g. ru vs en copy)
 * - `route-family`: per route-pattern family (e.g. all city pages)
 * - `route-context`: per resolved route context (e.g. specific city)
 * - `page`: per single page document
 * - `component`: per block/component instance
 * - `action-flow`: per specific action plan in flight
 * - `workspace-draft`: builder draft override (not yet published)
 * - `user-session`: per active user session (preview, A/B bucket)
 */
type PhotonActionPolicyScope = "package-default" | "site" | "locale" | "route-family" | "route-context" | "page" | "component" | "action-flow" | "workspace-draft" | "user-session" | "workspace";
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
    /**
     * Preview-only scenarios for builder canvas state-switcher.
     * Used when the block has no condition-based runtime states but the
     * builder still wants to preview different visual variants (e.g. empty,
     * filled, error). Resolution priority: builder preview override > first scenario.
     */
    previewScenarios?: PhotonInteractionPreviewScenario[];
    /**
     * Condition-driven runtime states. The first state whose `condition`
     * evaluates `true` (in evaluator order) becomes the active state at runtime.
     * Use `isDefaultServerState` to mark the SSR fallback when client-only
     * conditions are unresolved. The block component reads the active state via
     * `usePhotonBlockActiveState(blockId)`.
     */
    states?: PhotonActionStateDefinition[];
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

export type { PhotonPageCatalogItem as $, PhotonInteractionActionExecutionHandlers as A, PhotonInteractionActionInstance as B, PhotonInteractionActionPresentation as C, PhotonInteractionExecutionResult as D, PhotonInteractionExecutionStatus as E, PhotonInteractionGuardDefinition as F, PhotonInteractionGuardEvaluationContext as G, PhotonInteractionGuardEvaluationResult as H, PhotonInteractionGuardEvaluator as I, PhotonInteractionGuardEvaluatorMap as J, PhotonInteractionGuardInstance as K, PhotonInteractionGuardMissingEvaluatorPolicy as L, PhotonInteractionPreviewScenario as M, PhotonInteractionSettings as N, PhotonInteractionSurfaceDefinition as O, PhotonActionPlan as P, PhotonInteractionSurfaceInstance as Q, PhotonInteractionSurfaceIntentBinding as R, PhotonInteractionSurfaceSettings as S, PhotonInteractionSurfaceTrigger as T, PhotonInteractionToastTemplate as U, PhotonInteractionTriggerBinding as V, PhotonInteractionTriggerSlot as W, PhotonLocaleDescriptor as X, PhotonLocaleStatus as Y, PhotonMediaUploadInput as Z, PhotonMediaValue as _, PhotonActionPlanExecutionStatus as a, PhotonInteractionSurfaceRendererProps as a$, PhotonPageRuntimeData as a0, PhotonPageSettings as a1, PhotonResolvedPage as a2, PhotonResolvedSiteData as a3, PhotonResources as a4, PhotonSearchHighlight as a5, PhotonSearchResult as a6, PhotonSite as a7, PhotonSiteDataBinding as a8, PhotonSiteDataField as a9, PhotonRegistry as aA, PhotonRevisionDescriptor as aB, PhotonBranchPolicyState as aC, PhotonMergePreview as aD, PhotonMode as aE, PhotonMediaUploadHandler as aF, PhotonSearchHandler as aG, PhotonNavigateHandler as aH, PhotonPrefetchHandler as aI, PhotonLinkComponent as aJ, PhotonLinkFactory as aK, PhotonInteractionSurfaceRendererMap as aL, PhotonI18nValue as aM, PhotonPageSettingsPanelDefinition as aN, PhotonSiteSettingsPanelDefinition as aO, PhotonBlockDefinition as aP, PhotonNestedField as aQ, PhotonBlockLocalizationSchema as aR, PhotonModule as aS, PhotonLocalizedDefaultValue as aT, PhotonRegistryEntry as aU, PhotonBlockProps as aV, PhotonRouteContextField as aW, PhotonInstallableKit as aX, PhotonRuntime as aY, PhotonAnyBlockDefinition as aZ, PhotonInteractionSurfaceEditableFieldRenderer as a_, PhotonSiteDataFieldKind as aa, PhotonSiteDataSchema as ab, PhotonSiteRegion as ac, PhotonSiteSettings as ad, PhotonWorkspaceCapabilities as ae, PhotonWorkspaceDescriptor as af, PhotonSiteFrameExtension as ag, PhotonSiteFrameExtensionContext as ah, PhotonSiteFrameFooterSlots as ai, PhotonSiteFrameHeaderSlots as aj, PhotonAccountTabExtension as ak, PhotonSurfaceMode as al, PhotonFormFieldDefinition as am, PhotonFormFieldType as an, PhotonField as ao, PhotonFormDefinition as ap, PhotonFormSchemaDescriptor as aq, PhotonFormValues as ar, PhotonResolvedFormField as as, PhotonFormSubmitHandler as at, PhotonFormFieldRenderContext as au, PhotonFormFieldOption as av, PhotonFormFieldValidation as aw, PhotonFormFieldWidth as ax, PhotonFormMode as ay, PhotonFormPolicy as az, PhotonActionPlanResult as b, PhotonRevisionChangeSummaryItem as b$, PhotonSiteDesignSettings as b0, PhotonResolvedSiteDesignSettings as b1, PhotonSiteComponentVariants as b2, PhotonWorkspaceRef as b3, PhotonActionValue as b4, PhotonResolvedInteractionSurfaceCatalog as b5, PhotonResolvedInteractionSurfaceRequest as b6, PhotonInteractionToastInput as b7, PhotonResolvedRouteContext as b8, PhotonResolvedInteractionActionCatalog as b9, PhotonSiteFrameFooterSlotItems as bA, PhotonSiteFrameHeaderSlot as bB, PhotonSiteFrameHeaderSlotItems as bC, PhotonSiteFrameLinkItem as bD, PhotonSiteFrameMobileBottomMenuControls as bE, PhotonSiteFrameMobileMenuControls as bF, PhotonSiteFrameMobileMenuType as bG, PhotonSiteFrameNavigationColumn as bH, PhotonSelectedField as bI, PhotonAccountTabMatch as bJ, PhotonActorSummary as bK, PhotonBindingMode as bL, PhotonBlockComponent as bM, PhotonBlockDefaults as bN, PhotonDefaultable as bO, PhotonFieldKind as bP, PhotonFieldLocalization as bQ, PhotonInteractionExecutionPlanMeta as bR, PhotonInteractionSurfaceEditableFieldInput as bS, PhotonInteractionSurfaceEditableFieldKind as bT, PhotonInteractionSurfaceEditableFieldOption as bU, PhotonInterfaceLocaleOption as bV, PhotonMergeConflict as bW, PhotonMergeDiffItem as bX, PhotonMergeResolutionStrategy as bY, PhotonNavigationQueryKeys as bZ, PhotonPageSettingsPanelProps as b_, PhotonBlockInteractionSlotContext as ba, PhotonStudioUrlStatePatch as bb, PhotonStudioSurfaceMode as bc, PhotonStudioUrlState as bd, PhotonLinkComponentProps as be, PhotonAuthPageRenderer as bf, PhotonNavigationConfig as bg, PhotonInteractionSurfaceOpenHandler as bh, PhotonInteractionToastHandler as bi, PhotonSiteFrameMobileControls as bj, PhotonSiteFrameMobileMenuTriggerPlacement as bk, PhotonAuthPageRenderInput as bl, PhotonBindingAdapter as bm, PhotonBlockComponentProps as bn, PhotonFieldOption as bo, PhotonInteractionSurfaceKind as bp, PhotonInteractionSurfaceRenderer as bq, PhotonInteractionSurfaceVariant as br, PhotonInteractionToastStatus as bs, PhotonLinkFactoryOptions as bt, PhotonNavigateOptions as bu, PhotonPageSettingsScope as bv, PhotonSiteFrameActionComponentProps as bw, PhotonSiteFrameActionItem as bx, PhotonSiteFrameFloatingControls as by, PhotonSiteFrameFooterSlot as bz, PhotonActionPlanStep as c, PhotonRouteContextFieldKind as c0, PhotonSearchInput as c1, PhotonSearchRuntimeState as c2, PhotonSiteColorSchemeDefinition as c3, PhotonSiteDesignAppearance as c4, PhotonSiteDesignColorTokens as c5, PhotonSiteDesignPresetDefinition as c6, PhotonSiteDesignValue as c7, PhotonSiteFrameActionKind as c8, PhotonSiteSettingsPanelProps as c9, PhotonStudioInteractionTab as ca, PhotonStudioPaletteTab as cb, PhotonActionPolicy as d, PhotonActionPolicyEnforcement as e, PhotonActionPolicyScope as f, PhotonActionStateDefinition as g, PhotonArea as h, PhotonBlock as i, PhotonComponentLibraryEditorSelection as j, PhotonComponentLibraryItem as k, PhotonComponentLibrarySettings as l, PhotonComponentLibrarySourceSelection as m, PhotonComponentLibraryUsage as n, PhotonComponentLibraryUsageProvider as o, PhotonComponentReferenceProps as p, PhotonConditionDefinition as q, PhotonConditionEvaluationContext as r, PhotonConditionEvaluator as s, PhotonConditionEvaluatorMap as t, PhotonConditionExpression as u, PhotonConditionResolution as v, PhotonDocument as w, PhotonDocumentsMap as x, PhotonFieldBinding as y, PhotonInteractionActionDefinition as z };
