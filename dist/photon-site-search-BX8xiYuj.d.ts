import { u as PhotonConditionExpression, t as PhotonConditionEvaluatorMap, r as PhotonConditionEvaluationContext, q as PhotonConditionDefinition, g as PhotonActionStateDefinition, v as PhotonConditionResolution, M as PhotonInteractionPreviewScenario, aZ as PhotonAnyBlockDefinition, aM as PhotonI18nValue, a_ as PhotonInteractionSurfaceEditableFieldRenderer, a$ as PhotonInteractionSurfaceRendererProps } from './types-1-bZpAzJ.js';
import * as react from 'react';
import { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type PhotonConditionResolutionMode = "server" | "client" | "any";
/**
 * Walks a condition expression and returns the broadest resolution
 * axis required by all referenced conditions.
 *
 * - All refs resolve `server` or `both` → `server` (safe to evaluate on server)
 * - Any ref resolves `client` only → `client` (must wait for hydration)
 * - All refs resolve `both` → `both` (cheap on either side)
 * - Unknown refs → `client` (conservative, requires hydration to know)
 *
 * `eq` / structural operands have no resolution requirement (pure
 * comparison against context); they inherit `both`.
 */
declare const resolvePhotonConditionAxis: (expr: PhotonConditionExpression | undefined, conditionDefinitions: readonly PhotonConditionDefinition[]) => PhotonConditionResolution;
/**
 * SSR-aware safe evaluator. When `mode === "server"`, refs whose
 * `resolution === "client"` short-circuit to `null` (unresolved on server).
 * Other axes evaluate normally. The caller decides what to do with
 * `null` — typically: pick the `defaultServerPreviewState` for the
 * action/block.
 */
declare const evaluatePhotonConditionForMode: (expr: PhotonConditionExpression, evaluators: PhotonConditionEvaluatorMap, context: PhotonConditionEvaluationContext, conditionDefinitions: readonly PhotonConditionDefinition[], mode: PhotonConditionResolutionMode) => boolean | null;
/**
 * Picks the active state for a list of `PhotonActionStateDefinition`
 * given a resolution mode (server/client/any).
 *
 * Resolution per 6.md §Action State + §Condition Resolution Axis:
 * 1. **Server mode** — first state whose condition is resolvable
 *    server-side AND evaluates `true`. If none resolve cleanly, picks
 *    the state marked `isDefaultServerState`, or the state referenced
 *    by `conditionDefinition.defaultServerPreviewStateId`, falling back
 *    to the first unconditional state.
 * 2. **Client mode** — first state whose condition evaluates `true`
 *    (all axes available).
 * 3. **Any mode** — same as client.
 *
 * Returns `null` when no state matches and no default exists.
 */
declare const resolvePhotonActionStateForMode: ({ states, conditionDefinitions, evaluators, context, mode, }: {
    states: readonly PhotonActionStateDefinition[];
    conditionDefinitions: readonly PhotonConditionDefinition[];
    evaluators: PhotonConditionEvaluatorMap;
    context: PhotonConditionEvaluationContext;
    mode: PhotonConditionResolutionMode;
}) => PhotonActionStateDefinition | null;

type PhotonBlockActiveStateInput = {
    definition: PhotonAnyBlockDefinition | undefined;
    evaluators?: PhotonConditionEvaluatorMap;
    context?: PhotonConditionEvaluationContext;
    previewScenarioId?: string | null;
    /**
     * Resolution mode. When `"server"`, conditions whose
     * `PhotonConditionDefinition.resolution === "client"` short-circuit
     * to `null` and the resolver picks the `defaultServerPreviewState`
     * (or `isDefaultServerState`) — eliminates auth-flash on first paint.
     * Defaults to `"any"` (legacy behavior, all axes evaluated).
     */
    mode?: PhotonConditionResolutionMode;
    conditionDefinitions?: readonly PhotonConditionDefinition[];
};
type PhotonBlockActiveStateResolution = {
    state: PhotonActionStateDefinition | null;
    scenario: PhotonInteractionPreviewScenario | null;
    source: "preview" | "condition" | "default-server" | "fallback" | "none";
};
/**
 * Resolves the active state for a block based on:
 * 1. Builder preview override (`previewScenarioId`) — wins if a matching state
 *    or scenario exists, used for inspector state-switcher in builder mode.
 * 2. First state whose `condition` evaluates `true`.
 * 3. The state marked `isDefaultServerState` (or referenced via
 *    `conditionDefinition.defaultServerPreviewStateId`, or first
 *    unconditional state) when client-only conditions are unresolved.
 * 4. `null` when the block has no states/scenarios at all.
 *
 * SSR usage: pass `mode: "server"` with `conditionDefinitions`.
 * Conditions whose `resolution === "client"` short-circuit; resolver
 * falls back to default-server-preview-state for first paint without
 * auth-flash. After hydration, re-resolve with `mode: "any"`.
 *
 * Block components consume this via `usePhotonBlockActiveState(blockId)`.
 */
declare const resolvePhotonBlockActiveState: ({ definition, evaluators, context, previewScenarioId, mode, conditionDefinitions, }: PhotonBlockActiveStateInput) => PhotonBlockActiveStateResolution;

declare const PhotonRenderDepthProvider: react.Provider<number>;
declare const usePhotonRenderDepth: () => number;

declare const PhotonI18nProvider: ({ children, value, }: {
    children: ReactNode;
    value?: Partial<PhotonI18nValue> | null;
}) => react_jsx_runtime.JSX.Element;
declare const usePhotonI18n: () => PhotonI18nValue;
declare const resolvePhotonText: (value: string, translate: PhotonI18nValue["translate"], fallback?: string) => string;

type PhotonSiteSearchProps = {
    blockId: string;
    placeholderPath: string;
    className?: string;
    surfaceOpen?: boolean;
    onSurfaceOpenChange?: (open: boolean) => void;
    surfacePlaceholder?: string;
    surfaceTitle?: string;
    surfaceDescription?: string;
    surfaceHint?: string;
    surfaceLoading?: string;
    surfaceEmpty?: string;
    hideTrigger?: boolean;
    previewMode?: "runtime" | "builder-inline" | "builder-canvas-stage";
    previewScenarioId?: string;
    editableField?: PhotonInteractionSurfaceEditableFieldRenderer;
};
declare const PhotonSiteSearch: ({ blockId, placeholderPath, className, surfaceOpen, onSurfaceOpenChange, surfacePlaceholder, surfaceTitle, surfaceDescription, surfaceHint, surfaceLoading, surfaceEmpty, hideTrigger, previewMode, previewScenarioId, editableField, }: PhotonSiteSearchProps) => react_jsx_runtime.JSX.Element;
declare const PhotonSiteSearchSurfaceRenderer: ({ open, onOpenChange, request, previewMode, previewScenarioId, editableField, }: PhotonInteractionSurfaceRendererProps) => react_jsx_runtime.JSX.Element;

export { type PhotonBlockActiveStateResolution as P, type PhotonBlockActiveStateInput as a, type PhotonConditionResolutionMode as b, PhotonSiteSearch as c, PhotonSiteSearchSurfaceRenderer as d, evaluatePhotonConditionForMode as e, resolvePhotonBlockActiveState as f, resolvePhotonConditionAxis as g, usePhotonRenderDepth as h, PhotonI18nProvider as i, PhotonRenderDepthProvider as j, resolvePhotonText as k, resolvePhotonActionStateForMode as r, usePhotonI18n as u };
