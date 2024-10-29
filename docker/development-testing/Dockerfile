FROM consol/debian-xfce-vnc:v2.0.3

USER 0

# Instalar herramientas necesarias y sudo
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    curl \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Agregar llaves y repositorios para Google Chrome y Yarn
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" >> /etc/apt/sources.list.d/yarn.list

# Instalar software
RUN apt-get update && apt-get install -y --no-install-recommends \
    google-chrome-stable \
    gnupg \
    build-essential \
    libgtk2.0-0 \
    libgtk-3-0 \
    libgbm-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb \
    yarn \
    git \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

# Configuración de NVM y Node.js
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION lts/*
RUN mkdir -p $NVM_DIR \
    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && npm install -g cypress

ENV PATH $NVM_DIR/versions/node/$(nvm version)/bin:$PATH

# Copiar un acceso directo al escritorio
COPY docker/development-testing/config/Terminal.desktop /headless/Desktop/Terminal2.desktop
RUN chmod +x /headless/Desktop/Terminal2.desktop

# Ajustar permisos y agregar usuario no root con UID 1000
RUN useradd -m -u 1000 user && \
    echo "user:user" | chpasswd && \
    adduser user sudo && \
    echo 'user ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

# Cambio al usuario no root
# USER user

WORKDIR /app/code

EXPOSE 5901 22
