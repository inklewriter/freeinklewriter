# Asset Reintegration TODO

**Last Updated:** 2025-11-27
**Current Phase:** Phase 0 - Documentation

## Phase 0: Documentation

- [x] Track all commits to `pages/index.js`
- [x] Track all commits to `inklewriter-write.js`
- [x] Track all commits to `inklewriter-read.js`
- [x] Save commit lists to files
- [x] Create TEMPLATE.md
- [ ] Create change file: import-story.md
- [ ] Create change file: export-enhancements.md
- [ ] Create change file: password-reset-modal.md
- [ ] Create change file: dialog-centering-fix.md
- [ ] Create change file: google-analytics-fixes.md
- [ ] Create change file: tutorial-story-fix.md
- [ ] Create change file: fixed-url-sharing.md
- [ ] Create change file: save-on-click.md
- [ ] Create change file: community-link.md
- [ ] Create change file: translation-system.md
- [ ] Generate patch file for each change
- [ ] Review all documentation files
- [ ] Commit Phase 0 documentation

## Phase 1: Basic Sprockets Setup

- [ ] Copy `assets/javascripts/*` to `app/assets/javascripts/inklewriter-source/`
- [ ] Copy `assets/stylesheets/*` to `app/assets/stylesheets/inklewriter-source/` (if needed for reference)
- [ ] Create `app/assets/javascripts/inklewriter-main.js` manifest
- [ ] Create `app/assets/javascripts/inklewriter-readmode.js` manifest
- [ ] Update `config/initializers/assets.rb`
- [ ] Update `app/views/layouts/application.html.erb`
- [ ] Test: `curl http://localhost:3000/assets/inklewriter-main.js`
- [ ] Test: `curl http://localhost:3000/assets/inklewriter-readmode.js`
- [ ] Test: Create new story in browser
- [ ] Test: Edit story in browser
- [ ] Test: Save story in browser
- [ ] Commit Phase 1

## Phase 2: JavaScript Testing Setup

- [ ] Research JS testing frameworks compatible with Rails 7.1
- [ ] Choose framework (Jasmine/QUnit/Jest/other)
- [ ] Install framework
- [ ] Configure framework
- [ ] Write sample test for `StoryModel`
- [ ] Write sample test for `Editor`
- [ ] Run tests and verify they pass
- [ ] Document testing workflow in CLAUDE.md
- [ ] Add JS bundle delivery curl tests to CLAUDE.md
- [ ] Commit Phase 2

## Phase 3: Feature Backporting

### Feature 1: Save on Click
- [ ] Review `.tasks/20251127-assets/js-change-save-on-click.md`
- [ ] Write tests
- [ ] Implement in `editorMenu.js`
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 2: Community Link
- [ ] Review `.tasks/20251127-assets/js-change-community-link.md`
- [ ] Write tests
- [ ] Implement in `editorMenu.js`
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 3: Dialog Centering Fix
- [ ] Review change file
- [ ] Write tests
- [ ] Implement
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 4: Export Enhancements
- [ ] Review change file
- [ ] Write tests
- [ ] Implement in `editorMenu.js`
- [ ] Tests pass
- [ ] Manual browser test (HTML/JSON/Ink exports)
- [ ] User acceptance
- [ ] Commit

### Feature 5: Import Story Feature
- [ ] Review change file
- [ ] Write tests
- [ ] Implement in `editorMenu.js` and `editorAccount.js`
- [ ] Tests pass
- [ ] Manual browser test (import JSON)
- [ ] User acceptance
- [ ] Commit

### Feature 6: Password Reset Modal
- [ ] Review change file
- [ ] Write tests
- [ ] Implement
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 7: Fixed URL Sharing
- [ ] Review change file
- [ ] Write tests
- [ ] Implement
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 8: Tutorial Story Fix
- [ ] Review change file
- [ ] Write tests
- [ ] Implement
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 9: Google Analytics Fixes
- [ ] Review change file
- [ ] Write tests
- [ ] Implement
- [ ] Tests pass
- [ ] Manual browser test
- [ ] User acceptance
- [ ] Commit

### Feature 10: Translation System
- [ ] Review change file
- [ ] Write tests for translation.js
- [ ] Create translation.js with jquery.tr.js
- [ ] Write tests for tr() wrappers
- [ ] Wrap strings in editorMenu.js
- [ ] Wrap strings in editorAccount.js
- [ ] Wrap strings in editor.js
- [ ] Wrap strings in dialogue.js
- [ ] Wrap strings in playMode.js
- [ ] Wrap strings in splash.js
- [ ] Wrap strings in storyModel.js
- [ ] Update view integration (already done in index.html.erb)
- [ ] All tests pass
- [ ] Manual browser test (switch languages)
- [ ] Test all 7 languages load
- [ ] User acceptance
- [ ] Commit

## Phase 4: Validation & Cleanup

- [ ] Full regression test: Create story
- [ ] Full regression test: Edit story
- [ ] Full regression test: Save story
- [ ] Full regression test: Import story
- [ ] Full regression test: Export story (HTML/JSON/Ink)
- [ ] Full regression test: Translation switching
- [ ] Full regression test: Community link
- [ ] Full regression test: Password reset
- [ ] Compare bundle sizes (old vs new)
- [ ] Performance testing
- [ ] Remove `app/assets/javascripts/inklewriter-write.js`
- [ ] Remove `app/assets/javascripts/inklewriter-read.js`
- [ ] Update .gitignore if needed
- [ ] Update README if needed
- [ ] Final commit

## Blockers

None currently.

## Notes

- CSS files are out of scope - use existing stylesheets only
- Each feature requires user acceptance before moving to next
- Must use TDD for all implementations
- JS tests only run when JS code has changed
