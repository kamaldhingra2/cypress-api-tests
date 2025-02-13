import apiEndPoints from "../support/api-endpoints";

describe("Validate Product CRUD Operations", () => {
    // Load test data before each test case
    beforeEach(() => {
      cy.fixture("test-data").as("testData");
    });

    // Test case to verify fetching the list of products from API
    it("verify fetching list of products from API endpoint", () => {
      cy.get("@testData").then(($testData: any) => {
        // Construct API endpoint URL
        const url = `${Cypress.config("baseUrl")}/${apiEndPoints.products}`;

        // Send a GET request to fetch the list of products
        cy.request({
          method: "GET",
          url: url,
        }).then((response) => {
          // Validate that the response status is 200
          expect(response.status).to.eq(200);

          // Log the response body for debugging purposes
          cy.log(`GET response result:\n ${JSON.stringify(response.body)}`);

          // Validate the total products and the limit
          expect(response.body.total).to.eq($testData.PRODUCT_LIST.total);
          expect(response.body.limit).to.eq($testData.PRODUCT_LIST.limit);

          const responseProductsList = response.body.products;

          // Loop through each product in test data and verify it exists in list of products from API response
          $testData.PRODUCT_LIST.RANDOM_PRODUCTS.forEach((product: any) => {
            const productFound = responseProductsList.find(
              (responseProduct: any) =>
                responseProduct.title === product.title &&
                responseProduct.price === product.price &&
                responseProduct.category === product.category
            );

            expect(productFound).to.not.be.undefined;
          });
        });
      });
    });

    // Test case to verify fetching details of a single product by its ID
    it("verify fetching product details using ID from API endpoint", () => {
      cy.get("@testData").then(($testData: any) => {
        // Construct API endpoint URL
        const url = `${Cypress.config("baseUrl")}/${apiEndPoints.products}`;

        // Send a GET request to fetch details of a specific product using its ID
        cy.request({
          method: "GET",
          url: `${url}/${$testData.PRODUCT_KIWI.id}`,
        }).then((response) => {
          // Validate that the response status is 200 (OK)
          expect(response.status).to.eq(200);
          cy.log(`GET response result:\n ${JSON.stringify(response.body)}`);

          // Verify that the product title matches the expected data 
          expect(response.body.title).to.eq($testData.PRODUCT_KIWI.title);

          // Validate that the entire product object matches the expected test data
          expect(response.body).to.deep.include($testData.PRODUCT_KIWI);
        });
      });
    });

    // Test case to verify adding a new product via API
    it("verify adding a new product using API endpoint", () => {
      cy.get("@testData").then(($testData: any) => {
        //  URL for adding a product
        const url = `${Cypress.config("baseUrl")}/${apiEndPoints.addProduct}`;

        // Send a POST request to create a new product
        cy.request({
          method: "POST",
          url: url,
          body: $testData.NEW_PRODUCT,
        }).then((response) => {
          // Validate that the response status is 201 (Created)
          expect(response.status).to.eq(201);
          cy.log(`POST response result:\n ${JSON.stringify(response.body)}`);

          // Ensure that the response contains an ID and that it is a number
          expect(response.body).to.have.property("id").to.be.a("number");
        });
      });
    });

    // Test case to verify updating an existing product via API
    it("verify updating a product using API endpoint", () => {
      cy.get("@testData").then(($testData: any) => {
        // Construct API endpoint URL for updating a product
        const url = `${Cypress.config("baseUrl")}/${apiEndPoints.products}`;

        // Send a PUT request to update the product price
        cy.request({
          method: "PUT",
          url: `${url}/${$testData.PRODUCT_KIWI.id}`,
          body: { "price": $testData.PRODUCT_KIWI.price + 100 }, // Increment price by 100
        }).then((response) => {
          // Validate that the response status is 200 (OK)
          expect(response.status).to.eq(200);
          cy.log(`PUT response result:\n ${JSON.stringify(response.body)}`);

          // Validate that the product title remains unchanged
          expect(response.body.title).to.eq($testData.PRODUCT_KIWI.title);

          // Ensure that the price is updated correctly
          expect(response.body.price).to.eq($testData.PRODUCT_KIWI.price + 100);
        });
      });
    });

    // Test case to verify deleting an existing product via API
    it("verify deleting a product using API endpoint", () => {
        cy.get("@testData").then(($testData: any) => {

        const timeTwoMinutesAgo = new Date().getTime() - 120000;
          // Construct API endpoint URL for updating a product
          const url = `${Cypress.config("baseUrl")}/${apiEndPoints.products}`;

          // Send a DELETE request to update the product price
          cy.request({
            method: "DELETE",
            url: `${url}/${$testData.PRODUCT_KIWI.id}`,
          }).then((response) => {
            // Validate that the response status is 200 (OK)
            expect(response.status).to.eq(200);
            cy.log(`DELETE response result:\n ${JSON.stringify(response.body)}`);

            // Validate that the product id and title
            expect(response.body.id).to.eq($testData.PRODUCT_KIWI.id);
            expect(response.body.title).to.eq($testData.PRODUCT_KIWI.title);

            // Validate that the product is deleted and the deletedOn timestamp is within the last 2 minutes
            expect(response.body.isDeleted).to.eq(true);
            expect(new Date(response.body.deletedOn).getTime()).to.be.gte(timeTwoMinutesAgo)
          });
        });
      });
  });
