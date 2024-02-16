export default new class Home {
  accessElementsPage() {
    cy.contains('h5', 'Elements')
      .should('be.visible')
      .click();
  }

  visit() {
    cy.ignoreException();
    cy.visit('https://demoqa.com');
  }

  isHomePage() {
    cy.get('header')
      .should('be.visible')
      .find('img').should('have.attr', 'src').should('include', 'Toolsqa');
  }
}