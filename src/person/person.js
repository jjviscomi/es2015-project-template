
/**
 * A Class that represents a Person.
 *
 * @class Person
 * @constructor
 */

const attributes  = {
  firstName: new WeakMap(),
  lastName: new WeakMap(),
};

export default class Person {
  constructor(firstName='', lastName='') {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /**
   * Sets the first name for the given person.
   *
   * @method firstName
   * @param firstName {String} The first name of the person.
   * @return {Person} The current person.
   * @chainable
   */
  set firstName(newFirstName) {
    attributes.firstName.set(this, newFirstName);

    return this;
  }

  /**
   * Sets the first name for the given person.
   *
   * @method firstName
   * @return {String} The first name of current person.
   */
  get firstName() {
    return attributes.firstName.get(this);
  }

  /**
   * Sets the last name for the given person.
   *
   * @method lastName
   * @param lastName {String} The last name of the person.
   * @return {Person} The current person.
   * @chainable
   */
  set lastName(newLastName) {
    attributes.lastName.set(this, newLastName);
    return this;
  }

  /**
   * Sets the last name for the given person.
   *
   * @method lastName
   * @return {String} The last name of current person.
   */
  get lastName() {
    return attributes.lastName.get(this);
  }

  toString() {
    return '${this.firstName} ${this.lastName}';
  }
}
