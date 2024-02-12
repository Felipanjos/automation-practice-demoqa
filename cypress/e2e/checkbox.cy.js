describe('Checkboxes validation', () => {
  const element = "Check Box";
  const folders = ['home desktop notes commands documents workspace react angular veu office public private classified general downloads worldFile excelFile'];

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

    cy.url()
      .should('include', 'checkbox');

    cy.get('div.main-header')
      .should('be.visible')
      .and('have.text', element);

    cy.validateCheckboxTree('Home');
  });

  it.only('Expand "Home" toggle', () => {
    cy.accessCheckboxAndOpenToggle();
    
    cy.validateCheckboxTree('Home', 'Open');
    
    cy.validateFourMainMenus();
    cy.ignoreException();
  });

  it('Expand "Desktop" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.clickToggle('Desktop');

    cy.validateCheckboxTree('Notes');
    cy.validateCheckboxTree('Commands');
    cy.ignoreException();
  });

  it('Expand "Documents" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.clickToggle('Documents');

    cy.validateCheckboxTree('WorkSpace');
    cy.validateCheckboxTree('Office');
    cy.ignoreException();
  });

  it('Expand "WorkSpace" toggle', () => {
    cy.accessCheckboxAndOpenToggle();

    cy.validateFourMainMenus();

    cy.clickToggle('Documents');

    cy.validateCheckboxTree('WorkSpace');
    
    cy.clickToggle('WorkSpace');
    cy.validateCheckboxTree('WorkSpace', 'Open');

    cy.validateWorkSpaces();
    cy.validateCheckboxTree('Office');

    cy.ignoreException();
  });
}); 