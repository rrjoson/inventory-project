import { faker } from "@faker-js/faker";
describe("Back Office - Products", () => {
  const testNote = {
    title: faker.lorem.words(1),
    newTitle: faker.lorem.words(1),
    description: faker.lorem.sentences(1),
    variant: "small",
    category: "iced",
    stock: 5,
    price: 10,
    discount: 5,
  };
  it.skip("should allow you to add a product", () => {
    cy.login();
    cy.visitAndCheck("/backoffice/products/new");
    // fill out form
    cy.get('[data-cy="title"]').type(testNote.title);
    cy.get('[data-cy="description"]').type(testNote.description);
    cy.get('[data-cy="stock"]').type(testNote.stock);
    cy.get('[data-cy="price"]').type(testNote.price);
    cy.get('[data-cy="discount"]').type(testNote.discount);
    cy.get('[data-cy="listed"]').check();
    // save
    cy.get('[data-cy="save"]').click();
    // todo: check if added to list of products
    cy.get('[data-cy="product-list"]').within(() => {
      cy.contains(testNote.title).should("exist");
    });
  });
  it.skip("should display a list of products", () => {
    cy.visitAndCheck("/backoffice/products");
    // Verify that the table contains specific product details
    cy.get('[data-cy="product-list"]').within(() => {
      cy.contains(testNote.title).should("exist");
      cy.contains(testNote.description).should("exist");
      cy.contains(testNote.stock).should("exist");
      cy.contains(testNote.price).should("exist");
      cy.contains(testNote.discount).should("exist");
      // cy.contains(testNote.listed).should("exist");
    });
  });
  it.skip("should allow you to edit a product", () => {
    cy.login();
    cy.visitAndCheck("/backoffice/products");
    // Execute
    cy.get('[data-cy="product-list"]').within(() => {
      cy.get('[data-cy="edit"]').first().click();
    });
    cy.url().should("include", "/edit"); // => true
    // Execute
    // fill out form
    cy.get('[data-cy="title"]').clear();
    cy.get('[data-cy="title"]').type(testNote.newTitle);
    // Verify changes
    // save
    cy.get('[data-cy="save"]').click();
    // todo: check if added to list of products
    cy.get('[data-cy="product-list"]').within(() => {
      cy.contains(testNote.newTitle).should("exist");
    });
  });
  it.skip("should allow you to delete a product", () => {
    cy.visitAndCheck("/backoffice/products");
    // Delete newly created product
    cy.get('[data-cy="products-table"]').within(() => {
      cy.get('[data-cy="delete"]').first().click();
    });
  });
});
