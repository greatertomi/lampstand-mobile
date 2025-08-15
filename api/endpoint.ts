type Endpoint = {
  [key: string]: `/${string}`;
};

export const endpoints: Endpoint = {
  signup: '/auth/signup',
  login: '/auth/login',
  currentUser: '/users/me',
  createReadingGoal: '/goals/create',
  getReadingGoal: '/goals',
  profilePicture: '/users/profile-picture',
  saveBookBackend: '/books/save',
  editUserProfile: '/users/update/me',
  saveMultipleBooks: '/books/saveMultiple',
  getBooks: '/books',
  deleteBook: '/books/delete',
  resetPassword: '/auth/reset-password',
  verifyResetToken: '/auth/verify-reset-token',
  updatePassword: '/auth/update-password',
  createReadingLog: '/readingLogs/create',
  fetchReadingLogs: '/readingLogs',
  activityStreaks: '/reports/activity-streaks',
  currentStreaks: '/reports/current-streaks',
  deleteAccount: '/users/remove-account',
  resendVerificationEmail: '/auth/resend-verification-email',
  deleteManyBooks: '/books/deleteMany',
  fetchDailyReadingStats: '/reports/daily-reading-activities',
  fetchWeeklyReadingStats: '/reports/weekly-reading-activities',
  googleOauth: '/oauth/mobile/google',
  sendComplaint: '/support/complaint',
  sendFeedback: '/support/feedback'
};
