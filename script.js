'use strict';


// 208. Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this , 
  // because if we create 100 Persons,
  // then we would create this method for each of them

//   this.calcAge = function () {
//     console.log(2022 - this.birthYear);
//   }
};

// 1. New {} is created
// 2. function is called, this = {} 
// 3. {} linked to prototype
// 4. function automatically return {}

const jonas = new Person('Jonas', 1991); 
const hennadii = new Person('Hennadii', 1988); 
const pavel = new Person('Pavel', 1987); 

console.log(jonas); // Person {firstName: 'Jonas', birthYear: 1991, calcAge: ƒ}
console.log(hennadii); // Person {firstName: 'Hennadii', birthYear: 1988, calcAge: ƒ}
console.log(pavel); // Person {firstName: 'Pavel', birthYear: 1987, calcAge: ƒ}

console.log(hennadii instanceof Person); // true
// hennadii.calcAge();  // 34

// 209. Prototypes
console.log(Person.prototype); // {constructor: ƒ}
Person.prototype.calcAge = function() {
  console.log(2022 - this.birthYear);
};
hennadii.calcAge();  // 34
pavel.calcAge() // 35

console.log(jonas.__proto__); // {calcAge: ƒ, constructor: ƒ}
console.log(Person.prototype); // {calcAge: ƒ, constructor: ƒ}
console.log(jonas.__proto__ === Person.prototype); // true
console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false


Person.prototype.species = "Homo Sapiens";
console.log(jonas.species); // Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// 210. Prototypal Inheritance and The Prototype Chain
// 211. Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__); // {species: 'Homo Sapiens', calcAge: ƒ, constructor: ƒ}
console.log(jonas.__proto__.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}


const arr = [3, 3, 7, 8, 8, 18, 11, 13, 13, 13];
console.log(arr.__proto__ === Array.prototype); // true

Array.prototype.unique = function () { // my own method for all arrays
  return [...new Set(this)];
};

console.log(arr.unique()); // [3, 7, 8, 18, 11, 13]


// 213. ES6 Classes

// class expression
const PersoneCl = class {};

// class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
 
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);
console.log(jessica); // PersonCl {firstName: 'Jessica', birthYear: 1996}

