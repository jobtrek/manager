FROM postgres:18.0-bookworm
USER postgres

COPY ./postgresql.conf /etc/postgresql/

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
