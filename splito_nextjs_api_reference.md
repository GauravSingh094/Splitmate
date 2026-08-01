# Splito — Complete API Reference for Next.js Frontend
# Stack: Next.js (App Router recommended) + Splito FastAPI Backend
# Base URL: https://apiv1.splitmate.page/api/v1
# Interactive docs: https://apiv1.splitmate.page/api/v1/docs

---

# ═══════════════════════════════════════════════════════════
# SECTION 1 — FOUNDATION
# ═══════════════════════════════════════════════════════════

## Base URL
```
https://apiv1.splitmate.page/api/v1
```

## Auth header (all protected endpoints)
```
Authorization: Bearer <access_token>
```

## Content-Type (all POST/PATCH requests)
```
Content-Type: application/json
```

## Token strategy for Next.js
- Store access_token in memory (React state / Zustand)
- Store refresh_token in httpOnly cookie (most secure) or localStorage
- access_token expires: 30 minutes
- refresh_token expires: 7 days
- On any 401 response → call POST /auth/refresh → retry original request
- If refresh also returns 401 → clear tokens → redirect to /login

## Recommended Next.js API client setup
```typescript
// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apiv1.splitmate.page/api/v1'

async function apiRequest(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  }
  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  if (res.status === 401) {
    // trigger token refresh here
  }
  return res
}
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 2 — AUTH ENDPOINTS
# ═══════════════════════════════════════════════════════════

## POST /auth/register
Creates account. Sends verification email automatically.
User CANNOT login until email is verified.

Request:
```json
{
  "name": "Mandeep",
  "email": "mandeep@gmail.com",
  "password": "StrongPass123"
}
```
Validations: name 1-100 chars, password 8-128 chars, valid email

Response 201:
```json
{
  "id": "uuid",
  "name": "Mandeep",
  "email": "mandeep@gmail.com",
  "preferred_currency": "INR",
  "is_active": true,
  "is_email_verified": false
}
```
Errors:
- 409 USER_ALREADY_EXISTS

Next.js note: After register, redirect to /verify-email-pending page.
Never auto-login after register — email must be verified first.

---

## POST /auth/login
Returns JWT tokens. Blocks unverified users.

Request:
```json
{
  "email": "mandeep@gmail.com",
  "password": "StrongPass123"
}
```

Response 200:
```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```
Errors:
- 401 INVALID_CREDENTIALS — wrong email/password
- 403 EMAIL_NOT_VERIFIED — show "check your inbox" message + resend button

Next.js note: On EMAIL_NOT_VERIFIED redirect to /verify-email-pending,
pass email in query param so resend button works.

---

## POST /auth/refresh
Get new token pair using refresh token.

Request:
```json
{
  "refresh_token": "eyJ..."
}
```

Response 200: Same shape as login response.

Errors:
- 401 TOKEN_EXPIRED — force re-login

Next.js note: Call this silently in background. User should never
see this happening. Use an axios/fetch interceptor pattern.

---

## POST /auth/verify-email
Submit token from verification email.

Request:
```json
{
  "token": "token_from_email_url"
}
```

Response 200:
```json
{
  "message": "Email verified successfully. You can now log in."
}
```
Errors:
- 400 INVALID_TOKEN — expired or already used

Next.js note: Create page /verify-email that reads ?token= from URL,
auto-calls this endpoint on mount, shows loading → success → redirect to login.

---

## POST /auth/resend-verification
Resend verification email.

Request:
```json
{
  "email": "mandeep@gmail.com"
}
```

Response 200:
```json
{
  "message": "If that email is registered, a verification link has been sent."
}
```
Always 200 — never reveals if email exists.

---

## POST /auth/forgot-password
Send password reset email.

Request:
```json
{
  "email": "mandeep@gmail.com"
}
```

Response 200:
```json
{
  "message": "If that email is registered, a password reset link has been sent. Check your inbox."
}
```
Always 200.

---

## POST /auth/reset-password
Submit new password with token from email.

Request:
```json
{
  "token": "token_from_email_url",
  "new_password": "NewStrongPass123"
}
```

Response 200:
```json
{
  "message": "Password reset successfully. You can now log in."
}
```
Errors:
- 400 INVALID_TOKEN

Next.js note: Create page /reset-password that reads ?token= from URL,
shows password input form, submits to this endpoint.

---

# ═══════════════════════════════════════════════════════════
# SECTION 3 — USER ENDPOINTS
# ═══════════════════════════════════════════════════════════

## GET /users/me ⭐ Protected
Get current logged-in user.

Response 200:
```json
{
  "id": "uuid",
  "name": "Mandeep",
  "email": "mandeep@gmail.com",
  "preferred_currency": "INR",
  "is_active": true,
  "is_email_verified": true
}
```

Next.js note: Call on app load to check auth state.
If 401 → user not logged in → redirect to /login.
Use this as your auth guard.

---

## PATCH /users/me ⭐ Protected
Update profile. All fields optional.

Request:
```json
{
  "name": "New Name",
  "preferred_currency": "USD"
}
```

Response 200: Updated UserResponse.

---

# ═══════════════════════════════════════════════════════════
# SECTION 4 — GROUP ENDPOINTS
# ═══════════════════════════════════════════════════════════

## POST /groups ⭐ Protected
Create group. Creator auto-added as ADMIN.

Request:
```json
{
  "name": "Goa Trip",
  "default_currency": "INR"
}
```
Validations: name 1-255 chars, currency exactly 3 chars

Response 201:
```json
{
  "id": "uuid",
  "name": "Goa Trip",
  "default_currency": "INR",
  "status": "ACTIVE",
  "created_by": "uuid",
  "created_at": "2026-05-20T10:00:00Z",
  "members_count": 1,
  "members": [
    {
      "user_id": "uuid",
      "name": "Mandeep",
      "email": "mandeep@gmail.com",
      "role": "ADMIN",
      "status": "ACTIVE",
      "joined_at": "2026-05-20T10:00:00Z"
    }
  ]
}
```

---

## GET /groups ⭐ Protected
List all groups for current user. Only ACTIVE groups returned.

Response 200: Array of GroupResponse:
```json
[
  {
    "id": "uuid",
    "name": "Goa Trip",
    "default_currency": "INR",
    "status": "ACTIVE",
    "created_by": "uuid",
    "created_at": "2026-05-20T10:00:00Z",
    "members_count": 4
  }
]
```

---

## GET /groups/{group_id} ⭐ Protected
Get group detail with full members list.

Response 200: GroupDetailResponse (same as create, includes members array)

Errors:
- 404 GROUP_NOT_FOUND
- 422 USER_NOT_IN_GROUP

---

## PATCH /groups/{group_id} ⭐ Protected · Admin only
Update group name.

Request:
```json
{
  "name": "Updated Trip Name"
}
```

Response 200: GroupDetailResponse
Errors: 403 FORBIDDEN

---

## PATCH /groups/{group_id}/archive ⭐ Protected · Admin only
Archive a group. Clears balance cache.
No request body needed.

Response 200: GroupDetailResponse with status: "ARCHIVED"
Errors: 403 FORBIDDEN

Next.js note: After archive, remove group from list UI immediately.
Archived groups do not appear in GET /groups.

---

# ═══════════════════════════════════════════════════════════
# SECTION 5 — GROUP MEMBER ENDPOINTS
# ═══════════════════════════════════════════════════════════

## GET /groups/{group_id}/members ⭐ Protected
List active members.

Response 200:
```json
[
  {
    "user_id": "uuid",
    "name": "Rahul",
    "email": "rahul@gmail.com",
    "role": "MEMBER",
    "status": "ACTIVE",
    "joined_at": "2026-05-20T10:00:00Z"
  }
]
```

---

## POST /groups/{group_id}/members ⭐ Protected
Add member by email. User must have a Splito account.

Request:
```json
{
  "email": "friend@gmail.com"
}
```

Response 201: GroupMemberResponse of new member.

Errors:
- 404 USER_NOT_FOUND — no Splito account with that email
- 409 USER_ALREADY_IN_GROUP

Next.js note: Show email search input. User must already be registered.
No invite system — direct add only.

---

## DELETE /groups/{group_id}/members/{user_id} ⭐ Protected · Admin only
Remove member. Fails if member has outstanding balance.

Response 204: No content.

Errors:
- 403 FORBIDDEN
- 422 OUTSTANDING_BALANCE_EXISTS — must settle first
- 422 USER_NOT_IN_GROUP

---

# ═══════════════════════════════════════════════════════════
# SECTION 6 — EXPENSE ENDPOINTS
# ═══════════════════════════════════════════════════════════

## POST /groups/{group_id}/expenses ⭐ Protected
Create expense. Send Idempotency-Key header to prevent duplicates on retry.

Headers:
```
Idempotency-Key: <random-uuid>   (recommended)
```

Only send the participants field matching your split_type.

### EQUAL split — everyone pays same
```json
{
  "title": "Dinner",
  "description": "Optional description",
  "total_amount": "3000",
  "currency": "INR",
  "paid_by_user_id": "uuid",
  "split_type": "EQUAL",
  "participants_equal": [
    { "user_id": "uuid1" },
    { "user_id": "uuid2" },
    { "user_id": "uuid3" }
  ]
}
```

### EXACT split — specific amounts per person
```json
{
  "title": "Hotel",
  "total_amount": "3000",
  "currency": "INR",
  "paid_by_user_id": "uuid",
  "split_type": "EXACT",
  "participants_exact": [
    { "user_id": "uuid1", "owed_amount": "1000" },
    { "user_id": "uuid2", "owed_amount": "500" },
    { "user_id": "uuid3", "owed_amount": "1500" }
  ]
}
```

### PERCENTAGE split — must sum to 100
```json
{
  "title": "Cab",
  "total_amount": "1000",
  "currency": "INR",
  "paid_by_user_id": "uuid",
  "split_type": "PERCENTAGE",
  "participants_percentage": [
    { "user_id": "uuid1", "percentage": "40" },
    { "user_id": "uuid2", "percentage": "30" },
    { "user_id": "uuid3", "percentage": "30" }
  ]
}
```

### SHARE split — proportional to share count
```json
{
  "title": "Groceries",
  "total_amount": "900",
  "currency": "INR",
  "paid_by_user_id": "uuid",
  "split_type": "SHARE",
  "participants_share": [
    { "user_id": "uuid1", "shares": 2 },
    { "user_id": "uuid2", "shares": 1 },
    { "user_id": "uuid3", "shares": 1 }
  ]
}
```

Response 201:
```json
{
  "id": "uuid",
  "group_id": "uuid",
  "paid_by_user_id": "uuid",
  "paid_by_name": "Mandeep",
  "title": "Dinner",
  "description": "Friday dinner",
  "total_amount": "3000.00",
  "currency": "INR",
  "split_type": "EQUAL",
  "status": "ACTIVE",
  "created_at": "2026-05-20T10:00:00Z",
  "participants": [
    {
      "user_id": "uuid1",
      "name": "Mandeep",
      "owed_amount": "1000.00",
      "percentage": null,
      "shares": null
    }
  ]
}
```

Errors:
- 422 INVALID_SPLIT_TOTAL
- 422 INVALID_SPLIT_PERCENTAGE
- 422 USER_NOT_IN_GROUP — participant not a member

Next.js improvement notes:
- Show different form based on split_type selection
- Only send the matching participants_* field, set others to null/omit
- Generate uuid for Idempotency-Key on form mount, not on submit
- Validate amounts sum before submitting to avoid round trips

---

## GET /groups/{group_id}/expenses ⭐ Protected
Paginated expense list.

Query params:
- page: int (default 1)
- limit: int (default 20, max 1000)

Response 200:
```json
{
  "items": [ /* ExpenseResponse array */ ],
  "page": 1,
  "limit": 20,
  "total_pages": 5,
  "total_items": 98
}
```

Next.js note: Implement infinite scroll.
Load next page when user scrolls to bottom.
Stop when page >= total_pages.

---

## GET /expenses/{expense_id} ⭐ Protected
Get single expense with participants.

Response 200: Full ExpenseResponse with participants array.
Errors: 404 EXPENSE_NOT_FOUND

---

## PATCH /expenses/{expense_id} ⭐ Protected
Update title/description only. Amounts and splits are immutable.
To change amounts: reverse + recreate.

Request:
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

Response 200: Updated ExpenseResponse.

---

## PATCH /expenses/{expense_id}/reverse ⭐ Protected
Soft-delete expense. Undoes all balance changes.
No request body.

Response 200: ExpenseResponse with status: "REVERSED"
Errors: 404 EXPENSE_NOT_FOUND — already reversed

Next.js note: Show confirmation dialog before reversing.
After reverse, remove from expense list or show with strikethrough.
This cannot be undone.

---

# ═══════════════════════════════════════════════════════════
# SECTION 7 — BALANCE ENDPOINTS
# ═══════════════════════════════════════════════════════════

## GET /groups/{group_id}/balances ⭐ Protected
All non-zero pairwise balances in group.

Response 200:
```json
{
  "group_id": "uuid",
  "currency": "INR",
  "balances": [
    {
      "from_user_id": "uuid-bob",
      "from_user_name": "Bob",
      "to_user_id": "uuid-alice",
      "to_user_name": "Alice",
      "amount": "1000.00",
      "currency": "INR"
    }
  ]
}
```
from_user_id OWES to_user_id the amount.
Empty array = everyone is settled.

---

## GET /groups/{group_id}/balances/simplified ⭐ Protected
Minimum transactions needed to settle all debts.
Use this for the "Settle Up" screen.

Response 200:
```json
{
  "group_id": "uuid",
  "currency": "INR",
  "transactions": [
    {
      "from_user_id": "uuid-bob",
      "from_user_name": "Bob",
      "to_user_id": "uuid-alice",
      "to_user_name": "Alice",
      "amount": "2000.00",
      "currency": "INR"
    }
  ]
}
```

Next.js note: This is what to show on settle up screen.
Each transaction is one payment to make.
Highlight current user's transactions.

---

## GET /users/me/balances ⭐ Protected
Cross-group net balance summary for logged-in user.

Response 200:
```json
[
  {
    "counterpart_user_id": "uuid-alice",
    "counterpart_name": "Alice",
    "net_amount": "1000.00",
    "currency": "INR"
  }
]
```
net_amount positive = you owe them.
net_amount negative = they owe you.

Next.js note: Show on dashboard/home screen.
Color positive amounts RED (you owe), negative GREEN (you're owed).
Only shows active groups — archived groups excluded.

---

# ═══════════════════════════════════════════════════════════
# SECTION 8 — SETTLEMENT ENDPOINTS
# ═══════════════════════════════════════════════════════════

## POST /groups/{group_id}/settlements ⭐ Protected
Record a payment. Reduces the debt.

Request:
```json
{
  "from_user_id": "uuid-bob",
  "to_user_id": "uuid-alice",
  "amount": "500",
  "currency": "INR",
  "note": "Paid via UPI"
}
```
Validations: amount > 0, amount <= outstanding balance, from != to

Response 201:
```json
{
  "id": "uuid",
  "group_id": "uuid",
  "from_user_id": "uuid-bob",
  "from_user_name": "Bob",
  "to_user_id": "uuid-alice",
  "to_user_name": "Alice",
  "amount": "500.00",
  "currency": "INR",
  "note": "Paid via UPI",
  "status": "COMPLETED",
  "created_at": "2026-05-20T10:00:00Z"
}
```

Errors:
- 422 SELF_SETTLEMENT_INVALID
- 422 SETTLEMENT_EXCEEDS_BALANCE
- 422 USER_NOT_IN_GROUP

Next.js note: Pre-fill from_user_id with current user.
Pre-fill to_user_id and max amount from simplified balances screen.
Show note field as optional.

---

## GET /groups/{group_id}/settlements ⭐ Protected
List all settlements. Newest first.

Response 200: Array of SettlementResponse.

---

# ═══════════════════════════════════════════════════════════
# SECTION 9 — NOTIFICATION ENDPOINTS
# ═══════════════════════════════════════════════════════════

## GET /notifications ⭐ Protected
All notifications for current user. Newest first.

Response 200:
```json
[
  {
    "id": "uuid",
    "type": "EXPENSE_CREATED",
    "title": "New expense added",
    "message": "Rahul added \"Dinner\" — INR3000.00",
    "is_read": false,
    "metadata": {
      "group_id": "uuid",
      "expense_id": "uuid",
      "amount": "3000.00"
    },
    "created_at": "2026-05-20T10:00:00Z"
  }
]
```

Next.js improvement notes:
- Count where is_read == false → show as badge on bell icon
- Poll this endpoint every 30-60 seconds for new notifications
- Or refetch on window focus
- Use metadata to deep-link: EXPENSE_CREATED → /groups/{group_id}/expenses/{expense_id}

---

## PATCH /notifications/read-all ⭐ Protected
Mark all unread as read. Single DB operation.
No request body.

Response 200:
```json
{
  "updated_count": 5
}
```

Next.js note: Call when user opens notifications panel.
Reset badge count to 0 after this.

---

## PATCH /notifications/{notification_id}/read ⭐ Protected
Mark single notification as read.
No request body.

Response 200: Updated NotificationResponse with is_read: true
Errors: 404 NOTIFICATION_NOT_FOUND

---

## Notification types reference

| type | When triggered | Who receives | metadata fields |
|---|---|---|---|
| EXPENSE_CREATED | Expense added to group | All members except creator | group_id, expense_id, amount |
| EXPENSE_REVERSED | Expense reversed | All members except reverser | group_id, expense_id |
| SETTLEMENT_RECORDED | Payment recorded | Only the recipient (to_user) | group_id, settlement_id, amount |
| MEMBER_ADDED | User added to group | Only the new member | group_id |

Next.js deep-link routing from metadata:
```typescript
function getNotificationRoute(notification: Notification): string {
  const { type, metadata } = notification
  switch (type) {
    case 'EXPENSE_CREATED':
    case 'EXPENSE_REVERSED':
      return `/groups/${metadata.group_id}/expenses/${metadata.expense_id}`
    case 'SETTLEMENT_RECORDED':
      return `/groups/${metadata.group_id}/settlements`
    case 'MEMBER_ADDED':
      return `/groups/${metadata.group_id}`
    default:
      return '/notifications'
  }
}
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 10 — ANALYTICS ENDPOINTS
# ═══════════════════════════════════════════════════════════

