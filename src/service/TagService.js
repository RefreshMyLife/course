import $api from '../http';

export default class TagService {
  static async getNoteTagsByUserId(id) {
    return $api.get(`/GetNoteTags/${id}`);
  }

  static async addTag(NameTag, NoteId) {
    return $api.post('/AddNoteTag', { NameTag, NoteId });
  }

  static async logout() {
    return $api.post('/logout');
  }
}
