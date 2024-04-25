module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          ios: '8',
          chrome: '48',
        },
        useBuiltIns: 'usage', // 按需引入
        debug: true, // 日志
        corejs: '3.37.0',
      },
    ],
  ],
}
