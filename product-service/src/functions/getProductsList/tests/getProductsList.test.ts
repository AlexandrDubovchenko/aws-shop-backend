import { contextMock } from "src/mocks/middy";
import { productsListMock } from "src/mocks/products";
import { main } from "../handler";

describe('Unit test for getProductsList handler', function () {
  it('verifies successful response', async () => {
    const result = await main({}, contextMock)

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({ data: productsListMock }));
  });
})