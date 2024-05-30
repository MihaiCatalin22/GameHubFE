describe('User Flow: Friend Requests and Messaging', () => {
    
    it('should handle friend requests and messaging', () => {
      // Login as testuser1
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="username"]').type('testuser1');
      cy.get('input[name="password"]').type('Password1!');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/');
      cy.contains('Logout').should('exist');
      
      cy.contains('Users').click();
      cy.url().should('include', '/users');
      
      cy.contains('testuser2').click();
      cy.contains('Send Friend Request').click();
      cy.contains('Cancel').click();
      cy.contains('Logout').click();
      cy.url().should('include', '/');
      
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="username"]').type('testuser2');
      cy.get('input[name="password"]').type('Password1!');
      cy.get('button[type="submit"]').click();
 
      cy.url().should('include', '/');
      cy.contains('Logout').should('exist');
      
      cy.contains('Profile').click();
      cy.url().should('include', '/profile');
      
      cy.contains('Pending Requests').click();
      cy.contains('testuser1').parent().contains('Accept').click();
      cy.contains('Cancel').click();

      cy.contains('Profile').click();
      cy.contains('Friends').click();
      cy.url().should('include', '/friends');
      
      cy.contains('testuser1').click();
      cy.contains('Open Chat').click();
      cy.url().should('include', '/chat');
      
      cy.get('input[type="text"]').type('Hello, this is a test message!');
      cy.contains('Send').click();
      
      cy.contains('Logout').click();
      cy.url().should('include', '/');
      
      cy.visit('http://localhost:5173/login');
      cy.get('input[name="username"]').type('testuser1');
      cy.get('input[name="password"]').type('Password1!');
      cy.get('button[type="submit"]').click();
      
      cy.url().should('include', '/');
      cy.contains('Logout').should('exist');
      
    

      cy.contains('Profile').click();

      cy.contains('Friends List').click();
      cy.contains('testuser2').click();
      cy.contains('Open Chat').click();
      cy.url().should('include', '/chat');
      cy.get('input[type="text"]').type('Hi again, this is another test message!');
      cy.contains('Send').click();
    });
  });
  