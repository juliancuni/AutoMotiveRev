export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './rolesCRUD.service';
import { RolesCRUDService } from './rolesCRUD.service';
export * from './usersCRUD.service';
import { UsersCRUDService } from './usersCRUD.service';
export const APIS = [AuthenticationService, RolesCRUDService, UsersCRUDService];
