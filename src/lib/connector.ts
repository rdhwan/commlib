import mqtt from "mqtt";
import EventEmitter from "eventemitter3";
import type { Payload } from "./parser";
import { parse, stringify, ParseError } from "./parser";

export type ConnectorEvent<T = Payload["data"]> = Payload & {
  data: T;
  topic: string;
  raw: string;
};

type ConnectorOptions = {
  host: string;
  port: number;
  topic: string;
  selfAddress: number;
};

export class ConnectorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConnectorError";
  }
}

export class Connector<T> extends EventEmitter<{
  message: [ConnectorEvent<T>];
  broadcast: [ConnectorEvent<T>];
}> {
  private client: mqtt.MqttClient;
  private topic: string;
  private selfAddress: number;

  constructor(options: ConnectorOptions) {
    // check if selfAddress is broadcast
    if (options.selfAddress === 0) {
      throw new Error("selfAddress cannot be broadcast");
    }

    super();

    this.client = mqtt.connect(`mqtt://${options.host}:${options.port}`);
    this.topic = options.topic;
    this.selfAddress = options.selfAddress;

    this.client.on("connect", () => {
      this.client.subscribe(this.topic);
    });

    this.client.on("message", (topic, payload) => {
      try {
        const raw = payload.toString();
        const { src, data, dst } = parse(raw);
        const isBroadcast = dst === 0;

        // kalau bukan broadcast dan dst bukan alamat kita, maka abaikan
        if (!isBroadcast && dst !== this.selfAddress) {
          return;
        }

        // emit broadcast event
        if (isBroadcast) {
          return this.emit("broadcast", {
            src,
            dst,
            data,
            topic,
            raw,
          } as ConnectorEvent<T>);
        }

        // emit message event
        return this.emit("message", {
          src,
          dst,
          data,
          topic,
          raw,
        } as ConnectorEvent<T>);
      } catch (err) {
        if (err instanceof ParseError) {
          console.error(err.message);
          return;
        }

        console.error("unknown error");
      }
    });
  }

  send(dst: number, data: any) {
    const payload = stringify(this.selfAddress, dst, data);
    this.client.publish(this.topic, payload);
  }
}
