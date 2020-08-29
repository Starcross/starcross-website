FROM python:3.8-slim

RUN apt update
RUN apt install -y git

WORKDIR /starcross

COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt

COPY . .

