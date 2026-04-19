import type {
	WebsiteBuilderAccountTabExtension,
	WebsiteBuilderDocumentsMap,
	WebsiteBuilderInstallableKit,
	WebsiteBuilderModule,
	WebsiteBuilderRegistryEntry,
	WebsiteBuilderSiteFrameExtension,
} from "../types";

export const createWebsiteBuilderKit = (
	kit: WebsiteBuilderInstallableKit,
): WebsiteBuilderInstallableKit => kit;

export const isWebsiteBuilderInstallableKit = (
	entry: WebsiteBuilderRegistryEntry,
): entry is WebsiteBuilderInstallableKit => "modules" in entry;

export const resolveWebsiteBuilderModules = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderModule[] =>
	entries.flatMap((entry) =>
		isWebsiteBuilderInstallableKit(entry) ? entry.modules : [entry],
	);

export const collectWebsiteBuilderDocuments = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderDocumentsMap => {
	const documents: WebsiteBuilderDocumentsMap = {};

	for (const entry of entries) {
		if (!isWebsiteBuilderInstallableKit(entry) || !entry.documents) {
			continue;
		}

		Object.assign(documents, entry.documents);
	}

	return documents;
};

export const collectWebsiteBuilderSiteFrameExtensions = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderSiteFrameExtension[] =>
	entries.flatMap((entry) =>
		isWebsiteBuilderInstallableKit(entry)
			? entry.siteFrameExtensions ?? []
			: [],
	);

export const collectWebsiteBuilderAccountTabs = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderAccountTabExtension[] =>
	entries.flatMap((entry) =>
		isWebsiteBuilderInstallableKit(entry) ? entry.accountTabs ?? [] : [],
	);
