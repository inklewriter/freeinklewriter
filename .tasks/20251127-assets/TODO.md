# Asset Reintegration TODO

**Last Updated:** 2025-11-28
**Current Phase:** Phase 2 - JavaScript Testing Setup

## Phase 0: Documentation ✅ COMPLETED

- [x] Track all commits to `pages/index.js`
- [x] Track all commits to `inklewriter-write.js`
- [x] Track all commits to `inklewriter-read.js`
- [x] Save commit lists to files
- [x] Create TEMPLATE.md
- [x] Create change file: feature-01-import-story.md
- [x] Create change file: feature-02-export-enhancements.md
- [x] Create change file: feature-03-save-on-click.md
- [x] Create change file: feature-04-community-link.md
- [x] Create change file: feature-05-password-reset-modal.md
- [x] Create change file: feature-06-dialog-centering-fix.md
- [x] Create change file: feature-07-google-analytics-fixes.md
- [x] Create change file: feature-08-tutorial-story-fix.md
- [x] Create change file: feature-09-fixed-url-sharing.md
- [x] Create change file: feature-10-translation-system.md
- [x] Generate patch file for each change (10 patches)
- [x] Review all documentation files
- [x] Commit Phase 0 documentation (commit: 4892bfd)

## Phase 1: Basic Sprockets Setup ✅ COMPLETED

- [x] Copy `assets/javascripts/*` to `app/assets/javascripts/inklewriter-source/`
- [x] Copy `assets/stylesheets/*` (reference only, not used)
- [x] Create `app/assets/javascripts/inklewriter-source/inklewriter-main.js` manifest
- [x] Create `app/assets/javascripts/inklewriter-source/inklewriter-readmode.js` manifest
- [x] Update `config/initializers/assets.rb` (added inklewriter-source to asset path)
- [x] Update `app/views/layouts/application.html.erb` (use new manifest paths)
- [x] Test: `curl http://localhost:3000/assets/inklewriter-source/inklewriter-main.js` ✓ 200 OK
- [x] Test: `curl http://localhost:3000/assets/inklewriter-source/inklewriter-readmode.js` ✓ 200 OK
- [x] Test: Homepage loads (HTTP 200) ✓
- [x] Update CLAUDE.md with JS bundle delivery tests
- [x] Commit Phase 1 (commit: eb68392)

## Phase 2: JavaScript Testing Setup ✅ COMPLETED

- [x] Research JS testing frameworks compatible with Rails 7.1
- [x] Choose framework (QUnit 2.24.2 - simple, Node.js CLI support)
- [x] Install framework (via npm in Docker)
- [x] Configure framework (package.json with npx qunit)
- [x] Write sample test for `StoryModel` (11 tests)
- [x] Write sample test for `Editor` utilities (24 aux.js tests)
- [x] Run tests and verify they pass (37 tests, all passing)
- [x] Document testing workflow in CLAUDE.md
- [x] Add JS bundle delivery curl tests to CLAUDE.md
- [x] Commit Phase 2 (next step)

## Phase 3: Feature Backporting

### Feature 1: Save on Click ✅ COMPLETED
- [x] Review feature documentation
- [x] Implement in `editorMenu.js` (with Feature 9)
- [x] Manual browser test
- [x] User acceptance
- [x] Commit (commit: e5063a3 - combined with Feature 9)

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

### Feature 4: Export Enhancements ✅ COMPLETED
- [x] Review change file
- [x] Implement in `editorMenu.js`, tutorial files
- [x] Fix inklewriter-convert.js asset precompilation
- [x] Manual browser test (HTML/JSON/Ink exports)
- [x] User acceptance
- [x] Commit (commit: 6a76baf)

### Feature 5: Import Story Feature ✅ COMPLETED
- [x] Review change file
- [x] Implement in `editorMenu.js`
- [x] Manual browser test (import JSON)
- [x] User acceptance
- [x] Commit (commit: cfc6857)

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

### Feature 8: Tutorial Story Fix ✅ COMPLETED
- [x] Review change file
- [x] Implement in `tutorialStory_fromRead.js`
- [x] Manual browser test
- [x] User acceptance
- [x] Commit (commit: ef35c7d)

### Feature 9: Google Analytics Fixes ✅ COMPLETED
- [x] Review change file
- [x] Implement in `editorAccount.js` (with Feature 1)
- [x] Manual browser test
- [x] User acceptance
- [x] Commit (commit: e5063a3 - combined with Feature 1)

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
