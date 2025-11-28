# Test Data Request

## ⚠️ REQUIRED BEFORE PROCEEDING WITH TDD IMPLEMENTATION

According to the TDD workflow defined in CLAUDE.md and TASK.md, **realistic test data must be provided by the user before any test implementation begins**. This document outlines exactly what data is needed.

## Why User-Provided Data is Required

- **No synthetic data generation**: AI should not create fake story structures or user data
- **Real-world accuracy**: Tests must reflect actual usage patterns
- **Domain expertise**: Only you understand valid story structures and edge cases
- **Test reliability**: Tests with realistic data catch real bugs

---

## 1. Story JSON Data (CRITICAL - Phase 2 & 3)

### 1.1 Simple Story (Minimal)
**Purpose**: Test basic story processing, stats calculation, word counting

**Requirements**:
- 2-3 stitches with simple text content
- One initial stitch
- Basic structure (no choices, diverts, conditions, flags)

**Example format needed**:
```json
{"title":"Untitled Story","data":{"stitches":{"onceUponATimeThe":{"content":["Once upon a time, there was a lonely tester called Claude.",{"divert":"itHadToTestAnApp"},{"pageNum":1}]},"itHadToTestAnApp":{"content":["It had to test an application and it was so much work."]}},"initial":"onceUponATimeThe","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"itHadToTestAnApp","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":263551}
```

### 1.2 Story with Choices
**Purpose**: Test choice detection, branching analysis, fake choice detection

**Requirements**:
- Multiple stitches with branching
- At least one stitch with 2+ options (real choice)
- At least one stitch with 1 option (fake choice)
- LinkPath references to other stitches

**Example format needed**:
```json
{"title":"test syntax","data":{"stitches":{"initBoo":{"content":["init boo",{"option":"Substract 1 to var","linkPath":"applyingVar","ifConditions":null,"notIfConditions":null},{"option":"Add 1 to var","linkPath":"applyingVar1","ifConditions":null,"notIfConditions":null},{"pageNum":1}]},"applyingVar":{"content":["Applying: var += -1",{"divert":"theVariableVarIs"},{"flagName":"var - 1"}]},"theVariableVarIs":{"content":["The variable var is inferior to  0 ",{"divert":"theVariableVarIs1"},{"ifCondition":"var \u003c= -1"}]},"theVariableVarIs1":{"content":["The variable var is superior to 0",{"divert":"theVarIsEqualTo"},{"ifCondition":"var \u003e= 1"}]},"theVarIsEqualTo":{"content":["The var is equal to 0",{"divert":"theVarIsEqualTo1"},{"ifCondition":"var = 0"}]},"theVarIsEqualTo1":{"content":["The var is equal to -1",{"divert":"theVarIsEqualTo2"},{"ifCondition":"var = -1"}]},"theVarIsEqualTo2":{"content":["The var is equal to 1",{"divert":"doItAgain"},{"ifCondition":"var = 1 "}]},"doItAgain":{"content":["Do it again !",{"divert":"initBoo"}]},"applyingVar1":{"content":["Applying: var += 1",{"divert":"theVariableVarIs"},{"flagName":"var +1 "}]}},"initial":"initBoo","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"initBoo","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":50561}
```

### 1.3 Story with Diverts
**Purpose**: Test divert detection, story traversal, preview generation

**Requirements**:
- Stitches that automatically redirect to other stitches
- Divert syntax

