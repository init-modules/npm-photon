import * as react_jsx_runtime from 'react/jsx-runtime';
export { g as getWebsiteBuilderAnchorRel, s as sanitizeWebsiteBuilderLinkHref } from './link-url-CBOXlDl0.js';
import { T as WebsiteBuilderInstallableKit, P as WebsiteBuilderModule, l as WebsiteBuilderResolvedPage, A as WebsiteBuilderRegistry, I as WebsiteBuilderI18nValue, H as WebsiteBuilderLinkComponent, u as WebsiteBuilderSiteFrameExtension, y as WebsiteBuilderAccountTabExtension, n as WebsiteBuilderSearchHighlight } from './types-CuFDrLWO.js';
export { a0 as WebsiteBuilderBindingAdapter, a as WebsiteBuilderBlock, a1 as WebsiteBuilderBlockComponentProps, M as WebsiteBuilderBlockDefinition, O as WebsiteBuilderBlockLocalizationSchema, b as WebsiteBuilderDocument, c as WebsiteBuilderDocumentsMap, J as WebsiteBuilderField, a2 as WebsiteBuilderFieldOption, $ as WebsiteBuilderLinkComponentProps, e as WebsiteBuilderLocaleDescriptor, f as WebsiteBuilderLocaleStatus, K as WebsiteBuilderPageSettingsPanelDefinition, a3 as WebsiteBuilderPageSettingsScope, L as WebsiteBuilderSiteSettingsPanelDefinition } from './types-CuFDrLWO.js';
import { ElementType, HTMLAttributes } from 'react';
export { W as WebsiteBuilderLink, a as WebsiteBuilderSiteSearch, u as useWebsiteBuilder, b as useWebsiteBuilderCanEdit, c as useWebsiteBuilderI18n, d as useWebsiteBuilderRenderDepth, e as useWebsiteBuilderStore, f as useWebsiteBuilderValueAtPath } from './website-builder-site-search-DgqPIWez.js';
export { c as createWebsiteBuilderBlockLocalizationSchema, a as createWebsiteBuilderKit, b as createWebsiteBuilderLocalizedDefault, d as createWebsiteBuilderRuntime, e as defineWebsiteBuilderBlockDefinition } from './runtime-Led5emTV.js';
export { g as getWebsiteBuilderSurfaceModeStyle } from './surface-layout-p8WBJh3f.js';
export { c as createWebsiteBuilderAccountTabExtension, a as createWebsiteBuilderSiteFrameExtension, r as resolveWebsiteBuilderAccountTabs } from './site-frame-extensions-CljWsZYY.js';
export { W as WEBSITE_BUILDER_SEARCH_OCCURRENCE_PARAM, a as WEBSITE_BUILDER_SEARCH_QUERY_PARAM, b as WEBSITE_BUILDER_SEARCH_TARGET_PARAM } from './constants-DenT-L3W.js';
import 'zustand/vanilla';

type PublicEditableImageProps = {
    blockId: string;
    path: string;
    altPath?: string;
    className?: string;
    imageClassName?: string;
    fallbackAlt?: string;
};
declare const EditableImage: ({ blockId, path, altPath, className, imageClassName, fallbackAlt, }: PublicEditableImageProps) => react_jsx_runtime.JSX.Element;

type PublicEditableGalleryProps = {
    blockId: string;
    path: string;
    className?: string;
    emptyTitle?: string;
    emptyBody?: string;
    columnsClassName?: string;
    itemCardClassName?: string;
    itemFallbackClassName?: string;
    itemLabelClassName?: string;
    itemCaptionClassName?: string;
    itemFileNameClassName?: string;
    emptyStateClassName?: string;
    emptyStateTitleClassName?: string;
    emptyStateBodyClassName?: string;
    emptyStateButtonClassName?: string;
    addCardClassName?: string;
    addCardTitleClassName?: string;
    addCardBodyClassName?: string;
    addCardButtonClassName?: string;
};
declare const EditableGallery: ({ blockId, path, className, emptyTitle, emptyBody, columnsClassName, itemCardClassName, itemFallbackClassName, itemLabelClassName, itemCaptionClassName, itemFileNameClassName, emptyStateClassName, emptyStateTitleClassName, emptyStateBodyClassName, emptyStateButtonClassName, addCardClassName, addCardTitleClassName, addCardBodyClassName, addCardButtonClassName, }: PublicEditableGalleryProps) => react_jsx_runtime.JSX.Element;

type PublicEditableRepeaterValueProps = {
    blockId: string;
    path: string;
    fallback?: string;
    className?: string;
    as?: ElementType;
};
declare const EditableRepeaterValue: ({ blockId, path, fallback, className, as, }: PublicEditableRepeaterValueProps) => react_jsx_runtime.JSX.Element;

type PublicEditableRichTextProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableRichText: ({ blockId, path, className, placeholder, }: PublicEditableRichTextProps) => react_jsx_runtime.JSX.Element;

type PublicEditableTextProps = HTMLAttributes<HTMLElement> & {
    blockId: string;
    path: string;
    as?: ElementType;
    placeholder?: string;
};
declare const EditableText: ({ blockId, path, as: Tag, className, placeholder, ...rest }: PublicEditableTextProps) => react_jsx_runtime.JSX.Element;

type PublicEditableTextareaProps = {
    blockId: string;
    path: string;
    className?: string;
    placeholder?: string;
};
declare const EditableTextarea: ({ blockId, path, className, placeholder, }: PublicEditableTextareaProps) => react_jsx_runtime.JSX.Element;

declare const sanitizeWebsiteBuilderRichTextHtml: (value: string) => string;
declare const renderWebsiteBuilderRichTextHtml: (value: string, placeholder: string) => string;

declare const websiteBuilderPublicSystemModule: WebsiteBuilderModule;
declare const websiteBuilderPublicSystemKit: WebsiteBuilderInstallableKit;

type WebsiteBuilderPublicPageProps = {
    page: WebsiteBuilderResolvedPage;
    registry: WebsiteBuilderRegistry;
    i18n?: WebsiteBuilderI18nValue | null;
    linkComponent?: WebsiteBuilderLinkComponent;
    siteFrameExtensions?: WebsiteBuilderSiteFrameExtension[];
    accountTabs?: WebsiteBuilderAccountTabExtension[];
    requestAuth?: () => void;
    activeSearchHighlight?: WebsiteBuilderSearchHighlight | null;
};
declare const WebsiteBuilderPublicPage: ({ page, registry, i18n, linkComponent, siteFrameExtensions, accountTabs, requestAuth, activeSearchHighlight, }: WebsiteBuilderPublicPageProps) => react_jsx_runtime.JSX.Element;

export { EditableGallery, EditableImage, EditableRepeaterValue, EditableRichText, EditableText, EditableTextarea, WebsiteBuilderAccountTabExtension, WebsiteBuilderInstallableKit, WebsiteBuilderModule, WebsiteBuilderPublicPage, WebsiteBuilderSiteFrameExtension, renderWebsiteBuilderRichTextHtml, sanitizeWebsiteBuilderRichTextHtml, websiteBuilderPublicSystemKit as websiteBuilderSystemKit, websiteBuilderPublicSystemModule as websiteBuilderSystemModule };
