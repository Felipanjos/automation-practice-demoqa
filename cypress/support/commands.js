Cypress.Commands.addAll({
  accessDemoQA() {
    cy.ignoreException();
    cy.visit('https://demoqa.com');
    cy.get('header')
      .should('be.visible')
      .find('img').should('have.attr', 'src').should('include', 'Toolsqa');
  },

  ignoreException(){
    Cypress.on('uncaught:exception', (err, runnable) => {return false});
  }
});