backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── cloudinary.js  
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── wallet.controller.js
│   │   ├── task.controller.js
│   │   ├── transaction.controller.js
│   │   ├── deposit.controller.js
│   │   ├── withdrawal.controller.js
│   │   ├── notification.controller.js
│   │   ├── referral.controller.js
│   │   └── admin.controller.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Wallet.js
│   │   ├── Task.js
│   │   ├── Transaction.js
│   │   ├── Deposit.js
│   │   ├── Withdrawal.js
│   │   ├── Notification.js
│   │   ├── Referral.js
│   │   └── Admin.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── wallet.routes.js
│   │   ├── task.routes.js
│   │   ├── transaction.routes.js
│   │   ├── deposit.routes.js
│   │   ├── withdrawal.routes.js
│   │   ├── notification.routes.js
│   │   ├── referral.routes.js
│   │   └── admin.routes.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── errorHandler.js
│   │   ├── notFound.js
│   │   └── validate.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── wallet.service.js
│   │   ├── task.service.js
│   │   ├── email.service.js
│   │   └── notification.service.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── generateOTP.js
│   │   ├── apiResponse.js
│   │   ├── asyncHandler.js
│   │   └── constants.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── user.validator.js
│   │   └── task.validator.js
│   │
│   ├── uploads/
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md










AUTHENTICATION
├── Register ✅
├── Login ✅
├── JWT generation ✅
│
├── Authentication middleware  ✅
│
└── Authorization / RBAC       ✅

USER
├── Get current user (/me)✅
├── Update profile✅
└── Account settings✅

WALLET
├── Wallet
├── Balance
├── Deposit
├── Withdrawal
└── Transactions

TASKS
├── Task listing
├── Task details
├── Submit task
└── Task history

REFERRALS
├── Referral code
├── Referral users
└── Referral rewards

NOTIFICATIONS
└── User notifications

ADMIN
├── Dashboard
├── Users
├── Tasks
├── Deposits
├── Withdrawals
└── Transactions


| Setting                   | Purpose                                              | Endpoint                 |
| ------------------------- | ---------------------------------------------------- | ------------------------ |
| Change password           | Allow user to change their password                  | `PUT /api/user/password` |✅
| Change email              | Change account email                                 | `PUT /api/user/email`    |✅
| Account status            | Usually display whether account is active            | Read-only                |
| Delete/deactivate account | Allow user to close their account                    | `DELETE /api/user/me`    |
| Logout                    | Invalidate the user's session/token strategy         | `POST /api/auth/logout`  |
| Account information       | Display username, email, account creation date, etc. | `GET /api/user/me`       |
