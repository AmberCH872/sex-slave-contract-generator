import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    autoSave: true,
    notifications: true,
    printQuality: 'high',
    showTemplates: true,
    contractLanguage: 'zh-CN',
    signatureStyle: 'handwritten',
    includeDisclaimer: true,
    enableWatermark: false
  })

  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="min-h-screen pt-24 pb-12">
      {/* Header */}
      <div className="container-custom mb-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <span className="text-5xl">⚙️</span>
          <div>
            <h1 className="text-3xl font-display font-bold text-white">
              设置
            </h1>
            <p className="text-gray-400 mt-2">自定义您的协议生成体验</p>
          </div>
        </motion.div>
      </div>

      {/* Settings Tabs */}
      <div className="container-custom mb-8">
        <div className="flex gap-2 border-b border-gray-700 pb-2">
          {['general', 'templates', 'appearance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab 
                  ? 'text-gold-400 border-b-2 border-gold-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Settings Content */}
      <div className="container-custom">
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">通用设置</h2>

              <div className="space-y-6">
                {/* Auto Save */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">自动保存</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      在编辑时自动保存进度，防止意外丢失
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.autoSave ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-1"
                      animate={{ x: settings.autoSave ? 24 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>

                {/* Print Quality */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">打印质量</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      选择契约的打印清晰度
                    </p>
                  </div>
                  <select
                    value={settings.printQuality}
                    onChange={(e) => setSettings({ ...settings, printQuality: e.target.value })}
                    className="bg-dark-900 border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    <option value="low">快速 (低质量)</option>
                    <option value="medium">标准 (中等质量)</option>
                    <option value="high">高清 (高质量)</option>
                  </select>
                </div>

                {/* Signature Style */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">签名样式</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      选择签名的呈现方式
                    </p>
                  </div>
                  <select
                    value={settings.signatureStyle}
                    onChange={(e) => setSettings({ ...settings, signatureStyle: e.target.value })}
                    className="bg-dark-900 border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    <option value="handwritten">手写风格</option>
                    <option value="typed">打印字体</option>
                    <option value="digital">电子签名</option>
                  </select>
                </div>

                {/* Language */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">契约语言</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      选择协议的显示语言
                    </p>
                  </div>
                  <select
                    value={settings.contractLanguage}
                    onChange={(e) => setSettings({ ...settings, contractLanguage: e.target.value })}
                    className="bg-dark-900 border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                  </select>
                </div>

                {/* Disclaimer */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">免责声明</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      在契约末尾显示标准免责声明
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, includeDisclaimer: !settings.includeDisclaimer })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.includeDisclaimer ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-1"
                      animate={{ x: settings.includeDisclaimer ? 24 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>

                {/* Watermark */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">水印效果</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      在契约上显示 Ω 符号作为装饰性水印
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, enableWatermark: !settings.enableWatermark })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enableWatermark ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-1"
                      animate={{ x: settings.enableWatermark ? 24 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button className="btn-primary">
                  💾 保存设置
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">模板设置</h2>

              <div className="space-y-4">
                {['basic-ds', 'pet-play', 'tpe', 'gorean-slave', 'femdom'].map((templateId) => (
                  <div key={templateId} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium capitalize">
                        {templateId === 'basic-ds' && '基本主奴契约'}
                        {templateId === 'pet-play' && '宠玩协议 (Pet Play)'}
                        {templateId === 'tpe' && '24/7 全权交换'}
                        {templateId === 'gorean-slave' && '哥罗奴隶契约'}
                        {templateId === 'femdom' && '女上位协议 (Femdom)'}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        默认模板：{templateId}
                      </p>
                    </div>
                    <button className="btn-secondary px-6 py-2">
                      编辑
                    </button>
                  </div>
                ))}

                {/* Add New Template */}
                <div className="mt-4 p-4 bg-dark-900/50 rounded-lg border-2 border-dashed border-gray-600 hover:border-gold-400 transition-colors cursor-pointer">
                  <h3 className="text-white font-medium mb-1">➕ 添加新模板</h3>
                  <p className="text-gray-400 text-sm">创建自定义的协议模板</p>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button className="btn-primary">
                  💾 保存模板设置
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">外观设置</h2>

              <div className="space-y-6">
                {/* Theme */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">主题颜色</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      选择界面的主色调
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {['gold', 'purple', 'blue'].map((color) => (
                      <button
                        key={color}
                        onClick={() => setSettings({ ...settings, theme: color })}
                        className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                          settings.theme === color ? 'ring-2 ring-white' : ''
                        }`}
                        style={{
                          background: color === 'gold' 
                            ? 'linear-gradient(135deg, #ffd700 0%, #e6c200 100%)'
                            : color === 'purple'
                              ? 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)'
                              : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">字体大小</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      契约文本的显示大小
                    </p>
                  </div>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => setSettings({ ...settings, fontSize: e.target.value })}
                    className="bg-dark-900 border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    <option value="small">小 (10px)</option>
                    <option value="medium">中 (12px)</option>
                    <option value="large">大 (14px)</option>
                    <option value="xlarge">超大 (16px)</option>
                  </select>
                </div>

                {/* Line Spacing */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">行间距</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      文本的行距设置
                    </p>
                  </div>
                  <select
                    value={settings.lineSpacing}
                    onChange={(e) => setSettings({ ...settings, lineSpacing: e.target.value })}
                    className="bg-dark-900 border border-gray-600 rounded-md px-4 py-2 text-white"
                  >
                    <option value="tight">紧凑</option>
                    <option value="normal">标准</option>
                    <option value="loose">宽松</option>
                  </select>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">通知提示</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      保存和生成时显示提示
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.notifications ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-1"
                      animate={{ x: settings.notifications ? 24 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>

                {/* Show Templates */}
                <div className="flex items-center justify-between p-4 bg-dark-800/50 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">显示模板选择</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      在生成页面显示快速模板切换
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, showTemplates: !settings.showTemplates })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.showTemplates ? 'bg-gold-400' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="w-5 h-5 bg-white rounded-full absolute top-1"
                      animate={{ x: settings.showTemplates ? 24 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button className="btn-primary">
                  💾 保存外观设置
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="container-custom py-8 border-t border-gold-400/20 text-center">
        <p className="text-gray-500 text-sm">
          所有设置仅保存在您的本地浏览器中
        </p>
      </footer>
    </div>
  )
}
