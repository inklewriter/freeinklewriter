# JS Change: Export Enhancements

## Change Definition

**Feature**: Enhanced share dialog with multiple export formats (HTML, JSON, Ink)

**Priority**: Medium

**Complexity**: Medium

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| 93565fb | 2020-05-06 | [enh] The share button should offer more choices: HTML, JSON, Ink |

## Files Modified

- `app/assets/javascripts/pages/index.js` → `editorMenu.js` - Enhanced share dialog
- `app/assets/stylesheets/pages.css.scss` - Added `.selectInput` styling

## Squashed Patch

See: `patch-02-export-enhancements.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorMenu.js**:
   - In `showShareDialogue()` function (originally function `D`):
   - Generate three URLs: htmlURL, jsonURL, inkURL
   - Create enhanced dialog content with:
     - Link to play story in browser
     - Input field with HTML URL
     - Link to get JSON format
     - Input field with JSON URL
     - Link to get Ink format
     - Input field with Ink URL
   - Add footer: "Caution, the JSON format exported here is not usable in Ink."
   - Style input fields with `.selectInput` class
   - Remove "Read now" button (replaced by direct links)

2. **Tutorial content**:
   - Update text: "You can share your stories with anyone you like. Just click *-share-* and use the links *-inklewriter-* will show to you."

### Dependencies

None (uses existing Dialogue class)

### CSS Note

The `.selectInput` styling should already exist or be added to current stylesheets (out of scope for JS reintegration).

## Testing Checklist

- [ ] Share dialog displays three export options
- [ ] HTML URL link works and opens story in new tab
- [ ] JSON URL link works and downloads/displays JSON
- [ ] Ink URL link works and downloads/displays Ink format
- [ ] All input fields are selectable for copy/paste
- [ ] Footer warning displays correctly
- [ ] Dialog is properly styled

## Git Commands

```bash
# View full changes
git show 93565fb

# View squashed diff
git diff 93565fb^..93565fb -- app/assets/javascripts/pages/index.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-02-export-enhancements.diff
```

## Definition of Done

- [ ] Feature implemented in editorMenu.js
- [ ] Tests written and passing
- [ ] Manual browser testing completed (all 3 export formats)
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
