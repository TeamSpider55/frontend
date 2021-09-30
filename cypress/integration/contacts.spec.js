describe('Contacts List', () => {
  beforeEach(() => {
    // load page with dummy contacts
    cy.visit('/contacts?dummy=true')
  })

  it('can be navigated to via the sidebar', () => {
    cy.visit('/')
    cy.get('ul').find('a').contains('Contacts').click();
  })

  it('shows correct table headers', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');

    cy.get('@tableHeaderRow').contains('Name');
    cy.get('@tableHeaderRow').contains('Organisation');
    cy.get('@tableHeaderRow').contains('Role');
    cy.get('@tableHeaderRow').contains('Date Added');
  });

  it('can sort by \'Name\' table header', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Name').click();

    // arrow should be indicated
    cy.get('@tableHeaderRow').contains('Name').find('svg').first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');

    // expect the second item to be gte than the first after sorting
    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    let firstVal;
    cy.get('table').find('tbody>tr').first().find('p').then(($p) => {
        firstVal = normalizeText($p.text());
    });
    cy.get('table').find('tbody>tr').first().next().find('p').should(($p) => {
        const secondVal = normalizeText($p.text());
        assert.operator(secondVal, '>=', firstVal);
    });
  });

  it('can sort by \'Organisation\' table header', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Organisation').click();

    cy.get('@tableHeaderRow').contains('Organisation').find('svg').first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    let firstVal;
    cy.get('table').find('tbody>tr').first().find('p').then(($p) => {
        firstVal = normalizeText($p.text());
    });
    cy.get('table').find('tbody>tr').first().next().find('p').should(($p) => {
        const secondVal = normalizeText($p.text());
        assert.operator(secondVal, '>=', firstVal);
    });
  });

  it('can sort by \'Role\' table header', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Role').click();

    cy.get('@tableHeaderRow').contains('Role').find('svg').first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    let firstVal;
    cy.get('table').find('tbody>tr').first().find('p').then(($p) => {
        firstVal = normalizeText($p.text());
    });
    cy.get('table').find('tbody>tr').first().next().find('p').should(($p) => {
        const secondVal = normalizeText($p.text());
        assert.operator(secondVal, '>=', firstVal);
    });
  });

  it('can sort by \'Date Added\' table header', () => {
    cy.get('table').find('thead>tr').as('tableHeaderRow');
    cy.get('@tableHeaderRow').contains('Date Added').click();

    cy.get('@tableHeaderRow').contains('Date Added').find('svg').first()
      .should('have.attr', 'data-testid', 'ArrowDownwardIcon');

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    let firstVal;
    cy.get('table').find('tbody>tr').first().find('p').then(($p) => {
        firstVal = normalizeText($p.text());
    });
    cy.get('table').find('tbody>tr').first().next().find('p').should(($p) => {
        const secondVal = normalizeText($p.text());
        assert.operator(secondVal, '>=', firstVal);
    });
  });

  it('can search by name', () => {
    cy.get('[placeholder="Search..."]').should('match', 'input')
      .type('given9');

    const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase()
    cy.get('table').find('tbody>tr').first().find('p').then(($p) => {
        const val = normalizeText($p.text());
        if (!val.match(/\\*given9\\*/)) {
            throw new Error(`Could not find the searched text`);
        }
    });
  });

  it('can select multiple', () => {
    cy.get('table').find('tbody>tr [type="checkbox"]').first()
      .should('match', 'input').click();

    cy.get('table').find('tbody>tr [type="checkbox"]').last()
      .should('match', 'input').click();
  });
});
