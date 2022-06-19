import * as http from 'http';
import { usersDB } from '../DB/users';

async function fetchUsersList(res: http.ServerResponse): Promise<any> {
  try {
    const users = await usersDB.getUsers();
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(users));
  } catch (err) {
    if (err === 500) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = err;
      res.write('Internal server error');
      res.end();
    }
  }
}

export { fetchUsersList };
