describe('Game tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/').then(() => {
      cy.get('[data-test-id="email-input"]')
        .type('a')
        .then(() => {
          cy.contains('admin@admin.hu')
            .click()
            .then(() => {
              cy.get('[data-test-id="pass-input"]')
                .clear()
                .then(() => {
                  cy.get('[data-test-id="pass-input"]')
                    .type('admin')
                    .then(() => {
                      cy.get('[data-test-id="submit-login"]')
                        .click()
                        .then(() => {
                          cy.location('pathname').should('eq', '/game');
                        });
                    });
                });
            });
        });
    });
  });

  it('Crossing works', () => {
    selectNOnPanelK(1, 1).then(() => {
      cy.get('[data-test-id="single-number"]').contains('X');
    });
  });

  it('Play should write proper values', () => {
    selectNOnPanelK(5, 2).then(() => {
      pressRandomOnPanelN(3).then(() => {
        selectNOnPanelK(7, 4).then(() => {
          cy.get('[data-test-id="play-btn"]')
            .click()
            .then(() => {
              cy.contains('Panel 1: empty').should('be.visible');
              cy.contains('Panel 2: Error: 1 mark(s) are missing').should(
                'be.visible'
              );
              cy.should('not.include.text', 'Panel 3: Error:');
              cy.should('not.include.text', 'Panel 3: empty');
              cy.contains('Panel 4: Error: Please remove 1 mark(s)').should(
                'be.visible'
              );
            });
        });
      });
    });
  });

  const pressRandomOnPanelN = (n: number) => {
    return cy
      .get('[data-test-id="number-selector"]')
      .eq(n - 1)
      .within(() => {
        cy.get('[data-test-id="random"]')
          .click()
          .then(() =>
            cy.get('[data-test-id="cross"]').should('have.length', 6)
          );
      });
  };

  const selectNOnPanelK = (n: number, k: number) => {
    return cy
      .get('[data-test-id="number-selector"]')
      .eq(k - 1)
      .within(() => {
        for (let i = 1; i <= n; i++) {
          selectNth(i);
        }
      });
  };

  const selectNth = (n: number) => {
    cy.get('[data-test-id="single-number"]')
      .eq(n - 1)
      .click();
  };
});