**Example format needed**:
```json
{"title":"test syntax","data":{"stitches":{"initBoo":{"content":["init boo",{"option":"Substract 1 to var","linkPath":"applyingVar","ifConditions":null,"notIfConditions":null},{"option":"Add 1 to var","linkPath":"applyingVar1","ifConditions":null,"notIfConditions":null},{"pageNum":1}]},"applyingVar":{"content":["Applying: var += -1",{"divert":"theVariableVarIs"},{"flagName":"var - 1"}]},"theVariableVarIs":{"content":["The variable var is inferior to  0 ",{"divert":"theVariableVarIs1"},{"ifCondition":"var \u003c= -1"}]},"theVariableVarIs1":{"content":["The variable var is superior to 0",{"divert":"theVarIsEqualTo"},{"ifCondition":"var \u003e= 1"}]},"theVarIsEqualTo":{"content":["The var is equal to 0",{"divert":"theVarIsEqualTo1"},{"ifCondition":"var = 0"}]},"theVarIsEqualTo1":{"content":["The var is equal to -1",{"divert":"theVarIsEqualTo2"},{"ifCondition":"var = -1"}]},"theVarIsEqualTo2":{"content":["The var is equal to 1",{"divert":"doItAgain"},{"ifCondition":"var = 1 "}]},"doItAgain":{"content":["Do it again !",{"divert":"initBoo"}]},"applyingVar1":{"content":["Applying: var += 1",{"divert":"theVariableVarIs"},{"flagName":"var +1 "}]}},"initial":"initBoo","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"initBoo","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":50561}
```

### 1.4 Story with Conditions
**Purpose**: Test condition detection, advanced syntax scoring

**Requirements**:
- ifCondition examples
- NotIfCondition examples
- Multiple conditions (ifConditions/NotIfConditions)

**Example format needed**:
```json
{"title":"Untitled Story","data":{"stitches":{"hello":{"content":["Hello",{"option":"You went north","linkPath":"itWasCold","ifConditions":null,"notIfConditions":null},{"option":"Or south?","linkPath":"itWasABitLessCol","ifConditions":null,"notIfConditions":null},{"pageNum":1}]},"itWasCold":{"content":["It was cold.",{"divert":"youWentToDrinkSo"},{"flagName":"north"}]},"youWentToDrinkSo":{"content":["You went to drink something.",{"option":"You picked a coffee","linkPath":"thatsGoodCoffee","ifConditions":[{"ifCondition":"north"}],"notIfConditions":null},{"option":"You picked a cocktail","linkPath":"margaritaIsTheBe","ifConditions":[{"ifCondition":"south"}],"notIfConditions":null},{"option":"Just water please","linkPath":"youreAFancyOneIn","ifConditions":null,"notIfConditions":null}]},"itWasABitLessCol":{"content":["It was a bit less cold.",{"divert":"youWentToDrinkSo"},{"flagName":"south"}]},"margaritaIsTheBe":{"content":["Margarita is the best."]},"youreAFancyOneIn":{"content":["You're a fancy one, innit."]},"thatsGoodCoffee":{"content":["That's good coffee",{"runOn":true},{"pageNum":2}]}},"initial":"hello","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"youWentToDrinkSo","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":263552}
```

### 1.5 Story with Flags
**Purpose**: Test flag detection, syntax quality scoring

**Requirements**:
- Flag setting examples
- Flag name format

**Example format needed**:
```json
{"title":"Untitled Story","data":{"stitches":{"hello":{"content":["Hello",{"option":"You went north","linkPath":"itWasCold","ifConditions":null,"notIfConditions":null},{"option":"Or south?","linkPath":"itWasABitLessCol","ifConditions":null,"notIfConditions":null},{"pageNum":1}]},"itWasCold":{"content":["It was cold.",{"divert":"youWentToDrinkSo"},{"flagName":"north"}]},"youWentToDrinkSo":{"content":["You went to drink something.",{"option":"You picked a coffee","linkPath":"thatsGoodCoffee","ifConditions":[{"ifCondition":"north"}],"notIfConditions":null},{"option":"You picked a cocktail","linkPath":"margaritaIsTheBe","ifConditions":[{"ifCondition":"south"}],"notIfConditions":null},{"option":"Just water please","linkPath":"youreAFancyOneIn","ifConditions":null,"notIfConditions":null}]},"itWasABitLessCol":{"content":["It was a bit less cold.",{"divert":"youWentToDrinkSo"},{"flagName":"south"}]},"margaritaIsTheBe":{"content":["Margarita is the best."]},"youreAFancyOneIn":{"content":["You're a fancy one, innit."]},"thatsGoodCoffee":{"content":["That's good coffee",{"runOn":true},{"pageNum":2}]}},"initial":"hello","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"youWentToDrinkSo","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":263552}
```

