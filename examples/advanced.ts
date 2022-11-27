import { XmlValidator } from "../src";

const validator = new XmlValidator({
    userAgent: "MyMozilaFirefox",
});

{
    console.log("example1")
    const { isValid, error } = validator.validate("<root</root>")
    console.log(isValid); // false
    console.log(error); // about:blank:1:6: disallowed character in tag name.
}

{
    console.log("example2")
    const { isValid, error } = validator.validate("<root></root>")
    console.log(isValid); // true
    console.log(error); // ""
}

validator.validateUrl("https://www.w3schools.com/xml/simple.xml")
    .then(validation => {
        console.log("example3")
        console.log(validation.isValid); // true
        console.log(validation.error); // ""
    })

validator.validateUrl("https://www.w3schools.com/xml/note_error.xml")
    .then(validation => {
        console.log("example5")
        console.log(validation.isValid); // false
        console.log(validation.error); // https://www.w3schools.com/xml/note_error.xml:4:19: unexpected close tag.
    })