## GET /groups/{group_id}/analytics ⭐ Protected
Full analytics for one group.

Response 200:
```json
{
  "group_id": "uuid",
  "group_name": "Goa Trip",
  "currency": "INR",
  "total_expenses_amount": "15000.00",
  "total_expense_count": 12,
  "total_settlements_amount": "8000.00",
  "settlement_rate": "53.33",
  "average_expense_amount": "1250.00",
  "largest_expense_amount": "5000.00",
  "largest_expense_title": "Hotel booking",
  "top_spender_name": "Mandeep",
  "members": [
    {
      "user_id": "uuid",
      "name": "Mandeep",
      "total_paid": "9000.00",
      "total_owed": "5000.00",
      "net_balance": "4000.00",
      "expense_count": 7,
      "percentage_of_total": "60.00"
    }
  ],
  "monthly_spending": [
    {
      "year": 2026,
      "month": 5,
      "month_label": "May 2026",
      "total_amount": "7500.00",
      "expense_count": 5
    }
  ]
}
```

Errors:
- 422 USER_NOT_IN_GROUP
- 404 GROUP_NOT_FOUND

Next.js improvement notes:
- monthly_spending has gaps — months with no activity are omitted
- Fill missing months with 0 on frontend for continuous chart
- net_balance positive = member is owed money (GREEN)
- net_balance negative = member owes money (RED)
- settlement_rate is 0-100 float string — use as progress bar percentage
- Use recharts or chart.js for monthly_spending line/bar chart

