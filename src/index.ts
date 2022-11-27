import { XmlTypes, XmlValidationResult, XmlValidatorOptions } from "./types";
import { JSDOM } from "jsdom";

export const defaultOptions: XmlValidatorOptions = {
    userAgent: "xml-validator",
};

export class XmlValidator {
    private options: XmlValidatorOptions;
    
    constructor(options?: XmlValidatorOptions) {
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    validate(content: string, type: XmlTypes = "application/xml"): XmlValidationResult {
        const result: XmlValidationResult = {
            error: "",
            isValid: false,
        };

        try {
            new JSDOM(content, {
                contentType: type,
                userAgent: this.options.userAgent,
            });
            result.isValid = true;
        }
        catch (error) {
            if (error instanceof Error) {
                result.error = error.message.replace("about:blank","");
            }
        }

        return result;
    }

    async validateFile(url: string, type: XmlTypes = "application/xml"): Promise<XmlValidationResult> {
        const result: XmlValidationResult = {
            error: "",
            isValid: false,
        };

        try {
            await JSDOM.fromFile(url, {
                contentType: type,
                userAgent: this.options.userAgent,
            });
            result.isValid = true;
        }
        catch (error) {
            if (error instanceof Error) {
                result.error = error.message.replace("about:blank","");
            }
        }

        return result;
    }

    async validateUrl(url: string): Promise<XmlValidationResult> {
        const result: XmlValidationResult = {
            error: "",
            isValid: false,
        };

        try {
            await JSDOM.fromURL(url, {
                userAgent: this.options.userAgent,
            });
            result.isValid = true;
        }
        catch (error) {
            if (error instanceof Error) {
                result.error = error.message.replace("about:blank","");
            }
        }

        return result;
    }
}
