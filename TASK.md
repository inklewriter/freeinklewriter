# TDD Implementation Plan for Inklewriter

## Current State

The codebase currently has **no functional tests**. All test files are scaffolded with commented-out placeholder tests:
- Model tests: Empty (Story, User, Admin, StoryStats)
- Controller tests: Empty (Stories, Pages, Errors, Admin, Users)
- Integration tests: None
- System tests: None
- Fixtures: Minimal/incomplete data (stories.yml has empty data fields)

## Goal

Implement comprehensive test coverage following TDD principles to ensure code quality, prevent regressions, and enable confident refactoring.

## Principles

1. **User must provide realistic test data** - No synthetic data generation except for trivial cases
2. **Red-Green-Refactor cycle** - Write failing test → Make it pass → Refactor
3. **Test behavior, not implementation** - Focus on what the code does, not how
4. **One test at a time** - Small, incremental changes
5. **Tests as documentation** - Clear, readable test names that describe expected behavior

## Phase 1: Foundation & Setup

### 1.1 Test Infrastructure
- [ ] Review and update `test_helper.rb` configuration
- [ ] Set up test database properly (ensure `test` environment in database.yml)
- [ ] Configure fixtures directory structure
- [ ] Add test gems if needed (minitest-reporters, shoulda-context, factory_bot, etc.)
- [ ] Document test data requirements in README

### 1.2 Fixture Data Preparation
**⚠️ REQUIRES USER INPUT - DO NOT PROCEED WITHOUT REALISTIC DATA**

- [ ] **Request from user**: Sample story JSON structures (simple, complex with choices/diverts, with conditions/flags)
- [ ] **Request from user**: Realistic user credentials and scenarios
- [ ] Create `fixtures/stories.yml` with provided story data
- [ ] Create `fixtures/users.yml` with provided user data
- [ ] Create `fixtures/story_stats.yml` with corresponding stats
- [ ] Create `fixtures/admins.yml` with admin user associations
- [ ] Document fixture relationships and dependencies

## Phase 2: Model Tests (Bottom-Up Approach)

### 2.1 User Model (`test/models/user_test.rb`)
Priority: HIGH - Foundation for authentication

**Test Cases to Implement:**
- [ ] Validation: Email presence
- [ ] Validation: Email format (valid/invalid formats)
- [ ] Validation: Email uniqueness
- [ ] Association: `has_many :stories` (dependent: destroy)
- [ ] Association: `has_one :admin` (dependent: destroy)
- [ ] Devise functionality: User registration
- [ ] Devise functionality: Password authentication
- [ ] Authentication token generation

### 2.2 Story Model (`test/models/story_test.rb`)
Priority: HIGH - Core domain model

**Test Cases to Implement:**
- [ ] Validation: Data presence required
- [ ] Association: `belongs_to :user`
- [ ] Association: `has_one :story_stat` (dependent: destroy)
- [ ] Callback: `assign_url_key` after creation (url_key should equal id)
- [ ] Callback: `sanitize_title` before save (HTML sanitization)
- [ ] Callback: `sanitize_author` before save (sanitizes editorData.authorName)
- [ ] Callback: `process_stats` after save (creates/updates story_stat)
- [ ] Callback: `process_rating` after save (updates story_stat.score)
- [ ] Method: `sanitize_s` sanitizes stitch content and options
- [ ] Story data structure validation (stitches, initial, editorData)

### 2.3 StoryStats Model (`test/models/story_stat_test.rb`)
Priority: MEDIUM

**Test Cases to Implement:**
- [ ] Association: `belongs_to :story`
- [ ] Attribute presence: All stat fields (stitches, words, etc.)
- [ ] Numeric validations: Non-negative values for counts

### 2.4 Admin Model (`test/models/admin_test.rb`)
Priority: LOW

**Test Cases to Implement:**
- [ ] Association: `belongs_to :user`
- [ ] User can have one admin record
- [ ] Admin user identification

## Phase 3: Service Tests

### 3.1 Stats::Story Service (`test/services/stats_test.rb`)
Priority: HIGH - Critical business logic

**⚠️ REQUIRES USER INPUT - REALISTIC STORY DATA NEEDED**

**Test Cases to Implement:**
- [ ] Initialize with Story object
- [ ] Initialize with Integer ID
- [ ] Initialize with String ID
- [ ] Initialize with Hash (story data)
- [ ] Handle unprocessable input gracefully
- [ ] Count stitches correctly
- [ ] Count total words correctly
- [ ] Calculate average words per stitch
- [ ] Detect stitches with choices (multiple options)
- [ ] Detect stitches with fake choices (single option)
- [ ] Detect stitches with conditions (ifCondition/NotIfCondition)
- [ ] Detect stitches with flags (flagName)
- [ ] Detect stitches with diverts
- [ ] Detect stitches with images
- [ ] Detect stitches with ends (no divert, no choices)
- [ ] Detect advanced syntax (regex patterns {x:y} and [x:y])
- [ ] Return complete stats hash with all fields

