const appData = require("./data.json")
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

module.exports = {
	lintOnSave: false,
	devServer: {
		before(app) {
			app.get("/api/seller", function(req, res) {
				res.json({
					errno: 0,
					data: seller,
				})
			})
			app.get("/api/goods", function(req, res) {
				res.json({
					errno: 0,
					data: goods,
				})
			})
			app.get("/api/ratings", function(req, res) {
				res.json({
					errno: 0,
					data: ratings,
				})
			})
		},
    },
    chainWebpack(config) {
        config.resolve
            .extensions
                .add("vue")
                .add("js")
                .add("ts")
                
    }
}
