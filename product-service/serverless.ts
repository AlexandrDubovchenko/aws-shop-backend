import * as dotenv from "dotenv";
import type { AWS } from '@serverless/typescript';

import { getProductsList, getProductById, swagger, createProduct } from '@functions/index';

dotenv.config({path: __dirname + '/.env'});

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  useDotenv : true,
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'eu-west-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ["dynamodb:*"],
        Resource: [
          "arn:aws:dynamodb:${self:provider.region}:*:table/${env:PRODUCTS_TABLE_NAME}",
          "arn:aws:dynamodb:${self:provider.region}:*:table/${env:STOCKS_TABLE_NAME}"
        ]
      }
    ]
  },
  // import the function via paths
  functions: { getProductsList, getProductById, createProduct, swagger },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
