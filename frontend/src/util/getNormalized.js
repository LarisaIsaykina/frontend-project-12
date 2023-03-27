import { normalize, schema } from 'normalizr';

const getNormalized = (data) => {
  const user = new schema.Entity('users');

  const message = new schema.Entity('messages', {
    author: user,
  });

  const channel = new schema.Entity('channels', {
    author: user,
    messages: [message],
  });

  const mySchema = { channels: [channel], messages: [message] };
  // messages: [message];

  return normalize(data, mySchema);
};
export default getNormalized;
