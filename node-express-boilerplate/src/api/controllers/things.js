import _ from 'lodash'

export async function things(req, res, next) {
    try {
        let thingsData = req.things;
        let limit = 10;
        let page = 0;
        let orderBy = 'createdAt';
        let sortOrder = 'asc'
        let filterBy = '';

        if (typeof req.query.limit !== 'undefined') {
            limit = req.query.limit;
        }

        if (typeof req.query.page !== 'undefined') {
            page = req.query.page;
        }

        if (typeof req.query.sortBy !== 'undefined') {
            orderBy = req.query.sortBy;
        }

        if (typeof req.query.filterBy !== 'undefined') {
            filterBy = JSON.parse(req.query.filterBy);

        }
        if (typeof req.query.sortOrder !== 'undefined') {
            sortOrder = req.query.sortOrder;
            sortOrder = sortOrder === 'ascend' ? 'asc' : 'desc'
        }

        if (!_.isEmpty(filterBy)) {
            if (!_.isEmpty(filterBy.isActive)) {
                thingsData = _.filter(thingsData, (data) => {
                    return filterBy.isActive.includes(data.isActive)
                })
            }
            if (!_.isEmpty(filterBy.catalog)) {
                thingsData = _.filter(thingsData, (data) => {
                    return filterBy.catalog.includes(data.catalog)
                })
            }
        }
        const result = _(thingsData)
            .orderBy([orderBy], [sortOrder]) // sort by ascending
            .drop((page - 1) * limit)   // page in drop function starts from 0
            .take(limit)                // limit 
            .value();

        return res.status(200).json({ things: result, total: req.things.length });
    } catch (error) {
        return res.status(500).json({ errors: { message: error.toString() } });
    }
}

export function catalogs(req, res, next) {
    try {
        const result = _.uniq(_.map(req.things, 'catalog'))
        return res.status(200).json({ catalogs: result });
    } catch (error) {
        return res.status(500).json({ errors: { message: error.toString() } });
    }
}