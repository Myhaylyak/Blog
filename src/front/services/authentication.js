import app from './../application';


app.factory('AuthService', ($rootScope, $http, backEndUrl, domainUrl) => {
	return {
		login(credentials) {
			return $http.post(`${domainUrl}/authorization`, credentials)
				.then((data) => {
					$rootScope.authUser = data;
					localStorage.setItem('apiKey', data.apiKey);

					return data;
				})
				.catch((err) => {
					console.error(err);
				});
		},
		logout(id) {
			$http.get(`${backEndUrl}/user_out/${user.id}`)
				.then((data) => {
					console.log('Success logout');
					localStorage.removeItem('apiKey');
					$rootScope.authUser = null;
				})
				.catch((err) => {
					console.error('Logout error: ', err);
				});
		},
		isAuthenticated() {
			return !!$rootScope.authUser;
		},
		isAuthorized(authorizedRoles) {
			if(!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (this.isAuthenticated() && authorizedRoles.indexOf($rootScope.authUser.user_role) !== -1);
		}
	}
});