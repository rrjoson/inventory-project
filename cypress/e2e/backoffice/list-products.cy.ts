import { faker } from "@faker-js/faker";

describe("Back Office - List Products", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  const testProduct = {
    title: faker.lorem.words(1),
    description: faker.lorem.sentences(1),
    variant: "small",
    category: "iced",
    stock: 5,
    price: 10,
    discount: 5,
  };

  it("should allow you to see a list of products", () => {
    cy.login();

    cy.visitAndCheck("/backoffice/products/new");

    // fill out form
    cy.get('[data-cy="title"]').type(testProduct.title);
    cy.get('[data-cy="description"]').type(testProduct.description);
    cy.get('[data-cy="stock"]').type(testProduct.stock);
    cy.get('[data-cy="price"]').type(testProduct.price);
    cy.get('[data-cy="discount"]').type(testProduct.discount);
    cy.get('[data-cy="listed"]').check();

    cy.get('[data-cy="save"]').click();

    cy.get('[data-cy="product-list"]').within(() => {
      cy.contains(testProduct.title).should("exist");
    });
  });
});
