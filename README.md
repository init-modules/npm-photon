# @init/photon

Package-first foundation for the Photon runtime.

It provides:

- manifest and block definition types
- installable kit and runtime helpers
- SSR-safe builder state provider backed by a per-request Zustand store
- inline content editing primitives
- form schema/runtime primitives through [`@init/photon/forms`](./src/forms/README.md)
- live site search primitives with stable `blockId::path` targets and exact-hit highlighting
- runtime block renderer
- reusable `PhotonStudio` shell that apps can wrap with their own auth/backend adapters

Install from a Next.js app:

```bash
pnpm add @init/photon
```

Typical companion packages export `PhotonModule` objects that this foundation consumes.
In the current architecture, apps usually build a runtime from installable kit objects instead of registering modules and demo documents separately.

The foundation store is initialized from server-provided document data through the package provider and then consumed in components through selector-based hooks.
That keeps SSR output stable while avoiding broad rerenders across the live canvas, palette and inspector.

When an app provides an `onSearch` handler, the default site header search can query public routes, navigate to the resolved page and highlight the exact matched occurrence on the live surface.

<!-- BEGIN RX PACKAGE REFERENCE -->
# @init/photon

Foundation runtime and editing primitives for the package-first photon.

## Назначение

@init/photon — npm/TypeScript package; Photon integration or runtime layer. Пакет экспортирует TypeScript/React primitives для frontend-части Init/Rx и не должен смешивать backend-интеграции с клиентским runtime.

- Этот пакет находится в слое Photon. Доменная логика должна оставаться в базовых пакетах, а здесь должны быть только адаптеры, настройки страниц, runtime-провайдеры или UI-kit для конструктора.

## Установка

~~~bash
npm install @init/photon
~~~

Проверьте peer dependencies в host-приложении, особенно версии React, Next.js и соседних <code>@init/*</code> пакетов.

## Экспорты

- <code>.</code>
- <code>./client</code>
- <code>./forms</code>
- <code>./sdk</code>
- <code>./shared</code>
- <code>./server</code>

Основные entry points:
- <code>client.ts</code>
- <code>components/editable/shared.ts</code>
- <code>components/ui/context-menu/index.ts</code>
- <code>components/ui/dialog/index.ts</code>
- <code>components/ui/dropdown-menu/index.ts</code>
- <code>components/ui/keyboard-menu/index.ts</code>
- <code>components/ui/select/index.ts</code>
- <code>index.ts</code>
- <code>sdk.ts</code>
- <code>server.ts</code>
- <code>shared.ts</code>
- <code>studio/inspector-panel/shared.ts</code>

## Состав пакета

- **components**: <code>components/block-renderer.tsx</code>, <code>components/editable/editable-gallery-add-card.tsx</code>, <code>components/editable/editable-gallery-empty-state.tsx</code>, <code>components/editable/editable-gallery-item-card.tsx</code>, <code>components/editable/editable-gallery-types.ts</code>, <code>components/editable/editable-gallery.tsx</code>, <code>components/editable/editable-image.tsx</code>, <code>components/editable/editable-repeater-value.tsx</code>, ...и еще 33
- **context**: <code>context/external-state.test.ts</code>, <code>context/external-state.ts</code>, <code>context/photon-context.tsx</code>, <code>context/photon-render-depth-context.tsx</code>, <code>context/photon-store.test.ts</code>, <code>context/photon-store.ts</code>, <code>context/photon-surface-layout-context.tsx</code>
- **helpers**: <code>helpers/binding.ts</code>, <code>helpers/cn.ts</code>, <code>helpers/document.ts</code>, <code>helpers/installable.ts</code>, <code>helpers/media.ts</code>, <code>helpers/path.ts</code>, <code>helpers/runtime.ts</code>, <code>helpers/site-design.test.ts</code>, ...и еще 7
- **i18n**: <code>i18n/photon-i18n-context.tsx</code>, <code>i18n/photon-labels.ts</code>
- **modules**: <code>modules/system/site/helpers.ts</code>, <code>modules/system/site/site-color-schemes.ts</code>, <code>modules/system/site/site-design-presets.ts</code>, <code>modules/system/site/site-design-settings-panel.tsx</code>, <code>modules/system/site/site-footer-shell-definition.tsx</code>, <code>modules/system/site/site-header-shell-definition.tsx</code>, <code>modules/system.tsx</code>
- **Root**: <code>client.ts</code>, <code>index.ts</code>, <code>sdk.ts</code>, <code>server.ts</code>, <code>shared.ts</code>, <code>types.ts</code>
- **sdk**: <code>sdk/access.ts</code>, <code>sdk/mode.ts</code>, <code>sdk/request.ts</code>
- **search**: <code>search/constants.ts</code>, <code>search/helpers.ts</code>, <code>search/photon-search-highlight-effect.tsx</code>, <code>search/photon-site-search.tsx</code>
- **studio**: <code>studio/canvas/block-overlay-card.tsx</code>, <code>studio/canvas/canvas-block-item.tsx</code>, <code>studio/canvas/canvas-block-list.tsx</code>, <code>studio/canvas/canvas-block-shell.tsx</code>, <code>studio/canvas/canvas-insert-zone.tsx</code>, <code>studio/canvas/canvas-surface-mode-toggle.tsx</code>, <code>studio/canvas/canvas-top-toolbar.tsx</code>, <code>studio/canvas/collapsed-block-preview.tsx</code>, ...и еще 51

## Зависимости

Runtime dependencies:
- <code>@radix-ui/react-context-menu ^2.2.16</code>
- <code>@radix-ui/react-dialog ^1.1.15</code>
- <code>@radix-ui/react-dropdown-menu ^2.1.16</code>
- <code>@radix-ui/react-select ^2.2.6</code>
- <code>@dnd-kit/core ^6.3.1</code>
- <code>@tiptap/extension-placeholder ^2.26.4</code>
- <code>@tiptap/html ^2.26.4</code>
- <code>@tiptap/react ^2.26.4</code>
- <code>@tiptap/starter-kit ^2.26.4</code>
- <code>clsx ^2.1.1</code>
- <code>idb ^8.0.3</code>
- <code>lucide-react ^0.556.0</code>
- <code>sonner ^2.0.7</code>
- <code>zustand ^5.0.12</code>

Peer dependencies:
- <code>react ^19.0.0</code>
- <code>react-dom ^19.0.0</code>

## Сборка

- <code>build: tsup src/index.ts src/client.ts src/sdk.ts src/forms.ts src/server.ts src/shared.ts --format esm --dts --clean</code>
- <code>prepack: npm run build</code>

## Разработка

- держите типы публичного API рядом с основными entry points;
- не добавляйте host-specific код в базовые frontend SDK;
- Photon UI-kit и adapter packages должны оставаться над <code>@init/photon</code>, не наоборот;
- перед публикацией выполните <code>npm run build</code>, если пакет собирается в <code>dist</code>.
<!-- END RX PACKAGE REFERENCE -->
