const captchaAnswer = [
  [42, 46],
  [105, 46],
  [184, 45],
  [256, 48],
  [117, 36],
  [115, 112],
  [181, 114],
  [252, 111],
];


module.exports = httpClient => (answers) => {
  const answer = answers.map(i => captchaAnswer[i - 1].join(',')).join(',');
  return httpClient.post(
    'passport/captcha/captcha-check',
    {
      answer,
      login_site: 'E',
      rand: 'sjrand',
    },
  );
};
