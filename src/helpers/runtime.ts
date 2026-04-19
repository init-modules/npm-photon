import type {
	WebsiteBuilderRegistryEntry,
	WebsiteBuilderRuntime,
} from "../types";
import { createWebsiteBuilderRegistry } from "./document";
import {
	collectWebsiteBuilderAccountTabs,
	collectWebsiteBuilderDocuments,
	collectWebsiteBuilderSiteFrameExtensions,
} from "./installable";

export const createWebsiteBuilderRuntime = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderRuntime => ({
	entries,
	registry: createWebsiteBuilderRegistry(entries),
	documents: collectWebsiteBuilderDocuments(entries),
	siteFrameExtensions: collectWebsiteBuilderSiteFrameExtensions(entries),
	accountTabs: collectWebsiteBuilderAccountTabs(entries),
});
