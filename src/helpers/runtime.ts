import type {
	WebsiteBuilderRegistryEntry,
	WebsiteBuilderRuntime,
} from "../types";
import { createWebsiteBuilderRegistry } from "./document";
import { collectWebsiteBuilderDocuments } from "./installable";

export const createWebsiteBuilderRuntime = (
	entries: WebsiteBuilderRegistryEntry[],
): WebsiteBuilderRuntime => ({
	entries,
	registry: createWebsiteBuilderRegistry(entries),
	documents: collectWebsiteBuilderDocuments(entries),
});
