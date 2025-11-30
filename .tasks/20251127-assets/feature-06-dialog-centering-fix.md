# JS Change: Dialog Centering Fix

## Change Definition

**Feature**: Fix dialog and splash screen positioning on window resize

**Priority**: Low

**Complexity**: Low

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| 632b614 | 2020-05-10 | [fix] Dialogue elements should stay centered on window resize #15 |
| 39ac1d2 | 2020-05-10 | [fix] splash screen should also be moved on window resize |

## Files Modified

- `app/assets/javascripts/pages/index.js` → `dialogue.js` - Add window resize handler for dialogs
- `app/assets/javascripts/pages/index.js` → `splash.js` - Add window resize handler for splash screen

## Squashed Patch

See: `patch-06-dialog-centering-fix.diff`

## Implementation Notes

### Changes Required in Source Files

1. **dialogue.js**:
   - In Dialogue class constructor or initialization
   - Bind window resize event to reposition dialog
   - Calculate center position based on current window dimensions
   - Update dialog position dynamically

2. **splash.js**:
   - In Splash class constructor or initialization
   - Bind window resize event to reposition splash screen
   - Calculate center position based on current window dimensions
   - Update splash position dynamically

### Dependencies

None (uses existing jQuery event handling)

## Testing Checklist

- [ ] Dialog appears centered on initial display
- [ ] Dialog stays centered when window is resized
- [ ] Splash screen appears centered on initial display
- [ ] Splash screen stays centered when window is resized
- [ ] Multiple dialogs handle resize correctly
- [ ] Works on different screen sizes
- [ ] No performance issues with resize events

## Git Commands

```bash
# View full changes
git show 632b614
git show 39ac1d2

# View squashed diff
git diff 632b614^..39ac1d2 -- app/assets/javascripts/pages/index.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-06-dialog-centering-fix.diff
```

## Definition of Done

- [ ] Feature implemented in dialogue.js and splash.js
- [ ] Tests written and passing (if testable without DOM)
- [ ] Manual browser testing completed
- [ ] Tested on multiple screen sizes
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
