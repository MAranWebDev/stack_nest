type ActionType = (typeof ACTIONS)[number];
type FeatureType = (typeof FEATURES)[number];
type RemovePermissionType = (typeof REMOVE_PERMISSIONS)[number];
type AddPermissionType = (typeof ADD_PERMISSIONS)[number];
type AllPermissionType = `${ActionType}_${FeatureType}` | AddPermissionType;
type PermissionType = Exclude<AllPermissionType, RemovePermissionType>;
type PermissionsType = {
  [K in Uppercase<PermissionType>]: Lowercase<K>;
};
export type PERMISSIONS = PermissionType;

const ACTIONS = ['create', 'read', 'update', 'delete'] as const;
const FEATURES = ['sample', 'users', 'user_profiles', 'user_permissions'] as const;
const REMOVE_PERMISSIONS = ['create_users', 'delete_users'] as const;
const ADD_PERMISSIONS = ['update_users_profile'] as const;

const getPermissions = () => {
  const removePermissions = [...REMOVE_PERMISSIONS] as string[];
  const addPermissions = [...ADD_PERMISSIONS] as string[];

  const permissions = {} as PermissionsType;

  for (const action of ACTIONS) {
    for (const feature of FEATURES) {
      const permission = `${action}_${feature}`;
      if (!removePermissions.includes(permission)) {
        permissions[permission.toUpperCase()] = permission;
      }
    }
  }

  for (const addPermission of addPermissions) {
    permissions[addPermission.toUpperCase()] = addPermission;
  }

  return permissions;
};

export const PERMISSIONS = getPermissions();
