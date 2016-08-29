var Q = require('q');
var $ = require('jquery');
var env = require('../../../env.js');

function findData (member_id,node_id,nPage) {
 	return Q.Promise((success, error)=>{	 
	  $.ajax({
	    url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.findnode',
	    data: {
	    	'member_id': member_id,
	    	'node_id':node_id,
	    	'nPage':nPage,
	    	'platform': 'android'
	    },
	    type: 'get',
	    success: function (data) {
	      var resData = JSON.parse(data);
	        success(resData)      
	    },
	    error: function(xhr){
            error('请求失败')
        }
	  })
	});
}
function addFind(member_id,accesstoken,blog_id,fav_type) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.findfav',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'blog_id': blog_id,
				'fav_type': fav_type
			},
			type:'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function nodeFind() {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.nodelist',
			data: {
				
			},
			type:'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function blogInfo(blog_id, member_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.blog_info',
			data: {
				'blog_id': blog_id,
				'member_id': member_id
			},
			type:'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function addComment(member_id, accesstoken, blog_id, comment, for_comment_id, to_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.comment',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'blog_id': blog_id,
				'comment': comment,
				'for_comment_id': for_comment_id,
				'to_id': to_id
			},
			type:'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function commentList(blog_id, n_page) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.comment_list',
			data: {
				'blog_id': blog_id,
				'n_page': n_page
			},
			type:'get',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
function findPraise(member_id, accesstoken, blog_id) {
	return Q.Promise((success, error)=>{
		$.ajax({
			url: env.config.BASE_HOST + 'appapi?method=mobileapi2.find.praise',
			data: {
				'member_id': member_id,
				'accesstoken': accesstoken,
				'blog_id': blog_id
			},
			type:'post',
			success: function(data) {
				success(JSON.parse(data));
			},
			error: function(xhr) {
				error('请求失败');
			}
		})
	});
}
exports.findData = findData;
exports.addFind = addFind;
exports.nodeFind = nodeFind;
exports.blogInfo = blogInfo;
exports.addComment = addComment;
exports.commentList = commentList;
exports.findPraise = findPraise;