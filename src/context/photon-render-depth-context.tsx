"use client";

import { createContext, useContext } from "react";

const PhotonRenderDepthContext = createContext(0);

export const PhotonRenderDepthProvider =
	PhotonRenderDepthContext.Provider;

export const usePhotonRenderDepth = () =>
	useContext(PhotonRenderDepthContext);
