const webpack = require('webpack'); // webpack module을 불러옴

module.exports = {
  entry: './src/index.js', // 시작 위치
  output: { // bundle된 하나의 파일을 /public/bundle.js라는 이름으로 저장
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },
  devServer: { // 개발 서버 설정
    hot: true, // 파일 수정할 때마다 reloading
    inline: true, // hot reloading에 필요한 webpack dev server 클라이언트를 bundle에 같이 넣어줌
    host: '0.0.0.0', // server를 listen할 주소. 기본 값은 localhost
    port: 4000, // 개발 서버 port
    contentBase: __dirname + '/public/', // index 파일의 위치
  },
  module: { // loader를 이용해 JSX, CSS, SASS 등을 일반 자바스크립트 형식으로 변환
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: [
              [
                "@babel/preset-env", // ES5 문법을 변환
                { targets: { browsers: "last 2 versions" } },
              ],
              "@babel/preset-react", // React 코드를 변환
            ],
            plugins: ["react-hot-loader/babel"],
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};