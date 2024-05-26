import { faker } from "@faker-js/faker";

describe("Back Office - Delete Product", () => {
  // Set up test data
  const testProduct = {
    title: faker.lorem.words(1),
    description: faker.lorem.sentences(1),
    stock: "5",
    price: "10",
    discount: "5",
    listed: true,
  };

  // Clean up after each test
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to delete a product", () => {
    // Log in and navigate to the new product page
    cy.login();
    cy.visitAndCheck("/backoffice/products/new");

    // Fill out the product form
    cy.get('[data-cy="title"]').type(testProduct.title);
    cy.get('[data-cy="description"]').type(testProduct.description);
    cy.get('[data-cy="price"]').type(testProduct.price);
    cy.get('[data-cy="discount"]').type(testProduct.discount);
    cy.get('[data-cy="stock"]').type(testProduct.stock);
    if (testProduct.listed) {
      cy.get('[data-cy="listed"]').check();
    } else {
      cy.get('[data-cy="listed"]').uncheck();
    }

    // Submit the form
    cy.get('[data-cy="save"]').click();

    // Delete the product
    cy.visitAndCheck("/backoffice/products");
    cy.contains(testProduct.title).click();
    cy.get('[data-cy="delete"]').click();

    // Verify the product has been deleted
    cy.get('[data-cy="product-list"]').within(() => {
      cy.contains(testProduct.title).should("not.exist");
    });
  });
});
