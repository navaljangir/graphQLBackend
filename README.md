# GraphQL Backend

This is the backend service for the GraphQL API. The application is containerized with Docker and can be managed using Docker Compose.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup and Run

Follow these steps to build and run the application:

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <repository-name>
```

### Step 2: Add the `.env` File

Create a `.env` file in the root directory of the project. This file will store environment variables required by the application.

Example `.env` file:

```
DATABASE_URL="postgresql://postgres:yourdbPassword@db_container_name:5432/mydb?schema=public" //in our case it is postgresqll
PORT=8000
JWT_SECRET=youjwtsecrethere
POSTGRES_PASSWORD=yourdbPassword
```

Ensure that you update these values based on your setup.

### Step 3: Build the Docker Image

Build the Docker image using the following command:

```bash
docker build -t graphqlbackend .
```

### Step 4: Run the Application with Docker Compose

Start the services using Docker Compose:

```bash
docker-compose up
```

This command will start the GraphQL backend service.

### Step 5: Access the Application

Once the application is running, you can access the GraphQL API at:

```
http://localhost:8000
```

Replace `<PORT>` with the port defined in the `docker-compose.yml` file (default is usually `8000`).

## Files Included

### 1. `Dockerfile`

The `Dockerfile` contains instructions for building the Docker image for the GraphQL backend.

### 2. `docker-compose.yml`

The `docker-compose.yml` file is used to define and run the services for this application.

### 3. `.env`

The `.env` file is used to configure environment variables for the application. Ensure this file is present in the root directory before running the application.

## Stopping the Services

To stop the running containers, use:

```bash
docker-compose down
```

This will stop and remove the containers, networks, and volumes created by `docker-compose up`.

## Troubleshooting

- Ensure Docker and Docker Compose are installed and running on your system.
- Check for port conflicts if the application does not start.
- Use `docker-compose logs` to view the logs and debug issues.

## License

This project is licensed under the MIT License.