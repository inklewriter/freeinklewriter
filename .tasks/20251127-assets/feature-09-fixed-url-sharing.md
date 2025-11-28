# JS Change: Fixed URL Sharing

## Change Definition

**Feature**: Use dynamic URL generation instead of hardcoded URLs for sharing

**Priority**: Low

**Complexity**: Low

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| c397c83 | 2020-01-26 | [fix] The edition page should not use a fixed URL for sharing |

## Files Modified

- `app/assets/javascripts/pages/index.js` → `editorMenu.js` - Generate URLs dynamically from window.location

## Squashed Patch

See: `patch-09-fixed-url-sharing.diff`

## Implementation Notes

### Changes Required in Source Files

1. **editorMenu.js**:
   - In share dialog function
   - Replace hardcoded URLs like `http://writer.inklestudios.com/stories/...`
   - With dynamic URLs using `window.location.protocol`, `window.location.host`
   - Example:
     ```javascript
     const baseUrl = window.location.protocol + "//" + window.location.host;
     const storyUrl = baseUrl + "/stories/" + EditorAccount.currentStoryId();
     ```

### Dependencies

None

### Notes

- This allows the application to work on any domain (localhost, production, custom domains)
- Especially important for self-hosted instances

## Testing Checklist

- [ ] Share dialog shows correct URL for current domain
- [ ] Works on localhost:3000
- [ ] Works on production domain
- [ ] URL includes correct protocol (http/https)
- [ ] URL includes correct port if non-standard
- [ ] Shared URL is accessible and works

## Git Commands

```bash
# View full changes
git show c397c83

# View squashed diff
git diff c397c83^..c397c83 -- app/assets/javascripts/pages/index.js

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-09-fixed-url-sharing.diff
```

## Definition of Done

- [ ] Feature implemented in editorMenu.js
- [ ] Tests written and passing
- [ ] Manual browser testing on localhost
- [ ] Manual browser testing on production domain (if available)
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
