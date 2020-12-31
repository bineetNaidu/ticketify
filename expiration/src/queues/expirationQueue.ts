import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expirationCompletePublisher';
import { natsWrapper } from '../NATSWrapper';

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});

export default expirationQueue;
