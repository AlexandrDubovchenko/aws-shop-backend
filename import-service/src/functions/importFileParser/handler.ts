import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { formatJSONResponse } from '@libs/api-gateway';
import { s3, UPLOAD_BUCKET } from '@libs/s3';

const readFile = (params: S3.GetObjectRequest) => {
  return new Promise((res, rej) => {
    const stream = s3.getObject(params).createReadStream();

    stream
      .pipe(csv())
      .on('data', async (data) => {
        console.log(JSON.stringify(data));
      })
      .on('error', (error) => {
        rej('PARSE ERROR ' + error.message);
      })
      .on('end', () => {
        res('Success!');
      })
  })
}

const importFileParser = async (event) => {
  for (const record of event.Records) {
    const params = {
      Bucket: UPLOAD_BUCKET,
      Key: record.s3.object.key
    }

    console.log(JSON.stringify(params));
    

    try {
      await readFile(params);
      await s3.copyObject({
        ...params,
        CopySource: UPLOAD_BUCKET + '/' + record.s3.object.key,
        Key: record.s3.object.key.replace('uploaded', 'parsed')
      }).promise();

      await s3.deleteObject(params).promise();

      console.log(record.s3.object.key + ' succesfully parsed');

      return formatJSONResponse({
        data: `Parsed ${record.s3.object.key}`
      }, 201);
    }
    catch (error) {
      console.log(error);
      return formatJSONResponse({
        message: `Parsed ${record.s3.object.key} failed, because ${error.message}`
      }, 500);
    }
  }
};

export const main = importFileParser;
