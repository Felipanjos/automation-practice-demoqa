describe('Checkboxes validation', () => {
  const element = "Check Box";
  const resources = ['Home', 'Desktop', 'Notes', 'Commands', 'Documents', 'WorkSpace', 'React', 'Angular', 'Veu', 'Office', 'Public', 'Private', 'Classified', 'General', 'Downloads', 'Word  File.doc', 'Excel File.doc'];

  beforeEach(() => {
    cy.accessElementsPageDirectly();
  });

  it('Access DemoQA website', () => {
    cy.accessDemoQA();
  });

  it('Access Elements tab', () => {
    cy.accessDemoQA();
    cy.accessElementsPageByMenu();
  });

  it('Access Check Box tab', () => {
    cy.accessElementsPageDirectly();
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

  it.only('Expand "WorkSpace" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDocuments();
    
    cy.expandAndValidateWorkspaces();
  });

  it.only('Expand "Office" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDocuments();
    
    cy.expandAndValidateOffice();
  });

  it.only('Expand "Downloads" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.expandAndValidateDownloads();
  });

  it.only('Expand all toggles', () => {
    cy.accessCheckbox();
    cy.expandAll();
    cy.validateAll();
  });
}); 