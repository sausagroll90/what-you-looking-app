import {
  formatDate,
  getPositionForAR,
  getRelativePosition,
  isPlaceIdUnique,
} from '../src/modules/utils';

describe('getRelativePosition', () => {
  it('returns relative position for given user location and target', () => {
    const testTargetCoords = { latitude: 53.8, longitude: -1.55 };
    const testUserCoords = { latitude: 53.797, longitude: -1.557 };

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
    const testUserCoords = { latitude: 53.797, longitude: -1.557 };
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

describe('isPlaceIdUnique', () => {
  it('returns false when there is no initial data', () => {
    const currentData = null;
    const newPlace = {
      address: 'Millennium Square, Leeds LS2 8BH, UK',
      name: 'Leeds City Museum',
      place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
    };

    expect(isPlaceIdUnique(currentData, newPlace)).toBe(true);
  });
  it('returns true if place does not already exist', () => {
    const currentData = [
      {
        address: '74 The Headrow, Leeds LS1 3AB, UK',
        name: 'City Sculpture Projects 1972',
        place_id: 'ChIJXxlmWhxceUgRLjRj9eEbjWg',
      },
      {
        address: 'Maths City',
        name: 'Maths City',
        place_id: 'ChIJLT2I8s5deUgR90SpTPQOKKo',
      },
    ];
    const newData = {
      address: 'Millennium Square, Leeds LS2 8BH, UK',
      name: 'Leeds City Museum',
      place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
    };
    expect(isPlaceIdUnique(currentData, newData)).toBe(true);
  });
  it('returns false if place already exists in data', () => {
    const currentData = [
      {
        address: '74 The Headrow, Leeds LS1 3AB, UK',
        name: 'City Sculpture Projects 1972',
        place_id: 'ChIJXxlmWhxceUgRLjRj9eEbjWg',
      },
      {
        address: 'Millennium Square, Leeds LS2 8BH, UK',
        name: 'Leeds City Museum',
        place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
      },
    ];
    const newData = {
      address: 'Millennium Square, Leeds LS2 8BH, UK',
      name: 'Leeds City Museum',
      place_id: 'ChIJwdWI4RxceUgRFF7zMoxhXQE',
    };
    expect(isPlaceIdUnique(currentData, newData)).toBe(false);
  });
});

describe('formatDate', () => {
  it('returns date in user friendly format', () => {
    expect(formatDate('2024-05-30T07:44:46.181Z')).toBe('30-05-2024');
  });
});
