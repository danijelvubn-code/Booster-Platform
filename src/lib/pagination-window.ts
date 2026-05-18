/**
 * Shared pagination math for list UIs so "Showing X–Y of Z" stays in sync with slicing.
 */
export type PaginationWindow = {
	totalItems: number
	page: number
	pageSize: number
	totalPages: number
	safePage: number
	/** 0-based inclusive start index for the current page */
	startIndex: number
	/** 0-based exclusive end index (suitable for `slice(start, end)`) */
	endIndexExclusive: number
	/** 1-based first item number on this page (0 when there are no items) */
	displayRangeStart: number
	/** 1-based last item number on this page (0 when there are no items) */
	displayRangeEnd: number
}

export function getPaginationWindow(
	totalItems: number,
	page: number,
	pageSize: number,
): PaginationWindow {
	const safePageSize = Math.max(1, pageSize)
	const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize))
	const safePage = Math.min(page, totalPages)
	const startIndex = (safePage - 1) * safePageSize
	const endIndexExclusive = Math.min(startIndex + safePageSize, totalItems)
	const displayRangeStart = totalItems > 0 ? startIndex + 1 : 0
	const displayRangeEnd = totalItems > 0 ? endIndexExclusive : 0
	return {
		totalItems,
		page,
		pageSize: safePageSize,
		totalPages,
		safePage,
		startIndex,
		endIndexExclusive,
		displayRangeStart,
		displayRangeEnd,
	}
}
