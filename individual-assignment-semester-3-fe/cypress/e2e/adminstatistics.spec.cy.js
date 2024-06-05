describe('Admin View Sales Statistics', () => {
    before(() => {
        cy.login('testuser2', 'Password1!');
    })

    it('should view the sales statistics page', () => {
        cy.contains('Games').click();
        cy.contains('View Sales Statistics').click();

        cy.contains('Total Revenue').should('exist');
    })
})