import Elements from "./Elements";

export default new class Checkbox {
  constructor () {
    this.folders = ['Home', 'Desktop', 'Documents', 'WorkSpace', 'Office', 'Downloads'];
    this.subMainFolders = ['Desktop', 'Documents', 'Downloads'];
    this.workspaceFiles = ['React', 'Angular', 'Veu'];
    this.officeFiles = ['Public', 'Private', 'Classified', 'General'];
    this.downloadFiles = ['Word File.doc', 'Excel File.doc'];
    this.desktopFiles = ['Notes', 'Commands'];
    this.files = ['React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General', 'Word File.doc', 'Excel File.doc', 'Notes', 'Commands'];
    this.documents = ['WorkSpace', 'Office'];
    
    this.selectors = {
      title: 'h1.text-center',
      expandAll:'button[aria-label="Expand all"]'
    }
  }

  isCheckboxPage() {
    cy.url()
      .should('include', 'checkbox');

    cy.get(this.selectors.title)
      .should('be.visible')
      .and('have.text', 'Check Box');
  }

  validateTree(tree, state = 'close') {
    const resourceType = this.folders.includes(tree) ? 'parent' : 'leaf';
    var treeNode = tree.toLowerCase();
    
    if(this.downloadFiles.includes(tree)) 
      treeNode = tree === 'Word File.doc' ? 'wordFile' : 'excelFile';
    
    cy.get(`label[for="tree-node-${treeNode}"]`).children().then((label) => {
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
      
      Object.entries(elements).forEach(([element, {selector, expectedClass, text}]) => {
        expect(selector).to.be.visible;

        element === 'checkbox' ? 
          expect(selector).to.have.class(expectedClass) : 
        element === 'icon' ?
          expect(selector.innerHTML).to.include(expectedClass) : 
          expect(selector.innerHTML).to.include(text);
      });
    });
  }

  validateOpenFolder(tree)  {
    this.validateTree(tree, 'Open');
  }

  clickToggle(toggle) {
    cy.get('button[title="Toggle"]').then((toggleList) => {
      let home, desktop, documents, workspace, office, downloads;
      
      toggleList.length > 4 ?
        [home, desktop, documents, workspace, office, downloads] = toggleList :
        [home, desktop, documents, downloads] = toggleList;
  
      const targetToggle = (() => {
        let map = {
          'home': home,
          'desktop': desktop,
          'documents': documents,
          'workspace': workspace,
          'office': office,
          'downloads': downloads
        } 
        return map[toggle.toLowerCase()] || home;
      })();

      cy.wrap(toggleList)
        .get(targetToggle)
        .should('be.visible')
        .click();
    });
  }

  validateFourMainMenus() {
    this.validateOpenFolder('Home');
    this.batchValidateTree(this.subMainFolders);
  }

  validateWorkSpaces() {
    this.batchValidateTree(this.workspaceFiles);
  }

  validateOffice() {
    this.batchValidateTree(this.officeFiles);
  }
  
  validateDownloads() {
    this.batchValidateTree(this.downloadFiles);
  }

  expandAndValidateDocuments() {
    this.clickToggle('Documents');
    this.batchValidateTree(this.documents);
  }

  expandAndValidateDesktop() {
    this.clickToggle('Desktop');
    this.batchValidateTree(this.desktopFiles);
  }
  
  expandAndValidateWorkspaces() {
    const toggle = ('WorkSpace');
    this.clickToggle(toggle);
    this.validateOpenFolder(toggle);
    this.validateWorkSpaces();
  }
  
  expandAndValidateOffice() {
    const toggle = 'Office';
    this.clickToggle(toggle);
    this.validateOpenFolder(toggle);
    this.validateOffice();
  }
  
  expandAndValidateDownloads() {
    const toggle = 'Downloads';
    this.clickToggle(toggle);
    this.validateOpenFolder(toggle);
    this.validateDownloads();
  }

  expandAll() { 
    cy.get(this.selectors.expandAll)
      .should('be.visible')
      .click();
  }

  batchValidateTree(batch) { 
    batch.forEach((element) => this.validateTree(element));
  }

  batchValidateOpenFolder(batch) {
    batch.forEach((element) => this.validateOpenFolder(element));
  }
  
  validateAll() { 
    this.batchValidateOpenFolder(this.folders);
    this.batchValidateTree(this.files);
  }
}