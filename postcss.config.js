
//配置CSS兼容
module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: ['last 2 versions', 'Android >= 4.0']
        })
    ]
};