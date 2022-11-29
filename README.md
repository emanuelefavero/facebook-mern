# Facebook MERN

A Facebook clone built with the MERN stack.

_NOTE: This is a work in progress. I will be adding more features as I go along._

## Test the app locally on your machine

- Clone the repo and `cd` into the project directory
- Add a _.env_ file in the root directory with the following variables:

```dotenv
MONGO_URI='YOUR_MONGODB_URI'
SECRET='ANY_SECRET_KEY'
PORT=4000
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

NOTE: The server will also serve the build folder on [http://localhost:4000](http://localhost:4000) if you want to test the production build.

## Useful links

- [What is the MERN stack](https://www.mongodb.com/mern-stack)
