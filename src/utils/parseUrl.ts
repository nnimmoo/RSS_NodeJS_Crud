import { IURLInfo } from '../inter/IURLInfo';

function parseUrl(url: string): IURLInfo {
  const urlPieces = url.split('/');
  const urlPath = [urlPieces[0], urlPieces[1], urlPieces[2]].join('/');
  const id = urlPieces[3];

  const parsedUrl: IURLInfo = {
    path: urlPath,
    id: id,
  };

  return parsedUrl;
}

export { parseUrl };
