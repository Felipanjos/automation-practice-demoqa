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

  // validateCheckboxTree(tree) {
  //   cy.get(`label[for="tree-node-${tree.toLowerCase()}"]`).children().then((label) => {
  //     console.log(label[2].innerHTML);
  //   });
  // },

  // validateCheckboxTree(tree) {
  //   cy.get(`label[for="tree-node-${tree.toLowerCase()}"]`).then((label) => {
  //     console.log(label);
  //     label = label[0];

  //     const elements = {
  //       checkbox: { selector: label.children[1], expectedClass: 'rct-checkbox' },
  //       icon: { selector: label.children[2], expectedClass: 'rct-node-icon' },
  //       homeText: { selector: label.lastChild, text: tree }
  //     };
      
  //     Object.entries(elements).forEach(([elementKey, {selector, expectedClass, text }]) => {
  //       expect(selector).to.be.visible;
      
  //       ['checkbox', 'icon'].includes(elementKey) ? 
  //         expect(selector).to.have.class(expectedClass) : 
  //         expect(selector).to.have.text(text);
  //       });
  //     });
  // },

  validateCheckboxTree(tree, state = 'close') {
    cy.ignoreException();
    const folders = ['Home', 'Desktop', 'Documents', 'WorkSpace', 'Office', 'Downloads'];
    const files = ['Notes', 'Commands', 'React', 'Angular', 'Veu', 'Public', 'Private', 'Classified', 'General', 'World File.doc', 'Excel File.doc'];
    
    cy.get(`label[for="tree-node-${tree.toLowerCase()}"]`).children().then((label) => {
      console.log(label);

      const elements = {
        checkbox: { 
          selector: label[1], 
          expectedClass: 'rct-checkbox'
        },
        icon: {
          selector: label[2], 
          expectedClass: `rct-icon-${folders.includes(tree) ? 'parent' : 'leaf'}-${state.toLocaleLowerCase()}`},
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
    });
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
    cy.validateCheckboxTree('Desktop');
    cy.validateCheckboxTree('Documents');
    cy.validateCheckboxTree('Downloads');
  },

  validateWorkSpaces() {
    cy.validateCheckboxTree('React');
    cy.validateCheckboxTree('Angular');
    cy.validateCheckboxTree('Veu');
  },

  ignoreException(){
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  }
});