import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: 'aws-study-files',
        event: 's3:ObjectCreated:*',
        rules: [{
          prefix: 'uploaded/'
        }],
        existing: true
      },
    },
  ],
  environment: {
    SQS_URL: "${env:SQS_URL}",
  }
};
