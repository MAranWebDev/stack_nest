type ENTITIES = typeof ENTITIES;
type ACTIONS = typeof ACTIONS;
type PermissionType = `${ACTIONS[number]}_${ENTITIES[number]}`;
type PermissionsType = Record<Uppercase<PermissionType>, PermissionType>;
export type PERMISSIONS = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ENTITIES = ['sample', 'users'] as const;
const ACTIONS = ['create', 'read', 'update', 'delete'] as const;

const getPermissions = (entities: ENTITIES, actions: ACTIONS) => {
  return entities.reduce((acc, entity) => {
    actions.forEach((action) => {
      const permission = `${action}_${entity}` as const;
      acc[permission.toUpperCase()] = permission;
    });
    return acc;
  }, {} as PermissionsType);
};

export const PERMISSIONS = getPermissions(ENTITIES, ACTIONS);
