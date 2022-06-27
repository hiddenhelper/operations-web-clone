import moment, { Moment } from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { GeneralModel, ResourceModel, StatisticsModel, UserModel } from '../modules/models';
import { stateMap } from '../constants/territory';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';

export const EMAIL_REGEXP = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PHONE_MASK = '(...) ...-....';
export const PHONE_MASK_LIST = { mx: PHONE_MASK, pr: PHONE_MASK };

const CANADA_TAX_ID_REGEX = /^((\d{2})([-])(\d{7})|(\d{3})([-])(\d{2})([-])(\d{4}))$/;
const MEXICO_TAX_ID_REGEX = /^[A-Za-z]{3,4}[-]{0,1}[0-9]{6}[-]{0,1}[0-9A-Za-z]{3}$/;
const USA_TAX_ID_REGEX = /^(\d{2})([-])(\d{7})$/;

export const TAX_ID_REGEXP_LIST = [CANADA_TAX_ID_REGEX, MEXICO_TAX_ID_REGEX, USA_TAX_ID_REGEX];

export const TAG_ID_MASK = Array(12).fill(/[0-9A-Fa-f]/);

export const getFontBaseValue = (defaultFontSize = 16): number => {
  return defaultFontSize;
};

export const toREM = (value: number): string => {
  const baseValue = getFontBaseValue();
  return `${value * (1 / baseValue)}rem`;
};

export const hexToRgb = (hex: string): string | null => {
  const hexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const rgb = hex.replace(hexRegex, (m, r, g, b) => `${r}${r}${g}${g}${b}${b}`);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
  const toBase16 = (value: string) => parseInt(value, 16);

  return result ? `${toBase16(result[1])}, ${toBase16(result[2])}, ${toBase16(result[3])}` : null;
};

export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 B';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const isObject = entity => entity && typeof entity === 'object' && entity.constructor === Object;

export const isArray = value => Array.isArray(value);

export const isUndefined = value => value === undefined;

export const isNull = value => value === null;

export const isNumber = value => typeof value === 'number';

export const isString = value => typeof value === 'string';

export const isEmpty = value => {
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  if (isUndefined(value) || isNull(value)) {
    return true;
  }
  if (isArray(value)) {
    return value.length === 0;
  }
  if (isNumber(value)) {
    return Number.isNaN(value);
  }
  if (isString(value)) {
    return value.trim() === '';
  }

  return value === '';
};

export const isUUID = id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const parseNumber = (num: number) => parseInt(String(num).replace(/[,]/g, ''), 10);
export const parseFloatNumber = (num: number) => parseFloat(String(num).replace(/[,]/g, ''));

export const roundNumber = (num: number) => Math.round(num * 100) / 100;

export const injectScript = ({ src, scriptId }: { src: string; scriptId: string }) => {
  if (document.getElementById(scriptId)) return Promise.resolve(document.getElementById(scriptId));
  return new Promise(function(resolve, reject) {
    const script = document.createElement('script');
    script.src = src;
    script.id = scriptId;
    script.type = 'text/javascript';
    script.onload = /* istanbul ignore next */ () => resolve(script);
    script.onerror = /* istanbul ignore next */ () => reject(new Error(`Script load error for ${src}`));
    document.body.append(script);
  });
};

export const disableFocus = () => {
  document.body.classList.add('using-mouse');
  return true;
};

export const enableFocus = () => {
  document.body.classList.remove('using-mouse');
  return true;
};

export const enableFocusOnTab = event => {
  return event.keyCode === 9 ? enableFocus() : false;
};

export const getPrevObjectItem = (obj, currentKey) => {
  const keys = Object.keys(obj);
  const index = keys.indexOf(currentKey);
  const prevKey = index - 1;
  return prevKey < 0 ? obj[currentKey] : obj[keys[prevKey]];
};

