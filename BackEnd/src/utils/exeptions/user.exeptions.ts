import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UserNotFoundEx extends NotFoundException {
    constructor() {
        super(`Ky User nuk egziston`);
    }
}

export class BadCredentialsEx extends BadRequestException {
    constructor() {
        super(`Username ose Password Gabim!`);
    }
}

export class UserBadRequest extends BadRequestException {
    constructor() {
        super(`Error! Te dhenat nuk jane te sakta!`);
    }
}

export class UUIDBadRequest extends BadRequestException {
    constructor() {
        super(`Kjo id nuk egziston!`);
    }
}