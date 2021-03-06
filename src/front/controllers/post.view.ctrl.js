import app from './../application';


app.controller('PostViewCtrl', ($scope, Posts, Comments, $stateParams, $state) => {
	$scope.postsPromise = Posts.get({id: $stateParams.id}).$promise.then((data) => {
		$scope.post = data;
		console.log('Post', data);
	}).catch((err) => {
		console.error(err);
	});

	$scope.deletePost = (id) => {
		Posts.delete({id: id}).$promise.then((data) => {
			$state.go('root.home');
		}).catch((err) => {
			console.error('Delete post', err);
		});
	};

	$scope.$on('commentDelete', (e, deleted) => {
		$scope.post.comment.splice($scope.post.comment.findIndex((comment) => comment.id === deleted.id), 1);
	});

	$scope.postComment = (data) => {

		$scope.commentPromise = Comments.save({
			post_for_comment: $scope.post.id,
			comment_name: data.title,
			comment_text: data.text
		}).$promise.then((comment) => {
			$scope.post.comment.push(comment);
			$scope.comment = {};
			$scope.writeComment.$setPristine();
		}).catch((err) => {
			console.error('Create comment', err);
		});
	};
});