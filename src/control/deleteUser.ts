import * as http from 'http';
import { usersDB } from '../DB/users';

async function deleteUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  try {
    const status = await usersDB.delete(id);
    res.setHeader('Content-Type', 'application/json');
    res.status = status;
    res.end();
  } catch (err) {
    switch (err) {
      case 400:
        res.setHeader('Content-Type', 'application/json');
        res.status = 400;
        res.end('Wrong user ID');
        break;
      case 404:
        res.setHeader('Content-Type', 'application/json');
        res.status = 404;
        res.end( `User ${id} not Found` );
    }
  }
}

export { deleteUser };
