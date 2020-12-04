import { createSelector } from '@reduxjs/toolkit';

import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state) => state.things || initialState;

export const selectThings = createSelector(
	[selectDomain],
	thingsState => thingsState.things,
);

export const selectCatalogs = createSelector(
	[selectDomain],
	thingsState => thingsState.catalogs,
);

export const selectSortBy = createSelector(
	[selectDomain],
	thingsState => thingsState.sortBy,
);

export const selectSortOrder = createSelector(
	[selectDomain],
	thingsState => thingsState.sortOrder,
);

export const selectFilterBy = createSelector(
	[selectDomain],
	thingsState => thingsState.filterBy,
);

export const selectPage = createSelector(
	[selectDomain],
	thingsState => thingsState.page,
);

export const selectLimit = createSelector(
	[selectDomain],
	thingsState => thingsState.limit,
);

export const selectTotal = createSelector(
	[selectDomain],
	thingsState => thingsState.total,
);

export const selectLoading = createSelector(
	[selectDomain],
	thingsState => thingsState.loading,
);

export const selectError = createSelector(
	[selectDomain],
	thingsState => thingsState.error,
);
