const env_file = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env';
require('dotenv').config({path: env_file})
