import { TTPermissionSet } from "./tt_permission_set";
import { TTResource } from "./tt_resource";

export class TTPermissionSchema {
  private resourceToId = new Map<new () => TTResource, string>();
  private idToResource = new Map<string, new () => TTResource>();
  
  constructor(resources: Array<new () => TTResource>) {
    for(const resource of resources) {
      const resourceId = this.resourceToId.size;
      this.idToResource.set(resourceId.toString(), resource)
      this.resourceToId.set(resource, resourceId.toString())
    }
  }

  public GetResourceID(resource: new () => TTResource): string {
    if (this.resourceToId.has(resource)) {
      return this.resourceToId.get(resource)!
    }

    throw new Error('Resource not found. Be sure to call .Bind() with all your resources')
  }

  public GetResourceFromID(resourceId: string): new () => TTResource {
    if (this.idToResource.has(resourceId)) {
      return this.idToResource.get(resourceId)!
    }

    throw new Error('Resource ID not found. Be sure to call .Bind() with all your resources')
  }
}