"use client";

import { PanelsTopLeft } from "lucide-react";
import { useWebsiteBuilderI18n } from "../../i18n/website-builder-i18n-context";

type EditorDockBrandProps = {
	title: string;
	compact?: boolean;
};

export const EditorDockBrand = ({
	title,
	compact = false,
}: EditorDockBrandProps) => {
	const { translate } = useWebsiteBuilderI18n();
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
					borderColor: "var(--wb-builder-border-strong)",
					background: "var(--wb-builder-accent-strong)",
					color: "var(--wb-builder-accent)",
				}}
			>
				<PanelsTopLeft className="h-5 w-5" />
			</div>
			<div className="min-w-0">
				<div
					className="text-[11px] uppercase tracking-[0.3em]"
					style={{ color: "var(--wb-builder-text-soft)" }}
				>
					{translate("websiteBuilder.brand", "Website Builder")}
				</div>
				<div
					className={`font-semibold tracking-[-0.03em] transition-[font-size] duration-300 ease-out ${
						compact ? "text-base" : "text-lg"
					}`}
					style={{ color: "var(--wb-builder-text)" }}
				>
					{title}
				</div>
			</div>
		</div>
	);
};
