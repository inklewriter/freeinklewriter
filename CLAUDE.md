# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Inklewriter/Freeinklewriter is a reverse-engineered version of the inklewriter server - a web application for creating interactive fiction/branching narrative stories. Users can write, edit, and publish non-linear stories with choices, conditions, flags, and diverts.

## Technology Stack

- **Framework**: Ruby on Rails 7.1.6
- **Ruby Version**: 3.3.0
- **Database**: PostgreSQL
- **Authentication**: Devise
- **Web Server**: Puma 5.6.9
- **Frontend**: JavaScript (inklewriter-write.js, inklewriter-read.js)
- **Container**: Docker + docker-compose

## Development Setup

### Using Docker (Recommended)

```bash
# Clone and setup
git clone https://github.com/inklewriter/freeinklewriter
cd freeinklewriter
cp .env.sample .env

# Start the application
docker-compose up

# Access at http://localhost:3000
```

### Database Commands

```bash
# Create and migrate database
rake db:create db:migrate

# Run migrations
rake db:migrate

# Seed database
rake db:seed

# Reset database
rake db:reset
```

### Running Tests

```bash
# Run all tests
rails test

# Run specific test
rails test test/controllers/stories_controller_test.rb

# Run system tests (requires Chrome)
rails test:system
```

### Testing JavaScript Bundle Delivery

After making changes to JavaScript source files, verify asset bundles are correctly compiled and served:

```bash
# Test inklewriter-main.js (write mode) is accessible
curl -I http://localhost:3000/assets/inklewriter-source/inklewriter-main.js

# Expected: HTTP/1.1 200 OK, Content-Type: application/javascript

# Test inklewriter-readmode.js (read mode) is accessible
curl -I http://localhost:3000/assets/inklewriter-source/inklewriter-readmode.js

# Expected: HTTP/1.1 200 OK, Content-Type: application/javascript

# Verify bundle sizes are reasonable (should be ~25k+ lines for main, ~17k+ for readmode)
curl -s http://localhost:3000/assets/inklewriter-source/inklewriter-main.js | wc -l
curl -s http://localhost:3000/assets/inklewriter-source/inklewriter-readmode.js | wc -l
```

**Note**: JavaScript tests should ONLY be run when JavaScript source files have been modified. The bundles are compiled from source files in `app/assets/javascripts/inklewriter-source/` using Sprockets.

### Running JavaScript Unit Tests

JavaScript unit tests are implemented using QUnit 2.24.2 for pure function testing.

```bash
# Run all JavaScript tests (via npm in Docker container)
docker compose run --rm app npm test

# Expected output: Test summary with pass/fail counts
# Example: 56 tests, 56 passed, 0 failed
```

**Testing Constraints:**
- Tests can ONLY test pure functions (no DOM, no AJAX, no browser APIs)
- Tests are located in `test/javascript/`
- Test files must end with `.test.js`
- QUnit runs via Node.js CLI (`npx qunit`)

**When to run JavaScript tests:**
- After modifying JavaScript source files in `app/assets/javascripts/inklewriter-source/`
- Before committing JavaScript changes
- NOT needed for view/controller changes

**After JavaScript changes, rebuild Docker and test:**
```bash
# Full workflow: rebuild image, restart containers, run tests
docker build -t inklewriter:latest . && \
docker compose down && \
docker compose up -d && \
docker compose run --rm app npm test
```

### Rails Commands

```bash
# Start Rails server locally
rails server -b 0.0.0.0

# Rails console
rails console

# Generate migration
rails generate migration MigrationName

# Routes information
rails routes
```

## Architecture

### Core Data Model

The application revolves around interactive **Stories** composed of **Stitches** (story nodes):

- **User**: Authenticated users who create stories (Devise-based)
- **Story**: Contains story data as JSON with nested stitches structure
  - `data`: JSON field storing stitches, initial node, editor data
  - `title`: Story title
  - `url_key`: Public identifier (same as id)
- **StoryStats**: Automatically computed statistics (stitches count, word count, branching quality)
- **Admin**: Admin users with elevated privileges

