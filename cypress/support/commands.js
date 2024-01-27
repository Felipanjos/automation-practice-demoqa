// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.addAll({
  access() {
    cy.visit('https://demoqa.com');
    cy.get('header')
      .should('be.visible')
      .find('img').should('have.attr', 'src').should('include', 'Toolsqa');
  },

  accessElements() {
    cy.contains('h5', 'Elements')
      .should('be.visible')
      .click();
    cy.contains('Please select an item from left to start practice.')
      .should('be.visible');
  }
});