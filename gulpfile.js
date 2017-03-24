var gulp =require('gulp');
    nodemon =require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'app.js',
        ext: '.js',
        env: {
            PORT:5000
        },
        ignore: ['./node_modules/**']
    })
    .on('restarted', function(){
        console.log('Nodemon Restarted');
    });
});