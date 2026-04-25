"use client";

import { createContext, useContext } from "react";

export const PhotonComponentLibraryStackContext = createContext<
	readonly string[]
>([]);

export const usePhotonComponentLibraryStack = (): readonly string[] =>
	useContext(PhotonComponentLibraryStackContext);
