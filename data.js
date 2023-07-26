const enums = {

  platform: ['A', 'I', 'W', 'O', 'AD'], // A = Android, I = iOS, W = Web, O = Other, AD = Admin

  status: ['Y', 'N'],

  bankProvider: ['C'], // C = cashfree

  adminLogTypes: ['L', 'PC', 'RP'], // L = Login, PC = Password Change, RP = ResetPassword
  adminStatus: ['Y', 'B', 'D'],
  adminType: ['SUPER', 'SUB'],
  adminLogKeys: ['D', 'W', 'P', 'KYC', 'BD', 'SUB', 'AD', 'AW', 'PC', 'L', 'PB', 'M', 'ML', 'CR', 'S', 'SLB', 'LB', 'CF', 'MP', 'SUAT'], // D = DEPOSIT, W = WITHDRAW, P = PROFILE, BD = BANK DETAILS, SA = SUBADMIN, AD = ADMIN DEPOSIT, AW = ADMIN WITHDRAW, PC = PROMOCODE, L = LEAGUE, PB = PRIZE BREAKUP, M = MATCH, ML = MATCHLEAGUE, CR = COMMON RULE, S = SETTINGS, SL= SERIES LEADERBOARD, LLB = LOAD LEADERBOARD, SUAT = SUPER ADMIN TEAM

  adminPay: ['PAY'],

  adminPermissionType: ['R', 'W', 'N'], // R = READ, W = WRITE, N = NONE - Access Rights
  adminPermission: [
    'SUBADMIN',
    'PERMISSION',
    'ADMIN_ROLE',
    'BANNER',
    'BOT_LOG',
    'CMS',
    'RULE',
    'COMPLAINT',
    'DASHBOARD',
    'EMAIL_TEMPLATES',
    'KYC',
    'LEAGUE',
    'MAINTENANCE',
    'MATCH',
    'MATCHLEAGUE',
    'MATCHPLAYER',
    'NOTIFICATION',
    'PUSHNOTIFICATION',
    'OFFER',
    'PASSBOOK',
    'SYSTEM_USERS',
    'PAYMENT_OPTION',
    'PAYOUT_OPTION',
    'PLAYER',
    'ROLES',
    'POPUP_ADS',
    'PREFERENCES',
    'PROMO',
    'SEASON',
    'SCORE_POINT',
    'SERIES_LEADERBOARD',
    'SETTING',
    'SPORT',
    'TEAM',
    'BANKDETAILS',
    'USERS',
    'LEADERSHIP_BOARD',
    'STATISTICS',
    'BALANCE',
    'DEPOSIT',
    'USERLEAGUE',
    'TDS',
    'USERTEAM',
    'WITHDRAW',
    'VERSION',
    'REPORT'
  ],
  complainStatus: ['P', 'I', 'D', 'R'], // Pending In-Progress Declined Resolved
  complaintsStatus: ['P', 'I', 'D', 'R'], // Pending, In-Progress, Declined, Resolved
  issueType: ['C', 'F'], // C = Complaints, F = Feedbacks
  imageFormat: [{ extension: 'jpeg', type: 'image/jpeg' }, { extension: 'jpg', type: 'image/jpeg' }, { extension: 'png', type: 'image/png' }, { extension: 'gif', type: 'image/gif' }, { extension: 'svg', type: 'image/svg+xml' }, { extension: 'heic', type: 'image/heic' }, { extension: 'heif', type: 'image/heif' }],
  otpType: ['E', 'M'], // Email | Mobile
  otpAuth: ['L'] // Register | ForgotPass | Verification | Login
}

module.exports = enums
