import 'dotenv/config';
import { server } from './app';

function runServer() {
  const PORT = process.env.PORT;

  server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
}

runServer();

export { runServer };
