import { Connector, type ConnectorEvent } from "../src/index";
import readline from "readline";

type Data = {
  message: string;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your address: ", (address) => {
  const connector = new Connector<Data>({
    host: "broker.hivemq.com",
    port: 1883,
    topic: "test",
    selfAddress: +address,
  });

  connector.on("message", (event) => {
    console.log(`[message from ${event.src}]: `, event.data.message);
  });

  connector.on("broadcast", (event) => {
    console.log(`[broadcast from ${event.src}]`, event.data.message);
  });

  console.log("Send message to other client with format: [dst] [message]");
  console.log("Example: 2 hello world");

  rl.on("line", (input) => {
    const [dst, ...message] = input.split(" ");

    if (!dst || !message) {
      console.log("invalid input");
      return;
    }

    connector.send(+dst, { message: message.join(" ") });
  });
});
