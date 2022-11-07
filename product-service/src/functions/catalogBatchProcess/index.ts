import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::GetAtt': ['SQSQueue', 'Arn']
        }
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: "${env:PRODUCTS_TABLE_NAME}",
    STOCKS_TABLE_NAME: "${env:STOCKS_TABLE_NAME}",
    SNS_ARN: {
      Ref: 'SNSTopic'
    }
  },
};
