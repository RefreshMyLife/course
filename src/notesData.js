import { v4 } from 'uuid';

const notes = [
  {
    title: 'Ебать в жопу',
    content:
      'Ебать в жопу это удел не многих, так же не каждый захочет ебать в жопу или быть выебанным в жопу. Ебля в жопу происходит с времён Древней Греции, чем больше было очко у грека тем больше можно было там спрятать свои сбережения. Известны случаи когда ебля в жопу помогала разработать анальное отверстие на столько большое, что жопу такого таварища использовали как банк. .',
    tags: [{ tag: 'истории', id: v4() }],
    color: '#cce0ff',
    priority: 'high',
    isPinned: true,
    isRead: false,
    date: '10/12/22 2.55 PM',
    createdTime: new Date('Sat Dec 10 2022 14:55:22').getTime(),
    editedTime: null,
    id: v4(),
  },
  {
    title: 'Elon Musk Quote',
    content: ' I think it is possible for ordinary people to choose to be extraordinary.',
    tags: [{ tag: 'зызнь', id: v4() }],
    color: '#ffcccc',
    priority: 'high',
    isPinned: true,
    isRead: false,
    date: '10/12/22 3.02 PM',
    createdTime: new Date('Sat Dec 10 2022 15:02:22').getTime(),
    editedTime: null,
    id: v4(),
  },
];

export default notes;
