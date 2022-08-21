'use strict';


// 208. Constructor Functions and the new Operator

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never do this , 
  // because if we create 100 Persons,
  // then we would create this method for each of them

  this.calcAge = function () {
    console.log(2022 - this.birthYear);
  }
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
hennadii.calcAge();  // 34