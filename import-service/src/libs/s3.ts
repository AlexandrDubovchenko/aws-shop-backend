import { S3 } from 'aws-sdk';

export const UPLOAD_BUCKET = 'aws-study-files';
export const s3 = new S3({ region: 'eu-west-1' });