### 1.6 Story with Images
**Purpose**: Test image detection in stats

**Requirements**:
- Image references in content

**Example format needed**:
```json
{"title":"Untitled Story","data":{"stitches":{"onceUponATime":{"content":["Once upon a time...",{"image":"https://blog.inklewriter.com/wp-content/uploads/2022/10/cropped-logo.png"},{"pageNum":1}]}},"initial":"onceUponATime","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"onceUponATime","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":263552}
```

### 1.7 Story with Advanced Syntax
**Purpose**: Test regex detection of {x:y} and [x:y] patterns

**Requirements**:
- Text containing {variable:value} patterns
- Text containing [variable:value] patterns

**Example format needed**:
```json
{"title":"Untitled Story","data":{"stitches":{"onceUponATimeThe":{"content":["Once upon a time, there was a lonely tester called Claude.",{"divert":"itHadToTestAnApp"},{"pageNum":1}]},"itHadToTestAnApp":{"content":["It had to test an application and it was so much work. [https://blog.inklewriter.com/wp-content/uploads/2022/10/cropped-logo.png]",{"image":"https://blog.inklewriter.com/wp-content/uploads/2022/10/cropped-logo.png"},{"divert":"butItDidWellAndF"}]},"butItDidWellAndF":{"content":["But it did well and finally succeeded.",{"option":"Did it really?","linkPath":"yesItDidMoreThan","ifConditions":null,"notIfConditions":null},{"option":"Or did it not?","linkPath":"wellIndeedItFail","ifConditions":null,"notIfConditions":null}]},"yesItDidMoreThan":{"content":["Yes it did. More than once : {loop \u003e 0 : many times | one time}.",{"divert":"onceUponATimeThe"},{"flagName":"seen=true"},{"flagName":"loop + 1"}]},"wellIndeedItFail":{"content":["Well, indeed it failed.",{"divert":"butItDidWellAndF"}]}},"initial":"onceUponATimeThe","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"butItDidWellAndF","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":263551}
```

### 1.8 Story with Ends
**Purpose**: Test end detection (no divert, no choices)

**Requirements**:
- At least one stitch with no outgoing connections

**Example format needed**:
```json
{"title":"test syntax","data":{"stitches":{"initBoo":{"content":["init boo",{"option":"Substract 1 to var","linkPath":"applyingVar","ifConditions":null,"notIfConditions":null},{"option":"Add 1 to var","linkPath":"applyingVar1","ifConditions":null,"notIfConditions":null},{"pageNum":1}]},"applyingVar":{"content":["Applying: var += -1",{"divert":"theVariableVarIs"},{"flagName":"var - 1"}]},"theVariableVarIs":{"content":["The variable var is inferior to  0 ",{"divert":"theVariableVarIs1"},{"ifCondition":"var \u003c= -1"}]},"theVariableVarIs1":{"content":["The variable var is superior to 0",{"divert":"theVarIsEqualTo"},{"ifCondition":"var \u003e= 1"}]},"theVarIsEqualTo":{"content":["The var is equal to 0",{"divert":"theVarIsEqualTo1"},{"ifCondition":"var = 0"}]},"theVarIsEqualTo1":{"content":["The var is equal to -1",{"divert":"theVarIsEqualTo2"},{"ifCondition":"var = -1"}]},"theVarIsEqualTo2":{"content":["The var is equal to 1",{"divert":"doItAgain"},{"ifCondition":"var = 1 "}]},"doItAgain":{"content":["Do it again !",{"divert":"initBoo"}]},"applyingVar1":{"content":["Applying: var += 1",{"divert":"theVariableVarIs"},{"flagName":"var +1 "}]}},"initial":"initBoo","optionMirroring":true,"allowCheckpoints":false,"editorData":{"playPoint":"initBoo","libraryVisible":false,"authorName":"Anonymous","textSize":2}},"url_key":50561}
```

