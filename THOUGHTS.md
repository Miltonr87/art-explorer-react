# THOUGHTS.md

## Decisões Técnicas

Este projeto foi desenvolvido com foco em escalabilidade e qualidade de código. Abaixo estão algumas decisões durante a implementação:

### Limite de Requisições à API

A API pública do Met Museum não oferece suporte a paginação via backend. Isso exigiu a implementação de um controle de requisições no frontend, já que o fluxo padrão da API segue esta lógica:

1. Busca com retorno de todos `objectIDs` em uma única pesquisa geral.
2. Para cada `objectID`, uma nova requisição individual é feita para obter detalhes da obra.

Esse modelo tende a sobrecarregar o serviço em buscas mais extensas, vindo a causar lentidão ou até bloqueios por **CORS** após um número elevado de chamadas consecutivas consideradas pelo servidor. Como solução, foi adotado um limite reduzido do proposto pelo teste, que seria paginação com 15 obras por página, garantindo maior estabilidade.

---

## Inconsistências da API

Apesar de utilizar o endpoint:

```
GET /public/collection/v1/search?hasImages=true&q=painting
```

A API ainda assim retorna algumas obras **sem imagem associadas**, o que causa falhas visuais e que gerou a necessidade de substituição por um placeholder.

Além disso, o endpoint de busca, presenta comportamentos inconsistentes:

```
GET /public/collection/v1/search?artistOrCulture=true&q=van+gogh
```

- Funciona bem com termos com famosos pintores como `"Van Gogh"` (retornando todas as obras referentes a ele).
- Porém, falha ao buscar outros menos conhecidos como`"Charles"`, retornando obras aleatórias que não correspondem ao artista pesquisado.

Essas inconsistências geram a necessidade de criar um fallback de dados para que a interface não fique sem informação caso aconteça com alguma dessas buscas.

---

## Stack e Configurações Modernas

Para garantir padronização e segurança no desenvolvimento, o projeto inclui configurado:

- **ESLint** e **Prettier** para formatação e linting.
- **Jest** para testes unitários e de integração (com +70% de cobertura).
- **SonarQube** executado localmente para análise de cobertura e qualidade de código, já configurado para fácil integração com um servidor remoto caso necessário.

## Simplificação de Estado

Para evitar complexidade desnecessária com o uso de Redux (já que não há necessidade de middlewares nas requisições ou manipulação avançada de estado) optou-se pelo **Context API** para acelerar a entrega:

- Armazenana obras buscadas.
- Gerencia favoritos escolhidos no **Session Storage**.

---
