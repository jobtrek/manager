# Manager App

An experimentation with Tanstack Router + Query and React and SPA authentication with Laravel.

## Dev

```sh
# In the back folder
cp .env.example .env # Copy then prepare your .env
# Install dependencies with docker composer image
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php84-composer:latest \
    composer install --ignore-platform-reqs

# Start sail containers
sail up -d
sail artisan key:generate
sail artisan migrate --seed

# In the front folder
pnpm i
pnpm dev
```

You can access the app on [localhost:3000](localhost:3000)

## Production

Take time to correctly configure a root `.env` from the example template. Follow comments.
```sh
# Todo app key
# First, build all the production containers
docker compose -f compose.prod.yml build
# Lauch the containers
docker compose -f compose.prod.yml up -d

# Todo : migrations, downtime
```

## Todo

- Use postgrest to access the api and laravel to generate JWT token for the api. Find a way to use the roles of postgresql with laravel, to get an isomorphic auth system