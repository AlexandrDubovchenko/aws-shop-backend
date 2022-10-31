export const swaggerConfig = {
  "openapi": "3.0.3",
  "info": {
    "title": "Mobile Shop Aws Study",
    "description": "Documentation for product service",
    "version": "0.0.1"
  },
  servers: [{
    url: '/dev'
  }],
  "paths": {
    "/products": {
      "get": {
        "description": "List of all products",
        "responses": {
          "200": {
            "description": "Successfully fetched all products",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "name": {
                            "type": "string"
                          },
                          "id": {
                            "type": "string"
                          },
                          "currency": {
                            "type": "string"
                          },
                          "price": {
                            "type": "number"
                          },
                          "count": {
                            "type": "number"
                          }
                        },
                        "example": {
                          "name": "Iphone 14 Pro",
                          "currency": "$",
                          "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
                          "price": "1099"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "description": "Create new product",
        "parameters": [
          {
            "in": "body",
            "name": "data",
            "description": "Product to create",
            "schema": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "price": { "type": "number" },
                "currency": { "type": "string" },
                "image": { "type": "string" },
              }
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "id": {
                          "type": "string"
                        },
                        "currency": {
                          "type": "string"
                        },
                        "price": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "example": {
                        "name": "Iphone 14 Pro",
                        "currency": "$",
                        "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
                        "price": "1099",
                        "count": 5
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/product/{id}": {
      "get": {
        "description": "Get product by id",
        "parameters": [
          {
            "in": "path",
            "name": "id",
            "schema": {
              "type": "integer",
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "Successfully fetched product",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "type": "object",
                      "properties": {
                        "name": {
                          "type": "string"
                        },
                        "id": {
                          "type": "string"
                        },
                        "currency": {
                          "type": "string"
                        },
                        "price": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "example": {
                        "name": "Iphone 14 Pro",
                        "currency": "$",
                        "image": "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
                        "price": "1099"
                      }
                    }
                  }
                }
              }
            }
          },
          "404": {
            "description": "Product not found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "data": {
                      "message": "No such Product"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  }
}