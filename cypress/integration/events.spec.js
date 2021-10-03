describe('Events List', () => {
  beforeEach(() => {
    // load page with dummy events
    cy.visit('/events?dummy=true');
  });

  it('can be navigated to via the sidebar', () => {
    cy.visit('/');
    cy.get('ul').find('a').contains('Schedule').click();
  });

  it('shows correct table headers', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');

    cy.get('@tableHeaderRow').contains('Title');
    cy.get('@tableHeaderRow').contains('Time');
    cy.get('@tableHeaderRow').contains('Participants');
  });

  it("can sort by 'Title' table header", () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Title').click();

    // arrow should be indicated
    cy.get('@tableHeaderRow')
      .contains('Title')
      .find('svg')
      .first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');

    // expect the second item to be gte than the first after sorting
    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();
    let firstVal;
    cy.get('table')
      .find('tbody>tr')
      .first()
      .find('p')
      .then(($p) => {
        firstVal = normalizeText($p.text());
      });
    cy.get('table')
      .find('tbody>tr')
      .first()
      .next()
      .find('p')
      .should(($p) => {
        const secondVal = normalizeText($p.text());
        assert.operator(secondVal, '>=', firstVal);
      });
  });

  it("can sort by 'Time' table header", () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Time').click();

    // arrow should be indicated
    cy.get('@tableHeaderRow')
      .contains('Time')
      .find('svg')
      .first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');
  });

  it('can select multiple', () => {
    cy.get('table')
      .find('tbody>tr [type="checkbox"]')
      .first()
      .should('match', 'input')
      .click();

    cy.get('table')
      .find('tbody>tr [type="checkbox"]')
      .last()
      .should('match', 'input')
      .click();
  });

  it('can search by valid date by typing (leap year test)', () => {
    // from the 1st january of 2063 to 29 February of 2064
    cy.contains('From').parent().find('input').clear().type('01012063');
    cy.contains('To').parent().find('input').clear().type('29022064');
  });

  it('can search by invalid date by selecting', () => {
    // user selects the 15th of the current month
    cy.contains('From').parent().find('button').click();
    cy.get('.MuiCalendarPicker-root').contains('15').click();

    // user selects the 13th of the current month
    cy.contains('To').parent().find('button').click();
    cy.get('.MuiCalendarPicker-root').contains('13').click();

    cy.contains('Invalid Date Range!');
  });
});
