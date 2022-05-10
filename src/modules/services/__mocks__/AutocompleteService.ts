export class AutocompleteService {
  public init = jest.fn().mockReturnValue(new Promise(r => r()));
  public initializeInput = jest.fn();
  public initMap = jest.fn();
  public getResponse = jest.fn();
  public replaceResponse = jest.fn();
}
