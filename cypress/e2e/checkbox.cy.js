import Home from '../POM/Home';
import Elements from '../POM/Elements';

describe('Checkboxes validation', () => {
  const element = "Check Box";
  const resources = ['Home', 'Desktop', 'Notes', 'Commands', 'Documents', 'WorkSpace', 'React', 'Angular', 'Veu', 'Office', 'Public', 'Private', 'Classified', 'General', 'Downloads', 'Word  File.doc', 'Excel File.doc'];

  beforeEach(() => {
    switch(Cypress.currentTest.title) {
      case 'Access DemoQA website':
        break;
      case 'Access Elements through menu':
        break;
      case 'Access Elements page':
        break;
      default: 
        Elements.visit();
    }
  });

  it('Access DemoQA website', () => {
    Home.visit();
    Home.isHomePage();
  });

  it('Access Elements through menu', () => {
    Home.visit();
    Home.accessElementsPage();
    Elements.isElementsPage();
  });

  it('Access Elements page', () => {
    Elements.visit();
    Elements.isElementsPage();
  });

  it('Access Check Box tab', () => {
    cy.clickTab(element);

    cy.assertCheckboxPage();

    cy.validateCheckboxTree('Home');
  });

  it('Expand "Home" toggle', () => {
    cy.accessCheckboxAndOpenToggle();
    
    cy.validateCheckboxTree('Home', 'Open');
    
    cy.validateFourMainMenus();
    cy.ignoreException();
  });

  it('Expand "Desktop" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDesktop();
  });

  it('Expand "Documents" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDocuments();

    cy.ignoreException();
  });

  it('Expand "WorkSpace" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDocuments();
    
    cy.expandAndValidateWorkspaces();
  });

  it('Expand "Office" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDocuments();
    
    cy.expandAndValidateOffice();
  });

  it('Expand "Downloads" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDownloads();
  });

  it('Expand all toggles', () => {
    cy.accessCheckbox();
    cy.expandAll();
    cy.validateAll();
  });
}); 