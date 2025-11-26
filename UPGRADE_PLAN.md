# Ruby & Rails Upgrade Plan

## Current State
- Ruby: 2.6.7 (Dockerfile) / 2.5.0 (.ruby-version)
- Rails: 5.2.4.6
- Test suite: 104 tests, 217 assertions, all passing

## Phase 1: Conservative Upgrade (Ruby 3.1 + Rails 6.1)

### 1.1 Update Ruby version files
- [ ] Update `.ruby-version` to 3.1.4
- [ ] Update `Gemfile` ruby version to 3.1.4
- [ ] Update `Dockerfile` to use ruby:3.1.4-alpine

### 1.2 Update Rails and dependencies
- [ ] Update Rails from 5.2.4.6 to 6.1.7.8 (latest 6.1.x)
- [ ] Update other gems for Rails 6.1 compatibility:
  - [ ] Update bootsnap
  - [ ] Update puma
  - [ ] Update devise
  - [ ] Check all other gem compatibility

### 1.3 Rails 6 configuration changes
- [ ] Add `config.load_defaults 6.1` to application.rb
- [ ] Review and update any deprecated Rails 5 code
- [ ] Check for ActionMailer changes
- [ ] Check for ActiveRecord changes

### 1.4 Rebuild and test
- [ ] Rebuild Docker image
- [ ] Run database migrations
- [ ] Run complete test suite
- [ ] Fix any breaking changes
- [ ] Test application manually (if needed)

### 1.5 Commit Phase 1
- [ ] Commit conservative upgrade with all tests passing

---

## Phase 2: Modern Upgrade (Ruby 3.2 + Rails 7.0)

### 2.1 Update Ruby version
- [ ] Update `.ruby-version` to 3.2.3
- [ ] Update `Gemfile` ruby version to 3.2.3
- [ ] Update `Dockerfile` to use ruby:3.2.3-alpine

### 2.2 Update Rails to 7.0
- [ ] Update Rails from 6.1.x to 7.0.8 (latest 7.0.x)
- [ ] Update gem dependencies for Rails 7.0
- [ ] Handle any deprecated gems

### 2.3 Rails 7.0 configuration changes
- [ ] Update `config.load_defaults 7.0`
- [ ] Review asset pipeline changes (Sprockets vs Propshaft)
- [ ] Check for CSRF token changes
- [ ] Review ActiveRecord encryption features

### 2.4 Rebuild and test
- [ ] Rebuild Docker image
- [ ] Run database migrations
- [ ] Run complete test suite
- [ ] Fix any breaking changes

### 2.5 Commit Phase 2
- [ ] Commit modern upgrade with all tests passing

---

## Phase 3: Cutting Edge (Ruby 3.3 + Rails 7.1)

### 3.1 Update Ruby version
- [ ] Update `.ruby-version` to 3.3.0
- [ ] Update `Gemfile` ruby version to 3.3.0
- [ ] Update `Dockerfile` to use ruby:3.3.0-alpine

### 3.2 Update Rails to 7.1
- [ ] Update Rails from 7.0.x to 7.1.3 (latest 7.1.x)
- [ ] Update all gem dependencies for Rails 7.1

### 3.3 Rails 7.1 new features
- [ ] Update `config.load_defaults 7.1`
- [ ] Review new authentication features
- [ ] Check ActiveRecord improvements
- [ ] Review new security features

### 3.4 Rebuild and test
- [ ] Rebuild Docker image
- [ ] Run database migrations
- [ ] Run complete test suite
- [ ] Fix any breaking changes

### 3.5 Commit Phase 3
- [ ] Commit cutting-edge upgrade with all tests passing

---

## Rollback Strategy
- Each phase is committed separately
- If any phase fails critically, git revert to previous working commit
- Tests must pass before moving to next phase

## Success Criteria
- All 104+ tests passing
- No deprecation warnings
- Application runs without errors
- Docker build succeeds
