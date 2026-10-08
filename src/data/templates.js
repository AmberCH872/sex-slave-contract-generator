// Shared Contract Templates
export const templates = [
  {
    id: 'basic-ds',
    name: '基本主奴契约',
    subtitle: '权威与臣服',
    icon: '👑',
    description: '经典的主奴权力交换协议，明确支配与臣服的权利与义务界限',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Dominant)', type: 'text', required: true, placeholder: '请输入主人的全名或称谓' },
          { label: '奴隶/臣服者姓名 (Submissive/Slave)', type: 'text', required: true, placeholder: '请输入您的全名或契约名' },
          { label: '契约生效日期', type: 'date', required: true },
          { label: '有效期限', type: 'select', options: ['永久', '1 年', '2 年', '3 年', '特约期限'], default: '永久' }
        ]
      },
      {
        title: '权力交换条款',
        fields: [
          { 
            label: '权力移交声明', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述权力移交的范围与原则...',
            value: '乙方（臣服方）自愿将人身支配权、起居安排权及专属特权完全移交给甲方（支配方）。乙方承诺视甲方的意志为唯一准则，在安全、知情与同意的前提下无条件服从指令。'
          },
          { 
            label: '服从义务', 
            type: 'textarea', 
            required: true, 
            placeholder: '列出臣服方需要履行的具体服从礼仪与规则...',
            value: '臣服方在主人面前须保持顺从仪态；未经允许不得直视主人的眼睛；每日向主人请安问好；在接受训导时保持谦卑姿态，恭敬聆听并完整执行指令。'
          },
          { 
            label: '特权保留', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明主人拥有的特权及双方的安全界限...',
            value: '甲方拥有对乙方行为、日程、穿着及习惯的绝对指导与评定权。甲方保留施加惩罚与奖赏的裁量特权，同时承诺尊重约定的安全词与绝对界限（Hard Limits）。'
          }
        ]
      },
      {
        title: '日常礼仪与规矩',
        fields: [
          { 
            label: '晨间仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述每日开始的仪式...',
            value: '清晨醒来第一件事须向主人致以晨礼，清晰汇报当日状态及日程安排，等待主人指示并以敬语确认。'
          },
          { 
            label: '晚间汇报', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述每日结束时的总结...',
            value: '睡前须向主人复盘当日表现，坦诚汇报不足并请求主人点评，在获得主人首肯后方可就寝。'
          },
          { 
            label: '日常沟通规则', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定双方的沟通方式与言辞...',
            value: '沟通时必须使用约定尊称（如“主人”、“Master”），语调谦逊端庄。严禁顶撞或欺瞒，任何疑问均须以恭敬方式请示。'
          }
        ]
      },
      {
        title: '惩罚与奖励机制',
        fields: [
          { 
            label: '惩罚方式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述违规时的惩罚机制...',
            value: '凡违规或执行不力，须即刻认错并接受相应训诫；惩罚方式包括但不限于面壁思过、抄写规训、剥夺特权、体罚调教，直至主人认可其反省诚意。'
          },
          { 
            label: '奖励机制', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述表现优异时的奖励机制...',
            value: '若持续表现忠诚顺从，主人将视情赐予奖赏，包括温存抚慰、赐予心仪物品、解锁特定自由特权或特别嘉许。'
          }
        ]
      },
      {
        title: '安全与终止条款',
        fields: [
          { 
            label: '安全词与底线 (SSC / RACK)', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定紧急安全词与生理心理底线...',
            value: '通用安全词红（Red / 立即停止）、黄（Yellow / 放缓观察）、绿（Green / 状态良好）。一旦启用红色安全词，所有训调立即终止，无条件优先保障身心健康。'
          },
          { 
            label: '协议解除条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明契约的解除程序与过渡安排...',
            value: '双方任何一方均有权在理性冷静状态下提出协议解除。协议解除需安排为期两周的过渡缓冲期，在此期间进行充分沟通与情感善后，互相归还象征性信物。'
          }
        ]
      }
    ]
  },
  {
    id: 'pet-play',
    name: '宠玩协议 (Pet Play)',
    subtitle: '萌宠与饲主',
    icon: '🐕',
    description: '宠物与饲主动态专属协议，营造沉浸式心智退行与依恋陪伴',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '饲主姓名 (Owner)', type: 'text', required: true, placeholder: '请输入饲主的全名或称谓' },
          { label: '宠物姓名 (Pet/Puppy/Kitten)', type: 'text', required: true, placeholder: '请输入宠物的专属爱称' },
          { label: '宠物物种设定', type: 'select', options: ['小狗系 (Pup)', '小猫系 (Kitten)', '小兔系 (Bunny)', '狐狸系 (Fox)', '其他定制物种'], default: '小狗系 (Pup)' },
          { label: '契约日期', type: 'date', required: true }
        ]
      },
      {
        title: '宠物空间与装备',
        fields: [
          { 
            label: '专属领地与环境', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述宠物的领地范围...',
            value: '宠物拥有专属的软垫、狗窝或活动地毯；未经饲主召唤不得擅自跳上主人的床铺或工作台，在指定领地内放松玩耍。'
          },
          { 
            label: '装备穿戴规则', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定项圈、牵引绳、尾巴、兽耳等佩戴要求...',
            value: '宠物在进入游戏状态时必须佩戴专属项圈与铭牌，由主人亲自系上牵引绳；根据场景佩戴耳朵、尾巴与爪垫，项圈象征归属与庇护。'
          },
          { 
            label: '姿态与叫声规范', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定行走姿势与表达方式...',
            value: '进入宠物心境后，以爬行或依偎姿态移动；以轻蹭、撒娇、特定叫声或身体语言表达情绪与需求，暂时放下人类社会的复杂烦扰。'
          }
        ]
      },
      {
        title: '喂食与日常护理',
        fields: [
          { 
            label: '喂食仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述喂食时的规矩与互动...',
            value: '进食由主人亲手投喂或使用宠物专属食盆；在得到主人“可以享用”的口令前保持端坐等待；用感激与欢欣的姿态进食。'
          },
          { 
            label: '梳理与洗护', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定梳毛、擦洗与护理流程...',
            value: '主人定期为宠物梳理毛发、清洁身体、修剪指甲；宠物须安静享受护理过程，不得抗拒或抓咬。'
          }
        ]
      },
      {
        title: '训练与玩耍互动',
        fields: [
          { 
            label: '基础服从训练', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述接抛物、握手、定住等服从指令...',
            value: '主人教授基础口令（坐下、握爪、趴下、捡球、静止）；宠物积极完成训练并换取抚摸、零食或玩具奖励。'
          },
          { 
            label: '安抚与拥抱协议', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述情绪低落时的安抚机制...',
            value: '在宠物感到疲惫或焦虑时，主人应给予充足的拥抱、下颌抚摸与轻声呢喃，提供绝对的安全感与温情包裹。'
          }
        ]
      },
      {
        title: '脱离角色与解除',
        fields: [
          { 
            label: '心智回归仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述从宠物回归常态人际状态的流程...',
            value: '解开项圈即代表宠物状态暂停；主人需倒一杯温水，协助宠物逐步脱离角色心境，进行温暖的后戏交谈（Aftercare）。'
          },
          { 
            label: '契约终止约定', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明终结协议的约定...',
            value: '任何一方提出终止协议时，均须和平交还项圈与铭牌，互相感谢彼此在陪伴期间给予的温存与治愈。'
          }
        ]
      }
    ]
  },
  {
    id: 'tpe',
    name: '24/7 全权交换协议 (TPE)',
    subtitle: '完全支配与托管',
    icon: '⚡',
    description: '全天候、深层次权力完全转移契约，涵盖生活、身心与决策托管',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '支配方全名 (Master / Dominant)', type: 'text', required: true, placeholder: '请输入支配方的全名' },
          { label: '臣服方全名 (Slave / Submissive)', type: 'text', required: true, placeholder: '请输入臣服方的全名' },
          { label: '契约正式生效日期', type: 'date', required: true },
          { label: '契约期限与回顾期', type: 'select', options: ['半年回顾期', '1 年 (期满评估)', '长期有效 (随时双向审查)'], default: '1 年 (期满评估)' }
        ]
      },
      {
        title: '全面权力让渡范畴',
        fields: [
          { 
            label: '日常生活与作息决策', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述睡眠、起居、饮食等日常托管规则...',
            value: '臣服方将日常起居时刻表、作息规范、饮食营养摄入完全交由支配方统筹；支配方有责任保障臣服方的身体充沛精力与健康。'
          },
          { 
            label: '个人形象与服饰规范', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述着装风格、发型、饰品要求...',
            value: '臣服方每日穿着、发型修剪及私人饰品须符合支配方的品味与要求；无论公开场合还是私密时刻，均展现符合支配方期许的良好风貌。'
          },
          { 
            label: '财务透明与开销指导', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定预算管理与支出报备...',
            value: '臣服方向支配方完全公开个人收支台账；重大消费支出须征得支配方事前审批，接受支配方对理财与消费习惯的督导。'
          }
        ]
      },
      {
        title: '24小时联络与常态服从',
        fields: [
          { 
            label: '行踪报备与联络机制', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定外出报备、打卡、定位及消息回复时限...',
            value: '外出活动、跨城出差均须提前汇报行程与同行人员；支配方发出讯息须在约定时间内及时回应，保持联络畅通。'
          },
          { 
            label: '思维顺服与自省准则', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述面对分歧时的自省与沟通机制...',
            value: '遇到观念分歧时，臣服方先行反思自身成见；可以提出善意疑问，但最终执行必须坚决迅速，不带怨言或消极情绪。'
          }
        ]
      },
      {
        title: '训诫准则与忠诚考评',
        fields: [
          { 
            label: '考核与违规纠偏', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述定期考评机制与纠偏手段...',
            value: '设立周检与月评机制。针对怠惰、隐瞒或违纪行为，支配方将施加结构化训诫，直至行为回归严谨标准。'
          },
          { 
            label: '忠诚勋赏与精神馈赠', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述表现优异时的肯定与奖赏...',
            value: '长期忠诚坚守者将获得支配方的深刻信任、专属信物赠予以及精神与情感上的终极归宿感。'
          }
        ]
      },
      {
        title: '健康防线与平稳解除',
        fields: [
          { 
            label: '生理与心理安全硬性底线', 
            type: 'textarea', 
            required: true, 
            placeholder: '明确工作、法定权益、健康等绝对不可逾越的边界...',
            value: '本协议绝不影响臣服方的法定公民权利、职业生涯发展及人身健康安全；当涉及重大家庭或医疗变故时，权力让渡机制自动让位于现实福祉。'
          },
          { 
            label: '退出机制与冷静期约定', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定协议撤销时的缓冲流程...',
            value: '设立30天冷静解脱期。任何一方宣布退出后，平稳移交日常决策权，进行专业心理梳理，确保双方平稳着陆。'
          }
        ]
      }
    ]
  },
  {
    id: 'gorean-slave',
    name: '哥罗奴隶契约 (Gorean)',
    subtitle: '古典荣誉与枷锁',
    icon: '📜',
    description: '源于哥罗传奇文化的古典式主奴协议，强调等级森严与天然归属',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人名讳 (Master)', type: 'text', required: true, placeholder: '请输入支配主人的尊名' },
          { label: '卡吉拉/奴隶名 (Kajira / Slave)', type: 'text', required: true, placeholder: '请输入奴隶的烙印名或爱称' },
          { label: '身份属性', type: 'select', options: ['家庭女奴 (House Kajira)', '愉悦女奴 (Pleasure Slave)', '工作男奴', '完全归属奴'], default: '家庭女奴 (House Kajira)' },
          { label: '契约盟誓日期', type: 'date', required: true }
        ]
      },
      {
        title: '哥罗法统与天然秩序',
        fields: [
          { 
            label: '天然支配与臣服誓约', 
            type: 'textarea', 
            required: true, 
            placeholder: '宣示承认哥罗自然秩序与无条件归属...',
            value: '我在此宣告：自然法则决定了主人的至高无上与我的甘心臣服。我自愿卸下自由民的虚妄伪装，戴上坚贞的锁链，成为主人脚下温顺的财产。'
          },
          { 
            label: '跪姿与仪态规范', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定卡吉拉式五种基础跪姿及礼节...',
            value: '在主人面前须熟练展示自由民之跪、愉悦之跪、服侍之跪；双手交叉叠于腹前或平伏地面，目光低垂，以优美身段展现奴之顺从。'
          }
        ]
      },
      {
        title: '侍奉技能与服从规范',
        fields: [
          { 
            label: '侍茶、备膳与斟酒礼仪', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定为主人奉茶送水的严苛礼法...',
            value: '奉上饮品与佳肴时须双膝跪进，托盘高于额前；轻声报菜，伺候主人品尝，并在主人示意后方可退回角落待命。'
          },
          { 
            label: '身心愉悦与柔顺侍奉', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定满足主人精神与感官愉悦的义务...',
            value: '我的存在即为让主人疲惫的心灵获得安宁与欢愉；以温柔的声音、体贴的按摩与无微不至的照拂，成为主人最得力的解忧者。'
          }
        ]
      },
      {
        title: '烙印信物与赏罚法度',
        fields: [
          { 
            label: '项圈、锁链与象征信物', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述金属项圈或特定印记的象征意义...',
            value: '沉重的钢制或皮质项圈是主人所有权的象征，未经主人允许永不可自行摘除；铭牌刻有主人的尊印，时刻警醒奴隶谨守本分。'
          },
          { 
            label: '哥罗鞭笞与严苛戒条', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定犯错受惩的仪式与规矩...',
            value: '凡犯失察、怠慢或不敬之过，须自行呈上戒尺或软鞭，跪伏受罚并高呼“感谢主人教诲”；受训完毕后亲吻主人手背以示感恩。'
          }
        ]
      },
      {
        title: '盟誓终局与赎身条款',
        fields: [
          { 
            label: '自由的赐予或放逐', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定主人赐予自由或解除契约的前提...',
            value: '在哥罗传统中，唯有主人方有权宽宥并取下项圈。若因特殊因缘解除关系，主人将举行解链仪式，正式宣布放归自由。'
          }
        ]
      }
    ]
  },
  {
    id: 'femdom',
    name: '女上位调教协议 (Femdom)',
    subtitle: '女王与忠仆',
    icon: '💅',
    description: '女性主导（FLR/女王权杖）协议，崇敬女性至高权威与细腻掌控',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '女王 / 女主人姓名 (Queen / Mistress)', type: 'text', required: true, placeholder: '请输入女主人的尊名或称谓' },
          { label: '忠仆 / 臣服者姓名 (Devoted Servant)', type: 'text', required: true, placeholder: '请输入臣服者的全名' },
          { label: '关系模式', type: 'select', options: ['日常女性主导 (FLR)', '女王与专属仆从', '严厉女管教', '崇拜与调伏'], default: '女王与专属仆从' },
          { label: '签署生效日', type: 'date', required: true }
        ]
      },
      {
        title: '女性崇拜与权威确立',
        fields: [
          { 
            label: '女王至高权威宣言', 
            type: 'textarea', 
            required: true, 
            placeholder: '确认女性在关系中拥有最高决策权与最终否决权...',
            value: '臣服方由衷敬仰女主人的智慧、气度与威仪，自愿放弃家庭及亲密关系中的平等争论权，视女主人的喜怒为行事指针，矢志不渝效忠侍奉。'
          },
          { 
            label: '足部崇拜与敬拜礼仪', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定吻手礼、脱鞋跪拜、足部护理等仪式...',
            value: '女主人归家时，仆人须跪迎门前，接下外套并恭敬为其褪去鞋袜；定期为主人修剪趾甲、足底精油按摩，以虔敬之心赞颂主人优雅玉足。'
          }
        ]
      },
      {
        title: '生活执事与劳务侍奉',
        fields: [
          { 
            label: '家务承包与品质把控', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定各项家庭劳务的承担标准...',
            value: '所有繁重家务（采买、烹饪、洗护、除尘）均由仆人一丝不苟完成；出品须达到女主人满意的严苛标准，让女主人享受优雅无忧的生活。'
          },
          { 
            label: '情绪抚慰与贴心侍候', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定在女主人疲倦或烦躁时的安抚职责...',
            value: '敏锐察觉女主人的情绪波动，不急不躁、轻声抚慰；按女主人心意泡制花茶、准备香薰浴，甘做女王最可靠的情绪容器。'
          }
        ]
      },
      {
        title: '欲望管控与惩戒权杖',
        fields: [
          { 
            label: '欲望节制与恩赐授权 (Chastity / Denial)', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定臣服方欲望释放的受控准则...',
            value: '臣服方的身体愉悦完全受制于女主人的恩准；未经首肯严禁私自宣泄欲望；将一切能量转化为对女主人的忠诚侍奉。'
          },
          { 
            label: '女王惩戒与训诫法度', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定违规时的体罚与罚跪惩诫...',
            value: '仆人若有轻慢、怠惰或谎言，女主人有权施以掌掴、戒尺打手、长时间罚跪立规矩或剥夺娱乐特权，仆人须心悦诚服领受教训。'
          }
        ]
      },
      {
        title: '安全界限与女王仁慈',
        fields: [
          { 
            label: '保护与自愿原则', 
            type: 'textarea', 
            required: true, 
            placeholder: '女主人对仆人的关怀与安全承诺...',
            value: '女王威严但绝非残酷，承诺保障仆人的身体健康与社会尊严；尊重约定的心理与生理安全词，在严厉管教后给予温柔抚慰。'
          }
        ]
      }
    ]
  },
  {
    id: 'pet-play-2',
    name: '契约陪伴协议 (Roleplay)',
    subtitle: '私属管家与执事',
    icon: '🏠',
    description: '优雅古典的管家执事与贵族主人协议，重温维多利亚式的典雅主仆',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '贵族主人/雇主全名 (Noble Lord / Lady)', type: 'text', required: true, placeholder: '请输入主人的尊名' },
          { label: '私属执事/管家全名 (Personal Butler)', type: 'text', required: true, placeholder: '请输入执事的姓名' },
          { label: '契约期限', type: 'select', options: ['永久忠诚', '三年长约', '试用期三个月'], default: '永久忠诚' },
          { label: '立约日期', type: 'date', required: true }
        ]
      },
      {
        title: '执事戒律与仪态',
        fields: [
          { 
            label: '执事信条与职业操守', 
            type: 'textarea', 
            required: true, 
            placeholder: '阐述执事的忠诚誓言与优雅标准...',
            value: '作为主人的私属执事，时刻保持燕尾服整洁、白手套一尘不染；言辞沉稳严谨，身形挺拔端庄，以“Yes, My Lord / Lady”作为最高执行标准。'
          },
          { 
            label: '绝对保密与隐私誓约', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定对主人一切生活与私密事务的绝密守护...',
            value: '执事对主人所有的私密喜好、谈话内容、社交往来承担终身保密义务，任凭外界风雨，誓死捍卫主人的清誉与安宁。'
          }
        ]
      },
      {
        title: '起居照料与行程管理',
        fields: [
          { 
            label: '晨唤、着装与餐桌艺术', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定晨起唤醒、协助更衣与英式红茶呈递规范...',
            value: '于约定时刻轻扣房门唤醒主人，呈递今日早报与调配适温的大吉岭红茶；协助整理领结、袖扣与礼服，呈上完美早餐。'
          },
          { 
            label: '私人日程与随身护卫', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定外出陪同、雨天执伞与门禁管理...',
            value: '主人出行时随侍左右，执伞引路、料理车马行程；为主人的社交与工作构筑最坚实舒适的日常后盾。'
          }
        ]
      },
      {
        title: '惩戒与退职准则',
        fields: [
          { 
            label: '失职自罚与引咎辞职', 
            type: 'textarea', 
            required: true, 
            placeholder: '规定执事出现疏忽时的自律与主人责罚...',
            value: '若有疏漏怠慢，执事将自请罚扣薪奉、闭门面壁思过；若严重辜负信任，执事将脱下白手套，引咎辞退。'
          }
        ]
      }
    ]
  }
]

export function getTemplateById(id) {
  return templates.find(t => t.id === id) || templates[0]
}
