
module.exports = {
  port: 3030,
  mongodb_url: 'mongodb+srv://levkiv:1234567890@testcluster-oqqlz.mongodb.net/test?retryWrites=true&w=majority',
  session_managment: {
    expiery_time: 24 * 60 * 60 * 1000, // 1 day
    jwt: {
      cert: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDP8uEOW3I7NfUTn1396JR9Os8pF0JXZVMNT16Up+XDqv6cC8hpx+YptUrnycinIvSOjWsf6VGx151DUg9nJaJpmRoVwS9xZsb9wmiF64BecZoS5Rnjig6WW1RjA6iuxiOCA008rMXCB3oaIcFi7bCWBC2UGi09/RQDMdBzIRqTKwtfqy91giNJAJR24aoJAHgV//TEgR2hOm11gB48M4MolhWA5JSaOJW4PSiMejDcZVXm409xNXkPgB1RYa+3tc+OpLk8BXBD8aLkONOcrULvpDO2hQIOLGRjFcoXyQ19lFqtA1ZuEsAag3RjTbR1iZBdcdt0g8p/VgpUWUtZWvYUTL7TNatbBleyt+Q0r48ISwoFaEPfhI6EBONHagnyU9ESsCQggMw20pvL05urMMQD4ZokXcI/2kuE5Yt3YnJxs7VRjj4enFkSQS+/95NBFR0Jea07rlV/n4DJXPPF+i2vvCLDQsE/sG5ed53Krt3zeq4yWa5HeKri+lX2oGttE34aNs6q+pcynUUmr9wIQIh6G//l1LeD4MpglzsOEtIrKko45m4180bx1pUB4RHwviqxg1EKQjzy53P7mmN4X0mS/iW2J++0QrY+lIGs9ykJzt+DWBx280dDi1chcTbB0RxwwcuHyKCvScIEidKdT8khzS0DDDiEsqCbGjMT3bLapw== mykola.levkiv@gmail.com',
    },
  }
};
