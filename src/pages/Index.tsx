import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread?: number;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
  chatId: number;
}

interface UserSettings {
  notifications: boolean;
  soundEnabled: boolean;
  messagePreview: boolean;
  onlineStatus: boolean;
  readReceipts: boolean;
  darkMode: boolean;
  autoDownload: boolean;
}

const initialMessages: Message[] = [
  { id: 1, chatId: 1, text: 'Привет! Как дела?', sender: 'them', time: '14:30' },
  { id: 2, chatId: 1, text: 'Отлично! А у тебя?', sender: 'me', time: '14:31' },
  { id: 3, chatId: 1, text: 'Тоже хорошо, работаю над новым проектом', sender: 'them', time: '14:32' },
  { id: 4, chatId: 2, text: 'Смотри что нашел', sender: 'them', time: '13:40' },
  { id: 5, chatId: 2, text: 'Отправил файлы', sender: 'them', time: '13:45' },
  { id: 6, chatId: 3, text: 'Встреча в 15:00', sender: 'them', time: '12:20' },
  { id: 7, chatId: 3, text: 'Все участники приглашены', sender: 'them', time: '12:22' },
  { id: 8, chatId: 4, text: 'Помоги с задачей', sender: 'them', time: 'Вчера' },
  { id: 9, chatId: 4, text: 'Спасибо за помощь!', sender: 'them', time: 'Вчера' },
];

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [showProfile, setShowProfile] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: 'Анна Смирнова', lastMessage: 'Тоже хорошо, работаю над новым проектом', time: '14:32', avatar: '', unread: 2 },
    { id: 2, name: 'Дмитрий Петров', lastMessage: 'Отправил файлы', time: '13:45', avatar: '' },
    { id: 3, name: 'Команда проекта', lastMessage: 'Все участники приглашены', time: '12:22', avatar: '', unread: 5 },
    { id: 4, name: 'Елена Кузнецова', lastMessage: 'Спасибо за помощь!', time: 'Вчера', avatar: '' },
  ]);

  const [currentUser, setCurrentUser] = useState({
    name: 'Иван Петров',
    status: 'В сети',
    avatar: '',
    email: 'ivan.petrov@example.com',
    phone: '+7 (999) 123-45-67',
    bio: 'Разработчик и любитель путешествий',
  });

  const [settings, setSettings] = useState<UserSettings>({
    notifications: true,
    soundEnabled: true,
    messagePreview: true,
    onlineStatus: true,
    readReceipts: true,
    darkMode: false,
    autoDownload: false,
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(currentUser);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage: Message = {
        id: messages.length + 1,
        chatId: selectedChat,
        text: message.trim(),
        sender: 'me',
        time: getCurrentTime(),
      };

      setMessages([...messages, newMessage]);

      setChats(
        chats.map((chat) =>
          chat.id === selectedChat
            ? { ...chat, lastMessage: message.trim(), time: getCurrentTime(), unread: 0 }
            : chat
        )
      );

      setMessage('');
    }
  };

  const handleSaveProfile = () => {
    setCurrentUser(editForm);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditForm(currentUser);
    setIsEditingProfile(false);
  };

  const toggleSetting = (key: keyof UserSettings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const currentChatMessages = messages.filter((msg) => msg.chatId === selectedChat);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <div className={`${showProfile ? 'w-96' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-white`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Профиль</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowProfile(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-2xl gradient-animated text-white">
                    {currentUser.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full gradient-animated text-white"
                >
                  <Icon name="Camera" size={14} />
                </Button>
              </div>

              {isEditingProfile ? (
                <div className="w-full space-y-3">
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Имя"
                  />
                  <Input
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="Email"
                  />
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Телефон"
                  />
                  <Input
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    placeholder="О себе"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} className="flex-1 gradient-animated text-white">
                      Сохранить
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-semibold text-lg mb-1">{currentUser.name}</h3>
                  <p className="text-sm text-green-500 mb-2">{currentUser.status}</p>
                  <p className="text-sm text-muted-foreground mb-1">{currentUser.email}</p>
                  <p className="text-sm text-muted-foreground mb-2">{currentUser.phone}</p>
                  <p className="text-sm text-center text-muted-foreground mb-4">{currentUser.bio}</p>
                  <Button
                    onClick={() => setIsEditingProfile(true)}
                    variant="outline"
                    className="w-full"
                  >
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-4">Уведомления</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Bell" size={18} className="text-muted-foreground" />
                      <Label htmlFor="notifications" className="cursor-pointer">Уведомления</Label>
                    </div>
                    <Switch
                      id="notifications"
                      checked={settings.notifications}
                      onCheckedChange={() => toggleSetting('notifications')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Volume2" size={18} className="text-muted-foreground" />
                      <Label htmlFor="sound" className="cursor-pointer">Звук</Label>
                    </div>
                    <Switch
                      id="sound"
                      checked={settings.soundEnabled}
                      onCheckedChange={() => toggleSetting('soundEnabled')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Eye" size={18} className="text-muted-foreground" />
                      <Label htmlFor="preview" className="cursor-pointer">Превью сообщений</Label>
                    </div>
                    <Switch
                      id="preview"
                      checked={settings.messagePreview}
                      onCheckedChange={() => toggleSetting('messagePreview')}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-4">Приватность</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="CircleDot" size={18} className="text-muted-foreground" />
                      <Label htmlFor="online" className="cursor-pointer">Показывать онлайн</Label>
                    </div>
                    <Switch
                      id="online"
                      checked={settings.onlineStatus}
                      onCheckedChange={() => toggleSetting('onlineStatus')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="CheckCheck" size={18} className="text-muted-foreground" />
                      <Label htmlFor="receipts" className="cursor-pointer">Отчеты о прочтении</Label>
                    </div>
                    <Switch
                      id="receipts"
                      checked={settings.readReceipts}
                      onCheckedChange={() => toggleSetting('readReceipts')}
                    />
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Shield" size={18} className="mr-2" />
                    Заблокированные пользователи
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-4">Оформление</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Moon" size={18} className="text-muted-foreground" />
                      <Label htmlFor="dark" className="cursor-pointer">Темная тема</Label>
                    </div>
                    <Switch
                      id="dark"
                      checked={settings.darkMode}
                      onCheckedChange={() => toggleSetting('darkMode')}
                    />
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Palette" size={18} className="mr-2" />
                    Цветовая схема
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-4">Данные и хранилище</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Download" size={18} className="text-muted-foreground" />
                      <Label htmlFor="download" className="cursor-pointer">Автозагрузка медиа</Label>
                    </div>
                    <Switch
                      id="download"
                      checked={settings.autoDownload}
                      onCheckedChange={() => toggleSetting('autoDownload')}
                    />
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Database" size={18} className="mr-2" />
                    Управление хранилищем
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-4">Дополнительно</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="HelpCircle" size={18} className="mr-2" />
                    Помощь и поддержка
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Info" size={18} className="mr-2" />
                    О приложении
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Выйти из аккаунта
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Чаты</h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setShowProfile(!showProfile)}>
                <Icon name="User" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Plus" size={20} />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск чатов..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {chats.map((chat) => (
              <Card
                key={chat.id}
                className={`mb-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedChat === chat.id ? 'border-[#9e16ff] shadow-md' : ''
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="gradient-animated text-white">
                        {chat.name.substring(0, 1)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{chat.time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full gradient-animated text-white">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={chats.find((c) => c.id === selectedChat)?.avatar} />
                  <AvatarFallback className="gradient-animated text-white">
                    {chats.find((c) => c.id === selectedChat)?.name.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{chats.find((c) => c.id === selectedChat)?.name}</h2>
                  <p className="text-xs text-green-500">В сети</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {currentChatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`p-3 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'gradient-animated text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="relative">
                <div className="gradient-animated rounded-full p-[2px]">
                  <div className="bg-white rounded-full flex items-center gap-2 px-4 py-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                      <Icon name="Image" size={20} />
                    </Button>
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Введите сообщение..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full hover:bg-gray-100"
                    >
                      <Icon name="Mic" size={20} />
                    </Button>
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="h-10 w-10 rounded-full gradient-animated text-white hover:opacity-90"
                    >
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-20" />
              <p>Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
