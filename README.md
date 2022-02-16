# SoundNimbus
## SoundCloud clone app using NodeJs, ExpressJS, HandlebarsJS

## Requirements
- Git (to clone this repo)
- [Node.js](https://nodejs.org/)
- [Nodemon](https://nodemon.io/)
- [Cloudinary Account](https://cloudinary.com/)

## Local development
Clone this repo.

Copy `sample.env` to `.env` and customize as needed with Cloudinary API Keys.

`npm install` to install server dependencies.

```bash
git clone https://github.com/helloprof/soundNimbus.git
cd soundNimbus
cp sample.env .env # edit this .env file with your Cloudinary API keys
npm install
nodemon server.js
```

SoundNimbus app will be available at http://localhost:8080