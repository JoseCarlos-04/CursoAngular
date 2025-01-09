export enum Role {
  ADMIN = "ADMIN",
  USER = "USER"
}

export class Person {
  uid: String;
  name: String;
  surname: String;
  email: String;
  role: Role;
  createdAt: String;

  constructor(uid: String, name: String, surname: String, email: String, role: Role, createdAt: String) {
    this.uid = uid;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.role = role;
    this.createdAt = createdAt;
  }

}
