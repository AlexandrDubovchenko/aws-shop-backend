import { s3, UPLOAD_BUCKET } from '@libs/s3';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';


const importProductsFile = async (event) => {
  if (event.queryStringParameters && event.queryStringParameters.name) {
    const catalogPath = 'uploaded/' + event.queryStringParameters.name;
    const params = {
      Bucket: UPLOAD_BUCKET,
      Key: catalogPath,
      Expires: 60,
      ContentType: 'text/csv'
    }

    return formatJSONResponse({
      data: s3.getSignedUrl('putObject', params),
    }, 200);
  } else {
    formatJSONResponse({
      message: 'Name not provided',
    }, 400);
  }
};

export const main = middyfy(importProductsFile);
