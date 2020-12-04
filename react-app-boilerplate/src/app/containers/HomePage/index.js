import React, { useEffect } from 'react';
import { Table, Spin, Alert } from 'antd';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from '../../../utils/redux-injectors';
import { sliceKey, reducer, actions } from './slice';
import { thingsSaga } from './saga';
import {
	selectThings,
	selectCatalogs,
	selectLoading,
	selectSortBy,
	selectSortOrder,
	selectFilterBy,
	selectPage,
	selectTotal,
	selectLimit,
	selectError,
} from './selectors';

let filteredInfo = {};


export function HomePage() {
	useInjectReducer({ key: sliceKey, reducer: reducer });
	useInjectSaga({ key: sliceKey, saga: thingsSaga });

	const things = useSelector(selectThings);
	const catalogs = useSelector(selectCatalogs);
	const isLoading = useSelector(selectLoading);
	const sortBy = useSelector(selectSortBy);
	const sortOrder = useSelector(selectSortOrder);
	const filterBy = useSelector(selectFilterBy);
	const page = useSelector(selectPage);
	const limit = useSelector(selectLimit);
	const total = useSelector(selectTotal);
	const error = useSelector(selectError);

	const dispatch = useDispatch();

	const useEffectOnMount = (effect) => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
		useEffect(effect, []);
	};

	useEffectOnMount(() => {
		dispatch(actions.loadThings({}));
		dispatch(actions.loadCatalogs());
	});

	const handleChange = (pagination, filters, sorter) => {

		if (pagination.current !== page) {
			dispatch(actions.loadThings({ page: pagination.current }));
		}

		if (pagination.pageSize !== limit) {
			dispatch(actions.loadThings({ limit: pagination.pageSize }));
		}
		if (sorter.columnKey !== sortBy || sorter.order !== sortOrder) {
			dispatch(actions.loadThings({ sortBy: sorter.columnKey, sortOrder: sorter.order }));
		}
		if (sorter.columnKey === sortBy) {
			dispatch(actions.loadThings({ sortBy: sorter.columnKey, sortOrder: sortOrder === 'descend' ? 'ascend' : 'descend' }));
		}

		if (filters !== filterBy) {
			dispatch(actions.loadThings({ filterBy: filters }));
		}
	};

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			sorter: (a, b) => a.title - b.title,
			sortOrder: sortBy === 'title' && sortOrder,
			sortDirections: ['descend', 'ascend'],
			ellipsis: true,
		},
		{
			title: 'Company',
			dataIndex: 'company',
			key: 'company',
			sorter: (a, b) => a.company - b.company,
			sortOrder: sortBy === 'company' && sortOrder,
			ellipsis: true,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Catalog',
			dataIndex: 'catalog',
			key: 'catalog',
			filters: catalogs.map(value => { return { text: value, value } }),
			filteredValue: filteredInfo.catalog || null,
			onFilter: (value, record) => record.catalog === value,
			sorter: (a, b) => a.catalog - b.catalog,
			sortOrder: sortBy === 'catalog' && sortOrder,
			ellipsis: true,
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: 'Active',
			dataIndex: 'isActive',
			key: 'isActive',
			filters: [
				{ text: 'Active', value: 'TRUE' },
				{ text: 'In-Active', value: 'FALSE' },
			],
			filteredValue: filteredInfo.isActive || null,
			onFilter: (value, record) => record.isActive === value,
			sorter: (a, b) => a.isActive - b.isActive,
			sortOrder: sortBy === 'isActive' && sortOrder,
			sortDirections: ['descend', 'ascend'],
		},
	];


	return (
		<Spin spinning={isLoading}>
			<Wrapper>
				{error ? <Alert message={error} type="error" /> :
					<Table columns={columns} dataSource={things} pagination={{ total: total, current: page, pageSize: limit, }} onChange={handleChange} />
				}
			</Wrapper>
		</Spin>
	);
}

const Wrapper = styled.div``;