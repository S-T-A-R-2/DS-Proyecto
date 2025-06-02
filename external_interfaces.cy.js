describe('Verificación de interfaces externas', () => {
  it('GET /api/getmedicines debe responder 200', () => {
    cy.request('GET', 'http://localhost:5000/api/getmedicines').its('status').should('eq', 200);
  });

  it('POST /api/login debe responder 200', () => {
    cy.request('POST', 'http://localhost:5000/api/login', { username: 'oscar', password: 'oscar' })
      .its('status').should('eq', 201);
  });

  it('GET /api/get-all-invoice debe responder 201', () => {
    cy.request('GET', 'http://localhost:5000/api/get-all-invoice').its('status').should('eq', 201);
  });
  
  it('POST /api/getBenefitInfo debe responder 201', () => {
    cy.request('POST', 'http://localhost:5000/api/getBenefitInfo', { username: 'oscar' }).its('status').should('eq', 201);
  });
  
  it('GET /api/get-all-exchanges debe responder 201', () => {
    cy.request('GET', 'http://localhost:5000/api/get-all-exchanges').its('status').should('eq', 201);
  });
});