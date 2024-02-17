import Checkbox from "./Checkbox";

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
    cy.ignoreException();
    cy.visit('https://demoqa.com/elements');
  }

  clickTab(tab) {
    cy.get('#item-1')
      .should('be.visible')
      .should('have.text', tab)
      .click();
  }

  accessCheckbox() {
    this.clickTab('Check Box');
  }

  accessCheckboxAndOpenToggle() {
    this.clickTab('Check Box');
    Checkbox.clickToggle('Home');
  }
}