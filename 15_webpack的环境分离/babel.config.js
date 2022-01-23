const presets = [
  '@babel/preset-env', //
  '@babel/preset-react',
];

const plugins = [];

// console.log(process.env.NODE_ENV);
const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  plugins.push(['react-refresh/babel']);
} else {
}

module.exports = {
  presets,
  plugins,
};
