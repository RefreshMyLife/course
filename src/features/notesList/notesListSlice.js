import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

import notes from '../../notesData';

const initialState = {
  mainNotes: [],
  editNote: null,
};

const notesListSlice = createSlice({
  name: 'notesList',
  initialState,
  reducers: {
    setMainNotes: (state, { payload }) => {
      if (state.mainNotes.find(({ id }) => id === payload.id)) {
        state.mainNotes = state.mainNotes.map((note) => (note.id === payload.id ? payload : note));
      } else {
        state.mainNotes.push(payload);
      }
    },

    // setArchiveNotes: (state, { payload }) => {
    //   state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
    //   state.archiveNotes.push({ ...payload, isPinned: false });
    // },

    setTrashNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.filter(({ id }) => id !== payload.id);
    },

    // unarchiveNote: (state, { payload }) => {
    //   state.archiveNotes = state.archiveNotes.filter(
    //     ({ id }) => id !== payload.id
    //   );
    //   state.mainNotes.push(payload);
    // },

    // restoreNote: (state, { payload }) => {
    //   state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    //   state.mainNotes.push(payload);
    // },
    deleteNote: (state, { payload }) => {
      state.trashNotes = state.trashNotes.filter(({ id }) => id !== payload.id);
    },

    setPinnedNotes: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) =>
        note.id === payload.id ? { ...note, isPinned: !note.isPinned } : note,
      );
    },
    setEditNote: (state, { payload }) => {
      state.editNote = payload;
      // console.log(state.mainNotes);
    },
    readNote: (state, { payload }) => {
      const { type, id } = payload;

      const setRead = (notes) => {
        state[notes] = state[notes].map((note) =>
          note.id === id ? { ...note, isRead: !note.isRead } : note,
        );
      };

      if (type === 'archive') {
        setRead('archiveNotes');
      } else if (type === 'trash') {
        setRead('trashNotes');
      } else {
        setRead('mainNotes');
      }
    },
    removeTags: (state, { payload }) => {
      state.mainNotes = state.mainNotes.map((note) => ({
        ...note,
        tags: note.tags.filter(({ tag }) => tag !== payload.tag),
      }));
    },
    setNotes: (state, action) => {
      state.mainNotes = action.payload.map((obj) => {
        return {
          id: obj.id,
          content: obj.body,
          color: obj?.color ? obj?.color : 'fffff',
          title: obj.name,
          priority: obj.priority.toLowerCase(),
          isPinned: obj.pinned,
          isRead: obj?.isRead ? obj?.isRead : false,
          tags: obj?.noteTags ? obj?.noteTags : [],
          date: dayjs(obj.creationDate).format('YY/MM/DD/ h:mm A'),
          editedTime: obj.editDate,
          createdTime: new Date(action.payload.creationDate).getTime(),
        };
      });
      // state.mainNotes.id = action.payload.id;
      // state.mainNotes.content = action.payload.body;
      // state.mainNotes.color = action.payload?.color ? action.payload?.color : 'fffff';
      // state.mainNotes.title = action.payload.name;
      // state.mainNotes.priority = action.payload.priority.toLowerCase();
      // state.mainNotes.isPinned = action.payload.pinned;
      // state.mainNotes.isRead = action.payload?.isRead ? action.payload?.isRead : false;
      // state.mainNotes.tags = action.payload?.noteTags ? action.payload?.noteTags : [];
      // state.mainNotes.date = dayjs(action.payload.creationDate).format('YY/MM/DD/ h:mm A');
      // state.mainNotes.editedTime = action.payload.editDate;
      // state.mainNotes.createdTime = new Date(action.payload.creationDate).getTime();
    },
  },
});

export const {
  setMainNotes,
  setArchiveNotes,
  setTrashNotes,
  unarchiveNote,
  restoreNote,
  deleteNote,
  setPinnedNotes,
  setEditNote,
  readNote,
  removeTags,
  setNotes,
} = notesListSlice.actions;

export default notesListSlice.reducer;
