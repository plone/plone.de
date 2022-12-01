ARG PLONE_VERSION=6.0.0b2
FROM plone/plone-backend:${PLONE_VERSION}

LABEL maintainer="Jonas Piterek <piterek@kitconcept.com>" \
      org.label-schema.name="plonede-backend" \
      org.label-schema.description="Plonede backend image." \
      org.label-schema.vendor="Jonas Piterek"

# Add local code
COPY . .

# Install local requirements and fix permissions
RUN ./bin/pip install -r requirements.txt \
    && chown -R plone: /app
