describe('member system', () => {
  it('should be able to visit page', () => {
    cy.visit('http://localhost:3000')
  })
  it('should be able to register and sign in', ()=>{
    cy.visit('http://localhost:3000/register')
    cy.intercept('POST','/user').as('new-user')
    cy.wait('@new-user').should('have.property', 'response.statusCode', 201)
    cy.get('@new-user').its('request.body').should('deep.equal', JSON.stringify({
      name: 'cypress',
      email: 'cypress@user.com',
      telephoneNumber: '0951245967'
    })
    )
  })
})