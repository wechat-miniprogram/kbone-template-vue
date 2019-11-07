module.exports = {
	"origin": "https://test.miniprogram.com",
	"entry": "/",
	"router": {
		"home": [
			{
				"regexp": "^(?:\\/(home|index))?(?:\\/)?$",
				"options": "i"
			},
			{
				"regexp": "^\\/index\\.html(?:\\/)?$",
				"options": "i"
			},
			{
				"regexp": "^\\/test\\/(home|index)(?:\\/)?$",
				"options": "i"
			}
		],
		"other": [
			{
				"regexp": "^\\/test\\/list\\/([^\\/]+?)(?:\\/)?$",
				"options": "i"
			},
			{
				"regexp": "^\\/test\\/detail\\/([^\\/]+?)(?:\\/)?$",
				"options": "i"
			}
		]
	},
	"runtime": {
		"subpackagesMap": {},
		"tabBarMap": {}
	},
	"pages": {
		"home": {
			"share": true,
			"windowScroll": false,
			"backgroundColor": "#F7F7F7"
		},
		"other": {
			"share": true,
			"windowScroll": false,
			"backgroundColor": "#F7F7F7"
		}
	},
	"redirect": {
		"notFound": "home",
		"accessDenied": "home"
	},
	"optimization": {}
}