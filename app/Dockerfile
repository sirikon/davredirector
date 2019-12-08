FROM python:3.8-alpine
WORKDIR /app
RUN apk add --update --no-cache gcc musl-dev make && pip install poetry
ADD pyproject.toml .
RUN poetry install
ADD server.py .
CMD poetry run uvicorn --reload server:app
