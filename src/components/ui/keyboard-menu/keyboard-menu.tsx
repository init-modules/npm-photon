"use client";

import clsx from "clsx";
import type {
	HTMLAttributes,
	KeyboardEvent as ReactKeyboardEvent,
	ReactNode,
} from "react";
import {
	useCallback,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";

export type KeyboardMenuSection<T> = {
	id: string;
	label?: ReactNode;
	items: T[];
};

type UseKeyboardMenuControllerOptions<T> = {
	items: T[];
	getItemId: (item: T) => string;
	isItemDisabled?: (item: T) => boolean;
	isOpen?: boolean;
	preferredItemId?: string | null;
	onSelectItem?: (item: T) => void;
};

export type KeyboardMenuController<T> = {
	listId: string;
	activeItem: T | null;
	activeItemId: string | null;
	activeOptionId?: string;
	focusList: () => void;
	getOptionElement: (itemId: string) => HTMLDivElement | null;
	getOptionId: (itemId: string) => string;
	getOptionRef: (itemId: string) => (node: HTMLDivElement | null) => void;
	getOptionProps: (item: T) => Pick<
		HTMLAttributes<HTMLDivElement>,
		"onMouseMove"
	> & {
		"aria-disabled"?: true;
		"aria-selected": boolean;
		role: "option";
	};
	getListProps: (
		props?: HTMLAttributes<HTMLDivElement>,
	) => HTMLAttributes<HTMLDivElement> & {
		ref: (node: HTMLDivElement | null) => void;
		role: "listbox";
		tabIndex: number;
	};
	handleKeyDown: (event: ReactKeyboardEvent<HTMLElement>) => void;
	setActiveItemId: (itemId: string | null) => void;
};

type KeyboardMenuListProps<T> = {
	controller: KeyboardMenuController<T>;
	sections: KeyboardMenuSection<T>[];
	getItemId: (item: T) => string;
	isItemDisabled?: (item: T) => boolean;
	selectedItemId?: string | null;
	listLabel: string;
	className?: string;
	emptyState?: ReactNode;
	renderItem: (
		item: T,
		state: {
			isActive: boolean;
			isDisabled: boolean;
			isSelected: boolean;
			optionId: string;
		},
	) => ReactNode;
};

const moveIndex = (currentIndex: number, total: number, direction: -1 | 1) => {
	if (total === 0) {
		return -1;
	}

	if (currentIndex === -1) {
		return direction === 1 ? 0 : total - 1;
	}

	return (currentIndex + direction + total) % total;
};

export const useKeyboardMenuController = <T,>({
	items,
	getItemId,
	isItemDisabled,
	isOpen = true,
	preferredItemId = null,
	onSelectItem,
}: UseKeyboardMenuControllerOptions<T>): KeyboardMenuController<T> => {
	const rawListId = useId();
	const listId = `wb-keyboard-menu-${rawListId.replace(/:/gu, "")}`;
	const [activeItemId, setActiveItemId] = useState<string | null>(null);
	const itemNodesRef = useRef(new Map<string, HTMLDivElement | null>());
	const listNodeRef = useRef<HTMLDivElement | null>(null);
	const enabledItems = useMemo(
		() => items.filter((item) => !isItemDisabled?.(item)),
		[isItemDisabled, items],
	);
	const enabledItemIds = useMemo(
		() => enabledItems.map((item) => getItemId(item)),
		[enabledItems, getItemId],
	);
	const activeItem = useMemo(
		() => items.find((item) => getItemId(item) === activeItemId) ?? null,
		[activeItemId, getItemId, items],
	);

	useEffect(() => {
		if (!isOpen) {
			setActiveItemId(null);
			return;
		}

		setActiveItemId((currentItemId) => {
			if (currentItemId !== null && enabledItemIds.includes(currentItemId)) {
				return currentItemId;
			}

			if (
				preferredItemId !== null &&
				enabledItemIds.includes(preferredItemId)
			) {
				return preferredItemId;
			}

			return enabledItemIds[0] ?? null;
		});
	}, [enabledItemIds, isOpen, preferredItemId]);

	useEffect(() => {
		if (!activeItemId) {
			return;
		}

		itemNodesRef.current.get(activeItemId)?.scrollIntoView({
			block: "nearest",
		});
	}, [activeItemId]);

	const selectItem = useCallback(
		(item: T | null) => {
			if (!item || isItemDisabled?.(item)) {
				return;
			}

			onSelectItem?.(item);
		},
		[isItemDisabled, onSelectItem],
	);

	const handleKeyDown = useCallback(
		(event: ReactKeyboardEvent<HTMLElement>) => {
			if (!isOpen) {
				return;
			}

			switch (event.key) {
				case "ArrowDown": {
					event.preventDefault();

					setActiveItemId((currentItemId) => {
						const currentIndex = currentItemId
							? enabledItemIds.indexOf(currentItemId)
							: -1;
						const nextIndex = moveIndex(currentIndex, enabledItemIds.length, 1);

						return nextIndex === -1 ? null : enabledItemIds[nextIndex];
					});
					break;
				}
				case "ArrowUp": {
					event.preventDefault();

					setActiveItemId((currentItemId) => {
						const currentIndex = currentItemId
							? enabledItemIds.indexOf(currentItemId)
							: -1;
						const nextIndex = moveIndex(
							currentIndex,
							enabledItemIds.length,
							-1,
						);

						return nextIndex === -1 ? null : enabledItemIds[nextIndex];
					});
					break;
				}
				case "Home": {
					if (enabledItemIds.length === 0) {
						return;
					}

					event.preventDefault();
					setActiveItemId(enabledItemIds[0] ?? null);
					break;
				}
				case "End": {
					if (enabledItemIds.length === 0) {
						return;
					}

					event.preventDefault();
					setActiveItemId(enabledItemIds[enabledItemIds.length - 1] ?? null);
					break;
				}
				case "Enter": {
					if (!activeItem) {
						return;
					}

					event.preventDefault();
					selectItem(activeItem);
					break;
				}
				default:
					break;
			}
		},
		[activeItem, enabledItemIds, isOpen, selectItem],
	);

	return {
		listId,
		activeItem,
		activeItemId,
		activeOptionId: activeItemId
			? `${listId}-option-${activeItemId}`
			: undefined,
		focusList: () => listNodeRef.current?.focus(),
		getOptionElement: (itemId) => itemNodesRef.current.get(itemId) ?? null,
		getOptionId: (itemId) => `${listId}-option-${itemId}`,
		getOptionRef: (itemId) => (node) => {
			itemNodesRef.current.set(itemId, node);
		},
		getOptionProps: (item) => ({
			role: "option",
			"aria-selected": getItemId(item) === activeItemId,
			"aria-disabled": isItemDisabled?.(item) ? true : undefined,
			onMouseMove: () => {
				if (isItemDisabled?.(item)) {
					return;
				}

				setActiveItemId(getItemId(item));
			},
		}),
		getListProps: (props = {}) => ({
			...props,
			ref: (node) => {
				listNodeRef.current = node;
			},
			id: listId,
			role: "listbox",
			tabIndex: 0,
			"aria-activedescendant": activeItemId
				? `${listId}-option-${activeItemId}`
				: undefined,
			onKeyDown: (event) => {
				props.onKeyDown?.(event);

				if (!event.defaultPrevented) {
					handleKeyDown(event);
				}
			},
		}),
		handleKeyDown,
		setActiveItemId,
	};
};

export const KeyboardMenuList = <T,>({
	controller,
	sections,
	getItemId,
	isItemDisabled,
	selectedItemId = null,
	listLabel,
	className,
	emptyState,
	renderItem,
}: KeyboardMenuListProps<T>) => {
	const hasItems = sections.some((section) => section.items.length > 0);

	if (!hasItems) {
		return (
			<div
				{...controller.getListProps({
					"aria-label": listLabel,
					className,
				})}
			>
				{emptyState}
			</div>
		);
	}

	return (
		<div
			{...controller.getListProps({
				"aria-label": listLabel,
				className: clsx("outline-none", className),
			})}
		>
			{sections.map((section) => (
				<section key={section.id} className="space-y-2">
					{section.label ? (
						<div className="px-2 text-[11px] uppercase tracking-[0.28em] text-[color:var(--wb-builder-text-soft)]">
							{section.label}
						</div>
					) : null}
					<div className="space-y-1">
						{section.items.map((item) => {
							const itemId = getItemId(item);
							const optionId = controller.getOptionId(itemId);
							const isActive = controller.activeItemId === itemId;
							const isDisabled = isItemDisabled?.(item) === true;
							const isSelected = selectedItemId === itemId;

							return (
								<div
									key={itemId}
									ref={controller.getOptionRef(itemId)}
									id={optionId}
									data-keyboard-menu-item-id={itemId}
									{...controller.getOptionProps(item)}
								>
									{renderItem(item, {
										isActive,
										isDisabled,
										isSelected,
										optionId,
									})}
								</div>
							);
						})}
					</div>
				</section>
			))}
		</div>
	);
};
