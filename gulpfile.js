const gulp          = require('gulp')
const sass          = require('gulp-sass')
const autoprefixer	= require('gulp-autoprefixer')

const cleanCSS      = require('gulp-clean-css')
const concat        = require('gulp-concat')

const minify_js     = require('gulp-minify')
const del           = require('del')

const rev           = require('gulp-rev')

const revCollector  = require('gulp-rev-collector')

const gutil         = require('gulp-util')
const rimraf        = require('rimraf')
const revOutdated   = require('gulp-rev-outdated')
const path          = require('path')
const through       = require('through2')


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







function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('css_min', (done) => {
    gulp
        .src([
			'public/css/preloader.css',
			'public/css/font.css',
			'public/libs/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css',
			'public/css/main.css',
        ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/build/'))
        .on('end', done)
})

gulp.task('js_min', (done) => {
    gulp
        .src([
            'public/src/js/libs.js',
			'public/src/js/main.js',
			'public/src/js/modal.js',
			'public/src/js/form.js',
			'public/src/js/products.js',
			'public/libs/send/send.js',
        ],{
            allowEmpty: true 
        })
        .pipe(concat('app.js'))
        .pipe(minify_js({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('public/build/'))
        .on('end', () => {
            del.sync([
                'public/build/app.js',
            ], done());
        })
})

gulp.task('rev', (done) => {
    gulp.src(['public/build/app.min.css', 'public/build/app.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('public/build/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/manifest/'))
        .on('end', done)
})

gulp.task('rev_collector', (done) => {
    gulp.src(['public/manifest/**/*.json', 'views/layouts/main.pug'])
        .pipe( revCollector({
            replaceReved: true
        }))
        .pipe( gulp.dest('views/layouts/') )
        .on('end', done)
})

gulp.task('rev_clean', function(done) {
    return gulp.src( ['public/build/*.*'], {read: false})
        .pipe( revOutdated(1) )
        .pipe( cleaner() )
        .on('end', done)
});

gulp.task('production', gulp.series(
    'js_min',
    'css_min',
    'rev',
    'rev_collector',
    'rev_clean',
))




gulp.task('sass', function () {
	return gulp
			.src([
					'public/src/sass/**/*.scss'
			])
			.pipe(sass())
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], { cascade: true }))
			.pipe(gulp.dest('public/css'))
})

gulp.task('watch', () => {
	gulp.watch('public/src/sass/**/*.scss', gulp.series('sass'))
})