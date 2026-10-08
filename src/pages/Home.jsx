import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { templates } from '../data/templates'

const features = [
  {
    icon: '📜',
    title: '专业协议模板',
    description: '涵盖经典主奴、宠玩 (Pet Play)、24/7 全权交换、哥罗哲学及女上位等多种动态',
    color: 'from-amber-500 to-yellow-600'
  },
  {
    icon: '✍️',
    title: '完全个性化微调',
    description: '支持分步填写与全文实时编辑，定制每一条专属服从规则与日常仪式',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: '🖨️',
    title: '古典羊皮纸排版',
    description: '典雅奢华的古典装帧美学，支持一键打印、导出高清 PDF 与复制全文',
    color: 'from-blue-500 to-cyan-600'
  },
  {
    icon: '🔒',
    title: '100% 本地隐私安全',
    description: '所有文本与草稿严格储存在您的本地浏览器中，绝不上载任何云端服务器',
    color: 'from-emerald-500 to-teal-600'
  }
]

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-20">
      {/* Hero Section */}
      <section className="container-custom py-8 sm:py-16 md:py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-5 sm:space-y-7"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-400/15 border border-gold-400/30">
            <span className="text-gold-400 text-xs sm:text-sm font-semibold tracking-wider uppercase">
              ✨ 权威 · 臣服 · 契约精神
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-gold-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              性奴认主协议生成器
            </span>
            <br />
            <span className="text-xl sm:text-3xl md:text-4xl text-gray-300 font-serif font-normal mt-2 block">
              BDSM Contract & Agreement Generator
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            在理智、知情自愿与相互尊重的前提下，构建神圣而严谨的权力交换盟约。
            提供完备的条款范式，支持自由微调与古典羊皮纸版式导出。
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
            <Link 
              to="/generator" 
              className="btn-primary w-full sm:w-auto text-base sm:text-lg px-8 py-3.5 shadow-xl shadow-gold-400/20"
            >
              ✍️ 立即开始起草契约
            </Link>
            <a 
              href="#templates-section" 
              className="btn-secondary w-full sm:w-auto text-base px-6 py-3"
            >
              📜 浏览契约模板库
            </a>
          </div>
        </motion.div>
      </section>

      {/* Templates Section */}
      <section id="templates-section" className="container-custom py-6 sm:py-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm text-gold-400 font-semibold uppercase tracking-widest block mb-2">
            PRE-CONFIGURED TEMPLATES
          </span>
          <h2 className="section-title">
            专属契约模板库
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-xl mx-auto">
            选择最贴合您与伴侣关系的动态范式，系统已内置预设条款，随时可按需修改
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {templates.map((tpl, index) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/generator?type=${tpl.id}`}
                className="card group flex flex-col justify-between h-full hover:scale-[1.02] border-gray-700/80 hover:border-gold-400/60 p-5 sm:p-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-3xl sm:text-4xl p-2 rounded-xl bg-gold-400/10 border border-gold-400/20 group-hover:scale-110 transition-transform">
                      {tpl.icon}
                    </span>
                    <span className="badge text-[11px]">
                      {tpl.subtitle || '推荐范本'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                    {tpl.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
                    {tpl.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-700/60 flex items-center justify-between text-xs sm:text-sm text-gold-400 font-medium">
                  <span>包含 {tpl.sections.length} 个核心规约章节</span>
                  <span className="group-hover:translate-x-1 transition-transform">起草 →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Core Features Section */}
      <section className="container-custom py-6 sm:py-10">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-xs sm:text-sm text-gold-400 font-semibold uppercase tracking-widest block mb-2">
            WHY THIS TOOL
          </span>
          <h2 className="section-title">
            专为亲密探索者打造
          </h2>
          <p className="text-gray-400 text-xs sm:text-base max-w-xl mx-auto">
            兼顾仪式感、严谨性与现代技术体验的专业协议定制方案
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-5 sm:p-6 flex flex-col justify-between"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="container-custom pb-8">
        <div className="card text-center p-6 sm:p-12 border-gold-400/40 relative overflow-hidden bg-gradient-to-b from-dark-800/90 to-dark-900/90">
          <div className="max-w-xl mx-auto space-y-4">
            <span className="text-3xl">👑</span>
            <h2 className="text-xl sm:text-3xl font-display font-bold text-white">
              准备好确立您的专属契约了吗？
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              只需选择一个契约模板，填入称谓并根据双方沟通微调条款，3分钟即可生成精美可打印的正式协议文档。
            </p>
            <div className="pt-2">
              <Link to="/generator" className="btn-primary text-base px-8 py-3">
                立即前往契约生成器 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