---

## 2. User Data (Phase 2 & 4)

### 2.1 Valid User
**Requirements**:
- Valid email address
- Password (doesn't need to be secure for tests)

**Example format needed**:
```yaml
email: "test@inklewriter"
email: "test@example.com"
password: "password123"
```

### 2.2 Invalid Users (for validation tests)
**Requirements**:
- Invalid email formats (missing @, no domain, etc.)
- Empty email
- Duplicate emails

**Example formats needed**:
```yaml
invalid_email_1: "notanemail"
invalid_email_2: "missing@domain"
empty_email: ""
```

---

## 3. Story Stats Data (Phase 2 & 3)

For each story provided above, please also provide expected stats:

**Example format needed**:
```yaml
story_simple:
  stitches: 3
  total_words: 45
  avg_words: 15
  with_choice: 0
  with_fake_choice: 0
  with_condition: 0
  with_flag: 0
  with_divert: 0
  with_image: 0
  with_end: 1
  advanced_syntax: 0
```

This allows us to verify the Stats::Story service calculates correctly.

---

## 4. Authentication Data (Phase 4)

### 4.1 Valid Login Credentials
**Requirements**:
- Email and password for successful login tests

### 4.2 Invalid Login Attempts
**Requirements**:
- Wrong password scenarios
- Non-existent user scenarios

---

## 5. Admin Data (Phase 4)

### 5.1 Admin User
**Requirements**:
- User ID or email of an admin user
- Date ranges with known story counts (for admin search tests)

### 5.2 Search Parameters
**Requirements**:
- Date ranges: year, month, day (min and max)
- Word count ranges: min and max words
- Expected number of results

**Example format needed**:
```yaml
search_scenario_1:
  min_year: 2023
  min_month: 1
  min_day: 1
  max_year: 2023
  max_month: 12
  max_day: 31
  min_words: 100
  max_words: 5000
  expected_results: 5
```

---

## 6. Rating/Scoring Examples (Phase 3)

For rating tests, provide:

### 6.1 Good Quality Story
- High branching quality (many choices, diverts)
- Good size (medium length)
- Advanced syntax usage
- Expected score range

### 6.2 Poor Quality Story
- Linear structure (few/no choices)
- Very short or very long
- No advanced features
- Expected score range

### 6.3 Edge Cases
- Zero words story
- Zero stitches story
- Expected behavior (score = 0?)

---

## How to Provide the Data

Please provide the data in one of these formats:

### Option 1: YAML Files
Create fixture files in `test/fixtures/`:
- `test/fixtures/stories.yml`
- `test/fixtures/users.yml`
- `test/fixtures/story_stats.yml`
- `test/fixtures/admins.yml`

### Option 2: JSON Files
Provide JSON files with the story structures and I'll convert them to fixtures.

### Option 3: Direct in Chat
Paste the data structures directly in the chat, clearly labeled by category.

---

## Priority Order

If you can't provide all data at once, prioritize in this order:

1. **CRITICAL**: Simple story + Story with choices (for basic tests)
2. **HIGH**: User data (for authentication tests)
3. **HIGH**: Story with diverts, conditions, flags
4. **MEDIUM**: Complex story (for integration tests)
5. **MEDIUM**: Admin data and search scenarios
6. **LOW**: Edge cases and advanced scenarios

---

## Once Data is Provided

After receiving your test data, I will:
1. ✅ Create/update fixture files
2. ✅ Verify data structure matches schema
3. ✅ Begin Phase 2.1: User Model tests
4. ✅ Progress through TDD phases systematically
5. ✅ Run tests frequently and report results

---

## Current Status

⏸️ **BLOCKED** - Waiting for user to provide test data

Please provide at minimum:
- 1 simple story JSON
- 1 story with choices JSON
- 1 valid user (email/password)
- Expected stats for the stories

Once received, TDD implementation can begin immediately.
