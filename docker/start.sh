#!/bin/bash

# Cache the config at start time, to get the env var passed by compose
php artisan optimize
php artisan octane:frankenphp --caddyfile=Caddyfile