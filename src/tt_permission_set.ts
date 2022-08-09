import { TTActions, TTActionsUtility } from "./tt_actions";
import { TTPermissionSchema } from "./tt_permission_schema";
import { TTResource } from "./tt_resource";

const ACTIONS_DELIMITER = '-'
const RESOURCE_DELIMITER = '.'

export class TTPermissionSet {
  private resources = new Map<typeof TTResource, TTActions>();
  private schema;

  constructor(schema: TTPermissionSchema) {
    this.schema = schema;
  }

  public Set(resource: typeof TTResource, actions: TTActions) {
    this.resources.set(resource, actions);
  }

  public Grant(resource: typeof TTResource, actions: TTActions) {
    if (this.resources.get(resource) === undefined) {
      this.resources.set(resource, actions);
      return;
    }

    const existing = this.resources.get(resource)
    const result = TTActionsUtility.Add(existing!, actions)
    this.resources.set(resource, result);
  }

  public Revoke(resource: typeof TTResource, actions: TTActions) {
    if (this.resources.get(resource) === undefined) {
      return;
    }

    const existing = this.resources.get(resource)
    const result = TTActionsUtility.Subtract(existing!, actions)

    if (result === TTActions.None) {
      this.resources.delete(resource)
      return;
    }

    this.resources.set(resource, result);
  }

  public Can(actions: TTActions, resource: typeof TTResource) :boolean {
    if (this.resources.get(resource) === undefined) {
      return false;
    }

    const existing = this.resources.get(resource)!
    return TTActionsUtility.Contains(existing, actions)
  }

  public ToString(): string {
    let result = '';
    for(const resource of this.resources.keys()) {
      const actions = this.resources.get(resource)
      const resourceId = this.schema.GetResourceID(resource)
      result += `${resourceId}${ACTIONS_DELIMITER}${actions}${RESOURCE_DELIMITER}`
    }
    result = result.substring(0, result.length-1)
    return result
  }

  public FromString(permissionString: string) {
    const entries = permissionString.split(RESOURCE_DELIMITER)

    for (const entry of entries) {
      const parts = entry.split(ACTIONS_DELIMITER)
      const resourceId = parts[0]
      const actionsString = parts[1]

      const actions = TTActionsUtility.ActionsFromString(actionsString);
      const resource = this.schema.GetResourceFromID(resourceId)

      this.Grant(resource, actions)
    }
  }
}
