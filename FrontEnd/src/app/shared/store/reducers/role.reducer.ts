import { createEntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { RoleDto } from '../../sdk'
import { addNewRole, addNewRoleSuccess, deleteRoleSuccess, loadRolesSuccess, updateRole, updateRoleSuccess } from '../actions/role.actions';

export const roleFeatureKey = 'roles';

export interface RoleState extends EntityState<RoleDto> {
}

export const rolesAdapter = createEntityAdapter<RoleDto>({
});

export const initialState: RoleState = rolesAdapter.getInitialState({});

export const roleReducer = createReducer(
  initialState,
  on(loadRolesSuccess, (state, { roles }) => rolesAdapter.setAll(roles, state)),
  on(addNewRoleSuccess, (state, { role }) => rolesAdapter.addOne(role, state)),
  on(updateRoleSuccess, (state, { role }) => rolesAdapter.updateOne({ id: role.id as string, changes: role }, state)),
  on(deleteRoleSuccess, (state, { role }) => rolesAdapter.removeOne(role.id as string, state))
);

export const { selectAll } = rolesAdapter.getSelectors();

