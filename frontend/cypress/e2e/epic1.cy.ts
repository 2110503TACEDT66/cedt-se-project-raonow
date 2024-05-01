describe('member system', () => {
  it('should be able to visit page', () => {
    cy.visit('http://localhost:3000')
  })
  it('should be able to register', ()=>{
    cy.visit('http://localhost:3000/register')
    //Arrange
    const name = 'cypress'
    const email = 'cypress@user.com'
    const telephoneNumber = '0951245967'
    //Act
    cy.get('#name').type(name) 
    cy.get('#email').type(email)
    cy.get('#password').type('111111111')
    cy.get('#telephoneNumber').type(telephoneNumber)
    cy.get('button[type="submit"]').click()
    //
    cy.contains('User created successfully').should('be.visible')
  })
})