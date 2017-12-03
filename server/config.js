if (process.env.NODE_ENV === 'prod') {
  return;
}
require('dotenv').config({ path: '.env' });
