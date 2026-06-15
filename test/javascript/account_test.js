// Tests for EditorAccount

import { loadSourceFile } from './helpers/load_source.js';
import sinon from 'sinon';

global.localStorage = {
    removeItem: () => {}
}
global.document = {};
global.window = {
    location: {
        search: {}
    }
}
global.$ = Object.assign(
  (selector) => ({ ajaxSend: () => {} }),
  {ajax: () => {}}
);

loadSourceFile('aux');
loadSourceFile('editorAccount');
loadSourceFile('editorMenu');

QUnit.module('EditorAccount', (hooks) => {
    let mock;

    QUnit.module('fetchStories', (hooks) => {

        hooks.beforeEach(() => {
            mock = sinon.createSandbox();
        });

        hooks.afterEach(() => {
            mock.restore();
            EditorAccount.clearSession();
        });

        QUnit.test('loads requested story id from params when available', (assert) => {
            const url_key = "123";
            const now = new Date();
            const yesterday = new Date(now.getDate() - 1);
            mock.stub(global.$, 'ajax').callsFake((options) => {
                options.success([{ url_key, updated_at: yesterday }, { url_key: '321', updated_at: now }]);
            });
            mock.stub(window.location, 'search').get(() => `?storyID=${url_key}`);

            EditorAccount.fetchStories();
            assert.equal(url_key, EditorAccount.currentStoryId());
        });

        QUnit.test('loads most recent story when no url param provided', (assert) => {
            const url_key = "123";
            const now = new Date();
            const yesterday = new Date(now.getDate() - 1);
            mock.stub(global.$, 'ajax').callsFake((options) => {
                options.success([{ url_key: '321', updated_at: yesterday }, { url_key, updated_at: now }]);
            });

            EditorAccount.fetchStories();
            assert.equal(url_key, EditorAccount.currentStoryId());
        });

        QUnit.test('creates a new story when none available', (assert) => {
            const url_key = "123";
            const now = new Date();
            const yesterday = new Date(now.getDate() - 1);
            mock.stub(global.$, 'ajax').callsFake((options) => {
                options.success([]); // "Successfully fetched 0 stories."
            });
            const createNewStub = mock.stub(EditorMenu, "createNew");

            EditorAccount.fetchStories();

            assert.ok(createNewStub.calledOnce);
        });
    });
});
