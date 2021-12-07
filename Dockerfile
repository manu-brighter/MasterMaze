FROM php:apache-bullseye

RUN apt-get update \
    && apt-get upgrade

EXPOSE 80
CMD ["apache2-foreground"]