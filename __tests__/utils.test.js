import { getRelativePosition } from '../src/modules/utils';

describe('getRelativePosition', () => {
  it('returns correct relative position for given user location and target', () => {
    const testTargetCoords = { latitude: 53.8, longitude: -1.55 };
    const testUserCoords = { coords: { latitude: 53.797, longitude: -1.557 } };

    const relativePosition = getRelativePosition(
      testUserCoords,
      testTargetCoords,
    );

    expect(relativePosition.x).toBeCloseTo(460, 0);
    expect(relativePosition.z).toBeCloseTo(-334, 0);
  });
});
