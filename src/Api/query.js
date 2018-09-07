const axios = require('axios');
const qs = require('qs');

let lastUrl = '';
function getQueryUrl(reGet) {
  if (lastUrl && !reGet) {
    return Promise.resolve(lastUrl);
  }
  return axios.get('https://kyfw.12306.cn/otn/leftTicket/init', {
    responseType: 'text',
  }).then((res) => {
    const url = res.data.match(/(leftTicket\/query[A-Z]?)/g)[0];
    lastUrl = `/otn/${url}`;
    return lastUrl;
  });
}

function mapTextToNumber(t) {
  const text = t && t.trim();
  if (!text) {
    return 0;
  }

  if (text.indexOf('有') !== -1) {
    return 500; // 有票映射为500
  }

  return parseInt(text, 10) || 0;
}

module.exports = httpClient => (fromCode, toCode, date) => {
  return getQueryUrl().then((url) => {
    const query = {
      'leftTicketDTO.train_date': date,
      'leftTicketDTO.from_station': fromCode,
      'leftTicketDTO.to_station': toCode,
      purpose_codes: 'ADULT',
    };
    return httpClient.get(`${url}?${qs.stringify(query)}`);
  }).then((res) => {
    return res.data.result.map((row) => {
      const arr = row.split('|');
      return {
        secretStr: arr[0],
        buttonTextInfo: arr[1],
        train_no: arr[2],
        station_train_code: arr[3],
        start_station_telecode: arr[4],
        end_station_telecode: arr[5],
        from_station_telecode: arr[6],
        to_station_telecode: arr[7],
        start_time: arr[8],
        arrive_time: arr[9],
        lishi: arr[10],
        canWebBuy: arr[11],
        yp_info: arr[12],
        start_train_date: arr[13],
        train_seat_feature: arr[14],
        location_code: arr[15],
        from_station_no: arr[16],
        to_station_no: arr[17],
        seat_types: arr[35],
        swz_num: mapTextToNumber(arr[32]), // 商务
        tz_num: mapTextToNumber(arr[25]), // 特等
        zy_num: mapTextToNumber(arr[31]), // 一等
        ze_num: mapTextToNumber(arr[30]), // 二等
        gr_num: mapTextToNumber(arr[21]), // 高级软卧
        rw_num: mapTextToNumber(arr[23]), // 软卧
        yw_num: mapTextToNumber(arr[28]), // 硬卧
        rz_num: mapTextToNumber(arr[24]), // 软座
        yz_num: mapTextToNumber(arr[29]), // 硬座
        wz_num: mapTextToNumber(arr[26]), // 无座
      };
    });
  });
};
