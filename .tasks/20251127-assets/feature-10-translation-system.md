# JS Change: Translation System

## Change Definition

**Feature**: Complete internationalization (i18n) system with multi-language support

**Priority**: High

**Complexity**: High

## Commits Involved

| Commit | Date | Message |
|--------|------|---------|
| f5c0189 | 2022-11-12 | feat: there should be a translation system for frontend |
| a6ce58a | 2022-11-13 | fix: translate UI and avoid non existing languages |
| 5543a85 | 2022-11-13 | fix: more translations, change translations files directory |
| 3b0b758 | 2022-11-14 | fix: missing translation |
| b648b93 | 2022-11-14 | fix: missing space |
| 3c4e872 | 2022-11-27 | fix: port translations to code |
| 34d7757 | 2022-11-27 | fix: javascript quote broken |
| 32264a2 | 2022-11-27 | fix: rework js and translations to match new source strings |
| 09928cd | 2022-12-04 | fix: simplify translation dictionaries |
| 53bdb78 | 2022-12-04 | fix: add a translation UI, add jQuery.cookie, tweak the locale structure |

## Files Modified

- **New file**: `translation.js` - Translation infrastructure
- `editorMenu.js` - Wrap all UI strings with `tr()`
- `editorAccount.js` - Wrap all UI strings with `tr()`
- `editor.js` - Wrap all UI strings with `tr()`
- `dialogue.js` - Wrap all UI strings with `tr()`
- `playMode.js` - Wrap all UI strings with `tr()`
- `splash.js` - Wrap all UI strings with `tr()`
- `storyModel.js` - Wrap validation messages with `tr()`
- `app/views/app/index.html.erb` - Language picker UI and initialization

## Squashed Patch

See: `patch-10-translation-system.diff`

## Implementation Notes

### 1. Create translation.js

**Required components:**

```javascript
// Browser language detection
getFirstBrowserLanguage = function() {
    // Check navigator.languages array
    // Check navigator.language, browserLanguage, systemLanguage, userLanguage
    // Return detected language or null
}

// Available locales configuration
var available_locales = {
    "en": { "label": "English" },
    "fr": { "label": "Français" },
    "de": { "label": "Deutsch" },
    "da": { "label": "Dansk" },
    "nb_no": { "label": "Norsk Bokmål" },
    "uk": { "label": "Українська" },
    "ta": { "label": "தமிழ்" }
};

// jQuery.tr plugin (translation function)
// - Load dictionary from /translations/dictionary.{locale}.json
// - tr(key) function to translate strings
// - Support for parameter replacement (&count, &name, etc.)
// - Plural form support

// jQuery.cookie plugin (for locale persistence)
// - $.cookie("locale", value) to set
// - $.cookie("locale") to get

// Locale change function
function change_locale(locale) {
    $.cookie("locale", locale);
    location.reload();
}
```

### 2. Wrap Strings in Source Files

**Pattern for all files:**

```javascript
// Before:
F("sign out", e, J, "Sign out")

// After:
F(tr("sign out"), e, J, tr("Sign out"))

// Before:
message: "Choose the story to open"

// After:
message: tr("Choose the story to open")
```

**Files to update:**
- `editorMenu.js` - All menu items, tooltips, messages
- `editorAccount.js` - Sign in/out, registration, account dialogs
- `editor.js` - Editor UI strings, save messages
- `dialogue.js` - Dialog buttons, titles
- `playMode.js` - Play mode UI strings
- `splash.js` - Splash screen text
- `storyModel.js` - Validation error messages

### 3. View Integration (Already Done)

In `app/views/app/index.html.erb`:
- Translate static `[tr-data]` elements
- Build language picker menu from `available_locales`
- Set initial locale from cookie
- Fall back to browser language detection

### 4. Translation Dictionaries

Already exist in `public/translations/dictionary.{locale}.json`:
- en, fr, de, da, nb_no, uk, ta
- Keys match source strings
- Support parameter replacement syntax

### Dependencies

**External libraries to bundle:**
- `jquery.tr.js` - Translation plugin
- `jquery.cookie.js` - Cookie management

**Can be found in git history or need to be sourced:**
```bash
git show f5c0189 -- app/assets/javascripts/inklewriter-write.js | grep -A200 "jquery.tr"
```

## Testing Checklist

- [ ] Language picker displays in UI
- [ ] Default language is browser language
- [ ] Can switch between all 7 languages
- [ ] Locale persists across page reloads (cookie)
- [ ] All menu items translate correctly
- [ ] All dialog boxes translate correctly
- [ ] All button labels translate correctly
- [ ] All tooltips translate correctly
- [ ] All error messages translate correctly
- [ ] Missing translations fall back to English
- [ ] Parameter replacement works (&count, &name, etc.)
- [ ] No console errors for missing dictionaries
- [ ] Test each language: en, fr, de, da, nb_no, uk, ta

## Git Commands

```bash
# View full changes
git show f5c0189
git log f5c0189..53bdb78 --oneline

# View squashed diff (large!)
git diff f5c0189^..53bdb78 -- app/assets/javascripts/inklewriter-write.js app/views/app/index.html.erb

# Extract jquery.tr.js plugin
git show f5c0189:app/assets/javascripts/inklewriter-write.js | sed -n '/jquery\.tr/,/^})(jQuery);/p'

# Apply patch (if needed)
git apply .tasks/20251127-assets/patch-10-translation-system.diff
```

## Sub-Tasks Breakdown

This is the most complex feature. Break into sub-tasks:

1. Create `translation.js` with infrastructure (browser detection, jquery.tr, jquery.cookie)
2. Update `inklewriter_main.js.erb` manifest to include translation.js
3. Wrap strings in `editorMenu.js`
4. Wrap strings in `editorAccount.js`
5. Wrap strings in `editor.js`
6. Wrap strings in `dialogue.js`
7. Wrap strings in `playMode.js`
8. Wrap strings in `splash.js`
9. Wrap strings in `storyModel.js`
10. Test each language
11. Fix any missing translations

## Definition of Done

- [ ] translation.js created with all infrastructure
- [ ] All source files updated with tr() wrappers
- [ ] Tests written and passing
- [ ] Manual testing completed for all 7 languages
- [ ] No console errors
- [ ] Language switching works
- [ ] Locale persistence works
- [ ] User has accepted changes
- [ ] Documentation updated if needed
- [ ] Committed with conventional commit format
