describe('As a user, I should be able to start the game from the main page, click through choices and see reactions', () => {

  beforeEach(() => {
      cy.visit('http://localhost:3000/story')
  })

    it('should see the title of the app', () => {
        cy.contains('h1', 'A Cat\'s Tail')
    })

    // it('As a user, I should be able to name my cat', () => {
      
    // })

    it('should be able to click the continue button to initialize the game', () => {
      cy.get('button').click()
      cy.contains('h2', 'DAY 1')
      cy.contains('p', 'You notice that your cat, ${catName}, is behaving unusually. ${catName} seems to be able to solve puzzles and is listening to you more intently than ever. You have three choices:')
    })

    it('should give the user a list of choices', () => {
      cy.get('button').click()
      cy.get('button').click()
      cy.get('button').should('have.length', 4)
    })
  


    // it('should ', () => {
  
    // })

});