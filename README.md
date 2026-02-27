# Skeleton

The spine of my discord alternative... get it? haha

Anyways, this is just the backend of my discord alternative. I have no intention of making it ready for production. I will also not be making a fully developed front-end, but that will be in a separate repository.

Documentations of the APIs available will be made later on, but everything is in `/api` folder or in `main.js`. You could do some digging and figure it all out from those

**This is to not be used in production or anywhere remotely open, I made this for fun and it'll remain that way till it changes...**

## Dependencies
- [Git](https://git-scm.com/)
- [NodeJS](https://nodejs.org/en). Version 24+

There are two branches:

`main`
- Stable
- Working
- Happy

`dev`
- Bleeding edge
- Breaks whenever it wants to
- High cortisol

## Setup

In your terminal:
```
# Download the server
git clone https://github.com/ibnyazid/skeleton.git

# Navigate to project
cd skeleton

# Install all the necessary packages
npm install

# Create a file and name it .env and fill it with the details below, you can change them accordingly
PORT=3000
SECRET_KEY=make_it_secret

# Start server
npm run start
```

You should be able to access the server at http://localhost:3000/
(The port is dependent on what you set in the .env but 3000 is the default)

Please change the admin credentials in `config.json` unless you want me to snoop around in your server

Resources used:
- [Postman how to create a rest api guide](https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/)