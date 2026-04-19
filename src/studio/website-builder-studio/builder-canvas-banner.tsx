"use client";

export const BuilderCanvasBanner = () => {
	return (
		<div className="mb-5 flex flex-col gap-4 rounded-[30px] border border-white/8 bg-[linear-gradient(180deg,rgba(8,17,31,0.88),rgba(6,12,22,0.96))] px-4 py-4 shadow-[0_24px_52px_rgba(0,0,0,0.16)] sm:flex-row sm:items-center sm:justify-between">
			<div>
				<div className="text-[11px] uppercase tracking-[0.28em] text-white/45">
					Live builder canvas
				</div>
				<div className="mt-2 text-lg font-semibold tracking-[-0.03em] text-white">
					Panels lock to screen edges, the page compresses into a working
					canvas, and insert zones stay visible between real blocks.
				</div>
			</div>
			<div className="max-w-sm rounded-2xl border border-cyan-300/16 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100/90">
				Drag from the palette, drop onto plus zones, or recover drafts from
				local storage if the tab closes mid-edit.
			</div>
		</div>
	);
};
