
var env_1 = require('../../env');
function test(req, res) {
	    res.render('test',{
	      server_html:"",
	      server_data: ''
	    })

}
function login(req, res) {
	    res.render('login',{
	      server_html:"",
	      server_data: '',
	      title:'登录'
	    })

}
function signup(req, res) {
	    res.render('signup',{
	      server_html:"",
	      server_data: '',
	      title:'注册'
	    })

}
function cart(req, res) {
	    res.render('cart',{
	      server_html:"",
	      server_data: '',
	      title:'购物车'
	    })

}
function product_details(req, res) {
	    res.render('product_details',{
	      server_html:"",
	      server_data: '',
	      title:'商品详情页'
	    })

}
function product_list(req, res) {
	    res.render('product_list',{
	      server_html:"",
	      server_data: '',
	      title:'商品列表'
	    })

}
function classify(req, res) {
	    res.render('classify',{
	      server_html:"",
	      server_data: '',
	      title:'商品分类'
	    })

}
function find(req, res) {
	    res.render('find',{
	      server_html:"",
	      server_data: '',
	      title:'发现'
	    })

}
function user(req, res) {
	    res.render('user',{
	      server_html:"",
	      server_data: '',
	      title:'用户中心'
	    })
}
function checkout(req, res) {
	res.render('checkout',{
		server_html:"",
	    server_data: ''
	})
}
function order(req, res) {
	res.render('order',{
		server_html:"",
	    server_data: '',
	    title:'订单'
	})
}
function order_details(req, res) {
	res.render('order_details',{
		server_html:"",
	    server_data: '',
	    title:'订单详情'
	})
}
function pay(req, res) {
	res.render('pay',{
		server_html:"",
	    server_data: '',
	    title:'订单支付'
	})
}
function openim(req, res) {
	var productName = req.query.productName;
	var productUrl = req.query.productUrl;
	res.render('openim',{
		server_html: "",
	    server_data: '',
	    title:'客服中心',
	    productName: productName,
	    productUrl: productUrl
	})
}
//错误URL请求处理
function allcallback(req, res) {
	 res.redirect('/');
}

exports.test = test;
exports.login = login;
exports.cart = cart;
exports.product_details = product_details;
exports.product_list = product_list;
exports.classify = classify;
exports.find = find;
exports.user = user;
exports.checkout = checkout;
exports.signup = signup;
exports.allcallback = allcallback;
exports.order = order;
exports.order_details = order_details;
exports.pay = pay;
exports.openim = openim;