Fill missing months utility:
```typescript
function fillMissingMonths(data: MonthlySpending[]): MonthlySpending[] {
  const result: MonthlySpending[] = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const existing = data.find(d => d.year === year && d.month === month)
    result.push(existing ?? {
      year, month,
      month_label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      total_amount: '0.00',
      expense_count: 0,
    })
  }
  return result
}
```

Recommended UI for group analytics page:
- Hero: total_expenses_amount in large text
- Progress bar: settlement_rate (label: "X% settled")
- Bar chart: monthly_spending
- Donut chart: members[].percentage_of_total
- Cards: average_expense_amount, largest_expense_amount + title
- Table: members with total_paid, total_owed, net_balance columns
- Badge: top_spender_name with trophy icon

---

## GET /users/me/analytics ⭐ Protected
Cross-group analytics for current user.

Response 200:
```json
{
  "user_id": "uuid",
  "user_name": "Mandeep",
  "total_paid_all_groups": "25000.00",
  "total_owed_to_others": "3000.00",
  "total_others_owe_user": "7000.00",
  "net_balance": "4000.00",
  "total_groups_count": 3,
  "total_expense_count": 18,
  "most_expensive_group_name": "Goa Trip",
  "groups": [
    {
      "group_id": "uuid",
      "group_name": "Goa Trip",
      "total_spent": "15000.00",
      "user_paid": "9000.00",
      "user_owed": "5000.00",
      "expense_count": 7,
      "currency": "INR"
    }
  ],
  "monthly_spending": [
    {
      "year": 2026,
      "month": 5,
      "month_label": "May 2026",
      "total_amount": "9000.00",
      "expense_count": 8
    }
  ]
}
```

