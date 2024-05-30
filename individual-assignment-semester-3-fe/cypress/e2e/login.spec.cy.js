
describe('Login Test', () => {
  it('should register then navigate to the login page and successfully log in', () => {
    
    cy.visit('http://localhost:5173/register');
    
    cy.get('form').should('exist');
    
    cy.get('input[name="username"]').type('testuser3');
    cy.get('input[name="email"]').type('testuser3@mail.com');
    cy.get('input[name="password"]').type('Password1!');
    
    cy.get('button[type="submit"]').click();
    
    
    cy.intercept('POST', '**/login').as('postLogin');
    
    cy.visit('http://localhost:5173/login');
    
    cy.get('form').should('exist');
    
    cy.get('input[name="username"]').type('testuser3');
    cy.get('input[name="password"]').type('Password1!');
    
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/');
    
    cy.contains('Logout').should('exist');
  });
});
