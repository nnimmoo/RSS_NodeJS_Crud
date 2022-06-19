import * as http from 'http';
import { parseUrl } from '../utils/parseUrl';
import { routes } from '../route/routes';
import { deleteUser } from './deleteUser';

function handleDELETE(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users) {
    deleteUser(req, res, id);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end('Page not found');
  }
}

export { handleDELETE };
