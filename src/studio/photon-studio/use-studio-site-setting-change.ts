"use client";

import { useCallback } from "react";
import type { PhotonStudioProps } from "../types";
import { createPhotonStudioSiteSettingChangeContext } from "./persistence-helpers";

type UseStudioSiteSettingChangeInput = {
	workspace?: PhotonStudioProps["workspace"];
	expectedHeadRevisionId: null | string;
	document: PhotonStudioProps["initialDocument"];
	resources: NonNullable<PhotonStudioProps["initialResources"]>;
	pageSettings: NonNullable<PhotonStudioProps["initialPageSettings"]>;
	site: NonNullable<PhotonStudioProps["initialSite"]>;
	currentPage: PhotonStudioProps["currentPage"] | null;
	updateSiteSettingValue: (path: string, value: unknown) => void;
	onSiteSettingChange?: PhotonStudioProps["onSiteSettingChange"];
	replaceState: (
		document: PhotonStudioProps["initialDocument"],
		resources?: PhotonStudioProps["initialResources"],
		pageSettings?: PhotonStudioProps["initialPageSettings"],
		site?: PhotonStudioProps["initialSite"],
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
		createPhotonStudioSiteSettingChangeContext({
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
