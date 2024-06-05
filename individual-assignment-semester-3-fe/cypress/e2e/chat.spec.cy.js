describe('User Flow: Friend Requests and Messaging', () => {
  it('should handle friend requests and messaging', () => {
    cy.login('testuser1', 'Password1!');

    cy.contains('Users').click();
    cy.url().should('include', '/users');

    cy.contains('testuser2').click();
    cy.contains('Send Friend Request').click();
    cy.contains('Cancel').click();
    cy.contains('Logout').click();
    cy.url().should('include', '/');

    cy.login('testuser2', 'Password1!');

    cy.contains('Profile').click();
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

    cy.login('testuser1', 'Password1!');

    cy.contains('Profile').click();
    cy.contains('Friends List').should('be.visible').click();
    cy.contains('testuser2').click();
    cy.contains('Open Chat').click();
    cy.url().should('include', '/chat');
    cy.get('input[type="text"]').type('Hi again, this is another test message!');
    cy.contains('Send').click();
  });
});