export const getNextObjectItem = (obj, currentKey) => {
  const keys = Object.keys(obj);
  const index = keys.indexOf(currentKey);
  const nextKey = index + 1;
  return nextKey >= keys.length ? obj[currentKey] : obj[keys[nextKey]];
};

export const getCompletedStepFields = (stepMap: GeneralModel.IStepMap, currentEntity): GeneralModel.IStepCompletedMap => {
  return Object.entries(stepMap).reduce(
    (accumulator, [key, item]) => ({
      ...accumulator,
      [item.key]: {
        title: item.title,
        order: item.order,
        required: item.fields.reduce((acc, f) => {
          if (f.requiredFunc) return f.requiredFunc({ field: f, accumulator: acc, value: currentEntity[f.name] });
          if (f.fields && Array.isArray(currentEntity[f.name])) {
            const multipleBy = currentEntity[f.name].length > 1 ? currentEntity[f.name].length : 1;
            return acc + f.fields.filter(ff => ff.required).length * multipleBy;
          } else if (f.fields) {
            return acc + f.fields.filter(ff => ff.required).length;
          }
          return f.required ? acc + 1 : acc + 0;
        }, 0),
        completed: item.fields.reduce((acc, f) => {
          if (f.completedFunc) return f.completedFunc({ field: f, accumulator: acc, value: currentEntity[f.name] });
          if (f.fields && Array.isArray(currentEntity[f.name])) {
            currentEntity[f.name].forEach(currentItem => {
              acc = f.fields.map(field => field.required && (field.computePositive || !isEmpty(currentItem[field.name]))).filter(Boolean).length + acc;
            });
            return acc;
          }
          if (f.fields && isObject(currentEntity[f.name])) {
            return (
              f.fields
                .map(field => field.required && (field.computePositive || !isEmpty(currentEntity[f.name] && currentEntity[f.name][field.name])))
                .filter(Boolean).length + acc
            );
          }
          return f.required && (f.computePositive || !isEmpty(currentEntity && currentEntity[f.name])) ? acc + 1 : acc + 0;
        }, 0),
      },
    }),
    {}
  );
};

export const isTempId = (_id: string): boolean => /^temp-/.test(_id);

export const generateTempId = (() => {
  let counter = 0;
  return () => `temp-${++counter}`;
})();

export const parseUrlSearch = <T = { [key: string]: string }>(search: string, initialValue: T = {} as any): T =>
  search
    .replace('?', '')
    .split('&')
    .map(s => s.split('='))
    .reduce(
      (total, [key, value]) => ({
        ...total,
        [key]: value,
      }),
      initialValue
    );

export const safeParse = <T>(item: any, fallback?: any): T => {
  try {
    return JSON.parse(item);
  } catch {
    return fallback !== undefined ? fallback : item;
  }
};

export const formatFreedomBadgeCode = (code: string) => code.replace(/(\w{1,2})(\w{2})(\w{2})/, '$1 $2 $3');
export const formatBadgeCode = (code: string) => (code?.length === 6 ? formatFreedomBadgeCode(code) : code);

export const getDrawerButton = (
  status: ResourceModel.Status,
  id: string,
  type: ResourceModel.Type.CLIENT | ResourceModel.Type.PROJECT,
  version?: string
): { buttonText: string; linkTo: string } => {
  const to = type === ResourceModel.Type.CLIENT ? 'clients' : 'projects';
  const drawerButton = {
    [ResourceModel.Status.DRAFT]: {
      buttonText: 'Edit',
      linkTo: version === 'new' ? `/${to}/wizard-new/${id}` : `/${to}/wizard/${id}`,
    },
    [ResourceModel.Status.ACTIVE]: {
      buttonText: `${type} Detail`,
      linkTo: version === 'new' ? `/${to}/detail-new/${id}` : `/${to}/detail/${id}`,
    },
    [ResourceModel.Status.PENDING_APPROVAL]: {
      buttonText: 'Review',
      linkTo: version === 'new' ? `/${to}/wizard-new/${id}/review` : `/${to}/wizard/${id}/review`,
    },
    [ResourceModel.Status.ARCHIVED]: {
      buttonText: `${type} Detail`,
      linkTo: version === 'new' ? `/${to}/detail-new/${id}` : `/${to}/detail/${id}`,
    },
  };
  return drawerButton[status] || drawerButton[ResourceModel.Status.ACTIVE];
};

