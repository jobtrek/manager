FROM postgres:17.6-bookworm
USER postgres

COPY ./postgresql.conf /etc/postgresql/

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
