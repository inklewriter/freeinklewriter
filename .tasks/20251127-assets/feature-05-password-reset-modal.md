# JS Change: Password Reset Modal

## Change Definition

**Feature**: Add password reset functionality integrated with Devise

**Priority**: Medium

**Complexity**: Medium

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| 532b595 | 2020-03-06 | [enh] There should be a modal to reset passwords |
| 7cfc446 | 2020-03-06 | [fix] the url for forgotten password should be good |
| 26cbacb | 2020-03-07 | [fix] the password reset request should match Devise expectations |
| 4b98208 | 2020-03-07 | [fix] the password reset UI should return constructive error messages |

## Files Modified

- `app/assets/javascripts/pages/index.js` → `editorAccount.js` - Add password reset dialog and AJAX handling

## Squashed Patch

See: `patch-05-password-reset-modal.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorAccount.js**:
   - Add "Reset password" link in sign-in dialog
   - Create `resetPassword()` function
   - Create password reset dialog with email input field
   - AJAX POST to `/users/password.json` endpoint (Devise)
   - Proper request format matching Devise expectations
   - Handle success/error responses with constructive messages
   - Link to correct password reset URL

### Dependencies

- Requires Devise gem on backend (already installed)
- Assumes `/users/password` routes exist

## Testing Checklist

- [ ] "Reset password" link appears in sign-in dialog
- [ ] Clicking link opens password reset dialog
- [ ] Email input field validation works
- [ ] Submitting valid email shows success message
- [ ] Submitting invalid email shows error message
- [ ] Error messages are constructive and user-friendly
- [ ] Backend receives properly formatted Devise request
- [ ] Password reset email is sent (integration test)

## Git Commands

```bash
# View full changes
git show 532b595
git show 7cfc446
git show 26cbacb
git show 4b98208

# View squashed diff
git diff 532b595^..4b98208 -- app/assets/javascripts/pages/index.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-05-password-reset-modal.diff
```

## Definition of Done

- [ ] Feature implemented in editorAccount.js
- [ ] Tests written and passing
- [ ] Manual browser testing completed
- [ ] Password reset email integration tested
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
