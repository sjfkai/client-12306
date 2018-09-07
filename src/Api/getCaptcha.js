module.exports = httpClient => () => httpClient.get(
  `passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand&${Math.random()}`,
  { responseType: 'arraybuffer' },
);
