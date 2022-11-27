
import { expect } from "chai";
import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised)

import { XmlValidator } from "../src";

describe("Xml validator unit tests", (): void => {
    const xmlValidator = new XmlValidator();

    it("validating errored xml by content", (): void => {
        const { isValid, error } = xmlValidator.validate("<root</root>")
        expect(isValid)
            .eq(false);
        expect(error)
            .eq(":1:6: disallowed character in tag name.");
    })

    it("validating normal xml by content", (): void => {
        const { isValid, error } = xmlValidator.validate("<root></root>")
        expect(isValid)
            .eq(true);
        expect(error)
            .eq("");
    })

    it("validating normal xml by url", async (): Promise<void> => {
        const { isValid, error } = await xmlValidator.validateUrl("https://www.w3schools.com/xml/simple.xml")
        expect(isValid)
            .eq(true);
        expect(error)
            .eq("");
    })
    
    it("validating errored xml by url", async (): Promise<void> => {
        const { isValid, error } = await xmlValidator.validateUrl("https://www.w3schools.com/xml/note_error.xml")
        expect(isValid)
        .eq(false);
        expect(error)
        .eq("https://www.w3schools.com/xml/note_error.xml:4:19: unexpected close tag.");
    })
    
    it("validating normal xml by file", async (): Promise<void> => {
        const { isValid, error } = await xmlValidator.validateFile("./tests/simple.xml")
        expect(isValid)
            .eq(true);
        expect(error)
            .eq("");
    })

    it("validating errored xml by file", async (): Promise<void> => {
        const { isValid, error } = await xmlValidator.validateFile("./tests/note_error.xml");
        expect(isValid)
            .eq(false);
        expect(error)
            .contains(":4:19: unexpected close tag.");
    })
})