### Story Data Structure

Stories are stored as JSON with this structure:
- `stitches`: Hash of story nodes, each containing:
  - `content`: Array of strings (text) and hashes (choices, diverts, conditions, flags, images)
  - Choices: `{"option": "text", "linkPath": "target_stitch"}`
  - Diverts: `{"divert": "target_stitch"}`
  - Conditions: `{"ifCondition": ...}` or `{"NotIfCondition": ...}`
  - Flags: `{"flagName": "name"}`
- `initial`: Starting stitch key
- `editorData`: Metadata including authorName

### Services Layer

**Stats::Story** (`app/services/stats.rb`):
- Analyzes story structure and computes metrics
- Counts stitches, words, choices, conditions, flags, images
- Detects advanced syntax usage
- Automatically triggered on story save

**Rating::S_m_l_rating** (`app/services/rating.rb`):
- Calculates quality score based on:
  - Story structure (stitches/words ratio)
  - Branching quality (choices, diverts, ends)
  - Size (sigmoid function favoring medium-length stories)
  - Syntax quality (usage of flags, conditions, advanced features)

### Controllers

- **StoriesController**: Main CRUD operations
  - `show`: Returns story for reading/editing (HTML/JSON/INK formats)
  - `index`: Lists user's stories
  - `create`/`update`/`destroy`: Modify stories (authentication required)
  - Story ownership validation before modifications
- **Admin::AdminpagesController**: Admin dashboard and search
- **Users:: Controllers**: Devise customization (sessions, registrations, passwords)

### Assets

- `inklewriter-write.js`: Story editor interface (large, 635KB)
- `inklewriter-read.js`: Story reader/player interface (408KB)
- These are pre-built JavaScript bundles, not compiled from source

### Security

- HTML sanitization on story titles, author names, and stitch content
- Story ownership checks before updates/deletions
- Authentication required for story modifications
- Token-based authentication via `authentication_token` on User model

## Common Patterns

### Accessing Story Data

Stories can be identified by Story object, Integer ID, or String ID in service classes:

```ruby
Stats::Story.new(story_object).stats
Stats::Story.new(123).stats
Stats::Story.new("123").stats
```

### Story Processing Callbacks

The Story model automatically:
1. Assigns url_key after creation
2. Sanitizes title and author name before save
3. Processes stats and rating after save (if data present)

### Recursive Story Traversal

The StoriesController uses recursive methods to build story previews by following diverts and finding options/choices.

## Database Schema

- `users`: email (unique), encrypted_password, authentication_token
- `stories`: user_id (FK), data (JSON), title, url_key
- `story_stats`: story_id (FK), stitches, words counts, feature flags, quality score
- `admins`: user_id (FK)

## Environment Variables

Required variables (see `.env.sample`):
- PostgreSQL: `POSTGRES_HOST`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `PGDATA`
- Rails: `SECRET_KEY_BASE`, `RAILS_ENV`
- Mailer: `MAILING_ADDRESS`, `MAILING_PORT`, `MAILING_USER`, `MAILING_PASSWORD`, `MAILING_DOMAIN`, `ACTION_MAILER_HOST`

## Deployment

The project includes Docker and Kubernetes configurations:
- `Dockerfile`: Alpine-based Ruby 3.3.0 image
- `docker-compose.yml`: App + PostgreSQL setup
- `kubernetes.yaml`: K8s deployment with ingress
- `entrypoint.sh`: Initializes DB and starts Rails server

## Development Workflow

### Test-Driven Development (TDD)

This project follows a TDD workflow. When implementing new features or fixing bugs:

1. **Write tests first**: Before writing any implementation code, write failing tests that describe the expected behavior
2. **Run the tests**: Verify that the new tests fail for the right reasons
3. **Write minimal code**: Implement just enough code to make the tests pass
4. **Refactor**: Clean up the code while keeping tests green
5. **Repeat**: Continue the cycle for each small piece of functionality

