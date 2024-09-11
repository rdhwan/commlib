# commlib - a MQTT Connector Library

This library provides a connector for sending and receiving messages using MQTT. It leverages the `mqtt` and `eventemitter3` libraries to handle MQTT communication and event handling.

# Installation

To install the library, you can use any package manager you want. But, Bun is preferred:

```bash
bun install commlib
```

To install dependencies:

```bash
bun install
```

## Transpile

If you are using Bun, you don't have to build them. To build the library into library ready Javascript:

```bash
bun run build
```

# Example

To run the example chat app that use `broker.hivemq.com` as a public broker. You can run:

```bash
bun run ./example/chat.ts
```

If you aren't using Bun, you need to build them first, then:

```bash
node ./dist/example/chat.js
```

# Usage

### Importing the library

First, import the necessary modules and types:

```ts
import mqtt from "mqtt";
import EventEmitter from "eventemitter3";
import type { Payload } from "./parser";
import { parse, stringify, ParseError } from "./parser";
import { Connector, ConnectorEvent, ConnectorError } from "./connector";
```

### Creating a connector

To create a connector, instantiate the `Connector` class with the required options:

```ts
const connector = new Connector({
  host: "broker.hivemq.com",
  port: 1883,
  topic: "test",
  selfAddress: 1,
});
```

### Listening for events

You can listen for `message` and `broadcast` events using the `on` method:

```ts
connector.on("message", (event: ConnectorEvent) => {
  console.log(`[message from ${event.src}]: `, event.data);
});

connector.on("broadcast", (event: ConnectorEvent) => {
  console.log("broadcast", event);
});
```

### Sending messages

To send a message, use the `send` method:

```ts
connector.send(2, { message: "Hello, World!" });
```

### Error handling

The library provides a custom `ConnectorError` class for handling errors:

```ts
try {
  // Your code here
} catch (error) {
  if (error instanceof ConnectorError) {
    console.error("Connector error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}
```

GitHub Copilot
Sure, here's a README markdown document for your library:

Usage
Importing the Library
First, import the necessary modules and types:

Creating a Connector
To create a connector, instantiate the Connector class with the required options:

Listening for Events
You can listen for message and broadcast events using the on method:

Sending Messages
To send a message, use the send method:

Error Handling
The library provides a custom ConnectorError class for handling errors:

# API

### Constructor

- `options`: An object containing the following properties:
  - `host`: The MQTT broker host.
  - `port`: The MQTT broker port.
  - `topic`: The MQTT topic to subscribe to.
  - `selfAddress`: The address of the client.

### Methods

- `on(event: "message" | "broadcast", listener: (event: ConnectorEvent) => void)`: Registers an event listener for the specified event.
- `send(dst: number, data: any)`: Sends a message to the specified destination.

### ConnectorEvent

A type representing an event emitted by the connector. It extends the `Payload` type and includes the following properties:

- `data`: The data of the event.
- `topic`: The topic of the event.
- `raw`: The raw message string.

### ConnectorError

A custom error class for handling connector errors.

# License

This library is licensed under the MIT License.
