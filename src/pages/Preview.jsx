import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Sample contract content with shameful and erotic text for preview
const sampleContracts = [
  {
    id: 'basic-ds',
    name: '基本主奴契约 (羞耻版)',
    icon: '👑',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Dominant)', value: '________________________' },
          { label: '奴隶/臣服者姓名 (Submissive/Slave)', value: '________________________' },
          { label: '契约日期', value: '____年__月__日' },
          { label: '有效期限', value: '永久 / 直到解除' }
        ]
      },
      {
        title: '权力交换条款',
        fields: [
          { 
            label: '权力移交声明', 
            value: '________________________________________________________\n我的身体、灵魂、尊严全部属于主人；我可以随时被主人使用；成为主人的私有物品；发出最淫荡的声音求饶...'
          },
          { 
            label: '服从义务', 
            value: '________________________________________________________\n跪下，爬着走，舔脚，叫主人，求饶，发出淫荡的声音：\"主人好舒服...主人好喜欢...主人是我的神...请惩罚我...让我成为您的性奴吧...'
          },
          { 
            label: '特权保留', 
            value: '________________________________________________________\n主人的身体完全属于我；我可以随意使用我的身体取悦主人；可以被主人随意鞭打、羞辱、调教；可以发出淫荡的声音求饶...'
          }
        ]
      },
      {
        title: '日常协议',
        fields: [
          { 
            label: '晨间仪式', 
            value: '________________________________________________________\n每天醒来第一件事就是跪在地上，用舌头舔主人的脚底，发出娇媚的声音：\"主人早安...请允许我侍奉您...我的身体属于主人...请享用我吧...'
          },
          { 
            label: '晚间汇报', 
            value: '________________________________________________________\n每天睡前必须跪在地上，用身体蹭主人的腿，发出淫荡的声音：\"主人...我今晚想被您玩弄...请让我成为您的性玩具...求您惩罚我...'
          },
          { 
            label: '沟通规则', 
            value: '________________________________________________________\n每次沟通必须跪着，用娇媚的声音称呼主人；必须发出淫荡的求饶声；必须描述自己如何想被主人玩弄...'
          }
        ]
      },
      {
        title: '惩罚与奖励',
        fields: [
          { 
            label: '惩罚方式', 
            value: '________________________________________________________\n跪在地上接受鞭打；用舌头舔主人的伤口；发出淫荡的声音求饶；爬着走到主人面前求饶...'
          },
          { 
            label: '奖励机制', 
            value: '________________________________________________________\n被主人亲吻；用身体蹭主人的腿；发出淫荡的声音赞美主人；成为主人的性玩具...'
          }
        ]
      },
      {
        title: '终止条款',
        fields: [
          { 
            label: '解除条件', 
            value: '________________________________________________________\n除非主人同意，否则奴隶永远不能离开；只有主人想解放时才可能解除；解除时必须跪在地上发出淫荡的声音...'
          },
          { 
            label: '争议解决', 
            value: '________________________________________________________\n奴隶必须跪在地上求饶；主人可以随意惩罚；争议由主人决定；奴隶必须服从主人的所有决定...'
          }
        ]
      }
    ]
  },
  {
    id: 'pet-play',
    name: '宠玩协议 (淫荡版)',
    icon: '🐕',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Owner)', value: '________________________' },
          { label: '宠物姓名 (Pet/Kajira)', value: '________________________' },
          { label: '物种设定', value: '□猫系  □犬系  □兔系  □其他' },
          { label: '契约日期', value: '____年__月__日' }
        ]
      },
      {
        title: '宠物条款',
        fields: [
          { 
            label: '宠物空间定义', 
            value: '________________________________________________________\n我的专属空间是主人的卧室；我必须跪在地上接受检查；成为主人的私有物品...'
          },
          { 
            label: '服从指令', 
            value: '________________________________________________________\n跪着，爬着走，舔脚，叫主人，求饶，发出淫荡的声音，用身体蹭主人的腿...'
          },
          { 
            label: '装备使用', 
            value: '________________________________________________________\n戴上项圈，脖子上挂着铃铛；用链子拴住；被主人随意摆布；成为主人的私有财产...'
          }
        ]
      },
      {
        title: '饮食与护理',
        fields: [
          { 
            label: '喂食规定', 
            value: '________________________________________________________\n必须跪着接受喂食；用舌头舔主人的手；发出淫荡的声音求食；成为主人的口粮...'
          },
          { 
            label: '清洁要求', 
            value: '________________________________________________________\n必须跪在地上接受清洁；用舌头舔主人的脚；发出淫荡的声音赞美主人；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '游戏与训练',
        fields: [
          { 
            label: '游戏时间', 
            value: '________________________________________________________\n被主人随意玩弄；发出淫荡的声音求饶；爬着走到主人面前；成为主人的性玩具...'
          },
          { 
            label: '训练目标', 
            value: '________________________________________________________\n学会发出最淫荡的声音；学会用最骚的方式取悦主人；成为主人的私有财产；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '解宠条件', 
            value: '________________________________________________________\n除非主人同意，否则永远不能解除；只有主人想解放时才可能；解除时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '告别仪式', 
            value: '________________________________________________________\n跪在地上，用身体蹭主人的腿；发出最淫荡的声音求饶；成为主人的私有财产直到最后一刻...'
          }
        ]
      }
    ]
  },
  {
    id: 'tpe',
    name: '24/7 全权交换 (下贱版)',
    icon: '⚡',
    sections: [
      {
        title: '当事人信息',
        fields: [
          { label: '主人姓名 (Master)', value: '________________________' },
          { label: '奴隶/臣服者姓名 (Slave/Kajira)', value: '________________________' },
          { label: '契约日期', value: '____年__月__日' },
          { label: '有效期限', value: '□永久  □1 年  □2 年  □3 年' }
        ]
      },
      {
        title: '完全权力移交声明',
        fields: [
          { 
            label: '生活领域移交', 
            value: '________________________________________________________\n饮食必须由主人决定；作息必须听从主人的安排；社交活动由主人批准；成为主人的私有物品...'
          },
          { 
            label: '财产所有权', 
            value: '________________________________________________________\n所有财产归主人所有；必须跪着向主人汇报财产状况；成为主人的私有物品；随时可以被没收...'
          },
          { 
            label: '身体控制权', 
            value: '________________________________________________________\n身体的每一个部位都属于主人；可以随意使用我的身体取悦主人；成为主人的性玩具；完全服从主人的命令...'
          }
        ]
      },
      {
        title: '日常服从协议',
        fields: [
          { 
            label: '24 小时监控', 
            value: '________________________________________________________\n必须随时向主人汇报行踪；必须跪着接受主人的检查；发出淫荡的声音求饶；成为主人的私有物品...'
          },
          { 
            label: '指令执行', 
            value: '________________________________________________________\n所有指令必须立即执行；跪着接受命令；发出淫荡的声音求饶；成为主人的私有物品...'
          },
          { 
            label: '自主权限制', 
            value: '________________________________________________________\n没有自主决策权；必须完全服从主人的命令；成为主人的私有物品；随时可以被抛弃...'
          }
        ]
      },
      {
        title: '惩罚与服从测试',
        fields: [
          { 
            label: '日常惩罚', 
            value: '________________________________________________________\n跪在地上接受鞭打；用舌头舔主人的伤口；发出淫荡的声音求饶；爬着走到主人面前...'
          },
          { 
            label: '服从测试', 
            value: '________________________________________________________\n跪在地上接受主人的检查；发出最淫荡的声音；爬着走到主人面前求饶；成为主人的私有物品...'
          }
        ]
      },
      {
        title: '解除条款',
        fields: [
          { 
            label: '永久解除条件', 
            value: '________________________________________________________\n除非主人同意，否则永远不能解除；只有主人想解放时才可能；解除时必须跪在地上发出最淫荡的声音...'
          },
          { 
            label: '过渡期安排', 
            value: '________________________________________________________\n在过渡期内继续跪在地上；发出淫荡的声音求饶；成为主人的私有物品直到最后一刻...'
          }
        ]
      }
    ]
  }
]

