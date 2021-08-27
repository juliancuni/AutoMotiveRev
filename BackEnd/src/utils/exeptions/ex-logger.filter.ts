import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
    catch(exeption: unknown, host: ArgumentsHost) {
        console.error('Error! ----> ', exeption);
        super.catch(exeption, host);
    }
}