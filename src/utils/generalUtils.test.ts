import {
  isEmpty,
  toREM,
  hexToRgb,
  formatBytes,
  isUUID,
  injectScript,
  disableFocus,
  enableFocusOnTab,
  getNextObjectItem,
  getCompletedStepFields,
  generateTempId,
  isTempId,
  parseUrlSearch,
  safeParse,
  deleteObjectItem,
  formatNumberWithCommas,
  getDefaultValue,
  getConditionalDefaultValue,
  getFormattedDate,
  getDrawerButton,
  formatIdNumber,
  getListDefaultValue,
  getHideOverflowClass,
  getOptionListFromMap,
  getImageUrl,
  getFileNames,
  getBooleanDefaultValue,
  sortByCreatedDate,
  formatPhoneNumber,
  sanitizePhoneNumber,
  getDateFromMomentDateTime,
  getTimeFromNow,
  parseQuery,
  getLineChartTicksByData,
  getBigLineChartTicksByData,
  getQueryParamsFromString,
  sanitizeAccountData,
  toggleArray,
  getPieData,
  getLocationList,
  getDashIfNull,
} from './generalUtils';
import { getClient_1, getProject_1 } from '../test/entities';

import { ClientModel, ProjectModel, GeneralModel, ResourceModel } from '../modules/models';
import moment from 'moment';

