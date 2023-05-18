# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.0.4
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Simples Consultoria <comercial@plone.de>" \
      org.label-schema.name="plone.de-backend" \
      org.label-schema.description="Simples Consultoria backend image." \
      org.label-schema.vendor="Simples Consultoria"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN <<EOT
    ./bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    ./bin/mxdev -c mx.ini
    ./bin/pip install -r requirements-mxdev.txt
    chown -R plone: /app
EOT
