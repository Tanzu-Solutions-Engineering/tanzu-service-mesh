# Shopping Service

[![gcr.io](https://img.shields.io/badge/gcr.io-stable-green?style=flat-square)](https://console.cloud.google.com/gcr/images/vmwarecloudadvocacy/GLOBAL/acmeshop-front-end@sha256:50407894d66065e846819f2d0060bce8fab8be433cbcf973d7dce2f27eeb2390/details?tab=info)

> A front-end service, because how can you shop without seeing?

The Front-End service is part of the [ACME Fitness Shop](https://github.com/vmwarecloudadvocacy/acme_fitness_demo). The goal of this specific service is to serve as the front-end that presents the content.

## Prerequisites

There are different dependencies based on whether you want to run a built container, or build a new one.

### Build

* [Docker](https://www.docker.com/docker-community)
* [Node.js (v10)](https://nodejs.org/en/), _DO NOT USE ANY VERSION which is not LTS_

If you're running on Ubuntu (or the docker image you're building runs on Ubuntu), you can install Node using the distributions from NodeSource. This is the recommended installation:

```bash
curl -sL https://deb.nodesource.com/setup_<version>.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Run

* [Docker](https://www.docker.com/docker-community)
* Web browser: Tested on the latest versions of Chrome and Safari (use developer tools in your browser to look at console logs for client side)

## Installation

### Docker

Use this command to pull the latest tagged version of the shipping service:

```bash
docker pull gcr.io/vmwarecloudadvocacy/acmeshop-front-end:stable
```

To build a docker container, run `docker build . -t vmwarecloudadvocacy/acmeshop-front-end:<tag>`.

The images are tagged with:

* `<Major>.<Minor>.<Bug>`, for example `1.1.0`
* `stable`: denotes the currently recommended image appropriate for most situations
* `latest`: denotes the most recently pushed image. It may not be appropriate for all use cases

### Source

To build the app as a stand-alone executable, run `npm install`. This will download all the latest dependencies from NPM.

## Usage

The **front-end** service, either running inside a Docker container or as a stand-alone app, relies on the below environment variables:

* **PORT**: The port number for the front-end to listen on (defaults to `3000`)
* **USERS_HOST**: The hostname of the user service
* **CATALOG_HOST**: The hostname of the catalog service
* **CART_HOST**: The hostname of the cart service
* **ORDER_HOST**: The hostname of the order service
* **USERS_PORT**: The portnumber to connect to the user service
* **CATALOG_PORT**: The portnumber to connect to the catalog service
* **CART_PORT**: The portnumber to connect to the cart service
* **ORDER_PORT**: The portnumber to connect to the order service
* **JAEGER_AGENT_HOST**: The host for Jaeger agent - Use this only if tracing is enabled
* **JAEGER_AGENT_PORT**: The port for Jaeger agent - Use this only if tracing is enabled

The Docker image is based on the Bitnami Node.js container. Use this commands to run the latest stable version of the payment service with all available parameters:

```bash
docker run -d -e PORT=8080 -e USERS_HOST=localhost -e CATALOG_HOST=localhost -e CART_HOST=localhost -e ORDER_HOST=localhost -e USERS_PORT=8081 -e CATALOG_PORT=8082 -e CART_PORT=5000 -e ORDER_PORT=6000 -e JAEGER_AGENT_HOST=localhost -e JAEGER_AGENT_PORT=6832 -p 8080:8080 gcr.io/vmwarecloudadvocacy/acmeshop-front-end:stable
```

## Code Structure

### app.js

* To be used only for NodeJs server configuration and adding mount points
* When integrating with new services, remember to add a mount point here.
* DO NOT modify the packages and configuration already added

### public/

* Contains all the html file
* every html file has a <script> tag under which the AJAX scripts are added
* follow the index.html for some of the naming conventions. Especially for the Top navigation bar and the footer
* make changes as necessary for your service (like redirecting to another page, loading a different html etc)

### public/js/client.js

* Contains all the js functions for handling certain front end actions

### services/{service_name}

* Add index.js file here for every service that frontend needs to interact with
* currently services/users/index.js has sample code for making call to another backend service
* requests library is being used to handle the calls to other services
* Refer to API doc or contact the author of the service for which the calls are being made to make changes as necessary

### package.json

* contains list of packages
* if using any new package, use the command `npm install package_name --save` this will update the json

## Available users

There are four pre-created users loaded into the database:

| User   | Password   |
|--------|------------|
| eric   | `vmware1!` |
| dwight | `vmware1!` |
| han    | `vmware1!` |
| phoebe | `vmware1!` |

* You MUST login as one of the users mentioned above to access all the pages in the application
* The current user service will set a cookie ```logged_in``` in the browser. This cookie contains the User ID returned from the user service
* The service uses JWT and sets 2 cookies - ```logged_in``` and ```refresh_token```

## API

All the calls from other services will work directly with the Front-End Service

## Additional Resources

Some additional light reading material :smile:

* https://github.com/request/request
* https://stackoverflow.com/questions/26721994/return-json-body-in-request-nodejs?rq=1

## Contributing

[Pull requests](https://github.com/vmwarecloudadvocacy/front_end/pulls) are welcome. For major changes, please open [an issue](https://github.com/vmwarecloudadvocacy/front_end/issues) first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

See the [LICENSE](./LICENSE) file in the repository
