const path = require('path');
const UnusedWebpackPlugin = require('unused-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: false,
    mode: 'development',
    devServer: {
        static: './dist'
    },
    plugins: [
        new UnusedWebpackPlugin({
            // Укажите директорию, в которой нужно искать неиспользуемые файлы
            directories: [path.join(__dirname, 'node_modules')],
            // Укажите шаблоны файлов, которые нужно проверять
            exclude: ['*.test.js', '*.spec.js'], // Пример исключения тестов
            // Укажите, какие файлы не должны учитываться
            fileTypes: ['js', 'css', 'scss'], // Пример файловых типов
        })
    ]
};
//npm run build