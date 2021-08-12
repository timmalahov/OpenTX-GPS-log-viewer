import {LogItemInterface} from "./logItem";

const convertCSVToJSON = (csv: string): Array<LogItemInterface> | null => {
  const lines = csv.split('\n');
  const result = [];

  // NOTE: If your columns contain commas in their values, you'll need
  // to deal with those before doing the next step
  // (you might convert them to &&& or something, then covert them back later)
  // jsfiddle showing the issue https://jsfiddle.net/
  const headers = lines[0].split(',');

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');

    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < headers.length; j++) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  // return JSON.stringify(result);
  return result;
};

export default convertCSVToJSON;
