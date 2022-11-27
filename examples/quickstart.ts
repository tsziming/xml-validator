import { XmlValidator } from "../src";

const validator = new XmlValidator();

const validation = validator.validate("<root></root>")

console.log(validation.isValid); // true
console.log(validation.error); // ""

