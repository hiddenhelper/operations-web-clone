import { AutocompleteService } from './AutocompleteService';
jest.mock('../../utils/generalUtils', () => ({
  injectScript: () => Promise.resolve(),
  toREM: jest.fn(),
}));

describe('AutocompleteService', () => {
  let autocompleteService: AutocompleteService;
  const map = { current: { id: 'map' } };
  const onResponse = jest.fn();
  const inputRef = { current: null };

  beforeAll(() => {
    (window as any).google = {
      maps: {
        places: {
          Autocomplete: jest.fn().mockImplementation(() => ({
            setComponentRestrictions: jest.fn(),
            setFields: jest.fn(),
            addListener: jest.fn(),
            getPlace: jest.fn().mockReturnValue({
              address_components: [
                { long_name: 'Argentina', types: ['country'] },
                { long_name: 'Capital Federal', types: ['political'] },
                { long_name: 'Cordoba', short_name: 'CBA', types: ['administrative_area_level_1'] },
              ],
              geometry: {
                location: {
                  lat: jest.fn().mockReturnValue('34,29382924218392'),
                  lng: jest.fn().mockReturnValue('-13,45956098392834'),
                },
              },
            }),
          })),
          PlacesService: jest.fn().mockImplementation(() => ({
            findPlaceFromQuery: jest.fn((data, callback) => callback([{ place_id: 1 }])),
            getDetails: jest.fn((data, callback) => callback()),
          })),
        },
        Map: jest.fn().mockImplementation(() => ({
          setCenter: jest.fn(),
          setZoom: jest.fn(),
          fitBounds: jest.fn(),
        })),
        Point: jest.fn(),
        Marker: jest.fn().mockImplementation(() => ({
          setVisible: jest.fn(),
          setPosition: jest.fn(),
        })),
        LatLngBounds: jest.fn().mockImplementation(() => ({
          extend: jest.fn(),
        })),
      },
    };
    autocompleteService = new AutocompleteService();
    autocompleteService.init({});
  });

  describe('initMap', () => {
    it('should create a map', () => {
      autocompleteService.initMap({ id: 'map' });
      expect((window as any).google.maps.Map).toHaveBeenCalled();
      expect((window as any).google.maps.Point).toHaveBeenCalled();
      expect((window as any).google.maps.Marker).toHaveBeenCalled();
    });

    it('should create a map with markers', () => {
      autocompleteService.initMap({ id: 'map' }, 100, 100, [{ latitude: 150, longitude: 100 }]);
      expect((window as any).google.maps.Map).toHaveBeenCalled();
      expect((window as any).google.maps.Point).toHaveBeenCalled();
      expect((window as any).google.maps.Marker).toHaveBeenCalled();
    });
  });

  describe('getResponse', () => {
    it('should call onResponse with address', () => {
      autocompleteService.initializeInput({ inputRef, onResponse, map });
      autocompleteService.initMap({ id: 'map' });
      autocompleteService.getResponse(map);
      expect((window as any).google.maps.Map).toHaveBeenCalled();
      expect((window as any).google.maps.Point).toHaveBeenCalled();
      expect((window as any).google.maps.Marker).toHaveBeenCalled();
      expect(onResponse).toHaveBeenCalledWith(
        {
          country: 'Argentina',
          administrative_area_level_1: 'Cordoba',
          administrative_area_level_1_short: 'CBA',
        },
        { lat: '34,29382924218392', lng: '-13,45956098392834' }
      );
    });
  });

  describe('replaceResponse', () => {
    it('should call onResponse with query', () => {
      autocompleteService.initializeInput({ inputRef, onResponse, map });
      autocompleteService.initMap({ id: 'map' });
      autocompleteService.replaceResponse('123 central avenue', map);
      expect((window as any).google.maps.Map).toHaveBeenCalled();
      expect((window as any).google.maps.Point).toHaveBeenCalled();
      expect((window as any).google.maps.Marker).toHaveBeenCalled();
      expect(onResponse).toHaveBeenCalled();
    });
  });
});
