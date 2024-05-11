import { Schema, type } from "@colyseus/schema";

export default class HelloWorldRoomState extends Schema {
    @type("string")
    message: string = "Hello, World!"
}