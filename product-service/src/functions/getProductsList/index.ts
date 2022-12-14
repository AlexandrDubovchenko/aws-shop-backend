import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: "${env:PRODUCTS_TABLE_NAME}",
    STOCKS_TABLE_NAME: "${env:STOCKS_TABLE_NAME}",
  },
};
