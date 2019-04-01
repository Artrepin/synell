const gulp          = require('gulp')
const sass          = require('gulp-sass')
const autoprefixer	= require('gulp-autoprefixer')
// 	concat       = require('gulp-concat'),
// 	uglify       = require('gulp-uglifyjs'),
// 	replace 	 = require('gulp-replace'),
// 	autoprefixer = require('gulp-autoprefixer'),
// 	del     	 = require('del'), 
// 	fs 			 = require('fs'),
// 	imagemin     = require('gulp-imagemin'), 
// 	pngquant     = require('imagemin-pngquant'), 
// 	cssmin      = require('gulp-cssmin'), 
// 	cache        = require('gulp-cache'), 
// 	htmlmin 	 = require('gulp-htmlmin'),
// 	browserSync  = require('browser-sync').create();

// // Компилируем sass
// gulp.task('sass', function(){
// 	return gulp.src('src/sass/**/*.scss') 
// 		.pipe(sass())
// 		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true })) 
// 		.pipe(cssmin())
// 		.pipe(gulp.dest('src/css')) 
// 		.pipe(browserSync.stream());
		
// });

// // Очистить кэш
// gulp.task('clear', function (callback) {
// 	return cache.clearAll();
// })

// gulp.task('scripts', function() {
// 	return gulp.src([
		
// 			'src/libs/OwlCarousel2-2.3.4/dist/owl.carousel.min.js',
// 			'src/libs/in-view-master/dist/in-view.min.js'
			
// 		])
// 		.pipe(concat('libs.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('src/js')); 
// });
// // 'src/libs/Parallax/jkit.js',

// gulp.task('pxToVw', function(){
// 	gulp.src('src/sass/main.scss')
// 		.pipe(replace(/\d+(\.\d+)?px+/g, function(match) {

// 			var value = parseInt(match);
// 			var newRemValue = value / 10
// 			var newViewPortValue = 100 / (1920 / value); 

// 			return newRemValue + 'rem';

// 		}))
// 	.pipe(gulp.dest('src/sass/with_rem'));
// });

// // Обновление
// gulp.task('watch', ['scripts'], function() {
//     browserSync.init({
//         server: "src"
//     });

// 	gulp.watch('src/sass/**/*.scss', function(event, cb) {
// 		setTimeout(function(){gulp.start('sass');}, 1000) 
// 	}); 
// 	gulp.watch("src/**/*.html").on('change', browserSync.reload);
// });

// // Сжатие картинок
// gulp.task('img', function() {
// 	return gulp.src('src/img/**/*')
// 		.pipe(cache(imagemin({  
// 			interlaced: true,
// 			progressive: true,
// 			svgoPlugins: [{removeViewBox: false}],
// 			use: [pngquant()]
// 		})))
// 		.pipe(gulp.dest('dist/img'));
// });

// // Встраиваем стили и скрипты в документ, сжимаем html
// gulp.task('html-modern', function() {
// 	return gulp.src(['src/**/*.html', '!src/libs/**/*.html'])
// 	  .pipe(replace(/<link href="([^\.]+\.css)"[^>]*>/g , function(s,filename) {
// 	  		console.log("style: " + filename)
// 	      	var style = fs.readFileSync('src/'+filename, 'utf8').replace(/\.\.\//g,"");
// 	      	return '<style>\n' + style + '\n</style>';
// 	  }))

// 	  .pipe(replace(/<div data-file="([^\.]+\.xml)"[^>]*>/g , function(s,filename) {
// 	  		console.log("svg: " + filename)
// 	    	var style = fs.readFileSync('src/'+filename, 'utf8').replace(/\.\.\//g,"");
// 	    	return '<div class="svg-container" hidden>\n' + style + '\n</div>';
// 	  }))

// 	  .pipe(replace(/<script src="([^\.]+\.js)"[^>]*>/g, function(s, filename) {
// 	  		console.log("script: " + filename)
// 	      	var script = fs.readFileSync('src/'+filename, 'utf8').replace(/\.\.\//g,"");
// 	      	return '<script>\n' + script + '\n';
// 	  }))
// 	  .pipe(htmlmin({
//   		collapseWhitespace: true,
//   		minifyJS: true,
//   		minifyCSS: true,
//   		removeComments: true,
// 		ignoreCustomComments: [
// 			/^\s+dev/,
// 			/^\s+IE/,
// 			/\/endif\s+$/
// 		]	  	
// 	  }))
// 	  .pipe(gulp.dest('dist'));
// })

// // Очищаем 
// gulp.task('clean', function() {
// 	return del.sync('dist'); 
// });


// gulp.task('build', ['sass','clean','img','scripts','html-modern'], function () {

// 	var buildFont = gulp.src('src/fonts/**/*') 
// 	.pipe(gulp.dest('dist/fonts'))

// 	var buildMail = gulp.src('src/mail/**/*') 
// 	.pipe(gulp.dest('dist/mail'))

// 	var buildhtaccess = gulp.src('src/.htaccess') 
// 	.pipe(gulp.dest('dist/'))

// })
// gulp.task('default', ['watch']);











gulp.task('my_sass', function () {
	return gulp
			.src([
					'public/src/sass/**/*.scss'
			])
			.pipe(sass())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
			.pipe(gulp.dest('public/css'))
})

gulp.task('my_watch', () => {
	gulp.watch('public/src/sass/**/*.scss', gulp.series('my_sass'))
})