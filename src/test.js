// >> tests-snippet
describe("Greeter", function() {
    let near;
    let contract;
    let accountId;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    // Common setup below
    beforeAll(async function() {
      if (window.testSettings === undefined) {
        window.testSettings = {};
      }
      near = await nearlib.dev.connect(testSettings);
      accountId = testSettings.accountId ? testSettings.accountId : nearlib.dev.myAccountId;
      const contractName = testSettings.contractName ?
        testSettings.contractName :
        (new URL(window.location.href)).searchParams.get("contractName");
      contract = await near.loadContract(contractName, {
        // NOTE: This configuration only needed while NEAR is still in development
        // View methods are read only. They don't modify the state, but usually return some value.
        viewMethods: ["hello", "getItems"],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: ["addItem", "init"],
        sender: accountId
      });
    });

    // Multiple tests can be described below. Search Jasmine JS for documentation.
    describe("simple", function() {
      beforeAll(async function() {
        // There can be some common setup for each test.
      });

      it("get hello message", async function() {
        const result = await contract.hello();
        //expect(result).toBe("Hello, world");
      });

      it("inventory tests", async function() {
        await contract.init({isTest: true});
        const emptyInv = await contract.getItems({accountId});
        expect(emptyInv).toEqual({
          accountId,
          "items": []
        });
        const expectedItem1 = {"name": "myItem", "source": accountId};
        const expectedItem2 = {"name": "myItem2", "source": accountId};
        const resultAdd = await contract.addItem({accountId, itemId: "myItem"});
        const result = await contract.getItems({accountId});
        expect(result).toEqual( {accountId, "items": [expectedItem1]});

        const resultAdd2 = await contract.addItem({accountId, itemId: "myItem2"});
        const result2 = await contract.getItems({accountId});
        expect(result2).toEqual( {accountId, "items": [expectedItem1, expectedItem2]});
      });
  });
});
// << tests-snippet