**Data Needed from User:**
- Simple story: 2-3 stitches, text only
- Story with choices: Multiple options branching
- Story with conditions: ifCondition/NotIfCondition examples
- Story with flags: flagName examples
- Story with diverts: Direct navigation
- Story with images: Image references
- Story with advanced syntax: Examples of {x:y} and [x:y] patterns

### 3.2 Rating::S_m_l_rating Service (`test/services/rating_test.rb`)
Priority: MEDIUM - Quality scoring

**Test Cases to Implement:**
- [ ] Initialize with Story object, Integer, String ID
- [ ] Handle zero total_words (angle = 0, indice_angle = 0)
- [ ] Handle zero stitches (indice_branching = 0)
- [ ] Calculate angle index (atan formula with Gaussian PDF)
- [ ] Calculate branching quality index
- [ ] Calculate size index (sigmoid function)
- [ ] Calculate syntax quality index (flags, conditions, advanced syntax)
- [ ] Calculate global score (product of all indices)
- [ ] Return score hash
- [ ] Verify score is reasonable for good/medium/poor stories

## Phase 4: Controller Tests

### 4.1 StoriesController (`test/controllers/stories_controller_test.rb`)
Priority: HIGH - Main API endpoints

**⚠️ REQUIRES USER INPUT - REALISTIC STORY DATA & AUTH TOKENS**

**Test Cases - Show Action:**
- [ ] GET /stories/:id returns 200 for existing story
- [ ] GET /stories/:id.json returns story JSON
- [ ] GET /stories/:id.ink returns ink format
- [ ] GET /stories/:id builds preview correctly (first_stitches_content, first_options_content)
- [ ] GET /stories/999999.json returns 404 with message for non-existent story
- [ ] Preview follows diverts correctly
- [ ] Preview extracts options correctly

**Test Cases - Index Action:**
- [ ] GET /users/:user_id/stories returns user's stories when authenticated
- [ ] GET /users/:user_id/stories returns 200 JSON with story array
- [ ] GET /stories without authentication shows cannot_display_stories

**Test Cases - Create Action:**
- [ ] POST /stories without authentication redirects to root
- [ ] POST /stories with valid data creates story (authenticated)
- [ ] POST /stories returns 201 with story JSON (title, data, url_key)
- [ ] POST /stories with invalid data returns 400
- [ ] Created story belongs to current_user
- [ ] Created story triggers stats/rating calculation

**Test Cases - Update Action:**
- [ ] PUT /stories/:id without authentication redirects to root
- [ ] PUT /stories/:id by non-owner redirects to not_story_owner
- [ ] PUT /stories/:id by owner updates story and returns 201
- [ ] PUT /stories/:id with valid data updates title and data
- [ ] PUT /stories/:id with missing data returns 400
- [ ] Updated story recalculates stats/rating

**Test Cases - Destroy Action:**
- [ ] DELETE /stories/:id without authentication redirects to root
- [ ] DELETE /stories/:id by non-owner redirects to not_story_owner
- [ ] DELETE /stories/:id by owner destroys story and returns 201
- [ ] DELETE /stories/:id removes associated story_stats (dependent: destroy)

**Data Needed from User:**
- Valid authentication tokens/sessions
- Sample story creation payloads (JSON)
- Sample story update payloads
- User credentials for authentication tests

### 4.2 PagesController (`test/controllers/pages_controller_test.rb`)
Priority: LOW

**Test Cases:**
- [ ] GET / returns 200 (index action)
- [ ] GET /privacy returns 200
- [ ] GET /health returns 200 HTML
- [ ] GET /health.json returns JSON with database_connected status
- [ ] Health check detects database connection failures

### 4.3 ErrorsController (`test/controllers/errors_controller_test.rb`)
Priority: LOW

**Test Cases:**
- [ ] GET /404 returns 404 status
- [ ] GET /500 returns 500 status

### 4.4 Admin::AdminpagesController (`test/controllers/admin/adminpages_controller_test.rb`)
Priority: MEDIUM

**⚠️ REQUIRES USER INPUT - ADMIN CREDENTIALS & DATE RANGES**

**Test Cases:**
- [ ] Admin authentication required for all actions
- [ ] Non-admin users denied access
- [ ] GET /admin returns 200 for admin user
- [ ] Admin index displays story creation stats by year/month
- [ ] POST /admin/score_search with valid params returns 200
- [ ] POST /admin/score_search returns top 10 stories by score
- [ ] POST /admin/score_search filters by date range (year/month/day)
- [ ] POST /admin/score_search filters by word count range (min/max)
- [ ] POST /admin/score_search with missing params returns 400
- [ ] POST /admin/score_search with no results returns empty array

**Data Needed from User:**
- Admin user credentials
- Date ranges with known story counts
- Word count ranges for filtering

### 4.5 Users:: Controllers (Devise Customization)
Priority: MEDIUM

