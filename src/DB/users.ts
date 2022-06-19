import { v4 as uuidv4 } from 'uuid';
import { validate as uuidValidate } from 'uuid';
import { User } from '../inter/User';
import { UsersStore } from '../inter/UsersStore';

class Users implements UsersStore<User> {
  private users: User[] | null = null;

  constructor() {
    this.users = [];
  }

  public getUsers(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      if (this.users) {
        resolve(this.users);
      } else {
        reject(500);
      }
    });
  }

  public getUser(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      if (uuidValidate(id)) {
        const targetUser: User | undefined = this.users.find((user: User) => user.id === id);
        targetUser ? resolve(targetUser) : reject(404);
      } else {
        reject(400);
      }
    });
  }

  public createUser(newUser: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const { username, age, hobbies } = JSON.parse(newUser);

      if (username && age && hobbies) {
        const id = uuidv4();
        const user: User = { id, username, age, hobbies };
        this.users.push(user);
        resolve(user);
      }

      reject(400);
    });
  }

  public update(id: string, body: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const { username, age, hobbies } = JSON.parse(body);

      if (uuidValidate(id)) {
        const userIdx: number = this.users.findIndex((user) => user.id === id);
        let user = userIdx !== -1 ? this.users[userIdx] : null;

        if (user) {
          user = {
            ...user,
            username: username || user.username,
            age: age || user.age,
            hobbies: hobbies || user.hobbies,
          };
          this.users[userIdx] = { ...user };
          resolve(user);
        } else {
          reject(404);
        }
      } else {
        reject(400);
      }
    });
  }

  delete(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if (uuidValidate(id)) {
        const userForDeleteIdx: number = this.users.findIndex((user) => user.id === id);
        if (userForDeleteIdx !== -1) {
          this.users.splice(userForDeleteIdx, 1);
          resolve(204);
        } else {
          reject(404);
        }
      } else {
        reject(400);
      }
    });
  }
}

let usersDB: Users = new Users();

export { usersDB };
