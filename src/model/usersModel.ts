import { usersDB } from '../DB/users';
import { User } from '../inter/User';


function getUsersList(): Promise<User[]> {
  return new Promise((resolve, reject) => {
    resolve(usersDB.getUsers());
  });
}

function getUser(identifier: string): Promise<User> {
  return new Promise((resolve) => {
    resolve(usersDB.getUser(identifier));
  });
}

export { getUsersList, getUser };