**Test Cases (various controller files):**
- [ ] Registration: POST /users with valid data creates user
- [ ] Registration: POST /users with invalid email fails
- [ ] Session: POST /users/sign_in with valid credentials succeeds
- [ ] Session: POST /users/sign_in with invalid credentials fails
- [ ] Password reset: Request reset email
- [ ] Password reset: Reset with valid token

## Phase 5: Integration Tests

### 5.1 Story Creation Workflow (`test/integration/story_creation_flow_test.rb`)
Priority: HIGH

**⚠️ REQUIRES USER INPUT - COMPLETE USER JOURNEY DATA**

**Test Scenarios:**
- [ ] User signs up → creates story → views story → edits story → deletes story
- [ ] User creates story → stats calculated → rating calculated
- [ ] User creates story with choices → preview displays correctly
- [ ] Guest attempts to create story → redirected to login

### 5.2 Admin Workflow (`test/integration/admin_search_flow_test.rb`)
Priority: MEDIUM

**Test Scenarios:**
- [ ] Admin logs in → searches stories by criteria → views results
- [ ] Non-admin cannot access admin pages

## Phase 6: System Tests (Optional - Browser-based)

### 6.1 End-to-End Story Creation
Priority: LOW - Requires Chrome/Selenium setup

**Test Scenarios:**
- [ ] User visits homepage → signs up → creates story in editor → publishes → views published story
- [ ] User edits existing story → saves changes → verifies changes

## Implementation Guidelines

### Order of Implementation

1. **Start with models** (User → Story → StoryStats → Admin)
   - Models are the foundation; test these first
   - Ensure data integrity and callbacks work correctly

2. **Move to services** (Stats::Story → Rating)
   - Services contain complex business logic
   - Must have user-provided test data before starting

3. **Then controllers** (Stories → Pages → Admin → Users)
   - Controllers orchestrate models/services
   - Require authentication setup and user data

4. **Finally integration tests**
   - Test full workflows
   - Ensure all pieces work together

### Test Data Collection Process

Before starting each phase that requires user input:

1. **Create a data request document** listing exactly what's needed
2. **Wait for user to provide realistic data**
3. **Review provided data for completeness**
4. **Create fixtures from provided data**
5. **Proceed with test implementation**

### Test File Naming Convention

```
test/
├── models/
│   ├── user_test.rb
│   ├── story_test.rb
│   ├── story_stat_test.rb
│   └── admin_test.rb
├── services/
│   ├── stats_test.rb
│   └── rating_test.rb
├── controllers/
│   ├── stories_controller_test.rb
│   ├── pages_controller_test.rb
│   ├── errors_controller_test.rb
│   └── admin/
│       └── adminpages_controller_test.rb
├── integration/
│   ├── story_creation_flow_test.rb
│   └── admin_search_flow_test.rb
└── system/
    └── story_editor_test.rb
```

### Test Writing Template

```ruby
require 'test_helper'

class ModelNameTest < ActiveSupport::TestCase
  # Test data setup
  setup do
    @user = users(:one)
    @story = stories(:one)
  end

  # Clear test names describing behavior
  test "should not save story without data" do
    story = Story.new
    assert_not story.save, "Saved story without required data"
  end

  test "should create story with valid data" do
    story = Story.new(
      user: @user,
      data: @valid_story_data, # From fixtures
      title: "Test Story"
    )
    assert story.save, "Failed to save valid story"
  end
end
```

### Success Metrics

- [ ] **>80% code coverage** (aim for 90%+ on critical paths)
- [ ] All models have comprehensive validation/callback/association tests
- [ ] All controller actions have happy path + error case tests
- [ ] All service methods have unit tests with edge cases
- [ ] Integration tests cover main user workflows
- [ ] All tests pass consistently (`rails test` succeeds)
- [ ] Tests run in reasonable time (<5 minutes for full suite)
- [ ] No flaky tests (random failures)

### Continuous Testing During Development

```bash
# Watch mode (if using guard gem)
bundle exec guard

# Run specific test file frequently
rails test test/models/story_test.rb

# Run all tests before committing
rails test

# Check coverage (if using simplecov gem)
COVERAGE=true rails test
```

## Notes

- **DO NOT GENERATE SYNTHETIC DATA** - Always request realistic data from user
- **Test one thing at a time** - Each test should verify one behavior
- **Keep tests DRY but readable** - Use setup blocks, but don't over-abstract
- **Test edge cases** - Empty strings, nil values, boundary conditions
- **Test security** - Authorization, ownership, sanitization
- **Mock external dependencies** - Don't test Devise internals, focus on integration

## Timeline Estimate

- **Phase 1** (Foundation): 2-4 hours
- **Phase 2** (Models): 8-12 hours
- **Phase 3** (Services): 6-8 hours
- **Phase 4** (Controllers): 10-15 hours
- **Phase 5** (Integration): 4-6 hours
- **Phase 6** (System): 4-8 hours (optional)

**Total**: 34-53 hours of focused development time

This assumes user provides test data promptly when requested.
