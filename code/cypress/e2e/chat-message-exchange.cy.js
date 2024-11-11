const { faker } = require('@faker-js/faker');

describe('Chat Functionality with Multiple Users', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  Cypress.Commands.add('joinChat', (username) => {
    cy.get('input[placeholder^="Enter your"]').as('input');
    cy.get('@input').clear();
    cy.get('@input').type(username);

    cy.get('input[type="submit"]').contains('Join').click();
  });

  Cypress.Commands.add('sendMessage', (message) => {
    cy.get('input[placeholder^="Type your"]').as('input');
    cy.get('@input').type(message);
    cy.get('@input').type('{enter}');
    cy.contains(message).should('exist');
  });

  it('should allow two users to join the chat, send messages, and verify message exchange', () => {
    // User 1 joins and sends a message
    cy.joinChat('user1');
    const messageUser1 = 'Hello from user1!';
    cy.sendMessage(messageUser1);
    cy.get('button.btn-exit').should('exist').click();

    // User 2 joins, sends a message, and verifies both messages are visible
    const messageUser2 = faker.lorem.sentence();
    cy.joinChat('user2');
    cy.sendMessage(messageUser2);

    // Verify that User 2 sees User 1's message
    cy.contains(messageUser1).should('exist');

    // User 2 disconnects
    cy.get('button.btn-exit').should('exist').click();

    // User 1 rejoins and verifies the message from User 2 is visible
    cy.joinChat('user1');
    cy.contains(messageUser2).should('exist');
  });
});
