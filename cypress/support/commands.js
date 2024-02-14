Cypress.Commands.addAll({
  accessDemoQA() {
    cy.ignoreException();
    cy.visit('https://demoqa.com');
    cy.get('header')
      .should('be.visible')
      .find('img').should('have.attr', 'src').should('include', 'Toolsqa');
  },

  accessElementsPageByMenu() {
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

  accessElementsPageDirectly() {
    cy.accessDemoQA();
    cy.accessElementsPageByMenu();
  },

  clickTab(tab) {
    cy.get('#item-1')
    .should('be.visible')
    .should('have.text', tab)
    .click();
  },

  assertCheckboxPage() {
    cy.url()
      .should('include', 'checkbox');

    cy.get('div.main-header')
      .should('be.visible')
      .and('have.text', 'Check Box');
  },

  validateCheckboxTree(tree, state = 'close') {
    const folders = ['Home', 'Desktop', 'Documents', 'WorkSpace', 'Office', 'Downloads'];
    const resourceType = folders.includes(tree) ? 'parent' : 'leaf';
    var treeNode = tree.toLowerCase();
    
    if(['Word File.doc', 'Excel File.doc'].includes(tree)) 
        treeNode = tree === 'Word File.doc' ? 'wordFile' : 'excelFile';
    
    cy.get(`label[for="tree-node-${treeNode}"]`).children().then((label) => {
      // home
      const elements = {
        checkbox: { 
          selector: label[1], 
          expectedClass: 'rct-checkbox'
        },
        icon: {
          selector: label[2], 
          expectedClass: `rct-icon-${resourceType}-${state.toLowerCase()}`},
        homeText: {
          selector: label[3], 
          text: tree
        }
      };
      
      Object.entries(elements).forEach(([elementKey, {selector, expectedClass, text}]) => {
        expect(selector).to.be.visible;

        elementKey === 'checkbox' ? 
          expect(selector).to.have.class(expectedClass) : 
        elementKey === 'icon' ?
          expect(selector.innerHTML).to.include(expectedClass) : 
          expect(selector.innerHTML).to.include(text);
      });

      cy.ignoreException();
    });
  },

  accessCheckbox() {
    cy.ignoreException();
    cy.clickTab('Check Box');
  },
  
  accessCheckboxAndOpenToggle() {
    cy.ignoreException();
    cy.clickTab('Check Box');
    cy.clickToggle('Home');
  },

  clickToggle(toggle) {
    cy.get('button[title="Toggle"]').then((toggleList) => {
      let home, desktop, documents, workspace, office, downloads;
      
      toggleList.length > 4 ?
        [home, desktop, documents, workspace, office, downloads] = toggleList :
        [home, desktop, documents, downloads] = toggleList;

      const toggleMap = {
        'home': home,
        'desktop': desktop,
        'documents': documents,
        'workspace': workspace,
        'office': office,
        'downloads': downloads,
      };
      
      let targetToggle = toggleMap[toggle.toLowerCase()] || home;

      cy.wrap(toggleList)
        .get(targetToggle)
        .should('be.visible')
        .click();
    });
  },

  validateFourMainMenus() {
    cy.validateCheckboxTree('Home', 'Open');
    cy.batchValidate(['Desktop', 'Documents', 'Downloads']);
  },

  validateWorkSpaces() {
    cy.batchValidate(['React', 'Angular', 'Veu']);
  },

  validateOffice() {
    cy.batchValidate(['Public', 'Private', 'Classified', 'General']);
  },
  
  validateDownloads() {
    cy.batchValidate(['Word File.doc', 'Excel File.doc']);
  },

  expandAndValidateDocuments() {
    cy.clickToggle('Documents');
    cy.batchValidate(['WorkSpace', 'Office']);
  },

  expandAndValidateDesktop() {
    cy.clickToggle('Desktop');
    cy.batchValidate(['Notes', 'Commands']);
    cy.ignoreException();
  },
  
  expandAndValidateWorkspaces() {
    const toggle = 'WorkSpace';
    cy.clickToggle(toggle);
    cy.validateCheckboxTree(toggle, 'Open');
    cy.validateWorkSpaces();
    cy.ignoreException();
  },
  
  expandAndValidateOffice() {
    const toggle = 'Office';
    cy.clickToggle(toggle);
    cy.validateCheckboxTree(toggle, 'Open');
    cy.validateOffice();
    cy.ignoreException();
  },
  
  expandAndValidateDownloads() {
    const toggle = 'Downloads';
    cy.clickToggle(toggle);
    cy.validateCheckboxTree(toggle, 'Open');
    cy.validateDownloads();
    cy.ignoreException();
  },

  expandAll() { 
    cy.get('button[aria-label="Expand all"]')
      .should('be.visible')
      .click();
  },

  batchValidate(batch) { 
    batch.forEach((element) => cy.validateCheckboxTree(element));
  },
  
  validateAll() { 
    /** TODO
     * Create Checkbox POM to unify folder calls 
     */
    cy.validateCheckboxTree('Home', 'Open');
    cy.validateCheckboxTree('Desktop', 'Open');
    cy.batchValidate(['Notes', 'Commands']);

    cy.validateCheckboxTree('Documents', 'Open');
    cy.validateCheckboxTree('WorkSpace', 'Open');
    cy.batchValidate(['React', 'Angular', 'Veu']);

    cy.validateCheckboxTree('Office', 'Open');
    cy.batchValidate(['Public', 'Private', 'Classified', 'General']);

    cy.validateCheckboxTree('Downloads', 'Open');

    cy.batchValidate(['Word File.doc', 'Excel File.doc']);
  },

  ignoreException(){
    Cypress.on('uncaught:exception', (err, runnable) => {return false});
  }
});