**IMPORTANT - Test Data Requirements:**
- **DO NOT start implementation work until the user provides minimal testing data**
- **DO NOT create synthetic test data** except for trivial cases (e.g., testing absent/null data, empty strings, zero values)
- For features involving Stories, Users, or complex JSON structures, **always ask the user to provide realistic example data** before writing tests or implementation code
- The user should provide sample story JSON, user credentials, or other domain-specific data that reflects real-world usage

**Test locations:**
- Controller tests: `test/controllers/`
- Model tests: `test/models/`
- Integration tests: `test/integration/`
- System tests: `test/system/`

**Running tests during development:**

**IMPORTANT**: All tests MUST be run using docker-compose to ensure consistent environment with database access.


### Docker Test Workflow

1. **Build the Docker image** (required after code changes):
   ```bash
   docker build -t inklewriter:latest .
   ```

   Note: The image must be built separately as `inklewriter:latest` before running docker-compose.

2. **Force docker-compose to use the new image**:
   ```bash
   docker compose pull app || true  # Pull if using remote image (will fail for local, that's OK)
   docker compose up -d --force-recreate app
   ```

   **CRITICAL**: After building a new image, docker-compose may still use a cached version.
   You must force-recreate the containers to ensure the new image is used.

3. **Run tests using docker-compose**:
   ```bash
   # Run all tests
   docker compose run --rm app rails test

   # Run specific test file
   docker compose run --rm app rails test test/models/user_test.rb

   # Run specific test by name
   docker compose run --rm app rails test test/models/story_test.rb -n test_should_not_save_without_data

   # Run specific test directory
   docker compose run --rm app rails test test/models/
   ```

4. **Complete test workflow** (rebuild + force refresh + test):
   ```bash
   # Build new image, force docker-compose to use it, then run tests
   docker build -t inklewriter:latest . && \
   docker compose down && \
   docker compose up -d && \
   docker compose logs | head -n 100 && \
   docker compose run --rm app rails test
   ```

### Test Workflow Rules

- **Always use docker-compose** to ensure database connectivity
- **Use `--rm` flag** to automatically remove container after test run
- **Force-recreate containers** after building new images to avoid stale cache
- **No persistent test containers** - tests run in volatile instances
- **Database**: PostgreSQL runs in separate container (defined in docker-compose.yml)
- **Image cache issue**: docker-compose may use old images even after rebuild - always force-recreate
- **After running unit tests, always do some basic http testing.**

### Quick Test Commands

```bash
# Full TDD cycle: build + force refresh + test all
alias test-all='docker build -t inklewriter:latest . && docker compose down && docker compose up -d && docker compose run --rm app rails test'

# Quick test (assumes image is up to date)
alias test-quick='docker compose run --rm app rails test'

# Test models only
alias test-models='docker compose run --rm app rails test test/models/'

# Test controllers only
alias test-controllers='docker compose run --rm app rails test test/controllers/'

# Test services only
alias test-services='docker compose run --rm app rails test test/services/'
```

### Database Management for Tests

```bash
# Create test database
docker compose run --rm app rails db:create RAILS_ENV=test

# Run migrations on test database
docker compose run --rm app rails db:migrate RAILS_ENV=test

# Reset test database
docker compose run --rm app rails db:test:prepare
```

### JavaScript Testing Workflow

**Framework**: QUnit 2.24.2 (Node.js CLI)

**Test Location**: `test/javascript/**/*_test.js`

**CRITICAL Testing Requirements**:

⚠️ **MANDATORY CONSTRAINTS - NO EXCEPTIONS:**
- **ONLY test pure JavaScript functions** - functions that compute outputs from inputs with no side effects
- **ABSOLUTELY NO DOM testing** - zero jQuery, zero element manipulation, zero event handlers
- **ABSOLUTELY NO AJAX testing** - zero HTTP requests, zero server communication, zero async operations
- **NO browser APIs** - no localStorage, no window object, no document object
- **NO external dependencies** - tests must be self-contained with mocked/copied functions
- **Focus EXCLUSIVELY on**: Pure business logic, data transformations, utility functions, algorithms

