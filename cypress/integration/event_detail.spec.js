describe('Event Detail', () => {
  beforeEach(() => {
    // load page with dummy event
    cy.visit('/events/9?dummy=true');
  });

  it('cannot edit date directly by typing', () => {
    cy.contains('Start')
      .parent()
      .find('input')
      .should('have.attr', 'readonly');
  });

  it('can save edits to date and participants', () => {
    cy.get('[data-testid="EditIcon"]').click();

    cy.contains('Start')
      .parent()
      .find('button')
      .click()

    cy.get('.MuiCalendarPicker-root').contains('8').click();

    cy.get('[value="Meeting with Bean and Beanz"]').clear().type("new name");

    cy.get('[data-testid="CancelIcon"]').first().click();

    cy.get('[data-testid="DoneIcon"]').click();
  });

  it('can cancel deletion of participants', () => {
    cy.get('[data-testid="EditIcon"]').click();

    cy.get('[value="Meeting with Bean and Beanz"]').clear().type("new name");

    cy.get('[data-testid="CancelIcon"]').first().click();

    cy.get('[data-testid="ClearIcon"]').click();
  });
});
