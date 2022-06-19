import * as http from 'http';
import { usersDB } from '../DB/users';

function spawnUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let str = '';

  req.on('data', (data) => {
    str += data.toString();
  });

  req.on('end', async () => {
    try {
      const newUser = await usersDB.createUser(str);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } catch (err) {
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = err;
      res.end('user must contain only s: username, age, hobbies');
    }
  });
  req.on('error', () => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 500;
    res.write('Internal server error');
    res.end();
  });
}

export { spawnUser };
