# JS Change: Community Link

## Change Definition

**Feature**: Replace "Getting Started" external link with "Community" link to internal /community page

**Priority**: Low

**Complexity**: Low

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| 655a916 | 2021-11-06 | [fix] There should be a link to community pages, by replacing the getting started page |

## Files Modified

- `app/assets/javascripts/inklewriter-write.js` → `editorMenu.js` - Replace menu item

## Squashed Patch

See: `patch-04-community-link.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorMenu.js**:
   - In menu building function (likely in `buildFileMenu()` or similar)
   - Replace this code:
     ```javascript
     F("?", e, function() {
         window.open("http://www.inklestudios.com/inklewriter/getting-started")
     }, "Getting Started")
     ```
   - With this code:
     ```javascript
     F("community", e, function() {
         window.open("/community")
     }, "Community and story parameters")
     ```

### Dependencies

None

### Notes

- Assumes `/community` route exists in Rails application
- Opens in new window like the original "Getting Started" link

## Testing Checklist

- [ ] "Community" menu item appears in file menu
- [ ] Clicking opens `/community` page in new window
- [ ] Tooltip shows "Community and story parameters"
- [ ] "Getting Started" link is no longer visible
- [ ] Menu item appears in correct position

## Git Commands

```bash
# View full changes
git show 655a916

# View squashed diff
git diff 655a916^..655a916 -- app/assets/javascripts/inklewriter-write.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-04-community-link.diff
```

## Definition of Done

- [ ] Feature implemented in editorMenu.js
- [ ] Tests written and passing
- [ ] Manual browser testing completed
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