**What CAN be tested:**
- Data model getters/setters (e.g., `StoryModel.storyName()`, `StoryModel.setStoryName()`)
- Pure utility functions (e.g., `wordCountOf()`, `commadString()`)
- String/Array transformations (e.g., `String.camelCase()`, `Array.first()`)
- Mathematical calculations and comparisons
- Object/array manipulation without side effects
- Flag/state logic without DOM interaction

**What CANNOT be tested:**
- Anything using `$()` or jQuery selectors
- Functions that create/modify DOM elements
- Event handlers (`click`, `tap`, `change`, etc.)
- AJAX calls (`$.ajax`, `fetch`, etc.)
- Functions that read/write to `localStorage`
- Functions that use `window`, `document`, or browser APIs
- Functions with side effects (file I/O, network, timers)

**Running JavaScript Tests**:

```bash
# Run all JavaScript tests
docker compose run --rm app npm test

# Tests are executed using QUnit CLI via npx
# The npm test script runs: npx qunit test/javascript/**/*_test.js
```

**JavaScript Test Workflow Rules - STRICTLY ENFORCED**:
- **ALL JavaScript tests MUST pass** before ANY commit touching JS files
- **Run ONLY when JavaScript code has changed** (not for every Ruby change)
- **ALWAYS use docker-compose** - never run npm locally
- **TDD REQUIRED**: Write tests FIRST before implementing new JavaScript features
- **100% test pass rate** - zero tolerance for failing tests
- **No test skipping** - do not use `QUnit.skip()` to bypass failures
- **User acceptance required** - all tests must pass AND user must review before commit

**Example Test Structure**:

```javascript
// test/javascript/example_test.js
// Mock or copy the function to test
function myFunction(input) {
  return input * 2;
}

QUnit.module('Module Name', function(hooks) {
  hooks.beforeEach(function() {
    // Setup before each test
  });

  QUnit.test('Description of test', function(assert) {
    assert.equal(myFunction(5), 10, 'Should double the input');
  });
});
```

**Current Test Coverage (56 tests total)**:
- `test/javascript/sample_test.js`: QUnit framework verification (2 tests)
- `test/javascript/storyModel_test.js`: StoryModel functions - core properties, flag parsing, conditionals, page calculations (32 tests)
- `test/javascript/aux_test.js`: Utility functions and Array/String extensions (24 tests)

**Testing JavaScript Bundle Delivery**:

After making changes to JavaScript source files in `app/assets/javascripts/inklewriter-source/`:

```bash
# Verify bundles are served correctly
curl -I http://localhost:3000/assets/inklewriter-source/inklewriter-main.js
# Expected: HTTP/1.1 200 OK, Content-Type: application/javascript

curl -I http://localhost:3000/assets/inklewriter-source/inklewriter-readmode.js
# Expected: HTTP/1.1 200 OK, Content-Type: application/javascript

# Check bundle sizes (lines of code)
curl -s http://localhost:3000/assets/inklewriter-source/inklewriter-main.js | wc -l
# Expected: ~25,000+ lines for main bundle

curl -s http://localhost:3000/assets/inklewriter-source/inklewriter-readmode.js | wc -l
# Expected: ~17,000+ lines for readmode bundle
```

## Commit Message Format

All commits must follow the **Conventional Commits** specification with AI traceability annotations.

### Template

```text
type(scope): short description (max 72 characters)

[Optional body with detailed explanation:
- What changed
- Why it changed
- Important implementation details]

---
🤖 AI-Assisted Development
Tool: [Tool name + version]
Agent: [Suggestion | Guided | Autonomous]
Prompt type: [Description of the request]
Context files: [Files provided to AI]
Human validation:
  - Functionality: [✓/✗ Status]
  - Tests: [✓/✗ Status and coverage if applicable]
  - Code review: [✓/✗ Status]
```

### Commit Types

Use these standardized types:

