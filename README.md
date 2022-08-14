# S.O.L.I.D - Princípios S e I

## O que vamos aprender?

Você quer escrever um código mais limpo? Fácil de identificar as responsabilidades de cada função ou classe? Então chegou a hora de aprender os princípios **S.O.L.I.D** e as boas práticas no desenvolvimento e assim poder construir códigos mais concisos e com uma melhor legibilidade e testabilidade.



## Você será capaz de:

- Escrever classes ou funções de responsabilidade única;
- Escrever classes ou funções que não dependem de métodos que não utilizam;
- Escrever classes ou funções mais legíveis.


## Porque isso é importante?

Você, como desenvolvedor, muitas das vezes terá que escrever códigos para que outras pessoas possam ler, entender, fazer a manutenção ou até testar. Escrever códigos mais legíveis, com funções e classes que seguem padrões e tenham responsabilidades muito bem definidas será importante para que outro desenvolvedor possa continuar o que você estava fazendo.
Qualidade de código é um fator importante na hora de criar sua aplicação, portanto a utilização do princípio SOLID deixa claro para quem lê seu código, que você está preocupado com a qualidade do que faz a longo prazo.



# Conteúdos:

## Os princípios SOLID

No desenvolvimento de software, SOLID é um acrônimo para cinco princípios de projeto, destinados a tornar os projetos orientados a objetos mais legíveis, concisos e de fácil manutenção. Os princípios são um subconjunto de muitos princípios sendo eles:

- O **S***ingle-responsibility principle*: esse princípio coloca que uma classe ou função só deve possuir uma única responsabilidade.

- O **O***pen-closed principle*: entidades de software devem ser abertas para extensão, mas fechadas para modificação.

 - O **L***iskov substitution principle*: esse princípio simplesmente exige que cada classe derivada seja substituível por sua classe pai.

- O **I***nterface segregation principle*: os clientes não devem ser forçados a implementar interfaces que não usam.

- O **D***ependency inversion principle*: simplificando, o princípio da inversão de dependência significa que os desenvolvedores devem “depender de abstrações, não de concreções”.



Vale ressaltar que são princípios, a utilização não é obrigatória, mas saiba que você verá tais princípios no dia a dia em sua carreira como desenvolvedor e entendê-los será vital na melhoria do seu código. Beleza, agora vamos entrar um pouco mais a fundo e colocar a mão na massa.



## Single-responsibility principle


Imagine que você trabalhe numa loja que só tem você, e aí terá que atender os clientes, vender os produtos, garantir a limpeza e organização da loja, verificar as disponibilidade dos produtos no estoque, fazer reposição dos mesmos, fazer a contabilidade e a parte jurídica da loja. Muita coisa né, vai ser difícil fazer tudo isso com qualidade. Com o código é a mesma coisa.

O princípio da responsabilidade única é um princípio relativamente básico, ele pode ser aplicado a classes, componentes de software e microsserviços, onde a função ou classe deve ser criada com apenas um propósito. Assim será fácil identificar a utilidade de uma função e também será mais simples para testar.

**Que tal ver isso na prática?**

Em uma nova pasta, inicie uma aplicação utilizando o comando npm init -y.

Agora, configure os scripts de teste e linter no arquivo package.json (se a tag scripts já existir, basta substituir os valores pelos descritos abaixo):

"scripts": {
    "lint": "eslint  -c .eslintrc.json src/**/*.[t,j]s"
  },

Coloque as dependências que vamos utilizar em desenvolvimento no arquivo package.json:

"devDependencies": {
    "typescript": "4.4.2",
    "ts-node": "10.2.1",
    "eslint": "7.32.0",
    "eslint-config-trybe-backend": "1.0.4",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-mocha": "10.0.4",
    "eslint-plugin-sonarjs": "0.13.0",
    "@typescript-eslint/eslint-plugin": "4.30.0",
    "@typescript-eslint/parser": "4.30.0",
    "@types/node": "17.0.35",
  },

Instale as dependências com o comando npm i

Crie o arquivo de configuração do TypeScript com o comando npx tsc --init

Adicione um arquivo .eslintrc.json na raiz do projeto com o seguinte conteúdo:


{
    "root": true,
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "trybe-backend"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "ignorePatterns": ["tests/", "node_modules/"],
    "env": { "es2021": true },
    "plugins": ["@typescript-eslint"],
    "rules": {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }]
    }
}



