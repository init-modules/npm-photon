"use client";

import { WebsiteBuilderProvider } from "../../context/website-builder-context";
import type { WebsiteBuilderStudioProps } from "../types";
import { WebsiteBuilderStudioInner } from "./website-builder-studio-inner";

export const WebsiteBuilderStudio = ({
	initialDocument,
	initialResources,
	initialPageSettings,
	initialSite,
	registry,
	workspace,
	capabilities,
	history,
	branchPolicy,
	mergePreview,
	canManage,
	initialMode = "preview",
	draftStorageKey,
	autosaveStorageKey,
	currentPage,
	pages,
	onRequestAuth,
	onLogout,
	onContentLocaleChange,
	onInterfaceLocaleChange,
	onModeChange,
	onSiteSettingChange,
	onSaveDocument,
	onOpenPage,
	onCreatePage,
	onUploadMedia,
	onSearch,
	activeSearchHighlight,
	linkComponent,
	siteFrameExtensions,
	accountTabs,
	i18n,
	hydrateModePreference = true,
	showInterfaceLocaleControl = true,
	workspaceControl,
	title = "Live website editing framework",
	description = "Package-level studio shell with inline content editing, builder chrome and installable kit support.",
	renderContentNotice,
	siteSettingsSubtabs,
}: WebsiteBuilderStudioProps) => {
	return (
		<WebsiteBuilderProvider
			initialDocument={initialDocument}
			initialResources={initialResources}
			initialPageSettings={initialPageSettings}
			initialSite={initialSite}
			registry={registry}
			workspace={workspace}
			capabilities={capabilities}
			initialMode={initialMode}
			isAdmin={canManage}
			uploadMedia={onUploadMedia}
			searchSite={onSearch}
			requestAuth={onRequestAuth}
			linkComponent={linkComponent}
			siteFrameExtensions={siteFrameExtensions}
			accountTabs={accountTabs}
			i18n={i18n}
		>
			<WebsiteBuilderStudioInner
				initialDocument={initialDocument}
				initialResources={initialResources}
				initialPageSettings={initialPageSettings}
				initialSite={initialSite}
				workspace={workspace}
				capabilities={capabilities}
				history={history}
				branchPolicy={branchPolicy}
				mergePreview={mergePreview}
				canManage={Boolean(canManage)}
				initialMode={initialMode}
				draftStorageKey={draftStorageKey}
				autosaveStorageKey={autosaveStorageKey}
				currentPage={currentPage}
				pages={pages}
				onRequestAuth={onRequestAuth}
				onLogout={onLogout}
				onContentLocaleChange={onContentLocaleChange}
				onInterfaceLocaleChange={onInterfaceLocaleChange}
				onModeChange={onModeChange}
				onSiteSettingChange={onSiteSettingChange}
				onSaveDocument={onSaveDocument}
				onOpenPage={onOpenPage}
				onCreatePage={onCreatePage}
				activeSearchHighlight={activeSearchHighlight}
				hydrateModePreference={hydrateModePreference}
				showInterfaceLocaleControl={showInterfaceLocaleControl}
				workspaceControl={workspaceControl}
				title={title ?? "Live website editing framework"}
				description={
					description ??
					"Package-level studio shell with inline content editing, builder chrome and installable kit support."
				}
				renderContentNotice={renderContentNotice}
				siteSettingsSubtabs={siteSettingsSubtabs}
			/>
		</WebsiteBuilderProvider>
	);
};
