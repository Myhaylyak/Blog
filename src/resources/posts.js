import module from './module';

module.factory('Posts', ($resource, backEndUrl) => {
	return $resource(`${backEndUrl}/post/:id`, {
		id: '@id'
	}, {
		update: {
			method: 'PUT'
		},
		partialGet: {
			method: 'OPTIONS',
			isArray: true
		}
	});
});