"use client";

import { createContext, useContext } from "react";

const WebsiteBuilderRenderDepthContext = createContext(0);

export const WebsiteBuilderRenderDepthProvider =
	WebsiteBuilderRenderDepthContext.Provider;

export const useWebsiteBuilderRenderDepth = () =>
	useContext(WebsiteBuilderRenderDepthContext);
