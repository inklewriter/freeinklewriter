# Asset Reintegration Plan

## Objective

Reintegrate the recovered original JavaScript source files from `./assets/` into the Rails application, replacing the current minified bundles while backporting all custom features that were added to the minified files.

## Scope

**In Scope:**
- JavaScript files reintegration
- Custom feature backporting
- JavaScript testing setup
- Sprockets asset pipeline configuration

**Out of Scope:**
- CSS files (use existing stylesheets)

## Discovery Phase (COMPLETED)

### Files Tracked

1. **Original Source Files** (recovered in `./assets/`)
   - `assets/javascripts/inklewriter_main.js.erb` - Sprockets manifest for write mode
   - `assets/javascripts/inklewriter_readmode.js.erb` - Sprockets manifest for read mode
   - 12+ source files (editor.js, storyModel.js, etc.)
   - ~13k lines unminified

2. **Current Minified Bundles**
   - `app/assets/javascripts/inklewriter-write.js` (645KB)
   - `app/assets/javascripts/inklewriter-read.js` (408KB)

3. **Commit History Analysis**
   - `app/assets/javascripts/pages/index.js` (22 commits before rename to inklewriter-write.js)
   - `app/assets/javascripts/inklewriter-write.js` (13 commits after rename)
   - `app/assets/javascripts/inklewriter-read.js` (1 commit - initial split)

### Custom Features Identified

From `pages/index.js` (before rename at c536a8c):
1. **Import Story Feature** (0043d07, 6158bb5) - Add JSON import dialog and functionality
2. **Export Enhancements** (93565fb) - Add HTML, JSON, and .ink export options to share dialog
3. **Password Reset Modal** (532b595, 7cfc446, 26cbacb, 4b98208) - Devise integration
4. **Dialog Centering Fix** (632b614, 39ac1d2) - Window resize handling
5. **Google Analytics Fixes** (12cc8d8, e89a4de) - Make saving work without GA
6. **Tutorial Story Fix** (125d70c) - Error correction
7. **Fixed URL Sharing** (c397c83) - Dynamic URL generation

From `inklewriter-write.js` (after rename):
1. **Save on Click** (aec6992) - Click handler on save message
2. **Community Link** (655a916) - Replace "Getting Started" with "/community" link
3. **Translation System** (f5c0189 + 8 follow-up commits) - Complete i18n implementation

## Implementation Phases

### Phase 0: Documentation (IN PROGRESS)

**Tasks:**
- [x] Track all commits to JS bundles
- [x] Create TEMPLATE.md for change tracking
- [ ] Create individual change files for each feature
- [ ] Save squashed patches for each feature
- [ ] Document this plan
- [ ] Create TODO tracker

**Definition of Done:**
- All changes documented in `.tasks/20251127-assets/` directory
- Each change has its own markdown file following TEMPLATE.md
- Each change has a corresponding .diff patch file
- Commit the documentation

### Phase 1: Basic Sprockets Setup

**Objective:** Deliver original source files via Rails asset pipeline without custom features

**Tasks:**
1. Copy recovered source files to `app/assets/javascripts/inklewriter-source/`
2. Create Sprockets manifests based on recovered .erb files
3. Update `config/initializers/assets.rb` for precompilation
4. Update `app/views/layouts/application.html.erb` to use new manifests
5. Test delivery of bundles via curl

**Definition of Done:**
- Original source files compile via Sprockets
- Bundles accessible at `/assets/inklewriter-main.js` and `/assets/inklewriter-readmode.js`
- Basic editor functionality works (create, edit, save story)
- Commit with passing tests

### Phase 2: JavaScript Testing Setup (TDD)

**Objective:** Establish JavaScript testing framework for TDD workflow

**Tasks:**
1. Research JS testing options for Rails (Jasmine, QUnit, or modern tooling)
2. Install and configure chosen framework
3. Write sample tests for core functions (skip AJAX/DOM manipulation)
4. Document testing workflow in CLAUDE.md
5. Add curl tests for JS bundle delivery to CLAUDE.md

**Definition of Done:**
- Test framework running
- Sample tests passing
- Documentation in CLAUDE.md includes:
  - When to run JS tests (only after JS changes)
  - How to run JS tests
  - curl commands to verify bundle delivery
- Commit with test infrastructure

### Phase 3: Feature Backporting (One feature per commit)

**Objective:** Reintegrate each custom feature into source files using TDD

**Order of Implementation (by complexity/risk):**

1. **Save on Click** (Low complexity)
2. **Community Link** (Low complexity)
3. **Dialog Centering Fix** (Low complexity)
4. **Export Enhancements** (Medium complexity)
5. **Import Story Feature** (Medium complexity)
6. **Password Reset Modal** (Medium complexity)
7. **Fixed URL Sharing** (Low complexity)
8. **Tutorial Story Fix** (Low complexity)
9. **Google Analytics Fixes** (Low complexity)
10. **Translation System** (High complexity - do last)

**Per-Feature Workflow:**
1. Read feature documentation file
2. Write tests first (TDD)
3. Implement feature in source file
4. Run tests until passing
5. Manual testing in browser
6. User acceptance
7. Commit with conventional commit format
8. Move to next feature

**Definition of Done (per feature):**
- Tests written and passing
- Feature implemented in source files
- Manual browser testing completed
- User has accepted the changes
- Conventional commit created with AI annotations

### Phase 4: Validation & Cleanup

**Objective:** Ensure complete feature parity and remove old bundles

**Tasks:**
1. Full regression testing of all features
2. Compare functionality with current production minified bundles
3. Performance testing (bundle size, load time)
4. Remove old minified bundles from git
5. Update documentation

**Definition of Done:**
- All features working as before
- No regressions identified
- Bundle sizes acceptable
- Old bundles removed
- Documentation updated

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing features in source | High | Thorough diff analysis, comprehensive testing |
| Build pipeline errors | Medium | Extensive local testing, keep old bundles until validated |
| jQuery 1.7.1 incompatibilities | Medium | Test in multiple browsers |
| Translation loading issues | Low | Well-tested feature, validate dictionary paths |
| Test framework complexity | Medium | Start simple, use Rails-native options if possible |

## Success Criteria

1. ✅ All custom features documented
2. ⬜ Original source files delivered via Sprockets
3. ⬜ JavaScript testing framework operational
4. ⬜ All custom features backported and tested
5. ⬜ User acceptance on all features
6. ⬜ Old minified bundles removed
7. ⬜ Documentation complete

## Timeline Estimate

- Phase 0: 2-3 hours (documentation)
- Phase 1: 2-3 hours (Sprockets setup)
- Phase 2: 3-4 hours (testing framework)
- Phase 3: 10-15 hours (10 features × 1-2 hours each)
- Phase 4: 2-3 hours (validation)

**Total: 19-28 hours**
