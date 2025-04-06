import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// __dirname workaround in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './src/index.ts',
  target: 'node',
  mode: 'development',
  devtool: 'source-map',
  performance: { hints: false },
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ }],
  },
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
