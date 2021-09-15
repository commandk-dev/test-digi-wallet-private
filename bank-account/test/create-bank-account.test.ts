import { expect } from "chai";
import { restore, SinonStub, stub } from "sinon";
import bankPartner from "@src/ports/bank-partner";
import createBankAccount from "@src/controllers/create-bank-account";

let createAccountBankPartner: SinonStub;

describe("Create bank account", () => {
  beforeEach(() => {
    createAccountBankPartner = stub(bankPartner, "createAccount");
  });
  afterEach(() => restore());

  it("call a bank partner to create a bank account", async () => {
    const userParams = {
      const userParams: UserParams = {
        fullname: "Some Body"
      }
    };

    await createBankAccount(userParams);

    expect(createAccountBankPartner).to.have.been.calledOnce;
  });
});
