const fs = require('fs');

fs.copyFileSync('.env.sample', '.env');

fs.mkdirSync('mongo', { recursive: true });
