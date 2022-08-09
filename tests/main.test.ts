
import { TTActions, TTPermissionSchema, TTResource } from '../src/tt_index'
import { TTPermissionSet } from '../src/tt_permission_set'

describe('Testing...', () => {
    class ResourceUser extends TTResource {}
    class ResourceChannel extends TTResource {}
    class ResourceInvite extends TTResource {}

    const schema = new TTPermissionSchema([
        ResourceUser,
        ResourceInvite,
        ResourceChannel
    ])

    const ps = new TTPermissionSet(schema)
    ps.Grant(ResourceUser, TTActions.R)
    ps.Grant(ResourceChannel, TTActions.CRUD)

    test('Non granted resource', () => {
        expect(ps.Can(TTActions.C, ResourceInvite)).toBe(false)
        expect(ps.Can(TTActions.R, ResourceInvite)).toBe(false)
        expect(ps.Can(TTActions.U, ResourceInvite)).toBe(false)
        expect(ps.Can(TTActions.D, ResourceInvite)).toBe(false)
    })

    test('Single action grant', () => {
        expect(ps.Can(TTActions.C, ResourceUser)).toBe(false)
        expect(ps.Can(TTActions.R, ResourceUser)).toBe(true)
        expect(ps.Can(TTActions.U, ResourceUser)).toBe(false)
        expect(ps.Can(TTActions.D, ResourceUser)).toBe(false)
    })

    test('All action grant', () => {        
        expect(ps.Can(TTActions.CRUD, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.CRU, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.CR, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.C, ResourceChannel)).toBe(true)

        expect(ps.Can(TTActions.RUD, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.RU, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.R, ResourceChannel)).toBe(true)

        expect(ps.Can(TTActions.UD, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.U, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.D, ResourceChannel)).toBe(true)

        expect(ps.Can(TTActions.CD, ResourceChannel)).toBe(true)
        expect(ps.Can(TTActions.RD, ResourceChannel)).toBe(true)
    })
})