Field meanings:
- total_paid_all_groups: total amount user paid as payer across all groups
- total_owed_to_others: total user currently owes others RIGHT NOW
- total_others_owe_user: total others owe user RIGHT NOW
- net_balance: positive = creditor (good), negative = debtor (bad)
- groups[].total_spent: total group spending by ALL members combined
- groups[].user_paid: what this user paid in that group
- groups ordered by total_spent descending

Recommended UI for user analytics page:
- Hero: net_balance — GREEN if positive, RED if negative
- 3 stat cards: total_paid_all_groups | total_owed_to_others | total_others_owe_user
- Line chart: monthly_spending (fill missing months with 0)
- Group breakdown list: ranked by total_spent, show user_paid vs user_owed
- Highlight: most_expensive_group_name

---

# ═══════════════════════════════════════════════════════════
# SECTION 11 — ERROR HANDLING
# ═══════════════════════════════════════════════════════════

## Standard error shape (every error)
```json
{
  "timestamp": "2026-05-20T10:00:00Z",
  "status": 422,
  "error": "INVALID_SPLIT_TOTAL",
  "message": "Exact split amounts sum to 1500, but expense total is 3000.",
  "path": "/api/v1/groups/uuid/expenses",
  "trace_id": "uuid"
}
```

Always use error.error (the code) for programmatic handling.
Use error.message for showing to user.

