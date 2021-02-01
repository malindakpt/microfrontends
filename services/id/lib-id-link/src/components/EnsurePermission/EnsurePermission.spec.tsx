import { checkPermissions, UserPermissions } from './EnsurePermission';

describe('EnsurePermission', () => {
  describe('checkPermissions', () => {
    it.each<[UserPermissions, UserPermissions, boolean]>([
      /* eslint-disable prettier/prettier */
      // required           current                  expected
      [{ id: ['write'] }, { id: ['write'] },         true],  // matching permissions
      [{ id: ['write'] }, { id: ['write', 'read'] }, true],  // matching permissions, but also additional ones
      [{ id: [] },        { id: ['write'] },         true],  // any permission on the service
      [{ id: ['write'] }, {},                        false], // no permissions at all
      [{ id: ['write'] }, { video: ['write'] },      false], // correct permission but on other service
      [{ id: ['write'] }, { id: ['read'] },          false], // wrong permission
      [{ id: ['write'] }, { id: [] },                false], // wrong permission
      /* eslint-enable prettier/prettier */
    ])('checks permissions correctly', (required, current, expected) => {
      expect(checkPermissions(required, current)).toEqual(expected);
    });
  });
});