export default function Preview() {
  const navigate = useNavigate()
  const [selectedContract, setSelectedContract] = useState(sampleContracts[0])
  const [showPrintModal, setShowPrintModal] = useState(false)
  const [printProgress, setPrintProgress] = useState(0)

  useEffect(() => {
    // Reset print progress when contract changes
    setPrintProgress(0)
  }, [selectedContract])

  function handlePrint() {
    setShowPrintModal(true)
    setPrintProgress(10)
    
    setTimeout(() => setPrintProgress(50), 500)
    setTimeout(() => setPrintProgress(90), 1000)
    setTimeout(() => {
      window.print()
      setShowPrintModal(false)
      setPrintProgress(0)
    }, 2000)
  }

  function handleDownloadPDF() {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = 'data:application/pdf;base64,' + btoa(selectedContract.name)
    link.download = `${selectedContract.name.replace(/\s+/g, '_').toLowerCase()}_contract.pdf`
    link.click()
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container-custom mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              契约预览 (羞耻版)
            </h1>
            <p className="text-gray-400 mt-2">查看并导出您的专属协议 - 为奴从命</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/generator')}
              className="btn-secondary"
            >
              ← 返回编辑
            </button>
            <button
              onClick={handlePrint}
              disabled={printProgress === 100}
              className={`btn-primary ${printProgress >= 90 ? 'opacity-50' : ''}`}
            >
              {printProgress === 100 ? (
                '🖨️ 正在打印...'
              ) : (
                '📄 打印契约'
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Contract Template Selector */}
      <div className="container-custom mb-8">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">选择契约模板</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {sampleContracts.map((contract, index) => (
            <button
              key={index}
              onClick={() => setSelectedContract(contract)}
              className={`card ${selectedContract.id === contract.id ? 'border-gold-400 ring-2 ring-gold-400/50' : ''}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{contract.icon}</span>
                <h3 className={`font-semibold ${selectedContract.id === contract.id ? 'text-gold-400' : 'text-white'}`}>
                  {contract.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contract Preview */}
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="contract-paper mx-auto max-w-4xl"
        >
          {/* Contract Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gold-400 mb-4">
              性奴认主协议 (羞耻版)
            </h1>
            <p className="text-xl text-gray-500 italic">
              {selectedContract.name}
            </p>
          </div>

          {/* Contract Content */}
          <div className="contract-content space-y-8">
            {selectedContract.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-12 last:mb-0">
                <h3 className="text-2xl font-serif font-bold text-gold-400 mb-6 pb-2 border-b-2 border-gold-400/50">
                  {section.title}
                </h3>

                <div className="space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex}>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        {field.label}
                      </label>
                      <textarea
                        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 
                                   text-black placeholder-gray-400 focus:outline-none focus:border-gold-400"
                        rows={field.value.includes('\n') ? 6 : 3}
                      >
                        {field.value || '在此填写...'}
                      </textarea>
                    </div>
                  ))}
                </div>

                {/* Section Divider */}
                {sectionIndex < selectedContract.sections.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent my-8" />
                )}
              </div>
            ))}
          </div>

          {/* Signature Section */}
          <div className="mt-16 pt-12 border-t-2 border-gold-400">
            <h3 className="text-xl font-serif font-bold text-center mb-8 text-gray-500">
              签署确认 (为奴从命)
            </h3>

            <div className="flex flex-col md:flex-row justify-between gap-12">
              <div className="flex-1 text-center">
                <p className="text-sm text-gray-600 mb-4">主人 (Dominant)</p>
                <div className="border-b border-gray-300 h-24 mx-auto w-full max-w-md" />
                <p className="mt-4 text-xs text-gray-500">签名日期：________________</p>
              </div>

              <div className="flex-1 text-center">
                <p className="text-sm text-gray-600 mb-4">奴隶/臣服者 (Submissive/Slave)</p>
                <div className="border-b border-gray-300 h-24 mx-auto w-full max-w-md" />
                <p className="mt-4 text-xs text-gray-500">签名日期：________________</p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-16 pt-8 border-t border-gold-400/30 text-center">
              <p className="text-xs text-gray-500 max-w-2xl mx-auto leading-relaxed">
                本协议为 BDSM 权力交换关系的契约文件，双方应本着自愿、平等、尊重的原则签署。
                所有条款均为可选，可根据实际情况进行调整和修改。
                奴隶承诺永远服从主人的命令，成为主人的私有物品，发出最淫荡的声音求饶。
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500">
              Generated by BDSM Contract Generator (Shameful Edition) | {new Date().toLocaleDateString('zh-CN')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg p-8 max-w-2xl w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">打印契约 (羞耻版)</h3>
              <button
                onClick={() => setShowPrintModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Progress Bar */}
            {printProgress < 100 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">准备中...</span>
                  <span className="text-gold-400">{printProgress}%</span>
                </div>
                <div className="h-2 bg-dark-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${printProgress}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gold-400"
                  />
                </div>
              </div>
            )}

            {printProgress === 100 && (
              <p className="text-center text-gray-400 mb-6">
                正在打开打印对话框...
              </p>
            )}

            <button
              onClick={() => setShowPrintModal(false)}
              disabled={printProgress >= 90}
              className="btn-primary w-full py-3"
            >
              {printProgress >= 90 ? '完成' : '继续'}
            </button>
          </motion.div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 2cm;
          }
          
          body {
            background: white !important;
            color: black !important;
          }
          
          .contract-paper {
            border: none !important;
            box-shadow: none !important;
            min-height: auto !important;
          }
          
          .container-custom {
            padding: 0 !important;
          }
          
          /* Hide navigation elements */
          nav, footer, button:not(:disabled) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
