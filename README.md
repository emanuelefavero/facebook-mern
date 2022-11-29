# Facebook MERN

A Facebook clone built with the MERN stack.

## Live Demo (Render)

[https://facebook-mern.onrender.com/](https://facebook-mern.onrender.com/)

## Test the app locally on your machine

- Clone the repo and `cd` into the project directory
- Add a _.env_ file in the root directory with the following variables:

```dotenv
MONGO_URI='YOUR_MONGODB_URI'
SECRET='ANY_SECRET_KEY'
PORT=4000
NODE_ENV='development'
```

- RUN SERVER:

```bash
npm install
npm start
```

- RUN CLIENT (open a new terminal window):

```bash
cd client
npm install
npm start
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

NOTE: The server will also serve the build folder on [http://localhost:4000](http://localhost:4000) if you set the `NODE_ENV` variable to `production`.

## Useful links

- [What is the MERN stack](https://www.mongodb.com/mern-stack)