export const deleteObjectItem = <T>(obj: T, id) => Object.fromEntries(Object.entries(obj).filter(([itemId, value]) => itemId !== id));

export const numberMask = createNumberMask({
  prefix: '',
  suffix: '',
  allowDecimal: true,
});

export const moneyMask = createNumberMask({
  prefix: '$ ',
  suffix: '',
  allowDecimal: true,
});

export const percentageMask = createNumberMask({
  prefix: '',
  suffix: '%',
  allowDecimal: true,
});

export const plainNumberMask = createNumberMask({
  prefix: '',
  suffix: '',
  allowDecimal: true,
  includeThousandsSeparator: false,
});

export const sanitizeNumber = value =>
  parseFloat(
    String(value)
      .replace(/[$,%]/g, '')
      .replace(' ', '')
  );

export const formatNumberWithCommas = num => (!isEmpty(num) ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '');

export const getDefaultValue = (value: any, defaultValue: any = '-') => (isEmpty(value) ? defaultValue : value);

export const getConditionalDefaultValue = (condition: any, value: any, defaultValue: any = '-') =>
  !!condition ? getDefaultValue(value, defaultValue) : defaultValue;

export const getDashIfNull = (value: any, defaultValue: any) => {
  if (isNull(value)) {
    return '-';
  }
  return defaultValue;
};

export const getFormattedDate = (date: number | string, format: GeneralModel.DateFormat) =>
  date ? moment(date).format(GeneralModel.dateFormatMap[format]) : null;

export const formatIdNumber = (id: string) => `${id.slice(0, 3)}-${id.slice(3, 5)}-${id.slice(5)}`;

export const getFormattedOptionList = (item: GeneralModel.INamedEntity): GeneralModel.ISelectOption => ({ value: item.id, label: item.name });

export const getOptionListFromMap = map => Object.entries(map).map(([key, value]) => ({ value: key, label: value as any }));

export const getOptionListFromNamedEntities = list => list.map(option => getFormattedOptionList(option));

export const getListDefaultValue = (list: { [key: string]: string[] } = {}, key: string, defaultValue: string = '') => {
  return list[key] ? list[key][0] : defaultValue;
};

export const getHideOverflowClass = (list: any[], ref: any, className: string) =>
  list.length < 5 && ref.current && ref.current.offsetHeight >= 395 ? className : '';

export const getListWithCommas = (listItems: GeneralModel.INamedEntity[]) => {
  const formattedList = listItems.map((item, index) => item.name).join(', ');
  return `${formattedList}${getConditionalDefaultValue(formattedList.length, '.', '-')}`;
};

export const getImageUrl = (file: Partial<File>) => (file ? URL.createObjectURL(file) : null);

export const getFileNames = files =>
  Object.entries(files).reduce(
    (totalFileNames, [currentFileKey, currentFileValue]) => ({
      ...totalFileNames,
      [currentFileKey]: (currentFileValue as any).file.name,
    }),
    {}
  );

export const getBooleanDefaultValue = (currentValue: boolean, truthyValue: string, falsyValue: string, defaultValue = '-') =>
  isEmpty(currentValue) ? defaultValue : currentValue ? truthyValue : falsyValue;

export const sortByCreatedDate = (a, b) => (b.createdAt || '').localeCompare(a.createdAt || '');
export const sortByOrder = (a, b) => a.order - b.order;

export const formatPhoneNumber = (number: string) => {
  return !isEmpty(number) ? formatIncompletePhoneNumber(number) : '-';
};

export const sanitizePhoneNumber = (number: string) =>
  String(number)
    .replace(/[()-]/g, '')
    .replace(/ /g, '');

