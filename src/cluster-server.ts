import * as _cluster from 'cluster';
const cluster = _cluster as unknown as _cluster.Cluster;
import { cpus } from 'os';
import { server } from './app';
import 'dotenv/config';

const cpu = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < cpu; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, c, s) => {
    console.log(`worker ${worker.process.pid} left`);
  });
} else {
  const PORT = process.env.PORT;
  server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });

  console.log(`Worker ${process.pid} started`);
}
