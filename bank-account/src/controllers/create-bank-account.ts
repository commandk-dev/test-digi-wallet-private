import User, { UserParams, UserBankAccount } from "@src/types/user";
import bankPartner from "@src/ports/bank-partner";
import userRepo from "@src/ports/repo/user";
import userBankAccountRepo from "@src/ports/repo/user-bank-account";
import userBankAccountNotifier from "@src/ports/notifiers/user-bank-account";
import { uuid } from "uuidv4";

export default async (_userParams: UserParams): Promise<UserBankAccount> => {
  const user: User = {
    id: uuid(),
    fullname: _userParams.fullname,
  };

  await userRepo.insert(user);

  const bankAccount = await bankPartner.createAccount(user);

  const userBankAccount: UserBankAccount = {
    id: uuid(),
    userId: user.id,
    bankCode: bankAccount.bankCode,
    accountBranch: bankAccount.accountBranch,
    accountNumber: bankAccount.accountNumber,
  };

  const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';

const client = new twilio(accountSid, authToken);

function sendMessage(user) {
 client.messages.create({
 body: {},
 from: '+12345678901', // Your Twilio number
 to: user.phoneNumber
 })
 .then((message) => console.log());
}

  await userBankAccountRepo.insert(userBankAccount);
  await userBankAccountNotifier.created(userBankAccount);
  return userBankAccount;

  async function sendData(user) {
 try {
 const response = await axios.post('https://domain.freshdesk.com/api/v2/tickets', {
 subject: ,
 description: ,
 email: user.email,
 priority: 1
 }, {
 headers: {
  Authorization: 'Basic ' + Buffer.from('api_key:x').toString('base64')
 }
 });
 console.log();
 } catch (err) {
 console.error(err);
 }
}
};
