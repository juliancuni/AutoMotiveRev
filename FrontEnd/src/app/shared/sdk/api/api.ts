export * from './roleController.service';
import { RoleControllerService } from './roleController.service';
export * from './roleUserController.service';
import { RoleUserControllerService } from './roleUserController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export * from './userRoleController.service';
import { UserRoleControllerService } from './userRoleController.service';
export const APIS = [RoleControllerService, RoleUserControllerService, UserControllerService, UserRoleControllerService];