Crie a pasta src, para nossos exemplos. Crie um arquivo index.ts na pasta src;

Vamos transformar o exemplo da loja citado anteriormente em uma função typeScript e entender na prática como uma função cheia de responsabilidade por ser muito prejudicial ao código. 

Coloque esse código no index.ts

function manageStore() {
 const totalProducts = () => 100;
 const openStore = () => true;
 const salesProducts = () => 'Iphone, xbox';
 const handlePayment = (payment: string) => {
   if (payment === 'money') {
     return 'the product price is 20';
   }
   if (payment === 'card') {
     return 'the product price is 23';
   }
   if (payment === 'pix') {
     return 'the product price is 20';
   }
 };
 const customers = ['Tony', 'Bruce', 'Nick', 'Peter', 'Stephen', 'Steven']
 const listCustomers = (arr: string[]) => arr.forEach((customer) => console.log(customer));
 
 console.log(handlePayment('pix'));
 console.log(salesProducts());
 console.log(openStore());
 console.log(totalProducts());
 return listCustomers(customers);
}
 
const totalProducts = () => 100;
 
const store = manageStore();
 
console.log(store);
 

Rode o código utilizando o comando npx ts-node src. Rode o linter utilizando o comando npm run lint.

O TypeScript nem vai conseguir executar a função e vai apresentar diversos erros. Em seguida, no eslint terá ainda mais erros para corrigir. Perceba que a função manegeStore, possui diversas responsabilidades para executar e diversos retornos diferentes, ficando confuso fazer a tipagem e na hora de testar ficará bem imprevisível.

Então vamos aplicar o Single-responsibility principle, dividir a função em pequenas outras funções com responsabilidades únicas. 

Copie o código a seguir cole no index.ts

 function totalProducts():number {
   return 100;
 }
 
 function openStore():boolean {
   return true;
 }
 
 function salesProducts():string {
   return 'Iphone, xbox';
 }
 
 function handlePayment(payment: string):string {
   if (payment === 'money') {
     return 'the product price is 20';
   }
   if (payment === 'card') {
     return 'the product price is 23';
   }
   if (payment === 'pix') {
     return 'the product price is 20';
   }
   return 'payment not made';
 }
 
 const customers = ['Tony', 'Bruce', 'Nick', 'Peter', 'Stephen', 'Steven'];
 
 function listCustomers(arr: string[]):void {
   return arr.forEach((customer) => console.log(customer));
 }
 
 console.log(handlePayment('pix'));
 console.log(salesProducts());
 console.log(openStore());
 console.log(totalProducts());
 console.log(listCustomers(customers));


Perceba como ficou fácil entender a responsabilidade de cada função e seus retornos. Esse é o Single-responsibility principle. 

Agora vamos seguir em frente, pois temos mais para aprender!

Interface segregation principle


O Princípio de Segregação de Interface, diz que uma classe não deve ser forçada a implementar interfaces e métodos que não irá utilizar. O melhor seria criar pequenas interfaces específicas e evitar criar grandes interfaces genéricas que fazem tudo. Colocando na prática, pense na espécie de animais as aves, o pica-pau e a avestruz são aves, o pica-pau pode voar e andar, enquanto a avestruz apenas pode andar, apesar de serem da mesma espécie, a avestruz não deve ser obrigada a voar. Seguindo essa ideia, as classes que você deve poder optar por usarem ou não tais métodos da interface ou criar pequenas interfaces específicas evitando as genéricas.

Vamos colocar a situação das aves na prática, transformando o exemplo anterior em interface e classes. Bora lá!


Em uma nova pasta, inicie uma aplicação utilizando o comando npm init -y;

Configure os scripts de teste e linter no arquivo package.json (se a tag scripts já existir, basta substituir os valores pelos descritos abaixo):

"scripts": {
    "lint": "eslint  -c .eslintrc.json src/**/*.[t,j]s"
  },

Coloque as dependências que vamos utilizar em desenvolvimento no arquivo package.json:

"devDependencies": {
    "typescript": "4.4.2",
    "ts-node": "10.2.1",
    "eslint": "7.32.0",
    "eslint-config-trybe-backend": "1.0.4",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-mocha": "10.0.4",
    "eslint-plugin-sonarjs": "0.13.0",
    "@typescript-eslint/eslint-plugin": "4.30.0",
    "@typescript-eslint/parser": "4.30.0",
    "@types/node": "17.0.35",
  },

