"use client";

import { useCallback } from "react";
import { createWebsiteBuilderStudioSiteSettingChangeContext } from "./persistence-helpers";
import type { WebsiteBuilderStudioProps } from "../types";

type UseStudioSiteSettingChangeInput = {
	workspace?: WebsiteBuilderStudioProps["workspace"];
	expectedHeadRevisionId: null | string;
	document: WebsiteBuilderStudioProps["initialDocument"];
	resources: NonNullable<WebsiteBuilderStudioProps["initialResources"]>;
	pageSettings: NonNullable<WebsiteBuilderStudioProps["initialPageSettings"]>;
	site: NonNullable<WebsiteBuilderStudioProps["initialSite"]>;
	currentPage: WebsiteBuilderStudioProps["currentPage"] | null;
	updateSiteSettingValue: (path: string, value: unknown) => void;
	onSiteSettingChange?: WebsiteBuilderStudioProps["onSiteSettingChange"];
	replaceState: (
		document: WebsiteBuilderStudioProps["initialDocument"],
		resources?: WebsiteBuilderStudioProps["initialResources"],
		pageSettings?: WebsiteBuilderStudioProps["initialPageSettings"],
		site?: WebsiteBuilderStudioProps["initialSite"],
	) => void;
};

type ApplyStudioSiteSettingChangeInput = UseStudioSiteSettingChangeInput & {
	path: string;
	value: unknown;
};

export const applyStudioSiteSettingChange = ({
	path,
	value,
	workspace,
	expectedHeadRevisionId,
	document,
	resources,
	pageSettings,
	site,
	currentPage,
	updateSiteSettingValue,
	onSiteSettingChange,
	replaceState,
}: ApplyStudioSiteSettingChangeInput) => {
	updateSiteSettingValue(path, value);

	if (!onSiteSettingChange) {
		return;
	}

	const replacement = onSiteSettingChange(
		path,
		value,
		createWebsiteBuilderStudioSiteSettingChangeContext({
			path,
			value,
			workspace,
			expectedHeadRevisionId,
			document,
			resources,
			pageSettings,
			site,
			currentPage,
		}),
	);

	if (!replacement) {
		return;
	}

	replaceState(
		replacement.document,
		replacement.resources,
		replacement.pageSettings,
		replacement.site,
	);
};

export const useStudioSiteSettingChange = ({
	workspace,
	expectedHeadRevisionId,
	document,
	resources,
	pageSettings,
	site,
	currentPage,
	updateSiteSettingValue,
	onSiteSettingChange,
	replaceState,
}: UseStudioSiteSettingChangeInput) =>
	useCallback(
		(path: string, value: unknown) => {
			applyStudioSiteSettingChange({
				path,
				value,
				workspace,
				expectedHeadRevisionId,
				document,
				resources,
				pageSettings,
				site,
				currentPage,
				updateSiteSettingValue,
				onSiteSettingChange,
				replaceState,
			});
		},
		[
			currentPage,
			document,
			expectedHeadRevisionId,
			onSiteSettingChange,
			pageSettings,
			replaceState,
			resources,
			site,
			updateSiteSettingValue,
			workspace,
		],
	);
