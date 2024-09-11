import EventEmitter from "eventemitter3";
import type { Payload } from "./parser";
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
export declare class ConnectorError extends Error {
    constructor(message: string);
}
/**
 * Represents a connector for sending and receiving messages using MQTT.
 *
 * @typeparam T - The type of data to be sent and received.
 *
 * @fires message - Emitted when a message is received.
 * @fires broadcast - Emitted when a broadcast message is received.
 */
export declare class Connector<T> extends EventEmitter<{
    message: [ConnectorEvent<T>];
    broadcast: [ConnectorEvent<T>];
}> {
    private client;
    private topic;
    private selfAddress;
    constructor(options: ConnectorOptions);
    send(dst: number, data: any): void;
}
export {};