## Complete error code table

| HTTP | Code | When |
|---|---|---|
| 400 | INVALID_TOKEN | Email/reset token expired or already used |
| 400 | VALIDATION_ERROR | Invalid request body |
| 401 | INVALID_CREDENTIALS | Wrong email or password |
| 401 | TOKEN_EXPIRED | JWT expired |
| 403 | EMAIL_NOT_VERIFIED | Login before verifying email |
| 403 | FORBIDDEN | Non-admin doing admin action |
| 404 | USER_NOT_FOUND | No user with that email |
| 404 | GROUP_NOT_FOUND | Group doesn't exist or archived |
| 404 | EXPENSE_NOT_FOUND | Expense doesn't exist or reversed |
| 404 | SETTLEMENT_NOT_FOUND | Settlement not found |
| 404 | NOTIFICATION_NOT_FOUND | Notification not found or wrong user |
| 409 | USER_ALREADY_EXISTS | Email already registered |
| 409 | USER_ALREADY_IN_GROUP | Already a member |
| 422 | USER_NOT_IN_GROUP | Not an active member |
| 422 | INVALID_SPLIT_TOTAL | Exact amounts don't match total |
| 422 | INVALID_SPLIT_PERCENTAGE | Percentages don't sum to 100 |
| 422 | OUTSTANDING_BALANCE_EXISTS | Remove member with pending debt |
| 422 | SELF_SETTLEMENT_INVALID | Settling with yourself |
| 422 | SETTLEMENT_EXCEEDS_BALANCE | Paying more than owed |
| 422 | DOMAIN_ERROR | General business rule violation |
| 500 | INTERNAL_ERROR | Server error |