Instale as dependências com o comando npm i

Crie o arquivo de configuração do TypeScript com o comando npx tsc --init

Adicione um arquivo .eslintrc.json na raiz do projeto, com o seguinte conteúdo:


{
   "root": true,
   "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "trybe-backend"
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
       "ecmaVersion": 12,
       "sourceType": "module"
   },
   "settings": {
       "import/resolver": {
         "node": {
           "extensions": [".js", ".jsx", ".ts", ".tsx"]
         }
       }
     },
   "ignorePatterns": ["tests/", "node_modules/"],
   "env": { "es2021": true },
   "plugins": ["@typescript-eslint"],
   "rules": {
       "no-unused-vars": "off",
       "@typescript-eslint/no-unused-vars": ["error"],
       "no-shadow": "off",
       "@typescript-eslint/no-shadow": "error",
       "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
       "import/extensions": [
         "error",
         "ignorePackages",
         {
           "js": "never",
           "jsx": "never",
           "ts": "never",
           "tsx": "never"
         }
      ]
   }
}



Crie a pasta src, para nossos exemplos. Crie um arquivo index.ts na pasta src;

Na pasta src crie o diretório interfaces, IBirds.ts, copie e coloque nesse arquivo:
export interface IBirds {
 fly?: string;
 bite?:string;
}

Essa é uma das milhares formas de deixar a interface de modo que quando você for aplicar em seu código os retornos podem ser um ou outro, de acordo com as necessidades, assim não será obrigado o retorno das duas chaves.

Coloque esse código no index.ts

import { IBirds } from './interfaces/IBirds';
 
function woodpecker():IBirds {
 const fly = 'yes fly';
const bite = 'yes bite;
 return { fly, bite };
}
 
function ostrich(): IBirds {
 const bite = 'yes bite, no fly';
 return { bite };
}
 
console.log(ostrich());
console.log(woodpecker());
 


Dessa forma, percebe que na função woodpecker possui os dois retornos que foram tipados na interface IBirds e na segunda função ostrich apenas um retorno, essa é uma das vantagens. Esse princípio pode ser utilizado de diversas formas, e você pode explorar isso da maneira que imaginar, pois praticar é sempre bom. 




Vamos praticar!

Antes de iniciar vamos configurar o ambiente inicial para os exercícios:

Em uma nova pasta, inicie uma aplicação utilizando o comando npm init -y.

Configure os scripts de teste e linter no arquivo package.json (se a tag scripts já existir, basta substituir os valores pelos descritos abaixo):

"scripts": {
    "lint": "eslint  -c .eslintrc.json src/**/*.[t,j]s"
  },

Coloque as dependências que vamos utilizar em desenvolvimento no arquivo package.json:

"devDependencies": {
    "typescript": "4.4.2",
    "ts-node": "10.2.1",
    "eslint": "7.32.0",
    "eslint-config-trybe-backend": "1.0.4",
    "eslint-plugin-import": "2.26.0",
    "eslint-plugin-mocha": "10.0.4",
    "eslint-plugin-sonarjs": "0.13.0",
    "@typescript-eslint/eslint-plugin": "4.30.0",
    "@typescript-eslint/parser": "4.30.0",
    "@types/node": "17.0.35",
  },

Instale as dependências com o comando npm i

Crie o arquivo de configuração do TypeScript com o comando npx tsc --init

Adicione um arquivo .eslintrc.json na raiz do projeto, com o seguinte conteúdo:


{
   "root": true,
   "extends": [
       "eslint:recommended",
       "plugin:@typescript-eslint/recommended",
       "trybe-backend"
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
       "ecmaVersion": 12,
       "sourceType": "module"
   },
   "settings": {
       "import/resolver": {
         "node": {
           "extensions": [".js", ".jsx", ".ts", ".tsx"]
         }
       }
     },
   "ignorePatterns": ["tests/", "node_modules/"],
   "env": { "es2021": true },
   "plugins": ["@typescript-eslint"],
   "rules": {
       "no-unused-vars": "off",
       "@typescript-eslint/no-unused-vars": ["error"],
       "no-shadow": "off",
       "@typescript-eslint/no-shadow": "error",
       "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
       "import/extensions": [
         "error",
         "ignorePackages",
         {
           "js": "never",
           "jsx": "never",
           "ts": "never",
           "tsx": "never"
         }
      ]
   }
}



