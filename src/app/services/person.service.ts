import { Injectable } from '@angular/core';
import {Database, get, ref, set} from '@angular/fire/database';
import {Person} from '../models/person.models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private database: Database) { }

  savePerson(person: Person) {
    const personsRef = ref(this.database, `/persons/${person.uid}`);

    console.log(person);
    return set(personsRef, person);
  }

  getPersonByUid(uid: String): Promise<Person | null> {
    const personRef = ref(this.database, `persons/${uid}`);

    return get(personRef).then(snapshot => {
        if(snapshot.exists()) {
          return snapshot.val() as Person;
        }else {
          console.error('Any person found.');

          return null;
        }
      });
  }
}
