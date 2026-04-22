"use client";

import { PanelsTopLeft } from "lucide-react";
import { usePhotonI18n } from "../../i18n/photon-i18n-context";

type EditorDockBrandProps = {
	title: string;
	compact?: boolean;
};

export const EditorDockBrand = ({
	title,
	compact = false,
}: EditorDockBrandProps) => {
	const { translate } = usePhotonI18n();
	return (
		<div
			className={`flex min-w-0 items-start transition-[gap] duration-300 ease-out ${
				compact ? "gap-2.5" : "gap-3"
			}`}
		>
			<div
				className={`flex items-center justify-center rounded-2xl border transition-[width,height,transform] duration-300 ease-out ${
					compact ? "h-10 w-10" : "h-11 w-11"
				}`}
				style={{
					borderColor: "var(--photon-builder-border-strong)",
					background: "var(--photon-builder-accent-strong)",
					color: "var(--photon-builder-accent)",
				}}
			>
				<PanelsTopLeft className="h-5 w-5" />
			</div>
			<div className="min-w-0">
				<div
					className="text-[11px] uppercase tracking-[0.3em]"
					style={{ color: "var(--photon-builder-text-soft)" }}
				>
					{translate("photon.brand", "Photon")}
				</div>
				<div
					className={`font-semibold tracking-[-0.03em] transition-[font-size] duration-300 ease-out ${
						compact ? "text-base" : "text-lg"
					}`}
					style={{ color: "var(--photon-builder-text)" }}
				>
					{title}
				</div>
			</div>
		</div>
	);
};
