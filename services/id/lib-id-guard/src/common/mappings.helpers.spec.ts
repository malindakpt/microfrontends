import { IEndpointsToPermissionMappings } from './endpoints-to-permission-mappings.interface';
import { getMappedEndpoints } from './mappings.helpers';

describe('Endpoints to Permission Mappings', () => {
  describe('getMappedEndpoints', () => {
    it('with single array -> empty array', () => {
      // Arrange
      const mappings: IEndpointsToPermissionMappings = { ANONYMOUS: [] };

      // Act
      const result = getMappedEndpoints(mappings);

      // Assert
      expect(result.length).toBe(0);
    });

    it('with empty arrays -> empty array', () => {
      // Arrange
      const mappings: IEndpointsToPermissionMappings = {
        ANONYMOUS: [],
        ASSET_QUERY: [],
      };

      // Act
      const result = getMappedEndpoints(mappings);

      // Assert
      expect(result.length).toBe(0);
    });

    it('with duplicate endpoints -> removes duplicates', () => {
      // Arrange
      const mappings: IEndpointsToPermissionMappings = {
        ANONYMOUS: [],
        ASSET_QUERY: ['assets', 'assetsCount'],
        ASSET_QUERY_ADMIN: ['assets', 'assetsFilteredCount'],
      };

      // Act
      const result = getMappedEndpoints(mappings);

      // Assert
      expect(result.length).toBe(3);
      expect(result).toContain('assets');
      expect(result).toContain('assetsCount');
      expect(result).toContain('assetsFilteredCount');
    });

    it('without duplicate endpoints -> returns all endpoints', () => {
      // Arrange
      const mappings: IEndpointsToPermissionMappings = {
        ANONYMOUS: [],
        ASSET_QUERY: ['assets', 'assetsCount'],
        ASSET_QUERY_ADMIN: ['asset', 'assetsFilteredCount'],
      };

      // Act
      const result = getMappedEndpoints(mappings);

      // Assert
      expect(result.length).toBe(4);
      expect(result).toContain('asset');
      expect(result).toContain('assets');
      expect(result).toContain('assetsCount');
      expect(result).toContain('assetsFilteredCount');
    });
  });
});
