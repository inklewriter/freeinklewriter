# JS Change: [FEATURE NAME]

## Change Definition

**Feature**: [Brief description of what this change does]

**Priority**: [High/Medium/Low]

**Complexity**: [High/Medium/Low]

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| [hash] | [YYYY-MM-DD] | [commit message] |

## Files Modified

- `path/to/file1.js` - [description of changes]
- `path/to/file2.js` - [description of changes]
- `path/to/view.html.erb` - [description of changes]

## Squashed Patch

```diff
[Output of: git diff <first-commit>^..<last-commit> -- <files>]
```

## Implementation Notes

### Changes Required in Source Files

1. **file1.js**:
   - [Specific change]
   - [Specific change]

2. **file2.js**:
   - [Specific change]

### Dependencies

- [Any new libraries or dependencies]
- [Any external resources]

## Testing Checklist

- [ ] [Functional test 1]
- [ ] [Functional test 2]
- [ ] [Edge case test]
- [ ] [Browser compatibility]

## Git Commands

```bash
# View full changes
git show <commit-hash>

# View squashed diff
git diff <first-commit>^..<last-commit> -- <files>

# Apply patch (if needed)
git apply <patch-file>
```

## Definition of Done

- [ ] Feature implemented in source files
- [ ] Tests written and passing
- [ ] User has accepted changes
- [ ] Documentation updated if needed
