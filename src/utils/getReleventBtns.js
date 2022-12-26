import { NotesIconBox } from '../styles/styles';

//icons
import { FaTrash, FaArchive, FaTrashRestore, FaEdit } from 'react-icons/fa';
import { RiInboxUnarchiveFill } from 'react-icons/ri';

//redux
import {
  setArchiveNotes,
  setTrashNotes,
  unarchiveNote,
  restoreNote,
  deleteNote,
  setEditNote,
  toggleCreateNoteModal,
} from '../features';

const getReleventBtns = (type, note, dispatch) => {
  const clickHandler = () => {
    dispatch(setEditNote(note));
    dispatch(toggleCreateNoteModal(true));
  };

  if (type === 'trash') {
    return (
      <>
        <NotesIconBox onClick={() => dispatch(restoreNote(note))} data-info="Restore">
          <FaTrashRestore />
        </NotesIconBox>
        <NotesIconBox onClick={() => dispatch(deleteNote(note))} data-info="Delete">
          <FaTrash />
        </NotesIconBox>
      </>
    );
  } else {
    return (
      <>
        <NotesIconBox data-info="Edit">
          <FaEdit style={{ fontSize: '1rem' }} onClick={clickHandler} />
        </NotesIconBox>

        <NotesIconBox onClick={() => dispatch(setTrashNotes(note))} data-info="Delete">
          <FaTrash />
        </NotesIconBox>
      </>
    );
  }
};

export default getReleventBtns;
