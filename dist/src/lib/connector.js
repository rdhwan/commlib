import mqtt from "mqtt";
import EventEmitter from "eventemitter3";
import { parse, stringify, ParseError } from "./parser";
export class ConnectorError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConnectorError";
    }
}
/**
 * Represents a connector for sending and receiving messages using MQTT.
 *
 * @typeparam T - The type of data to be sent and received.
 *
 * @fires message - Emitted when a message is received.
 * @fires broadcast - Emitted when a broadcast message is received.
 */
export class Connector extends EventEmitter {
    client;
    topic;
    selfAddress;
    constructor(options) {
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
                    });
                }
                // emit message event
                return this.emit("message", {
                    src,
                    dst,
                    data,
                    topic,
                    raw,
                });
            }
            catch (err) {
                if (err instanceof ParseError) {
                    console.error(err.message);
                    return;
                }
                console.error("unknown error");
            }
        });
    }
    send(dst, data) {
        const payload = stringify(this.selfAddress, dst, data);
        this.client.publish(this.topic, payload);
    }
}
//# sourceMappingURL=connector.js.map