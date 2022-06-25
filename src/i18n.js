import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  ru: {
    translation: {
      signUpForm: {
        title: 'Регистрация',
        userName: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        signUpButton: 'Зарегистрироваться',
        notifications: {
          success: 'Регистрация прошла успешно!',
          error: 'Что-то пошло не так. Попробуйте снова или обратитесь в поддержку',
        },
        errors: {
          userName: {
            placeholder: 'Введите имя',
            required: 'Необходимо заполнить поле',
            minLength: 'От 3 до 20 символов',
            maxLength: 'Не более 20 символов',
            userExist: 'Пользователь с таким именем уже существует',
          },
          password: {
            placeholder: 'Пароль',
            required: 'Необходимо заполнить поле',
            minLength: 'Не менее 6 символов',
            maxLength: 'Не более 16 символов',
            passwordIsNotSame: 'Пароли должны совпадать',
          },
        },
      },
      loginForm: {
        title: 'Авторизация',
        userName: 'Ваш ник',
        password: 'Пароль',
        loginButton: 'Войти',
        notifications: {
          success: 'Авторизация прошла успешно!',
          error: 'Что-то пошло не так. Попробуйте снова или обратитесь в поддержку',
        },
        errors: {
          userName: {
            placeholder: 'Введите имя',
            required: 'Необходимо заполнить поле',
            minLength: 'От 3 до 20 символов',
            maxLength: 'Не более 20 символов',
            userNotExist: 'Неверные имя пользователя или пароль',
          },
          password: {
            placeholder: 'Пароль',
            required: 'Необходимо заполнить поле',
            minLength: 'Не менее 6 символов',
            maxLength: 'Не более 16 символов',
          },
        },
      },
      home: {
        title: 'Добро пожаловать в Hexlet Chat',
      },
      chatBody: {
        noMessages: 'Нет сообщений',
        sendMessageButton: {
          title: 'Отправить',
          placeholder: 'Начните набирать сообщение',
        },
      },
      chatSidebar: {
        title: 'Каналы',
        removeChannelButton: 'Удалить',
        renameChannelButton: 'Переименовать',
      },
      header: {
        logo: 'Hexlet Chat',
        home: 'Главная',
        chat: 'Чат',
        loginButton: 'Вход',
        logoutButton: 'Выход',
      },
      modals: {
        addChannelModal: {
          title: 'Добавить канал',
          channelName: 'Название канала',
          saveButton: 'Сохранить',
          closeButton: 'Закрыть',
          errors: {
            placeholder: 'Введите название канала',
          },
        },
        renameChannelModal: {
          title: 'Переименовать канал',
          channelName: 'Название канала',
          saveButton: 'Сохранить',
          closeButton: 'Закрыть',
          errors: {
            placeholder: 'Введите название канала',
          },
        },
        removeChannelModal: {
          title: 'Удаление канала',
          subTitle1: 'Вы уверены?',
          subTitle2: 'Вы не сможете восстановить канал после удаления',
          saveButton: 'Удалить',
          closeButton: 'Отменить',
        },
        errors: {
          required: 'Необходимо заполнить поле',
          minLength: 'Не менее 2-х символов',
          maxLength: 'Не более 20 символов',
          channelExist: 'Канал с таким названием уже существует',
        },
      },
    },
  },
  en: {
    translation: {
      signUpForm: {
        title: 'Sign up',
        userName: 'User name',
        password: 'Password',
        confirmPassword: 'Confirm password',
        signUpButton: 'Sign up',
        notifications: {
          success: 'Sign up successful!',
          error: 'Something went wrong. Try again or contact the support',
        },
        errors: {
          userName: {
            placeholder: 'Enter your name',
            required: 'Name is required',
            minLength: 'Must be at least 3 characters',
            maxLength: 'Must be 20 characters or less',
            userExist: 'User name already exists. Please choose different name',
          },
          password: {
            placeholder: 'Password',
            required: 'Password is required',
            minLength: 'Must be at least 6 characters',
            maxLength: 'Must be 16 characters or less',
            passwordIsNotSame: 'The password is not the same',
          },
        },
      },
      loginForm: {
        title: 'Log in',
        userName: 'User name',
        password: 'Password',
        signUpButton: 'Log in',
        notifications: {
          success: 'Log in successful!',
          error: 'Something went wrong. Try again or contact the support',
        },
        errors: {
          userName: {
            placeholder: 'Enter your name',
            required: 'Name is required',
            minLength: 'Must be at least 3 characters',
            maxLength: 'Must be 20 characters or less',
            userExist: 'User name already exists. Please choose different name',
          },
          password: {
            placeholder: 'Password',
            required: 'Password is required',
            minLength: 'Must be at least 6 characters',
            maxLength: 'Must be 16 characters or less',
            passwordIsNotSame: 'The password is not the same',
          },
        },
      },
      home: {
        title: 'Welcome to React Chat',
      },
      chatBody: {
        noMessages: 'No messages',
        sendMessageButton: {
          title: 'Send',
          placeholder: 'Type a message',
        },
      },
      chatSidebar: {
        title: 'Channels',
        removeChannelButton: 'Remove',
        renameChannelButton: 'Rename',
      },
      header: {
        logo: 'React Chat',
        home: 'Home',
        chat: 'Chat',
        loginButton: 'Log in',
        logoutButton: 'Log out',
      },
      modals: {
        addChannelModal: {
          title: 'Add a channel',
          channelName: 'Channel name',
          saveButton: 'Save',
          closeButton: 'Close',
          errors: {
            placeholder: 'Type a channel name',
          },
        },
        renameChannelModal: {
          title: 'Rename the channel',
          channelName: 'Channel name',
          saveButton: 'Save',
          closeButton: 'Close',
          errors: {
            placeholder: 'Type a channel name',
          },
        },
        removeChannelModal: {
          title: 'Remove the channel',
          subTitle1: 'Are you sure?',
          subTitle2: 'You cannot restore the channel after removing',
          saveButton: 'Save',
          closeButton: 'Cancel',
        },
        errors: {
          required: 'Channel name is required',
          minLength: 'Must be at least 2 characters',
          maxLength: 'Must be 20 characters or less',
          channelExist: 'The channel with the same name already exists',
        },
      },
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
