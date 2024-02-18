import Home from '../POM/Home';
import Elements from '../POM/Elements';
import Checkbox from '../POM/Checkbox';

describe('Checkboxes validation', () => {
  beforeEach(() => {
    if(!['Access DemoQA website', 'Access Elements through menu'].includes(Cypress.currentTest.title))
      Elements.visit();
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
    Elements.isElementsPage();
  });

  it('Access Check Box tab', () => {
    Elements.clickTab('Check Box');

    Checkbox.isCheckboxPage();

    Checkbox.validateTree('Home');
  });

  it('Expand "Home" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();
    
    Checkbox.validateOpenFolder('Home');
    
    Checkbox.validateFourMainMenus();
  });

  it('Expand "Desktop" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();

    Checkbox.validateFourMainMenus();

    Checkbox.expandAndValidateDesktop();
  });

  it('Expand "Documents" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();

    Checkbox.validateFourMainMenus();

    Checkbox.expandAndValidateDocuments();
  });

  it('Expand "WorkSpace" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();

    Checkbox.validateFourMainMenus();

    Checkbox.expandAndValidateDocuments();
    
    Checkbox.expandAndValidateWorkspaces();
  });

  it('Expand "Office" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();

    Checkbox.validateFourMainMenus();

    Checkbox.expandAndValidateDocuments();
    
    Checkbox.expandAndValidateOffice();
  });

  it('Expand "Downloads" toggle', () => {
    Elements.accessCheckboxAndOpenToggle();

    Checkbox.validateFourMainMenus();

    Checkbox.expandAndValidateDownloads();
  });

  it('Expand all toggles', () => {
    Elements.accessCheckbox();
    Checkbox.expandAll();
    Checkbox.validateAll();
  });
}); 