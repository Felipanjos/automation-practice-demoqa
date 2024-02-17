import Elements from "./Elements";

export default new class Checkbox {
  isCheckboxPage() {
    cy.url()
      .should('include', 'checkbox');

    cy.get('h1.text-center')
      .should('be.visible')
      .and('have.text', 'Check Box');
  }

  validateTree(tree, state = 'close') {
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
  }

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
  }

  validateFourMainMenus() {
    this.validateTree('Home', 'Open');
    this.batchValidate(['Desktop', 'Documents', 'Downloads']);
  }

  validateWorkSpaces() {
    this.batchValidate(['React', 'Angular', 'Veu']);
  }

  validateOffice() {
    this.batchValidate(['Public', 'Private', 'Classified', 'General']);
  }
  
  validateDownloads() {
    this.batchValidate(['Word File.doc', 'Excel File.doc']);
  }

  expandAndValidateDocuments() {
    this.clickToggle('Documents');
    this.batchValidate(['WorkSpace', 'Office']);
  }

  expandAndValidateDesktop() {
    this.clickToggle('Desktop');
    this.batchValidate(['Notes', 'Commands']);
  }
  
  expandAndValidateWorkspaces() {
    const toggle = 'WorkSpace';
    this.clickToggle(toggle);
    this.validateTree(toggle, 'Open');
    this.validateWorkSpaces();
  }
  
  expandAndValidateOffice() {
    const toggle = 'Office';
    this.clickToggle(toggle);
    this.validateTree(toggle, 'Open');
    this.validateOffice();
  }
  
  expandAndValidateDownloads() {
    const toggle = 'Downloads';
    this.clickToggle(toggle);
    this.validateTree(toggle, 'Open');
    this.validateDownloads();
  }

  expandAll() { 
    cy.get('button[aria-label="Expand all"]')
      .should('be.visible')
      .click();
  }

  batchValidate(batch) { 
    batch.forEach((element) => this.validateTree(element));
  }
  
  validateAll() { 
    /** TODO
     * Create Checkbox POM to unify folder calls 
     */
    this.validateTree('Home', 'Open');
    this.validateTree('Desktop', 'Open');
    this.batchValidate(['Notes', 'Commands']);

    this.validateTree('Documents', 'Open');
    this.validateTree('WorkSpace', 'Open');
    this.batchValidate(['React', 'Angular', 'Veu']);

    this.validateTree('Office', 'Open');
    this.batchValidate(['Public', 'Private', 'Classified', 'General']);

    this.validateTree('Downloads', 'Open');

    this.batchValidate(['Word File.doc', 'Excel File.doc']);
  }
}