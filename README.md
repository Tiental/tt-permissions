# tt-permissions
A strongly typed, serializable permissions system

## Install
#### Download package
Grab the latest release from the [Releases](https://github.com/Tiental/tt-permissions/releases) page.
You want to download the tt-permissions.tgz file.

#### Add to project
To install the package we recommend copying it into a shared folder in your repo.
Then you can install the local package with

> yarn add tt-permissions@file:../packages/tt-permissions


## Usage
The tt-permissions package is built on the core concepts of schemas, resources, actions and permission sets.
A schema describes what possible resources exist.
A resource can be anything in your application that needs managed access control.
Actions include the standard Create Read Update Delete (CRUD) operations.
A permission set is simply a set of granted actions on particular resources.

Import the required classes from tt-permissions
```ts
import { TTActions, TTPermissionSchema, TTResource } from '../src/tt_index'
import { TTPermissionSet } from '../src/tt_permission_set'
```

Define your resources.
```ts
class ResourceUser extends TTResource {}
class ResourceChannel extends TTResource {}
class ResourceInvite extends TTResource {}
```

Define your schema.
```ts
const schema = new TTPermissionSchema([
    ResourceUser,
    ResourceInvite,
    ResourceChannel
])
```

Now you can create a permission set.
```ts
const permissionSet = new TTPermissionSet(schema)
permissionSet.Grant(ResourceUser, TTActions.R)
permissionSet.Grant(ResourceChannel, TTActions.CRUD)
```

To get a serialized version of this permission set you can use `ToString()`
This string can then be saved to the database and for example sent to the frontend to selectively show pages.
```ts
const permissionSetString = ps.ToString()
```

To get a permission set from a string you can use `FromString(somePermissionSetString)`
This makes the package ideal for cases where you want to define permissions once and use it across the backend and frontend.
```ts
const anotherPermissionSet = new TTPermissionSet(schema)
anotherPermissionSet.FromString(permissionSetString)
```


Finally to query whether a certain action can be taken on a certain resource for a given permission set you can do :
```ts
if (permissionSet.Can(TTActions.C, ResourceInvite)) {
    console.log('I can create invites !!!')
}

if (permissionSet.Can(TTActions.UD, ResourceInvite) === false) {
    console.log('I can't update or delete invites !!!')
}
```