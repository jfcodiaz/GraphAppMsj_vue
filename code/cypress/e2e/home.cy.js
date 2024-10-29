describe('Display Join Form', () => {
  it('debe permitir a un usuario iniciar sesión', () => {
    cy.visit('http://host.docker.internal:8085');
    cy.contains('Welcome').should('exist');
    cy.contains('input', 'Join').should('exist');
    cy.contains('GraphApp Messeger').should('exist');
  });
});
