describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/');
  });
  it('Page loads', () => {});

  it('should not redirect when login without proper user', () => {
    cy.get('[data-test-id="pass-input"]').clear().type('a');
    cy.get('[data-test-id="submit-login"]').click();
    cy.contains('Password incorrect!').should('be.visible');
    cy.get('[data-test-id="submit-login"]').should('be.disabled');
    cy.location('pathname').should('eq', '/login');
  });

  it('email required', () => {
    cy.get('[data-test-id="email-input"]').click;
    cy.get('.ant-select-clear').click();
    cy.get('[data-test-id="submit-login"]').should('be.disabled');
    cy.contains('Please input your email!').should('be.visible');
  });

  it('pass required', () => {
    cy.get('[data-test-id="pass-input"]').clear();
    cy.get('[data-test-id="submit-login"]').should('be.disabled');
    cy.contains('Please input your password!').should('be.visible');
  });

  it('should redirect when login with proper user', () => {
    cy.get('[data-test-id="email-input"]').type('a');
    cy.contains('admin@admin.hu').click();
    cy.get('[data-test-id="pass-input"]').clear().type('admin');
    cy.get('[data-test-id="submit-login"]').click();
    cy.location('pathname').should('eq', '/game');
  });
});
