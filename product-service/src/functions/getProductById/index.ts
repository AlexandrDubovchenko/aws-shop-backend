import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}',
        cors: true,
        request: {
          parameters: {
            paths: {
              id: true
            }
          },
        },
      },
    },
  ],
};
