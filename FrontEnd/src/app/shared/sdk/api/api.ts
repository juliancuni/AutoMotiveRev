export * from './rolesCRUD.service';
import { RolesCRUDService } from './rolesCRUD.service';
export * from './usersCRUD.service';
import { UsersCRUDService } from './usersCRUD.service';
export const APIS = [RolesCRUDService, UsersCRUDService];
