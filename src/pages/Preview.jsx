import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { templates, getTemplateById } from '../data/templates'

export default function Preview() {
  const navigate = useNavigate()
  
  // Contract to preview (either generated from Generator or a template)
  const [contractData, setContractData] = useState(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState('basic-ds')
  const [toastMessage, setToastMessage] = useState('')
  const [fontSize, setFontSize] = useState('normal') // 'normal', 'large'

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2500)
  }

  // Load contract on mount
  useEffect(() => {
    const saved = localStorage.getItem('generated_contract')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed && parsed.sections) {
          setContractData(parsed)
          setSelectedTemplateId(parsed.id || 'basic-ds')
          return
        }
      } catch (e) {
        // ignore
      }
    }

    // Fallback: build contract from default template
    loadTemplateAsContract('basic-ds')
  }, [])

  function loadTemplateAsContract(tplId) {
    const tpl = getTemplateById(tplId)
    setSelectedTemplateId(tplId)
    const newContract = {
      id: tpl.id,
      name: tpl.name,
      subtitle: tpl.subtitle || '',
      icon: tpl.icon,
      date: new Date().toISOString().split('T')[0],
      parties: {
        dominant: '甲方（支配方 / Master）',
        submissive: '乙方（臣服方 / Slave）',
        duration: '永久生效'
      },
      sections: tpl.sections.map(s => ({
        title: s.title,
        fields: s.fields.map(f => ({
          label: f.label,
          type: f.type,
          value: f.value || '___________________________'
        }))
      }))
    }
    setContractData(newContract)
  }

  function handleSelectTemplate(tplId) {
    loadTemplateAsContract(tplId)
  }

  // Print contract
  function handlePrint() {
    window.print()
  }

  // Copy full text to clipboard
  function handleCopyText() {
    if (!contractData) return

    let text = `========================================\n`
    text += `       ${contractData.name}\n`
    if (contractData.subtitle) text += `       ${contractData.subtitle}\n`
    text += `========================================\n\n`
    text += `立约日期：${contractData.date || '____年__月__日'}\n`
    text += `支配方：${contractData.parties?.dominant || '________'}\n`
    text += `臣服方：${contractData.parties?.submissive || '________'}\n`
    text += `生效期限：${contractData.parties?.duration || '永久'}\n\n`

    contractData.sections.forEach((section, sIdx) => {
      text += `【第 ${sIdx + 1} 章 · ${section.title}】\n`
      section.fields.forEach(f => {
        text += `· ${f.label}：\n${f.value}\n\n`
      })
    })

    text += `----------------------------------------\n`
    text += `支配方签名：____________________\n`
    text += `臣服方签名：____________________\n`
    text += `日期：${contractData.date || '____年__月__日'}\n`

    navigator.clipboard.writeText(text).then(() => {
      showToast('✅ 契约全文已复制到剪贴板！')
    }).catch(() => {
      showToast('❌ 复制失败，请手动选择复制')
    })
  }

  if (!contractData) {
    return (
      <div className="container-custom text-center py-24">
        <div className="text-4xl mb-4 animate-spin">⏳</div>
        <p className="text-gray-400">正在排版装载契约文档...</p>
      </div>
    )
  }

  return (
    <div className="container-custom">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gold-400 text-dark-900 font-bold px-4 py-2 rounded-full shadow-lg text-sm"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Action & Navigation Bar (no-print) */}
      <div className="mb-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">{contractData.icon}</span>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                契约预览与归档
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              排版完成的正式协议文档，支持直接打印、导出PDF或复制文本
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigate(`/generator?type=${selectedTemplateId}`)}
              className="btn-secondary text-xs sm:text-sm px-3.5 py-2"
            >
              ✍️ 返回编辑
            </button>
            <button
              onClick={handleCopyText}
              className="btn-secondary text-xs sm:text-sm px-3.5 py-2"
            >
              📋 复制文本
            </button>
            <button
              onClick={handlePrint}
              className="btn-primary text-xs sm:text-sm px-4 py-2"
            >
              🖨️ 打印 / 导出PDF
            </button>
          </div>
        </div>

        {/* Template Selector Bar in Preview (Quick preview any template) */}
        <div className="mt-5 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {templates.map(t => {
              const active = t.id === selectedTemplateId
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTemplate(t.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 border ${
                    active
                      ? 'bg-gold-400/20 border-gold-400 text-gold-300 font-semibold'
                      : 'bg-dark-800/80 border-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Printable / Viewable Contract Paper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="contract-paper max-w-4xl mx-auto border-2 border-gold-400/40 relative shadow-2xl"
      >
        {/* Classical Border Ornament (Corner accents) */}
        <div className="absolute top-2 left-2 text-gold-400/40 text-lg select-none">╔</div>
        <div className="absolute top-2 right-2 text-gold-400/40 text-lg select-none">╗</div>
        <div className="absolute bottom-2 left-2 text-gold-400/40 text-lg select-none">╚</div>
        <div className="absolute bottom-2 right-2 text-gold-400/40 text-lg select-none">╝</div>

        {/* Contract Title & Insignia */}
        <div className="text-center pb-6 sm:pb-8 border-b-2 border-gold-400/30 mb-8 sm:mb-10">
          <div className="text-3xl sm:text-4xl text-gold-400 mb-2 font-serif select-none">Ω</div>
          <span className="text-[10px] sm:text-xs text-gold-400/90 font-semibold tracking-[0.25em] uppercase block mb-1">
            SACRED BOND OF SOVEREIGNTY & SUBMISSION
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-gold-400 tracking-wide">
            {contractData.name}
          </h2>
          {contractData.subtitle && (
            <p className="text-xs sm:text-base text-gray-400 italic mt-2">
              — {contractData.subtitle} —
            </p>
          )}

          {/* Parties Meta Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 sm:px-8 py-2.5 rounded-lg bg-dark-900/60 border border-gold-400/20 text-xs sm:text-sm text-gray-300">
            <div>
              <span className="text-gray-500">立约日期：</span>
              <span className="font-semibold text-gold-400">{contractData.date}</span>
            </div>
            <div className="hidden sm:inline text-gray-600">|</div>
            <div>
              <span className="text-gray-500">支配方：</span>
              <span className="font-semibold text-white">{contractData.parties?.dominant}</span>
            </div>
            <div className="hidden sm:inline text-gray-600">|</div>
            <div>
              <span className="text-gray-500">臣服方：</span>
              <span className="font-semibold text-white">{contractData.parties?.submissive}</span>
            </div>
          </div>
        </div>

        {/* Contract Preamble */}
        <div className="mb-8 p-4 rounded-lg bg-dark-900/40 border-l-4 border-gold-400 text-xs sm:text-sm text-gray-300 leading-relaxed italic">
          “吾二人在此立誓：在理智清醒、知情自愿且相互信赖之基石上，确立双方权力归属与侍奉法度。此契约非为束缚人性，而为构筑独属于彼此之至高安全感与精神归宿。”
        </div>

        {/* Contract Sections */}
        <div className="space-y-8 sm:space-y-10">
          {contractData.sections.map((section, sIdx) => {
            const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']
            const num = romanNumerals[sIdx] || `${sIdx + 1}`

            return (
              <div key={sIdx} className="space-y-4">
                <div className="flex items-center gap-3 border-b border-gold-400/30 pb-2">
                  <span className="font-serif font-bold text-gold-400 text-sm sm:text-base">
                    ARTICLE {num}.
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                    {section.title}
                  </h3>
                </div>

                <div className="space-y-4 pl-1 sm:pl-3">
                  {section.fields.map((field, fIdx) => (
                    <div key={fIdx} className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400/70" />
                        <h4 className="text-xs sm:text-sm font-semibold text-gold-300/90 tracking-wide">
                          {field.label}
                        </h4>
                      </div>
                      <div className="pl-3.5 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap font-sans bg-dark-900/30 p-3 rounded-lg border border-gray-800">
                        {field.value || '（未约定具体内容）'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Formal Signature Block */}
        <div className="mt-14 pt-8 border-t-2 border-gold-400/40">
          <div className="text-center mb-6">
            <h3 className="text-sm sm:text-base font-serif font-bold text-gold-400 tracking-widest uppercase">
              SEAL & SIGNATURES OF MUTUAL CONSENT
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
              双方已知悉并完全认同上述所有条款，在自由意志下郑重签署
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Dominant signature box */}
            <div className="p-4 rounded-xl bg-dark-900/50 border border-gold-400/30 text-center space-y-4">
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                甲方 · 支配方立约印鉴
              </span>
              <div className="h-14 flex items-end justify-center border-b border-dashed border-gold-400/50 pb-1">
                <span className="font-serif italic text-base sm:text-lg text-gold-300">
                  {contractData.parties?.dominant}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 px-2">
                <span>签署：__________________</span>
                <span>日期：{contractData.date}</span>
              </div>
            </div>

            {/* Submissive signature box */}
            <div className="p-4 rounded-xl bg-dark-900/50 border border-gold-400/30 text-center space-y-4">
              <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider block">
                乙方 · 臣服方承诺印鉴
              </span>
              <div className="h-14 flex items-end justify-center border-b border-dashed border-gold-400/50 pb-1">
                <span className="font-serif italic text-base sm:text-lg text-gold-300">
                  {contractData.parties?.submissive}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-gray-400 px-2">
                <span>签署：__________________</span>
                <span>日期：{contractData.date}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
