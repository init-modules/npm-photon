"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";
import { usePhotonInspectorDensity } from "./inspector-density-context";

/**
 * Compact/comfortable density toggle for the inspector header.
 * Mirrors UE5 Details "compact mode" — squeezes more fields into the
 * same vertical space without changing the visual identity.
 */
export const InspectorDensityToggle = () => {
	const { density, toggleDensity } = usePhotonInspectorDensity();
	const { translate } = usePhotonI18n();
	const isCompact = density === "compact";
	const Icon = isCompact ? Maximize2 : Minimize2;
	return (
		<button
			type="button"
			onClick={toggleDensity}
			className="inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border opacity-70 transition hover:opacity-100"
			style={{
				borderColor: "var(--photon-builder-border)",
				color: "var(--photon-builder-text-soft)",
			}}
			aria-label={translate(
				isCompact
					? "photon.studio.inspector.density.toComfortable"
					: "photon.studio.inspector.density.toCompact",
				isCompact ? "Switch to comfortable density" : "Switch to compact density",
			)}
			data-testid="photon-inspector-density-toggle"
			data-density={density}
		>
			<Icon size={10} />
		</button>
	);
};
