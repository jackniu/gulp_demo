var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('scss', function () {
    gulp.src('sass/**/*.scss')        //要编译文件路径
        .pipe(sass({
            //sourceComments: true,
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('css'))    //编译完输出文件路径
        .pipe(browserSync.stream());
});
gulp.task('default',['scss'], function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('sass/**/*.scss',['scss']);  //监听文件修改，然后执行scss task
    gulp.watch("*.html").on('change', browserSync.reload);
});