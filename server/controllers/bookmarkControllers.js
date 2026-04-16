// NEW file — bookmark controllers (mirrors the pattern in userControllers.js)
const bookmarkModel = require('../models/bookmarkModel');

// GET /api/bookmarks — all bookmarks with owner username (public)
const listBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await bookmarkModel.list();
    res.send(bookmarks);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:user_id/bookmarks — bookmarks for a specific user (public)
const listUserBookmarks = async (req, res, next) => {
  try {
    const userId = Number(req.params.user_id);
    const bookmarks = await bookmarkModel.listByUser(userId);
    res.send(bookmarks);
  } catch (err) {
    next(err);
  }
};

// POST /api/bookmarks { title, url }
const createBookmark = async (req, res, next) => {
  try {
    // TODO: 1. Get the title and url from the body
    // 2. invoke bookmarkModel.create(userId, title, url)
    // 3. send a 201 with the new bookmark
  } catch (err) {
    next(err);
  }
};

// PATCH /api/bookmarks/:bookmark_id { title, url }
// Ownership check here is different from updateUser: the URL only has bookmark_id, not user_id,
// so we can't compare URL params to the session. We fetch the bookmark first to get its owner.
const updateBookmark = async (req, res, next) => {
  try {
    const bookmarkId = Number(req.params.bookmark_id);

    const existing = await bookmarkModel.find(bookmarkId);
    if (!existing) return res.status(404).send({ message: 'Bookmark not found' });

    // Ownership check — the bookmark's user_id must match the session userId
    if (existing.user_id !== req.session.userId) {
      return res.status(403).send({ message: 'You can only update your own bookmarks.' });
    }

    const { title, url } = req.body;
    const bookmark = await bookmarkModel.update(bookmarkId, title, url);
    res.send(bookmark);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/bookmarks/:bookmark_id — same find-then-check pattern as updateBookmark
const deleteBookmark = async (req, res, next) => {
  try {
    // TODO: 1. Get the bookmark_id from the params
    // 2. Invoke bookmarkModel.find() to see if the bookmark exists in the database 
    // 3. If not, send a 404 { message: 'Bookmark not found' }
    // 4. If the bookmark's user_id is NOT same as the session.userId, send a 403 { message: 'You can only delete your own bookmarks.' }
    // 5. Otherwise, invoke bookmarkModel.destroy() and send the deleted bookmark
  } catch (err) {
    next(err);
  }
};

module.exports = { listBookmarks, listUserBookmarks, createBookmark, updateBookmark, deleteBookmark };
