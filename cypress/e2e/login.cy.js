/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("login", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://localhost:5174/");
  });

  it("hatalı eposta girişi yapınca buton disabled olmalı", () => {
    cy.get('input[name="password"]').type("1234");
    cy.get('input[name="terms"]').click();
    cy.get('input[name="email"]').type("asd@adfacom");
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("be.disabled");
  });
  it("hatalı kısa şifre girişi yapınca buton disabled olmalı", () => {
    cy.get('input[name="terms"]').click();
    cy.get('input[name="email"]').type("asd@adfa.com");
    cy.get('input[name="password"]').type("123");
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("be.disabled");
  });

  it("hatalı giriş yapınca error sayfasına yönlendiriyor", () => {
    cy.get('input[name="email"]').type("asd@adfa.com");
    cy.get('input[name="password"]').type("1234");
    cy.get('input[name="terms"]').click();
    const submit = cy.get('[data-cy="login-submit"]');
    submit.should("not.be.disabled");
    submit.click();

    cy.url().should("eq", "http://localhost:5174/error");
  });
});
