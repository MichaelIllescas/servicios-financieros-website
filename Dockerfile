FROM php:8.2-cli

# Instalar unzip
RUN apt-get update && apt-get install -y unzip curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar archivos
COPY . /app

# Descargar PHPMailer directamente desde GitHub
RUN cd /tmp && \
    curl -L https://github.com/PHPMailer/PHPMailer/archive/refs/tags/v6.9.1.zip -o phpmailer.zip && \
    unzip phpmailer.zip && \
    mkdir -p /app/src/services/email/PHPMailer && \
    cp -r PHPMailer-6.9.1/src/* /app/src/services/email/PHPMailer/ && \
    rm -rf phpmailer.zip PHPMailer-6.9.1

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "/app/src/pages/api"]