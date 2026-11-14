FROM python:3.12-slim
WORKDIR /app
COPY server/requirements.txt server/requirements.txt
RUN pip install --no-cache-dir -r server/requirements.txt
COPY server server
COPY src/content src/content
ENV PYTHONUNBUFFERED=1
ENV LEARNABLE_HOST=0.0.0.0
EXPOSE 5050
CMD ["python", "server/app.py"]