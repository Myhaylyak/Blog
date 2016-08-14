import app from './../application';


app.controller('CommentCtrl', ($scope, Comments) => {
	$scope.editStatus = 'view';

	$scope.editToggle = (value) => {
		return $scope.editStatus = $scope.editStatus === 'view' ? 'edit' : 'view';
	};

	$scope.editCommentData = {
		title: $scope.comment.name_comment,
		text: $scope.comment.text_comment
	};

	$scope.editComment = (data, status) => {
		if(status) {
			Comments.update({id: data.id}, {
				comment_name: data.title,
				comment_text: data.text
			}).$promise.then((data) => {
				$scope.comment = {
					comment_name: data.comment_name,
					comment_text: data.comment_text
				}
				$scope.editStatus = 'view';
			}).catch((err) => {
				console.error(err);
			});
		}
	};
});