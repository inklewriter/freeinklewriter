# JS Change: Save on Click

## Change Definition

**Feature**: Allow users to manually trigger save by clicking on the "saved" status message

**Priority**: Low

**Complexity**: Low

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| aec6992 | 2020-12-17 | [fix] Allow users to save when they click on 'saved' |

## Files Modified

- `app/assets/javascripts/inklewriter-write.js` → `editorMenu.js` - Add click handler and refactor names

## Squashed Patch

See: `patch-03-save-on-click.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorMenu.js**:
   - Rename internal function `z` to `requireSave` (for code clarity)
   - Rename internal function `V` to `setup` (for code clarity)
   - Update all references to these renamed functions
   - In `setup()` function, add click handler:
     ```javascript
     $("#saveStateMessage").on("click", function(event){
         EditorMenu.requireSave();
     });
     ```
   - Ensure `requireSave` is exported in public API

### Dependencies

None (uses existing jQuery event handling)

## Testing Checklist

- [ ] Clicking "saved" message triggers save
- [ ] Save state updates from "saved" to "saving..." to "saved"
- [ ] Works for signed-in users
- [ ] Works for local storage users
- [ ] Multiple clicks don't break functionality
- [ ] Cursor changes to pointer on hover (CSS should handle)

## Git Commands

```bash
# View full changes
git show aec6992

# View squashed diff
git diff aec6992^..aec6992 -- app/assets/javascripts/inklewriter-write.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-03-save-on-click.diff
```

## Definition of Done

- [ ] Feature implemented in editorMenu.js
- [ ] Tests written and passing
- [ ] Manual browser testing completed
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
