import { SNS } from 'aws-sdk';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { ProductsService } from 'src/services';

const catalogBatchProcess = async (event) => {
  try {
    const sns = new SNS({ region: 'eu-west-1' });

    const promises = event.Records.map(({ body }) => ProductsService.createProduct(JSON.parse(body)))

    const newProducts = await Promise.all(promises);
    const publishRes = await sns.publish({
      Subject: 'New products created',
      Message: JSON.stringify(newProducts),
      TopicArn: process.env.SNS_ARN
    }).promise();

    console.log('Email sent: +', publishRes)

    return formatJSONResponse({
      data: newProducts
    }, 201)
  } catch (error) {
    console.log(error.message);
    return formatJSONResponse({
      error: error.message
    }, error.status)
  }
};

export const main = middyfy(catalogBatchProcess);
