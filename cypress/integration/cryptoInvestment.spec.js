describe("log in and make investment then check portfolio", () => {
  it("user can make investment and check portfolio", () => {
    // Visit homepage
    cy.visit("localhost:3000");
    //   Expand Crypto Accordion
    cy.get("[data-test=bitcoin-card]").click();
    cy.get("[data-test=ethereum-card]").click();
    cy.get("[data-test=bitcoin-card]").click();

    //   Portfolio Page when not logged in
    cy.visit("localhost:3000/callback");
    cy.get("[data-test=bitcoin-card]").click();
    cy.get("[data-test=cardano-card]").click();
    cy.get("[data-test=bitcoin-card]").click();

    //   Go to Invest Page
    cy.findByRole("link", { name: /invest/i }).click();

    // Fill Investment amounts
    const amounts = [ "3000", "7000" ];
    cy.get("[data-test=solana-input]").type(amounts[0]);
    cy.get("[data-test=polkadot-input]").type(amounts[1]);

    //   Check remaining amount and invested amount vs. investment amounts above
    let remaining, invested;

    cy.get("[data-test=amountRemaining]").then(($amountRemaining) => {
      remaining = $amountRemaining.text();

      expect(remaining).to.equal("$0");
    });
    cy.get("[data-test=amountInvested").then(($amountInvested) => {
      invested = `$${parseFloat(amounts[0]) + parseFloat(amounts[1])}`;

      expect(
        $amountInvested.text().replace(/\,|,/g, "").replace(/\ Invested|,/g, "")
      ).to.equal(invested);
    });

    //   Change initial investment amount

    const newInitialAmount = "25000";
    const newRemaining = "15000";

    cy
      .findByRole("combobox", { name: /step 1: choose your initial investment/i })
      .select(newInitialAmount);

    //   Compare new initial investment amount to invested and remaining amounts
    cy.get("[data-test=amountRemaining]").then(($amountRemaining) => {
      const formattedRemaining = new Intl.NumberFormat("en-US").format(newRemaining);
      expect($amountRemaining.text()).to.equal(`$${formattedRemaining}`);
      expect(
        `$${parseInt(newInitialAmount) - parseInt(invested.replace(/\$|,/g, ""))}`
      ).to.equal(`$${formattedRemaining.replace(/\,|,/g, "")}`);
    });
    cy.get("[data-test=amountInvested").then(($amountInvested) => {
      expect(
        $amountInvested.text().replace(/\,|,/g, "").replace(/\ Invested|,/g, "")
      ).to.equal(`$${parseFloat(newInitialAmount) - parseFloat(newRemaining)}`);
    });
  });
});
