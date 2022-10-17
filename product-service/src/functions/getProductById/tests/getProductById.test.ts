import { APIGatewayProxyEvent } from "aws-lambda";
import { contextMock } from "src/mocks/middy";
import { productsListMock } from "src/mocks/products";
import { main } from "../handler";

describe('Unit test for getProductById handler', function () {
  it('verifies successful response', async () => {
    const event: APIGatewayProxyEvent = {
      pathParameters: {
        id: "1"
      }
    } as any

    const result = await main(event, contextMock)

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ data: productsListMock[0] }));
  });
})