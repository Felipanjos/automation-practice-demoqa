export default new class Elements {
  isElementsPage() {
    cy.url()
      .should('include', 'elements');
    cy.contains('Please select an item from left to start practice.')
      .should('be.visible');
    cy.get('div.element-list.collapse.show')
      .should('be.visible');
    cy.get('ul.menu-list')
      .should('be.visible');
  }

  visit() {
    cy.visit('https://demoqa.com/elements');
  }
}