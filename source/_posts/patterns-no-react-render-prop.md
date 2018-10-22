---
title: 'Patterns com React: Render Props'
date: 2018-09-10 12:40:41
tags:
cover: cover.jpg
---

*Photo by Johannes Plenio on Unsplash*

# Introdução

Quando temos um problema e este repete-se diversas vezes, é instintivo procurar por uma solução reutilizável.

Uma das soluções reutilizáveis mais comuns no universo React são as *render props*.

# O que são "render props"?

Um componente que utiliza a técnica de *Render props*, irá receber uma prop que deverá ser uma função. Esta função deverá retornar o que o componente irá renderizar.

Você também pode declarar esta função diretamente como `children` do componente, ao invés de declarar 1 prop só para isto.

A única diferença será a maneira como você vai utilizá-la:

```js
this.props.render();
// ou
this.props.children();
```

# Por que usar?

A principal utilidade de uma render prop é ser uma espécie de *"fornecedor"*, oferecendo argumentos como parâmetro para a função declarada. Estes argumentos podem ser: alguma variável do estado ou até mesmo uma função do componente. Por exemplo:


```js
this.props.render({
    currentPage: this.state.currentPage, // enviando informação do estado
    redirectTo: this.redirectTo, // enviando função
});
```

Desta maneira, você consegue fazer uma injeção de dependências dentro do componente pai.

Além da flexibilidade em relação ao que o componente deve renderizar, você pode usufruir de alguma informação do componente pai sem nenhum esforço.

Esta flexibilidade toda **aumenta as possibilidades de uso deste componente**.

# Como usar esta técnica?

Imagine que vamos criar um componente que retorne as dimensões da tela e do componente filho. Vamos chamá-lo de `SizeTracker`:

```js
class SizeTracker extends React.Component {
    state = {
        window: {
            width: 0,
            height: 0,
        },
        element: {
            width: 0.
            height: 0,
        },
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
        const node = ReactDOM.findDOMNode(this);

        if (node.getBoundingClientRect) {
            this.setState({
                window: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                },
                element: {
                    width: node.getBoundingClientRect().width,
                    height: node.getBoundingClientRect().height,
                },
            });
        }
    }

    render() {
        return this.props.render({
            sizes: this.state,
        });
    }
}
```

Agora, vamos aplicá-lo em um componente de `Banner`. Este componente irá receber tanto o tamanho da janela do browser quanto do elemento do banner.

```js
const Banner = () => (
    <SizeTracker
        render={
            ({ sizes }) => (
                <div>
                    Tamanho da janela: {sizes.window.width} x {sizes.window.height}
                </div>
            )
        }
    />);
```

Muito simples, né? :-)

# Dica

Apesar do nome da técnica, você pode utilizar o nome que quiser na prop.

# Conclusão

Esta é uma técnica muito simples porém eficaz em muitas situações cotidianas de um desenvolvedor React.

Além de agregar flexibilidade para o seu componente, esta solução é uma excelente alternativa para os *High Order Components* (HOCs). A sintaxe é mais curta e objetiva. Você também pode transformá-la em um HOC, se necessário.
