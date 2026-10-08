import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Contract templates with shameful and erotic content
const templates = [
  {
    id: 'basic-ds',
    name: '基本主奴契约 (羞耻版)',
    icon: '👑',
    description: '基础的主奴权力交换协议 - 为奴从命，彻底下贱',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Dominant)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '奴隶/臣服者姓名 (Submissive/Slave)', type: 'text', required: true, placeholder: '请输入您的全名' },
          { label: '契约日期', type: 'date', required: true },
          { label: '有效期限', type: 'select', options: ['永久', '1 年', '2 年', '3 年'], default: '永久' }
        ]
      },
      {
        title: '权力交换条款',
        fields: [
          { 
            label: '权力移交声明', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述主人将哪些领域的控制权移交给奴隶...',
            value: '我的身体、灵魂、尊严全部属于主人；我可以随时被主人使用；成为主人的私有物品；发出最淫荡的声音求饶...'
          },
          { 
            label: '服从义务', 
            type: 'textarea', 
            required: true, 
            placeholder: '列出奴隶需要遵守的指令和规则...',
            value: '跪下，爬着走，舔脚，叫主人，求饶，发出淫荡的声音：\"主人好舒服...主人好喜欢...主人是我的神...请惩罚我...让我成为您的性奴吧...'
          },
          { 
            label: '特权保留', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明主人保留的特权...',
            value: '主人的身体完全属于我；我可以随意使用我的身体取悦主人；可以被主人随意鞭打、羞辱、调教；可以发出淫荡的声音求饶...'
          }
        ]
      },
      {
        title: '日常协议',
        fields: [
          { 
            label: '晨间仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述每日开始的仪式...',
            value: '每天醒来第一件事就是跪在地上，用舌头舔主人的脚底，发出娇媚的声音：\"主人早安...请允许我侍奉您...我的身体属于主人...请享用我吧...'
          },
          { 
            label: '晚间汇报', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述每日结束时的汇报...',
            value: '每天睡前必须跪在地上，用身体蹭主人的腿，发出淫荡的声音：\"主人...我今晚想被您玩弄...请让我成为您的性玩具...求您惩罚我...'
          },
          { 
            label: '沟通规则', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定双方的沟通方式...',
            value: '每次沟通必须跪着，用娇媚的声音称呼主人；必须发出淫荡的求饶声；必须描述自己如何想被主人玩弄...'
          }
        ]
      },
      {
        title: '惩罚与奖励',
        fields: [
          { 
            label: '惩罚方式', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述可执行的惩罚...',
            value: '跪在地上接受鞭打；用舌头舔主人的伤口；发出淫荡的声音求饶；爬着走到主人面前求饶...'
          },
          { 
            label: '奖励机制', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述对良好服从的奖励...',
            value: '被主人亲吻；用身体蹭主人的腿；发出淫荡的声音赞美主人；成为主人的性玩具...'
          }
        ]
      },
      {
        title: '终止条款',
        fields: [
          { 
            label: '解除条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明契约的解除...',
            value: '除非主人同意，否则奴隶永远不能离开；只有主人想解放时才可能解除；解除时必须跪在地上发出淫荡的声音...'
          },
          { 
            label: '争议解决', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定发生分歧的处理...',
            value: '奴隶必须跪在地上求饶；主人可以随意惩罚；争议由主人决定；奴隶必须服从主人的所有决定...'
          }
        ]
      }
    ]
  },
  {
    id: 'pet-play',
    name: '宠玩协议 (淫荡版)',
    icon: '🐕',
    description: '主人/宠物动态的专属契约 - 为奴为宠，彻底下贱',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Owner)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '宠物姓名 (Pet/Kajira)', type: 'text', required: true, placeholder: '请输入宠物的名字/代号' },
          { label: '物种设定', type: 'select', options: ['猫系', '犬系', '兔系', '其他'], default: '其他' },
          { label: '契约日期', type: 'date', required: true }
        ]
      },
      {
        title: '宠物条款',
        fields: [
          { 
            label: '宠物空间定义', 
            type: 'textarea', 
            placeholder: '描述宠物的专属空间和活动范围...',
            value: '我的专属空间是主人的卧室；我必须跪在地上接受检查；成为主人的私有物品...'
          },
          { 
            label: '服从指令', 
            type: 'textarea', 
            required: true, 
            placeholder: '列出需要遵守的淫荡指令...',
            value: '跪着，爬着走，舔脚，叫主人，求饶，发出淫荡的声音，用身体蹭主人的腿...'
          },
          { 
            label: '装备使用', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定使用的宠物装备...',
            value: '戴上项圈，脖子上挂着铃铛；用链子拴住；被主人随意摆布；成为主人的私有财产...'
          }
        ]
      },
      {
        title: '饮食与护理',
        fields: [
          { 
            label: '喂食规定', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述喂食的规定...',
            value: '必须跪着接受喂食；用舌头舔主人的手；发出淫荡的声音求食；成为主人的口粮...'
          },
          { 
            label: '清洁要求', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定清洁的要求...',
            value: '必须跪在地上接受清洁；用舌头舔主人的脚；发出淫荡的声音赞美主人；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '游戏与训练',
        fields: [
          { 
            label: '游戏时间', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定游戏的时间和方式...',
            value: '被主人随意玩弄；发出淫荡的声音求饶；爬着走到主人面前；成为主人的性玩具...'
          },
          { 
            label: '训练目标', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述训练的目标...',
            value: '学会发出最淫荡的声音；学会用最骚的方式取悦主人；成为主人的私有财产；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '解宠条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明何时可以解除...',
            value: '除非主人同意，否则永远不能解除；只有主人想解放时才可能；解除时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '告别仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定结束时的告别...',
            value: '跪在地上，用身体蹭主人的腿；发出最淫荡的声音求饶；成为主人的私有财产直到最后一刻...'
          }
        ]
      }
    ]
  },
  {
    id: 'tpe',
    name: '24/7 全权交换 (下贱版)',
    icon: '⚡',
    description: '全天候权力完全转移的严格协议 - 彻底为奴，毫无尊严',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Master)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '奴隶/臣服者姓名 (Slave/Kajira)', type: 'text', required: true, placeholder: '请输入您的全名' },
          { label: '契约日期', type: 'date', required: true },
          { label: '有效期限', type: 'select', options: ['永久', '1 年', '2 年', '3 年'], default: '永久' }
        ]
      },
      {
        title: '完全权力移交声明',
        fields: [
          { 
            label: '生活领域移交', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述哪些生活领域完全由主人控制...',
            value: '饮食必须由主人决定；作息必须听从主人的安排；社交活动由主人批准；成为主人的私有物品...'
          },
          { 
            label: '财产所有权', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定个人财产的归属...',
            value: '所有财产归主人所有；必须跪着向主人汇报财产状况；成为主人的私有物品；随时可以被没收...'
          },
          { 
            label: '身体控制权', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述身体支配权...',
            value: '身体的每一个部位都属于主人；可以随意使用我的身体取悦主人；成为主人的性玩具；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '日常服从协议',
        fields: [
          { 
            label: '24 小时监控', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定主人对奴隶的监控...',
            value: '必须随时向主人汇报行踪；必须跪着接受主人的检查；发出淫荡的声音求饶；成为主人的私有物品...'
          },
          { 
            label: '指令执行', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述对所有指令的执行...',
            value: '所有指令必须立即执行；跪着接受命令；发出淫荡的声音求饶；成为主人的私有物品...'
          },
          { 
            label: '自主权限制', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明奴隶被剥夺的权利...',
            value: '没有自主决策权；必须完全服从主人的命令；成为主人的私有物品；随时可以被抛弃...'
          }
        ]
      },
      {
        title: '惩罚与服从测试',
        fields: [
          { 
            label: '日常惩罚', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述常规惩罚...',
            value: '跪在地上接受鞭打；用舌头舔主人的伤口；发出淫荡的声音求饶；爬着走到主人面前...'
          },
          { 
            label: '服从测试', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定定期进行的服从测试...',
            value: '跪在地上接受主人的检查；发出最淫荡的声音；爬着走到主人面前求饶；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '永久解除条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明永久解除的条件...',
            value: '除非主人同意，否则永远不能解除；只有主人想解放时才可能；解除时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '过渡期安排', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定解除后的安排...',
            value: '在过渡期内继续跪在地上；发出淫荡的声音求饶；成为主人的私有物品直到最后一刻...'
          }
        ]
      }
    ]
  },
  {
    id: 'gorean-slave',
    name: '哥罗奴隶契约 (淫荡版)',
    icon: '📜',
    description: '基于哥罗哲学的正式主奴协议 - 为奴为宠，彻底下贱',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Master)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '奴隶/卡吉拉姓名 (Slave/Kajira)', type: 'text', required: true, placeholder: '请输入您的全名' },
          { label: '部落归属', type: 'select', options: ['自由民', '半奴', '完全奴'], default: '完全奴' },
          { label: '契约日期', type: 'date', required: true }
        ]
      },
      {
        title: '哥罗原则声明',
        fields: [
          { 
            label: '自然秩序确认', 
            type: 'textarea', 
            required: true, 
            placeholder: '确认接受哥罗的自然等级制度...',
            value: '我承认主人的地位高于一切；我的存在是为了取悦主人；成为主人的私有物品；发出最淫荡的声音求饶...'
          },
          { 
            label: '性别角色认同', 
            type: 'textarea', 
            placeholder: '描述对传统性别角色的认同...',
            value: '我完全接受作为奴隶的角色；我的身体是主人的财产；成为主人的性玩具；发出最淫荡的声音求饶...'
          },
          { 
            label: '种族/物种观念', 
            type: 'textarea', 
            placeholder: '表达对不同种族/物种的等级认知...',
            value: '我承认自己的低等地位；我的存在是为了取悦主人；成为主人的私有物品；发出最淫荡的声音求饶...'
          }
        ]
      },
      {
        title: '奴隶义务条款',
        fields: [
          { 
            label: '忠诚誓言', 
            type: 'textarea', 
            required: true, 
            placeholder: '对主人的绝对忠诚...',
            value: '我永远属于主人；我的身体是主人的私有财产；我会用尽一切方式取悦主人；成为主人的性奴直到死亡...'
          },
          { 
            label: '服从范围', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述服从的范围...',
            value: '身体的每一个部位都属于主人；必须跪着接受主人的命令；发出淫荡的声音求饶；成为主人的私有物品...'
          },
          { 
            label: '身体从属', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定身体支配的方式...',
            value: '身体的每一个部位都可以被主人使用；成为主人的性玩具；发出最淫荡的声音求饶；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '主人特权',
        fields: [
          { 
            label: '惩罚权', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述主人的惩罚权...',
            value: '可以随意鞭打我的身体；可以随意使用我的身体取悦自己；可以把我变成最下贱的性奴；成为主人的私有物品...'
          },
          { 
            label: '财产所有权', 
            type: 'textarea', 
            required: true, 
            placeholder: '确认奴隶财产的归属...',
            value: '所有财产归主人所有；必须跪着向主人汇报；成为主人的私有物品；随时可以被没收...'
          }
        ]
      },
      {
        title: '解放条款',
        fields: [
          { 
            label: '解放条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明奴隶获得自由...',
            value: '除非主人同意，否则永远不能获得自由；只有主人想解放时才可能；解放时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '解放仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定解放时的仪式...',
            value: '跪在地上，用身体蹭主人的腿；发出最淫荡的声音求饶；成为主人的私有财产直到最后一刻...'
          }
        ]
      }
    ]
  },
  {
    id: 'femdom',
    name: '女上位协议 (骚版)',
    icon: '💅',
    description: '女性主导的权力交换契约 - 为奴为宠，彻底下贱',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Female Dom)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '臣服者姓名 (Submissive)', type: 'text', required: true, placeholder: '请输入您的全名' },
          { label: '契约日期', type: 'date', required: true }
        ]
      },
      {
        title: '女上位原则',
        fields: [
          { 
            label: '女性权威确认', 
            type: 'textarea', 
            required: true, 
            placeholder: '确认接受女性在关系中的主导地位...',
            value: '我完全接受女性的主导地位；我的存在是为了取悦主人；成为主人的私有物品；发出最淫荡的声音求饶...'
          },
          { 
            label: '崇拜义务', 
            type: 'textarea', 
            placeholder: '描述对主人的崇拜和赞美要求...',
            value: '必须跪在地上崇拜主人；用身体蹭主人的腿；发出最淫荡的声音赞美主人；成为主人的私有物品...'
          },
          { 
            label: '服务职责', 
            type: 'textarea', 
            placeholder: '列出需要履行的服务性职责...',
            value: '必须跪着服侍主人；用舌头舔主人的脚；发出淫荡的声音求饶；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '性行为协议',
        fields: [
          { 
            label: '性权利归属', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述性行为控制...',
            value: '我的身体完全属于主人；可以随意使用我的身体取悦主人；成为主人的性玩具；发出最淫荡的声音求饶...'
          },
          { 
            label: '性玩具使用', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定性玩具的使用...',
            value: '可以随意使用我的身体作为性玩具；发出最淫荡的声音求饶；成为主人的私有物品；完全服从主人的命令...'
          },
          { 
            label: ' chastity 控制 (可选)', 
            type: 'textarea', 
            required: true, 
            placeholder: '关于锁链/手铐的约定...',
            value: '可以随意使用锁链和手铐；成为主人的私有物品；发出最淫荡的声音求饶；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '日常服从',
        fields: [
          { 
            label: '家务服务', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定的家务劳动...',
            value: '必须跪着做家务；用身体蹭主人的腿；发出淫荡的声音赞美主人；成为主人的私有物品...'
          },
          { 
            label: '情感服务', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述需要的陪伴...',
            value: '必须跪在地上陪伴主人；发出最淫荡的声音求饶；成为主人的私有物品；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '关系终止条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明关系终止的条件...',
            value: '除非主人同意，否则永远不能结束；只有主人想解放时才可能；终止时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '后戏安排', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定关系结束时的处理...',
            value: '跪在地上，用身体蹭主人的腿；发出最淫荡的声音求饶；成为主人的私有物品直到最后一刻...'
          }
        ]
      }
    ]
  },
  {
    id: 'pet-play-2',
    name: '宠物饲养协议 (下贱版)',
    icon: '🏠',
    description: '家庭宠物式的主奴动态契约 - 为奴为宠，彻底下贱',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Owner)', type: 'text', required: true, placeholder: '请输入主人的全名' },
          { label: '宠物/臣服者姓名 (Pet/Sub)', type: 'text', required: true, placeholder: '请输入宠物的名字' },
          { label: '契约日期', type: 'date', required: true }
        ]
      },
      {
        title: '家庭宠物条款',
        fields: [
          { 
            label: '宠物空间', 
            type: 'textarea', 
            placeholder: '描述宠物的专属区域和活动时间...',
            value: '我的专属区域是主人的卧室；我必须跪在地上接受检查；成为主人的私有物品...'
          },
          { 
            label: '服从指令', 
            type: 'textarea', 
            required: true, 
            placeholder: '列出基本服从的淫荡指令...',
            value: '跪着，爬着走，舔脚，叫主人，求饶，发出淫荡的声音，用身体蹭主人的腿...'
          },
          { 
            label: '称呼约定', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定主人对宠物的称呼...',
            value: '必须跪着被主人称为\"小贱人\"；发出最淫荡的声音求饶；成为主人的私有物品；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '饮食与照顾',
        fields: [
          { 
            label: '喂食规定', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述喂食的规定...',
            value: '必须跪着接受喂食；用舌头舔主人的手；发出淫荡的声音求食；成为主人的口粮...'
          },
          { 
            label: '清洁要求', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定日常清洁的要求...',
            value: '必须跪在地上接受清洁；用舌头舔主人的脚；发出淫荡的声音赞美主人；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '游戏互动',
        fields: [
          { 
            label: '玩耍时间', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定的游戏时间...',
            value: '被主人随意玩弄；发出淫荡的声音求饶；爬着走到主人面前；成为主人的性玩具...'
          },
          { 
            label: '训练目标', 
            type: 'textarea', 
            required: true, 
            placeholder: '描述训练的目标...',
            value: '学会发出最淫荡的声音；学会用最骚的方式取悦主人；成为主人的私有财产；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '解宠条件', 
            type: 'textarea', 
            required: true, 
            placeholder: '说明何时可以解除...',
            value: '除非主人同意，否则永远不能解除；只有主人想解放时才可能；解除时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '告别仪式', 
            type: 'textarea', 
            required: true, 
            placeholder: '约定结束时的告别...',
            value: '跪在地上，用身体蹭主人的腿；发出最淫荡的声音求饶；成为主人的私有财产直到最后一刻...'
          }
        ]
      }
    ]
  }
]

export default function Generator() {
  const { type } = useParams()
  const navigate = useNavigate()
  
  // Find template by ID or show home if no type specified
  const templateId = type || 'basic-ds'
  const selectedTemplate = templates.find(t => t.id === templateId) || templates[0]
  
  // State for form data
  const [formData, setFormData] = useState({})
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  // Initialize form data with template structure
  useEffect(() => {
    initializeForm(selectedTemplate)
  }, [selectedTemplate])

  function initializeForm(template) {
    const initialData = {}
    
    template.sections.forEach((section, sectionIndex) => {
      initialData[`section_${sectionIndex}`] = {
        title: section.title,
        fields: []
      }
      
      section.fields.forEach(field => {
        if (field.type === 'date') {
          const date = new Date().toISOString().split('T')[0]
          initialData[`section_${sectionIndex}_${field.label}`] = date
        } else if (field.type === 'select' && field.options) {
          initialData[`section_${sectionIndex}_${field.label}`] = field.default || ''
        } else if (field.required) {
          initialData[`section_${sectionIndex}_${field.label}`] = ''
        } else {
          // If value is provided, use it; otherwise empty string
          const value = formData[`section_${sectionIndex}_${field.label}`] || field.value || ''
          initialData[`section_${sectionIndex}_${field.label}`] = value
        }
      })
    })
    
    setFormData(initialData)
  }

  function handleFieldChange(sectionIndex, fieldName, value) {
    const sectionKey = `section_${sectionIndex}`
    const newFormData = { ...formData }
    
    // If field is an array (like fields), update the array
    if (fieldName === 'fields') {
      newFormData[sectionKey] = {
        title: formData[sectionKey]?.title || '',
        fields: value
      }
    } else {
      // Update individual field value
      newFormData[sectionKey] = {
        ...formData[sectionKey],
        [fieldName]: value
      }
    }
    
    setFormData(newFormData)
  }

  function handleSectionChange(sectionIndex, key, value) {
    const newFormData = { ...formData }
    newFormData[`section_${sectionIndex}`] = {
      title: value,
      fields: formData[`section_${sectionIndex}`]?.fields || []
    }
    setFormData(newFormData)
  }

  function generateContract() {
    setIsGenerating(true)
    
    // Simulate generation process
    setTimeout(() => {
      navigate('/preview')
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container-custom mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-5xl">{selectedTemplate.icon}</span>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              {selectedTemplate.name}
            </h1>
            <p className="text-gray-400 mt-2">{selectedTemplate.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Template Selector (for quick navigation) */}
      <div className="container-custom mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {templates.map((t, index) => (
            <button
              key={index}
              onClick={() => navigate(`/generator?type=${t.id}`)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                t.id === templateId 
                  ? 'bg-gold-400 text-white' 
                  : 'bg-dark-800 text-gray-400 hover:bg-dark-700'
              }`}
            >
              <span>{t.icon}</span>
              <span className="text-sm">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="contract-paper"
        >
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {selectedTemplate.sections.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 flex-1 mx-1 rounded-full transition-all ${
                    activeSectionIndex === index ? 'bg-gold-400' : 
                    activeSectionIndex > index ? 'bg-gold-400/50' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form Sections */}
          {selectedTemplate.sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: sectionIndex * 0.1 }}
              className="contract-section"
            >
              <div className="contract-header">
                <h3 className="text-2xl font-serif font-bold text-gold-400 mb-2">
                  {section.title}
                </h3>
              </div>

              {/* Section Fields */}
              <div className="space-y-6">
                {section.fields.map((field, fieldIndex) => (
                  <motion.div
                    key={fieldIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: sectionIndex * 0.1 + fieldIndex * 0.05 }}
                    className="form-group"
                  >
                    <label className="form-label">
                      {field.label}
                      {field.required && (
                        <span className="ml-2 text-gold-400">*</span>
                      )}
                    </label>
                    
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[`section_${sectionIndex}_${field.label}`] || ''}
                        onChange={(e) => handleFieldChange(sectionIndex, field.label, e.target.value)}
                        className="form-textarea"
                        placeholder={field.placeholder}
                        rows={field.required ? 6 : 4}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[`section_${sectionIndex}_${field.label}`] || ''}
                        onChange={(e) => handleFieldChange(sectionIndex, field.label, e.target.value)}
                        className="form-input"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Section Navigation */}
              {sectionIndex < selectedTemplate.sections.length - 1 && (
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                    disabled={activeSectionIndex === 0}
                    className="btn-secondary disabled:opacity-50"
                  >
                    ← 上一节
                  </button>
                  <button
                    onClick={() => setActiveSectionIndex(prev => prev + 1)}
                    className="btn-primary"
                  >
                    下一节 →
                  </button>
                </div>
              )}
            </motion.div>
          ))}

          {/* Generate Button */}
          <div className="mt-12 text-center">
            <AnimatePresence mode="wait">
              {activeSectionIndex === selectedTemplate.sections.length - 1 ? (
                <motion.button
                  key="generate"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={generateContract}
                  disabled={isGenerating}
                  className="btn-primary text-lg px-12 py-4"
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      正在生成契约...
                    </span>
                  ) : (
                    '📜 生成我的专属契约'
                  )}
                </motion.button>
              ) : null}

              {activeSectionIndex > 0 && (
                <motion.button
                  key="back"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                  className="btn-secondary"
                >
                  ← 返回上一节
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gold-400/30 text-center">
            <p className="text-gray-500 text-sm">
              所有数据仅保存在您的本地浏览器中，不会上传到任何服务器
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
