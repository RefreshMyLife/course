//styles
import { Container, MainBox, StyledLogo, ItemsBox, User } from './Sidebar.styles';

//logo img
import images from '../../assets';

//icons
import { FaTrash, FaArchive, FaLightbulb, FaTag, FaHouseUser } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, toggleTagsModal } from '../../features';

//others
import { v4 } from 'uuid';
import { NavLink, useLocation } from 'react-router-dom';
import useOutsideClick from '../../custom-hooks/outsideClickHook';
import { getStandardName } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.menu);
  const { tagsList } = useSelector((state) => state.tags);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  //getting path
  const location = useLocation();
  const { pathname } = location;

  //custom hook for closing menu
  const nodeRef = useOutsideClick(() => dispatch(toggleMenu(false)));

  //not displaying sidebar in the following paths
  if (
    pathname === '/' ||
    pathname === '/404' ||
    pathname === '/authoriztion' ||
    pathname === '/registration'
  ) {
    return;
  }
  const handleLogoutBtn = () => {
    delete localStorage.email;
    delete localStorage.id;

    navigate('/');
  };
  return (
    <Container openMenu={isOpen && 'open'}>
      <MainBox openMenu={isOpen && 'open'} ref={nodeRef}>
        <StyledLogo>
          <button onClick={() => handleLogoutBtn()}> Выйти </button>
          <User>
            {user?.name ? user.name : 'User name'}
            <br />
            {user?.userRole?.roleName ? user.userRole.roleName : 'User Role'}
          </User>
        </StyledLogo>

        <ItemsBox>
          {/* admin item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/users`}
              state={`notes`}
              className={({ isActive }) => (isActive ? 'active-item' : 'inactive-item')}>
              <span>
                <FaHouseUser />
              </span>
              <span>Админ панель</span>
            </NavLink>
          </li>
          {/* note item */}
          <li onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/notes`}
              state={`notes`}
              className={({ isActive }) => (isActive ? 'active-item' : 'inactive-item')}>
              <span>
                <FaLightbulb />
              </span>
              <span>Заметки</span>
            </NavLink>
          </li>

          {/*tags item */}

          {tagsList?.map(({ tag, id }) => (
            <li key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) => (isActive ? 'active-item' : 'inactive-item')}>
                <span>
                  <FaTag />
                </span>
                <span>{getStandardName(tag)}</span>
              </NavLink>
            </li>
          ))}

          {/* edit tag item */}

          <li
            className="sidebar__edit-item"
            onClick={() => dispatch(toggleTagsModal({ type: 'edit', view: true }))}>
            <span>
              <MdEdit />
            </span>
            <span>Редактировать заметки</span>
          </li>

          {/* other items */}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
