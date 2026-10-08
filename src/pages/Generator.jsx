import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { templates, getTemplateById } from '../data/templates'

export default function Generator() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // Read template from query param ?type=...
  const templateId = searchParams.get('type') || 'basic-ds'
  const selectedTemplate = getTemplateById(templateId)
  
  // State for form data
  const [formData, setFormData] = useState({})
  const [activeSectionIndex, setActiveSectionIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState('stepper') // 'stepper' or 'all'
  const [toastMessage, setToastMessage] = useState('')

  // Show temporary toast message
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2500)
  }

  // Initialize or reload form when template changes
  useEffect(() => {
    initializeForm(selectedTemplate)
    setActiveSectionIndex(0)
  }, [selectedTemplate.id])

  // Initialize form data with default template content or local draft
  function initializeForm(template, forceReset = false) {
    if (!forceReset) {
      const savedDraft = localStorage.getItem(`draft_${template.id}`)
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft)
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
            setFormData(parsed)
            return
          }
        } catch (e) {
          // ignore parsing error
        }
      }
    }

    const initialData = {}
    template.sections.forEach((section, sIdx) => {
      section.fields.forEach(field => {
        const key = `section_${sIdx}_${field.label}`
        if (field.type === 'date') {
          initialData[key] = new Date().toISOString().split('T')[0]
        } else if (field.type === 'select') {
          initialData[key] = field.default || (field.options ? field.options[0] : '')
        } else {
          // Pre-fill with rich template default content!
          initialData[key] = field.value !== undefined ? field.value : ''
        }
      })
    })

    setFormData(initialData)
    if (forceReset) {
      localStorage.removeItem(`draft_${template.id}`)
      showToast('已恢复预设契约条款')
    }
  }

  // Handle individual input changes
  function handleFieldChange(sectionIndex, fieldLabel, value) {
    const key = `section_${sectionIndex}_${fieldLabel}`
    setFormData(prev => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem(`draft_${selectedTemplate.id}`, JSON.stringify(updated))
      return updated
    })
  }

  // Quick switch template
  function handleSelectTemplate(newId) {
    if (newId === selectedTemplate.id) return
    setSearchParams({ type: newId })
  }

  // Clear all fields
  function handleClearFields() {
    if (window.confirm('确定要清空当前所有内容吗？您可以随时点击“恢复预设”重新加载模板。')) {
      const emptyData = {}
      selectedTemplate.sections.forEach((section, sIdx) => {
        section.fields.forEach(field => {
          const key = `section_${sIdx}_${field.label}`
          emptyData[key] = ''
        })
      })
      setFormData(emptyData)
      localStorage.setItem(`draft_${selectedTemplate.id}`, JSON.stringify(emptyData))
      showToast('已清空当前表单')
    }
  }

  // Generate Contract and Navigate to Preview
  function generateContract() {
    setIsGenerating(true)

    // Build complete structured contract object
    const contractData = {
      id: selectedTemplate.id,
      name: selectedTemplate.name,
      subtitle: selectedTemplate.subtitle || '',
      icon: selectedTemplate.icon,
      date: formData[`section_0_契约生效日期`] || formData[`section_0_契约日期`] || new Date().toISOString().split('T')[0],
      parties: {
        dominant: formData[`section_0_${selectedTemplate.sections[0].fields[0]?.label}`] || '支配方',
        submissive: formData[`section_0_${selectedTemplate.sections[0].fields[1]?.label}`] || '臣服方',
        duration: formData[`section_0_有效期限`] || formData[`section_0_契约期限`] || '永久'
      },
      sections: selectedTemplate.sections.map((section, sIdx) => ({
        title: section.title,
        fields: section.fields.map(field => ({
          label: field.label,
          type: field.type,
          value: formData[`section_${sIdx}_${field.label}`] !== undefined 
            ? formData[`section_${sIdx}_${field.label}`] 
            : (field.value || '')
        }))
      }))
    }

    // Save to localStorage for Preview page
    localStorage.setItem('generated_contract', JSON.stringify(contractData))

    setTimeout(() => {
      setIsGenerating(false)
      navigate('/preview')
    }, 600)
  }

  const currentSection = selectedTemplate.sections[activeSectionIndex] || selectedTemplate.sections[0]
  const isLastSection = activeSectionIndex === selectedTemplate.sections.length - 1

  return (
    <div className="container-custom">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-gold-400 text-dark-900 font-semibold px-4 py-2 rounded-full shadow-lg text-sm"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Title & Quick Info */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-4xl sm:text-5xl p-2.5 rounded-2xl bg-gold-400/10 border border-gold-400/20">
              {selectedTemplate.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {selectedTemplate.name}
                </h1>
                <span className="badge hidden sm:inline-block">
                  {selectedTemplate.subtitle}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">
                {selectedTemplate.description}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => initializeForm(selectedTemplate, true)}
              className="btn-ghost text-xs sm:text-sm"
              title="重置为模板预设内容"
            >
              🔄 恢复预设
            </button>
            <button
              onClick={handleClearFields}
              className="btn-ghost text-xs sm:text-sm text-gray-400 hover:text-red-400"
              title="清空以便自定义输入"
            >
              🗑️ 清空
            </button>
          </div>
        </div>
      </div>

      {/* Template Carousel Selector (Horizontal Touch Scrolling on Mobile) */}
      <div className="mb-6 -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {templates.map((t) => {
            const isSelected = t.id === selectedTemplate.id
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTemplate(t.id)}
                className={`flex-shrink-0 snap-start px-3.5 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm transition-all duration-200 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-gold-500 to-yellow-600 text-dark-900 font-bold border-gold-400 shadow-md shadow-gold-400/20 scale-[1.02]'
                    : 'bg-dark-800/80 text-gray-300 hover:text-white border-gray-700/80 hover:border-gold-400/40'
                }`}
              >
                <span className="text-lg">{t.icon}</span>
                <span className="whitespace-nowrap">{t.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* View Mode Toggle & Progress Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 font-medium">
          <span>当前填写：</span>
          <span className="text-gold-400 font-bold">
            第 {activeSectionIndex + 1} / {selectedTemplate.sections.length} 节
          </span>
          <span className="hidden sm:inline text-gray-500">· {currentSection.title}</span>
        </div>

        {/* Stepper vs All Toggle */}
        <div className="bg-dark-900/90 border border-gray-700 rounded-lg p-0.5 flex text-xs">
          <button
            onClick={() => setViewMode('stepper')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'stepper' ? 'bg-gold-400/20 text-gold-400 font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            分步填写
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-3 py-1 rounded-md transition-colors ${
              viewMode === 'all' ? 'bg-gold-400/20 text-gold-400 font-semibold' : 'text-gray-400 hover:text-white'
            }`}
          >
            全文展示
          </button>
        </div>
      </div>

      {/* Stepper Tabs Bar (Clickable Jump on Mobile & Desktop) */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-6">
        {selectedTemplate.sections.map((section, idx) => {
          const isActive = activeSectionIndex === idx
          const isDone = activeSectionIndex > idx
          return (
            <button
              key={idx}
              onClick={() => setActiveSectionIndex(idx)}
              className={`p-2 sm:p-3 rounded-lg text-left transition-all border ${
                isActive
                  ? 'bg-gold-400/15 border-gold-400 text-gold-400 ring-1 ring-gold-400/30'
                  : isDone
                  ? 'bg-dark-800/80 border-gray-700 text-gray-300'
                  : 'bg-dark-800/40 border-gray-800 text-gray-500 hover:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[10px] sm:text-xs">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] ${
                  isActive ? 'bg-gold-400 text-dark-900' : isDone ? 'bg-gold-400/30 text-gold-300' : 'bg-gray-700 text-gray-400'
                }`}>
                  {isDone ? '✓' : idx + 1}
                </span>
                <span className="font-semibold truncate hidden md:inline">
                  {section.title}
                </span>
              </div>
              <div className="text-[11px] font-medium truncate mt-1 text-gray-300 md:hidden">
                {section.title.split(' ')[0]}
              </div>
            </button>
          )
        })}
      </div>

      {/* Main Form Content */}
      <div className="contract-paper relative">
        {viewMode === 'stepper' ? (
          /* STEP-BY-STEP VIEW (Focused & Clean) */
          <motion.div
            key={activeSectionIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="border-b border-gold-400/30 pb-3 mb-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-gold-400 tracking-wider font-semibold uppercase">
                  SECTION {activeSectionIndex + 1} OF {selectedTemplate.sections.length}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                  {currentSection.title}
                </h2>
              </div>
              <button
                onClick={generateContract}
                className="btn-primary text-xs py-2 px-3.5 hidden sm:inline-flex"
              >
                ⚡ 立即生成契约
              </button>
            </div>

            {/* Current Section Fields */}
            <div className="space-y-5">
              {currentSection.fields.map((field, fieldIndex) => {
                const fieldKey = `section_${activeSectionIndex}_${field.label}`
                const fieldValue = formData[fieldKey] !== undefined ? formData[fieldKey] : (field.value || '')

                return (
                  <div key={fieldIndex} className="form-group">
                    <label className="form-label">
                      <span>
                        {field.label}
                        {field.required && <span className="text-gold-400 ml-1.5">*</span>}
                      </span>
                      {field.type === 'textarea' && (
                        <span className="text-[11px] text-gray-500 font-normal">可直接微调修改条款</span>
                      )}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(activeSectionIndex, field.label, e.target.value)}
                        className="form-textarea"
                        placeholder={field.placeholder}
                        rows={5}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(activeSectionIndex, field.label, e.target.value)}
                        className="form-input"
                      >
                        {field.options?.map((opt, oIdx) => (
                          <option key={oIdx} value={opt} className="bg-dark-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        value={fieldValue}
                        onChange={(e) => handleFieldChange(activeSectionIndex, field.label, e.target.value)}
                        className="form-input"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 border-t border-gray-700/60 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                disabled={activeSectionIndex === 0}
                className="btn-secondary text-xs sm:text-sm px-4 py-2.5"
              >
                ← 上一节
              </button>

              <div className="flex items-center gap-2">
                {!isLastSection ? (
                  <button
                    type="button"
                    onClick={() => setActiveSectionIndex(prev => Math.min(selectedTemplate.sections.length - 1, prev + 1))}
                    className="btn-primary text-xs sm:text-sm px-5 py-2.5"
                  >
                    下一节 →
                  </button>
                ) : null}

                <button
                  type="button"
                  onClick={generateContract}
                  disabled={isGenerating}
                  className="btn-primary text-xs sm:text-sm px-6 py-2.5 shadow-lg shadow-gold-400/25"
                >
                  {isGenerating ? '⏳ 生成中...' : '📜 生成契约'}
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* SHOW ALL SECTIONS VIEW */
          <div className="space-y-10">
            {selectedTemplate.sections.map((section, sIdx) => (
              <div key={sIdx} className="border-b border-gray-700/60 pb-8 last:border-b-0 last:pb-0">
                <div className="border-b border-gold-400/30 pb-2 mb-5">
                  <h3 className="text-xl font-serif font-bold text-gold-400">
                    {sIdx + 1}. {section.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {section.fields.map((field, fIdx) => {
                    const fieldKey = `section_${sIdx}_${field.label}`
                    const fieldValue = formData[fieldKey] !== undefined ? formData[fieldKey] : (field.value || '')

                    return (
                      <div key={fIdx} className="form-group">
                        <label className="form-label">
                          <span>
                            {field.label}
                            {field.required && <span className="text-gold-400 ml-1.5">*</span>}
                          </span>
                        </label>

                        {field.type === 'textarea' ? (
                          <textarea
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(sIdx, field.label, e.target.value)}
                            className="form-textarea"
                            placeholder={field.placeholder}
                            rows={4}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(sIdx, field.label, e.target.value)}
                            className="form-input"
                          >
                            {field.options?.map((opt, oIdx) => (
                              <option key={oIdx} value={opt} className="bg-dark-900 text-white">
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            value={fieldValue}
                            onChange={(e) => handleFieldChange(sIdx, field.label, e.target.value)}
                            className="form-input"
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-gold-400/30 text-center">
              <button
                type="button"
                onClick={generateContract}
                disabled={isGenerating}
                className="btn-primary text-base sm:text-lg px-8 py-3.5 shadow-xl shadow-gold-400/20"
              >
                {isGenerating ? '⏳ 正在排版生成...' : '📜 生成我的专属契约 (完成)'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
