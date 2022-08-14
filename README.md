# Gabarito

**Observações: as respostas dos exercícios 1, 2 e 3, estão todas juntas no arquivo abaixo.**
 

- Depois das configurações iniciais pedidas no exercícios.

- Criei a pasta interfaces dentro da src, dentro de interfaces coloque o seguinte arquivo IHeroes.ts com o código:

		export interface IHeroes {
  		name: string,
  		age: number,
		}

- E no arquivo index.ts coloque o seguinte codigo:

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




## Resposta exercício bônus:

**Observações: as respostas dos exercícios bônus estão todas juntas no arquivo abaixo.**

- Criei a pasta interfaces dentro da src, dentro de interfaces coloque o seguinte arquivo IHeroes.ts com o código:

		export interface IHeroes {
  		name: string,
  		age: number,
		}

- E no arquivo index.ts coloque o seguinte codigo:

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
