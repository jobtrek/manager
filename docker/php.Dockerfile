# Production image for the backend
#
# Builds the front assets and copy them to prod image
# Installs the backend and optimise files

FROM dunglas/frankenphp:1.7.0-php8.4.7 AS frankenphp_upstream

FROM node:24.3.0-slim AS front_base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM front_base AS front_deps
WORKDIR /app
COPY ./front/package.json ./
COPY ./front/pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

# We assumes the front repo is beside the back repo
FROM front_deps AS front_build
ARG PUBLIC_APP_URL
ENV PUBLIC_APP_URL=$PUBLIC_APP_URL
COPY ./front .
RUN pnpm build

FROM frankenphp_upstream AS frankenphp_base
WORKDIR /app

# Prepare some deps for php extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
	acl \
	file \
	gettext \
	git \
	&& rm -rf /var/lib/apt/lists/*

# Install php extensions for laravel
RUN set -eux; \
	install-php-extensions \
	@composer \
	apcu \
	intl \
	opcache \
	pcntl \
	memcached \
	exif \
	pdo_pgsql \
	zip \
	gd \
	redis \
	;


# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER=1

# copy production configuration for laravel
COPY ./docker/production_php_84.ini $PHP_INI_DIR/conf.d/

# Setup production base .ini
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Get composer dependencies
COPY ./back/composer.* ./
RUN composer install --no-cache --prefer-dist --no-autoloader --no-scripts --no-progress

# Final image
FROM frankenphp_base
WORKDIR /app

# Get the app source code
COPY ./back ./
# Copy front end
COPY --from=front_build /app/dist ./dist
# Copy caddy config
COPY ./docker/Caddyfile ./

# Prepare laravel folders
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache storage/framework/testing storage/logs bootstrap/cache
RUN chmod -R a+rw storage

# Start script
COPY ./docker/start.sh ./
RUN chmod +x start.sh

# Optimisations for prod setup
RUN composer dump-autoload --classmap-authoritative
RUN php artisan storage:link
#RUN php artisan optimize

ENTRYPOINT ["/app/start.sh"]
