

export type XmlTypes = "application/xml" | "text/xml" | "image/svg+xml";

export interface XmlValidatorOptions {
    userAgent: string;
}

export interface XmlValidationResult {
    error: string;
    isValid: boolean;
}
