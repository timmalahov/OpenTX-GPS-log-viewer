import { LogItemInterface } from './logItem';

const convertLogToPolygon = (logData: Array<LogItemInterface>) => {
  return `# route
	    ${logData
        .filter((item) => !!item.GPS)
        .map((item) => item.GPS.replace(' ', ', '))
        .join('\n')}`;
};

export default convertLogToPolygon;
