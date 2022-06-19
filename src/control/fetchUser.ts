import * as http from 'http';
import { usersDB } from '../DB/users';

async function fetchUser(res: http.ServerResponse, id: string): Promise<any> {
  try {
    const user = await usersDB.getUser(id);

    res.setHeader('Content Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify(user));
  } catch (err) {
    res.setHeader('Content Type', 'application/json');
    switch (err) {
      case 400:
        res.setHeader('Content-Type', 'application/json');
        res.status = 400;
        res.end('Wrong user ID');
        break;
      case 404:
        res.setHeader('Content-Type', 'application/json');
        res.status = 404;
        res.end(`User ${id} not Found`);
    }
  }
}

export { fetchUser };