Crie a pasta src para os exercícios. Crie um arquivo index.ts na pasta src;

Cole essa função no index.ts

function manageHeroes() {
 const heroes = [{
   name: 'Tony Stark',
   age: 53,
 },
 {
   name: 'Steve Rogers',
   age: 112,
 },
 {
   name: 'Bruce Banner',
   age: 54,
 },
 {
   name: 'Thor',
   age: 1505,
 },
];
 
const moreThanHundred = heroes.filter((heroe) => heroe.age > 100);
const listNameHeroes = heroes.forEach((heroe) => heroe.name);
const searchHeroe = (heroeName) => heroes.filter((heroe) => heroe.name === heroeName);
 
 return searchHeroe;
}
 
console.log(manageHeroes());

OBS: o código acima será usado como base para os exercícios que veremos a seguir. .


Exercícios

1 - Usando o que você aprendeu com o conteúdo sobre Single-responsibility principle, quebre a função manageHeroes em pequenas outras tendo suas responsabilidades únicas.  

2 - Garanta que o seu código não tenha nenhum erro de lint. Para testar basta executar o comando npm run lint.

3 - Como dito sobre Interface segregation principle, depois de fazer o exercício 1 será necessário realizar a tipagem das funções que você criou. Seguindo o princípio, ao invés de criar uma interface genérica, criei uma pequena e bem específica para utilizar nas funções.

Exercício bônus:

4 - Depois de você ter refatorado a função manageHeroes, para que a mesma possa respeitar tanto o Single-responsibility principle e também o de Interface segregation principle, que tal praticar um pouco mais de lógica de programação?

	4.1 Crie uma função que receba o array heroes, uma idade qualquer e retorna os heróis em que a idade for maior do que a especificada no parâmetro da função. 

	4.2 Crie uma função que receba o array heroes e possa adicionar novos heróis a essa lista.





Gabarito

Observações: as respostas dos exercícios 1, 2 e 3, estão todas juntas no arquivo abaixo. 
 

Depois das configurações iniciais pedidas no exercícios.

Criei a pasta interfaces dentro da src, dentro de interfaces coloque o seguinte arquivo IHeroes.ts com o código:

export interface IHeroes {
  name: string,
  age: number,
}

E no arquivo index.ts coloque o seguinte codigo:
import { IHeroes } from './interfaces/IHeroes';
 
const heroes = [{
 name: 'Tony Stark',
 age: 53,
},
{
 name: 'Steve Rogers',
 age: 112,
},
{
 name: 'Bruce Banner',
 age: 54,
},
{
 name: 'Thor',
 age: 1505,
},
];
 
function moreThanHundred(arr: IHeroes[]) {
 return arr.filter((heroe) => heroe.age > 100);
}
 
function listNameHeroes(arr: IHeroes[]) {
 return arr.map((heroe) => heroe.name);
}
 
function searchHeroe(heroeName: string, arr: IHeroes[]):IHeroes[] {
 return arr.filter((heroe) => heroe.name === heroeName);
}
 
console.log(moreThanHundred(heroes));
console.log(listNameHeroes(heroes));
console.log(searchHeroe('Thor', heroes));




Resposta exercício bônus:

Observações: as respostas dos exercícios bônus estão todas juntas no arquivo abaixo.

Criei a pasta interfaces dentro da src, dentro de interfaces coloque o seguinte arquivo IHeroes.ts com o código:

export interface IHeroes {
  name: string,
  age: number,
}

E no arquivo index.ts coloque o seguinte codigo:

import { IHeroes } from './interfaces/IHeroes';
 
const heroes = [{
 name: 'Tony Stark',
 age: 53,
},
{
 name: 'Steve Rogers',
 age: 112,
},
{
 name: 'Bruce Banner',
 age: 54,
},
{
 name: 'Thor',
 age: 1505,
},
];
 
function handleAge(arr: IHeroes[], num: number) {
 return arr.filter((heroe) => heroe.age > num);
}
 
function addHeroe(arr: IHeroes[], name: string, age: number) {
 arr.push({ name, age });
 return arr;
}
 
console.log(handleAge(heroes, 100));
console.log(addHeroe(heroes, 'Superman', 80));



















 
https://medium.com/backticks-tildes/the-s-o-l-i-d-principles-in-pictures-b34ce2f1e898
https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530
