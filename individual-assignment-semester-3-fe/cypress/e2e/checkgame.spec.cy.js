describe('User Flow: Login and View Games', () => {
    it('should log in, navigate to the games page and checkout a specific game', () => {
      cy.intercept('POST', '**/users/login').as('loginRequest');
  
      cy.visit('http://localhost:5173/login');
  
      cy.get('input[name="username"]').type('testuser1');
      cy.get('input[name="password"]').type('Password1!');
      cy.get('button[type="submit"]').click();
  
    
      cy.contains('Games').click();
  
      cy.contains('Kingdoms of Valor').click();
  
      cy.url().should('include', '/games/');
      cy.contains('Purchase').should('exist');
  
    });
  });
  