/**
 * lb-test
 * JS
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: julian.cuni@microservices.al
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserIncludeFilterItems } from './userIncludeFilterItems';


export interface UserFilter1 { 
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    where?: { [key: string]: object; };
    fields?: object | Set<string>;
    include?: Array<UserIncludeFilterItems | string>;
}
