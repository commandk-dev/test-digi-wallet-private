import { UserBankAccount } from "@src/types/user";
import { SQS } from 'aws-sdk';
import process from 'process';
import userBankAccount from "../notifiers/user-bank-account";

const sqs = new SQS();
const accountId = process.env["AWS_ACCOUNT_ID"]
const queueName = process.env["AWS_SQS_QUEUE_NAME"]
const region = process.env["AWS_REGION"]

const insert = async (_userBankAccount: UserBankAccount): Promise<void> => {
  const queueUrl: string = `https://sqs.${region}.amazonaws.com/${accountId}/${queueName}`
  try {
    await sqs.sendMessage({
      QueueUrl: queueUrl,
      MessageBody: {
        userPhoneNumber: getUserPhoneNumber(userBankAccount.userId),
        messagePayload: JSON.stringify(_userBankAccount)
      },
      MessageAttributes: {
        AttributeNameHere: {
          StringValue: 'Attribute Value Here',
          DataType: 'String',
        },
      },
    }).promise();
  } catch (error) {
    console.log(error);
  }
};

export default {
  insert,
};
