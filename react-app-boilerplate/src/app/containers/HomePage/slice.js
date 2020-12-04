import { createSlice } from '../../../utils/@reduxjs/toolkit'

export const initialState = {
	things: [],
	catalogs: [],
	total: 0,
	page: 1,
	limit: 10,
	sortBy: '',
	sortOrder: '',
	filterBy: {},
	loading: false,
	error: null,
};

const thingsSlice = createSlice({
	name: 'things',
	initialState,
	reducers: {
		loadThings(state, action) {
			state.loading = true;
			state.error = null;
			state.things = [];
			state.total = 0;
			state.sortBy = action.payload.sortBy || state.sortBy;
			state.sortOrder = action.payload.sortOrder || state.sortOrder;
			state.filterBy = action.payload.filterBy || state.filterBy;
			state.page = action.payload.page || state.page;
			state.limit = action.payload.limit || state.limit;
		},
		thingsLoaded(state, action) {
			const things = action.payload.things;
			state.total = action.payload.total;
			state.things = things;
			state.loading = false;
		},
		loadCatalogs(state) {
			state.loading = true;
			state.error = null;
			state.catalogs = [];
		},
		catalogsLoaded(state, action) {
			const catalogs = action.payload.catalogs;
			state.catalogs = catalogs;
			state.loading = false;
		},
		repoError(state, action) {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const { actions, reducer, name: sliceKey } = thingsSlice;
