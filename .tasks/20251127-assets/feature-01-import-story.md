# JS Change: Import Story Feature

## Change Definition

**Feature**: Add ability to import stories from JSON format via UI dialog

**Priority**: Medium

**Complexity**: Medium

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| 0043d07 | 2020-02-29 | [wip] Import: new menu item and dialogue |
| 6158bb5 | 2020-02-29 | [enh] Importing stories should work |

## Files Modified

- `app/assets/javascripts/pages/index.js` → `editorMenu.js` - Add import dialog and functionality
- `app/assets/javascripts/pages/index.js` → `editorAccount.js` - Add saveStoryData function

## Squashed Patch

See: `patch-01-import-story.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorMenu.js**:
   - Add `importStory()` function
   - Create dialog with textarea for JSON input
   - Validate JSON format before import
   - POST imported story to `/stories.json` endpoint
   - Add menu item: `F("import", e, EditorMenu.importStory, "Import a story from another instance")`
   - Only show menu item when user is signed in

2. **editorAccount.js**:
   - Rename internal function `M` to `saveStoryData` for clarity
   - Export `saveStoryData` function for use by import feature

### Dependencies

None (uses existing jQuery AJAX and Dialogue class)

## Testing Checklist

- [ ] Import menu item appears when signed in
- [ ] Import menu item hidden when not signed in
- [ ] Dialog opens with textarea
- [ ] Invalid JSON shows alert
- [ ] Valid JSON imports successfully
- [ ] Imported story appears in story list
- [ ] Can open and edit imported story

## Git Commands

```bash
# View full changes
git show 0043d07
git show 6158bb5

# View squashed diff
git diff 0043d07^..6158bb5 -- app/assets/javascripts/pages/index.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-01-import-story.diff
```

## Definition of Done

- [ ] Feature implemented in source files (editorMenu.js, editorAccount.js)
- [ ] Tests written and passing
- [ ] Manual browser testing completed
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
