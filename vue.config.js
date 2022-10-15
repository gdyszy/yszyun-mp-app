const ignored = ['**/uni_modules/**/*.md', '**/uni_modules/**/package.json','**/uni_modules/*/uniCloud/**/*']
process.env.UNI_CLOUD_PROVIDER = JSON.stringify([{
		provider: 'aliyun',
		spaceId: '93984bdd-80de-47ba-828c-47d2398d0594',
		clientSecret: 'cdrkAg/if49IINNwLZCjpA==',
		endpoint: 'https://api.bspapp.com'
	}])
module.exports = {
	configureWebpack() {
		return {
			watchOptions: {
				ignored
			},
			devServer: {
				watchOptions: {
					ignored
				}
			}
		}
	}
}
