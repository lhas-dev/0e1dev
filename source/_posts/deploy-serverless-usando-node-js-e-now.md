---
title: 'Deploy Serverless: Usando Node.JS e Now'
date: 2018-11-01 17:53:26
tags: ['deploy', 'serverless', 'node', 'now']
cover: cover.jpg
---

*Photo by Denys Nevozhai on Unsplash*

Olá!

Você certamente já ouviu falar a expressão *"serverless"*. É um assunto em alta, principalmente no meio startupeiro.

Existe um **bom motivo** para este assunto ser tão relevante para desenvolvedores.

Este tipo de tecnologia (serverless) ajuda times focados em **alta produtividade e desenvolvimento ágil**, removendo a etapa de cuidar da infraestrutura (provisionando, escalando e gerenciando servidores).

Desta maneira, o time pode **focar 100% no produto**, sem precisar gastar recursos escassos (tempo e dinheiro) para cuidar de toda a operação da aplicação.

# Definição

Em resumo, serverless é um tipo de computação sem servidores. Você envia o código-fonte da sua aplicação, e o serviço serverless irá cuidar de todo o resto.

# Benefícios

Existem uma série de benefícios em trabalhar com este tipo de tecnologia. Podemos listar aqui:

- Não é necessário gerenciar servidores;
- Escalabilidade extremamente flexível;
- Altíssima disponibilidade;
- Tolerância a falhas (estouro de memória, timeout, etc);
- Pay as you go (pague somente o que utilizar).

Esses são os principais benefícios, mas existem muitos outros além destes. Definitivamente, é um tipo de tecnologia que veio para ficar. 

# Contras

Como nem tudo são flores, existem algumas desvantagens em utilizar serverless. Em algumas situações específicas, não vale a pena utilizar este tipo de serviço. Veja as principais desvantagens de se trabalhar com serverless:

**Não há persistência de nada.** Sua aplicação precisa ser stateless. Além disso, não há persistência de arquivos estáticos. Se você precisa permitir upload de arquivos, p.e., você deve persistir o upload deste arquivo para um serviço terceiro que cumpra esta função ([AWS S3](https://aws.amazon.com/pt/s3/), entre outros).

**O tempo de resposta da requisição pode ser um pouco longo.** A maneira como é estruturada a arquitetura deste tipo de serviço, faz com que quando uma aplicação não está sendo usada, ela é "desligada". A cada requisição que é feita para o endpoint, a aplicação é iniciada "do zero". Ou seja, se você está trabalhando com alguma plataforma que tenha um delay comum na inicialização, este delay pode somar no tempo de resposta das suas requisições.

**Os recursos físicos são limitados.** Ou seja, se sua aplicação necessita de um processamento alto para tarefas de alta performance, talvez o serverless não sirva para você. Estes limites são impostos para que a escalabilidade do serviço seja possível. Se estes limites fossem mais altos, certamente isto impactaria na escalonamento do serviço (além do preço, é claro). Ou seja, procure utilizar serverless para aplicações leves, como microserviços.

**Requisições longas não irão funcionar.** Existe um timeout padrão em serviços serverless. No AWS Lambda, é de até 300 segundos (5 mins) para uma requisição. 

A lista de contras acabou ficando longa, mas acredito que é importante você saber exatamente em quais situações não vale a pena investir neste tipo de tecnologia.

# Implementando na prática

Vamos usar uma aplicação de Express.JS de exemplo. Você pode [encontrá-la aqui](https://github.com/lhas2/node-serverless-sample).

Ela é muito simples, tem somente 2 endpoints: um GET e outro POST. Eles retornam apenas um texto.

Além disso, ela está dockerizada. Ou seja, eu já inclui um `Dockerfile` no projeto, contendo instruções para rodá-lo no ambiente do Docker.

No caso do [Now](https://zeit.co/now), você não precisa necessariamente usar o Docker. Caso seu projeto tenha um `package.json`, ele já irá subentender que esta é uma aplicação de NodeJS.

Eu quero utilizar o Docker aqui, para mostrar para vocês que o processo é muito simples. Caso você queira rodar em outra plataforma que não seja o NodeJS, a ideia é a mesma.

Além disto, com o projeto funcionando via Docker, nós podemos reutilizar este código para subi-lo em outros serviços posteriormente (AWS Lambda e Google Functions).

# Como instalar

Você não precisa instalar nada localmente no projeto. Esta instalação é somente a nível global:

```bash
npm install --global now
```

Agora, podemos rodar `now` dentro do nosso projeto:

```bash
cd node-serverless-sample/
now
```

# Usando em um projeto real

Se esta for sua primeira vez rodando este comando, você precisará fazer login (só precisa digitar seu e-mail). Após o login ser efetuado, as credenciais serão armazenadas em `~/.now`.

O [Now](https://zeit.co/now) irá detectar que há dois manifestos disponíveis no projeto: o `package.json` (ou seja, pode ser uma aplicação node) e o `Dockerfile` (ou seja, pode ser uma aplicação Docker). Você deverá selecionar quais dos dois manifestos você quer usar.

No nosso exemplo, será o Docker, então basta digitar 2, (ou rodar `now --docker`).

No início do build, o [Now](https://zeit.co/now) irá automaticamente enviar para seu clipboard (famoso ctrl+c/ctrl+v), o endpoint final.

Você irá observar que nosso `Dockerfile` expõe uma porta. O serviço do Now automaticamente faz o bind da porta exposta com a porta padrão.

Observação importante: Você só pode exportar uma porta por aplicação, no caso do [Now](https://zeit.co/now). Isto acontece pois o serviço de serverless é disponibilizado somente para uma porta.

# Checando se funcionou

Se você tiver seguido as etapas corretamente, o endereço que está no seu clipboard deverá retornar o seguinte: `01ev GET endpoint` ou `01ev POST endpoint`.

Você pode fazer esta checagem utilizando o seu browser ou serviços como [Insomnia](https://insomnia.rest/) e [Postman](https://www.getpostman.com/).

No nosso caso, o endpoint ficou: [https://sample-node-serverless-deploy-tzvsdepfwm.now.sh/](https://sample-node-serverless-deploy-tzvsdepfwm.now.sh/)

# Conclusão

Viu como é simples subir uma aplicação em ambiente serverless usando o [Now](https://zeit.co/now)?

Espero que tenha gostado. Certamente, está uma excelente tecnologia, especialmente para startups em fase de desenvolvimento, que não podem gastar tempo/dinheiro com infraestrutura. É um serviço bem barato, principalmente por que você só paga o que consome. Além de economizar muita dor de cabeça e mão de obra, é claro. :)

Nos próximos posts, iremos repetir o processo de deploy só que em outros serviços ([AWS Lambda](https://aws.amazon.com/pt/lambda/) e [Google Functions](https://cloud.google.com/functions/)). O processo é bem parecido, mas tem seus segredos. Fique ligado!