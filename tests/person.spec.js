import Person from '../src/person/person.js';

describe('A Person', () => {

  const person = new Person();

  console.log('PERSON: ', person);
  it('class does exists', () => {
    expect(person).toBe(person);
  });

  it('firstName can be set', () => {
    person.firstName = 'Joe';
    expect(person.firstName).toBe('Joe');
  });
});