| Type | Usage | Example |
|------|-------|---------|
| `feat` | New feature | `feat(stories): add export to INK format` |
| `fix` | Bug fix | `fix(rating): correct branching quality calculation` |
| `docs` | Documentation only | `docs(readme): update TDD workflow` |
| `style` | Code formatting (no logic change) | `style(models): format with Rubocop` |
| `refactor` | Code restructuring (no behavior change) | `refactor(stats): extract word counting logic` |
| `perf` | Performance improvement | `perf(stories): optimize recursive traversal` |
| `test` | Add or update tests | `test(story): add validation tests` |
| `build` | Build system or dependencies | `build(deps): update Rails to 5.2.4.6` |
| `ci` | CI/CD configuration | `ci(travis): add test workflow` |
| `chore` | Maintenance tasks | `chore(gitignore): add tmp files` |

### Guidelines for Writing Commit Messages

1. **Use imperative mood** (present tense):
   - ✅ "add feature"
   - ❌ "added feature" or "adds feature"

2. **Keep first line under 72 characters**

3. **Provide context in the body** when the change is not trivial:
   - What was the problem?
   - How does this solve it?
   - Any side effects or considerations?

4. **Always include AI annotations footer** (see template above)

5. **Reference related files** in the body when relevant

### Common Scopes for This Project

- `stories` - Story model and controller
- `users` - User authentication and management
- `admin` - Admin functionality
- `stats` - Statistics calculation service
- `rating` - Rating/scoring service
- `test` - Testing infrastructure
- `docs` - Documentation
- `config` - Configuration files
- `db` - Database migrations

### Example Commits

**Example 1: Feature implementation**

```text
feat(stories): add story preview generation

Implement recursive traversal to build story previews:
- Follow diverts to collect stitch content
- Extract all choice options from story branches
- Store preview data in @first_stitches_content and @first_options_content
- Display preview in story show view

Handles stories with complex branching and nested choices.

---
🤖 AI-Assisted Development
Tool: Claude Code v1.2 (claude-sonnet-4-5-20250929)
Agent: Guided implementation from user requirements
Prompt type: Feature request with story structure examples
Context files: app/controllers/stories_controller.rb, test/fixtures/stories.yml
Human validation:
  - Functionality: ✓ Tested with sample branching story
  - Tests: ✓ Integration tests added with 100% coverage
  - Code review: ✓ Recursive logic validated
```

**Example 2: Test implementation**

```text
test(story): add model validation and callback tests

Add comprehensive tests for Story model:
- Validation: data presence requirement
- Callbacks: url_key assignment after creation
- Callbacks: title and author sanitization before save
- Callbacks: stats and rating processing after save
- Associations: belongs_to user, has_one story_stat

All tests use fixtures with realistic story JSON data
provided by user (branching narrative with choices).

---
🤖 AI-Assisted Development
Tool: Claude Code v1.2 (claude-sonnet-4-5-20250929)
Agent: Autonomous test generation following TDD plan
Prompt type: Implement Phase 2.2 from TASK.md
Context files: app/models/story.rb, test/fixtures/stories.yml, TASK.md
Human validation:
  - Functionality: ✓ All tests pass (rails test)
  - Tests: ✓ 12 tests added, 0 failures
  - Code review: ✓ Follows TDD best practices
```

**Example 3: Bug fix**

```text
fix(stats): handle stories with zero total words

Stats calculation crashed when story had empty stitches.
Added zero-word check in Stats::Story service to prevent
division by zero when calculating average words per stitch.

Returns avg_words: 0 and total_words: 0 for empty stories.

---
🤖 AI-Assisted Development
Tool: Claude Code v1.2 (claude-sonnet-4-5-20250929)
Agent: Autonomous debugging from error report
Prompt type: Bug fix - zero division error
Context files: app/services/stats.rb, test/services/stats_test.rb
Human validation:
  - Functionality: ✓ No longer crashes on empty stories
  - Tests: ✓ Added edge case test for zero words
  - Code review: ✓ Guard clause properly implemented
```

## Health Check

Health endpoint available at `/health` (uses health_check gem)
