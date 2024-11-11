describe('validate validations of lobby screen', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[placeholder^="Enter your"]').as('inputUsername');
  });

  Cypress.Commands.add('joinChat', () => {
    cy.get('input[type="submit"]').contains('Join').click();
  });

  it('should display an error message when the username is not entered', () => {
    cy.joinChat();
    cy.contains('Please enter a username').should('exist');
  });

  it('should display an error message when the username start with a number', () => {
    cy.get('@inputUsername').clear();
    cy.get('@inputUsername').type('3a');
    cy.joinChat();
    cy.contains('The username cannot start with a number').should('exist');
  });

  it('should display an error message when the username is not entered', () => {
    cy.joinChat();
    cy.contains('Please enter a username').should('exist');
  });

  it('should not allow special characters in the username', () => {
    cy.get('@inputUsername').clear();
    cy.get('@inputUsername').type('!@#$%^&*()');
    cy.get('input[placeholder^="Enter your"]').should('have.value', '');
  });

  it('should submit the form when Enter key is pressed', () => {
    cy.get('@inputUsername').clear();
    cy.get('@inputUsername').type('validUsername{enter}');
    cy.get('input[placeholder^="Type your"]').should('exist');
  });
});
