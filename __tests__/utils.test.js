import { getPositionForAR, getRelativePosition } from '../src/modules/utils';

describe('getRelativePosition', () => {
  it('returns relative position for given user location and target', () => {
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

describe('getPositionForAR', () => {
  it('returns transformed coordinates', () => {
    const testUserCoords = { coords: { latitude: 53.797, longitude: -1.557 } };
    const testTargetCoords = { latitude: 53.8, longitude: -1.55 };
    const testCompassHeading = 45;

    const transformedCoordinates = getPositionForAR(
      testUserCoords,
      testTargetCoords,
      testCompassHeading,
    );

    expect(transformedCoordinates[0]).toBeCloseTo(89, 0);
    expect(transformedCoordinates[1]).toBe(0);
    expect(transformedCoordinates[2]).toBeCloseTo(-561, 0);
  });

  it('raises an expection when userPosition is null', () => {
    const testUserCoords = null;
    const testTargetCoords = { latitude: 53.8, longitude: -1.55 };
    const testCompassHeading = 45;

    expect(() =>
      getPositionForAR(testUserCoords, testTargetCoords, testCompassHeading),
    ).toThrow('user location not found');
  });
});
