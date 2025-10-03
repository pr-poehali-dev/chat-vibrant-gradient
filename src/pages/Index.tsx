import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
}

const Index = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [showProfile, setShowProfile] = useState(false);
  const [message, setMessage] = useState('');

  const chats: Chat[] = [
    { id: 1, name: 'Анна Смирнова', lastMessage: 'Привет! Как дела?', time: '14:32', avatar: '', unread: 2 },
    { id: 2, name: 'Дмитрий Петров', lastMessage: 'Отправил файлы', time: '13:45', avatar: '' },
    { id: 3, name: 'Команда проекта', lastMessage: 'Встреча в 15:00', time: '12:20', avatar: '', unread: 5 },
    { id: 4, name: 'Елена Кузнецова', lastMessage: 'Спасибо за помощь!', time: 'Вчера', avatar: '' },
  ];

  const messages: Message[] = [
    { id: 1, text: 'Привет! Как дела?', sender: 'them', time: '14:30' },
    { id: 2, text: 'Отлично! А у тебя?', sender: 'me', time: '14:31' },
    { id: 3, text: 'Тоже хорошо, работаю над новым проектом', sender: 'them', time: '14:32' },
  ];

  const currentUser = {
    name: 'Вы',
    status: 'В сети',
    avatar: '',
    email: 'user@example.com',
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Отправка сообщения:', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <div className={`${showProfile ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r bg-white`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Профиль</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowProfile(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-2xl gradient-animated text-white">
                  {currentUser.name.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1">{currentUser.name}</h3>
              <p className="text-sm text-green-500 mb-2">{currentUser.status}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-muted-foreground">Настройки</h4>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Bell" size={18} className="mr-2" />
                Уведомления
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Lock" size={18} className="mr-2" />
                Приватность
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Icon name="Palette" size={18} className="mr-2" />
                Тема
              </Button>
            </div>
          </div>
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
                {messages.map((msg) => (
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
