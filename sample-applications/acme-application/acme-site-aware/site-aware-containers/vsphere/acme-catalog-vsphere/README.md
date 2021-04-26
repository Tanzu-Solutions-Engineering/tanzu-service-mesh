# Catalog

[![gcr.io](https://img.shields.io/badge/gcr.io-stable-green?style=flat-square)](https://console.cloud.google.com/gcr/images/vmwarecloudadvocacy/GLOBAL/amceshop-catalog@sha256:de12574a7e9d62fe9e3f466a6687d78428f50c5143b49b7485947101858c2ae3/details?tab=info)

> A catalog service, because what is a shop without a catalog to show off our awesome red pants?

The Catalog service is part of the [ACME Fitness Shop](https://github.com/vmwarecloudadvocacy/acme_fitness_demo). The goal of this specific service is to register and serve the catalog of items sold by the shop.

## Prerequisites

There are different dependencies based on whether you want to run a built container, or build a new one.

### Build

* [Go (at least Go 1.12)](https://golang.org/dl/)
* [Docker](https://www.docker.com/docker-community)

### Run

* [Docker](https://www.docker.com/docker-community)
* [MongoDB](https://hub.docker.com/r/bitnami/mongodb)

## Installation

### Docker

Use this command to pull the latest tagged version of the shipping service:

```bash
docker pull gcr.io/vmwarecloudadvocacy/amceshop-catalog:stable
```

To build a docker container, run `docker build . -t vmwarecloudadvocacy/acmeshop-catalog:<tag>`.

The images are tagged with:

* `<Major>.<Minor>.<Bug>`, for example `1.1.0`
* `stable`: denotes the currently recommended image appropriate for most situations
* `latest`: denotes the most recently pushed image. It may not be appropriate for all use cases

### Source

To build the app as a stand-alone executable, run `go build`.

## Usage

The **catalog** service, either running inside a Docker container or as a stand-alone app, relies on the below environment variables:

* **CATALOG_HOST**: The IP of the catalog app to listen on (like `0.0.0.0`)
* **CATALOG_PORT**: The port number for the user service to listen on (like `8082`)
* **CATALOG_VERSION**: The version of the app, which determines the CSS served in the front end (like `v1`, must start with the letter _v_)
* **CATALOG_DB_USERNAME**: The username to connect to the MongoDB database
* **CATALOG_DB_PASSWORD**: The password to connect to the MongoDB database
* **CATALOG_DB_HOST**: The host or IP on which MongoDB is active
* **USERS_HOST**: The host or IP on which the auth/user service is active
* **USERS_PORT**: The port number on which the auth/user service listens to.
* **JAEGER_AGENT_HOST**: The host for Jaeger agent - Use this only if you want tracing enabled
* **JAEGER_AGENT_PORT**: The port for Jaeger agent - Use this only if you want tracing enabled

The Docker image is based on the Bitnami MiniDeb container. Use this commands to run the latest stable version of the payment service with all available parameters:

```bash
# Run the MongoDB container
docker run -d -p 27017:27017 --name mgo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -e MONGO_INITDB_DATABASE=acmefit gcr.io/vmwarecloudadvocacy/acmeshop-catalog-db

# Run the user service
docker run -d -e CATALOG_HOST=0.0.0.0 -e CATALOG_PORT=8082 -e CATALOG_VERSION=v1 -e CATALOG_DB_USERNAME=mongoadmin -e CATALOG_DB_PASSWORD=secret -e CATALOG_DB_HOST=0.0.0.0 -e USERS_HOST=0.0.0.0 -e USERS_PORT=8083 -p 8082:8082 gcr.io/vmwarecloudadvocacy/acmeshop-catalog:stable
```

## API

### HTTP

#### `GET /products`

Returns a list of all catalog items

```bash
curl --request GET \
  --url http://localhost:8082/products
```

```json
{
    "data": [
    {
      "id": "5c61f497e5fdadefe84ff9b9",
      "name": "Yoga Mat",
      "shortDescription": "Limited Edition Mat",
      "description": "Limited edition yoga mat",
      "imageUrl1": "/static/images/yogamat_square.jpg",
      "imageUrl2": "/static/images/yogamat_thumb2.jpg",
      "imageUrl3": "/static/images/yogamat_thumb3.jpg",
      "price": 62.5,
      "tags": [
          "mat"
      ]
    },
    {
      "id": "5c61f497e5fdadefe84ff9ba",
      "name": "Water Bottle",
      "shortDescription": "Best water bottle ever",
      "description": "For all those athletes out there, a perfect bottle to enrich you",
      "imageUrl1": "/static/images/bottle_square.jpg",
      "imageUrl2": "/static/images/bottle_thumb2.jpg",
      "imageUrl3": "/static/images/bottle_thumb3.jpg",
      "price": 34.99,
      "tags": [
          "bottle"
          ]
    }
    ]}
```

#### `POST /product`

Create a new product item

```bash
curl --request POST \
  --url http://localhost:8082/products \
  --header 'content-type: application/json' \
  --header 'Authorization: Bearer <TOKEN>' \
  --data '         {
            "name": "Tracker",
            "shortDescription": "Limited Edition Tracker",
            "description": "Limited edition Tracker with longer description",
            "imageurl1": "/static/images/tracker_square.jpg",
            "imageurl2": "/static/images/tracker_thumb2.jpg",
            "imageurl3": "/static/images/tracker_thumb3.jpg",
            "price": 149.99,
            "tags": [
                "tracker"
             ]

          }'
```

The call to this service needs a valid product object

```json
{
    "name": "Tracker",
    "shortDescription": "Limited Edition Tracker",
    "description": "Limited edition Tracker with longer description",
    "imageurl1": "/static/images/tracker_square.jpg",
    "imageurl2": "/static/images/tracker_thumb2.jpg",
    "imageurl3": "/static/images/tracker_thumb3.jpg",
    "price": 149.99,
    "tags": [
        "tracker"
    ]
}
```

When the product is created successfully, an HTTP/201 message is returned

```json
{
    "message": "Product created successfully!",
    "resourceId": {
        "id": "5c61f8f81d41c8e94ecaf25f",
        "name": "Tracker",
        "shortDescription": "Limited Edition Tracker",
        "description": "Limited edition Tracker with longer description",
        "imageUrl1": "/static/images/tracker_square.jpg",
        "imageUrl2": "/static/images/tracker_thumb2.jpg",
        "imageUrl3": "/static/images/tracker_thumb3.jpg",
        "price": 149.99,
        "tags": [
            "tracker"
        ]
    },
    "status": 201
}
```

#### `GET /products/:id`

Returns details about a specific product id

```bash
curl --request GET \
  --url http://localhost:8082/products/5c61f497e5fdadefe84ff9b9
```

```json
{
    "data": {
        "id": "5c61f497e5fdadefe84ff9b9",
        "name": "Yoga Mat",
        "shortDescription": "Limited Edition Mat",
        "description": "Limited edition yoga mat",
        "imageUrl1": "/static/images/yogamat_square.jpg",
        "imageUrl2": "/static/images/yogamat_square.jpg",
        "imageUrl3": "/static/images/bottle_square.jpg",
        "price": 62.5,
        "tags": [
            "mat"
        ]
    },
    "status": 200
}
```

#### `GET /static/images/:imageName`

Retrieve specific image
  
#### `GET /liveness`

The liveness operation returns the current status and version of the server

```bash
curl --request GET \
  --url http://localhost:8082/liveness
```

```json
{
    "data": {
        "version": "v1",
        "servicename": "catalog",
    },
    "status": 200
}
```

## Contributing

[Pull requests](https://github.com/vmwarecloudadvocacy/catalogsvc/pulls) are welcome. For major changes, please open [an issue](https://github.com/vmwarecloudadvocacy/catalogsvc/issues) first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

See the [LICENSE](./LICENSE) file in the repository