export const getDateFromMomentDateTime = (date: Moment, time: Moment) =>
  moment(date).set({
    hour: time.get('hour'),
    minute: time.get('minute'),
    second: 0,
    millisecond: 0,
  });

export const getTimeFromNow = (dateTime: string) => {
  return moment(new Date(moment.utc(dateTime).format())).fromNow();
};

export const parseQuery = (query): string =>
  Object.keys(query)
    .filter(key => query[key] !== undefined)
    .map(key =>
      Array.isArray(query[key])
        ? query[key].map(item => `${key}=${item}`).join('&')
        : `${key}=${query[key] && typeof query[key] === 'object' ? JSON.stringify(query[key]) : query[key]}`
    )
    .join('&');

export const getQueryParamsFromString = queryString => {
  try {
    const query = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = JSON.parse(decodeURIComponent(pair[1] || ''));
    }
    return query;
  } catch {
    return '';
  }
};

export const sanitizePaginationQuery = ({ page = 1, limit = 30, ...rest }: any) => ({
  pageNumber: page,
  pageSize: limit,
  ...rest,
});

export const getFormattedDecimalNumber = (value: number) => (isEmpty(value) ? null : value.toFixed(2));

export const getVisitorBadgeText = badgeNumber => `VISITOR #${getConditionalDefaultValue(badgeNumber, String(badgeNumber).padStart(4, '0'), '')}`;

export const noop = () => {
  /**/
};

export const getLineChartTicksByData = tick => {
  if (tick.ticks.length > 8 && tick.ticks.length < 20) {
    return tick.index % 3 === 0 ? 'block' : 'none';
  }
  if (tick.ticks.length > 20) {
    return tick.index % 6 === 0 ? 'block' : 'none';
  }
  return 'block';
};

export const getBigLineChartTicksByData = tick => {
  if (tick.ticks.length > 15 && tick.ticks.length < 20) {
    return tick.index % 3 === 0 ? 'block' : 'none';
  }
  if (tick.ticks.length > 20) {
    return tick.index % 5 === 0 ? 'block' : 'none';
  }
  return 'block';
};

export const sanitizeAccountData = (data: UserModel.IAccount) => ({
  ...data,
  preferredContactMethod: isEmpty(data.preferredContactMethod) ? null : Number(data.preferredContactMethod),
  mobilePhoneNumber: isEmpty(data.mobilePhoneNumber) ? null : sanitizePhoneNumber(data.mobilePhoneNumber),
  officePhoneNumber: isEmpty(data.officePhoneNumber) ? null : sanitizePhoneNumber(data.officePhoneNumber),
});

export const toggleArray = (list, item) => {
  const currentList = [...list];
  const index = currentList.indexOf(item);
  if (index !== -1) {
    currentList.splice(index, 1);
    return currentList;
  }
  currentList.push(item);
  return currentList;
};

export const getPieData = (data: StatisticsModel.IPieChartData[], dataMap: any, colorMap: { [key: number]: string }) => {
  const pieData = [...data];
  const notDefinedIndex = pieData.findIndex(entry => entry.segment === -1);
  let notDefinedElement = null;
  if (notDefinedIndex > -1) {
    notDefinedElement = pieData[notDefinedIndex];
    pieData.splice(notDefinedIndex, 1);
  }
  let result = pieData.map((entry, index) => ({
    ...entry,
    x: dataMap[entry.segment],
    y: entry.total,
    color: colorMap[index],
  }));
  if (notDefinedIndex > -1) {
    result = [
      ...result.slice(0, notDefinedIndex),
      {
        ...notDefinedElement,
        x: dataMap[notDefinedElement.segment],
        y: notDefinedElement.total,
        color: '#AAAAAA',
      },
      ...result.slice(notDefinedIndex),
    ];
  }
  return result;
};

export const getLocationList = () => [{ id: '', name: 'All Locations' }, ...Object.entries(stateMap).map(([key, value]) => ({ id: key, name: value }))];
