var gulp = require('gulp')
var webpack = require('gulp-webpack')
var uglify = require('gulp-uglifyjs')
var header = require('gulp-header')
var meta = require('./package.json')
var watch = require('gulp-watch')

var banner = ['/**',
	'* Yiu v${version}',
	'* (c) 2015 ${author}',
	'* Released under the ${license} License.',
	'*/',
	''
].join('\n')

var bannerVars = {
	version: meta.version,
	author: 'petitspois',
	license: 'MIT'
}

gulp.task('watch', function() {
	watch('src/**/*.js', function() {
		gulp.start('default')
	})
});

gulp.task('default', function() {
	return gulp.src('./src/yiu.js')
		.pipe(webpack({
			output: {
				library: 'Yiu',
				libraryTarget: 'umd',
				filename: 'yiu.js'
			}
		}))
		.pipe(header(banner, bannerVars))
		.pipe(gulp.dest('dist/'))
		.pipe(uglify('yiu.min.js', {
			mangle: true,
			compress: true
		}))
		.pipe(header(banner, bannerVars))
		.pipe(gulp.dest('dist/'))
});
