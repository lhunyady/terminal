describe("Login tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/");
  });
  it("Page loads", () => {});

  it("Should not redirect when login without proper user", () => {
    cy.get('[data-test-id="pass-input"]').clear().type("a");
    cy.get('[data-test-id="submit-login"]').click();
    cy.contains("Password incorrect!").should("be.visible");
    cy.get('[data-test-id="submit-login"]').should("be.disabled");
    cy.location("pathname").should("eq", "/login");
  });

  it("Email required", () => {
    cy.get('[data-test-id="email-input"]').click;
    cy.get(".ant-select-clear").click();
    cy.get('[data-test-id="submit-login"]').should("be.disabled");
    cy.contains("Please input your email!").should("be.visible");
  });

  it("Pass required", () => {
    cy.get('[data-test-id="pass-input"]').clear();
    cy.get('[data-test-id="submit-login"]').should("be.disabled");
    cy.contains("Please input your password!").should("be.visible");
  });

  it("Should redirect when login with proper user", () => {
    cy.get('[data-test-id="email-input"]').type("a");
    cy.contains("admin@admin.hu").click();
    cy.get('[data-test-id="pass-input"]').clear().type("admin", { delay: 300 });
    cy.get('[data-test-id="submit-login"]').click();
    cy.location("pathname").should("eq", "/game");
  });

  it("Logout should redirect to login page", () => {
    cy.get('[data-test-id="email-input"]')
      .type("a")
      .then(() => {
        cy.contains("admin@admin.hu")
          .click()
          .then(() => {
            cy.get('[data-test-id="pass-input"]')
              .clear()
              .then(() => {
                cy.get('[data-test-id="pass-input"]')
                  .type("admin", { delay: 300 })
                  .click()
                  .then(() => {
                    cy.wait(1000).then(() => {
                      cy.get('[data-test-id="submit-login"]')
                        .click()
                        .then(() => {
                          cy.location("pathname").should("eq", "/game");
                          cy.contains("Logout").click({
                            waitForAnimations: true,
                          });
                          cy.location("pathname").should("eq", "/login");
                        });
                    });
                  });
              });
          });
      });
  });
});
