import React from 'react';
import { useState } from 'react';

//styles
import { ButtonOutline, Container, NotesContainer, EmptyMsgBox } from '../../styles/styles';
import { TopBox, Box, InputBox } from './AllNotes.styles';

//icons
import { BiSearch } from 'react-icons/bi';
import { FaSortAmountDown } from 'react-icons/fa';

//reddux
import { useDispatch, useSelector } from 'react-redux';
import { setUser, toggleFiltersModal } from '../../features';
import dayjs from 'dayjs';

//components
import { FiltersModal, NoteCard } from '../../components';

import { getAllNotes } from '../../utils';
import { useNavigate } from 'react-router-dom';
import NoteService from './../../service/NoteService';
import UserService from './../../service/UserService';
import TagService from '../../service/TagService';
import { setTags } from '../../features/tags/tagsSlice';
import { setNotes } from '../../features/notesList/notesListSlice';
import AuthService from './../../service/AuthService';

const AllNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mainNotes } = useSelector((state) => state.notesList);
  const { viewFiltersModal } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);
  const [filter, setFilter] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchUserInfo = async () => {
    const { data } = await UserService.getUserByEmail(localStorage.getItem('email'));

    dispatch(setUser(data));
    return;
  };
  const fetchNotes = async () => {
    const { data } = await NoteService.getUserNoteById(localStorage.getItem('id'));

    dispatch(setNotes(data));
  };
  const fetchTags = async () => {
    const { data } = await TagService.getNoteTagsByUserId(localStorage.getItem('id'));
    dispatch(setTags(data));
  };

  React.useEffect(() => {
    fetchUserInfo();
    fetchNotes();
    fetchTags();
    // NoteService.getUserNote();
  }, []);

  // handle all filters
  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  //clear.filters handler
  const clearHandler = () => {
    setFilter('');
  };

  const searchResult = () => {
    const searchedNotes = mainNotes.filter(({ title }) =>
      title.toLowerCase().includes(searchInput.toLowerCase()),
    );

    if (searchedNotes.length > 0) {
      return (
        <NotesContainer>
          {searchedNotes.map((note) => (
            <NoteCard key={note.id} note={note} type="notes" />
          ))}
        </NotesContainer>
      );
    } else {
      return <EmptyMsgBox>Ничего не найдено</EmptyMsgBox>;
    }
  };

  function getCookie(name) {
    var matches = document.cookie.match(
      new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const auth = getCookie('jwt');
  if (!auth) {
    return navigate('/authoriztion');
  }
  if (!localStorage.getItem('password') && !localStorage.getItem('email')) {
    return navigate('/authoriztion');
  } else {
    dispatch(setUser(fetchUserInfo()));
  }
  return (
    <Container>
      {/* filter modal */}
      {viewFiltersModal && (
        <FiltersModal handleFilter={filterHandler} handleClear={clearHandler} filter={filter} />
      )}
      {/* notes */}
      {mainNotes.length === 0 ? (
        <EmptyMsgBox>Нет заметок</EmptyMsgBox>
      ) : (
        <>
          <TopBox>
            <InputBox>
              <div className="notes__search-icon">
                <BiSearch />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Поиск заметок по названию... "
              />
            </InputBox>
            <div className="notes__filter-btn">
              <ButtonOutline
                onClick={() => dispatch(toggleFiltersModal(true))}
                className="nav__btn">
                <FaSortAmountDown /> <span>Фильтры</span>
              </ButtonOutline>
            </div>
          </TopBox>

          <Box>
            {searchInput !== '' ? searchResult() : getAllNotes(mainNotes, filter, searchInput)}
          </Box>
        </>
      )}
    </Container>
  );
};

export default AllNotes;
