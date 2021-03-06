import app from './../application';

app.controller('HomeCtrl', ($scope, Users, Posts) => {
	$scope.usersPromise = Users.partialGet({limit: 5, offset: 0}).$promise.then((data) => {
		$scope.users = data;
	}).catch((err) => {
		console.error(err);
	});

	$scope.postsPromise = Posts.partialGet({limit: 5, offset: 0}).$promise.then((data) => {
		$scope.posts = data;
	}).catch((err) => {
		console.error(err);
	});

	$scope.postOptions = {
		limit: 5,
		orderKey: 'date_post',
		reverse: true
	};

	$scope.userOptions = {
		limit: 5,
		orderKey: 'user_create_date',
		reverse: true
	};
});