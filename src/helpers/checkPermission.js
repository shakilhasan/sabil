export function checkPermissionAccess(path){
    const permissions = JSON.parse(localStorage.getItem("permissions"))
    console.log('checkPermissionAccess---', permissions);
    return permissions && Array.isArray(permissions)
        && permissions.some((permission) => permission.resourceName === path);
}