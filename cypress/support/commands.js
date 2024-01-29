Cypress.Commands.addAll({
  accessDemoQA() {
    cy.visit('https://demoqa.com');
    cy.get('header')
      .should('be.visible')
      .find('img').should('have.attr', 'src').should('include', 'Toolsqa');
  },

  accessElementsViaMenu() {
    cy.contains('h5', 'Elements')
      .should('be.visible')
      .click();
    cy.url()
      .should('include', 'elements');
    cy.contains('Please select an item from left to start practice.')
      .should('be.visible');
    cy.get('div.element-list.collapse.show')
      .should('be.visible');
    cy.get('ul.menu-list')
      .should('be.visible');
  },

  accessElementsDirectly() {
    cy.accessDemoQA();
    cy.accessElementsViaMenu();
  }
});