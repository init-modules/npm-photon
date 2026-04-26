"use client";
import {
  evaluateConditionExpression
} from "./chunk-WHYISUJX.js";

// src/helpers/condition-resolution.ts
var resolvePhotonConditionAxis = (expr, conditionDefinitions) => {
  if (!expr) {
    return "both";
  }
  const definitionsById = new Map(
    conditionDefinitions.map((definition) => [definition.id, definition])
  );
  const walk = (node) => {
    switch (node.type) {
      case "ref": {
        const definition = definitionsById.get(node.conditionId);
        if (!definition) {
          return "client";
        }
        return definition.resolution;
      }
      case "and":
      case "or":
        return mergeAxes(node.operands.map(walk));
      case "not":
        return walk(node.operand);
      case "eq":
        return "both";
    }
  };
  return walk(expr);
};
var mergeAxes = (axes) => {
  let hasClient = false;
  let hasServer = false;
  for (const axis of axes) {
    if (axis === "client") {
      hasClient = true;
    } else if (axis === "server") {
      hasServer = true;
    }
  }
  if (hasClient) {
    return "client";
  }
  if (hasServer) {
    return "server";
  }
  return "both";
};
var evaluatePhotonConditionForMode = (expr, evaluators, context, conditionDefinitions, mode) => {
  const definitionsById = new Map(
    conditionDefinitions.map((definition) => [definition.id, definition])
  );
  const walk = (node) => {
    switch (node.type) {
      case "ref": {
        if (mode === "server") {
          const definition = definitionsById.get(node.conditionId);
          if (!definition || definition.resolution === "client") {
            return null;
          }
        }
        const evaluator = evaluators[node.conditionId];
        if (!evaluator) {
          return null;
        }
        const result = evaluator(context);
        if (result === void 0) {
          return null;
        }
        return result ?? null;
      }
      case "and": {
        let hasNull = false;
        for (const operand of node.operands) {
          const r = walk(operand);
          if (r === false) return false;
          if (r === null) hasNull = true;
        }
        return hasNull ? null : true;
      }
      case "or": {
        let hasNull = false;
        for (const operand of node.operands) {
          const r = walk(operand);
          if (r === true) return true;
          if (r === null) hasNull = true;
        }
        return hasNull ? null : false;
      }
      case "not": {
        const r = walk(node.operand);
        return r === null ? null : !r;
      }
      case "eq": {
        const parts = node.path.split(".");
        let val = context;
        for (const part of parts) {
          if (val == null || typeof val !== "object") return false;
          val = val[part];
        }
        return val === node.value;
      }
    }
  };
  return walk(expr);
};
var resolvePhotonActionStateForMode = ({
  states,
  conditionDefinitions,
  evaluators,
  context,
  mode
}) => {
  if (states.length === 0) {
    return null;
  }
  for (const state of states) {
    if (!state.condition) {
      continue;
    }
    const result = evaluatePhotonConditionForMode(
      state.condition,
      evaluators,
      context,
      conditionDefinitions,
      mode
    );
    if (result === true) {
      return state;
    }
  }
  if (mode === "server") {
    const explicitDefault = states.find((s) => s.isDefaultServerState);
    if (explicitDefault) {
      return explicitDefault;
    }
    for (const state of states) {
      const condition = state.condition;
      if (!condition || condition.type !== "ref") continue;
      const conditionDef = conditionDefinitions.find(
        (d) => d.id === condition.conditionId
      );
      const targetId = conditionDef?.defaultServerPreviewStateId;
      if (!targetId) continue;
      const target = states.find((s) => s.id === targetId);
      if (target) return target;
    }
  }
  return states.find((s) => !s.condition) ?? null;
};

