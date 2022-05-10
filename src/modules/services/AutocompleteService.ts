import { injectScript } from '../../utils/generalUtils';
import { ENV } from '../../constants';

export enum AddressResponseFields {
  COUNTRY = 'country',
  ROUTE = 'route',
  STATE = 'administrative_area_level_1',
  COUNTY = 'administrative_area_level_2',
  BOROUGH = 'sublocality_level_1',
  CITY = 'locality',
  POSTAL_CODE = 'postal_code',
  NUMBER = 'street_number',
}

const addressTypeList = [
  AddressResponseFields.COUNTRY,
  AddressResponseFields.ROUTE,
  AddressResponseFields.STATE,
  AddressResponseFields.COUNTY,
  AddressResponseFields.BOROUGH,
  AddressResponseFields.CITY,
  AddressResponseFields.POSTAL_CODE,
  AddressResponseFields.NUMBER,
];
const addressShortTypeList = [AddressResponseFields.STATE];

interface ISettings {
  zoomLevel: number;
  restriction: { [key: string]: string[] };
  initialMapPoint: { lat: number; lng: number };
  disableDefaultUI?: boolean;
}

interface IAutocompleteService {
  config?: ISettings;
}

export interface IGeometry {
  lat: number;
  lng: number;
}

export interface IAutocompletedAddress {
  [AddressResponseFields.COUNTRY]?: string;
  [AddressResponseFields.ROUTE]?: string;
  [AddressResponseFields.STATE]?: string;
  [AddressResponseFields.COUNTY]?: string;
  [AddressResponseFields.CITY]?: string;
  [AddressResponseFields.POSTAL_CODE]?: string;
  [AddressResponseFields.NUMBER]?: string;
  administrative_area_level_1_short?: string;
}

interface IAutocompleteInitialization {
  inputRef: any;
  map: any;
  onResponse: (suggestions: IAutocompletedAddress, geometry: IGeometry) => void;
}

export class AutocompleteService {
  public static settings: ISettings = {
    zoomLevel: 17,
    restriction: { country: ['us', 'ca', 'mx', 'pr'] },
    initialMapPoint: { lat: -33.8688, lng: 151.2195 },
    disableDefaultUI: true,
  };
  public static maps = {};
  public static googleService = null;
  private placesService = null;
  private autocompleteService = null;
  private onResponse = null;

  public init({ config }: IAutocompleteService) {
    return injectScript({
      src: `https://maps.googleapis.com/maps/api/js?key=${ENV.GOOGLE_API.PLACES_API_KEY}&language=en&libraries=places`,
      scriptId: 'react-google-places-autocomplete',
    })
      .then(() => {
        AutocompleteService.settings = { ...AutocompleteService.settings, ...config };
        AutocompleteService.googleService = (window as any).google;
      })
      .catch(/* istanbul ignore next */ e => console.log(e));
  }

  public initializeInput({ inputRef, onResponse, map }: IAutocompleteInitialization) {
    if (AutocompleteService.googleService) {
      this.onResponse = onResponse;
      this.autocompleteService = new AutocompleteService.googleService.maps.places.Autocomplete(inputRef.current, { types: ['geocode', 'establishment'] });
      this.autocompleteService.setComponentRestrictions(AutocompleteService.settings.restriction);
      this.autocompleteService.setFields(['address_components', 'geometry.location', 'name']);
      this.autocompleteService.addListener('place_changed', /* istanbul ignore next */ () => this.getResponse(map));
    }
  }

  public initMap(
    map,
    latitude = AutocompleteService.settings.initialMapPoint.lat,
    longitude = AutocompleteService.settings.initialMapPoint.lng,
    additionalMarkers = [],
    zoomLevel = AutocompleteService.settings.zoomLevel
  ) {
    if (AutocompleteService.googleService) {
      const newMap = new AutocompleteService.googleService.maps.Map(map, {
        center: { lat: latitude, lng: longitude },
        zoom: zoomLevel,
        maxZoom: 15,
        disableDefaultUI: AutocompleteService.settings.disableDefaultUI,
      } as any);

      const bounds = new AutocompleteService.googleService.maps.LatLngBounds();

      AutocompleteService.maps = {
        ...AutocompleteService.maps,
        [map.id]: {
          map: newMap,
          marker: new AutocompleteService.googleService.maps.Marker({
            map: newMap,
            anchorPoint: new AutocompleteService.googleService.maps.Point(0, -29),
            position: { lat: latitude, lng: longitude },
          } as any),
          additionalMarkers: additionalMarkers.map(marker => {
            const mark = new AutocompleteService.googleService.maps.Marker({
              map: newMap,
              anchorPoint: new AutocompleteService.googleService.maps.Point(0, -29),
              position: { lat: marker.latitude, lng: marker.longitude },
            } as any);
            bounds.extend(mark.position);
            return mark;
          }),
        },
      };

      if (additionalMarkers.length > 0) newMap.fitBounds(bounds);
    }
  }

  public getResponse(map, presetPlace?: any) {
    const mapId = map.current.id;
    AutocompleteService.maps[mapId].marker.setVisible(false);
    const place = presetPlace ?? this.autocompleteService.getPlace();

    /* istanbul ignore next */
    if (place.geometry.viewport) {
      AutocompleteService.maps[mapId].map.fitBounds(place.geometry.viewport);
    } else {
      AutocompleteService.maps[mapId].map.setCenter(place.geometry.location);
      AutocompleteService.maps[mapId].map.setZoom(AutocompleteService.settings.zoomLevel);
    }
    AutocompleteService.maps[mapId].marker.setPosition(place.geometry.location);
    AutocompleteService.maps[mapId].marker.setVisible(true);

    const autocompletedAddress: IAutocompletedAddress = place.address_components.reduce((address, field) => {
      const type = field.types.find(element => addressTypeList.includes(element));
      const shortType = field.types.find(element => addressShortTypeList.includes(element));
      if (type) address = { ...address, [type]: field.long_name };
      if (shortType) address = { ...address, [`${shortType}_short`]: field.short_name };
      return address;
    }, {});
    const location: IGeometry = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
    this.onResponse(autocompletedAddress, location);
  }

  public replaceResponse(query, map) {
    this.placesService = new AutocompleteService.googleService.maps.places.PlacesService(AutocompleteService.maps[map.current.id].map);

    this.placesService.findPlaceFromQuery({ query: query, fields: ['place_id'] }, results => {
      /* istanbul ignore else */
      if (results) {
        this.placesService.getDetails({ placeId: results[0].place_id, fields: ['address_components', 'geometry.location', 'name'] }, placeDetails => {
          this.getResponse(map, placeDetails);
        });
      }
    });
  }
}
