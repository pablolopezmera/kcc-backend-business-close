export class IntegrationException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IntegrationException";
    }
}

export class PersistenceException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PersistenceException";
    }
}

export class BusinessException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BusinessException";
    }
}