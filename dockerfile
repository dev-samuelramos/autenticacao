# Usa Node.js oficial
FROM node:20

# Define diretório de trabalho
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta definida no .env
EXPOSE 5000

# Comando para rodar o servidor
CMD ["node", "server.js"]

