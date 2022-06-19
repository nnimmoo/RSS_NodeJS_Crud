import * as http from 'http';
import { usersDB } from '../DB/users';

function updateUser(req: http.IncomingMessage, res: http.ServerResponse, id: string) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const user = await usersDB.update(id, body);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } catch (error) {
      res.setHeader('Content-Type', 'application/json');
      if (error === 400) {
        res.statusCode = 400;
        const message = { message: 'Wrong user id' };
        res.end(JSON.stringify(message));
      } else if (error === 404) {
        res.statusCode = 404;
        const message = { message: 'User does not exit' };
        res.end(JSON.stringify(message));
      }
    }
  });

  req.on('error', () => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    const message = { message: 'Internal server error' };
    res.write('Internal server error');
    res.end();
  });
}

export { updateUser };