// src/helpers/block-active-state.ts
var findScenarioById = (definition, scenarioId) => {
  if (!definition || !scenarioId) {
    return null;
  }
  return definition.previewScenarios?.find((s) => s.id === scenarioId) ?? null;
};
var findStateById = (definition, stateId) => {
  if (!definition || !stateId) {
    return null;
  }
  return definition.states?.find((s) => s.id === stateId) ?? null;
};
var pickConditionState = (definition, evaluators, context, mode, conditionDefinitions) => {
  const states = definition.states ?? [];
  let hasUnresolved = false;
  for (const state of states) {
    if (!state.condition) {
      continue;
    }
    const result = mode === "any" ? evaluateConditionExpression(state.condition, evaluators, context) : evaluatePhotonConditionForMode(
      state.condition,
      evaluators,
      context,
      conditionDefinitions,
      mode
    );
    if (result === true) {
      return { state, hasUnresolved };
    }
    if (result === null) {
      hasUnresolved = true;
    }
  }
  return { state: null, hasUnresolved };
};
var pickServerDefault = (definition, conditionDefinitions) => {
  const states = definition.states ?? [];
  const explicit = states.find((s) => s.isDefaultServerState);
  if (explicit) {
    return explicit;
  }
  for (const state of states) {
    const condition = state.condition;
    if (!condition || condition.type !== "ref") continue;
    const conditionDef = conditionDefinitions.find(
      (d) => d.id === condition.conditionId
    );
    const targetId = conditionDef?.defaultServerPreviewStateId;
    if (!targetId) continue;
    const target = states.find((s) => s.id === targetId);
    if (target) return target;
  }
  return states.find((s) => !s.condition) ?? null;
};
var resolvePhotonBlockActiveState = ({
  definition,
  evaluators,
  context,
  previewScenarioId,
  mode = "any",
  conditionDefinitions = []
}) => {
  if (!definition) {
    return { state: null, scenario: null, source: "none" };
  }
  if (previewScenarioId) {
    const matchingState = findStateById(definition, previewScenarioId);
    if (matchingState) {
      const matchingScenario2 = findScenarioById(definition, previewScenarioId);
      return {
        state: matchingState,
        scenario: matchingScenario2,
        source: "preview"
      };
    }
    const matchingScenario = findScenarioById(definition, previewScenarioId);
    if (matchingScenario) {
      return { state: null, scenario: matchingScenario, source: "preview" };
    }
  }
  const hasStates = (definition.states?.length ?? 0) > 0;
  const hasScenarios = (definition.previewScenarios?.length ?? 0) > 0;
  if (!hasStates && !hasScenarios) {
    return { state: null, scenario: null, source: "none" };
  }
  if (hasStates && evaluators && context) {
    const picked = pickConditionState(
      definition,
      evaluators,
      context,
      mode,
      conditionDefinitions
    );
    if (picked.state) {
      return { state: picked.state, scenario: null, source: "condition" };
    }
    if (picked.hasUnresolved) {
      const serverDefault = pickServerDefault(
        definition,
        conditionDefinitions
      );
      if (serverDefault) {
        return {
          state: serverDefault,
          scenario: null,
          source: "default-server"
        };
      }
    }
  }
  const fallbackState = hasStates ? pickServerDefault(definition, conditionDefinitions) : null;
  if (fallbackState) {
    return { state: fallbackState, scenario: null, source: "fallback" };
  }
  const firstScenario = definition.previewScenarios?.[0] ?? null;
  if (firstScenario) {
    return { state: null, scenario: firstScenario, source: "fallback" };
  }
  return { state: null, scenario: null, source: "none" };
};

// src/i18n/photon-i18n-context.tsx
import { createContext, useContext, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
var createDefaultTranslate = () => (key, fallback) => fallback ?? key;
var defaultValue = {
  defaultLocale: "en",
  locale: "en",
  contentLocale: "en",
  interfaceLocale: "en",
  interfaceLocales: [
    { code: "en", label: "English" },
    { code: "ru", label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" }
  ],
  locales: [],
  publicLocales: [],
  editableLocales: [],
  showLocaleSwitcher: false,
  translate: createDefaultTranslate()
};
var PhotonI18nContext = createContext(defaultValue);
var PhotonI18nProvider = ({
  children,
  value
}) => {
  const nextValue = useMemo(
    () => ({
      ...defaultValue,
      ...value,
      translate: value?.translate ?? defaultValue.translate
    }),
    [value]
  );
  return /* @__PURE__ */ jsx(PhotonI18nContext.Provider, { value: nextValue, children });
};
var usePhotonI18n = () => useContext(PhotonI18nContext);
var resolvePhotonText = (value, translate, fallback) => translate(value, fallback ?? value);

// src/interaction-surfaces/photon-interaction-surface-host.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var PhotonInteractionSurfaceHost = ({
  request,
  renderers = {},
  onOpenChange,
  onComplete
}) => {
  if (!request || request.definition.kind === "toast") {
    return null;
  }
  const Renderer = renderers[request.definition.rendererKey];
  if (!Renderer) {
    return null;
  }
  return /* @__PURE__ */ jsx2(
    Renderer,
    {
      open: true,
      onOpenChange,
      request,
      onComplete
    }
  );
};

export {
  resolvePhotonConditionAxis,
  evaluatePhotonConditionForMode,
  resolvePhotonActionStateForMode,
  resolvePhotonBlockActiveState,
  PhotonI18nProvider,
  usePhotonI18n,
  resolvePhotonText,
  PhotonInteractionSurfaceHost
};
