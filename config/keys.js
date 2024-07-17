let keys;
import prod from './prod.js';
import dev from './dev.js';

if (process.env.NODE_ENV === 'production') {
  console.log('hello');
  keys = prod;
} else if (process.env.NODE_ENV === 'ci') {
  console.log('helloww');
  // keys = require('./ci')
} else {
  console.log('hellow');
  keys = dev;
}

export default keys;
