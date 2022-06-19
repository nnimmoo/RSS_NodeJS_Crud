import * as http from 'http';
import { fetchUsersList } from './fetchUsersList';
import { fetchUser } from './fetchUser';
import { parseUrl } from '../utils/parseUrl';
import { routes } from '../route/routes';

function handleGET(res: http.ServerResponse, url: string): void {
  const { path, id } = parseUrl(url);
  if (path === routes.users && !id) {
    fetchUsersList(res);
  } else if (path === '/api/users' && id) {
    fetchUser(res, id);
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 404;
    res.end('Page not found');
  }
}

export { handleGET };
