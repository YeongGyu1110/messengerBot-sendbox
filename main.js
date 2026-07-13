const fs = FileStream;
const bot = BotManager.getCurrentBot();

const saveDataPath = `${fs.getSdcardPath()}/fileStream/${bot.getName()}/`;
const userDataFileName = `userData.json`;

class User {
  constructor(name, hash) {
    this.name = name;
    this.hash = hash;
  }

  saveUserData() {
    DATA.save(`${saveDataPath}${userDataFileName}`, this);
  }
}

const DATA = {};
DATA.read = function (path, isJSON = false) {
  if (fs.isFile(path)) {    
    if (isJSON) return fs.readJSON(path);
    return JSON.parse(fs.read(path));
  }
  return null;
};
DATA.save = function (path, data, append = false) {
  fs.save(path, data, append);
}


const userData = (() => {
  // 만약 해당 경로에 파일이 있다
  if (fs.isFile(`${saveDataPath}${userDataFileName}`)) {
    // 읽어서 userData에 집어넣기
    return DATA.read(`${saveDataPath}${userDataFileName}`, true);
  }
  // 파일이 없다면 빈 객체 반환
  return {};
});


/**
 * (string) msg.content: 메시지의 내용
 * (string) msg.room: 메시지를 받은 방 이름
 * (User) msg.author: 메시지 전송자
 * (string) msg.author.name: 메시지 전송자 이름
 * (Image) msg.author.avatar: 메시지 전송자 프로필 사진
 * (string) msg.author.avatar.getBase64()
 * (string | null) msg.author.hash: 사용자의 고유 id
 * (boolean) msg.isGroupChat: 단체/오픈채팅 여부
 * (boolean) msg.isDebugRoom: 디버그룸에서 받은 메시지일 시 true
 * (string) msg.packageName: 메시지를 받은 메신저의 패키지명
 * (void) msg.reply(string): 답장하기
 * (boolean) msg.isMention: 메세지 맨션 포함 여부
 * (bigint) msg.logId: 각 메세지의 고유 id
 * (bigint) msg.channelId: 각 방의 고유 id
 */
bot.addListener(Event.MESSAGE, (message) => {
  const msg = message.content.trim().toLowerCase();

  let user = userData[message.author.hash];

  if (msg === "!hi") message.reply("Hello, World!");
  if (msg === "!create") {
    if (!user) {
      user = new User(message.author.name, message.author.hash);
      user.saveUserData();
      message.reply("사용자 객체 생성됨!");
    } else {
      message.reply("이미 사용자 객체가 존재합니다.");
    }
  }
});