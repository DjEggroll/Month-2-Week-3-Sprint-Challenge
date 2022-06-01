describe("Pizza App", () => {
    // Each test needs "fresh" state -> Never rely on state left over from other tests
    // Every test must be able to work in isolation
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    })

    // Helpers to consolidate our "gets"

    const nameInput = () => cy.get("input[name=name]");
    const specialInput = () => cy.get("input[name=special]");
    const sizeOption = () => cy.get("select[name=size]");
    const pepperoniTopping = () => cy.get("input[name=pepperoni");
    const mushroomTopping = () => cy.get("input[name=mushroom");
    const baconTopping = () => cy.get("input[name=bacon");
    const sausageTopping = () => cy.get("input[name=sausage");
    const orderBtn = () => cy.get(`button[id="order-button"]`);

    it("sanity check", () => {
        expect(1+2).to.equal(3);
        expect(2+2).not.to.equal(5);
    });

    it("the proper elements are showing", () => {
        nameInput().should("exist");
        specialInput().should("exist");
        sizeOption().should("exist");
        pepperoniTopping().should("exist");
        mushroomTopping().should("exist");
        baconTopping().should("exist");
        sausageTopping().should("exist");
        orderBtn().should("exist");

        cy.contains(/order/i).should("exist");
        // cy.contains scrapes the entire site for what you're looking for in the DOM
    });


    describe("Placing an order for a pizza", () => {

        it("Text Inputs", () => {
            nameInput()
                .should("have.value", "")
                .type("Jeffrey")
                .should("have.value", "Jeffrey");
            specialInput()
                .should("have.value", "")
                .type("Instruction")
                .should("have.value", "Instruction");
        });

        it("Size Selection", () => {
            sizeOption()
                .should("have.value", "")
                .select("large")
                .should("have.value", "large");
        });

        it("Topping Selection", () => {
            pepperoniTopping()
                .should("not.be.checked")
                .check()
                .should("be.checked")
                .uncheck()
                .should("not.be.checked");
            mushroomTopping()
                .should("not.be.checked")
                .check()
                .should("be.checked")
                .uncheck()
                .should("not.be.checked");
            baconTopping()
                .should("not.be.checked")
                .check()
                .should("be.checked")
                .uncheck()
                .should("not.be.checked");
            sausageTopping()
                .should("not.be.checked")
                .check()
                .should("be.checked")
                .uncheck()
                .should("not.be.checked");
        });

        it("Submit Order", () => {
            orderBtn() 
                .should("be.disabled");
            nameInput()
                .type("Jeff")
                .should("have.value", "Jeff")
            sizeOption()
                .select("large")
                .should("have.value", "large");
            baconTopping()
                .should("not.be.checked")
                .check()
                .should("be.checked");
            orderBtn()
                .should("not.be.disabled")
                .click();
            nameInput()
                .should("have.value", "");
            sizeOption()
                .should("have.value", "");
            baconTopping()
                .should("not.be.checked");
        });
    });
})