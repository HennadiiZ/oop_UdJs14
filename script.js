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

// 214. Setters and Getters

const account = {
  owner: 'Jonas',
  movements: [200, 540, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  }
}

console.log(account.latest); //300

account.latest = 50;
console.log(account.movements); //[200, 540, 120, 300, 50]
console.log(account.latest); //50 

//
class PersonCl2 {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
 
  calcAge() {
    console.log(2022 - this.birthYear);
  }

  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    console.log(name); // Jessica2 Davis
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert(`${name} is not a full name!`)
    }
  }

  getFullName() {
    return this._fullName;
  }
}

const jessica2 = new PersonCl2('Jessica2 Davis', 1997);
console.log(jessica2.age); //25

// 215. Static Methods

Array.from(document.querySelector('h1'));
console.log(Array.from(document.querySelector('h1'))) // []

// 216. Object.create
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  }
}

const steven = Object.create(PersonProto);
console.log(steven); // {} empty , with calcAge in prototype
steven.calcAge(); // NaN

steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // 20

console.log(steven.__proto__); // {calcAge: ƒ} - exactly  PersonProto
console.log(steven.__proto__ === PersonProto); // true

//----
const PersonProto2 = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}
const sarah = Object.create(PersonProto2);
sarah.init('Sarah', 1979);
sarah.calcAge(); // 43

// 218. Inheritance Between "Classes": Constructor Functions
const Person218 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person218.prototype.calcAge = function() {
  console.log(2022 - this.birthYear);
};

// const Student218 = function (firstName, birthYear, course) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
//   this.course = course;
// };

const Student218 = function (firstName, birthYear, course) {
  Person218.call(this, firstName, birthYear)
  this.course = course;
};

// Linking prototypes
Student218.prototype = Object.create(Student218.prototype);

Student218.prototype.introduce = function() {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student218("Mike", 2020, "Computer Science");
console.log(mike); // Student218 {firstName: 'Mike', birthYear: 2020, course: 'Computer Science'}
mike.introduce(); // My name is Mike and I study Computer Science

console.log(mike.__proto__);  // Student218 {introduce: ƒ}
console.log(mike.__proto__.__proto__); // {constructor: ƒ}
console.log(mike.__proto__.__proto__.__proto__);

console.log(mike instanceof Student218); // true
console.log(mike instanceof Person218); // false

console.dir(Student218.prototype.constructor); // ƒ Student218(firstName, birthYear, course)
Student218.prototype.constructor = Student218;
console.dir(Student218.prototype.constructor); // ƒ Student218(firstName, birthYear, course)


// 220. Inheritance Between "Classes": ES6 Classes

class PersonCl_ {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
 
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2022 - this.birthYear);
  }
}

class StudentCl_ extends PersonCl_ {
  constructor(fulltName, birthYear, course) {
    super(fulltName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(this.fulltName, this.course);
  }
}

// const marta = new StudentCl_('Marta Marta', 2012);
const marta = new StudentCl_('Marta Marta', 2012, 'Computer Science');
console.log(marta); // StudentCl_ {firstName: 'Marta Marta', birthYear: 2012} - this is without super
marta.introduce();
marta.calcAge();