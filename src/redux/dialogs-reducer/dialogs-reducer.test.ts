import { v1 as uuidv1 } from 'uuid'
import { UserMessage } from '../../types/types'
import dialogsReducer, { dialogsActions, DialogsReducerState } from './dialogs-reducer'

const state: DialogsReducerState = {
  userMessages: [
    [
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'Where does it come from? Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'accompanied by English versions from the 1914 translation by H. Rackham.',
        type: 'received',
      },
    ],
    [
      {
        id: uuidv1(),
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      { id: uuidv1(), text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
      {
        id: uuidv1(),
        text: 'It is a long established fact that a reader will be distracted by the readable content',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum is simply dummy text',
        type: 'sent',
      },
    ],
    [
      { id: uuidv1(), text: 'Where does it come from?', type: 'received' },
      {
        id: uuidv1(),
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        type: 'sent',
      },
      { id: uuidv1(), text: 'Lorem Ipsum', type: 'received' },
      { id: uuidv1(), text: 'Lorem Ipsum', type: 'sent' },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'sent',
      },
    ],
    [
      {
        id: uuidv1(),
        text: 'Lorem Ipsum used since the 1500s is reproduced below',
        type: 'received',
      },
      {
        id: uuidv1(),
        text: '"Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. ',
        type: 'sent',
      },
      {
        id: uuidv1(),
        text: 'Lorem Ipsum',
        type: 'received',
      },
      { id: uuidv1(), text: 'Lorem Ipsum is simply dummy text', type: 'sent' },
    ],
  ] as UserMessage[][],
  storedMessages: [],
}

it('should add message "Hello fellow human being, I am Mark Zuckerberg" to userMessages[0] array', () => {
  const action = dialogsActions.sendMessage(0, 'Hello fellow human being, I am Mark Zuckerberg')

  const newState = dialogsReducer(state, action)

  expect(newState.userMessages[0][3].text).toBe('Hello fellow human being, I am Mark Zuckerberg')
})

/*  it('should delete element with id 2 from userMessages[0] array', () => {
    const action = dialogsActions.deleteMessage(0, 2);

    const newState = dialogsReducer(state, action);

    expect(newState.userMessages[0].find((e) => e.id === 2)).toBe(undefined);
  });

  it('should edit element with id 2 from userMessages[0] array to be "Arigatou gozaimasu"', () => {
    const action = dialogsActions.editMessage(0, 2, 'Arigatou gozaimasu');

    const newState = dialogsReducer(state, action);

    expect(newState.userMessages[0].find((e) => e.id === 2).text).toBe('Arigatou gozaimasu');
  });*/
