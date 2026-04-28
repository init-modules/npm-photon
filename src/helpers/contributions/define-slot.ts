import type { PhotonSlot, PhotonSlotPlacement } from "./types";

export type DefinePhotonSlotOptions<TContext = unknown> = {
	id: string;
	placement: PhotonSlotPlacement;
	description?: string;
	/**
	 * Phantom marker for the context shape that contributions targeting
	 * this slot will receive. Never set at runtime — TypeScript uses it
	 * to enforce component prop types on registration.
	 */
	context?: TContext;
};

/**
 * Declare a slot. Slots are open-registry: any package or kit may declare
 * one. Contribution registration into an undeclared slot is a composition
 * error caught by the registry validator.
 *
 * Example:
 * ```ts
 * export const headerActionsSlot = definePhotonSlot({
 *   id: "header.actions",
 *   placement: "site-frame",
 *   description: "Right-aligned action items in the header",
 * });
 * ```
 */
export const definePhotonSlot = <TContext = unknown>(
	options: DefinePhotonSlotOptions<TContext>,
): PhotonSlot<TContext> => ({
	id: options.id,
	placement: options.placement,
	...(options.description !== undefined
		? { description: options.description }
		: {}),
});
