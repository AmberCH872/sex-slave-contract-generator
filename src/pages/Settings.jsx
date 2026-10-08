import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { templates } from '../data/templates'

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('templates')
  const [toastMessage, setToastMessage] = useState('')

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app_settings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        // ignore
      }
    }
    return {
      autoSave: true,
      includePreamble: true,
      defaultDuration: '永久',
      fontSize: 'medium'
    }
  })

  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 2500)
  }

  function handleSaveSettings() {
    localStorage.setItem('app_settings', JSON.stringify(settings))
    showToast('✅ 设置已保存至本地')
  }

  function handleClearAllLocalData() {
    if (window.confirm('⚠️ 确定要清空所有本地保存的契约、草稿和历史设置吗？此操作无法撤销。')) {
      localStorage.clear()
      showToast('🗑️ 所有本地数据已安全清除')
    }
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

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-gold-400/10 border border-gold-400/20">
            ⚙️
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              设置与数据管理
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              管理模板库、偏好选项及本地隐私数据
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-700/80 -mx-3 px-3 sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide pb-2">
          {[
            { id: 'templates', label: '📜 模板管理' },
            { id: 'general', label: '⚙️ 通用设置' },
            { id: 'privacy', label: '🔒 隐私与清除' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold-400/20 text-gold-400 border border-gold-400/40'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="card p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">
                    内置协议模板清单 ({templates.length})
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    点击“起草”可直接跳转至生成器编辑对应模板
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {templates.map(tpl => (
                  <div
                    key={tpl.id}
                    className="p-3 sm:p-4 rounded-xl bg-dark-900/60 border border-gray-700/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-gold-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl p-2 rounded-lg bg-dark-800">
                        {tpl.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-semibold text-white">
                            {tpl.name}
                          </h3>
                          <span className="badge text-[10px]">{tpl.subtitle}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {tpl.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => navigate(`/generator?type=${tpl.id}`)}
                        className="btn-primary text-xs py-1.5 px-3.5"
                      >
                        ✍️ 前往起草
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h2 className="text-base sm:text-lg font-semibold text-white pb-3 border-b border-gray-700">
                应用首选项
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-dark-900/50 border border-gray-700">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-white">
                      自动保存草稿
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      在填写契约时自动保存至浏览器 localStorage，防止意外丢失
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
                    className="w-5 h-5 accent-gold-400 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 rounded-lg bg-dark-900/50 border border-gray-700">
                  <div>
                    <h3 className="text-sm sm:text-base font-medium text-white">
                      包含序言誓词
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      在生成的契约文档顶部包含神圣立约誓约声明
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.includePreamble}
                    onChange={(e) => setSettings({ ...settings, includePreamble: e.target.checked })}
                    className="w-5 h-5 accent-gold-400 rounded cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  💾 保存偏好设置
                </button>
              </div>
            </motion.div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <h2 className="text-base sm:text-lg font-semibold text-white pb-3 border-b border-gray-700">
                本地数据安全与隐私保护
              </h2>

              <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/30 text-xs sm:text-sm text-gold-300 leading-relaxed space-y-2">
                <p className="font-semibold text-gold-400">🔒 隐私承诺：</p>
                <p>
                  本契约生成器完全运行在客户端（您的浏览器内）。无论是主奴姓名、服从规则还是私密条款，任何数据均不会被上传至云端服务器或任何第三方接口。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/60 border border-red-500/30 space-y-3">
                <h3 className="text-sm sm:text-base font-semibold text-red-400">
                  一键清除所有本地缓存
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  若您在公共设备或他人设备上使用本工具，可在生成打印后点击下方按钮，彻底清除浏览器中的所有已保存契约、草稿与历史记录。
                </p>
                <div>
                  <button
                    onClick={handleClearAllLocalData}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors"
                  >
                    🗑️ 彻底清除所有本地数据
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
