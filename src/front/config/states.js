import app from './../application';

import homeTpl from './../../themes/templates/home.tpl.jade';
import signUpTpl from './../../themes/templates/sign/signup.tpl.jade';
import signInTpl from './../../themes/templates/sign/signin.tpl.jade';
import accountTpl from './../../themes/templates/account/account.tpl.jade';
import postTpl from './../../themes/templates/posts/post.tpl.jade';
import postViewTpl from './../../themes/templates/posts/post.view.tpl.jade';
import postsTpl from './../../themes/templates/posts/posts.tpl.jade';
import postEditTpl from './../../themes/templates/posts/post.edit.tpl.jade';
import appTpl from './../../themes/templates/application.tpl.jade';
import mapTpl from './../../themes/templates/map.tpl.jade';
import usersTpl from './../../themes/templates/users.tpl.jade';
import accountSettTpl from './../../themes/templates/account/account.sett.tpl.jade';
import accountHomeTpl from './../../themes/templates/account/account.home.tpl.jade';

app.config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('root', {
			url: '/',
			controller: 'MainCtrl',
			template: appTpl,
			abstract: true
		})
		.state('root.home', {
			url: '',
			controller: 'HomeCtrl',
			template: homeTpl
		})
		.state('root.signUp', {
			url: 'signUp',
			controller: 'SignUpCtrl',
			template: signUpTpl,
			data: {
				permissions: {
					except: ['AUTHORIZED'],
					redirectTo: 'root.home'
				}
			}
		})
		.state('root.signIn', {
			url: 'signIn',
			controller: 'SignInCtrl',
			template: signInTpl,
			data: {
				permissions: {
					except: ['AUTHORIZED'],
					redirectTo: 'root.home'
				}
			}
		})
		.state('root.users', {
			url: 'users',
			controller: 'UsersCtrl',
			template: usersTpl
		})
		.state('root.posts', {
			url: 'posts',
			controller: 'PostsCtrl',
			template: postsTpl
		})
		.state('root.account', {
			url: 'account/:id',
			controller: 'AccountCtrl',
			template: accountTpl,
			abstract: true,
			data: {
				permissions: {
					only: ['AUTHORIZED'],
					redirectTo: 'root.signIn'
				}
			}
		})
		.state('root.account.home', {
			url: '',
			controller: 'AccountHomeCtrl',
			template: accountHomeTpl
		})
		.state('root.account.settings', {
			url: '/settings',
			controller: 'AccountSettCtrl',
			template: accountSettTpl,
			data: {
				permissions: {
					only: ['canEditAccount'],
					redirectTo: 'root.home'
				}
			}
		})
		.state('root.post', {
			url: 'post/:id',
			template: postTpl,
			abstract: true
		})
		.state('root.post.view', {
			url: '',
			controller: 'PostViewCtrl',
			template: postViewTpl
		})
		.state('root.post.edit', {
			url: '/edit',
			controller: 'PostEditCtrl',
			template: postEditTpl,
			data: {
				permissions: {
					only: ['canEditPost'],
					redirectTo: '^.view'
				}
			}
		})
		.state('root.map', {
			url: 'map',
			controller: 'MapCtrl',
			template: mapTpl
		})
});