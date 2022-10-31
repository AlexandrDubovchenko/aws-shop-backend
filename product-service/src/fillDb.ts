import { DynamoDB } from 'aws-sdk';
import { productsListMock } from './mocks/products';

require('dotenv').config();

const ddb = new DynamoDB({ region: 'eu-west-1' });

const RequestItemsProducts = productsListMock.map((p) => (
  {
    PutRequest: {
      Item: {
        "id": { "S": `${p.id}` },
        "name": { "S": p.name },
        "price": { "N": `${p.price}` },
        "currency": { "S": p.currency },
        "image": { "S": p.image },
      }
    }
  }
));

const RequestItemsStocks = productsListMock.map((p, index) => (
  {
    PutRequest: {
      Item: {
        "product_id": { "S": `${p.id}` },
        "count": { "N": `${index + 6}` },
      }
    }
  }
));

ddb.batchWriteItem({
  RequestItems: {
    [process.env.PRODUCTS_TABLE_NAME]: RequestItemsProducts,
    [process.env.STOCKS_TABLE_NAME]: RequestItemsStocks
  }
}).promise().then(console.log)
