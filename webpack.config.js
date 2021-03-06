const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const environment = process.env.NODE_ENV || 'development';
const isProduction = environment === 'production';

const getEnvVariables = () => {
  const getPathToEnvFile = () => {
    const currentPath = path.join(__dirname);
    const productionPath = `${currentPath}/.env`;
    if (environment !== 'development') return productionPath;
    return `${productionPath}.${environment}`;
  };

  const envFilePath = getPathToEnvFile(environment);
  if (!fs.existsSync(envFilePath)) {
    return {};
  }
  const envVars = dotenv.config({ path: envFilePath }).parsed;
  return Object.keys(envVars).reduce(
    (acc, variable) => ({
      [`process.env.${variable}`]: JSON.stringify(envVars[variable]),
      ...acc,
    }),
    {},
  );
};

const rules = [
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: 'babel-loader',
  },
  {
    test: /\.css$/,
    loader: 'style-loader',
  },
  {
    test: /\.css$/,
    loader: 'css-loader',
    options: {
      modules: false,
    },
  },
  {
    test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
    loader: 'file-loader?name=[name].[ext]',
  },
];

module.exports = () => {
  return {
    mode: environment,
    entry: [`${__dirname}/src/index.jsx`],
    externals: {
      gon: 'gon',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: `${__dirname}/dist/public`,
      publicPath: '/assets/',
    },
    module: {
      rules,
    },
    plugins: [new webpack.DefinePlugin(getEnvVariables())],
    devtool: !isProduction ? 'inline-source-map' : false,
  };
};
