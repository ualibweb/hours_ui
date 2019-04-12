describe('hours app', () => {

  describe('list', () => {
    it('successfully loads', () => {
      cy.visit('/')
    })
    it('has a table with 5 items', () => {
      cy.get('.hours-list table')
        .find('tbody')
        .should('have.length', 5)
    })
    it('clicks link to full hours', () => {
      cy.contains('Hours & Locations')
        .click()
      cy.url()
        .should('include', '/#/hours')
    })
    it('goes back to homepage', () => {
      cy.contains('The University of Alabama Libraries')
        .click()
    })
    it('clicks the link for gorgas', () => {
      cy.contains('Gorgas Library').click()
    })
  })
  
  describe('hours page', () => {
    it('loads /hours page for gorgas', () => {
      cy.url()
        .should('include', '/hours?library=Gorgas%20Library')
     })
    it('checks the breadcrumbs', () => {
      cy.get('.breadcrumb li')
        .should('have.length', 2)
        .first()
        .find('a')
        .should('have.attr', 'href', '/#/home')
        // .next()
        // .find('a')
        // .should('have.att', 'href', '/#/hours')
        // need to figure out how to achieve this without too much hardship
    })
    describe('checks the contact info', () => {
      it('email link ends in "@ua.edu"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.email"] a')
                .should('contain', '@ua.edu')
          })
      })
      it('phone number includes "(205)"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.phone"] a')
                .should('contain', '(205)')
          })
      })
      it('"learn more" link is for gorgas', () => {
          cy.get('.well')    
            .should('contain', 'Gorgas')  
          cy.get('.well a.btn')
            .should('have.attr', 'href', '/libraries/gorgas/')
      })
    })
     describe('checks for page elements', () => {
       it('"typcial schedule" button is active', () => {
          cy.get('.hours-calendar .btn-group')
            .children('.active')
            .should('contain', 'Typical Schedule')
       })
       it('should show table of hours', () => {
          cy.get('.hours-calendar table')
            .should('exist')
            .and('be.visible')
       })
       it('should load a map', () => {
          cy.get('ng-map')
            .should('exist')
            .and('be.visible')
       })
    })
  })

  describe('calendar module', () => {
    // need to show difference between typical schedule and calendar views
    // ng-show="!calView" and ng-hide toggle for typical schedule
    it('checks "typical schedule" behavior', () => {
      //div with !calView should be visible
      cy.get('[ng-show="!calView"]')
        .should('be.visible')
        .find('.hours')
        .should('have.length', 7)
        .and('contain', '12 pm to  2 am')
      cy.get('[ng-show="calView"]')
        .should('have.class', 'ng-hide')
        .and('not.be.visible')
    })
    it('clicks the button for "calendar and exceptions"', () => {
      cy.contains('Calendar & Exceptions').click()
        .should('have.class', 'active')
      //should show calendar
      cy.get('[ng-show="calView"]')
        .should('be.visible')
        //should have so many rows
        //should not show times on previous dates
        //next month's days should be greyed out
    })  
    it('clicks next button on calendar', () => {
      //should view next month's calendar
    })
  })

  describe('hours-locations module', () => {
    it('clicks a different library in menu', () => {
      cy.contains('.hidden-sm ul li', 'Hoole').should('be.visible')
      .click()
      cy.url()
        .should('include', '/hours?library=hoole')
      //change view to new library
      //check all calendars/maps still loading
    })
  })

  describe('map function', () => {
    it('loads the location in google map', () => {
     //who knows 
    })
  })

})
