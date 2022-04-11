export function checkPermissionAccess(path){
    const permissions = JSON.parse(localStorage.getItem("permissions"))
    console.log('checkPermissionAccess---', permissions);
    return true;  // todo - remove when role ready
    // eslint-disable-next-line no-unreachable
    return permissions && Array.isArray(permissions)
        && permissions.some((permission) => permission.resourceName === path);
}