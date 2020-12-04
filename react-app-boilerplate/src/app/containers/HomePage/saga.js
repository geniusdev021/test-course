import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from '../../../utils/request';
import { selectPage, selectLimit, selectSortBy, selectSortOrder, selectFilterBy } from './selectors';
import { actions } from './slice';


export function* getThings() {
	yield delay(500);
	const page = yield select(selectPage);
	const limit = yield select(selectLimit);
	const sortBy = yield select(selectSortBy);
	const sortOrder = yield select(selectSortOrder);
	const filterBy = yield select(selectFilterBy);

	const requestURL = `/api/things?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterBy=${JSON.stringify(filterBy)}`;

	try {
		// Call our request helper (see 'utils/request')
		const things = yield call(request, requestURL);
		yield put(actions.thingsLoaded(things));

	} catch (err) {
		yield put(actions.repoError(err.response));
	}
}

export function* getCatalogs() {
	yield delay(500);
	const requestURL = `/api/catalogs`;

	try {
		// Call our request helper (see 'utils/request')
		const catalogs = yield call(request, requestURL);
		yield put(actions.catalogsLoaded(catalogs));

	} catch (err) {
		yield put(actions.repoError(err.response));
	}
}

/**
 * Root saga manages watcher lifecycle
 */
export function* thingsSaga() {
	// Watches for loadRepos actions and calls getRepos when one comes in.
	// By using `takeLatest` only the result of the latest API call is applied.
	// It returns task descriptor (just like fork) so we can continue execution
	// It will be cancelled automatically on component unmount
	yield takeLatest(actions.loadThings.type, getThings);
	yield takeLatest(actions.loadCatalogs.type, getCatalogs);
}
