import $api from '../http';

export default class NoteService {
  static async getUserNoteById(id) {
    return $api.get(`/GetUserNotes/${id}`);
  }

  static async getNotesCount(userId) {
    return $api.get(`/GetNotes/${userId}`);
  }

  static async addNoteById(note) {
    return $api.post('/AddNote', {
      Creator: note.userId,
      Name: note.title,
      Body: note.content,
      priority: note.priority,
      color: note.color,
    });
  }
}
