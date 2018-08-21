# angular6-mean-stack-sqlite3-backend

Rewrite MEAN Stack Backend service by Sqlite3

[Angular 6 \- MEAN Stack Crash Course \- Part 2: Implementing The Back\-end \- CodingTheSmartWay\.com](https://codingthesmartway.com/angular-6-mean-stack-crash-course-part-2-implementing-the-back-end/)

## Set up

Express

    mkdir -p backend/data
    cd backend
    npm init -y
    npm install --save-dev babel-cli babel-preset-env
    
.babelrc

    {
      "presets": ["env"]
    }
    
package.json

    ...
    "scripts": {
        "dev": "babel-watch server.js"
    }
    ...
    
npm

    npm install express
    npm install sqlite3
    npm install cors
    
server.js

    import express from 'express';

    const app = express();
    app.get('/', (req, res) => res.send('Hello World!'));
    app.listen(4000, () => console.log(`Express server running on port 4000`));
