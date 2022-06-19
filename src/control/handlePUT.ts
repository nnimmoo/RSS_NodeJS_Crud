import * as http from 'http';
import { parseUrl } from '../utils/parseUrl';
import { updateUser } from './updateUser';
import { routes } from '../route/routes';

function handlePUT(req: http.IncomingMessage, res: http.ServerResponse, url: string) {
  const { path, id } = parseUrl(url);

  if (path === routes.users && id) {
    updateUser(req, res, id);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    const message = { message: 'Page not found' };
    res.end(JSON.stringify(message));
  }
}

export { handlePUT };
