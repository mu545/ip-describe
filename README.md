<h1 align="center">IP Describe</h1>

<p align="center">
  Web application to check the detail of information an IP address.
</p>

## Installing

- Clone the repo: `git clone https://github.com/mu545/ip-describe.git`
- Install [npm](https://www.npmjs.com) first if you don't have it in your machine

## Setup client
- Go to client directory `ip-describe/client`
- Run the `npm install` command to install client dependencies
- Set environment configuration
  - Copy file `env.default` to `env.local`
  - Set `VUE_APP_API_TARGET` with your URL will handling API request
  - Set `VUE_APP_MAP_API_KEY` with your google map API key, you can get API key with follow instruction section [Get the API key](https://developers.google.com/maps/documentation/javascript/get-api-key#get-the-api-key)
- Run the `npm run build` command to build client sources
- After build completed then change the extension of client sources view (all files with extension `.html`) in dist folder to `.ejs`
- Move all client sources view to folder views in `ip-describe/server`
- Move all files in dist folder to folder public in `ip-describe/server`

## Setup server
- Go to server directory `ip-describe/server`
- Run the `npm install` command to install server dependencies
- Set environment configuration
  - Copy file `env.default` to `.env`
  - Set `IPDATA_API_KEY` with your ipdata API key, you can get API key with register first on [ipdata](https://ipdata.co)
- Run `npm start` to start your server
- Now you can access your app ip describe