describe('generalUtils', () => {
  global.console.warn = () => {
    /** */
  };

  describe('Conversion to rem', () => {
    it('should convert 16px to 1rem', () => {
      const wrappedConversion = toREM(16);
      expect(wrappedConversion).toBe('1rem');
    });

    it('should convert 18px to 1.125rem', () => {
      const wrappedConversion = toREM(18);
      expect(wrappedConversion).toBe('1.125rem');
    });
  });

  describe('should getQueryParamsFromString', () => {
    it('should convert to query params from empty string', () => {
      const queryParams = getQueryParamsFromString('');
      expect(queryParams).toEqual('');
    });
    it('should conver to query params from valid string', () => {
      const queryParams = getQueryParamsFromString('?isPaid=false&page=1&limit=15&period=1&sortType="descending"');
      expect(queryParams).toEqual({ isPaid: false, page: 1, limit: 15, period: 1, sortType: 'descending' });
    });
    it('should catch error because is an invalid string', () => {
      const queryParams = getQueryParamsFromString('?isPaid=false&page=1&limit=15&period=1&sortType=');
      expect(queryParams).toEqual('');
    });
  });

  describe('Convert HEX to RGB', () => {
    it('should convert "#000000" to "0, 0, 0"', () => {
      const wrappedConversion = hexToRgb('#000000');
      expect(wrappedConversion).toBe('0, 0, 0');
    });

    it('should convert "#000" to "0, 0, 0"', () => {
      const wrappedConversion = hexToRgb('#000');
      expect(wrappedConversion).toBe('0, 0, 0');
    });

    it('should catch invalid value', () => {
      const wrappedConversion = hexToRgb('red');
      expect(wrappedConversion).toBe(null);
    });
  });

  describe('Format bytes to number with unit of measurement', () => {
    it('should return "0 B" if is 0', () => {
      const wrappedConversion = formatBytes(0);
      expect(wrappedConversion).toBe('0 B');
    });

    it('should convert "1089" to "1 KB" if decimals=0', () => {
      const wrappedConversion = formatBytes(1089, 0);
      expect(wrappedConversion).toBe('1 KB');
    });

    it('should convert "1089" to "1 KB" if decimals=-1', () => {
      const wrappedConversion = formatBytes(1089, -1);
      expect(wrappedConversion).toBe('1 KB');
    });

    it('should convert "1000" to "1 KB"', () => {
      const wrappedConversion = formatBytes(1000);
      expect(wrappedConversion).toBe('1 KB');
    });

    it('should convert "999999" to "1000 KB"', () => {
      const wrappedConversion = formatBytes(999999);
      expect(wrappedConversion).toBe('1000 KB');
    });

    it('should convert "1000000" to "1 MB"', () => {
      const wrappedConversion = formatBytes(1000000);
      expect(wrappedConversion).toBe('1 MB');
    });
  });

  describe('isEmpty', () => {
    let value;
    it('should return true for Object', () => {
      value = {};
      expect(isEmpty(value)).toBe(true);
    });

    it('should return true for Array', () => {
      value = [];
      expect(isEmpty(value)).toBe(true);
    });

    it('should return true for undefined', () => {
      value = undefined;
      expect(isEmpty(value)).toBe(true);
    });

    it('should return true for string', () => {
      value = '';
      expect(isEmpty(value)).toBe(true);
    });

    it('should return true for NaN number', () => {
      value = NaN;
      expect(isEmpty(value)).toBe(true);
    });

    it('should return true for Array', () => {
      value = [];
      expect(isEmpty(value)).toBe(true);
    });
  });

  describe('isUUID', () => {
    it('should return false when invalid', () => {
      const uuid = 'not-valid-uuid';
      expect(isEmpty(uuid)).toBe(false);
    });

    it('should return true when valid', () => {
      const uuid = '9164e4c4-6521-47bb-97fd-c75ac02b2cf5';
      expect(isUUID(uuid)).toBe(true);
    });
  });

  describe('injectScript', () => {
    it('should inject script into dom', done => {
      injectScript({ src: 'src', scriptId: 'scriptId' });
      expect(document.getElementById('scriptId')).toBeTruthy();
      done();
    });

    it('should inject script into dom', () => {
      injectScript({ src: 'src', scriptId: 'scriptId' });
      expect(document.querySelectorAll('script[id="scriptId"]')).toHaveLength(1);
    });
  });

  describe('disableFocus', () => {
    it('should add the class using-mouse to the body', () => {
      disableFocus();
      expect(disableFocus()).toBe(true);
    });
  });

  describe('enableFocusOnTab', () => {
    it('should return true when keycode is 9 (tab)', () => {
      var eventMock = { event: { keyCode: 9 } };
      enableFocusOnTab(eventMock.event);

      expect(enableFocusOnTab(eventMock.event)).toBe(true);
    });

    it('should return false when keycode is different than 9 (tab)', () => {
      var eventMock = { event: { keyCode: 8 } };

      enableFocusOnTab(eventMock.event);
      expect(enableFocusOnTab(eventMock.event)).toBe(false);
    });
  });

  describe('getNextObjectItem', () => {
    it('should return next item value', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(getNextObjectItem(obj, 'a')).toBe(2);
    });

    it('should return last item when next of last is requested', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(getNextObjectItem(obj, 'c')).toBe(3);
    });
  });

  describe('getCompletedStepFields', () => {
    it('should return completed fields client object', () => {
      expect(getCompletedStepFields(ClientModel.clientStepMap, getClient_1())).toEqual({
        'general-information': { completed: 4, required: 4, title: 'General Information', order: 0 },
        addresses: { completed: 1, required: 5, title: 'Addresses', order: 1 },
        users: { completed: 10, required: 12, title: 'Users', order: 2 },
        review: { completed: 0, required: 0, title: 'Review', order: 3 },
      });
    });

    it('should return completed fields project object', () => {
      expect(getCompletedStepFields(ProjectModel.projectStepMap, getProject_1())).toEqual({
        addresses: {
          completed: 1,
          order: 3,
          required: 6,
          title: 'Addresses and Locations',
        },
        'assign-client': {
          completed: 0,
          order: 1,
          required: 2,
          title: 'Clients',
        },
        'billing-model': {
          completed: 2,
          order: 2,
          required: 4,
          title: 'Billing Model',
        },
        'certifications-and-trainings': {
          completed: 0,
          order: 4,
          required: 0,
          title: 'Certifications and Trainings',
        },
        'general-information': {
          completed: 5,
          order: 0,
          required: 8,
          title: 'General Information',
        },
        'badge-templates': {
          completed: 0,
          order: 5,
          required: 0,
          title: 'Badge Templates',
        },
        'worker-consent-form': {
          completed: 2,
          order: 6,
          required: 4,
          title: 'Worker Consent Form',
        },
        review: {
          completed: 0,
          order: 7,
          required: 0,
          title: 'Review',
        },
      });
    });
  });

  describe('generateTempId', () => {
    it('should return an incremental temp id', () => {
      expect(generateTempId()).toEqual('temp-1');
      expect(generateTempId()).toEqual('temp-2');
    });
  });

  describe('isTempId', () => {
    it('should validate temporal ids', () => {
      expect(isTempId(generateTempId())).toBe(true);
      expect(isTempId('acbd172819bcd-bca8193021-ffca183021-fffaac321')).toEqual(false);
    });
  });

  describe('parseUrlSearch', () => {
    it('should parse a search', () => {
      expect(parseUrlSearch('?a=hi&b=bye')).toEqual({ a: 'hi', b: 'bye' });
    });

    it('should parse a search with initial value', () => {
      expect(parseUrlSearch('?a=hi&b=bye', { a: 'x', b: 'y', c: 'z' })).toEqual({ a: 'hi', b: 'bye', c: 'z' });
    });
  });

  describe('safeParse', () => {
    it('should parse a string', () => {
      expect(safeParse('{"a":1}')).toEqual({ a: 1 });
    });

    it('should use a fallback when parsing fails', () => {
      expect(safeParse('{', 'fallback')).toEqual('fallback');
    });

    it('should return the entry item when parsing fails and there is no fallback', () => {
      expect(safeParse('{')).toEqual('{');
    });
  });

  describe('deleteObjectItem', () => {
    const obj = { a: 124, b: '12312' };
    it('should delete an item of an object', () => {
      expect(deleteObjectItem(obj, 'a')).toEqual({ b: '12312' });
    });
  });

  describe('formatNumberWithCommas', () => {
    it('should format a number to number with commas', () => {
      expect(formatNumberWithCommas('10')).toEqual('10');
      expect(formatNumberWithCommas('100')).toEqual('100');
      expect(formatNumberWithCommas('1000')).toEqual('1,000');
      expect(formatNumberWithCommas('10000')).toEqual('10,000');
      expect(formatNumberWithCommas('100000')).toEqual('100,000');
      expect(formatNumberWithCommas('1000000')).toEqual('1,000,000');
    });
  });

  describe('getDefaultValue', () => {
    it('should return value or defaultValue', () => {
      expect(getDefaultValue({})).toEqual('-');
      expect(getDefaultValue('')).toEqual('-');
      expect(getDefaultValue(null)).toEqual('-');
      expect(getDefaultValue('value')).toEqual('value');
      expect(getDefaultValue(10)).toEqual(10);
      expect(getDefaultValue({ a: 1 })).toEqual({ a: 1 });
      expect(getDefaultValue('', 'Not defined')).toEqual('Not defined');
      expect(getDefaultValue(undefined, null)).toEqual(null);
    });
  });

  describe('getConditionalDefaultValue', () => {
    it('should return value', () => {
      expect(getConditionalDefaultValue(true, 'my value')).toEqual('my value');
    });
    it('should return defaultValue', () => {
      expect(getConditionalDefaultValue(false, 'my value')).toEqual('-');
      expect(getConditionalDefaultValue(false, 'my value', 'Not defined')).toEqual('Not defined');
      expect(getConditionalDefaultValue(true, null, 'my value')).toEqual('my value');
      expect(getConditionalDefaultValue(true, undefined, 'my value')).toEqual('my value');
      expect(getConditionalDefaultValue(true, '')).toEqual('-');
      expect(getConditionalDefaultValue(false, '', [])).toStrictEqual([]);
      expect(getConditionalDefaultValue(true, null, false)).toEqual(false);
    });
  });

  describe('getDashIfNull', () => {
    const value = 'any';
    it('should return value', () => {
      expect(getDashIfNull(null, value)).toEqual('-');
    });
    it('should return defaultValue', () => {
      expect(getDashIfNull(false, value)).toEqual(value);
      expect(getDashIfNull(true, value)).toEqual(value);
      expect(getDashIfNull(undefined, value)).toEqual(value);
      expect(getDashIfNull([], value)).toEqual(value);
      expect(getDashIfNull(1, value)).toEqual(value);
      expect(getDashIfNull({}, value)).toEqual(value);
    });
  });

  describe('getFormattedDate', () => {
    it('should return MMM DD, YYYY date or null', () => {
      expect(getFormattedDate('2020-08-13T00:00:00', GeneralModel.DateFormat.DATE)).toEqual('Aug 13, 2020');
      expect(getFormattedDate(null, GeneralModel.DateFormat.DATE)).toEqual(null);
    });

    it('should return MMMM YYYY date or null', () => {
      expect(getFormattedDate('2020-08-13T00:00:00', GeneralModel.DateFormat.MONTH_YEAR)).toEqual('August 2020');
      expect(getFormattedDate(null, GeneralModel.DateFormat.MONTH_YEAR)).toEqual(null);
    });

    it('should return DD MMM date or null', () => {
      expect(getFormattedDate('2020-08-13T00:00:00', GeneralModel.DateFormat.DATE_MONTH)).toEqual('13 Aug');
      expect(getFormattedDate(null, GeneralModel.DateFormat.DATE_MONTH)).toEqual(null);
    });

    it('should return MMM DD, YYYY date or null', () => {
      expect(getFormattedDate('2020-08-13T00:00:00', GeneralModel.DateFormat.DATE_TIME)).toEqual('Aug 13, 2020 12:00 am');
      expect(getFormattedDate(null, GeneralModel.DateFormat.DATE_TIME)).toEqual(null);
    });

    it('should return MM/DD/YYYY date or null', () => {
      expect(getFormattedDate('2020-08-13T00:00:00', GeneralModel.DateFormat.NUMERIC_DATE)).toEqual('08/13/2020');
      expect(getFormattedDate(null, GeneralModel.DateFormat.NUMERIC_DATE)).toEqual(null);
    });
  });

  describe('getDrawerButton', () => {
    it('should drawer button type', () => {
      expect(getDrawerButton(null, 'id', ResourceModel.Type.PROJECT)).toEqual({ buttonText: 'Project Detail', linkTo: '/projects/detail/id' });
    });
  });

  describe('formatIdNumber', () => {
    it('should format number', () => {
      expect(formatIdNumber('789456123')).toEqual('789-45-6123');
    });
  });

  describe('getListDefaultValue', () => {
    it('should get error from list', () => {
      expect(getListDefaultValue({ COMPANY_IS_ASSIGNED_TO_ACTVE_PROJECT: ['error 1'] }, 'COMPANY_IS_ASSIGNED_TO_ACTVE_PROJECT')).toEqual('error 1');
    });

    it('should return default value', () => {
      expect(getListDefaultValue(undefined, '')).toEqual('');
    });
  });

  describe('getHideOverflowClass', () => {
    it('should get class', () => {
      const list = ['one'];
      const ref = { current: { offsetHeight: 400 } };
      expect(getHideOverflowClass(list, ref, 'name')).toEqual('name');
    });
    it('should get empty', () => {
      const list = [];
      const ref = { current: { offsetHeight: 300 } };
      expect(getHideOverflowClass(list, ref, 'name')).toEqual('');
    });
  });

  describe('getOptionListFromMap', () => {
    it('should return option list', () => {
      const map = {
        '1': 'Test1',
        '2': 'Test2',
      };
      expect(getOptionListFromMap(map)).toEqual([
        {
          value: '1',
          label: 'Test1',
        },
        {
          value: '2',
          label: 'Test2',
        },
      ]);
    });
  });

  describe('getImageUrl', () => {
    it('should return url', () => {
      const createUrlMock = jest.fn();
      (global as any).URL.createObjectURL = createUrlMock;
      getImageUrl('test');
      expect(createUrlMock).toHaveBeenCalled();
    });

    it('should return null', () => {
      expect(getImageUrl(null)).toBeNull();
    });
  });

  describe('getFileNames', () => {
    it('should return file names', () => {
      expect(getFileNames({ file1: { file: { name: 'test' } } })).toEqual({ file1: 'test' });
    });
  });

  describe('getBooleanDefaultValue', () => {
    it('should return empty', () => {
      expect(getBooleanDefaultValue(null, 'yes', 'no')).toEqual('-');
    });

    it('should return default', () => {
      expect(getBooleanDefaultValue(null, 'yes', 'no', 'maybe')).toEqual('maybe');
    });

    it('should return truthy', () => {
      expect(getBooleanDefaultValue(true, 'yes', 'no', 'maybe')).toEqual('yes');
    });

    it('should return falsy', () => {
      expect(getBooleanDefaultValue(false, 'yes', 'no', 'maybe')).toEqual('no');
    });
  });

  describe('sortByCreatedDate', () => {
    it('should return sorted items', () => {
      const item1 = { createdAt: '2022-10-01T00:00:00' };
      const item2 = { createdAt: '2022-10-03T00:00:00' };
      expect(sortByCreatedDate(item1, item2)).toBe(1);
    });

    it('should maintain order', () => {
      const item1 = {};
      const item2 = {};
      expect(sortByCreatedDate(item1, item2)).toBe(0);
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format phone number', () => {
      expect(formatPhoneNumber('+16197878787')).toEqual('+1 619 787 8787');
      expect(formatPhoneNumber('')).toEqual('-');
    });
  });

  describe('sanitizePhoneNumber', () => {
    it('should sanitize phone number', () => {
      expect(sanitizePhoneNumber('+1 (619)-787-8787')).toEqual('+16197878787');
    });
  });

  describe('getDateFromMomentDateTime', () => {
    it('should get moment date given date and time AM', () => {
      const startDate = moment('10-10-2010 11:04:00');
      const endDate = moment('10-10-2010 11:04:00 am');

      expect(getDateFromMomentDateTime(startDate, endDate).toString()).toEqual(expect.stringContaining('Sun Oct 10 2010 11:04:00'));
    });
    it('should get moment date given date and time PM', () => {
      const startDate = moment('10-10-2010');
      const endDate = moment('10-10-2010 11:04:00 pm');

      expect(getDateFromMomentDateTime(startDate, endDate).toString()).toEqual(expect.stringContaining('Sun Oct 10 2010 23:04:00'));
    });
    it('should return moment date acordinlly when invalid date', () => {
      const startDate = moment('10/10/2010');
      const endDate = moment('11:04 pm');

      expect(getDateFromMomentDateTime(startDate, endDate).toString()).toEqual(expect.stringContaining('Sun Oct 10 2010 00:00:00'));
    });
  });

  describe('toggleArray', () => {
    it('should add item when it does not exist', () => {
      expect(toggleArray([], 'item-1')).toEqual(['item-1']);
    });

    it('should remove item when exist', () => {
      expect(toggleArray(['item-1'], 'item-1')).toEqual([]);
    });
  });

  describe('getTimeFromNow', () => {
    it('should return time from now', () => {
      const mockDate = jest.fn(() => new Date(Date.UTC(2020, 11, 14)).valueOf());
      Date.now = mockDate;
      expect(getTimeFromNow('2020-08-13T00:00:00')).toEqual('4 months ago');
      mockDate.mockRestore();
    });
  });

  describe('parseQuery', () => {
    it('should return queryParams as string and skip undefined values', () => {
      expect(parseQuery({ isDeveloper: false, nameContains: 'some text', excludeId: undefined })).toEqual('isDeveloper=false&nameContains=some text');
    });
    it('should return queryParams as string', () => {
      expect(parseQuery({ isDeveloper: false, nameContains: 'some text', excludeId: '' })).toEqual('isDeveloper=false&nameContains=some text&excludeId=');
    });
    it('should parse Object as string', () => {
      expect(parseQuery({ isDeveloper: false, nameContains: 'some text', exclude: { id: 'someid', value: 'some-value' } })).toEqual(
        'isDeveloper=false&nameContains=some text&exclude={"id":"someid","value":"some-value"}'
      );
    });
    it('should parse Array as string of key with same key', () => {
      expect(parseQuery({ nameContains: 'some text', excludeCompanies: ['1', '2'] })).toEqual('nameContains=some text&excludeCompanies=1&excludeCompanies=2');
    });
  });

  describe('getLocationList', () => {
    it('should state map as option list', () => {
      expect(getLocationList()).toEqual([
        {
          id: '',
          name: 'All Locations',
        },
        {
          id: 'AL',
          name: 'Alabama',
        },
        {
          id: 'AK',
          name: 'Alaska',
        },
        {
          id: 'AZ',
          name: 'Arizona',
        },
        {
          id: 'AR',
          name: 'Arkansas',
        },
        {
          id: 'CA',
          name: 'California',
        },
        {
          id: 'CO',
          name: 'Colorado',
        },
        {
          id: 'CT',
          name: 'Connecticut',
        },
        {
          id: 'DE',
          name: 'Delaware',
        },
        {
          id: 'DC',
          name: 'District of Columbia',
        },
        {
          id: 'FL',
          name: 'Florida',
        },
        {
          id: 'GA',
          name: 'Georgia',
        },
        {
          id: 'HI',
          name: 'Hawaii',
        },
        {
          id: 'ID',
          name: 'Idaho',
        },
        {
          id: 'IL',
          name: 'Illinois',
        },
        {
          id: 'IN',
          name: 'Indiana',
        },
        {
          id: 'IA',
          name: 'Iowa',
        },
        {
          id: 'KS',
          name: 'Kansas',
        },
        {
          id: 'KY',
          name: 'Kentucky',
        },
        {
          id: 'LA',
          name: 'Louisiana',
        },
        {
          id: 'ME',
          name: 'Maine',
        },
        {
          id: 'MD',
          name: 'Maryland',
        },
        {
          id: 'MA',
          name: 'Massachusetts',
        },
        {
          id: 'MI',
          name: 'Michigan',
        },
        {
          id: 'MN',
          name: 'Minnesota',
        },
        {
          id: 'MS',
          name: 'Mississippi',
        },
        {
          id: 'MO',
          name: 'Missouri',
        },
        {
          id: 'MT',
          name: 'Montana',
        },
        {
          id: 'NE',
          name: 'Nebraska',
        },
        {
          id: 'NV',
          name: 'Nevada',
        },
        {
          id: 'NH',
          name: 'New Hampshire',
        },
        {
          id: 'NJ',
          name: 'New Jersey',
        },
        {
          id: 'NM',
          name: 'New Mexico',
        },
        {
          id: 'NY',
          name: 'New York',
        },
        {
          id: 'NC',
          name: 'North Carolina',
        },
        {
          id: 'ND',
          name: 'North Dakota',
        },
        {
          id: 'OH',
          name: 'Ohio',
        },
        {
          id: 'OK',
          name: 'Oklahoma',
        },
        {
          id: 'OR',
          name: 'Oregon',
        },
        {
          id: 'PA',
          name: 'Pennsylvania',
        },
        {
          id: 'RI',
          name: 'Rhode Island',
        },
        {
          id: 'SC',
          name: 'South Carolina',
        },
        {
          id: 'SD',
          name: 'South Dakota',
        },
        {
          id: 'TN',
          name: 'Tennessee',
        },
        {
          id: 'TX',
          name: 'Texas',
        },
        {
          id: 'UT',
          name: 'Utah',
        },
        {
          id: 'VT',
          name: 'Vermont',
        },
        {
          id: 'VA',
          name: 'Virginia',
        },
        {
          id: 'WA',
          name: 'Washington',
        },
        {
          id: 'WV',
          name: 'West Virginia',
        },
        {
          id: 'WI',
          name: 'Wisconsin',
        },
        {
          id: 'WY',
          name: 'Wyoming',
        },
      ]);
    });
  });

  describe('getLineChartTicksByData', () => {
    it('should return block for ticks > 8 and < 20 and % 3 === 0', () => {
      let tick = {
        ticks: { length: 10 },
        index: 3,
      };
      expect(getLineChartTicksByData(tick)).toEqual('block');
    });
    it('should return none for ticks > 8 and < 20 and % 3 !== 0', () => {
      let tick = {
        ticks: { length: 10 },
        index: 4,
      };
      expect(getLineChartTicksByData(tick)).toEqual('none');
    });
    it('should return block for ticks > 20 and % 6 === 0', () => {
      let tick = {
        ticks: { length: 21 },
        index: 6,
      };
      expect(getLineChartTicksByData(tick)).toEqual('block');
    });
    it('should return none for ticks > 20 and % 7 !== 0', () => {
      let tick = {
        ticks: { length: 21 },
        index: 7,
      };
      expect(getLineChartTicksByData(tick)).toEqual('none');
    });
    it('should return block for ticks < 8', () => {
      let tick = {
        ticks: { length: 5 },
        index: 1,
      };
      expect(getLineChartTicksByData(tick)).toEqual('block');
    });
  });

  describe('getBigLineChartTicksByData', () => {
    it('should return block for ticks > 15 and < 20 and % 3 === 0', () => {
      let tick = {
        ticks: { length: 16 },
        index: 3,
      };
      expect(getBigLineChartTicksByData(tick)).toEqual('block');
    });
    it('should return none for ticks > 15 and < 20 and % 3 !== 0', () => {
      let tick = {
        ticks: { length: 16 },
        index: 4,
      };
      expect(getBigLineChartTicksByData(tick)).toEqual('none');
    });
    it('should return block for ticks > 20 and % 5 === 0', () => {
      let tick = {
        ticks: { length: 21 },
        index: 5,
      };
      expect(getBigLineChartTicksByData(tick)).toEqual('block');
    });
    it('should return none for ticks > 20 and % 5 !== 0', () => {
      let tick = {
        ticks: { length: 21 },
        index: 6,
      };
      expect(getBigLineChartTicksByData(tick)).toEqual('none');
    });
    it('should return block for ticks < 8', () => {
      let tick = {
        ticks: { length: 5 },
        index: 1,
      };
      expect(getBigLineChartTicksByData(tick)).toEqual('block');
    });
  });

  it('should sanitizeAccountData', () => {
    expect(
      sanitizeAccountData({
        firstName: 'John',
        lastName: 'Doe',
        mobilePhoneNumber: '+1 (123) 234 456',
        officePhoneNumber: '+1 (123) 234 456',
        preferredContactMethod: 1,
      })
    ).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      mobilePhoneNumber: '+1123234456',
      officePhoneNumber: '+1123234456',
      preferredContactMethod: 1,
    });
    expect(
      sanitizeAccountData({
        firstName: 'John',
        lastName: 'Doe',
        mobilePhoneNumber: null,
      })
    ).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      mobilePhoneNumber: null,
      officePhoneNumber: null,
      preferredContactMethod: null,
    });
  });

  describe('getPieData', () => {
    it('should return color for bigger element', () => {
      const data = [
        { segment: 0, total: 35, percentage: 12.1951219512195 },
        { segment: -1, total: 16, percentage: 63.4146341463415 },
        { segment: 1, total: 19, percentage: 7.31707317073171 },
      ];
      expect(getPieData(data, ProjectModel.roleMap, GeneralModel.pieBlueMap)).toEqual([
        {
          color: '#00346B',
          percentage: 12.1951219512195,
          segment: 0,
          total: 35,
          x: 'Developer',
          y: 35,
        },
        {
          color: '#AAAAAA',
          percentage: 63.4146341463415,
          segment: -1,
          total: 16,
          x: undefined,
          y: 16,
        },
        {
          color: '#006DF7',
          percentage: 7.31707317073171,
          segment: 1,
          total: 19,
          x: 'General Contractor',
          y: 19,
        },
      ]);
    });
  });
});
