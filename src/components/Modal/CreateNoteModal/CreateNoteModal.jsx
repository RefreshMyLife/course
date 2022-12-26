import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import dayjs from 'dayjs';

//styles
import { FixedContainer, DeleteBox } from '../Modal.styles';
import { Box, TopBox, StyledInput, AddedTagsBox, OptionsBox } from './CreateNoteModal.styles';
import { ButtonFill, ButtonOutline } from '../../../styles/styles';

//icons
import { FaTimes, FaPlus } from 'react-icons/fa';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTagsModal,
  toggleCreateNoteModal,
  setMainNotes,
  setEditNote,
} from '../../../features';

//components
import TextEditor from '../../TextEditor/TextEditor';
import TagsModal from '../TagsModal/TagsModal';
import NoteService from './../../../service/NoteService';

const CreateNoteModal = () => {
  const dispatch = useDispatch();

  const { viewAddTagsModal } = useSelector((state) => state.modal);
  const { tagsList } = useSelector((state) => state.tags);
  const { editNote } = useSelector((state) => state.notesList);
  const { user } = useSelector((state) => state.user);
  const [noteTitle, setNoteTitle] = useState(editNote?.title || '');
  const [value, setValue] = useState(editNote?.content || '');
  const [addedTags, setAddedTags] = useState(editNote?.tags || []);
  const [noteColor, setNoteColor] = useState(editNote?.color || '');
  const [priority, setPriority] = useState(editNote?.priority || 'low');

  //deleting tag from added tags when the tag is deleted from the main tags list
  useEffect(() => {
    setAddedTags((prev) => prev.filter(({ tag }) => tagsList.find((obj) => obj.tag === tag)));
  }, [tagsList]);

  //add tags to note
  const tagsHandler = (tag, type) => {
    const newTag = tag.toLowerCase();

    if (type === 'add') {
      setAddedTags((prev) => [...prev, { tag: newTag, id: v4() }]);
    } else {
      setAddedTags(addedTags.filter(({ tag }) => tag !== newTag));
    }
  };
  const addNode = async (note) => {
    await NoteService.addNoteById(note);
  };
  // create note
  const createNoteHandler = () => {
    if (!noteTitle) {
      toast.error('You must add title');
      return;
    } else if (value === '<p><br></p>') {
      toast.error('You must write note');
      return;
    }

    const date = dayjs().format('DD/MM/YY h:mm A');

    let note = {
      userId: user.id,
      title: noteTitle,
      content: value,
      tags: addedTags,
      color: noteColor,
      priority,
      editedTime: new Date().getTime(),
    };

    if (editNote) {
      note = { ...editNote, ...note };
    } else {
      note = {
        ...note,
        date,
        createdTime: new Date().getTime(),
        editedTime: null,
        isPinned: false,
        isRead: false,
        id: v4(),
      };
    }
    console.log(note);
    addNode(note);

    dispatch(setMainNotes(note));
    dispatch(toggleCreateNoteModal(false));
    dispatch(setEditNote(null));
  };

  return (
    <FixedContainer>
      {viewAddTagsModal && <TagsModal type="add" addedTags={addedTags} handleTags={tagsHandler} />}

      <Box>
        <TopBox>
          <div className="createNote__title">Create Note</div>
          <DeleteBox
            className="createNote__close-btn"
            onClick={() => dispatch(toggleCreateNoteModal(false))}>
            <FaTimes />
          </DeleteBox>
        </TopBox>

        <StyledInput
          type="text"
          value={noteTitle}
          name="title"
          placeholder="Название..."
          onChange={(e) => setNoteTitle(e.target.value)}
        />

        <div>
          <TextEditor value={value} setValue={setValue} color={noteColor} />
        </div>

        <AddedTagsBox>
          {addedTags.map(({ tag, id }) => (
            <div key={id}>
              <span className="createNote__tag">{tag}</span>
              <span onClick={() => tagsHandler(tag, 'remove')} className="createNote__tag-remove">
                <FaTimes />
              </span>
            </div>
          ))}
        </AddedTagsBox>

        <OptionsBox>
          <ButtonOutline onClick={() => dispatch(toggleTagsModal({ type: 'add', view: true }))}>
            Add Tag
          </ButtonOutline>
          <div>
            <label htmlFor="color">Цвет заметки : </label>
            <select value={noteColor} id="color" onChange={(e) => setNoteColor(e.target.value)}>
              <option value="">Белый</option>
              <option value="#ffcccc">Красный</option>
              <option value="#ccffcc">Зелёный</option>
              <option value="#cce0ff">Синий</option>
              <option value="#ffffcc">Жёлтый</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Приоретет : </label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)} id="priority">
              <option value="low">Высокий</option>
              <option value="high">Низкий</option>
            </select>
          </div>
        </OptionsBox>

        <div className="createNote__create-btn">
          <ButtonFill onClick={createNoteHandler}>
            {editNote ? (
              <span>Сохранить</span>
            ) : (
              <>
                <FaPlus /> <span>Создать</span>
              </>
            )}
          </ButtonFill>
        </div>
      </Box>
    </FixedContainer>
  );
};

export default CreateNoteModal;
