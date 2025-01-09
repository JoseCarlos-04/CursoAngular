import { Injectable } from '@angular/core';
import {Database, get, ref, set} from '@angular/fire/database';
import {Person} from '../models/person.models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private COLLECTION_NAME = "persons";

  constructor(private database: Database) { }

  savePerson(person: Person) {
    let personsRef = ref(this.database, `/${(this.COLLECTION_NAME)}/${person.uid}`);

    return set(personsRef, person).then(() => {
        console.log('Person saved successfully');
    })
  }

  getPersonByUid(uid: String): Promise<Person | null> {
    let personRef = ref(this.database, `/${(this.COLLECTION_NAME)}/${uid}`);

    return get(personRef).then(snapshot => {
      if(snapshot.exists()) {
        return snapshot.val() as Person;
      }else {
        console.warn(`Person with UID ${uid} not found.`);
        return null;
      }
    });
  }
}
