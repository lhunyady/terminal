describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });
  it('Page loads', () => {});

  it('should not redirect when login without proper user', () => {
    cy.get('[data-test-id="email-input"]').clear().type('a');
    cy.get('[data-test-id="pass-input"]').clear().type('a');
    cy.get('[data-test-id="submit-login"]').click();
    cy.location('pathname').should('eq', '/login');
  });

  it('should redirect when login with proper user', () => {
    cy.get('[data-test-id="email-input"]').clear().type('admin@admin.hu');
    cy.get('[data-test-id="pass-input"]').clear().type('admin');
    cy.get('[data-test-id="submit-login"]').click();
    cy.location('pathname').should('eq', '/game');
  });
});
