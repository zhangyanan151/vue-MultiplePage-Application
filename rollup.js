var rollup = require( 'rollup' );

rollup.rollup({
  entry: 'client/wap_ttmama/main.js'
}).then( function ( bundle ) {
  bundle.write({
    // 模块格式 - 'amd', 'cjs', 'es6', 'iife', 'umd'
    format: 'cjs',
    dest: 'bundle.js'
  });
});