---
title: 'Patterns com React: Container Components'
date: 2018-09-30 17:14:00
tags: ['patterns', 'react', 'container']
cover: cover.jpg
---

*Photo by Frank McKenna on Unsplash*

# Introdução

Em uma típica aplicação front-end, após você construir uma série de componentes referente ao visual (interface), você irá precisar integrar estes componentes com dados reais.

Para fazer esta integração com dados reais, vamos precisar montar requisições assíncronas, manipular as respostas da requisições, organizar as props que nossos componentes irão receber, entre outros.

A melhor maneira de construir essa "camada de dados", é montando ela separada da camada visual dos componentes.

Fazendo esta separação, nós iremos categorizar nossos componentes em 2 tipos: burros e inteligentes.

**Componente burro (dummy):** Também conhecido como como *"presentational component"*, é o nosso componente mais simples, que recebe props, as renderiza e/ou as manipula, além de aplicar a estilização, é claro;
**Componente inteligente (container/smart):** É o componente que faz estas ações assíncronas (como requisições a API). Este componente irá sempre corresponder a um componente burro. Ou seja, para termos um componente inteligente, necessariamente precisamos ter um componente burro por trás para ser renderizado.

# O que são "container components"?

Os *"container components"* nada mais são do que nossos componentes inteligentes.

# Como usar esta técnica?

Vamos para um exemplo prático. Criemos um componente chamado `Dashboard`:

```js
const Dashboard = ({ products }) => (
    <div>
        <h1>Produtos</h1>
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    <p>{product.name}</p>
                    <p>{product.created_at}</p>
                </li>
            ))}
        </ul>
    </div>
);
```

Como podemos ver acima, este componente simplesmente renderiza a lista de produtos, que ele irá receber via a prop `products`. Este é o nosso componente dummy. Ele recebe uma prop e somente manipula ela.

Agora, vamos fazer a parte inteligente desta `Dashboard`, que no caso seria nossa `DashboardContainer`.

Ela irá fazer a requisição para a API e irá armazenar a resposta no estado do componente:

```js
import axios from 'axios'; // usaremos o axios para simular a requisição

class DashboardContainer extends React.Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const request = await axios.get('/api/products'); // vamos usar async/await para facilitar o entendimento

        this.setState({
            products: request.data
        });
    }

    render() {
        const { products } = this.state;

        return (
            <Dashboard products={products} />
        )
    }
}
```

Este nosso container também poderia fazer uma conexão com a store do Redux e enviar informações da store para o nosso componente dummy. Exemplo:

```js
import { connect } from 'redux';

class DashboardContainer extends React.Component {
    // ...
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
});

export default connect(mapStateToProps)(DashboardContainer);
```

No exemplo acima, estaríamos enviando uma prop chamada `currentUser` que poderia conter os dados do usuário logado na aplicação.

# Por que usar?

Como você pode ver o nosso exemplo acima, esta pattern irá permitir uma separação de conceitos dos nossos componentes. De um lado teremos a camada de renderização da interface e do outro teremos camada de integração dos dados.

Em times grandes, isto irá facilitar o trabalho de quem somente mexe com a parte da interface de quem mexe com a parte de integração com a API, p.e.

Além disso, esta arquitetura ajuda o desenvolvimento dos testes unitários. Os testes referente a interface irão pertencer ao componente dummy, assim como os testes referente a integração de dados irão pertencer ao nosso container.

# Dica

Esta pattern é fundamental, especialmente para projetos de médio/grande porte. Ter a aplicação isolada em camadas ajuda bastante na escalabilidade do projeto, tanto verticalmente (com mais componentes sendo feitos) quanto horizontalmente (com mais membros no time).

# Conclusão

Este é o tipo de pattern que difere projetos amadores de projetos profissionais em React. **Aplicar esta pattern em um teste de contratação certamente irá diferenciá-lo da concorrência.**

