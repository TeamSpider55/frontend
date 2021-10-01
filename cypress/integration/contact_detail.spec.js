describe('Contact Detail', () => {
  beforeEach(() => {
    // load page with dummy contact
    cy.visit('/contacts/9?dummy=true');
  });

  it('cannot edit email or phone number directly', () => {
    cy.get('[name="email"]').should('have.attr', 'readonly');
    cy.get('[name="phone"]').should('have.attr', 'readonly');
  });

  it('can save edits', () => {
    cy.get('[data-testid="EditIcon"]').click();

    cy.get('[name="email"]').clear().type('new.email@gmail.com');
    cy.get('[name="phone"]').clear().type('+123456789');
    cy.get('[name="location"]').clear().type('1 M Road');
    cy.get('[id="description"]').clear().type('lorem ipsum');

    cy.get('[data-testid="DoneIcon"]').click();
  });

  it('can cancel edits to phone number', () => {
    cy.get('[data-testid="EditIcon"]').click();

    cy.get('[name="phone"]').clear().type('+123456789');
    cy.get('[name="location"]').clear().type('1 M Road');
    cy.get('[id="description"]').clear().type('lorem ipsum');

    cy.get('[data-testid="ClearIcon"]').click();

    cy.get('[name="phone"]').should('have.attr', 'readonly');
    cy.get('[name="phone"]')
      .invoke('attr', 'value')
      .should('equal', '+61123456789');
  });
});