## Next.js error handler utility
```typescript
interface ApiError {
  timestamp: string
  status: number
  error: string
  message: string
  path: string
  trace_id: string
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error: ApiError = await res.json()
    throw error
  }
  return res.json()
}

// Usage in component:
try {
  const data = await handleResponse<ExpenseResponse>(res)
} catch (err) {
  const error = err as ApiError
  switch (error.error) {
    case 'INVALID_SPLIT_TOTAL':
      setFormError('Split amounts must equal total expense')
      break
    case 'EMAIL_NOT_VERIFIED':
      router.push(`/verify-email-pending?email=${email}`)
      break
    default:
      toast.error(error.message)
  }
}
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 12 — DATA TYPES & CONVENTIONS
# ═══════════════════════════════════════════════════════════

## Money amounts
All amounts are DECIMAL STRINGS not numbers.
"3000.00" not 3000 or 3000.0
Never use JavaScript float for money — use a library:
```
npm install decimal.js
```
```typescript
import Decimal from 'decimal.js'
const total = new Decimal(expense.total_amount)
const formatted = total.toFixed(2)  // "3000.00"
```

## UUIDs
All IDs are UUID strings.
Store as string. Send as string. Never parse as number.

## Datetimes
All datetimes are ISO 8601 UTC.
"2026-05-20T10:00:00Z"
Convert to local time for display:
```typescript
const local = new Date(created_at).toLocaleDateString()
```

## Pagination
Only expenses are paginated.
page starts at 1 (not 0).
Stop fetching when page >= total_pages.

---

# ═══════════════════════════════════════════════════════════
# SECTION 13 — ENUM VALUES REFERENCE
# ═══════════════════════════════════════════════════════════

## Group status
ACTIVE   → normal, usable
ARCHIVED → closed by admin, read-only, excluded from balances

## Member role
ADMIN  → can archive group, remove members
MEMBER → can add expenses, settle

## Member status
ACTIVE   → currently in group
LEFT     → left voluntarily
REMOVED  → removed by admin
INVITED  → invitation pending
BLOCKED  → blocked

## Expense status
ACTIVE   → live expense
REVERSED → soft-deleted, undone
SETTLED  → all debts paid

## Split types
EQUAL      → use participants_equal
EXACT      → use participants_exact (amounts must sum to total)
PERCENTAGE → use participants_percentage (must sum to 100)
SHARE      → use participants_share (proportional)

---

# ═══════════════════════════════════════════════════════════
# SECTION 14 — PAGE → API MAP
# ═══════════════════════════════════════════════════════════

| Page / Route | APIs to call |
|---|---|
| / (dashboard) | GET /groups + GET /users/me/balances + GET /notifications |
| /login | POST /auth/login |
| /register | POST /auth/register |
| /verify-email-pending | POST /auth/resend-verification |
| /verify-email?token= | POST /auth/verify-email (auto on mount) |
| /forgot-password | POST /auth/forgot-password |
| /reset-password?token= | POST /auth/reset-password |
| /groups | GET /groups |
| /groups/new | POST /groups |
| /groups/[id] | GET /groups/{id} + GET /groups/{id}/balances |
| /groups/[id]/members | GET /groups/{id}/members |
| /groups/[id]/expenses | GET /groups/{id}/expenses |
| /groups/[id]/expenses/new | POST /groups/{id}/expenses |
| /groups/[id]/expenses/[eid] | GET /expenses/{id} |
| /groups/[id]/settle | GET /groups/{id}/balances/simplified |
| /groups/[id]/settle/confirm | POST /groups/{id}/settlements |
| /groups/[id]/settlements | GET /groups/{id}/settlements |
| /groups/[id]/analytics | GET /groups/{id}/analytics |
| /analytics | GET /users/me/analytics + GET /users/me/balances |
| /notifications | GET /notifications + PATCH /notifications/read-all |
| /profile | GET /users/me |
| /profile/edit | PATCH /users/me |

---

# ═══════════════════════════════════════════════════════════
# SECTION 15 — SPECIFIC IMPROVEMENT CHECKLIST FOR NEXT.JS
# ═══════════════════════════════════════════════════════════

## Auth improvements needed
[ ] After register → redirect to /verify-email-pending, NOT dashboard
[ ] On login 403 EMAIL_NOT_VERIFIED → redirect to /verify-email-pending
[ ] Create /verify-email page that reads ?token= and auto-submits
[ ] Create /reset-password page that reads ?token= and shows form
[ ] Token refresh interceptor — silent refresh on 401, retry request
[ ] Protect all routes — redirect to /login if no token

## Dashboard improvements needed
[ ] Fetch GET /users/me/balances for cross-group summary
[ ] Show unread notification count from GET /notifications (filter is_read==false)
[ ] net_amount positive = RED (you owe), negative = GREEN (owed to you)

## Expense form improvements needed
[ ] Show different participant input based on split_type
[ ] Only send matching participants_* field in request body
[ ] Generate Idempotency-Key UUID on form mount, not on submit
[ ] Validate split totals client-side before submitting
[ ] Use Decimal.js for all amount calculations

## Notifications (not yet implemented)
[ ] Bell icon with unread badge in navbar
[ ] Poll GET /notifications every 60 seconds (or on window focus)
[ ] Clicking notification → navigate using metadata (see routing function above)
[ ] Mark all read when notification panel opens (PATCH /notifications/read-all)
[ ] Mark single read on click (PATCH /notifications/{id}/read)

## Analytics (not yet implemented)
[ ] /groups/[id]/analytics page with charts
[ ] /analytics page for user-level analytics
[ ] Fill missing months before rendering chart (utility function above)
[ ] Use recharts for bar/line/donut charts
[ ] net_balance color: positive=green, negative=red
[ ] settlement_rate as progress bar (value is 0-100 string)

## General improvements
[ ] Never use float for money — always Decimal.js
[ ] Handle 500 errors gracefully — show generic error page
[ ] Show loading states on all API calls
[ ] Infinite scroll on expense list (not pagination buttons)
[ ] Confirmation dialog before reversing expense
[ ] Confirmation dialog before removing member
[ ] After archiving group — remove from groups list immediately (optimistic update)
